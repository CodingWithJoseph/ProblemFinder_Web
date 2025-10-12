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
        camera.position.z = 5;
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

        // Create floating nodes
        for (let i = 0; i < nodeCount; i++) {
            const nodeGeometry = new THREE.SphereGeometry(0.12, 8, 8); // Bigger nodes
            const nodeMaterial = new THREE.MeshBasicMaterial({
                color: 0x00d4ff, // Brighter cyan
                transparent: true,
                opacity: 0.9 // More opaque
            });
            const node = new THREE.Mesh(nodeGeometry, nodeMaterial);

            // Random position CLOSER to camera
            const radius = 8 + Math.random() * 10; // Closer range
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);

            node.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );

            // Random velocity for floating animation
            nodeVelocitiesRef.current.push({
                x: (Math.random() - 0.5) * 0.015,
                y: (Math.random() - 0.5) * 0.015,
                z: (Math.random() - 0.5) * 0.015
            });

            networkNodesRef.current.push(node);
            scene.add(node);
        }

        // Create connections between nearby nodes
        for (let i = 0; i < nodeCount; i++) {
            for (let j = i + 1; j < nodeCount; j++) {
                const distance = networkNodesRef.current[i].position.distanceTo(
                    networkNodesRef.current[j].position
                );

                // Only connect nodes within certain distance
                if (distance < 10) { // More connections
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
                    scene.add(line);
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
            networkNodesRef.current.forEach((node, i) => {
                // Smooth floating motion
                node.position.x += nodeVelocitiesRef.current[i].x;
                node.position.y += nodeVelocitiesRef.current[i].y;
                node.position.z += nodeVelocitiesRef.current[i].z;

                // Gentle pulsing
                const pulse = Math.sin(time * 2 + i * 0.2) * 0.02 + 1;
                node.scale.setScalar(pulse);

                // Bounce back if too far from origin
                const distFromCenter = node.position.length();
                if (distFromCenter > 25) { // Closer boundary
                    nodeVelocitiesRef.current[i].x *= -0.5;
                    nodeVelocitiesRef.current[i].y *= -0.5;
                    nodeVelocitiesRef.current[i].z *= -0.5;
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
                        line.material.opacity = Math.max(0.2, 0.6 - distance / 30); // More visible
                    }
                }
            });

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