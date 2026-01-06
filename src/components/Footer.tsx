import Link from 'next/link'
import { Mail } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-900/50 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid md:grid-cols-3 gap-8">
                    {/* Brand */}
                    <div>
                        <h3 className="font-bold text-lg mb-2">Auto Step</h3>
                        <p className="text-slate-500 text-sm">
                            Automate your workflow with ease.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-semibold text-sm mb-3">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/privacy-policy" className="text-slate-400 hover:text-white transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-slate-400 hover:text-white transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-semibold text-sm mb-3">Support</h4>
                        <a
                            href="mailto:support@autostep.app"
                            className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 text-sm"
                        >
                            <Mail size={16} />
                            support@autostep.app
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} Auto Step. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
