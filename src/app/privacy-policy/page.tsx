import Link from "next/link";
import { Zap, ArrowLeft, ShieldCheck, Eye } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#070B14] text-[#E6F1FF] flex flex-col items-center justify-start px-4 py-20 relative overflow-hidden">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00E5FF]/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full" />
            </div>

            <div className="w-full max-w-4xl relative z-10">
                <div className="mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#94A3B8] hover:text-[#00E5FF] transition-colors group mb-8">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 bg-[#00E5FF] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                            <Zap size={24} className="text-[#070B14] fill-current" />
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter font-space uppercase italic">Privacy Shield</h1>
                    </div>
                </div>

                <div className="glass-panel p-10 neon-border shadow-2xl space-y-12">
                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest text-[#00E5FF] mb-6 flex items-center gap-3">
                            <Eye size={20} />
                            1. Data Cloaking
                        </h2>
                        <p className="text-[#94A3B8] leading-relaxed font-medium">
                            Auto Step utilizes advanced end-to-end encryption for all operator credentials. Your email and username are encrypted at rest and never shared with external nodes or third-party intelligence services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest text-[#00E5FF] mb-6 flex items-center gap-3">
                            <ShieldCheck size={20} />
                            2. Transaction Privacy
                        </h2>
                        <p className="text-[#94A3B8] leading-relaxed font-medium">
                            Acquisition logs are anonymized to protect the identity of operators. We only store the minimal data required to verify asset ownership and ensure module delivery across the network.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-black uppercase tracking-widest text-[#00E5FF] mb-6 flex items-center gap-3">
                            <ShieldCheck size={20} />
                            3. Protocol Security
                        </h2>
                        <p className="text-[#94A3B8] leading-relaxed font-medium">
                            The Auto Step Privacy Shield is designed to maintain the highest levels of security. We continuously audit our communication tunnels to ensure no leakage of sensitive operational data.
                        </p>
                    </section>

                    <div className="pt-10 border-t border-[rgba(0,229,255,0.1)] text-center">
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#94A3B8]/30">
                            STRICT PRIVACY PROTOCOL // VERSION_2.0
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
