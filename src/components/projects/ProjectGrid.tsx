"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import staticProjects from "@/data/projects.json";
import { cn } from "@/lib/utils";
// Using react-icons/fi
import { FiArrowUpRight, FiLayers, FiMapPin } from "react-icons/fi";
import { client } from "@/sanity/lib/client";
import { projectsQuery } from "@/sanity/lib/queries";
import Link from "next/link";

interface Project {
    id: string;
    title: string;
    category: string;
    location: string;
    image?: string;
    stats?: { label: string; value: string }[];
}

export function ProjectGrid() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [projects, setProjects] = useState<Project[]>(staticProjects as Project[]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await client.fetch(projectsQuery);
                if (data && data.length > 0) {
                    setProjects(data);
                }
            } catch (error) {
                console.warn("Sanity fetch failed or returned no data, using local fallback.", error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold font-heading mb-4">
                            Selected Works
                        </h2>
                        <p className="text-muted-foreground max-w-xl text-lg">
                            A collection of engineering milestones across Bangladesh, redefining the skyline through data-driven design.
                        </p>
                    </div>
                    <button className="hidden md:block px-8 py-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all">
                        View All Projects
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Link key={project.id} href={`/projects/${project.id}`}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-[4/5] overflow-hidden rounded-3xl glass-card h-full"
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Background Image */}
                            {project.image ? (
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter group-hover:brightness-50"
                                />
                            ) : (
                                <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
                                    <FiLayers size={40} className="text-white/20" />
                                </div>
                            )}

                            {/* Wireframe Overlay Effect (X-Ray) */}
                            <div
                                className={cn(
                                    "absolute inset-0 bg-grid-white mask-radial opacity-0 transition-opacity duration-700 pointer-events-none z-10",
                                    hoveredId === project.id ? "opacity-40" : ""
                                )}
                            />

                            <div className={cn(
                                "absolute inset-0 bg-blue-600/10 mix-blend-overlay opacity-0 transition-opacity duration-700 pointer-events-none z-10",
                                hoveredId === project.id ? "opacity-100" : ""
                            )} />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between z-20">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 bg-black/50 backdrop-blur text-[10px] font-mono border border-white/10 rounded tracking-[0.2em] uppercase">
                                        {project.category}
                                    </span>
                                    <div className="bg-white text-black p-2 rounded-full opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <FiArrowUpRight size={20} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl md:text-3xl font-bold font-heading mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-white/60 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <FiMapPin className="mr-2 text-blue-500" /> {project.location}
                                    </div>

                                    {/* Stats with Animated Counters Style */}
                                    {project.stats && project.stats.length > 0 && (
                                        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                                            {project.stats.map((stat, i) => (
                                                <div key={i}>
                                                    <div className="text-[10px] text-white/40 mb-1 uppercase tracking-widest">{stat.label}</div>
                                                    <div className="text-xl font-bold font-mono text-blue-400">{stat.value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </section>
    );
}
