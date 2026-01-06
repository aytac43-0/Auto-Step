import Link from "next/link";
import { Zap, Mail, ShieldAlert, Cpu } from "lucide-react";

export function Footer() {
    return (
        <footer className="relative mt-auto pt-24 pb-12 overflow-hidden">
            {/* Top Border Glow */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,229,255,0.3)] to-transparent" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
                    <div className="md:col-span-4">
                        <div className="flex items-center gap-3 group mb-8">
                            <div className="w-10 h-10 bg-[#00E5FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                                <Zap size={22} className="text-[#070B14] fill-current" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter text-[#E6F1FF] uppercase font-space">AUTO STEP</span>
                        </div>
                        <p className="text-[#94A3B8] text-sm leading-relaxed max-w-sm mb-10">
                            The world&apos;s most advanced marketplace for production-ready automation modules. Pure ownership. Pure performance.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                            <span className="text-[10px] font-black text-[#E6F1FF] uppercase tracking-[0.4em]">All Systems Nominal</span>
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#E6F1FF] mb-8">Marketplace</h4>
                        <ul className="space-y-4">
                            <li><Link href="/products" className="text-sm text-[#94A3B8] hover:text-[#00E5FF] transition-colors">All Modules</Link></li>
                            <li><Link href="/dashboard" className="text-sm text-[#94A3B8] hover:text-[#00E5FF] transition-colors">My Assets</Link></li>
                            <li><Link href="/" className="text-sm text-[#94A3B8] hover:text-[#00E5FF] transition-colors">Recent Releases</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#E6F1FF] mb-8">Protocols</h4>
                        <ul className="space-y-4">
                            <li><Link href="/terms" className="text-sm text-[#94A3B8] hover:text-[#00E5FF] transition-colors">Operating Terms</Link></li>
                            <li><Link href="/privacy-policy" className="text-sm text-[#94A3B8] hover:text-[#00E5FF] transition-colors">Privacy Shield</Link></li>
                            <li><Link href="/" className="text-sm text-[#94A3B8] hover:text-[#00E5FF] transition-colors">SLAs</Link></li>
                        </ul>
                    </div>

                    <div className="md:col-span-4">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-[#E6F1FF] mb-8">Communication Tunnel</h4>
                        <div className="glass-panel p-6 neon-border bg-gradient-to-br from-[#0A1020] to-transparent">
                            <p className="text-[#94A3B8] text-xs mb-6">Connect with our core system architects for custom automation requests.</p>
                            <Link href="mailto:architect@autostep.io" className="flex items-center gap-3 py-3 px-6 glass-panel border-[rgba(0,229,255,0.1)] text-[#00E5FF] group hover:border-[#00E5FF]/40 transition-all">
                                <Mail size={16} />
                                <span className="text-[10px] font-black uppercase tracking-widest">architect@autostep.io</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-[rgba(255,255,255,0.03)] gap-6">
                    <p className="text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.4em]">
                        &copy; {new Date().getFullYear()} AUTO STEP // GLOBAL_NETWORK_DISTRIBUTION
                    </p>
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <ShieldAlert size={14} className="text-[#94A3B8] group-hover:text-amber-500 transition-colors" />
                            <span className="text-[9px] font-black text-[#94A3B8] uppercase tracking-widest group-hover:text-white transition-colors">Security Audit Passed</span>
                        </div>
                        <div className="flex items-center gap-2 group cursor-pointer">
                            <Cpu size={14} className="text-[#94A3B8] group-hover:text-[#00E5FF] transition-colors" />
                            <span className="text-[9px] font-black text-[#94A3B8] uppercase tracking-widest group-hover:text-white transition-colors">v1.2.9_STABLE</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
