'use client';

import { signup } from "../auth/actions";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, User, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function RegisterPage({
    searchParams,
}: {
    searchParams: { error?: string };
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        if (password !== confirmPassword) {
            e.preventDefault();
            setLocalError("Passwords do not match");
            return;
        }
        setLocalError(null);
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
            <div className="w-full max-w-[420px]">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex mb-8">
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-cyan-400">
                            <ShieldCheck size={20} />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-3 font-tight">Partner Registration</h1>
                    <p className="text-gray-400">Establish your automation presence.</p>
                </div>

                <div className="bg-[#111827] border border-white/5 p-8 rounded-2xl shadow-xl">
                    <form action={signup} onSubmit={handleSubmit} className="space-y-4">
                        {(searchParams.error || localError) && (
                            <div className="p-4 bg-red-500/5 border border-red-500/10 text-red-400 text-xs font-medium rounded-lg flex items-center gap-3">
                                <AlertCircle size={16} />
                                <span>{localError || searchParams.error}</span>
                            </div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                                    <User size={16} />
                                </div>
                                <input
                                    name="username"
                                    type="text"
                                    required
                                    className="input-field pl-11"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

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
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                                Master Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                                    <Lock size={16} />
                                </div>
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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

                        <div className="space-y-1.5">
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider ml-1">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                                    <Lock size={16} />
                                </div>
                                <input
                                    name="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="input-field pl-11 pr-11"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 py-2">
                            <input
                                id="acceptTerms"
                                name="acceptTerms"
                                type="checkbox"
                                required
                                className="w-4 h-4 rounded border-white/10 bg-white/5 text-cyan-500 focus:ring-cyan-500/20"
                            />
                            <label htmlFor="acceptTerms" className="text-xs text-gray-400">
                                I agree to the <Link href="/terms" className="underline hover:text-white">Terms of Operation</Link>
                            </label>
                        </div>

                        <div className="pt-2">
                            <button type="submit" className="btn-primary w-full py-4 tracking-wide">
                                Create Partner Account
                            </button>
                        </div>
                    </form>
                </div>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Already an established partner?{" "}
                    <Link href="/login" className="text-white font-semibold hover:text-cyan-400 transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
