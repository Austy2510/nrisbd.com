import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSequence } from "@/components/home/HeroSequence";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { FeasibilityCalculator } from "@/components/tools/FeasibilityCalculator";
import { BimViewer } from "@/components/projects/BimViewer";
import { FiHexagon, FiZap, FiDatabase } from "react-icons/fi";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background">
      <Navbar />

      {/* 3D Scrollytelling Hero */}
      <HeroSequence />

      {/* Value Proposition Section */}
      <section className="bg-background py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0" />
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-[10px] font-mono text-blue-500 uppercase tracking-widest mb-8">
                <FiHexagon className="animate-spin-slow" /> Structural Intelligence
              </div>
              <h2 className="text-4xl md:text-7xl font-bold font-heading mb-10 text-white leading-tight">
                Simulating Reality, <br /> <span className="text-blue-500">De-risking Progress.</span>
              </h2>
              <div className="space-y-8 font-light text-muted-foreground text-xl leading-relaxed">
                <p>
                  As Bangladesh enters a new era of infrastructure complexity, traditional engineering cycles are no longer sufficient.
                  NRIS BD bridges the gap between physics and code.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                  <div className="space-y-4">
                    <FiZap className="text-blue-500 w-6 h-6" />
                    <h4 className="text-white font-bold font-heading">Lidar Surveying</h4>
                    <p className="text-sm">Millimeter-level precision for existing asset auditing.</p>
                  </div>
                  <div className="space-y-4">
                    <FiDatabase className="text-blue-500 w-6 h-6" />
                    <h4 className="text-white font-bold font-heading">Digital Twins</h4>
                    <p className="text-sm">Dynamic 4D/5D models for construction optimization.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <BimViewer />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Tool Section */}
      <FeasibilityCalculator />

      {/* Selected Works Portfolio */}
      <ProjectGrid />

      <Footer />
    </main>
  );
}
