'use client';

import { useState } from 'react';
import Link from 'next/link';
import { login } from '../auth/actions';
import { Eye, EyeOff, Zap, ArrowLeft } from 'lucide-react';

export default function LoginPage({
    searchParams,
}: {
    searchParams: { error?: string, message?: string };
}) {
    const [showPassword, setShowPassword] = useState(false);

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
                    <h1 className="text-3xl font-black mb-2 tracking-tight">Security Access</h1>
                    <p className="text-[#94A3B8] mb-10 text-sm font-medium">Identify yourself to access your automation assets.</p>

                    <form action={login} className="space-y-6">
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
                                Email Endpoint
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
                            <div className="flex justify-between items-center mb-2 ml-1">
                                <label className="block text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.2em]">
                                    Access Key
                                </label>
                                <Link href="/auth/forgot-password" className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors">
                                    Lost Key?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
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

                        <button
                            type="submit"
                            className="w-full btn-primary !rounded-2xl shadow-blue-500/20"
                        >
                            Authorize Access
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-[#1E293B] text-center">
                        <p className="text-[#94A3B8] text-xs font-medium">
                            New operator?{" "}
                            <Link href="/register" className="text-white font-black hover:text-blue-400 transition-colors">
                                Initialize Account
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
