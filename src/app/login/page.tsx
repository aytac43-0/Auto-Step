'use client';

import { useState } from 'react';
import Link from 'next/link';
import { login } from '../auth/actions';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage({
    searchParams,
}: {
    searchParams: { error?: string, message?: string };
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
                <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
                <p className="text-slate-400 mb-8">Login to your Auto Step account.</p>

                <form action={login} className="space-y-4">
                    {searchParams.error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-500 text-sm rounded-lg mb-4">
                            {searchParams.error}
                        </div>
                    )}
                    {searchParams.message && (
                        <div className="p-3 bg-emerald-500/10 border border-emerald-500/50 text-emerald-500 text-sm rounded-lg mb-4">
                            {searchParams.message}
                        </div>
                    )}

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
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <Link href="/auth/forgot-password" className="text-sm text-blue-400 hover:underline">
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <input
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
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

                    <button
                        type="submit"
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors mt-4"
                    >
                        Login
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500 text-sm">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-blue-400 hover:underline">
                        Sign up now
                    </Link>
                </p>
            </div>

            <Link href="/" className="mt-8 text-slate-600 hover:text-slate-400 transition-colors text-sm">
                ← Back to home
            </Link>
        </div>
    );
}
