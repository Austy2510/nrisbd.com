"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Stars, Float } from "@react-three/drei";
import * as THREE from "three";
import { MotionValue, useTransform } from "framer-motion";

function Building({ position, scale, color }: { position: [number, number, number], scale: [number, number, number], color: string }) {
    return (
        <mesh position={position} scale={scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={color}
                roughness={0.2}
                metalness={0.8}
                transparent
                opacity={0.9}
            />
            {/* Edge highlights for wireframe feel */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(1, 1, 1)]} />
                <lineBasicMaterial color="#3b82f6" linewidth={1} />
            </lineSegments>
        </mesh>
    );
}

function City({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const buildings = useMemo(() => {
        const b = [];
        const grid = 15;
        for (let x = -grid; x < grid; x += 3) {
            for (let z = -grid; z < grid; z += 3) {
                if (Math.random() > 0.3) {
                    const h = Math.random() * 6 + 2;
                    b.push({
                        position: [x + (Math.random() - 0.5), h / 2, z + (Math.random() - 0.5)] as [number, number, number],
                        scale: [1.2, h, 1.2] as [number, number, number],
                        color: Math.random() > 0.5 ? "#0f172a" : "#1e293b"
                    });
                }
            }
        }
        return b;
    }, []);

    const groupRef = useRef<THREE.Group>(null);

    // Animate camera and city rotation based on scroll
    useFrame((state) => {
        const p = scrollProgress.get();
        if (groupRef.current) {
            groupRef.current.rotation.y = p * Math.PI * 0.5;
        }
        state.camera.position.z = 20 - p * 15;
        state.camera.position.y = 10 + p * 5;
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <group ref={groupRef}>
            {buildings.map((b, i) => (
                <Building key={i} {...b} />
            ))}

            {/* Ground Plane with Grid */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color="#020617" opacity={0.8} transparent />
            </mesh>
            <gridHelper args={[100, 40, "#3b82f6", "#1e293b"]} position={[0, 0, 0]} />
        </group>
    );
}

export default function CityScene({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas shadows gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[10, 10, 20]} fov={50} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <ambientLight intensity={0.4} />
                <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow />
                <pointLight position={[-10, 5, -10]} intensity={1} color="#3b82f6" />

                <City scrollProgress={scrollProgress} />

                <fog attach="fog" args={["#020617", 5, 40]} />
            </Canvas>
        </div>
    );
}
