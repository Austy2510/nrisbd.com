"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PerspectiveCamera, Stars, Float } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";
import { cn } from "@/lib/utils";

function Building({ position, scale, color = "#ffffff" }: { position: [number, number, number]; scale: [number, number, number]; color?: string }) {
    // Add some random variation to wireframe color or opacity for tech feel
    return (
        <mesh position={position}>
            <boxGeometry args={scale} />
            <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(...scale)]} />
                <lineBasicMaterial color="#3b82f6" transparent opacity={0.2} />
            </lineSegments>
        </mesh>
    );
}

function CityScene() {
    // Generate random buildings
    const buildings = useMemo(() => {
        const items = [];
        for (let i = 0; i < 50; i++) {
            const x = (Math.random() - 0.5) * 100;
            const z = (Math.random() - 0.5) * 100;
            const height = Math.random() * 20 + 5;
            const width = Math.random() * 5 + 2;
            items.push({ x, z, height, width });
        }
        return items;
    }, []);

    const groupRef = useRef<THREE.Group>(null!);

    useFrame((state) => {
        // Slow rotation
        groupRef.current.rotation.y += 0.001;
    });

    return (
        <group ref={groupRef}>
            {buildings.map((b, i) => (
                <Building
                    key={i}
                    position={[b.x, b.height / 2 - 10, b.z]} // Shift down so camera is flying over
                    scale={[b.width, b.height, b.width]}
                    color={i % 5 === 0 ? "#1e293b" : "#ffffff"} // Mix of dark and light buildings
                />
            ))}
            {/* Ground Plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -10, 0]}>
                <planeGeometry args={[200, 200]} />
                <meshStandardMaterial color="#020617" roughness={0.1} metalness={0.9} />
                <gridHelper args={[200, 100, 0x3b82f6, 0x1e293b]} rotation={[-Math.PI / 2, 0, 0]} />
            </mesh>
        </group>
    );
}

export function Hero3D() {
    return (
        <div className="h-screen w-full relative">
            <Canvas shadows className="bg-background">
                <fog attach="fog" args={["#020617", 10, 80]} />
                <PerspectiveCamera makeDefault position={[0, 10, 40]} fov={50} />
                <ambientLight intensity={0.2} />
                <pointLight position={[10, 20, 10]} intensity={2000} color="#3b82f6" />
                <pointLight position={[-10, 5, -10]} intensity={1000} color="#f97316" />
                <Environment preset="city" />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
                    <CityScene />
                </Float>
            </Canvas>

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none z-10 text-center px-4">
                <h1 className="text-6xl md:text-8xl font-black font-heading tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                    BUILDING <br /> TOMORROW.
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light mb-10">
                    Redefining infrastructure with <span className="text-blue-500 font-bold">Digital Twins</span> & <span className="text-orange-500 font-bold">Algorithmic Design</span>.
                </p>
                <button className="pointer-events-auto px-8 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-white/90 transition-all rounded-full">
                    Explore Projects
                </button>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/20">
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white to-transparent" />
            </div>
        </div>
    );
}
