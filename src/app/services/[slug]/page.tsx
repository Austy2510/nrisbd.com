import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceScrollytelling } from "@/components/services/ServiceScrollytelling";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ServiceSchema } from "@/components/seo/ServiceSchema";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
    return (
        <main className="min-h-screen bg-background text-foreground">
            <Breadcrumbs items={[
                { name: "Home", href: "/" },
                { name: "Services", href: "/services" },
                { name: "Structural Audit", href: "/services/structural-audit" }
            ]} />
            <ServiceSchema
                name="Structural Audit & Forensic Engineering"
                description="Comprehensive structural audit services including forensic engineering, Non-Destructive Testing (NDT), seismic assessment, and condition surveys for commercial and industrial buildings in Bangladesh."
                url="https://nris.com.bd/services/structural-audit"
                serviceType="Structural Engineering Audit"
            />
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
