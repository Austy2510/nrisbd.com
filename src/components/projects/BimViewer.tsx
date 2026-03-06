"use client";

import { Suspense, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/* ─── Colour palette matching structural analysis heat-map ─── */
const COLORS = {
    slab: "#2563eb",      // blue - floor slabs
    beam: "#7c3aed",      // purple - main beams
    column: "#3b82f6",    // bright blue - columns
    core: "#059669",      // green - elevator/stair core
    girder: "#ec4899",    // pink/magenta - girders
    brace: "#f59e0b",     // amber - bracing elements
    foundation: "#1e293b",
};

const FLOORS = 10;
const FLOOR_HEIGHT = 1.0;
const BUILDING_W = 4.5;
const BUILDING_D = 3.5;

/* ─── Procedural structural model ─── */
function StructuralModel({ explode }: { explode: boolean }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(() => {
        if (!groupRef.current) return;
        const spacing = explode ? 0.6 : 0;
        groupRef.current.children.forEach((child, i) => {
            const tag = (child as any).__floorIndex ?? 0;
            const targetY = tag * spacing;
            child.position.y = THREE.MathUtils.lerp(child.position.y, child.position.y - (child.position.y - (child.userData.baseY + targetY)) * 0.15, 0.3);
        });
    });

    const elements = useMemo(() => {
        const els: React.ReactNode[] = [];
        let key = 0;

        /* Column positions — 4x3 grid */
        const colX = [-BUILDING_W / 2, -BUILDING_W / 6, BUILDING_W / 6, BUILDING_W / 2];
        const colZ = [-BUILDING_D / 2, 0, BUILDING_D / 2];

        /* Foundation */
        els.push(
            <mesh key={key++} position={[0, -0.15, 0]} userData={{ baseY: -0.15 }}>
                <boxGeometry args={[BUILDING_W + 0.8, 0.3, BUILDING_D + 0.8]} />
                <meshStandardMaterial color={COLORS.foundation} />
            </mesh>
        );

        for (let f = 0; f < FLOORS; f++) {
            const y = f * FLOOR_HEIGHT;
            const floorTag = f;

            /* Floor slab — transparent */
            els.push(
                <mesh key={key++} position={[0, y, 0]} userData={{ baseY: y }}>
                    <boxGeometry args={[BUILDING_W, 0.06, BUILDING_D]} />
                    <meshStandardMaterial
                        color={COLORS.slab}
                        transparent
                        opacity={0.25}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            );

            /* Slab edge lines */
            els.push(
                <lineSegments key={key++} position={[0, y, 0]} userData={{ baseY: y }}>
                    <edgesGeometry args={[new THREE.BoxGeometry(BUILDING_W, 0.06, BUILDING_D)]} />
                    <lineBasicMaterial color={COLORS.slab} transparent opacity={0.6} />
                </lineSegments>
            );

            /* Columns */
            for (const cx of colX) {
                for (const cz of colZ) {
                    els.push(
                        <mesh key={key++} position={[cx, y + FLOOR_HEIGHT / 2, cz]} userData={{ baseY: y + FLOOR_HEIGHT / 2 }}>
                            <boxGeometry args={[0.12, FLOOR_HEIGHT - 0.06, 0.12]} />
                            <meshStandardMaterial
                                color={COLORS.column}
                                transparent
                                opacity={0.7}
                            />
                        </mesh>
                    );
                }
            }

            /* Main beams — along X at each Z row */
            for (const cz of colZ) {
                els.push(
                    <mesh key={key++} position={[0, y + 0.06, cz]} userData={{ baseY: y + 0.06 }}>
                        <boxGeometry args={[BUILDING_W, 0.1, 0.08]} />
                        <meshStandardMaterial
                            color={COLORS.beam}
                            transparent
                            opacity={0.5}
                        />
                    </mesh>
                );
            }

            /* Girders — along Z at each X column */
            for (const cx of colX) {
                els.push(
                    <mesh key={key++} position={[cx, y + 0.06, 0]} userData={{ baseY: y + 0.06 }}>
                        <boxGeometry args={[0.08, 0.1, BUILDING_D]} />
                        <meshStandardMaterial
                            color={COLORS.girder}
                            transparent
                            opacity={0.45}
                        />
                    </mesh>
                );
            }

            /* Elevator/stair core — two shafts */
            if (f < FLOORS - 1) {
                // Core 1
                els.push(
                    <mesh key={key++} position={[BUILDING_W / 4, y + FLOOR_HEIGHT / 2, 0]} userData={{ baseY: y + FLOOR_HEIGHT / 2 }}>
                        <boxGeometry args={[0.5, FLOOR_HEIGHT - 0.06, 0.6]} />
                        <meshStandardMaterial
                            color={COLORS.core}
                            transparent
                            opacity={0.3}
                        />
                    </mesh>
                );
                // Core 1 edges
                els.push(
                    <lineSegments key={key++} position={[BUILDING_W / 4, y + FLOOR_HEIGHT / 2, 0]} userData={{ baseY: y + FLOOR_HEIGHT / 2 }}>
                        <edgesGeometry args={[new THREE.BoxGeometry(0.5, FLOOR_HEIGHT - 0.06, 0.6)]} />
                        <lineBasicMaterial color={COLORS.core} transparent opacity={0.5} />
                    </lineSegments>
                );

                // Core 2
                els.push(
                    <mesh key={key++} position={[-BUILDING_W / 4, y + FLOOR_HEIGHT / 2, 0]} userData={{ baseY: y + FLOOR_HEIGHT / 2 }}>
                        <boxGeometry args={[0.4, FLOOR_HEIGHT - 0.06, 0.5]} />
                        <meshStandardMaterial
                            color={COLORS.core}
                            transparent
                            opacity={0.3}
                        />
                    </mesh>
                );
            }

            /* X-bracing on select faces (every other floor, exterior) */
            if (f % 2 === 0 && f < FLOORS - 1) {
                // Front face brace
                const bY = y + FLOOR_HEIGHT / 2;
                const bLen = Math.sqrt(
                    (BUILDING_W / 3) ** 2 + (FLOOR_HEIGHT - 0.06) ** 2
                );
                const bAngle = Math.atan2(FLOOR_HEIGHT - 0.06, BUILDING_W / 3);
                els.push(
                    <mesh
                        key={key++}
                        position={[BUILDING_W / 4, bY, BUILDING_D / 2]}
                        rotation={[0, 0, bAngle]}
                        userData={{ baseY: bY }}
                    >
                        <boxGeometry args={[bLen, 0.03, 0.03]} />
                        <meshStandardMaterial color={COLORS.brace} transparent opacity={0.7} />
                    </mesh>
                );
                els.push(
                    <mesh
                        key={key++}
                        position={[BUILDING_W / 4, bY, BUILDING_D / 2]}
                        rotation={[0, 0, -bAngle]}
                        userData={{ baseY: bY }}
                    >
                        <boxGeometry args={[bLen, 0.03, 0.03]} />
                        <meshStandardMaterial color={COLORS.brace} transparent opacity={0.7} />
                    </mesh>
                );
            }
        }

        /* Roof slab */
        const roofY = FLOORS * FLOOR_HEIGHT;
        els.push(
            <mesh key={key++} position={[0, roofY, 0]} userData={{ baseY: roofY }}>
                <boxGeometry args={[BUILDING_W, 0.08, BUILDING_D]} />
                <meshStandardMaterial color={COLORS.slab} transparent opacity={0.35} />
            </mesh>
        );
        els.push(
            <lineSegments key={key++} position={[0, roofY, 0]} userData={{ baseY: roofY }}>
                <edgesGeometry args={[new THREE.BoxGeometry(BUILDING_W, 0.08, BUILDING_D)]} />
                <lineBasicMaterial color={COLORS.slab} transparent opacity={0.7} />
            </lineSegments>
        );

        /* Rooftop mechanical rooms */
        els.push(
            <mesh key={key++} position={[1, roofY + 0.4, 0.5]} userData={{ baseY: roofY + 0.4 }}>
                <boxGeometry args={[0.8, 0.6, 0.6]} />
                <meshStandardMaterial color={COLORS.core} transparent opacity={0.4} />
            </mesh>
        );
        els.push(
            <lineSegments key={key++} position={[1, roofY + 0.4, 0.5]} userData={{ baseY: roofY + 0.4 }}>
                <edgesGeometry args={[new THREE.BoxGeometry(0.8, 0.6, 0.6)]} />
                <lineBasicMaterial color={COLORS.core} transparent opacity={0.6} />
            </lineSegments>
        );

        return els;
    }, []);

    return (
        <group ref={groupRef} position={[0, -FLOORS * FLOOR_HEIGHT / 2, 0]}>
            {elements}
        </group>
    );
}

/* ─── Slow auto-rotation ─── */
function AutoRotate() {
    const controlsRef = useRef<any>(null);
    useFrame((_, delta) => {
        if (controlsRef.current) {
            controlsRef.current.autoRotate = true;
            controlsRef.current.autoRotateSpeed = 1.2;
            controlsRef.current.update();
        }
    });
    return <OrbitControls ref={controlsRef} enableDamping enableZoom={false} enablePan={false} />;
}

export function BimViewer() {
    const [explode, setExplode] = useState(false);

    return (
        <div className="relative w-full h-[600px] bg-slate-950 rounded-3xl overflow-hidden glass-card">
            <Canvas>
                <PerspectiveCamera makeDefault position={[9, 7, 9]} fov={40} />
                <AutoRotate />
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 15, 10]} intensity={2} color="#93c5fd" />
                <directionalLight position={[-8, 12, -8]} intensity={1.5} color="#a78bfa" />
                <directionalLight position={[5, 8, -5]} intensity={0.8} color="#34d399" />

                <Suspense fallback={null}>
                    <StructuralModel explode={explode} />
                </Suspense>

                {/* Grid floor */}
                <gridHelper args={[20, 30, "#1e293b", "#0f172a"]} position={[0, -FLOORS * FLOOR_HEIGHT / 2 - 0.2, 0]} />
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

            {/* Colour Legend */}
            <div className="absolute top-6 right-6 z-10 flex flex-col gap-1.5 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                <span className="text-[9px] font-mono uppercase tracking-widest text-white/40 mb-1">Element Legend</span>
                {[
                    { color: COLORS.slab, label: "Floor Slabs" },
                    { color: COLORS.column, label: "Columns" },
                    { color: COLORS.beam, label: "Beams" },
                    { color: COLORS.girder, label: "Girders" },
                    { color: COLORS.core, label: "Core / Shear Wall" },
                    { color: COLORS.brace, label: "X-Bracing" },
                ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: item.color }} />
                        <span className="text-[10px] font-mono text-white/60">{item.label}</span>
                    </div>
                ))}
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
