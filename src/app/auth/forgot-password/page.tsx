import Link from "next/link";
import { forgotPassword } from "../actions";
import { Zap, ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage({
    searchParams,
}: {
    searchParams: { error?: string; message?: string };
}) {
    return (
        <div className="min-h-screen bg-[#020617] text-[#E5E7EB] flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <Link href="/" className="flex items-center gap-3 mb-12 justify-center group">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                        <Zap size={22} className="text-white fill-current" />
                    </div>
                    <span className="text-2xl font-black tracking-tight uppercase">Auto Step</span>
                </Link>

                <div className="premium-surface p-8 md:p-10 border-[#1E293B] bg-[#0B1220]/50 backdrop-blur-xl shadow-2xl shadow-black/50">
                    <h1 className="text-3xl font-black mb-2 tracking-tight">Key Recovery</h1>
                    <p className="text-[#94A3B8] mb-10 text-sm font-medium">Enter your email to receive an access reset link.</p>

                    <form action={forgotPassword} className="space-y-6">
                        {searchParams.error && (
                            <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest rounded-xl mb-6">
                                {searchParams.error}
                            </div>
                        )}
                        {searchParams.message && (
                            <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-widest rounded-xl mb-6">
                                {searchParams.message}
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mb-2 ml-1">
                                Operator Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#94A3B8]/30">
                                    <Mail size={18} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full pl-12 pr-5 py-4 bg-[#020617] border border-[#1E293B] rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#3B82F6] outline-none transition-all placeholder:text-[#94A3B8]/20 text-white font-medium"
                                    placeholder="name@enterprise.com"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary !rounded-2xl shadow-blue-500/20"
                        >
                            Send Recovery Link
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-[#1E293B] text-center">
                        <p className="text-[#94A3B8] text-xs font-medium">
                            Remember your key?{" "}
                            <Link href="/login" className="text-white font-black hover:text-blue-400 transition-colors">
                                Return to Login
                            </Link>
                        </p>
                    </div>
                </div>

                <Link href="/login" className="mt-12 flex items-center justify-center gap-2 text-[#94A3B8] hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em] group">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Authentication
                </Link>
            </div>
        </div>
    );
}
