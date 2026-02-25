"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Stars } from "@react-three/drei";
import * as THREE from "three";
import { MotionValue } from "framer-motion";

/* ─── colour palette ─── */
const C = {
    ground: "#020617",
    road: "#0a0f1a",
    laneMark: "#1e3a5f",
    buildDark: "#0f172a",
    buildMid: "#1e293b",
    buildLight: "#263548",
    accent: "#3b82f6",
    windowOn: "#3b82f6",
    windowOff: "#0c1629",
    headlight: "#60a5fa",
    taillight: "#ef4444",
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
    const color = seededRandom(seed) > 0.5 ? C.buildDark : C.buildMid;

    // Window rows & columns
    const windowRows = Math.max(2, Math.floor(height / 1.2));
    const windowCols = Math.max(1, Math.floor(width / 1.0));
    const windowDepthCols = Math.max(1, Math.floor(depth / 1.0));

    const windows = useMemo(() => {
        const wins: {
            pos: [number, number, number];
            rotation: [number, number, number];
            lit: boolean;
        }[] = [];
        const winW = 0.35;
        const winH = 0.5;

        // Front face (z+)
        for (let r = 0; r < windowRows; r++) {
            for (let c = 0; c < windowCols; c++) {
                const px = -width / 2 + (c + 0.5) * (width / windowCols);
                const py = (r + 0.5) * (height / windowRows);
                wins.push({
                    pos: [px, py, depth / 2 + 0.01],
                    rotation: [0, 0, 0],
                    lit: seededRandom(seed + r * 100 + c) > 0.4,
                });
            }
        }
        // Back face (z-)
        for (let r = 0; r < windowRows; r++) {
            for (let c = 0; c < windowCols; c++) {
                const px = -width / 2 + (c + 0.5) * (width / windowCols);
                const py = (r + 0.5) * (height / windowRows);
                wins.push({
                    pos: [px, py, -depth / 2 - 0.01],
                    rotation: [0, Math.PI, 0],
                    lit: seededRandom(seed + r * 200 + c + 50) > 0.45,
                });
            }
        }
        // Right face (x+)
        for (let r = 0; r < windowRows; r++) {
            for (let c = 0; c < windowDepthCols; c++) {
                const pz = -depth / 2 + (c + 0.5) * (depth / windowDepthCols);
                const py = (r + 0.5) * (height / windowRows);
                wins.push({
                    pos: [width / 2 + 0.01, py, pz],
                    rotation: [0, Math.PI / 2, 0],
                    lit: seededRandom(seed + r * 300 + c + 100) > 0.5,
                });
            }
        }
        // Left face (x-)
        for (let r = 0; r < windowRows; r++) {
            for (let c = 0; c < windowDepthCols; c++) {
                const pz = -depth / 2 + (c + 0.5) * (depth / windowDepthCols);
                const py = (r + 0.5) * (height / windowRows);
                wins.push({
                    pos: [-width / 2 - 0.01, py, pz],
                    rotation: [0, -Math.PI / 2, 0],
                    lit: seededRandom(seed + r * 400 + c + 150) > 0.5,
                });
            }
        }

        return wins;
    }, [width, depth, height, windowRows, windowCols, windowDepthCols, seed]);

    // Rooftop features
    const rooftopItems = useMemo(() => {
        const items: { type: "box" | "cylinder"; pos: [number, number, number]; scale: [number, number, number] }[] = [];
        const count = Math.floor(seededRandom(seed + 999) * 3) + 1;
        for (let i = 0; i < count; i++) {
            const rx = (seededRandom(seed + 1000 + i) - 0.5) * width * 0.6;
            const rz = (seededRandom(seed + 2000 + i) - 0.5) * depth * 0.6;
            if (seededRandom(seed + 3000 + i) > 0.5) {
                // Small box (AC unit)
                items.push({
                    type: "box",
                    pos: [rx, height + 0.3, rz],
                    scale: [0.5, 0.6, 0.5],
                });
            } else {
                // Antenna / cylinder
                items.push({
                    type: "cylinder",
                    pos: [rx, height + 0.8, rz],
                    scale: [0.06, 1.6, 0.06],
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
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>

            {/* Edge highlights */}
            <lineSegments position={[0, height / 2, 0]}>
                <edgesGeometry args={[new THREE.BoxGeometry(width, height, depth)]} />
                <lineBasicMaterial color={C.accent} transparent opacity={0.15} />
            </lineSegments>

            {/* Foundation ledge */}
            <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[width + 0.15, 0.3, depth + 0.15]} />
                <meshStandardMaterial color={C.buildLight} roughness={0.5} metalness={0.5} />
            </mesh>

            {/* Windows */}
            {windows.map((w, i) => (
                <mesh key={i} position={w.pos} rotation={w.rotation}>
                    <planeGeometry args={[0.35, 0.5]} />
                    <meshStandardMaterial
                        color={w.lit ? C.windowOn : C.windowOff}
                        emissive={w.lit ? C.windowOn : "#000000"}
                        emissiveIntensity={w.lit ? 0.6 : 0}
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
                        <meshStandardMaterial color={C.buildLight} roughness={0.6} metalness={0.4} />
                    </mesh>
                ) : (
                    <mesh key={`rt-${i}`} position={item.pos}>
                        <cylinderGeometry args={[item.scale[0], item.scale[0], item.scale[1], 6]} />
                        <meshStandardMaterial color="#4a5568" roughness={0.4} metalness={0.6} />
                    </mesh>
                )
            )}
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
        progressRef.current += delta * speed * 0.15;
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
        <group ref={groupRef} position={[roadStart[0], 0.2, roadStart[2]]} rotation={[0, rotY, 0]}>
            {/* Car body */}
            <mesh position={[0, 0.15, 0]}>
                <boxGeometry args={[1.2, 0.3, 0.55]} />
                <meshStandardMaterial color="#1a2540" roughness={0.3} metalness={0.8} />
            </mesh>
            {/* Cabin */}
            <mesh position={[0, 0.38, 0]}>
                <boxGeometry args={[0.6, 0.2, 0.48]} />
                <meshStandardMaterial
                    color="#0f172a"
                    roughness={0.2}
                    metalness={0.9}
                    transparent
                    opacity={0.85}
                />
            </mesh>
            {/* Headlights */}
            <mesh position={[0.62, 0.15, 0.18]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial
                    color={C.headlight}
                    emissive={C.headlight}
                    emissiveIntensity={2}
                />
            </mesh>
            <mesh position={[0.62, 0.15, -0.18]}>
                <sphereGeometry args={[0.06, 8, 8]} />
                <meshStandardMaterial
                    color={C.headlight}
                    emissive={C.headlight}
                    emissiveIntensity={2}
                />
            </mesh>
            {/* Taillights */}
            <mesh position={[-0.62, 0.15, 0.18]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial
                    color={C.taillight}
                    emissive={C.taillight}
                    emissiveIntensity={1.5}
                />
            </mesh>
            <mesh position={[-0.62, 0.15, -0.18]}>
                <sphereGeometry args={[0.05, 8, 8]} />
                <meshStandardMaterial
                    color={C.taillight}
                    emissive={C.taillight}
                    emissiveIntensity={1.5}
                />
            </mesh>
        </group>
    );
}

/* ─── ROAD NETWORK ─── */
function Roads({ gridSize, blockSize, roadWidth }: { gridSize: number; blockSize: number; roadWidth: number }) {
    const step = blockSize + roadWidth;

    const roads = useMemo(() => {
        const segs: { pos: [number, number, number]; size: [number, number]; rotation: number }[] = [];

        // X-direction roads
        for (let z = -gridSize; z <= gridSize; z += step) {
            segs.push({
                pos: [0, 0.005, z],
                size: [gridSize * 2 + blockSize, roadWidth],
                rotation: 0,
            });
        }
        // Z-direction roads
        for (let x = -gridSize; x <= gridSize; x += step) {
            segs.push({
                pos: [x, 0.005, 0],
                size: [gridSize * 2 + blockSize, roadWidth],
                rotation: Math.PI / 2,
            });
        }

        return segs;
    }, [gridSize, blockSize, roadWidth, step]);

    // Lane markings
    const laneMarks = useMemo(() => {
        const marks: { pos: [number, number, number]; rotY: number }[] = [];
        const dashLen = 0.6;
        const gap = 0.8;
        const total = gridSize * 2 + blockSize;

        // X-direction lane dashes
        for (let z = -gridSize; z <= gridSize; z += step) {
            for (let x = -gridSize; x < gridSize; x += dashLen + gap) {
                marks.push({
                    pos: [x, 0.015, z],
                    rotY: 0,
                });
            }
        }
        // Z-direction lane dashes
        for (let x = -gridSize; x <= gridSize; x += step) {
            for (let z = -gridSize; z < gridSize; z += dashLen + gap) {
                marks.push({
                    pos: [x, 0.015, z],
                    rotY: Math.PI / 2,
                });
            }
        }

        return marks;
    }, [gridSize, step]);

    return (
        <group>
            {/* Road surfaces */}
            {roads.map((r, i) => (
                <mesh key={`road-${i}`} position={r.pos} rotation={[-Math.PI / 2, 0, r.rotation]}>
                    <planeGeometry args={r.size} />
                    <meshStandardMaterial color={C.road} roughness={0.9} metalness={0.1} />
                </mesh>
            ))}
            {/* Lane markings */}
            {laneMarks.map((m, i) => (
                <mesh key={`lane-${i}`} position={m.pos} rotation={[-Math.PI / 2, 0, m.rotY]}>
                    <planeGeometry args={[0.6, 0.06]} />
                    <meshStandardMaterial
                        color={C.laneMark}
                        emissive={C.laneMark}
                        emissiveIntensity={0.3}
                        transparent
                        opacity={0.6}
                    />
                </mesh>
            ))}
        </group>
    );
}

/* ─── CITY ─── */
function City({ scrollProgress }: { scrollProgress: MotionValue<number> }) {
    const blockSize = 3.5;
    const roadWidth = 1.8;
    const step = blockSize + roadWidth;
    const gridExtent = 12;

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
                // Place 1–3 buildings per block
                const count = Math.floor(seededRandom(seedCounter++) * 2.5) + 1;
                for (let i = 0; i < count; i++) {
                    const w = 0.8 + seededRandom(seedCounter++) * 1.6;
                    const d = 0.8 + seededRandom(seedCounter++) * 1.6;
                    const h = 2 + seededRandom(seedCounter++) * 7;
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

    // Vehicles along roads
    const vehicles = useMemo(() => {
        const v: {
            roadStart: [number, number, number];
            roadEnd: [number, number, number];
            speed: number;
            offset: number;
            direction: "x" | "z";
        }[] = [];
        let vs = 42;

        // X-direction vehicles
        for (let z = -gridExtent; z <= gridExtent; z += step) {
            const count = Math.floor(seededRandom(vs++) * 2) + 1;
            for (let i = 0; i < count; i++) {
                const laneOffset = (seededRandom(vs++) - 0.5) * roadWidth * 0.5;
                const spd = 0.3 + seededRandom(vs++) * 0.7;
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
            const count = Math.floor(seededRandom(vs++) * 2) + 1;
            for (let i = 0; i < count; i++) {
                const laneOffset = (seededRandom(vs++) - 0.5) * roadWidth * 0.5;
                const spd = 0.3 + seededRandom(vs++) * 0.6;
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
    }, [step, gridExtent, blockSize, roadWidth]);

    const groupRef = useRef<THREE.Group>(null);

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
            {/* Ground plane */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[100, 100]} />
                <meshStandardMaterial color={C.ground} roughness={0.95} metalness={0.05} />
            </mesh>

            {/* Subtle grid overlay */}
            <gridHelper args={[100, 50, "#1e3a5f", "#0c1629"]} position={[0, 0.001, 0]} />

            {/* Roads */}
            <Roads gridSize={gridExtent} blockSize={blockSize} roadWidth={roadWidth} />

            {/* Buildings */}
            {buildings.map((b, i) => (
                <Building key={i} {...b} />
            ))}

            {/* Vehicles */}
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
                <PerspectiveCamera makeDefault position={[10, 10, 20]} fov={50} />
                <Stars
                    radius={100}
                    depth={50}
                    count={5000}
                    factor={4}
                    saturation={0}
                    fade
                    speed={1}
                />
                <ambientLight intensity={0.3} />
                <directionalLight
                    position={[10, 20, 10]}
                    intensity={1.2}
                    castShadow
                />
                <pointLight position={[-10, 8, -10]} intensity={1.5} color={C.accent} />
                <pointLight position={[15, 5, 15]} intensity={0.8} color="#1e40af" />

                <City scrollProgress={scrollProgress} />

                <fog attach="fog" args={["#020617", 8, 45]} />
            </Canvas>
        </div>
    );
}
