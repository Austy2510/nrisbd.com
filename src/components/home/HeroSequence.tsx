"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import for R3F component to prevent SSR issues
const CityScene = dynamic(() => import("./CityScene"), { ssr: false });

function Typewriter({ text }: { text: string }) {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.slice(0, i + 1));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 50); // Typing speed
        return () => clearInterval(timer);
    }, [text]);

    return <span>{displayedText}<span className="animate-pulse">_</span></span>;
}

export function HeroSequence() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Opacity layers for complex scrollytelling
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
    const secondTitleOpacity = useTransform(scrollYProgress, [0.2, 0.4, 0.6], [0, 1, 0]);

    return (
        <div ref={containerRef} className="h-[400vh] relative bg-background">
            <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
                {/* 3D City Scene Layer */}
                <Suspense fallback={<div className="absolute inset-0 bg-black animate-pulse" />}>
                    {isMounted && <CityScene scrollProgress={scrollYProgress} />}
                </Suspense>

                {/* Gradient Overlays for Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10 pointer-events-none opacity-60" />

                {/* Main Hero Text (Stage 1) */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="absolute inset-0 flex flex-col justify-center items-start z-20 px-6 md:px-24 pointer-events-none"
                >
                    <div className="overflow-hidden">
                        <h1 className="text-7xl md:text-9xl font-black font-heading tracking-tighter mb-2 text-white animate-fade-up">
                            NRIS BD
                        </h1>
                    </div>
                    <div className="overflow-hidden h-32 md:h-48 flex items-center">
                        <h2 className="text-4xl md:text-6xl font-thin font-heading text-white/60 tracking-tight mb-8">
                            Engineering <span className="text-blue-500 font-bold"><Typewriter text="Resilience." /></span>
                        </h2>
                    </div>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-light mb-10 leading-relaxed animate-fade-up delay-[600ms]">
                        Bridging the gap between physics and code. We deploy <span className="text-white font-medium">Digital Twins</span> to de-risk Bangladesh's most complex infrastructure.
                    </p>

                    <button className="pointer-events-auto px-10 py-4 bg-white/10 text-white border border-white/20 text-sm font-bold uppercase tracking-widest hover:bg-blue-600 hover:border-transparent transition-all duration-300 rounded-full backdrop-blur-md">
                        Explore Our Work
                    </button>
                </motion.div>

                {/* Middle Scrollytelling Message (Stage 2) */}
                <motion.div
                    style={{ opacity: secondTitleOpacity }}
                    className="absolute inset-0 flex flex-col justify-center items-center z-20 px-6 text-center pointer-events-none"
                >
                    <h2 className="text-4xl md:text-7xl font-bold font-heading text-white mb-6 max-w-4xl leading-tight">
                        Transforming the AEC Industry with <span className="text-blue-500">Algorithmic Design.</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl font-light italic">
                        "The goal is not merely to build better; it is to simulate reality before the first brick is laid."
                    </p>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce text-white/40 z-20"
                >
                    <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent mx-auto mb-2" />
                    <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
                </motion.div>
            </div>
        </div>
    );
}
