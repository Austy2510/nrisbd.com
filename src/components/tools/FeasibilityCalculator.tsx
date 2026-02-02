"use client";

import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Float, OrbitControls } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight, FiInfo } from "react-icons/fi";

export function FeasibilityCalculator() {
    const [area, setArea] = useState(10000); // sq ft
    const [floors, setFloors] = useState(5);
    const [type, setType] = useState("Residential");
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const costPerSqFt = type === "Residential" ? 3500 : type === "Industrial" ? 2500 : 5000;
    const estimatedCost = area * floors * costPerSqFt;

    return (
        <section className="py-24 px-6 bg-slate-900/50 relative overflow-hidden">
            {/* Visual Background (R3F) */}
            <div className="absolute inset-0 z-0 opacity-30">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[5, 5, 5]} />
                    <OrbitControls autoRotate enableZoom={false} />
                    <gridHelper args={[20, 20, "#3b82f6", "#1e293b"]} />
                    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                        <mesh position={[0, floors * 0.1, 0]}>
                            <boxGeometry args={[area / 2000, floors * 0.2, area / 2000]} />
                            <meshStandardMaterial color="#3b82f6" wireframe />
                        </mesh>
                    </Float>
                    <ambientLight intensity={1} />
                </Canvas>
            </div>

            <div className="container mx-auto relative z-10">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    {/* Left: Form */}
                    <div className="w-full lg:w-1/2 glass-card p-10 rounded-3xl backdrop-blur-xl">
                        <h2 className="text-3xl font-bold font-heading mb-8 text-white">Project Feasibility Estimator</h2>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-3">Project Type</label>
                                <div className="grid grid-cols-3 gap-2">
                                    {["Residential", "Industrial", "Commercial"].map((t) => (
                                        <button
                                            key={t}
                                            onClick={() => setType(t)}
                                            className={`px-4 py-3 rounded-xl text-xs font-bold transition-all border ${type === t ? "bg-blue-600 border-blue-500 text-white" : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                                                }`}
                                        >
                                            {t}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex justify-between mb-3">
                                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40">Lot Area (sq. ft)</label>
                                    <span className="text-blue-400 font-mono text-xs">{area.toLocaleString()}</span>
                                </div>
                                <input
                                    type="range" min="1000" max="100000" step="1000"
                                    value={area} onChange={(e) => setArea(Number(e.target.value))}
                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between mb-3">
                                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40">Total Stories</label>
                                    <span className="text-blue-400 font-mono text-xs">{floors} Floors</span>
                                </div>
                                <input
                                    type="range" min="1" max="50" step="1"
                                    value={floors} onChange={(e) => setFloors(Number(e.target.value))}
                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-blue-600"
                                />
                            </div>

                            {!isSubmitted ? (
                                <div className="pt-8">
                                    <label className="block text-xs font-mono uppercase tracking-widest text-white/40 mb-3">Enter Email for Detailed Result</label>
                                    <div className="flex gap-2">
                                        <input
                                            type="email" placeholder="your@email.com"
                                            value={email} onChange={(e) => setEmail(e.target.value)}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                        <button
                                            onClick={() => email && setIsSubmitted(true)}
                                            className="bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-xl font-bold transition-all flex items-center"
                                        >
                                            <FiArrowRight size={20} />
                                        </button>
                                    </div>
                                    <p className="flex items-center gap-2 mt-4 text-[10px] text-white/20 font-mono italic">
                                        <FiInfo size={12} /> We respect your privacy. All estimations are for planning purposes.
                                    </p>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="pt-8 text-center"
                                >
                                    <div className="text-sm font-mono text-green-400 mb-2 uppercase">Estimate Ready</div>
                                    <div className="text-4xl font-bold font-heading text-white">৳ {(estimatedCost / 100000).toFixed(2)} Lakhs</div>
                                    <div className="text-xs text-white/40 mt-2">A detailed breakdown has been sent to {email}</div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    {/* Right: Copy */}
                    <div className="w-full lg:w-1/2">
                        <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-6">
                            Strategic Planning Tool
                        </div>
                        <h2 className="text-4xl md:text-6xl font-bold font-heading mb-8 text-white leading-tight">
                            Evaluate Your <br /> <span className="text-blue-500">Infrastructure ROI.</span>
                        </h2>
                        <p className="text-xl text-muted-foreground font-light mb-8 leading-relaxed">
                            High-ticket engineering starts with data. Our AI-driven feasibility tool provides preliminary costing based on current market trends and raw material analytics.
                        </p>
                        <div className="grid grid-cols-2 gap-8">
                            <div>
                                <div className="text-3xl font-bold text-white mb-2 font-mono">1.2s</div>
                                <div className="text-xs font-mono uppercase tracking-widest text-white/40 leading-relaxed">Latency for <br /> structural sizing</div>
                            </div>
                            <div>
                                <div className="text-3xl font-bold text-white mb-2 font-mono">98.5%</div>
                                <div className="text-xs font-mono uppercase tracking-widest text-white/40 leading-relaxed">Historical accuracy <br /> in budgeting</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
