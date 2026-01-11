import Navbar from "@/components/nav";
import { Footer } from "@/components/footer";

export const dynamic = 'force-dynamic'

export default function PrivacyPolicy() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="container py-20 max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
                <div className="prose prose-slate dark:prose-invert">
                    <p>Last updated: {new Date().toLocaleDateString()}</p>
                    <p>
                        At Auto-Step, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclosure, and safeguard your information when you visit our website.
                    </p>

                    <h2>Information We Collect</h2>
                    <p>
                        We collect information that you voluntarily provide to us when you register on the website, express an interest in obtaining information about us or our products and services, when you participate in activities on the website or otherwise when you contact us.
                    </p>

                    <h2>Use of Your Information</h2>
                    <p>
                        Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:
                    </p>
                    <ul>
                        <li>Create and manage your account.</li>
                        <li>Email you regarding your account or order.</li>
                        <li>Fulfill and manage purchases, orders, payments, and other transactions.</li>
                    </ul>

                    <h2>Contact Us</h2>
                    <p>
                        If you have questions or comments about this Privacy Policy, please contact us.
                    </p>
                </div>
            </div>

            <Footer />
        </main>
    );
}
