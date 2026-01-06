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
                            Professional automation studio specialized in delivering high-performance business systems and architectural scaling solutions.
                        </p>
                        <div className="flex items-center gap-4 text-emerald-500/60">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Studio Status: Operational</span>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-8">Solutions</h4>
                        <ul className="space-y-4">
                            <li><Link href="/products" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors font-medium">Module Catalog</Link></li>
                            <li><Link href="/dashboard" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors font-medium">Dashboard</Link></li>
                            <li><Link href="/" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors font-medium">Custom Systems</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-8">Protocol</h4>
                        <ul className="space-y-4">
                            <li><Link href="/terms" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors font-medium">Terms of Service</Link></li>
                            <li><Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors font-medium">Privacy Shield</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white mb-8">Inquiries</h4>
                        <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl">
                            <p className="text-gray-500 text-xs mb-6 font-medium leading-relaxed">Connect with our lead system designers for enterprise automation requests.</p>
                            <Link href="mailto:studio@autostep.io" className="flex items-center gap-3 py-3 px-6 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:text-cyan-400 hover:border-cyan-400/30 transition-all">
                                <Mail size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-widest leading-none">studio@autostep.io</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-6">
                    <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">
                        &copy; {new Date().getFullYear()} AUTO STEP STUDIO // ARCHITECTURAL SCALE
                    </p>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <Globe size={14} className="text-gray-400" />
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Distributed System</span>
                        </div>
                        <div className="flex items-center gap-2 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all cursor-default">
                            <CheckCircle2 size={14} className="text-emerald-500" />
                            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Stability V3.2</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
