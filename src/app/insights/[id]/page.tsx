"use client";

import { use } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import insights from "@/data/insights.json";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiCalendar, FiUser, FiArrowLeft, FiShare2, FiMonitor } from "react-icons/fi";
import { motion } from "framer-motion";

export default function InsightDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const article = insights.find((i) => i.id === resolvedParams.id);

    if (!article) return notFound();

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
                <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 flex items-end pb-20 px-6">
                    <div className="container mx-auto">
                        <Link
                            href="/insights"
                            className="inline-flex items-center gap-2 text-blue-500 font-mono text-[10px] uppercase tracking-widest mb-8 hover:text-white transition-colors group"
                        >
                            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Intelligence
                        </Link>
                        <div className="max-w-4xl">
                            <span className="px-4 py-1.5 bg-blue-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full text-white mb-6 inline-block">
                                {article.category}
                            </span>
                            <h1 className="text-4xl md:text-7xl font-black font-heading leading-[0.9] text-white tracking-tighter shadow-sm mb-6">
                                {article.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-sm text-white/60 font-mono uppercase tracking-widest">
                                <div className="flex items-center gap-2">
                                    <FiCalendar className="text-blue-500" /> {article.date}
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiUser className="text-blue-500" /> {article.author}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-6">
                <div className="container mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Main Content */}
                    <div className="lg:col-span-8">
                        <div className="prose prose-invert prose-blue max-w-none">
                            <p className="text-xl md:text-2xl font-light leading-relaxed text-blue-100/80 mb-12 italic border-l-4 border-blue-500 pl-8">
                                "{article.excerpt}"
                            </p>

                            <div className="space-y-8 text-muted-foreground font-light leading-relaxed text-lg">
                                <p>Building infrastructure in the rapidly evolving landscape of Bangladesh demands a synthesis of heritage engineering and future-forward technology. In this technical deep-dive, we examine the critical parameters that define resilience in modern AEC projects.</p>

                                <h2 className="text-3xl font-bold font-heading text-white pt-8">The Technical Paradigm</h2>
                                <p>As urbanization intensifies in Dhaka and Chittagong, the stress on existing structures and the complexity of new developments reach unprecedented levels. Our approach leverages high-fidelity data acquisition—utilizing drone-based photogrammetry and LiDAR—to create Digital Twins that serve as the single source of truth for the entire project lifecycle.</p>

                                <div className="p-8 glass-card rounded-3xl border border-blue-500/20 bg-blue-500/5 my-12">
                                    <h4 className="text-blue-400 font-bold mb-4 flex items-center gap-2">
                                        <FiMonitor /> Strategic Advantage
                                    </h4>
                                    <p className="text-sm">Implementing these technologies reduced rework costs by an average of 18% across our last five surveyed industrial facilities in Savar.</p>
                                </div>

                                <h2 className="text-3xl font-bold font-heading text-white pt-8">Protocols & Compliance</h2>
                                <p>The Bangladesh National Building Code (BNBC) 2020 has introduced rigorous standards for fire safety and seismic resistance. Navigating these mandates requires more than just compliance; it requires a predictive engineering mindset. We deploy parametric modeling to simulate seismic events, allowing us to reinforce structures precisely where the physics demands it, rather than where guesswork suggests.</p>

                                <p>In conclusion, the future of engineering in Bangladesh is not just about height or scale—it's about the intelligence embedded within the material. By bridging the gap between physical assets and digital replicas, we ensure that every structure is not just built, but engineered for a century of performance.</p>
                            </div>
                        </div>

                        {/* Share & Actions */}
                        <div className="mt-20 pt-12 border-t border-white/5 flex items-center justify-between">
                            <div className="flex gap-4">
                                <button aria-label="Share article" className="p-4 bg-white/5 rounded-full hover:bg-blue-600 transition-all text-white border border-white/5">
                                    <FiShare2 />
                                </button>
                            </div>
                            <Link href="/contact" className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-all">
                                Discuss this topic
                            </Link>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-12">
                        <div className="glass-card p-8 rounded-3xl border border-white/5">
                            <h3 className="text-xl font-bold font-heading text-white mb-6">Technical Resources</h3>
                            <div className="space-y-4">
                                <div className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                                    <div className="text-[10px] text-blue-500 font-mono mb-1">PDF GUIDE</div>
                                    <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">BNBC 2020 Cheat Sheet</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer group">
                                    <div className="text-[10px] text-blue-500 font-mono mb-1">DATA SHEET</div>
                                    <div className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">NDT Testing Parameters</div>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-3xl border border-white/5">
                            <h3 className="text-xl font-bold font-heading text-white mb-6">Recent Articles</h3>
                            <div className="space-y-6">
                                {insights.filter(i => i.id !== article.id).slice(0, 3).map(rel => (
                                    <Link key={rel.id} href={`/insights/${rel.id}`} className="group block">
                                        <div className="text-[10px] text-white/40 mb-1">{rel.date}</div>
                                        <div className="text-sm font-bold group-hover:text-blue-400 text-white transition-colors leading-snug">
                                            {rel.title}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <Footer />
        </main>
    );
}
