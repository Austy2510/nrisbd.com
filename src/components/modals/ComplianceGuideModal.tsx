"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiDownload, FiCheckCircle } from "react-icons/fi";
import { useState } from "react";

export function ComplianceGuideModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);
        // In reality, this would trigger a download or email send via API
        setTimeout(() => {
            // Close after a brief delay
        }, 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg glass-card rounded-[40px] overflow-hidden"
                    >
                        <button
                            onClick={onClose}
                            aria-label="Close Modal"
                            className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
                        >
                            <FiX size={24} />
                        </button>

                        <div className="p-12">
                            <div className="w-16 h-16 bg-blue-600/20 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-10 text-blue-500">
                                <FiDownload size={32} />
                            </div>

                            {!isSubmitted ? (
                                <>
                                    <h2 className="text-3xl font-bold font-heading text-white mb-4 leading-tight">
                                        Dhaka 2026 Construction Compliance Guide.
                                    </h2>
                                    <p className="text-muted-foreground mb-10 font-light">
                                        Stay ahead of RAJUK regulations and BNBC updates. Enter your email to receive our comprehensive 40-page technical guide.
                                    </p>

                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your professional email"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                        />
                                        <button
                                            type="submit"
                                            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-blue-900/40"
                                        >
                                            Download Protocol (PDF)
                                        </button>
                                    </form>
                                </>
                            ) : (
                                <div className="text-center py-10">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-400"
                                    >
                                        <FiCheckCircle size={40} />
                                    </motion.div>
                                    <h3 className="text-2xl font-bold font-heading text-white mb-2">Check Your Inbox</h3>
                                    <p className="text-muted-foreground">We've sent the guide to <strong>{email}</strong>.</p>
                                    <button
                                        onClick={onClose}
                                        className="mt-10 text-blue-500 font-mono text-xs uppercase tracking-widest hover:text-blue-400"
                                    >
                                        Return to Site
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Visual Decorative Grid */}
                        <div className="absolute inset-0 bg-grid-white opacity-5 pointer-events-none" />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
