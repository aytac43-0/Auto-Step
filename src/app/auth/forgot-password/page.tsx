import Link from "next/link";
import { forgotPassword } from "../actions";

export default function ForgotPasswordPage({
    searchParams,
}: {
    searchParams: { error?: string; message?: string };
}) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm">
                <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
                <p className="text-slate-400 mb-8">Enter your email to receive a reset link.</p>

                <form action={forgotPassword} className="space-y-4">
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

                    <button
                        type="submit"
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors mt-4"
                    >
                        Send Reset Link
                    </button>
                </form>

                <p className="mt-8 text-center text-slate-500 text-sm">
                    Remember your password?{" "}
                    <Link href="/login" className="text-blue-400 hover:underline">
                        Back to login
                    </Link>
                </p>
            </div>
        </div>
    );
}
