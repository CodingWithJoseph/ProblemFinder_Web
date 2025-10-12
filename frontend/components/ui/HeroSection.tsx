"use client";

"use client";

import React, {useEffect, useRef, useState} from 'react';
import * as THREE from 'three';

export default function Interactive3DHero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const torusRef = useRef<THREE.Group | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 });
    const [loaded, setLoaded] = useState(false);

    // Store network animation references
    const networkNodesRef = useRef<THREE.Mesh[]>([]);
    const networkLinesRef = useRef<THREE.Line[]>([]);
    const nodeVelocitiesRef = useRef<{x: number, y: number, z: number}[]>([]);
    const nodeAnchorsRef = useRef<THREE.Vector3[]>([]);

    useEffect(() => {
        if (!containerRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        // Camera setup
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 7);
        camera.lookAt(0, 0, 0);
        cameraRef.current = camera;

        // Renderer setup
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x0f172a, 1); // Dark navy background
        containerRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        // Create Neural Network Background
        const nodeCount = 100; // More nodes

        networkNodesRef.current = [];
        networkLinesRef.current = [];
        nodeVelocitiesRef.current = [];
        nodeAnchorsRef.current = [];

        const brainGroup = new THREE.Group();
        scene.add(brainGroup);
        torusRef.current = brainGroup;

        const sampleBrainPoint = (hemisphere: number) => {
            const point = new THREE.Vector3();
            const lobeHeight = 1.15;
            const lobeWidth = 1.45;
            const lobeDepth = 0.95;
            const midSulcus = 0.32;

            for (let attempt = 0; attempt < 40; attempt += 1) {
                const y = (Math.random() * 2 - 1) * lobeHeight;
                const normalizedY = Math.abs(y) / lobeHeight;

                const corticalRidge =
                    lobeWidth *
                    (1 - Math.pow(normalizedY, 1.8) * 0.78 + Math.sin(y * 2.8) * 0.08);

                const sulcusOffset = midSulcus + (1 - normalizedY) * 0.33;
                const shellBias = 1 - Math.pow(Math.random(), 0.55);

                let x = hemisphere * (sulcusOffset + corticalRidge * shellBias);
                x += hemisphere * (Math.sin(y * 3.4) * 0.08 + Math.sin(y * 5.2) * 0.04);

                const baseDepth =
                    lobeDepth *
                    (0.75 + (1 - normalizedY) * 0.55 + Math.sin(y * 2.6) * 0.05);
                const depthBias = Math.pow(Math.random(), 0.6);
                const z = (Math.random() < 0.5 ? -1 : 1) * baseDepth * depthBias;

                const yzFalloff =
                    Math.pow(Math.abs(y) / lobeHeight, 1.6) +
                    Math.pow(Math.abs(z) / (baseDepth || 1), 1.85);

                if (yzFalloff <= 1) {
                    const lateralNoise = (Math.random() - 0.5) * 0.14;
                    const verticalNoise = (Math.random() - 0.5) * 0.12;
                    const depthNoise = (Math.random() - 0.5) * 0.2;

                    point.set(
                        (x + lateralNoise * hemisphere) * 1.35,
                        (y + verticalNoise) * 1.4,
                        (z + depthNoise) * 1.25
                    );
                    return point;
                }
            }

            point.set(
                hemisphere * (midSulcus + Math.random()),
                (Math.random() * 2 - 1) * lobeHeight * 0.6,
                (Math.random() * 2 - 1) * lobeDepth * 0.6
            );

            return point;
        };

        // Create floating nodes
        const rawAnchors: THREE.Vector3[] = [];
        for (let i = 0; i < nodeCount; i++) {
            const nodeGeometry = new THREE.SphereGeometry(0.12, 8, 8); // Bigger nodes
            const nodeMaterial = new THREE.MeshBasicMaterial({
                color: 0x00d4ff, // Brighter cyan
                transparent: true,
                opacity: 0.9 // More opaque
            });
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

            const hemisphere = Math.random() < 0.5 ? -1 : 1;
            const anchor = sampleBrainPoint(hemisphere);
            rawAnchors.push(anchor);
            node.position.copy(anchor);
            node.userData = { hemisphere };

            nodeVelocitiesRef.current.push({
                x: (Math.random() - 0.5) * 0.007,
                y: (Math.random() - 0.5) * 0.007,
                z: (Math.random() - 0.5) * 0.007
            });
            nodeAnchorsRef.current.push(anchor.clone());

            networkNodesRef.current.push(node);
            brainGroup.add(node);
        }

        if (rawAnchors.length) {
            const center = rawAnchors
                .reduce((acc, anchor) => acc.add(anchor), new THREE.Vector3())
                .multiplyScalar(1 / rawAnchors.length);

            rawAnchors.forEach((anchor, index) => {
                anchor.sub(center);
                nodeAnchorsRef.current[index].copy(anchor);
                networkNodesRef.current[index].position.copy(anchor);
            });
        }

        // Create connections between nearby nodes
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const distance = networkNodesRef.current[i].position.distanceTo(
                    networkNodesRef.current[j].position
                );

                // Only connect nodes within certain distance
                if (distance < 3.6) { // More connections within brain volume
                    const points = [
                        networkNodesRef.current[i].position.clone(),
                        networkNodesRef.current[j].position.clone()
                    ];
                    const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
                    const lineMaterial = new THREE.LineBasicMaterial({
                        color: 0x06b6d4, // Brighter cyan
                        transparent: true,
                        opacity: 0.4, // More visible
                        linewidth: 2
                    });
                    const line = new THREE.Line(lineGeometry, lineMaterial);
                    line.userData = {
                        startNodeIndex: i,
                        endNodeIndex: j
                    };
                    networkLinesRef.current.push(line);
                    brainGroup.add(line);
                }
            }
        }

        // Lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const pointLight1 = new THREE.PointLight(0xffffff, 1);
        pointLight1.position.set(5, 5, 5);
        scene.add(pointLight1);

        const pointLight2 = new THREE.PointLight(0x4444ff, 0.8);
        pointLight2.position.set(-5, -5, 3);
        scene.add(pointLight2);

        const pointLight3 = new THREE.PointLight(0xff4444, 0.6);
        pointLight3.position.set(0, 5, -5);
        scene.add(pointLight3);

        setLoaded(true);

        // Mouse move handler
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            const time = Date.now() * 0.001; // Time in seconds

            // Animate neural network nodes (floating)
            const globalPulse = 1 + Math.sin(time * 2) * 0.07;

            networkNodesRef.current.forEach((node, i) => {
                const velocity = nodeVelocitiesRef.current[i];
                const anchor = nodeAnchorsRef.current[i];
                const hemisphere = (node.userData?.hemisphere as number) || 1;

                node.position.x += velocity.x;
                node.position.y += velocity.y;
                node.position.z += velocity.z;

                if (anchor) {
                    node.position.lerp(anchor, 0.035);
                    const anchorDistance = node.position.distanceTo(anchor);
                    if (anchorDistance > 0.55) {
                        node.position.lerp(anchor, 0.1);
                    }
                }

                const hemispherePulse =
                    globalPulse + Math.sin(time * 3.6 + hemisphere * Math.PI * 0.25) * 0.03;
                node.scale.setScalar(hemispherePulse);

                if (node.material instanceof THREE.MeshBasicMaterial) {
                    node.material.opacity = 0.78 + Math.sin(time * 2) * 0.1;
                }

                const distFromCenter = node.position.length();
                if (distFromCenter > 12) {
                    nodeVelocitiesRef.current[i].x *= -0.6;
                    nodeVelocitiesRef.current[i].y *= -0.6;
                    nodeVelocitiesRef.current[i].z *= -0.6;
                }
            });

            // Update connection lines to follow nodes
            networkLinesRef.current.forEach((line) => {
                const startIndex = line.userData.startNodeIndex as number;
                const endIndex = line.userData.endNodeIndex as number;
                const startNode = networkNodesRef.current[startIndex];
                const endNode = networkNodesRef.current[endIndex];

                if (startNode && endNode) {
                    const points = [startNode.position, endNode.position];
                    line.geometry.dispose();
                    line.geometry = new THREE.BufferGeometry().setFromPoints(points);

                    // Fade lines based on distance
                    const distance = startNode.position.distanceTo(endNode.position);
                    if (line.material instanceof THREE.LineBasicMaterial) {
                        line.material.opacity = Math.max(0.15, 0.45 - distance / 15 + Math.sin(time * 2) * 0.05);
                    }
                }
            });

            if (torusRef.current) {
                const targetX = mouseRef.current.y * 0.25;
                const targetY = mouseRef.current.x * 0.35;
                torusRef.current.rotation.x += (targetX - torusRef.current.rotation.x) * 0.05;
                torusRef.current.rotation.y += (targetY - torusRef.current.rotation.y) * 0.05;
                torusRef.current.rotation.z += (Math.sin(time * 0.35) * 0.06 - torusRef.current.rotation.z) * 0.04;
            }

            renderer.render(scene, camera);
        };

        animate();

        // Handle window resize
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);

            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }

            // Dispose neural network
            networkNodesRef.current.forEach(node => {
                node.geometry.dispose();
                if (node.material instanceof THREE.Material) {
                    node.material.dispose();
                }
            });

            networkLinesRef.current.forEach(line => {
                line.geometry.dispose();
                if (line.material instanceof THREE.Material) {
                    line.material.dispose();
                }
            });
            if (torusRef.current) {
                scene.remove(torusRef.current);
                torusRef.current.clear();
                torusRef.current = null;
            }
            networkNodesRef.current = [];
            networkLinesRef.current = [];
            nodeVelocitiesRef.current = [];
            nodeAnchorsRef.current = [];
            renderer.dispose();
        };
    }, []);

    return (
        <div className="relative w-full h-screen bg-[#0f172a] overflow-hidden">
            {/* 3D Canvas Container */}
            <div ref={containerRef} className="absolute inset-0" />

            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 py-6">
                <div className="text-white text-2xl font-bold tracking-wider">
                    <button className="hover:text-gray-400 transition-colors">VECTOR</button>
                </div>
                <div className="flex gap-12 text-white text-sm tracking-widest">
                    <button className="hover:text-gray-400 transition-colors">BUILD</button>
                    <button className="hover:text-gray-400 transition-colors">LEARN</button>
                    <button className="hover:text-gray-400 transition-colors">ABOUT</button>
                    <button className="hover:text-gray-400 transition-colors">JOIN</button>
                </div>
            </nav>

            {/* Loading indicator */}
            {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white text-xl">Loading...</div>
                </div>
            )}
        </div>
    );
}