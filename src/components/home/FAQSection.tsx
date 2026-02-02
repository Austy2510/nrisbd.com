"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlus, FiMinus } from "react-icons/fi";

const faqs = [
    {
        question: "What exactly is a Structural Audit?",
        answer: "A structural audit is a technical health checkup of a building. At NR Intellectual Solution, we use Non-Destructive Testing (NDT) and visual inspections to assess load-carrying capacity, structural stability, and compliance with the Bangladesh National Building Code (BNBC)."
    },
    {
        question: "Why should I use BIM for my project in Bangladesh?",
        answer: "BIM (Building Information Modeling) reduces construction waste by up to 20% through clash detection. In the complex construction landscape of Dhaka, BIM allows us to simulate every pipe, beam, and wire before construction begins, saving time and costs."
    },
    {
        question: "How long does a typical feasibility study take?",
        answer: "Depending on the scale (Residential vs. Industrial), a preliminary feasibility study takes 7-14 days. This includes geotechnical review, local regulation checks (RAJUK/CDA), and initial ROI projections."
    },
    {
        question: "Do you provide consultancy for RMG factory compliance?",
        answer: "Yes. We specialize in remedial works and fire safety audits for the RMG sector, ensuring factories meet international standards for exports and ACCORD/RSC guidelines."
    }
];

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="py-24 px-6 bg-slate-950/20">
            <div className="container mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-6xl font-bold font-heading text-white mb-4">Common Inquiries.</h2>
                    <p className="text-muted-foreground font-light">Technical answers for the built environment.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="glass-card rounded-3xl overflow-hidden border border-white/5">
                            <button
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full px-8 py-6 flex items-center justify-between text-left group"
                            >
                                <span className="text-lg font-bold font-heading text-white group-hover:text-blue-400 transition-colors">
                                    {faq.question}
                                </span>
                                <div className="text-blue-500">
                                    {openIndex === i ? <FiMinus size={20} /> : <FiPlus size={20} />}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-8 pb-8 text-muted-foreground font-light leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
