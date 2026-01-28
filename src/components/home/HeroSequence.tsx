"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

const FRAME_COUNT = 80;

export function HeroSequence() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [isReady, setIsReady] = useState(false);

    // Track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress (0 to 1) to frame index (0 to 79)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);

    const renderFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = imagesRef.current[index];

        if (img && img.complete) {
            // "Object-cover" logic for canvas
            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;

            let drawWidth = canvas.width;
            let drawHeight = canvas.height;
            let offsetX = 0;
            let offsetY = 0;

            if (imgRatio > canvasRatio) {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                offsetX = (canvas.width - drawWidth) / 2;
            } else {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                offsetY = (canvas.height - drawHeight) / 2;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    };

    // Preload images - Strategy: Load frame 0 ASAP, then rest in background
    useEffect(() => {
        // Load first frame immediately
        const img0 = new Image();
        img0.src = "/hero-sequence/frame_000.jpg";
        img0.onload = () => {
            imagesRef.current[0] = img0;
            renderFrame(0);
            setIsReady(true); // Show UI immediately after Frame 0

            // Background load the rest in a non-blocking loop
            for (let i = 1; i < FRAME_COUNT; i++) {
                const img = new Image();
                img.src = `/hero-sequence/frame_${i.toString().padStart(3, "0")}.jpg`;
                img.onload = () => {
                    imagesRef.current[i] = img;
                };
            }
        };
    }, []);

    // Render loop
    useEffect(() => {
        if (!isReady) return;

        const render = () => {
            // Get current frame index from the motion value
            const currentFrame = Math.round(frameIndex.get());
            renderFrame(currentFrame);
            requestAnimationFrame(render);
        };

        const animationId = requestAnimationFrame(render);
        return () => cancelAnimationFrame(animationId);
    }, [isReady, frameIndex]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                // Redraw current frame on resize
                const currentFrame = Math.round(frameIndex.get() || 0);
                renderFrame(currentFrame);
            }
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Initial size

        return () => window.removeEventListener("resize", handleResize);
    }, [isReady]);

    return (
        <div ref={containerRef} className="h-[300vh] relative">
            <div className="sticky top-0 h-screen w-full overflow-hidden bg-black">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent z-10 pointer-events-none" />

                {/* Static Text Overlay - Fades out as you scroll deep */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isReady ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
                    className="absolute inset-0 flex flex-col justify-center items-start pointer-events-none z-20 px-6 md:px-24"
                >
                    <div className="overflow-hidden">
                        <h1 className="text-7xl md:text-9xl font-black font-heading tracking-tighter mb-2 text-white mix-blend-difference animate-fade-up delay-[200ms]">
                            NRIS BD
                        </h1>
                    </div>
                    <div className="overflow-hidden">
                        <h2 className="text-4xl md:text-6xl font-thin font-heading text-white/60 tracking-tight mb-8 animate-fade-up delay-[400ms]">
                            Engineering <span className="text-blue-500 font-bold">Resilience</span>.
                        </h2>
                    </div>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-xl font-light mb-10 leading-relaxed animate-fade-up delay-[600ms]">
                        Bridging the gap between physics and code. We deploy <span className="text-white font-medium">Digital Twins</span> to de-risk Bangladesh's most complex infrastructure.
                    </p>

                    <button className="pointer-events-auto px-10 py-4 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all duration-300 rounded-full animate-fade-up delay-[800ms]">
                        Explore Our Work
                    </button>
                </motion.div>


                {/* Scroll indicator - Fades out quickly */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isReady ? 1 : 0 }}
                    style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
                    className="absolute bottom-10 left-10 animate-bounce text-white/20 hidden md:block z-20"
                >
                    <div className="text-xs font-mono mb-2 uppercase tracking-widest -rotate-90 origin-bottom-left relative left-3">Scroll</div>
                    <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-white to-transparent" />
                </motion.div>
            </div>
        </div>
    );
}
