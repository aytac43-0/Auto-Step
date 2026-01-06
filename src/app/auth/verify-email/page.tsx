import Link from "next/link";
import { Zap, Mail, ShieldCheck, ArrowRight } from "lucide-react";

export default function VerifyEmailPage({
    searchParams,
}: {
    searchParams: { email?: string };
}) {
    return (
        <div className="min-h-screen bg-[#070B14] text-[#E6F1FF] flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#00E5FF]/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-[#00E5FF]/10 rounded-[2rem] flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.1)] mx-auto mb-10 border border-[#00E5FF]/20">
                        <Mail size={40} className="text-[#00E5FF]" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tight font-space uppercase italic">Verify Identity</h1>
                    <p className="text-[#94A3B8] font-medium mt-4 leading-relaxed">
                        A verification link has managed a secure tunnel to: <br />
                        <span className="text-[#00E5FF] font-bold">{searchParams.email || 'your email'}</span>
                    </p>
                </div>

                <div className="glass-panel p-10 neon-border shadow-2xl text-center">
                    <p className="text-[#94A3B8] text-sm mb-10">
                        Please check your terminal. Click the link provided in the communication to fully initialize your operator account.
                    </p>

                    <div className="space-y-6">
                        <Link href="/login" className="btn-primary w-full flex items-center justify-center gap-2 group">
                            Return to Login
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8]/40">
                            Check spam if transmission is delayed.
                        </p>
                    </div>

                    <div className="mt-10 pt-8 border-t border-[rgba(0,229,255,0.1)]">
                        <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                            <ShieldCheck size={14} />
                            Identity Protocol Active
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link href="/" className="inline-flex items-center gap-3 group">
                        <div className="w-8 h-8 bg-[#00E5FF] rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-transform group-hover:scale-110">
                            <Zap size={16} className="text-[#070B14] fill-current" />
                        </div>
                        <span className="text-sm font-black tracking-tighter text-[#94A3B8] uppercase font-space group-hover:text-[#E6F1FF] transition-colors">AUTO STEP</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
