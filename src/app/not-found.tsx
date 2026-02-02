import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FiAlertTriangle } from "react-icons/fi";

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center container mx-auto px-6 text-center">
                <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-8 animate-pulse">
                    <FiAlertTriangle size={40} />
                </div>
                <h1 className="text-6xl md:text-9xl font-black font-heading text-white mb-4 leading-none">404</h1>
                <h2 className="text-2xl md:text-4xl font-bold font-heading text-blue-500 mb-8 tracking-tight">Coordinate Mismatch.</h2>
                <p className="text-muted-foreground max-w-md mx-auto mb-12 font-light leading-relaxed">
                    The quadrant you are looking for does not exist in our infrastructure database. It may have been relocated or decommissioned.
                </p>
                <Link
                    href="/"
                    className="px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-blue-500 hover:text-white transition-all shadow-xl shadow-blue-500/10"
                >
                    Return to Nexus
                </Link>
            </div>
            <Footer />
        </main>
    );
}
