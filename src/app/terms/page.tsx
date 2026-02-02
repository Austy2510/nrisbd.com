import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-6 py-40 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-12">Terms of Service.</h1>
                <div className="space-y-8 text-muted-foreground font-light leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Engineering Consultations</h2>
                        <p>All preliminary consultations provided through this website are discovery-based. Official engineering advice is only delivered under signed contractual agreements.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Intellectual Property</h2>
                        <p>All designs, 3D renderings, and technical articles on this site are the intellectual property of NR Intellectual Solution. Unauthorized reproduction is strictly prohibited.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Compliance</h2>
                        <p>Clients are responsible for ensuring that the data provided for structural audits or BIM modeling is accurate and corresponds to the physical state of the asset.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Jurisdictional Law</h2>
                        <p>These terms are governed by the laws of the People's Republic of Bangladesh. Any disputes shall be settled within the jurisdiction of Dhaka courts.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
