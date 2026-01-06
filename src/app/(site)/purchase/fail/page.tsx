import Link from "next/link";
import { XCircle, RefreshCcw } from "lucide-react";

export default function PurchaseFailPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-900/50 p-10 rounded-3xl border border-slate-800 backdrop-blur-sm text-center">
                <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <XCircle size={40} />
                </div>
                <h1 className="text-4xl font-bold mb-4">Payment Failed</h1>
                <p className="text-slate-400 mb-10 leading-relaxed text-lg">
                    We encountered an error while processing your payment. No funds were captured.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/products"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all text-lg"
                    >
                        Try Again
                        <RefreshCcw size={20} />
                    </Link>
                    <Link
                        href="/dashboard"
                        className="block text-slate-500 hover:text-white transition-colors text-sm"
                    >
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
