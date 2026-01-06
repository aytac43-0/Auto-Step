import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function PurchaseSuccessPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col items-center justify-center px-4">
            <div className="w-full max-w-md bg-slate-900/50 p-10 rounded-3xl border border-slate-800 backdrop-blur-sm text-center">
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                    <CheckCircle2 size={40} />
                </div>
                <h1 className="text-4xl font-bold mb-4">Payment Successful!</h1>
                <p className="text-slate-400 mb-10 leading-relaxed text-lg">
                    Thank you for your purchase. Your order has been processed and your features are now active.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all text-lg"
                    >
                        Go to Dashboard
                        <ArrowRight size={20} />
                    </Link>
                    <p className="text-slate-500 text-sm">
                        Check your dashboard for automation updates.
                    </p>
                </div>
            </div>
        </div>
    );
}
