import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Shield, Zap, LayoutDashboard } from "lucide-react";

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-7xl px-6 pt-40 pb-24 md:pt-60 md:pb-40 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10 text-cyan-400 text-xs font-semibold mb-8 fade-in">
          <Shield size={14} />
          Enterprise Systems Studio
        </div>

        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1] text-white">
          Engineering excellence through <br className="hidden md:block" />
          <span className="text-gray-400 font-tight">business automation.</span>
        </h1>

        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Auto Step delivers reliable architectural solutions for modern enterprises, focusing on stability, scalability, and operational efficiency through custom-engineered automation.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products" className="btn-primary px-10 py-4 w-full sm:w-auto">
            View System Catalog
          </Link>
          <Link href={user ? "/dashboard" : "/login"} className="btn-secondary px-10 py-4 w-full sm:w-auto">
            {user ? "Client Dashboard" : "Partner Login"}
          </Link>
        </div>
      </section>

      {/* Trust Marks */}
      <section className="w-full border-y border-white/5 bg-white/[0.01] py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-around gap-8 items-center opacity-40 grayscale">
          <span className="text-lg font-bold tracking-tight uppercase">Enterprise Grade</span>
          <span className="text-lg font-bold tracking-tight uppercase">Operational Stability</span>
          <span className="text-lg font-bold tracking-tight uppercase">Global Precision</span>
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
            <p className="text-gray-400 leading-relaxed text-sm font-medium">
              We design vertical systems tailored specifically to your existing business workflows and performance benchmarks.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Stable Deployment</h3>
            <p className="text-gray-400 leading-relaxed text-sm font-medium">
              Our pre-vetted module library allows for the rapid integration of high-performance automation environments.
            </p>
          </div>
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <LayoutDashboard size={24} />
            </div>
            <h3 className="text-xl font-bold text-white">Managed Scaling</h3>
            <p className="text-gray-400 leading-relaxed text-sm font-medium">
              Systems are built to maintain integrity under high transaction volumes, ensuring continuous operational growth.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
