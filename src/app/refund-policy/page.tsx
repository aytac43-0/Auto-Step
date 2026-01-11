import { Footer } from "@/components/footer"
import Navbar from "@/components/nav"

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-background text-foreground font-light">
            <Navbar />
            <main className="container py-20 max-w-4xl">
                <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-8">Refund Policy</h1>
                <div className="prose prose-invert prose-lg max-w-none">
                    <p>Last updated: January 2026</p>
                    <h2>1. No Refunds on Digital Products</h2>
                    <p>Due to the nature of our downloadable and immediately deployable automation solutions, we generally do not offer refunds once access has been granted.</p>
                    <h2>2. Exceptions</h2>
                    <p>If a product is technically defective and cannot be fixed by our support team within 7 days, a full refund may be issued at our discretion.</p>
                    <h2>3. Contact Us</h2>
                    <p>If you have issues with your purchase, please contact support immediately via your Client Portal.</p>
                </div>
            </main>
            <Footer />
        </div>
    )
}
