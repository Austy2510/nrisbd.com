import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FiDownload, FiCheckCircle, FiShield, FiZap, FiTarget, FiLayers } from "react-icons/fi";
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-32">
                    {/* Forensic Structural Engineering */}
                    <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 group border border-white/5">
                        <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
                            <FiShield size={24} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-white">Forensic Structural Engineering</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Beyond standard audits. We perform deep-tissue structural investigations for heritage buildings and industrial complexes.
                        </p>
                        <ul className="space-y-3 text-[11px] font-mono uppercase tracking-wider text-white/40">
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-blue-500" /> Non-Destructive Testing (NDT)</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-blue-500" /> Rebar Mapping & Carbonation</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-blue-500" /> Retrofitting Strategy (BNBC)</li>
                        </ul>
                    </div>

                    {/* BIM & Digital Twins */}
                    <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 group border border-white/5">
                        <div className="w-12 h-12 bg-orange-600/10 rounded-2xl flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                            <FiLayers size={24} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-white">BIM & Digital Twins</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Implementing LOD 400 models that function as living assets for facility management and performance tracking.
                        </p>
                        <ul className="space-y-3 text-[11px] font-mono uppercase tracking-wider text-white/40">
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-orange-500" /> 4D Construction Sequencing</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-orange-500" /> Algorithmic Optimization</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-orange-500" /> Scan-to-BIM (Point Cloud)</li>
                        </ul>
                    </div>

                    {/* Environmental & ESIA */}
                    <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 group border border-white/5">
                        <div className="w-12 h-12 bg-green-600/10 rounded-2xl flex items-center justify-center text-green-500 mb-6 group-hover:scale-110 transition-transform">
                            <FiTarget size={24} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-white">ESIA & Sustainability</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Comprehensive Environmental & Social Impact Assessments aligned with JICA and World Bank standards.
                        </p>
                        <ul className="space-y-3 text-[11px] font-mono uppercase tracking-wider text-white/40">
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Biodiversity Monitoring</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Social Risk Mitigation</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-green-500" /> Net-Zero Design Consulting</li>
                        </ul>
                    </div>

                    {/* Power & Energy */}
                    <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 group border border-white/5">
                        <div className="w-12 h-12 bg-yellow-600/10 rounded-2xl flex items-center justify-center text-yellow-500 mb-6 group-hover:scale-110 transition-transform">
                            <FiZap size={24} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-white">Power Infrastructure</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Specialized design for high-voltage transmission lines and large-scale solar power generation plants.
                        </p>
                        <ul className="space-y-3 text-[11px] font-mono uppercase tracking-wider text-white/40">
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-yellow-500" /> 400kV Line Route Study</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-yellow-500" /> Solar Pre-feasibility</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-yellow-500" /> Substation Layout Planning</li>
                        </ul>
                    </div>

                    {/* Marine & Water */}
                    <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 group border border-white/5">
                        <div className="w-12 h-12 bg-cyan-600/10 rounded-2xl flex items-center justify-center text-cyan-500 mb-6 group-hover:scale-110 transition-transform">
                            <FiTarget size={24} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-white">Marine & Hydrography</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Advanced bathymetric surveys and morphological studies for river-bordering infrastructure and marine ports.
                        </p>
                        <ul className="space-y-3 text-[11px] font-mono uppercase tracking-wider text-white/40">
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-cyan-500" /> Bathymetric Data Mapping</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-cyan-500" /> Pier Foundation Analysis</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-cyan-500" /> Shoreline Erosion Control</li>
                        </ul>
                    </div>

                    {/* Urban Planning */}
                    <div className="glass-card p-8 rounded-3xl hover:bg-white/5 transition-all duration-500 group border border-white/5">
                        <div className="w-12 h-12 bg-purple-600/10 rounded-2xl flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                            <FiLayers size={24} />
                        </div>
                        <h3 className="text-2xl font-bold font-heading mb-4 text-white">Smart City Planning</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                            Computational urban planning focusing on smart utility grids, SCADA integration, and future-proof zoning.
                        </p>
                        <ul className="space-y-3 text-[11px] font-mono uppercase tracking-wider text-white/40">
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-purple-500" /> SCADA Master Planning</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-purple-500" /> Traffic Simulation Modeling</li>
                            <li className="flex items-center gap-2"><FiCheckCircle className="text-purple-500" /> Utility GIS Mapping</li>
                        </ul>
                    </div>
                </div>

                <ServiceWorkflow />

            </div>

            <Footer />
        </main>
    );
}
