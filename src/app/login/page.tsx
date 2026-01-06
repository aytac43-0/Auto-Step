'use client';

import { login } from "../auth/actions";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

export default function LoginPage({
    searchParams,
}: {
    searchParams: { error?: string };
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
            <div className="w-full max-w-[400px]">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex mb-8">
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-cyan-400">
                            <ShieldCheck size={20} />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-3 font-tight">Partner Login</h1>
                    <p className="text-gray-400">Access your automation dashboard.</p>
                </div>

                <div className="bg-[#111827] border border-white/5 p-8 rounded-2xl shadow-xl">
                    <form action={login} className="space-y-6">
                        {searchParams.error && (
                            <div className="p-4 bg-red-500/5 border border-red-500/10 text-red-400 text-xs font-medium rounded-lg text-center">
                                Authentication failed. Please verify credentials.
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                                Business Email
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                                    <Mail size={16} />
                                </div>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="input-field pl-11"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                                    Access Key
                                </label>
                                <Link href="/auth/forgot-password" title="Recover Access" className="text-[10px] uppercase font-bold text-gray-500 hover:text-cyan-400 transition-colors">
                                    Lost Access?
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                                    <Lock size={16} />
                                </div>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="input-field pl-11 pr-11"
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn-primary w-full py-4 tracking-wide">
                            Authorized Login
                        </button>
                    </form>
                </div>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Interested in system partnership?{" "}
                    <Link href="/register" className="text-white font-semibold hover:text-cyan-400 transition-colors">
                        Register Account
                    </Link>
                </p>
            </div>
        </div>
    );
}
