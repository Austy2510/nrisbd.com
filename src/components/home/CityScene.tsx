"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

/* ─── colour palette ─── */
const C = {
    ground: "#010409",
    road: "#010409", // Same as ground to "hide" it
    laneMark: "#1e3a5f",
    buildDark: "#080c14",
    buildMid: "#0f172a",
    buildLight: "#1e293b",
    accent: "#3b82f6",
    windowOn: "#60a5fa",
    windowOff: "#050a14",
    headlight: "#93c5fd",
    taillight: "#f87171",
};

/* ─── helpers ─── */
const seededRandom = (seed: number) => {
    const x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};

/* ─── BUILDING ─── */
function Building({
    position,
    width,
    depth,
    height,
    seed,
}: {
    position: [number, number, number];
    width: number;
    depth: number;
    height: number;
    seed: number;
}) {
    const meshRef = useRef<THREE.Group>(null);
    const color = seededRandom(seed) > 0.4 ? C.buildDark : C.buildMid;

    // Window rows & columns
    const windowRows = Math.max(3, Math.floor(height / 0.8));
    const windowCols = Math.max(1, Math.floor(width / 0.6));
    const windowDepthCols = Math.max(1, Math.floor(depth / 0.6));

    const windows = useMemo(() => {
        const wins: {
            pos: [number, number, number];
            rotation: [number, number, number];
            lit: boolean;
            scale: [number, number];
        }[] = [];
        const winW = 0.25;
        const winH = 0.35;

        // Populate windows with higher density and varying brightness
        const addFaceWindows = (rows: number, cols: number, faceWidth: number, zOffset: number, rotY: number, isSide: boolean) => {
            for (let r = 0; r < rows; r++) {
                if (seededRandom(seed + r * 13) < 0.1) continue; // Random empty rows for realism
                for (let c = 0; c < cols; c++) {
                    const px = -faceWidth / 2 + (c + 0.5) * (faceWidth / cols);
                    const py = (r + 0.5) * (height / rows);
                    const lit = seededRandom(seed + r * 100 + c + (isSide ? 500 : 0)) > 0.35;

                    wins.push({
                        pos: rotY === 0 || rotY === Math.PI ? [px, py, zOffset] : [zOffset, py, px],
                        rotation: [0, rotY, 0],
                        lit,
                        scale: [winW, winH]
                    });
                }
            }
        };

        addFaceWindows(windowRows, windowCols, width, depth / 2 + 0.01, 0, false); // Front
        addFaceWindows(windowRows, windowCols, width, -depth / 2 - 0.01, Math.PI, false); // Back
        addFaceWindows(windowRows, windowDepthCols, depth, width / 2 + 0.01, Math.PI / 2, true); // Right
        addFaceWindows(windowRows, windowDepthCols, depth, -width / 2 - 0.01, -Math.PI / 2, true); // Left

        return wins;
    }, [width, depth, height, windowRows, windowCols, windowDepthCols, seed]);

    // Rooftop features
    const rooftopItems = useMemo(() => {
        const items: { type: "box" | "cylinder"; pos: [number, number, number]; scale: [number, number, number] }[] = [];
        const count = Math.floor(seededRandom(seed + 888) * 4) + 1;
        for (let i = 0; i < count; i++) {
            const rx = (seededRandom(seed + 1111 + i) - 0.5) * width * 0.7;
            const rz = (seededRandom(seed + 2222 + i) - 0.5) * depth * 0.7;
            if (seededRandom(seed + 3333 + i) > 0.4) {
                items.push({
                    type: "box",
                    pos: [rx, height + 0.2, rz],
                    scale: [width * 0.3, 0.4, depth * 0.3],
                });
            } else {
                items.push({
                    type: "cylinder",
                    pos: [rx, height + 0.6, rz],
                    scale: [0.05, 1.2, 0.05],
                });
            }
        }
        return items;
    }, [width, depth, height, seed]);

    return (
        <group ref={meshRef} position={position}>
            {/* Main building body */}
            <mesh position={[0, height / 2, 0]}>
                <boxGeometry args={[width, height, depth]} />
                <meshStandardMaterial
                    color={color}
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>

            {/* Edge highlights */}
            <lineSegments position={[0, height / 2, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
                <lineBasicMaterial color={C.accent} transparent opacity={0.1} />
            </lineSegments>

            {/* Windows */}
            {windows.map((w, i) => (
                <mesh key={i} position={w.pos} rotation={w.rotation}>
                    <planeGeometry args={w.scale} />
                    <meshStandardMaterial
                        color={w.lit ? C.windowOn : C.windowOff}
                        emissive={w.lit ? C.windowOn : "#000000"}
                        emissiveIntensity={w.lit ? 1.2 : 0}
                        transparent
                        opacity={0.9}
                    />
                </mesh>
            ))}

            {/* Rooftop features */}
            {rooftopItems.map((item, i) =>
                item.type === "box" ? (
                    <mesh key={`rt-${i}`} position={item.pos}>
                        <boxGeometry args={item.scale} />
                        <meshStandardMaterial color={C.buildLight} roughness={0.5} metalness={0.5} />
                    </mesh>
                ) : (
                    <mesh key={`rt-${i}`} position={item.pos}>
                        <cylinderGeometry args={[item.scale[0], item.scale[0], item.scale[1], 6]} />
                        <meshStandardMaterial color="#4a5568" roughness={0.3} metalness={0.7} />
                    </mesh>
                )
            )}

            {/* Base "City Glow" */}
            <pointLight position={[0, 0.5, 0]} distance={width * 2} intensity={0.5} color={C.accent} />
        </group>
    );
}

/* ─── VEHICLE ─── */
function Vehicle({
    roadStart,
    roadEnd,
    speed,
    offset,
    direction,
}: {
    roadStart: [number, number, number];
    roadEnd: [number, number, number];
    speed: number;
    offset: number;
    direction: "x" | "z";
}) {
    const groupRef = useRef<THREE.Group>(null);
    const progressRef = useRef(offset);

    useFrame((_, delta) => {
        progressRef.current += delta * speed * 0.2;
        if (progressRef.current > 1) progressRef.current -= 1;
        if (progressRef.current < 0) progressRef.current += 1;

        if (groupRef.current) {
            const t = progressRef.current;
            groupRef.current.position.x =
                roadStart[0] + (roadEnd[0] - roadStart[0]) * t;
            groupRef.current.position.z =
                roadStart[2] + (roadEnd[2] - roadStart[2]) * t;
        }
    });

    const rotY = direction === "x" ? 0 : Math.PI / 2;

    return (
        <group ref={groupRef} position={[roadStart[0], 0.15, roadStart[2]]} rotation={[0, rotY, 0]}>
            {/* Very simple car body */}
            <mesh position={[0, 0.1, 0]}>
                <boxGeometry args={[0.8, 0.15, 0.4]} />
                <meshStandardMaterial color="#050a14" roughness={0.1} metalness={0.9} />
            </mesh>

            {/* Brighter, larger lights for "stream" effect */}
            {/* Headlights */}
            <mesh position={[0.42, 0.1, 0.14]}>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshStandardMaterial
                    color={C.headlight}
                    emissive={C.headlight}
                    emissiveIntensity={4}
                />
            </mesh>
            <mesh position={[0.42, 0.1, -0.14]}>
                <sphereGeometry args={[0.08, 12, 12]} />
                <meshStandardMaterial
                    color={C.headlight}
                    emissive={C.headlight}
                    emissiveIntensity={4}
                />
            </mesh>
            {/* Taillights */}
            <mesh position={[-0.42, 0.1, 0.14]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial
                    color={C.taillight}
                    emissive={C.taillight}
                    emissiveIntensity={3}
                />
            </mesh>
            <mesh position={[-0.42, 0.1, -0.14]}>
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial
                    color={C.taillight}
                    emissive={C.taillight}
                    emissiveIntensity={3}
                />
            </mesh>
        </group>
    );
}

/* ─── CITY ─── */
function City({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    // Tighter grid for denser city
    const blockSize = 3.0;
    const roadWidth = 1.2;
    const step = blockSize + roadWidth;
    const gridExtent = 15;

    const buildings = useMemo(() => {
        const b: {
            position: [number, number, number];
            width: number;
            depth: number;
            height: number;
            seed: number;
        }[] = [];
        let seedCounter = 1;

        for (let bx = -gridExtent; bx <= gridExtent; bx += step) {
            for (let bz = -gridExtent; bz <= gridExtent; bz += step) {
                // Place up to 4 buildings per block for high density
                const count = Math.floor(seededRandom(seedCounter++) * 4) + 1;
                for (let i = 0; i < count; i++) {
                    const w = 0.6 + seededRandom(seedCounter++) * 1.5;
                    const d = 0.6 + seededRandom(seedCounter++) * 1.5;
                    // Significantly varied heights for skyline feel
                    const h = 2 + Math.pow(seededRandom(seedCounter++), 2) * 15;

                    const ox = (seededRandom(seedCounter++) - 0.5) * (blockSize - w);
                    const oz = (seededRandom(seedCounter++) - 0.5) * (blockSize - d);

                    b.push({
                        position: [bx + ox, 0, bz + oz],
                        width: w,
                        depth: d,
                        height: h,
                        seed: seedCounter,
                    });
                    seedCounter++;
                }
            }
        }
        return b;
    }, [step, gridExtent, blockSize]);

    // Many more vehicles for light streams
    const vehicles = useMemo(() => {
        const v: {
            roadStart: [number, number, number];
            roadEnd: [number, number, number];
            speed: number;
            offset: number;
            direction: "x" | "z";
        }[] = [];
        let vs = 777;

        // X-direction vehicles
        for (let z = -gridExtent; z <= gridExtent; z += step) {
            const count = 4 + Math.floor(seededRandom(vs++) * 4);
            for (let i = 0; i < count; i++) {
                const laneOffset = (seededRandom(vs++) - 0.5) * roadWidth * 0.6;
                const spd = 0.4 + seededRandom(vs++) * 1.2;
                v.push({
                    roadStart: [-gridExtent - blockSize, 0, z + laneOffset],
                    roadEnd: [gridExtent + blockSize, 0, z + laneOffset],
                    speed: spd,
                    offset: seededRandom(vs++),
                    direction: "x",
                });
            }
        }
        // Z-direction vehicles
        for (let x = -gridExtent; x <= gridExtent; x += step) {
            const count = 4 + Math.floor(seededRandom(vs++) * 4);
            for (let i = 0; i < count; i++) {
                const laneOffset = (seededRandom(vs++) - 0.5) * roadWidth * 0.6;
                const spd = 0.4 + seededRandom(vs++) * 1.0;
                v.push({
                    roadStart: [x + laneOffset, 0, -gridExtent - blockSize],
                    roadEnd: [x + laneOffset, 0, gridExtent + blockSize],
                    speed: spd,
                    offset: seededRandom(vs++),
                    direction: "z",
                });
            }
        }
        return v;
    }, [step, gridExtent, roadWidth, blockSize]);

    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const p = scrollProgress.get();
        if (groupRef.current) {
            groupRef.current.rotation.y = p * Math.PI * 0.5;
        }
        state.camera.position.z = 22 - p * 15;
        state.camera.position.y = 12 + p * 5;
        state.camera.lookAt(0, 0, 0);
    });

    return (
        <group ref={groupRef}>
            {/* Ground plane - hides roads by being identical color */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[120, 120]} />
                <meshStandardMaterial color={C.ground} roughness={1} metalness={0} />
            </mesh>

            {/* Very faint grid to ground the perspective */}
            <gridHelper args={[120, 40, "#0c1629", "#080c14"]} position={[0, 0.001, 0]} />

            {/* Buildings */}
            {buildings.map((b, i) => (
                <Building key={i} {...b} />
            ))}

            {/* Vehicles - these will now look like light streams in the gaps */}
            {vehicles.map((v, i) => (
                <Vehicle key={`v-${i}`} {...v} />
            ))}
        </group>
    );
}

export default function CityScene({
    scrollProgress,
}: {
    scrollProgress: MotionValue<number>;
}) {
    return (
        <div className="absolute inset-0 z-0">
            <Canvas shadows gl={{ antialias: true, alpha: true }}>
                <PerspectiveCamera makeDefault position={[10, 10, 20]} fov={45} />
                <Stars
                    radius={100}
                    depth={60}
                    count={3000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.5}
                />
                <ambientLight intensity={0.2} />
                <directionalLight
                    position={[10, 25, 10]}
                    intensity={0.8}
                    castShadow
                />

                <pointLight position={[0, 15, 0]} intensity={1.5} color={C.accent} />
                <pointLight position={[-20, 10, 20]} intensity={1} color="#1e40af" />

                <City scrollProgress={scrollProgress} />

                {/* Adjust fog for better "endless city" feel */}
                <fog attach="fog" args={["#010409", 5, 50]} />
            </Canvas>
        </div>
    );
}
