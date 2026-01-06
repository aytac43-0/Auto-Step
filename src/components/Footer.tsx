import Link from "next/link";
import { ShieldCheck, Mail, Briefcase, Globe, CheckCircle2 } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative mt-auto border-t border-white/5 pt-20 pb-12 bg-[#0A0F1A]">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
                    <div className="md:col-span-5">
                        <div className="flex items-center gap-3 group mb-8">
                            <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-cyan-400">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white uppercase font-sans">AUTO STEP</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-sm mb-10 font-medium">
                            A professional automation studio developing high-performance architectural solutions for modern enterprises.
                        </p>
                        <div className="flex items-center gap-4 text-emerald-500/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Studio Status: Operational</span>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-8">Solutions</h4>
                        <ul className="space-y-4">
                            <li><Link href="/products" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">System Catalog</Link></li>
                            <li><Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">Dashboard</Link></li>
                            <li><Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">Home</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-8">Legal</h4>
                        <ul className="space-y-4">
                            <li><Link href="/terms" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">Terms of Operation</Link></li>
                            <li><Link href="/privacy-policy" className="text-sm text-gray-400 hover:text-white transition-colors font-medium">Privacy Protection</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-8">Support & Inquiries</h4>
                        <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl space-y-4">
                            <a href="mailto:architect@autostep.io" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors">
                                <Mail size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">architect@autostep.io</span>
                            </a>
                            <a href="mailto:support@autostep.io" className="flex items-center gap-3 text-gray-400 hover:text-cyan-400 transition-colors">
                                <Mail size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">support@autostep.io</span>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
                        &copy; {new Date().getFullYear()} AUTO STEP STUDIO. ALL ARCHITECTURAL RIGHTS RESERVED.
                    </p>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <Globe size={14} className="text-gray-400" />
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Global Network</span>
                        </div>
                        <div className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default text-emerald-500">
                            <CheckCircle2 size={14} />
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Stability V3.2</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
