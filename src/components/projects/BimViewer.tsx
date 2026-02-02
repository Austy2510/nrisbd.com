"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, Environment, Float, Html } from "@react-three/drei";
import * as THREE from "three";

function StructuralModel({ explode }: { explode: boolean }) {
    const groupRef = useRef<THREE.Group>(null);

    // Animate the "explode" effect
    useFrame((state) => {
        if (!groupRef.current) return;
        const target = explode ? 2 : 0;
        groupRef.current.children.forEach((child, i) => {
            const currentY = child.position.y;
            const targetY = (i * 0.5) * target;
            child.position.y = THREE.MathUtils.lerp(currentY, targetY, 0.1);
        });
    });

    return (
        <group ref={groupRef}>
            {/* Foundation */}
            <mesh position={[0, -0.2, 0]}>
                <boxGeometry args={[5, 0.4, 5]} />
                <meshStandardMaterial color="#334155" />
            </mesh>
            {/* Floor 1 */}
            <mesh position={[0, 0.5, 0]}>
                <boxGeometry args={[4, 0.1, 4]} />
                <meshStandardMaterial color="#475569" transparent opacity={0.5} />
            </mesh>
            {/* Columns Floor 1 */}
            <mesh position={[1.8, 0.5, 1.8]}>
                <boxGeometry args={[0.2, 1, 0.2]} />
                <meshStandardMaterial color="#3b82f6" />
            </mesh>
            <mesh position={[-1.8, 0.5, 1.8]}>
                <boxGeometry args={[0.2, 1, 0.2]} />
                <meshStandardMaterial color="#3b82f6" />
            </mesh>
            <mesh position={[1.8, 0.5, -1.8]}>
                <boxGeometry args={[0.2, 1, 0.2]} />
                <meshStandardMaterial color="#3b82f6" />
            </mesh>
            <mesh position={[-1.8, 0.5, -1.8]}>
                <boxGeometry args={[0.2, 1, 0.2]} />
                <meshStandardMaterial color="#3b82f6" />
            </mesh>
            {/* Floor 2 */}
            <mesh position={[0, 1.5, 0]}>
                <boxGeometry args={[4, 0.1, 4]} />
                <meshStandardMaterial color="#475569" transparent opacity={0.5} />
            </mesh>
            {/* Columns Floor 2 */}
            <mesh position={[1.8, 1.5, 1.8]}>
                <boxGeometry args={[0.2, 1, 0.2]} />
                <meshStandardMaterial color="#3b82f6" />
            </mesh>
            <mesh position={[-1.8, 1.5, 1.8]}>
                <boxGeometry args={[0.2, 1, 0.2]} />
                <meshStandardMaterial color="#3b82f6" />
            </mesh>
            <mesh position={[1.8, 1.5, -1.8]}>
                <boxGeometry args={[0.2, 1, 0.2]} />
                <meshStandardMaterial color="#3b82f6" />
            </mesh>
            <mesh position={[-1.8, 1.5, -1.8]}>
                <boxGeometry args={[0.2, 1, 0.2]} />
                <meshStandardMaterial color="#3b82f6" />
            </mesh>
        </group>
    );
}

export function BimViewer() {
    const [explode, setExplode] = useState(false);

    return (
        <div className="relative w-full h-[600px] bg-slate-950 rounded-3xl overflow-hidden glass-card">
            <Canvas>
                <PerspectiveCamera makeDefault position={[8, 8, 8]} fov={50} />
                <OrbitControls enableDamping />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-10, 10, -10]} intensity={1} color="#3b82f6" />

                <Suspense fallback={null}>
                    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                        <StructuralModel explode={explode} />
                    </Float>
                    <Environment preset="city" />
                </Suspense>

                {/* Grid Overlay */}
                <gridHelper args={[20, 20, "#1e293b", "#0f172a"]} position={[0, -0.5, 0]} />
            </Canvas>

            {/* UI Overlay */}
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                <div className="px-4 py-2 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-mono uppercase tracking-widest text-blue-400">
                    BIM Interactive Viewer
                </div>
                <div className="text-2xl font-bold font-heading text-white">
                    Structural Integrity Analysis
                </div>
            </div>

            <div className="absolute bottom-6 right-6 z-10">
                <button
                    onClick={() => setExplode(!explode)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-sm transition-all shadow-lg shadow-blue-900/40"
                >
                    {explode ? "Collapse Model" : "Explode Model"}
                </button>
            </div>
        </div>
    );
}
import { Suspense } from "react";
