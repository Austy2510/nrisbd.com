"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamic import for the image sequence component to prevent SSR issues
const ImageSequenceScene = dynamic(() => import("./ImageSequenceScene"), { ssr: false });

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
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Lock body scroll while loading
    useEffect(() => {
        if (!isLoaded) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isLoaded]);

    const handleLoadProgress = useCallback((progress: number) => {
        setLoadProgress(progress);
        if (progress >= 1) {
            // Small delay for visual smoothness
            setTimeout(() => setIsLoaded(true), 400);
        }
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
                {/* Image Sequence Layer */}
                {isMounted && <ImageSequenceScene scrollProgress={scrollYProgress} onLoadProgress={handleLoadProgress} />}

                {/* Gradient Overlays for Depth */}
                <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background/80 z-10 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-transparent z-10 pointer-events-none opacity-60" />

                {/* Main Hero Text (Stage 1) */}
                <motion.div
                    style={{ opacity: heroOpacity }}
                    className="absolute inset-0 flex flex-col justify-center items-start z-20 px-6 md:px-24 pointer-events-none"
                >
                    <div className="overflow-hidden">
                        <h1 className="text-5xl md:text-8xl font-black font-heading tracking-tighter mb-2 text-white animate-fade-up">
                            NR Intellectual <br /> <span className="text-blue-500">Solution</span>
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

            {/* Full-Screen Loading Overlay */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        key="loading-screen"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                        className="fixed inset-0 z-[9999] bg-[#010409] flex flex-col items-center justify-center"
                    >
                        {/* Animated Logo / Brand */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="mb-12 text-center"
                        >
                            <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tighter text-white mb-2">
                                NR Intellectual <span className="text-blue-500">Solution</span>
                            </h1>
                            <p className="text-xs font-mono text-white/30 uppercase tracking-[0.3em]">
                                Engineering Resilience
                            </p>
                        </motion.div>

                        {/* Progress Bar */}
                        <div className="w-64 md:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.round(loadProgress * 100)}%` }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                        </div>

                        {/* Percentage */}
                        <span className="text-xs font-mono text-blue-500/60 tabular-nums">
                            {Math.round(loadProgress * 100)}%
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
