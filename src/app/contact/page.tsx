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

        // This is a public demo key. User should replace with their own from web3forms.com
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
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-6 py-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                    <div>
                        <h1 className="text-5xl font-heading font-bold mb-8">Start the Dialogue.</h1>
                        <p className="text-xl text-muted-foreground mb-12">
                            Ready to engineer the future? Schedule a consultation with our Principal Engineers to discuss your project's feasibility and compliance.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <FiMapPin className="text-2xl text-blue-500 mt-1" />
                                <div>
                                    <h4 className="font-bold text-lg">Headquarters</h4>
                                    <p className="text-muted-foreground">Level 12, Crystal Palace, Gulshan 1<br />Dhaka-1212, Bangladesh</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FiMail className="text-2xl text-blue-500 mt-1" />
                                <div>
                                    <h4 className="font-bold text-lg">Inquiries</h4>
                                    <p className="text-muted-foreground">projects@nrisbd.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <FiPhone className="text-2xl text-blue-500 mt-1" />
                                <div>
                                    <h4 className="font-bold text-lg">Phone</h4>
                                    <p className="text-muted-foreground">+880 1711 000 000</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card p-8 rounded-3xl">
                        <h3 className="text-2xl font-bold mb-6">Project Inquiry</h3>

                        {isSuccess ? (
                            <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center space-y-4 animate-fade-up">
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500 text-3xl">
                                    <FiCheckCircle />
                                </div>
                                <h4 className="text-2xl font-bold">Message Sent!</h4>
                                <p className="text-muted-foreground">Thank you for contacting NRIS BD. Our engineering team will review your inquiry and respond within 24 hours.</p>
                                <button onClick={() => setIsSuccess(false)} className="text-sm font-bold uppercase tracking-widest border-b border-white/20 pb-1 mt-4 hover:text-blue-500 transition-colors">
                                    Send Another
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Hidden settings for Web3Forms */}
                                <input type="hidden" name="subject" value="New Lead from NRIS BD Website" />
                                <input type="hidden" name="from_name" value="NRIS BD Website" />

                                <div className="grid grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="fname" className="block text-sm font-medium mb-2 text-muted-foreground">First Name</label>
                                        <input required name="first_name" id="fname" type="text" placeholder="John" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300" />
                                    </div>
                                    <div>
                                        <label htmlFor="lname" className="block text-sm font-medium mb-2 text-muted-foreground">Last Name</label>
                                        <input required name="last_name" id="lname" type="text" placeholder="Doe" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300" />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-muted-foreground">Email Address</label>
                                    <input required name="email" id="email" type="email" placeholder="john@company.com" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300" />
                                </div>
                                <div>
                                    <label htmlFor="type" className="block text-sm font-medium mb-2 text-muted-foreground">Project Type</label>
                                    <select name="project_type" id="type" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300 appearance-none text-foreground">
                                        <option>Structural Audit</option>
                                        <option>High-Rise Design</option>
                                        <option>Factory Retrofitting</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="msg" className="block text-sm font-medium mb-2 text-muted-foreground">Message</label>
                                    <textarea required name="message" id="msg" rows={4} className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all duration-300" placeholder="Tell us about your project scale and timeline..."></textarea>
                                </div>
                                <button disabled={isSubmitting} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300 shadow-lg hover:shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                                    {isSubmitting ? (
                                        <>
                                            <FiLoader className="animate-spin" /> Sending...
                                        </>
                                    ) : (
                                        "Send Inquiry"
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
