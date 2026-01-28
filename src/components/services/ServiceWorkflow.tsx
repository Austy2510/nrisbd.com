"use client";

import { motion } from "framer-motion";
import { FiCheckCircle, FiCpu, FiDatabase, FiFileText } from "react-icons/fi";

const steps = [
    {
        icon: FiDatabase,
        title: "Data Acquisition",
        desc: "Lidar scanning and non-destructive testing (NDT) to capture the exact state of the structure."
    },
    {
        icon: FiCpu,
        title: "Computational Modeling",
        desc: "Generating a high-fidelity Digital Twin to simulate load scenarios and stress points."
    },
    {
        icon: FiFileText,
        title: "Forensic Analysis",
        desc: "AI-driven diagnostics to identify micro-cracks, corrosion, and structural anomalies."
    },
    {
        icon: FiCheckCircle,
        title: "Intervention Strategy",
        desc: "Prescriptive retrofitting solutions optimized for cost, safety, and longevity."
    }
];

export function ServiceWorkflow() {
    return (
        <div className="py-20">
            <h3 className="text-3xl font-heading font-bold mb-12 text-center text-primary">The NRIS Audit Protocol</h3>
            <div className="relative">
                {/* Connecting Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500 to-blue-500/0" />

                <div className="space-y-12 md:space-y-24">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            className={`flex flex-col md:flex-row items-start md:items-center gap-8 ${i % 2 === 0 ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Text Side */}
                            <div className="flex-1 md:text-right w-full md:w-auto pl-16 md:pl-0 md:pr-12">
                                {i % 2 === 0 ? (
                                    <div className="md:text-left md:pl-12"> {/* Swap text align for alternate */}
                                        <h4 className="text-xl font-bold font-heading mb-2">{step.title}</h4>
                                        <p className="text-muted-foreground">{step.desc}</p>
                                    </div>
                                ) : (
                                    <div className="md:text-right">
                                        <h4 className="text-xl font-bold font-heading mb-2">{step.title}</h4>
                                        <p className="text-muted-foreground">{step.desc}</p>
                                    </div>
                                )}
                            </div>

                            {/* Center Icon */}
                            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-background border border-blue-500 z-10 text-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.5)]">
                                <step.icon size={20} />
                            </div>

                            {/* Empty Side for balance */}
                            <div className="hidden md:block flex-1" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
