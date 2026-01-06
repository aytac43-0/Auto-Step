import Link from "next/link";
import { Zap, ArrowLeft, Shield, Globe, Lock } from "lucide-react";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#0A0F1A] text-gray-100 flex flex-col items-center justify-start px-6 py-32 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent" />
            </div>

            <div className="w-full max-w-3xl relative z-10">
                <div className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500 hover:text-cyan-400 transition-colors group mb-8">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Return to Home
                    </Link>
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-cyan-400">
                            <Shield size={24} />
                        </div>
                        <h1 className="text-4xl font-bold tracking-tight text-white font-tight">Terms of Operation</h1>
                    </div>
                </div>

                <div className="bg-[#111827] border border-white/5 p-10 md:p-16 rounded-[2rem] shadow-2xl space-y-16">
                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400 mb-6 flex items-center gap-3">
                            <Globe size={18} />
                            1. System Licensing
                        </h2>
                        <p className="text-gray-400 leading-relaxed font-medium">
                            Auto Step Studio grants clients a non-exclusive, perpetual license to deploy purchased automation modules for internal business operations. All modules are architectural assets intended for direct integration into client workflows.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400 mb-6 flex items-center gap-3">
                            <Lock size={18} />
                            2. Proprietary Architecture
                        </h2>
                        <p className="text-gray-400 leading-relaxed font-medium">
                            The underlying structural code and logic of our systems remain the intellectual property of Auto Step Studio. Clients may utilize the modules as delivered but may not decompile, reverse-engineer, or redistribute the core system architecture.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400 mb-6 flex items-center gap-3">
                            <Shield size={18} />
                            3. Professional Conduct
                        </h2>
                        <p className="text-gray-400 leading-relaxed font-medium">
                            Partners are expected to maintain professional operational standards. Any usage of our systems that compromises global network stability or violates regional legal protocols will result in immediate revocation of system access.
                        </p>
                    </section>

                    <div className="pt-16 border-t border-white/5 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-700">
                            PROTOCOL REVISION: 2026_01 // SYSTEM_V3
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
