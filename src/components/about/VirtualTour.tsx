"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Html, Text } from "@react-three/drei";
import * as THREE from "three";
import { FiMaximize2, FiMaximize } from "react-icons/fi";

function OfficeSpheres() {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Main Office Sphere (Placeholder for 360 photo) */}
            <mesh>
                <sphereGeometry args={[20, 60, 40]} />
                <meshStandardMaterial
                    side={THREE.BackSide}
                    color="#0f172a"
                    roughness={0.1}
                    metalness={0.5}
                />
            </mesh>

            {/* Interactive "Hotspots" or Points of Interest */}
            <group position={[5, 2, -10]}>
                <mesh>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshBasicMaterial color="#3b82f6" />
                </mesh>
                <Html position={[0, 0.5, 0]}>
                    <div className="bg-blue-600/80 backdrop-blur px-3 py-1 rounded text-[10px] font-mono text-white whitespace-nowrap">
                        Computation Hub
                    </div>
                </Html>
            </group>

            <group position={[-8, 1, 5]}>
                <mesh>
                    <sphereGeometry args={[0.2, 16, 16]} />
                    <meshBasicMaterial color="#3b82f6" />
                </mesh>
                <Html position={[0, 0.5, 0]}>
                    <div className="bg-blue-600/80 backdrop-blur px-3 py-1 rounded text-[10px] font-mono text-white whitespace-nowrap">
                        Design War Room
                    </div>
                </Html>
            </group>
        </group>
    );
}

export function VirtualTour() {
    return (
        <div className="relative w-full h-[600px] bg-slate-950 rounded-[40px] overflow-hidden glass-card my-12 group">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 0.1]} fov={75} />
                <OrbitControls
                    enableZoom={false}
                    rotateSpeed={-0.5}
                    enableDamping
                    dampingFactor={0.05}
                />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Suspense fallback={null}>
                    <OfficeSpheres />
                    <Environment preset="night" />
                </Suspense>

                <gridHelper args={[100, 100, "#1e293b", "#0f172a"]} position={[0, -2, 0]} />
            </Canvas>

            {/* UI Overlays */}
            <div className="absolute inset-0 pointer-events-none p-12 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                    <div className="max-w-md">
                        <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-4">
                            Immersive Discovery
                        </div>
                        <h2 className="text-4xl font-bold font-heading text-white">Virtual HQ Tour.</h2>
                        <p className="text-white/40 font-light mt-2">
                            Explore our state-of-the-art 2,500 sq. ft. facility in the heart of Dhaka.
                        </p>
                    </div>
                    <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] font-mono text-white/40 uppercase tracking-widest">
                        Rotate to Explore
                    </div>
                </div>
            </div>

            {/* Fullscreen Button Placeholder */}
            <div className="absolute bottom-12 right-12 z-10 transition-transform group-hover:scale-110">
                <button className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-blue-600 transition-all">
                    <FiMaximize size={24} />
                </button>
            </div>
        </div>
    );
}
