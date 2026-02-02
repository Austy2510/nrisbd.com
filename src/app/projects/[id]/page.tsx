"use client";

import { use } from "react";
import projects from "@/data/projects.json";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiUser, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const project = projects.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero Section */}
            <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
                <Image
                    src={project.image || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"}
                    alt={project.title}
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-6 md:p-24 z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Link href="/projects" className="inline-flex items-center text-blue-500 mb-8 hover:text-blue-400 transition-colors">
                            <FiArrowLeft className="mr-2" /> Back to Projects
                        </Link>
                        <div className="inline-block px-4 py-1 bg-blue-600/20 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-6">
                            {project.category}
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold font-heading text-white max-w-4xl leading-tight">
                            {project.title}
                        </h1>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                        {/* Left: Details */}
                        <div className="lg:col-span-2">
                            <h2 className="text-2xl font-bold font-heading text-white mb-8 border-b border-white/10 pb-4">Project Overview</h2>
                            <p className="text-xl text-muted-foreground font-light leading-relaxed mb-12">
                                {project.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                                <div className="glass-card p-8 rounded-3xl">
                                    <h3 className="text-blue-500 font-bold mb-4 flex items-center">
                                        <FiCheckCircle className="mr-2" /> Core Objective
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Leveraging advanced structural intelligence to ensure the long-term resilience and operational excellence of this {project.category.toLowerCase()} asset.
                                    </p>
                                </div>
                                <div className="glass-card p-8 rounded-3xl">
                                    <h3 className="text-blue-500 font-bold mb-4 flex items-center">
                                        <FiCheckCircle className="mr-2" /> Technical Approach
                                    </h3>
                                    <p className="text-muted-foreground text-sm leading-relaxed">
                                        Deployment of Digital Twin methodologies and site-specific morphological analysis to mitigate risk and optimize lifecycle costs.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Sidebar Stats */}
                        <div className="space-y-8">
                            <div className="glass-card p-8 rounded-3xl border border-white/10">
                                <h3 className="text-lg font-bold font-heading text-white mb-8">Metadata</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <span className="text-xs font-mono uppercase text-white/40 flex items-center gap-2">
                                            <FiMapPin /> Location
                                        </span>
                                        <span className="text-sm font-bold text-white">{project.location}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <span className="text-xs font-mono uppercase text-white/40 flex items-center gap-2">
                                            <FiCalendar /> Year
                                        </span>
                                        <span className="text-sm font-bold text-white">{project.year}</span>
                                    </div>
                                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                        <span className="text-xs font-mono uppercase text-white/40 flex items-center gap-2">
                                            <FiUser /> Client
                                        </span>
                                        <span className="text-sm font-bold text-white uppercase text-right max-w-[150px]">{project.client}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="glass-card p-8 rounded-3xl border border-blue-500/20 bg-blue-500/5">
                                <h3 className="text-lg font-bold font-heading text-white mb-8">Dynamic Metrics</h3>
                                <div className="grid grid-cols-1 gap-6">
                                    {project.stats?.map((stat, i) => (
                                        <div key={i}>
                                            <div className="text-[10px] text-white/40 mb-1 uppercase tracking-widest">{stat.label}</div>
                                            <div className="text-2xl font-bold font-mono text-blue-400">{stat.value}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
