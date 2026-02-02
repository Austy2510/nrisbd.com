"use client";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FiMail, FiMapPin, FiPhone, FiCheckCircle, FiLoader } from "react-icons/fi";
import { useState } from "react";

export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);

        // Replace with actual key for production
        formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setIsSuccess(true);
                e.currentTarget.reset();
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch (error) {
            alert("Error submitting form. Please check your connection.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            <div className="container mx-auto px-6 py-32">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Side: Contact Information */}
                    <div>
                        <h1 className="text-5xl md:text-7xl font-heading font-black mb-8 text-white leading-tight">
                            Start the <br /><span className="text-blue-500">Dialogue.</span>
                        </h1>
                        <p className="text-xl text-muted-foreground mb-12 font-light leading-relaxed">
                            Ready to engineer the future? Schedule a consultation with our Principal Engineers to discuss your project's feasibility and compliance.
                        </p>

                        <div className="space-y-10">
                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 flex-shrink-0">
                                    <FiMapPin size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white mb-1">Corporate Headquarters</h4>
                                    <p className="text-muted-foreground font-light leading-relaxed">
                                        Level 12, Crystal Palace, Road 140, Gulshan 1<br />Dhaka-1212, Bangladesh
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 flex-shrink-0">
                                    <FiMail size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white mb-1">Technical Inquiries</h4>
                                    <p className="text-muted-foreground font-light">projects@nrisbd.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-6">
                                <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 flex-shrink-0">
                                    <FiPhone size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg text-white mb-1">Direct Consultation</h4>
                                    <p className="text-muted-foreground font-light">+880 1711 556 677</p>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="mt-16 rounded-[40px] overflow-hidden glass-card border border-white/5 h-[350px] relative group">
                            <div className="absolute inset-0 bg-slate-900/50 flex flex-col items-center justify-center p-8 text-center z-20">
                                <div className="w-16 h-16 bg-blue-600/20 rounded-full flex items-center justify-center text-blue-500 mb-6 animate-pulse">
                                    <FiMapPin size={32} />
                                </div>
                                <h4 className="text-white text-xl font-bold mb-2">Gulshan 1 Hub</h4>
                                <p className="text-muted-foreground text-sm font-light max-w-[250px] mb-8">
                                    Our centralized engineering war-room in the heart of Dhaka.
                                </p>
                                <button className="px-8 py-3 bg-blue-600 text-white rounded-full text-xs font-mono uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20">
                                    Get Directions
                                </button>
                            </div>
                            <div className="absolute inset-0 bg-grid-white/5 opacity-40 z-10" />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 to-transparent pointer-events-none" />
                        </div>
                    </div>

                    {/* Right Side: Contact Form */}
                    <div className="glass-card p-10 md:p-12 rounded-[48px] border border-white/5 relative h-fit">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[80px] -z-10" />

                        <h3 className="text-3xl font-bold font-heading text-white mb-2">Project Inquiry</h3>
                        <p className="text-muted-foreground text-sm font-light mb-10">Fill out the technical brief below and our team will respond within 24 hours.</p>

                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-6 animate-fade-up">
                                <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 text-4xl">
                                    <FiCheckCircle />
                                </div>
                                <h4 className="text-3xl font-bold text-white">Transmission Received.</h4>
                                <p className="text-muted-foreground font-light max-w-sm">
                                    Your inquiry has been logged in our system. A specialized engineer will reach out to discuss your requirements.
                                </p>
                                <button
                                    onClick={() => setIsSuccess(false)}
                                    className="px-8 py-3 border border-white/10 rounded-full text-xs font-mono uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                                >
                                    New Inquiry
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-8">
                                <input type="hidden" name="subject" value="New Engineering Inquiry" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label htmlFor="fname" className="block text-xs font-mono uppercase tracking-widest text-white/40">First Name</label>
                                        <input required name="first_name" id="fname" type="text" placeholder="John" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-white/20" />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lname" className="block text-xs font-mono uppercase tracking-widest text-white/40">Last Name</label>
                                        <input required name="last_name" id="lname" type="text" placeholder="Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-white/20" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-widest text-white/40">Email Address</label>
                                    <input required name="email" id="email" type="email" placeholder="technical.director@firm.com" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-white/20" />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="type" className="block text-xs font-mono uppercase tracking-widest text-white/40">Engineering Domain</label>
                                    <div className="relative">
                                        <select
                                            name="project_type"
                                            id="type"
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white appearance-none cursor-pointer"
                                        >
                                            <option className="bg-slate-900">Forensic Structural Audit (NDT)</option>
                                            <option className="bg-slate-900">BIM Level 3 / Digital Twin Setup</option>
                                            <option className="bg-slate-900">ESIA & Environmental Compliance</option>
                                            <option className="bg-slate-900">Power & Energy Infrastructure</option>
                                            <option className="bg-slate-900">Marine & Hydrographic Survey</option>
                                            <option className="bg-slate-900">Smart City Master Planning</option>
                                            <option className="bg-slate-900">High-Rise Structural Design</option>
                                            <option className="bg-slate-900">Other / Specialized Inquiry</option>
                                        </select>
                                        <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
                                            <FiLoader className="rotate-90" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="msg" className="block text-xs font-mono uppercase tracking-widest text-white/40">Technical Brief</label>
                                    <textarea required name="message" id="msg" rows={4} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all text-white placeholder:text-white/20 resize-none" placeholder="Scale of project, timeline, and core technical requirements..."></textarea>
                                </div>

                                <button
                                    disabled={isSubmitting}
                                    className="w-full py-5 bg-blue-600 text-white font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-blue-500 transition-all shadow-2xl shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-sm"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <FiLoader className="animate-spin" /> Transmitting...
                                        </>
                                    ) : (
                                        "Commit Inquiry"
                                    )}
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
