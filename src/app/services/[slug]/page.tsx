import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceScrollytelling } from "@/components/services/ServiceScrollytelling";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />

            {/* Minimal Hero for the specific service */}
            <header className="container mx-auto px-6 pt-32 pb-12">
                <Link href="/services" className="inline-flex items-center text-sm text-muted-foreground hover:text-white mb-8 transition-colors">
                    <FiArrowLeft className="mr-2" /> Back to Services
                </Link>
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-8xl font-black font-heading tracking-tighter mb-6 uppercase">
                        Structural <span className="text-blue-500">Audit.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
                        Precision diagnostics for critical infrastructure. We define resilience through data-driven forensic engineering.
                    </p>
                </div>
            </header>

            {/* Immersive Scrollytelling Section */}
            <ServiceScrollytelling />

            <Footer />
        </main>
    );
}
