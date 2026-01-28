import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ServiceWorkflow } from "@/components/services/ServiceWorkflow";

export default function ServicesPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />

            <div className="container mx-auto px-6 py-32">
                <div className="max-w-4xl mx-auto text-center mb-24">
                    <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6">Technical Mastery.</h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We provide a spectrum of high-precision engineering services, from forensic structural audits to advanced algorithmic design.
                        Our methodology is rooted in data, validated by physics, and visualized through technology.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
                    <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors group">
                        <h3 className="text-2xl font-bold font-heading mb-4 text-blue-500">Structural Audits & Retrofitting</h3>
                        <p className="text-muted-foreground mb-6">
                            Ensuring the longevity of built assets through rigorous NDT testing, code compliance verification, and performance-based retrofitting strategies.
                        </p>
                        <ul className="space-y-2 text-sm text-foreground/80">
                            <li>• Load Capacity Assessment</li>
                            <li>• Fire Safety Upgrades (RMG)</li>
                            <li>• Seismic Vulnerability Analysis</li>
                        </ul>
                    </div>
                    <div className="p-8 border border-white/10 rounded-2xl hover:bg-white/5 transition-colors group">
                        <h3 className="text-2xl font-bold font-heading mb-4 text-orange-500">BIM & Digital Twins</h3>
                        <p className="text-muted-foreground mb-6">
                            Beyond 3D modeling. We create intelligent, data-rich digital replicas of physical assets to optimize construction, operation, and maintenance.
                        </p>
                        <ul className="space-y-2 text-sm text-foreground/80">
                            <li>• Clash Detection & Coordination</li>
                            <li>• 4D/5D Construction Simulation</li>
                            <li>• Asset Management Integration</li>
                        </ul>
                    </div>
                </div>

                <ServiceWorkflow />

            </div>

            <Footer />
        </main>
    );
}
