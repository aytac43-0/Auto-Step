import Link from "next/link";
import { forgotPassword } from "../actions";
import { Zap, ArrowLeft, Mail, ShieldCheck } from "lucide-react";

export default function ForgotPasswordPage({
    searchParams,
}: {
    searchParams: { error?: string; message?: string };
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
                    <Link href="/" className="inline-flex items-center gap-3 group mb-8">
                        <div className="w-12 h-12 bg-[#00E5FF] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-transform group-hover:scale-110">
                            <Zap size={24} className="text-[#070B14] fill-current" />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-black tracking-tight font-space uppercase">Key Recovery</h1>
                    <p className="text-[#94A3B8] font-medium mt-2">Restore access to your secure node.</p>
                </div>

                <div className="glass-panel p-8 md:p-10 neon-border shadow-2xl">
                    <form action={forgotPassword} className="space-y-6">
                        {searchParams.error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest rounded-xl text-center">
                                ERROR: {searchParams.error}
                            </div>
                        )}
                        {searchParams.message && (
                            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-black uppercase tracking-widest rounded-xl text-center">
                                SUCCESS: {searchParams.message}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] ml-1">
                                Operator Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#00E5FF]/30">
                                    <Mail size={18} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="input-neon pl-12"
                                    placeholder="operator@autostep.io"
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                            Request Recovery Link
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-[rgba(0,229,255,0.1)] text-center">
                        <p className="text-[#94A3B8] text-sm font-medium">
                            Recall your key?{" "}
                            <Link href="/login" className="text-[#00E5FF] font-black uppercase tracking-widest hover:underline ml-1">
                                Back to Login
                            </Link>
                        </p>
                    </div>
                </div>

                <Link href="/login" className="mt-12 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#94A3B8] hover:text-[#00E5FF] transition-colors group">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Secure Authentication Portal
                </Link>
            </div>
        </div>
    );
}
