"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

const workflows = [
    {
        title: "Initial Scanning & NDT",
        desc: "We deploy advanced Lidar and Ultrasonic sensors to map the hidden skeletal integrity of the asset.",
        visual: "Scanning Pulse",
        color: "#3b82f6"
    },
    {
        title: "Digital Twin Synthesis",
        desc: "The scanned data is processed via algorithmic design tools to create a living structural replica.",
        visual: "Data Matrix",
        color: "#10b981"
    },
    {
        title: "Stress Simulation",
        desc: "Our Digital Twin is subjected to extreme load scenarios, seismic events, and wind-tunnel simulations.",
        visual: "Load Stress",
        color: "#f59e0b"
    },
    {
        title: "Predictive Retrofitting",
        desc: "Based on results, we deliver a surgically precise intervention plan to extend life by 30+ years.",
        visual: "Reinforcement",
        color: "#ef4444"
    }
];

export function ServiceScrollytelling() {
    const containerRef = useRef<HTMLDivElement>(null);
    const pinRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const sections = gsap.utils.toArray(".scrolly-section");

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                start: "top top",
                end: "+=300%",
                // markers: true,
            }
        });

        tl.to(".scrolly-visual-container", {
            backgroundColor: (i, target) => workflows[0].color + "10",
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return (
        <div ref={containerRef} className="relative min-h-screen bg-transparent mb-32">
            <div className="flex flex-col md:flex-row h-screen">
                {/* Visual Side (Sticky) */}
                <div className="w-full md:w-1/2 h-[50vh] md:h-screen flex items-center justify-center p-12 scrolly-visual-container">
                    <div className="relative w-full aspect-square glass-card rounded-3xl flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 bg-grid-white opacity-10" />

                        {/* Interactive Visual Placeholder (to be replaced with actual R3F or SVG animations) */}
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            className="w-48 h-48 border-2 border-blue-500 rounded-2xl flex items-center justify-center relative shadow-[0_0_50px_rgba(59,130,246,0.2)]"
                        >
                            <div className="absolute inset-0 border border-white/10 animate-pulse scale-150 rounded-full" />
                            <div className="text-blue-500 font-mono text-[10px] tracking-widest text-center px-4 uppercase">
                                Diagnostic Simulation Active
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Text Side (Scrolls) */}
                <div className="w-full md:w-1/2 flex flex-col px-6 md:px-24">
                    {workflows.map((item, i) => (
                        <div key={i} className="h-screen flex flex-col justify-center scrolly-section">
                            <span className="text-blue-500 font-mono text-sm mb-4">Phase 0{i + 1}</span>
                            <h3 className="text-4xl md:text-6xl font-bold font-heading mb-6 text-white leading-tight">
                                {item.title}
                            </h3>
                            <p className="text-xl text-muted-foreground leading-relaxed font-light">
                                {item.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
