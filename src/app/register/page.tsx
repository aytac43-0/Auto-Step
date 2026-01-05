'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signup } from '../auth/actions';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage({
    searchParams,
}: {
    searchParams: { error?: string };
}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-md bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
                <h1 className="text-3xl font-bold mb-2">Create Account</h1>
                <p className="text-slate-400 mb-8">Join Auto Step and start automating.</p>

                <form action={signup} className="space-y-4">
                    {searchParams.error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-lg mb-4">
                            {searchParams.error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Username
                        </label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="johndoe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Email Address
                        </label>
                        <input
                            name="email"
                            type="email"
                            required
                            className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="name@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                minLength={6}
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                name="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                minLength={6}
                                className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="••••••••"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 py-2">
                        <input
                            id="acceptTerms"
                            name="acceptTerms"
                            type="checkbox"
                            required
                            className="mt-1 w-4 h-4 rounded border-slate-800 bg-slate-950 text-blue-500 focus:ring-blue-500"
                        />
                        <label htmlFor="acceptTerms" className="text-sm text-slate-400">
                            I accept the{" "}
                            <Link href="/privacy-policy" className="text-blue-400 hover:underline">
                                Privacy Policy
                            </Link>{" "}
                            and{" "}
                            <Link href="/terms" className="text-blue-400 hover:underline">
                                Terms of Service
                            </Link>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors mt-4"
                    >
                        Create Account
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500 text-sm">
                    Already have an account?{" "}
                    <Link href="/login" className="text-blue-400 hover:underline">
                        Log in here
                    </Link>
                </p>
            </div>

            <Link href="/" className="mt-8 text-slate-600 hover:text-slate-400 transition-colors text-sm">
                ← Back to home
            </Link>
        </div>
    );
}
