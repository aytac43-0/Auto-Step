'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signup } from '../auth/actions';
import { Eye, EyeOff, Zap, ShieldCheck } from 'lucide-react';

export default function RegisterPage({
    searchParams,
}: {
    searchParams: { error?: string };
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#070B14] text-[#E6F1FF] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] right-[-10%] w-[600px] h-[600px] bg-[#00E5FF]/5 blur-[140px] rounded-full" />
                <div className="absolute bottom-[10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 blur-[140px] rounded-full" />
            </div>

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex items-center gap-3 group mb-8">
                        <div className="w-12 h-12 bg-[#00E5FF] rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-transform group-hover:scale-110">
                            <Zap size={24} className="text-[#070B14] fill-current" />
                        </div>
                    </Link>
                    <h1 className="text-4xl font-black tracking-tight font-space uppercase">Initialize Account</h1>
                    <p className="text-[#94A3B8] font-medium mt-2">Become a verified marketplace operator.</p>
                </div>

                <div className="glass-panel p-8 md:p-10 neon-border shadow-2xl">
                    <form action={signup} className="space-y-5">
                        {searchParams.error && (
                            <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black uppercase tracking-widest rounded-xl text-center">
                                Initialization Failed: {searchParams.error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] ml-1">
                                Operator handle
                            </label>
                            <input
                                name="username"
                                type="text"
                                required
                                className="input-neon"
                                placeholder="cyber_phantom"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] ml-1">
                                Secure email
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="input-neon"
                                placeholder="operator@autostep.io"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] ml-1">
                                Primary access key
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    className="input-neon"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#00E5FF] transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] ml-1">
                                Confirm access key
                            </label>
                            <div className="relative">
                                <input
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    className="input-neon"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#00E5FF] transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 py-4 ml-1">
                            <input
                                id="acceptTerms"
                                name="acceptTerms"
                                type="checkbox"
                                required
                                className="mt-1 w-5 h-5 rounded-lg border-[rgba(0,229,255,0.2)] bg-[#070B14] text-[#00E5FF] focus:ring-[#00E5FF]"
                            />
                            <label htmlFor="acceptTerms" className="text-xs text-[#94A3B8] leading-relaxed">
                                I verify reading the <Link href="/privacy-policy" className="text-[#00E5FF] hover:underline font-bold">Privacy Protocols</Link> and <Link href="/terms" className="text-[#00E5FF] hover:underline font-bold">Terms of Operation</Link>.
                            </label>
                        </div>

                        <button type="submit" className="btn-primary w-full shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                            Initialize Account
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-[rgba(0,229,255,0.1)] text-center">
                        <p className="text-[#94A3B8] text-sm font-medium">
                            Already identified?{" "}
                            <Link href="/login" className="text-[#00E5FF] font-black uppercase tracking-widest hover:underline ml-1">
                                Login Here
                            </Link>
                        </p>
                    </div>
                </div>

                <div className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-[#94A3B8]/30 flex items-center justify-center gap-2">
                    <ShieldCheck size={14} />
                    Secure Initialization Protocol
                </div>
            </div>
        </div>
    );
}
