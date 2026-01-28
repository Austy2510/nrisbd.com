import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

export default function ContactPage() {
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

                    <div className="bg-muted p-8 rounded-3xl border border-white/5">
                        <h3 className="text-2xl font-bold mb-6">Project Inquiry</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-muted-foreground">First Name</label>
                                    <input type="text" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-muted-foreground">Last Name</label>
                                    <input type="text" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-muted-foreground">Email Address</label>
                                <input type="email" className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-muted-foreground">Project Type</label>
                                <select className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors appearance-none text-muted-foreground">
                                    <option>Structural Audit</option>
                                    <option>High-Rise Design</option>
                                    <option>Factory Retrofitting</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-muted-foreground">Message</label>
                                <textarea rows={4} className="w-full bg-background border border-white/10 rounded-lg px-4 py-3 focus:border-blue-500 outline-none transition-colors" placeholder="Tell us about your project scale and timeline..."></textarea>
                            </div>
                            <button className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-lg hover:bg-gray-200 transition-colors">
                                Send Inquiry
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
