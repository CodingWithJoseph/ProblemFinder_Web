import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function EarthModel() {
  const gltf = useGLTF("/models/earth/scene.gltf");
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15;
  });

  // Model is HUGE, use tiny scale
  return <primitive ref={ref} object={gltf.scene} scale={0.5} />;
}
// Implementing the model
// <div style={{ width: "80px", height: "80px", display: "inline-block", }}>
//   <Canvas gl={{ alpha: true }} style={{ background: "transparent" }} camera={{ position: [0, 0, 3], fov: 50 }}>
//     <ambientLight intensity={1.5} />
//     <directionalLight position={[3, 3, 3]} intensity={2.5} />
//     <Suspense fallback={null}>
//       <EarthModel />
//     </Suspense>
//   </Canvas>
// </div>