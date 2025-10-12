"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import React, { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SimplexNoise } from "three/examples/jsm/math/SimplexNoise";

type BrainNode = {
  anchor: THREE.Vector3;
  floatAmplitude: THREE.Vector3;
  phase: number;
  hemisphere: number;
};

type BrainEdge = {
  a: number;
  b: number;
  cross: boolean;
};

type BrainGraph = {
  nodes: BrainNode[];
  positions: Float32Array;
  nodeColors: Float32Array;
  edges: BrainEdge[];
  edgePositions: Float32Array;
  edgeColors: Float32Array;
};

const NODE_COUNT = 450;
const NODE_RADIUS = 0.02;
const BRAIN_WIDTH = 1.55;
const BRAIN_HEIGHT = 1.2;
const BRAIN_DEPTH = 1.15;
const MID_GAP = 0.22;
const MIN_NODE_SPACING = 0.085;
const INTRA_DISTANCE = 0.55;
const CROSS_DISTANCE = 1.35;

const CYAN_COLOR = new THREE.Color("#22d3ee");
const BLUE_COLOR = new THREE.Color("#2563eb");

const tmpColor = new THREE.Color();
const dummyObject = new THREE.Object3D();

function sampleBrainPoint(simplex: SimplexNoise, hemisphere: number) {
  const point = new THREE.Vector3();
  for (let attempt = 0; attempt < 48; attempt += 1) {
    const y = (Math.random() * 2 - 1) * BRAIN_HEIGHT;
    const z = (Math.random() * 2 - 1) * BRAIN_DEPTH;
    const radialFalloff = Math.sqrt(
      (y * y) / (BRAIN_HEIGHT * BRAIN_HEIGHT) +
        (z * z) / (BRAIN_DEPTH * BRAIN_DEPTH)
    );

    if (radialFalloff > 1.05) {
      continue;
    }

    const shellBias = 1 - Math.pow(Math.random(), 0.65);
    const lateralEnvelope = BRAIN_WIDTH * (0.55 + (1 - radialFalloff) * 0.5);
    const corticalNoise = simplex.noise4d(
      y * 0.65,
      z * 0.65,
      shellBias * 1.2,
      hemisphere * 0.9
    );

    const groovePull = (1 - radialFalloff) * 0.24;
    let x =
      hemisphere * (MID_GAP + lateralEnvelope * (0.35 + shellBias * 0.65)) +
      corticalNoise * 0.18 -
      hemisphere * groovePull * 0.18;

    const yNoise = simplex.noise4d(x * 0.35, z * 0.5, shellBias, 0.5) * 0.18;
    const zNoise = simplex.noise4d(x * 0.45, y * 0.45, shellBias, 1.8) * 0.22;

    point.set(x, y + yNoise, z + zNoise + corticalNoise * 0.08);
    return point;
  }

  point.set(
    hemisphere * (MID_GAP + Math.random() * BRAIN_WIDTH * 0.75),
    (Math.random() * 2 - 1) * BRAIN_HEIGHT * 0.6,
    (Math.random() * 2 - 1) * BRAIN_DEPTH * 0.6
  );
  return point;
}

function generateBrainGraph(count: number): BrainGraph {
  const simplex = new SimplexNoise();
  const nodes: BrainNode[] = [];
  const anchors: THREE.Vector3[] = [];
  const hemispheres = new Array(count).fill(0).map((_, index) => (index % 2 === 0 ? -1 : 1));

  const minSpacingSq = MIN_NODE_SPACING * MIN_NODE_SPACING;

  for (let i = 0; i < count; i += 1) {
    const hemisphere = hemispheres[i];
    let anchor = sampleBrainPoint(simplex, hemisphere);
    let tries = 0;

    while (tries < 40) {
      let tooClose = false;
      for (let j = 0; j < anchors.length; j += 1) {
        if (anchors[j].distanceToSquared(anchor) < minSpacingSq) {
          tooClose = true;
          break;
        }
      }
      if (!tooClose) {
        break;
      }
      anchor = sampleBrainPoint(simplex, hemisphere);
      tries += 1;
    }

    anchors.push(anchor.clone());
    nodes.push({
      anchor,
      floatAmplitude: new THREE.Vector3(
        0.05 + Math.random() * 0.03,
        0.06 + Math.random() * 0.045,
        0.05 + Math.random() * 0.035
      ),
      phase: Math.random() * Math.PI * 2,
      hemisphere,
    });
  }

  const center = anchors
    .reduce((acc, anchor) => acc.add(anchor), new THREE.Vector3())
    .multiplyScalar(1 / anchors.length);

  let maxVertical = 0;
  nodes.forEach((node) => {
    node.anchor.sub(center);
    maxVertical = Math.max(maxVertical, Math.abs(node.anchor.y));
  });

  const positions = new Float32Array(count * 3);
  const nodeColors = new Float32Array(count * 3);

  nodes.forEach((node, index) => {
    positions[index * 3] = node.anchor.x;
    positions[index * 3 + 1] = node.anchor.y;
    positions[index * 3 + 2] = node.anchor.z;

    const gradientMix = THREE.MathUtils.clamp(
      (node.anchor.y + maxVertical) / (2 * maxVertical || 1),
      0,
      1
    );
    tmpColor.copy(CYAN_COLOR).lerp(BLUE_COLOR, gradientMix);
    nodeColors[index * 3] = tmpColor.r;
    nodeColors[index * 3 + 1] = tmpColor.g;
    nodeColors[index * 3 + 2] = tmpColor.b;
  });

  const edges: BrainEdge[] = [];
  const intraCounts = new Array(count).fill(0);
  const crossCounts = new Array(count).fill(0);

  for (let i = 0; i < count; i += 1) {
    for (let j = i + 1; j < count; j += 1) {
      const distance = nodes[i].anchor.distanceTo(nodes[j].anchor);
      if (nodes[i].hemisphere === nodes[j].hemisphere) {
        if (
          distance < INTRA_DISTANCE &&
          intraCounts[i] < 8 &&
          intraCounts[j] < 8
        ) {
          edges.push({ a: i, b: j, cross: false });
          intraCounts[i] += 1;
          intraCounts[j] += 1;
        }
      } else if (distance < CROSS_DISTANCE && crossCounts[i] < 3 && crossCounts[j] < 3) {
        if (Math.random() < 0.35) {
          edges.push({ a: i, b: j, cross: true });
          crossCounts[i] += 1;
          crossCounts[j] += 1;
        }
      }
    }
  }

  const edgePositions = new Float32Array(edges.length * 2 * 3);
  const edgeColors = new Float32Array(edges.length * 2 * 3);

  return { nodes, positions, nodeColors, edges, edgePositions, edgeColors };
}

const BrainGraphScene: React.FC = () => {
  const graph = useMemo(() => generateBrainGraph(NODE_COUNT), []);
  const instancedRef = useRef<THREE.InstancedMesh>(null);
  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(graph.edgePositions, 3)
    );
    geometry.setAttribute("color", new THREE.BufferAttribute(graph.edgeColors, 3));
    return geometry;
  }, [graph.edgeColors, graph.edgePositions]);
  const lineMaterialRef = useRef<THREE.LineBasicMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (!instancedRef.current) return;

    const colorAttribute = new THREE.InstancedBufferAttribute(graph.nodeColors, 3);
    instancedRef.current.instanceColor = colorAttribute;

    graph.nodes.forEach((node, index) => {
      dummyObject.position.copy(node.anchor);
      dummyObject.scale.setScalar(NODE_RADIUS);
      dummyObject.updateMatrix();
      instancedRef.current!.setMatrixAt(index, dummyObject.matrix);
    });
    instancedRef.current.instanceMatrix.needsUpdate = true;
  }, [graph]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const pulse = 1 + Math.sin(time * 1.6) * 0.03;

    graph.nodes.forEach((node, index) => {
      const idx = index * 3;
      const anchor = node.anchor;
      const amplitude = node.floatAmplitude;
      const phase = node.phase;
      const hemisphere = node.hemisphere;

      const wobble = Math.sin(time * 0.4 + phase) * 0.5 + Math.sin(time * 0.7 + hemisphere) * 0.35;

      const x =
        anchor.x +
        Math.sin(time * 0.45 + phase) * amplitude.x +
        Math.sin(time * 0.85 + phase * 0.7) * 0.015 +
        hemisphere * 0.015 * Math.sin(time * 0.5 + wobble * 0.2);
      const y =
        anchor.y +
        Math.sin(time * 0.62 + phase * 0.85) * amplitude.y +
        Math.cos(time * 0.78 + phase) * 0.02;
      const z =
        anchor.z +
        Math.cos(time * 0.5 + phase * 1.2) * amplitude.z +
        Math.sin(time * 0.9 + hemisphere * 0.4) * 0.015;

      graph.positions[idx] = x;
      graph.positions[idx + 1] = y;
      graph.positions[idx + 2] = z;

      if (instancedRef.current) {
        dummyObject.position.set(x, y, z);
        const nodePulse = NODE_RADIUS * pulse * (0.92 + 0.08 * Math.sin(time * 2 + phase + hemisphere * 0.4));
        dummyObject.scale.setScalar(nodePulse);
        dummyObject.updateMatrix();
        instancedRef.current.setMatrixAt(index, dummyObject.matrix);
      }
    });

    if (instancedRef.current) {
      instancedRef.current.instanceMatrix.needsUpdate = true;
    }

    const startR = CYAN_COLOR.r;
    const startG = CYAN_COLOR.g;
    const startB = CYAN_COLOR.b;
    const endR = BLUE_COLOR.r;
    const endG = BLUE_COLOR.g;
    const endB = BLUE_COLOR.b;

    graph.edges.forEach((edge, edgeIndex) => {
      const baseIndex = edgeIndex * 6;
      const startIdx = edge.a * 3;
      const endIdx = edge.b * 3;

      const x1 = graph.positions[startIdx];
      const y1 = graph.positions[startIdx + 1];
      const z1 = graph.positions[startIdx + 2];
      const x2 = graph.positions[endIdx];
      const y2 = graph.positions[endIdx + 1];
      const z2 = graph.positions[endIdx + 2];

      graph.edgePositions[baseIndex] = x1;
      graph.edgePositions[baseIndex + 1] = y1;
      graph.edgePositions[baseIndex + 2] = z1;
      graph.edgePositions[baseIndex + 3] = x2;
      graph.edgePositions[baseIndex + 4] = y2;
      graph.edgePositions[baseIndex + 5] = z2;

      const dx = x1 - x2;
      const dy = y1 - y2;
      const dz = z1 - z2;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      const fadeLimit = edge.cross ? CROSS_DISTANCE : INTRA_DISTANCE;
      const fade = THREE.MathUtils.clamp(1 - distance / (fadeLimit * 1.1), 0, 1);
      const intensity = 0.25 + fade * 0.55;

      const verticalMix = THREE.MathUtils.clamp((y1 + y2) * 0.5 / (BRAIN_HEIGHT * 2) + 0.5, 0, 1);
      const gradientMix = edge.cross
        ? 0.65
        : 0.35 + verticalMix * 0.45;

      const r = THREE.MathUtils.lerp(startR, endR, gradientMix) * intensity;
      const g = THREE.MathUtils.lerp(startG, endG, gradientMix) * intensity;
      const b = THREE.MathUtils.lerp(startB, endB, gradientMix) * intensity;

      graph.edgeColors[baseIndex] = r;
      graph.edgeColors[baseIndex + 1] = g;
      graph.edgeColors[baseIndex + 2] = b;
      graph.edgeColors[baseIndex + 3] = r;
      graph.edgeColors[baseIndex + 4] = g;
      graph.edgeColors[baseIndex + 5] = b;
    });

    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    if (lineMaterialRef.current) {
      lineMaterialRef.current.opacity = 0.3 + Math.sin(time * 1.4) * 0.05;
    }

    if (groupRef.current) {
      const rotationEase = 0.04;
      groupRef.current.rotation.y += (Math.sin(time * 0.25) * 0.35 - groupRef.current.rotation.y) * rotationEase;
      groupRef.current.rotation.x += (Math.sin(time * 0.18) * 0.12 - groupRef.current.rotation.x) * rotationEase;
      groupRef.current.rotation.z += (Math.sin(time * 0.14) * 0.08 - groupRef.current.rotation.z) * rotationEase;
      const scalePulse = 1 + Math.sin(time * 0.9) * 0.02;
      groupRef.current.scale.setScalar(scalePulse);
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh ref={instancedRef} args={[undefined, undefined, NODE_COUNT]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial vertexColors transparent opacity={0.95} depthWrite={false} />
      </instancedMesh>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial
          ref={lineMaterialRef}
          transparent
          vertexColors
          opacity={0.35}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
};

type Interactive3DHeroProps = {
  className?: string;
};

const Interactive3DHero: React.FC<Interactive3DHeroProps> = ({ className }) => {
  return (
    <div className={`w-full h-full ${className ?? ""}`}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.45} />
        <pointLight position={[6, 6, 6]} intensity={0.9} color="#60a5fa" />
        <pointLight position={[-5, -4, 4]} intensity={0.6} color="#38bdf8" />
        <pointLight position={[0, 5, -6]} intensity={0.45} color="#0ea5e9" />
        <BrainGraphScene />
      </Canvas>
    </div>
  );
};

export default Interactive3DHero;
