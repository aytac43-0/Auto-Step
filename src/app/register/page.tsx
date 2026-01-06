import { signup } from "../auth/actions";
import Link from "next/link";
import { ShieldCheck, Mail, Lock, User, ArrowRight } from "lucide-react";

export default function RegisterPage({
    searchParams,
}: {
    searchParams: { error?: string };
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
            <div className="w-full max-w-[420px]">
                <div className="text-center mb-10">
                    <Link href="/" className="inline-flex mb-8">
                        <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-cyan-400">
                            <ShieldCheck size={20} />
                        </div>
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-3">Partner Registration</h1>
                    <p className="text-gray-400">Establish your automation presence.</p>
                </div>

                <div className="bg-[#111827] border border-white/5 p-8 rounded-2xl shadow-xl">
                    <form action={signup} className="space-y-4">
                        {searchParams.error && (
                            <div className="p-4 bg-red-500/5 border border-red-500/10 text-red-400 text-xs font-medium rounded-lg text-center">
                                Registration failed. {searchParams.error}
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
                                Security Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-500">
                                    <Lock size={16} />
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    className="input-field pl-11"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button type="submit" className="btn-primary w-full py-4 tracking-wide">
                                Create Account
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-center text-xs text-gray-500 leading-relaxed">
                        By proceeding, you agree to our <Link href="/terms" className="underline hover:text-white">Terms of Operation</Link> and <Link href="/privacy-policy" className="underline hover:text-white">Privacy Shield</Link>.
                    </p>
                </div>

                <p className="mt-8 text-center text-sm text-gray-400">
                    Already a partner?{" "}
                    <Link href="/login" className="text-white font-semibold hover:text-cyan-400 transition-colors">
                        Sign In
                    </Link>
                </p>
            </div>
        </div>
    );
}
