"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import projects from "@/data/projects.json";
import { cn } from "@/lib/utils";
// Using react-icons/fi
import { FiArrowUpRight, FiLayers, FiMapPin } from "react-icons/fi";

export function ProjectGrid() {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

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
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-md bg-muted"
                            onMouseEnter={() => setHoveredId(project.id)}
                            onMouseLeave={() => setHoveredId(null)}
                        >
                            {/* Background Image */}
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter group-hover:brightness-50"
                            />

                            {/* Wireframe Overlay Effect (Simulated) */}
                            <div
                                className={cn(
                                    "absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-0 transition-opacity duration-500 bg-[length:40px_40px]",
                                    hoveredId === project.id ? "opacity-20" : ""
                                )}
                            />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between">
                                <div className="flex justify-between items-start">
                                    <span className="px-3 py-1 bg-black/50 backdrop-blur text-xs font-mono border border-white/10 rounded">
                                        {project.category}
                                    </span>
                                    <div className="bg-white text-black p-2 rounded-full opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <FiArrowUpRight size={20} />
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold font-heading mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center text-sm text-muted-foreground mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                        <FiMapPin className="mr-2" /> {project.location}
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 border-t border-white/20 pt-4 translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-150">
                                        {project.stats.map((stat, i) => (
                                            <div key={i}>
                                                <div className="text-xs text-muted-foreground mb-1">{stat.label}</div>
                                                <div className="text-lg font-bold font-mono">{stat.value}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
