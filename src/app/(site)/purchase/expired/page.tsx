import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'

export default function ExpiredPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-6 flex justify-center">
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-full">
                        <AlertTriangle className="text-red-500" size={48} />
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-4">Subscription Required</h1>

                <p className="text-slate-400 mb-8">
                    Your subscription has expired or you don't have an active subscription.
                    Please renew or purchase a subscription to access this feature.
                </p>

                <div className="space-y-3">
                    <Link
                        href="/products"
                        className="block w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-colors"
                    >
                        View Plans & Pricing
                    </Link>

                    <Link
                        href="/dashboard"
                        className="block w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors"
                    >
                        Back to Dashboard
                    </Link>
                </div>

                <p className="mt-8 text-sm text-slate-500">
                    Need help? Contact{' '}
                    <a href="mailto:support@autostep.app" className="text-blue-400 hover:underline">
                        support@autostep.app
                    </a>
                </p>
            </div>
        </div>
    )
}
