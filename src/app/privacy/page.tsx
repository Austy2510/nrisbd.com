import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="container mx-auto px-6 py-40 max-w-4xl">
                <h1 className="text-4xl md:text-6xl font-bold font-heading mb-12">Privacy Policy.</h1>
                <div className="space-y-8 text-muted-foreground font-light leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Data Collection</h2>
                        <p>NR Intellectual Solution (NRIS) collects minimal data specifically for project inquiries. This includes name, email address, and technical requirements provided through our contact forms.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Use of Information</h2>
                        <p>Information collected is used solely to respond to project requests, provide technical consultations, and ensure compliance with local engineering regulations.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Data Security</h2>
                        <p>We deploy industry-standard encryption to protect your technical briefs. We do not sell or share client data with third-party marketing entities.</p>
                    </section>
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Cookies</h2>
                        <p>Our website uses essential session cookies to improve navigation and user experience. No tracking cookies are used for advertising purposes.</p>
                    </section>
                </div>
            </div>
            <Footer />
        </main>
    );
}
