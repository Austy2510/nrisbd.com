import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";
import team from "@/data/team.json";
import { FiDownload, FiMapPin } from "react-icons/fi";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            {/* Hero */}
            <section className="pt-32 pb-20 px-6">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8">The Engineering Core.</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        NRIS BD is a collective of visionary engineers, architects, and data scientists dedicated to transforming the built environment of Bangladesh.
                    </p>
                </div>
            </section>

            {/* Virtual Tour Placeholder */}
            <section className="py-12">
                <div className="container mx-auto px-6">
                    <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 group cursor-pointer">
                        {/* This would be the 360 viewer or video */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 flex items-center justify-center">
                            <span className="px-6 py-3 border border-white/30 rounded-full text-white backdrop-blur-md group-hover:bg-white group-hover:text-black transition-all">
                                Explore Virtual HQ
                            </span>
                        </div>
                        <Image src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1600" alt="Office" fill className="object-cover" />
                    </div>
                </div>
            </section>

            {/* Team Grid */}
            <section className="py-24 px-6">
                <div className="container mx-auto">
                    <h2 className="text-3xl font-heading font-bold mb-16 text-center">Meet the Minds</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {team.map((member) => (
                            <div key={member.id} className="group relative">
                                <div className="aspect-square relative overflow-hidden rounded-xl mb-4 bg-muted">
                                    <Image src={member.image} alt={member.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <h3 className="text-xl font-bold font-heading">{member.name}</h3>
                                <p className="text-sm text-blue-500 mb-2">{member.role}</p>
                                <div className="flex flex-wrap gap-2">
                                    {member.credentials.map((cred, i) => (
                                        <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-white/5 rounded border border-white/5 text-muted-foreground">
                                            {cred}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lead Magnet CTA */}
            <section className="py-24 bg-blue-950/20 border-y border-blue-900/30">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6">Building in 2026?</h2>
                    <p className="text-lg text-blue-200/80 mb-10 max-w-2xl mx-auto">
                        Download our comprehensive "Dhaka Construction Compliance Checklist 2026" to navigate the new RAJUK regulations and Fire Safety codes.
                    </p>
                    <form className="flex flex-col md:flex-row gap-4 justify-center max-w-md mx-auto">
                        <input type="email" placeholder="Enter your work email" className="px-6 py-3 rounded-full bg-black/50 border border-white/10 focus:border-blue-500 focus:outline-none w-full" />
                        <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition-all flex items-center justify-center gap-2">
                            <FiDownload /> Download PDF
                        </button>
                    </form>
                </div>
            </section>

            <Footer />
        </main>
    );
}
