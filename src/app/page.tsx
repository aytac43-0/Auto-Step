import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Zap, LayoutDashboard } from "lucide-react";

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative flex flex-col items-center">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#0A0F1A]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/30 transition-all">
              <Shield size={18} />
            </div>
            <span className="text-lg font-bold tracking-tight text-white uppercase font-sans">AUTO STEP</span>
          </Link>

          <div className="flex items-center gap-8">
            <Link href="/products" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Catalog</Link>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <Link href={user ? "/dashboard" : "/login"} className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest">
              {user ? "Dashboard" : "Partner Access"}
            </Link>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-6 pt-32 pb-24 md:pt-48 md:pb-40 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-cyan-400 text-xs font-semibold mb-8 fade-in">
          <Shield size={14} />
          Professional Business Automation
        </div>

        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1] text-white">
          Architecting systems for <br className="hidden md:block" />
          <span className="text-gray-400">scalable productivity.</span>
        </h1>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          Auto Step is a professional automation studio that builds and delivers production-ready systems for modern enterprises.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products" className="btn-primary px-8 py-4 w-full sm:w-auto">
            View System Catalog
          </Link>
          <Link href={user ? "/dashboard" : "/login"} className="btn-secondary px-8 py-4 w-full sm:w-auto">
            {user ? "Client Dashboard" : "Partner Login"}
          </Link>
        </div>
      </section>

      {/* Trust Marks */}
      <section className="w-full border-y border-white/5 bg-white/[0.01] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around gap-8 items-center opacity-40 grayscale">
          <span className="text-xl font-bold tracking-tighter">ENTERPRISE</span>
          <span className="text-xl font-bold tracking-tighter">EFFICIENCY</span>
          <span className="text-xl font-bold tracking-tighter">STABILITY</span>
          <span className="text-xl font-bold tracking-tighter">PRECISION</span>
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full max-w-7xl px-6 py-32">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <CheckCircle2 size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Bespoke Architecture</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              We design custom vertical systems tailored specifically to your existing business workflows and KPIs.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Rapid Deployment</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Our pre-vetted module library allows us to deploy stable automation environments in days, not months.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <LayoutDashboard size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Managed Scaling</h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              Systems built by our studio are designed to scale with your transaction volume without human intervention.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
