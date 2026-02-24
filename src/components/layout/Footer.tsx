import Link from "next/link";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="bg-background border-t border-white/10 py-20">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="space-y-4">
                    <h3 className="text-xl font-bold font-heading">NR Intellectual Solution</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                        Autonomous multi-disciplinary consulting firm providing sustainable infrastructure solutions from inception to project completion since 2018.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-6 font-heading uppercase tracking-widest text-sm">Sitemap</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                        <li><Link href="/services" className="hover:text-white transition-colors">Expertise</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors">Studio</Link></li>
                        <li><Link href="/insights" className="hover:text-white transition-colors">Insights</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 font-heading uppercase tracking-widest text-sm">Services</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li><Link href="/services/structural-audit" className="hover:text-white transition-colors">Environmental Assessment</Link></li>
                        <li><Link href="/services/structural-audit" className="hover:text-white transition-colors">Feasibility Studies</Link></li>
                        <li><Link href="/services/structural-audit" className="hover:text-white transition-colors">Structural Design</Link></li>
                        <li><Link href="/services/structural-audit" className="hover:text-white transition-colors">Construction Supervision</Link></li>
                        <li><Link href="/services/structural-audit" className="hover:text-white transition-colors">Topographic Survey</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 font-heading uppercase tracking-widest text-sm">Areas We Serve</h4>
                    <ul className="space-y-3 text-sm text-muted-foreground">
                        <li>Dhaka Metropolitan</li>
                        <li>Gazipur Industrial Hub</li>
                        <li>Chittagong Port Zone</li>
                        <li>Savar & Ashulia</li>
                        <li>Purbachal Smart City</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-6 font-heading uppercase tracking-widest text-sm">Connect</h4>
                    <div className="flex space-x-4 text-xl">
                        <a href="https://linkedin.com/company/nrisbd" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-white transition-colors"><FaLinkedin /></a>
                        <a href="https://twitter.com/nrisbd" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-white transition-colors"><FaTwitter /></a>
                        <a href="https://instagram.com/nrisbd" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-white transition-colors"><FaInstagram /></a>
                    </div>
                    <div className="mt-6 text-sm text-muted-foreground">
                        <p>Farmgate, Dhaka-1215, BD</p>
                        <p>nris.bd71@gmail.com</p>
                        <p>+880 1913 965 059</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground">
                <p>© {new Date().getFullYear()} NR Intellectual Solution. All rights reserved.</p>
                <div className="flex space-x-6 mt-4 md:mt-0">
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
