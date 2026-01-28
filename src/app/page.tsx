import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSequence } from "@/components/home/HeroSequence";
import { ProjectGrid } from "@/components/projects/ProjectGrid";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <HeroSequence />

      {/* Content Placeholders (to allow scrolling) */}
      <section className="bg-background py-32 px-6">
        <div className="container mx-auto">
          <h2 className="text-4xl font-heading font-bold mb-12">Engineered for Complexity.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 font-light text-muted-foreground text-lg leading-relaxed">
            <p>
              The global AEC industry is undergoing a paradigm shift. NRIS BD stands at the forefront of this digital renaissance.
              We don't just draft blueprints; we simulate reality.
            </p>
            <p>
              Leveraging BIM, Computational Design, and AI-driven analytics, we deliver infrastructure that is risk-averse, cost-optimized, and future-proof.
            </p>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <ProjectGrid />

      <Footer />
    </main>
  );
}
