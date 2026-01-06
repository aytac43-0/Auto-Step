'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signup } from '../auth/actions';
import { Eye, EyeOff, Zap, ArrowLeft } from 'lucide-react';

export default function RegisterPage({
    searchParams,
}: {
    searchParams: { error?: string };
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#020617] text-[#E5E7EB] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
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
                    <h1 className="text-3xl font-black mb-2 tracking-tight">Operator Setup</h1>
                    <p className="text-[#94A3B8] mb-10 text-sm font-medium">Initialize your account to start acquiring assets.</p>

                    <form action={signup} className="space-y-5">
                        {searchParams.error && (
                            <div className="p-4 bg-red-500/5 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest rounded-xl mb-6">
                                {searchParams.error}
                            </div>
                        )}

                        <div>
                            <label className="block text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mb-2 ml-1">
                                Display Name
                            </label>
                            <input
                                name="username"
                                type="text"
                                required
                                className="w-full px-5 py-4 bg-[#020617] border border-[#1E293B] rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#3B82F6] outline-none transition-all placeholder:text-[#94A3B8]/20 text-white font-medium"
                                placeholder="johndoe"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mb-2 ml-1">
                                Email Address
                            </label>
                            <input
                                name="email"
                                type="email"
                                required
                                className="w-full px-5 py-4 bg-[#020617] border border-[#1E293B] rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#3B82F6] outline-none transition-all placeholder:text-[#94A3B8]/20 text-white font-medium"
                                placeholder="name@enterprise.com"
                            />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mb-2 ml-1">
                                Secure Key
                            </label>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    className="w-full px-5 py-4 bg-[#020617] border border-[#1E293B] rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#3B82F6] outline-none transition-all placeholder:text-[#94A3B8]/20 text-white font-medium"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em] mb-2 ml-1">
                                Verify Key
                            </label>
                            <div className="relative">
                                <input
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    className="w-full px-5 py-4 bg-[#020617] border border-[#1E293B] rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-[#3B82F6] outline-none transition-all placeholder:text-[#94A3B8]/20 text-white font-medium"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white transition-colors"
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
                                className="mt-1 w-5 h-5 rounded-lg border-[#1E293B] bg-[#020617] text-blue-500 focus:ring-blue-500/20"
                            />
                            <label htmlFor="acceptTerms" className="text-xs text-[#94A3B8] leading-relaxed">
                                I confirm verification of the{" "}
                                <Link href="/privacy-policy" className="text-white font-bold hover:underline">
                                    Privacy Protocols
                                </Link>{" "}
                                and{" "}
                                <Link href="/terms" className="text-white font-bold hover:underline">
                                    Terms of Operation
                                </Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="w-full btn-primary !rounded-2xl shadow-blue-500/20"
                        >
                            Establish Account
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-[#1E293B] text-center">
                        <p className="text-[#94A3B8] text-xs font-medium">
                            Already an operator?{" "}
                            <Link href="/login" className="text-white font-black hover:text-blue-400 transition-colors">
                                Authenticate Here
                            </Link>
                        </p>
                    </div>
                </div>

                <Link href="/" className="mt-12 flex items-center justify-center gap-2 text-[#94A3B8] hover:text-white transition-colors text-xs font-black uppercase tracking-[0.2em] group">
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    System Exit
                </Link>
            </div>
        </div>
    );
}
