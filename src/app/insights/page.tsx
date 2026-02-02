"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import insights from "@/data/insights.json";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiCalendar, FiUser, FiArrowRight } from "react-icons/fi";

export default function InsightsPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />

            {/* Header */}
            <section className="pt-40 pb-20 px-6">
                <div className="container mx-auto">
                    <div className="max-w-3xl">
                        <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-6">
                            Industry Intelligence
                        </div>
                        <h1 className="text-5xl md:text-7xl font-black font-heading tracking-tighter mb-8 text-white leading-tight">
                            Engineering <br /> <span className="text-blue-500">Insights.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground font-light leading-relaxed">
                            Deep dives into the technical trends defining infrastructure in Bangladesh and beyond.
                        </p>
                    </div>
                </div>
            </section>

            {/* Articles Grid */}
            <section className="py-24 px-6 flex-1">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {insights.map((article, i) => (
                            <motion.div
                                key={article.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group glass-card rounded-[32px] overflow-hidden flex flex-col border border-white/5 hover:border-blue-500/30 transition-all duration-500"
                            >
                                <div className="aspect-[16/10] relative overflow-hidden bg-muted">
                                    <Image
                                        src={article.image}
                                        alt={article.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-blue-600 text-[10px] font-bold uppercase tracking-widest text-white rounded-full">
                                            {article.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8 flex flex-col flex-1">
                                    <div className="flex items-center gap-4 text-[10px] font-mono text-white/40 mb-4 uppercase tracking-wider">
                                        <span className="flex items-center gap-1.5"><FiCalendar className="text-blue-500" /> {article.date}</span>
                                        <span className="flex items-center gap-1.5"><FiUser className="text-blue-500" /> {article.author}</span>
                                    </div>
                                    <h3 className="text-2xl font-bold font-heading text-white mb-4 group-hover:text-blue-400 transition-colors leading-tight">
                                        {article.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground font-light mb-8 leading-relaxed line-clamp-3">
                                        {article.excerpt}
                                    </p>
                                    <div className="mt-auto pt-6 border-t border-white/5 flex items-center justify-between">
                                        <button className="text-[10px] font-bold uppercase tracking-widest text-blue-500 flex items-center gap-2 group/btn">
                                            Read Full Article <FiArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
