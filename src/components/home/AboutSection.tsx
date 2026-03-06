"use client";

import { motion } from "framer-motion";
import { FiShield, FiZap, FiTarget } from "react-icons/fi";

const stats = [
    {
        label: "Core Projects",
        value: "21+",
        icon: FiShield,
        description: "Multidisciplinary infrastructure audits and design projects completed."
    },
    {
        label: "NDT Compliance",
        value: "100%",
        icon: FiZap,
        description: "Rigorous adherence to international Non-Destructive Testing standards."
    },
    {
        label: "Senior Expertise",
        value: "50Yr+",
        icon: FiTarget,
        description: "Collective experience of our lead consultants and technical advisors."
    }
];

export function AboutSection() {
    return (
        <section className="py-32 px-6 bg-background relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-block px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-6">
                            Engineering Excellence
                        </div>
                        <h2 className="text-5xl md:text-7xl font-black font-heading tracking-tighter mb-8 text-white leading-tight">
                            The Engineering <br /> <span className="text-blue-500">Core.</span>
                        </h2>
                        <div className="w-20 h-1 bg-blue-600 mb-8" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                            Since 2018, NR Intellectual Solution is an autonomous, multi-disciplinary consulting firm providing appropriate, adequate and sustainable solutions for infrastructure development.
                        </p>
                        <p className="text-lg text-muted-foreground/80 font-light leading-relaxed">
                            We bridge the gap between physics and code, delivering innovative ideas and consulting services from inception to project completion. Our focus is on capacity building and high-precision technical auditing.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="glass-card p-10 rounded-[32px] border border-white/5 hover:border-blue-500/30 transition-all duration-500 group"
                        >
                            <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center mb-8 border border-blue-500/20 group-hover:bg-blue-600/20 transition-colors">
                                <stat.icon className="text-blue-500 w-6 h-6" />
                            </div>
                            <div className="text-5xl md:text-6xl font-black font-heading text-white mb-2 tracking-tighter group-hover:text-blue-500 transition-colors">
                                {stat.value}
                            </div>
                            <div className="text-xs font-mono uppercase tracking-[0.2em] text-blue-500/60 mb-6">
                                {stat.label}
                            </div>
                            <p className="text-muted-foreground font-light text-sm leading-relaxed">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
