"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import team from "@/data/team.json";
import { FiDownload, FiCheckCircle, FiShield, FiZap, FiTarget } from "react-icons/fi";
import { VirtualTour } from "@/components/about/VirtualTour";
import { ComplianceGuideModal } from "@/components/modals/ComplianceGuideModal";

export default function AboutPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section className="pt-40 pb-20 px-6">
                <div className="container mx-auto">
                    <div className="max-w-4xl">
                        <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-6">
                            Autonomous Multidisciplinary Consulting
                        </div>
                        <h1 className="text-5xl md:text-8xl font-black font-heading tracking-tighter mb-8 text-white leading-[0.9]">
                            The Engineering <br /> <span className="text-blue-500">Core.</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed">
                            Established in 2022, NR Intellectual Solution is a collective of highly qualified experts providing sustainable infrastructure development solutions for the digital age.
                        </p>
                    </div>
                </div>
            </section>

            {/* Virtual HQ Tour */}
            <section className="py-12 px-6">
                <div className="container mx-auto">
                    <VirtualTour />
                </div>
            </section>

            {/* Core Values / Stats */}
            <section className="py-24 px-6 bg-slate-900/30">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="space-y-4">
                            <FiShield className="text-blue-500 w-8 h-8" />
                            <h3 className="text-xl font-bold font-heading text-white">Integrity & Quality</h3>
                            <p className="text-muted-foreground font-light leading-relaxed">
                                Our reputation for engineering excellence is built on a foundation of diversity and uncompromising safety standards.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <FiZap className="text-blue-500 w-8 h-8" />
                            <h3 className="text-xl font-bold font-heading text-white">Technological Edge</h3>
                            <p className="text-muted-foreground font-light leading-relaxed">
                                Leveraging Topcon GNSS Receivers and DJI Mavic 2 Pro Drones for millimeter-precision surveying and mapping.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <FiTarget className="text-blue-500 w-8 h-8" />
                            <h3 className="text-xl font-bold font-heading text-white">Sustainable Future</h3>
                            <p className="text-muted-foreground font-light leading-relaxed">
                                We prioritize local wisdom and socio-economic interests to deliver 100% client satisfaction through affordable innovation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-32 px-6">
                <div className="container mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-bold font-heading text-white mb-4">Meet the Experts.</h2>
                        <p className="text-muted-foreground font-light">The multidisciplinary minds driving Bangladesh's digital renaissance.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <div key={member.id} className="group relative glass-card p-6 rounded-[32px] transition-all duration-500 hover:bg-white/5 border border-white/5">
                                <div className="aspect-square relative overflow-hidden rounded-2xl mb-6 bg-muted/50">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:filter group-hover:grayscale-0 grayscale"
                                    />
                                    <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay group-hover:opacity-0 transition-opacity" />
                                </div>
                                <h3 className="text-xl font-bold font-heading text-white mb-1">{member.name}</h3>
                                <p className="text-sm text-blue-500 mb-6 font-mono uppercase tracking-widest">{member.role}</p>
                                <div className="space-y-2">
                                    {member.credentials.map((cred, i) => (
                                        <div key={i} className="flex items-start gap-2 text-[10px] text-white/40 leading-relaxed font-mono">
                                            <FiCheckCircle className="mt-0.5 text-blue-500 flex-shrink-0" />
                                            <span>{cred}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lead Magnet CTA */}
            <section className="py-32 bg-blue-600 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white opacity-10" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <h2 className="text-4xl md:text-7xl font-heading font-black mb-8 text-white leading-tight">
                        Building the <br /> Future of Dhaka.
                    </h2>
                    <p className="text-xl text-blue-100/80 mb-12 max-w-2xl mx-auto font-light">
                        Download the comprehensive "Dhaka Construction Compliance Protocol 2026" to ensure your project exceeds the latest safety and regulatory standards.
                    </p>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-12 py-6 bg-white text-blue-600 rounded-full font-black uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/40 hover:scale-105 transition-all text-sm flex items-center gap-3 mx-auto"
                    >
                        <FiDownload size={20} /> Access technical guide
                    </button>
                </div>
            </section>

            <ComplianceGuideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <Footer />
        </main>
    );
}
