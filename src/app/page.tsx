import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ArrowRight, Bot, Cpu, Zap, Activity } from "lucide-react";

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden">
      {/* Hero Section */}
      <nav className="relative z-50 w-full px-6 py-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#00E5FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] group-hover:scale-110 transition-transform">
              <Zap size={22} className="text-[#070B14] fill-current" />
            </div>
            <span className="text-2xl font-[900] tracking-tighter text-[#E6F1FF] uppercase font-space">AUTO STEP</span>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/products" className="hidden md:block text-sm font-bold uppercase tracking-widest text-[#94A3B8] hover:text-[#00E5FF] transition-colors">
              Marketplace
            </Link>
            {user ? (
              <Link href="/dashboard" className="btn-secondary px-6 py-2 !rounded-xl text-xs">
                Go to Dashboard
              </Link>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-bold uppercase tracking-widest text-[#94A3B8] hover:text-[#E6F1FF] transition-colors">
                  Login
                </Link>
                <Link href="/register" className="btn-primary px-6 py-2 !rounded-xl text-xs">
                  Get Access
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-40">
        <div className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-[rgba(0,229,255,0.2)] mb-8 animate-float">
            <div className="w-2 h-2 rounded-full bg-[#00E5FF] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00E5FF]">v2.0 Active Marketplace</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-[0.9] tracking-tighter font-space uppercase">
            <span className="block text-white">Automate.</span>
            <span className="block text-[#00E5FF] drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">Innovate.</span>
            <span className="block text-white">Dominate.</span>
          </h1>

          <p className="text-[#94A3B8] text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
            The elite marketplace for production-ready automation assets. <br className="hidden md:block" />
            Acquire, deploy, and scale with futuristic precision.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/products" className="btn-primary group w-full sm:w-auto">
              Browse Automations
              <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href={user ? "/dashboard" : "/login"} className="btn-secondary w-full sm:w-auto">
              {user ? "Personal Console" : "Identify Account"}
            </Link>
          </div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-[30%] left-[5%] animate-float opacity-20 hidden lg:block" style={{ animationDelay: '1s' }}>
          <div className="glass-panel p-6 neon-border w-64 rotate-[-6deg]">
            <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
              <Cpu className="text-blue-500" />
            </div>
            <div className="h-2 w-full bg-blue-500/10 rounded-full mb-2" />
            <div className="h-2 w-2/3 bg-blue-500/10 rounded-full" />
          </div>
        </div>

        <div className="absolute bottom-[20%] right-[8%] animate-float opacity-30 hidden lg:block" style={{ animationDelay: '2.5s' }}>
          <div className="glass-panel p-6 neon-border w-72 rotate-[4deg]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Activity size={16} className="text-cyan-500" />
              </div>
              <div className="h-3 w-32 bg-cyan-500/10 rounded-full" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-2 w-16 bg-white/5 rounded-full" />
                <div className="h-2 w-8 bg-[#00E5FF]/20 rounded-full" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-2 w-20 bg-white/5 rounded-full" />
                <div className="h-2 w-12 bg-[#00E5FF]/20 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Glow Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-gradient-to-t from-[#00E5FF]/10 to-transparent pointer-events-none" />
    </div>
  );
}
