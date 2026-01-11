import Link from "next/link";
import { Footer } from "@/components/footer";
import Nav from "@/components/nav";
import { CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export const dynamic = 'force-dynamic'

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden text-foreground">
      {/* Background Blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-40" />

      <Nav />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface border border-white/5 text-xs font-medium text-primary mb-8 animate-fade-in-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Accepting New Clients
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-slate-400">
            Professional Automation
          </span>
          <br />
          <span className="text-primary">Studio & Marketplace.</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Acquire pre-built, managed automation infrastructures. Secure, scalable, and deployed instantly to your private client portal.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-xl shadow-primary/20"
          >
            Client Portal Access
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 rounded-full bg-surface border border-white/10 text-white font-medium hover:bg-white/5 transition-all hover:scale-105"
          >
            Sign In
          </Link>
        </div>

        {/* Value Props */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto text-left">
          <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl mb-6 flex items-center justify-center text-primary">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Instant Deployment</h3>
            <p className="text-muted-foreground leading-relaxed">
              Purchase access and receive your secure credentials immediately via our automated delivery engine.
            </p>
          </div>
          <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl mb-6 flex items-center justify-center text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Managed Security</h3>
            <p className="text-muted-foreground leading-relaxed">
              All automations run in isolated, secure environments monitored 24/7 by our engineering team.
            </p>
          </div>
          <div className="glass-card p-8 rounded-2xl border border-white/5 hover:border-primary/20 transition-colors">
            <div className="w-12 h-12 bg-primary/10 rounded-xl mb-6 flex items-center justify-center text-primary">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Enterprise Scale</h3>
            <p className="text-muted-foreground leading-relaxed">
              Built to handle enterprise-grade workloads without compromising on speed or reliability.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
