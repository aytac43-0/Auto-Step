import Link from 'next/link'

export function Footer() {
    return (
        <footer className="border-t border-white/5 bg-[#0a0f1a] text-muted-foreground w-full">
            <div className="container py-12 md:py-16">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                            Auto Step
                        </h3>
                        <p className="text-sm leading-relaxed max-w-xs">
                            Professional Automation Studio & Marketplace.
                            Secure, scalable, and deployed instantly.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Platform</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/products" className="hover:text-primary transition-colors">Marketplace</Link></li>
                            <li><Link href="/login" className="hover:text-primary transition-colors">Client Portal</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/refund-policy" className="hover:text-primary transition-colors">Refund Policy</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
                    <p>© 2026 Auto Step Inc. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    )
}
