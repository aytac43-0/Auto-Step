import Link from "next/link";
import { updatePassword } from "../actions";
import { Zap, ShieldCheck, Key } from "lucide-react";

export default function ResetPasswordPage({
    searchParams,
}: {
    searchParams: { error?: string };
}) {
    return (
        <div className="min-h-screen bg-[#020617] text-[#E5E7EB] flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 blur-[120px] pointer-events-none" />

            <div className="w-full max-w-md relative z-10">
                <Link href="/" className="flex items-center gap-3 mb-10 justify-center group">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                        <Zap size={22} className="text-white fill-current" />
                    </div>
                    <span className="text-2xl font-black tracking-tight uppercase">Auto Step</span>
                </Link>

                <div className="premium-surface p-8 md:p-10 border-[#1E293B] bg-[#0B1220]/50 backdrop-blur-xl shadow-2xl shadow-black/50">
                    <h1 className="text-3xl font-black mb-2 tracking-tight">Key Reset</h1>
                    <p className="text-[#94A3B8] mb-10 text-sm font-medium">Configure your new secure access key below.</p>

                    <form action={updatePassword} className="space-y-5">
                        {searchParams.error && (
                            <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest rounded-xl mb-6">
                                {searchParams.error}
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mb-2 ml-1">
                                New Access Key
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#94A3B8]/30">
                                    <Key size={18} />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    className="w-full pl-12 pr-5 py-4 bg-[#020617] border border-[#1E293B] rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#3B82F6] outline-none transition-all placeholder:text-[#94A3B8]/20 text-white font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mb-2 ml-1">
                                Confirm New Key
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#94A3B8]/30">
                                    <Key size={18} />
                                </div>
                                <input
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    minLength={6}
                                    className="w-full pl-12 pr-5 py-4 bg-[#020617] border border-[#1E293B] rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#3B82F6] outline-none transition-all placeholder:text-[#94A3B8]/20 text-white font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary !rounded-2xl shadow-blue-500/20"
                        >
                            Update System Key
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-[#1E293B] text-center">
                        <p className="text-[#94A3B8] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                            <ShieldCheck size={14} className="text-blue-500" />
                            Secure Encryption Established
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
