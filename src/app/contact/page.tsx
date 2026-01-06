export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                <h1 className="text-4xl font-bold mb-6">Contact Us</h1>

                <p className="text-slate-400 mb-8 text-lg">
                    We're here to help! Reach out to our support team for any questions or assistance.
                </p>

                <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl">
                    <h2 className="text-2xl font-bold mb-4">Support Email</h2>
                    <a
                        href="mailto:support@autostep.app"
                        className="text-blue-400 hover:text-blue-300 text-xl font-medium transition-colors"
                    >
                        support@autostep.app
                    </a>

                    <p className="text-slate-500 mt-6 text-sm">
                        We typically respond within 24 hours during business days.
                    </p>
                </div>

                <div className="mt-8">
                    <a
                        href="/"
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        ← Back to Home
                    </a>
                </div>
            </div>
        </div>
    )
}
