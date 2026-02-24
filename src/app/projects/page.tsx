import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export const metadata: Metadata = {
    title: "Projects - Our Engineering Portfolio",
    description:
        "Explore NR Intellectual Solution's portfolio of 15+ engineering projects across Bangladesh including structural audits, BIM modeling, digital twins, solar power plants, and smart city planning.",
    keywords: [
        "engineering projects Bangladesh",
        "structural audit projects",
        "BIM projects Dhaka",
        "infrastructure portfolio",
        "construction projects Bangladesh",
    ],
    alternates: {
        canonical: "https://nris.com.bd/projects",
    },
    openGraph: {
        title: "Engineering Portfolio | NR Intellectual Solution",
        description:
            "15+ core projects defining the future of infrastructure in Bangladesh.",
        url: "https://nris.com.bd/projects",
    },
};

export default function ProjectsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-20">
                <ProjectGrid />
            </div>
            <Footer />
        </main>
    );
}
