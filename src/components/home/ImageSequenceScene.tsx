"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { MotionValue } from "framer-motion";

const TOTAL_FRAMES = 240;
const FRAME_PATH = "/hero-frames/ezgif-frame-";

function getFrameSrc(index: number): string {
    const num = String(index).padStart(3, "0");
    return `${FRAME_PATH}${num}.jpg`;
}

export default function ImageSequenceScene({
    scrollProgress,
    onLoadProgress,
}: {
    scrollProgress: MotionValue<number>;
    onLoadProgress?: (progress: number) => void;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const imagesRef = useRef<HTMLImageElement[]>([]);
    const [loaded, setLoaded] = useState(false);
    const currentFrameRef = useRef(0);
    const rafRef = useRef<number>(0);

    // Preload all images
    useEffect(() => {
        let loadedCount = 0;
        const images: HTMLImageElement[] = [];

        for (let i = 1; i <= TOTAL_FRAMES; i++) {
            const img = new Image();
            img.src = getFrameSrc(i);
            img.onload = () => {
                loadedCount++;
                onLoadProgress?.(loadedCount / TOTAL_FRAMES);
                if (loadedCount === TOTAL_FRAMES) {
                    imagesRef.current = images;
                    setLoaded(true);
                }
            };
            images.push(img);
        }

        return () => {
            // Cleanup
            images.forEach((img) => {
                img.onload = null;
            });
        };
    }, []);

    // Draw frame to canvas
    const drawFrame = useCallback((frameIndex: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const img = imagesRef.current[frameIndex];

        if (!canvas || !ctx || !img) return;

        // Size canvas to viewport
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        // Draw with cover behavior
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = rect.width / rect.height;

        let drawW: number, drawH: number, drawX: number, drawY: number;

        if (canvasRatio > imgRatio) {
            // Canvas is wider than image
            drawW = rect.width;
            drawH = rect.width / imgRatio;
            drawX = 0;
            drawY = (rect.height - drawH) / 2;
        } else {
            // Canvas is taller than image
            drawH = rect.height;
            drawW = rect.height * imgRatio;
            drawX = (rect.width - drawW) / 2;
            drawY = 0;
        }

        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.drawImage(img, drawX, drawY, drawW, drawH);
    }, []);

    // Animation loop: listen to scrollProgress and pick frame
    useEffect(() => {
        if (!loaded) return;

        // Draw initial frame
        drawFrame(0);

        const unsubscribe = scrollProgress.on("change", (value) => {
            // Map scroll 0–1 to frame 0–239
            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.floor(value * TOTAL_FRAMES))
            );

            if (frameIndex !== currentFrameRef.current) {
                currentFrameRef.current = frameIndex;
                cancelAnimationFrame(rafRef.current);
                rafRef.current = requestAnimationFrame(() => {
                    drawFrame(frameIndex);
                });
            }
        });

        return () => {
            unsubscribe();
            cancelAnimationFrame(rafRef.current);
        };
    }, [loaded, scrollProgress, drawFrame]);

    // Handle resize
    useEffect(() => {
        if (!loaded) return;

        const handleResize = () => {
            drawFrame(currentFrameRef.current);
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [loaded, drawFrame]);

    return (
        <div className="absolute inset-0 z-0">
            <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ display: loaded ? "block" : "none" }}
            />
            {!loaded && (
                <div className="absolute inset-0 bg-[#010409] flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-xs font-mono text-blue-500/60 uppercase tracking-widest">
                            Loading City...
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}
