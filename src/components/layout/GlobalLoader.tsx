"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalLoader() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // We only want this loader to trigger on client-side navigations, 
    // NOT on initial page load (which is handled by HeroSequence on the home page).
    const [isLoading, setIsLoading] = useState(false);
    const [progress, setProgress] = useState(0);
    const isFirstRender = useRef(true);
    const currentPathname = useRef(pathname);
    const currentSearch = useRef(searchParams);

    useEffect(() => {
        // Skip the very first render so we don't flash the loader on initial page load
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Only trigger if the pathname or search params actually changed
        if (pathname === currentPathname.current && searchParams === currentSearch.current) {
            return;
        }

        currentPathname.current = pathname;
        currentSearch.current = searchParams;

        // Pathname changed = navigation occurred
        setIsLoading(true);
        setProgress(0);
        document.body.style.overflow = "hidden";

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        setIsLoading(false);
                        document.body.style.overflow = "";
                    }, 300); // Hold at 100% briefly
                    return 100;
                }
                return prev + Math.floor(Math.random() * 20) + 10;
            });
        }, 50);

        return () => {
            clearInterval(interval);
            document.body.style.overflow = "";
        };
    }, [pathname, searchParams]);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="global-loader"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-[#010409] flex flex-col items-center justify-center pointer-events-auto"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="mb-12 text-center"
                    >
                        <h1 className="text-3xl md:text-5xl font-black font-heading tracking-tighter text-white mb-2">
                            NR Intellectual <span className="text-blue-500">Solution</span>
                        </h1>
                        <p className="text-xs font-mono text-white/30 uppercase tracking-[0.3em]">
                            Engineering Resilience
                        </p>
                    </motion.div>

                    <div className="w-64 md:w-80 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.1, ease: "linear" }}
                        />
                    </div>

                    <span className="text-xs font-mono text-blue-500/60 tabular-nums">
                        {progress}%
                    </span>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
