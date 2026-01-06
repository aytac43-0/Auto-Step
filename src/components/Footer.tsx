import Link from 'next/link'
import { Mail, Zap, ShieldCheck, Cpu } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t border-[#1E293B] bg-[#0B1220]/50 mt-auto relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 py-16 relative z-10">
                <div className="grid md:grid-cols-4 gap-12 lg:gap-20">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <Link href="/" className="flex items-center gap-3 mb-6 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                                <Zap size={16} className="text-white fill-current" />
                            </div>
                            <span className="text-lg font-black tracking-tight text-[#E5E7EB]">AUTO STEP</span>
                        </Link>
                        <p className="text-[#94A3B8] text-sm leading-relaxed mb-8">
                            Premium marketplace for battle-tested automation assets and digital products.
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#0F172A] border border-[#1E293B] rounded-lg">
                                <ShieldCheck size={18} className="text-blue-500" />
                            </div>
                            <div className="p-2 bg-[#0F172A] border border-[#1E293B] rounded-lg">
                                <Cpu size={18} className="text-emerald-500" />
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E5E7EB] mb-6">Marketplace</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li>
                                <Link href="/products" className="text-[#94A3B8] hover:text-white transition-colors">
                                    All Automations
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard" className="text-[#94A3B8] hover:text-white transition-colors">
                                    My Assets
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E5E7EB] mb-6">Legal Protocols</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li>
                                <Link href="/privacy-policy" className="text-[#94A3B8] hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-[#94A3B8] hover:text-white transition-colors">
                                    Terms of Operation
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E5E7EB] mb-6">Direct Support</h4>
                        <a
                            href="mailto:support@autostep.app"
                            className="bg-[#0F172A] border border-[#1E293B] p-4 rounded-2xl flex items-center gap-3 group hover:border-blue-500/30 transition-all"
                        >
                            <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500 group-hover:scale-105 transition-transform">
                                <Mail size={18} />
                            </div>
                            <span className="text-sm font-bold text-[#E5E7EB] group-hover:text-blue-400 transition-colors">
                                support@autostep.app
                            </span>
                        </a>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-[#1E293B] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#94A3B8]/50">
                    <p>&copy; {new Date().getFullYear()} AUTO STEP • ALL PROTOCOLS VERIFIED</p>
                    <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1.5">
                            <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                            System Active
                        </span>
                        <span className="w-px h-3 bg-[#1E293B]" />
                        <span>v2.0.4 Premium</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
