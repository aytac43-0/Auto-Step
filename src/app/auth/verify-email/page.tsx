import Link from "next/link";

export default function VerifyEmailPage({
    searchParams,
}: {
    searchParams: { email?: string };
}) {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-900/50 p-8 rounded-2xl border border-slate-800 backdrop-blur-sm text-center">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                </div>
                <h1 className="text-3xl font-bold mb-4">Verify your email</h1>
                <p className="text-slate-400 mb-8 leading-relaxed">
                    {searchParams.email ? (
                        <>We've sent a verification link to <span className="text-white font-medium">{searchParams.email}</span>.</>
                    ) : (
                        "Please check your inbox for a verification link."
                    )}
                    {" "}Please verify your email before logging in to access the dashboard.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/login"
                        className="block w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors"
                    >
                        Back to Login
                    </Link>
                    <p className="text-slate-500 text-sm">
                        Didn't receive an email? <button className="text-blue-400 hover:underline">Resend link</button>
                    </p>
                </div>
            </div>
        </div>
    );
}
