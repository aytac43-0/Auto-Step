import { Footer } from "@/components/footer"
import Navbar from "@/components/nav"

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-background text-foreground font-light">
            <Navbar />
            <main className="container py-20 max-w-4xl">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-8">Terms of Service</h1>
                <div className="prose prose-invert prose-lg max-w-none">
                    <p>Last updated: January 2026</p>
                    <h2>1. Acceptance of Terms</h2>
                    <p>By accessing and using Auto Step's Professional Automation Studio, you agree to be bound by these Terms of Service.</p>
                    <h2>2. License</h2>
                    <p>We grant you a limited, non-exclusive, non-transferable license to use our automation products for your internal business purposes.</p>
                    <h2>3. Restrictions</h2>
                    <p>You may not redistribute, resell, or reverse engineer any automation solutions purchased from our marketplace.</p>
                    <h2>4. Disclaimer</h2>
                    <p>Products are provided "as is" without warranty of ANY kind.</p>
                </div>
            </main>
            <Footer />
        </div>
    )
}
