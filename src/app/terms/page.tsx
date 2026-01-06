export default function TermsPage() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

                <div className="prose prose-invert max-w-none space-y-6 text-slate-300">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using Auto Step, you accept and agree to be bound by the terms and provision of this agreement.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Use License</h2>
                        <p>
                            Permission is granted to temporarily access the materials (information or software) on Auto Step for personal,
                            non-commercial transitory viewing only.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Disclaimer</h2>
                        <p>
                            The materials on Auto Step are provided on an 'as is' basis. Auto Step makes no warranties, expressed or implied,
                            and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions
                            of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Limitations</h2>
                        <p>
                            In no event shall Auto Step or its suppliers be liable for any damages (including, without limitation, damages for
                            loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Auto Step.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Subscription Terms</h2>
                        <p>
                            Subscriptions are billed on a recurring basis. You may cancel your subscription at any time. Refunds are subject to our refund policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Contact</h2>
                        <p>
                            If you have any questions about these Terms, please contact us at{' '}
                            <a href="mailto:support@autostep.app" className="text-blue-400 hover:underline">
                                support@autostep.app
                            </a>
                        </p>
                    </section>

                    <p className="text-sm text-slate-500 mt-12">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    )
}
