import Navbar from '@/components/nav'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36 bg-background bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-brand-blue/5 via-transparent to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl md:text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6 drop-shadow-sm">
              Automate Your <span className="text-brand-blue">Digital Step</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground/80 max-w-2xl mx-auto font-light">
              Professional tools and resources to elevate your workflow.
              Secure, fast, and reliable solutions for the modern agency.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/register"
                className="rounded-lg bg-brand-blue px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-blue/20 hover:bg-brand-blue/90 transition-all duration-300 hover:scale-105"
              >
                Get Started
              </Link>
              <Link href="#contact" className="text-sm font-semibold leading-6 text-foreground hover:text-brand-blue transition-colors">
                Contact Sales <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature / Product Placeholder */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Our Services</h2>
            <p className="mt-4 text-muted-foreground">Everything you need to succeed.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="p-8 rounded-2xl border bg-background hover:shadow-lg transition-shadow">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <span className="text-primary font-bold">{i}</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Service {i}</h3>
                <p className="text-muted-foreground">High quality automation tools designed for performance and scale.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact / Footer */}
      <footer className="py-12 border-t mt-auto" id="contact">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} Auto-Step. All rights reserved.
          </p>
          <div className="mt-4 space-x-4">
            <Link href="/privacy-policy" className="text-sm text-foreground hover:underline">Privacy Policy</Link>
            <Link href="#" className="text-sm text-foreground hover:underline">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
