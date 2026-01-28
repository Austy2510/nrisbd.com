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

            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-0 pointer-events-none" />

            {/* Overlay Content */}
            <div className="absolute inset-0 flex flex-col justify-center items-start pointer-events-none z-10 px-6 md:px-24">
                <div className="overflow-hidden">
                    <h1 className="text-7xl md:text-9xl font-black font-heading tracking-tighter mb-2 text-white mix-blend-difference opacity-0 animate-fade-up delay-[200ms]">
                        NRIS BD
                    </h1>
                </div>
                <div className="overflow-hidden">
                    <h2 className="text-4xl md:text-6xl font-thin font-heading text-white/60 tracking-tight mb-8 opacity-0 animate-fade-up delay-[400ms]">
                        Engineering <span className="text-blue-500 font-bold">Resilience</span>.
                    </h2>
                </div>

                <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-light mb-10 leading-relaxed opacity-0 animate-fade-up delay-[600ms]">
                    Bridging the gap between physics and code. We deploy <span className="text-white font-medium">Digital Twins</span> to de-risk Bangladesh's most complex infrastructure.
                </p>

                <button className="pointer-events-auto px-10 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-full opacity-0 animate-fade-up delay-[800ms]">
                    Explore Our Work
                </button>
            </div>

            {/* Tech Data Ticker */}
            <div className="absolute bottom-10 right-10 hidden md:flex flex-col text-right font-mono text-xs text-white/30 space-y-2">
                <p>LAT: 23.8103° N | LNG: 90.4125° E</p>
                <p>SYSTEM STATUS: ONLINE</p>
                <p>MODEL: IFC.js CORE V2.1</p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-10 animate-bounce text-white/20 hidden md:block">
                <div className="text-xs font-mono mb-2 uppercase tracking-widest -rotate-90 origin-bottom-left relative left-3">Scroll</div>
                <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white to-transparent" />
            </div>
        </div>
    );
}
