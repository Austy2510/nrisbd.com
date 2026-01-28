import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function InsightsPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-heading font-bold mb-4">Engineering Insights</h1>
                    <p className="text-muted-foreground">Technical whitepapers and case studies coming soon.</p>
                </div>
            </div>
            <Footer />
        </main>
    );
}
