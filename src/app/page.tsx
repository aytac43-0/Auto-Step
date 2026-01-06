import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { ArrowRight, Box, Terminal, Zap } from "lucide-react";

export default async function Home() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-hidden bg-[#020617]">
      {/* Dynamic Background Effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-blue-600/10 blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 w-full px-6 py-8 border-b border-[#1E293B]/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Zap size={22} className="text-white fill-current" />
            </div>
            <span className="text-2xl font-black tracking-tight text-[#E5E7EB]">
              AUTO STEP
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {!user ? (
              <>
                <Link href="/login" className="text-sm font-bold text-[#94A3B8] hover:text-[#E5E7EB] transition-colors">
                  Login
                </Link>
                <Link href="/register" className="hidden sm:block px-6 py-2.5 bg-[#0F172A] border border-[#1E293B] text-sm font-bold rounded-xl hover:bg-[#1E293B] transition-all">
                  Get Started
                </Link>
              </>
            ) : (
              <Link href="/dashboard" className="px-6 py-2.5 bg-[#3B82F6] text-white text-sm font-bold rounded-xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20">
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center pt-20 pb-32">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-hero {
            opacity: 0;
            animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}} />

        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/10 text-blue-400 text-xs font-bold uppercase tracking-widest mb-10 animate-hero" style={{ animationDelay: '0s' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Premium Automation Marketplace
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-[#E5E7EB] leading-[1.1] mb-8 animate-hero" style={{ animationDelay: '0.2s' }}>
            Unlock the Power of <br />
            <span className="bg-gradient-to-r from-[#3B82F6] via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Ready-Made Automations.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#94A3B8] max-w-2xl mx-auto leading-relaxed mb-12 animate-hero" style={{ animationDelay: '0.4s' }}>
            Stop building from scratch. Access our exclusive collection of <br className="hidden md:block" />
            high-performance automation products designed for scale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-hero" style={{ animationDelay: '0.6s' }}>
            {user ? (
              <Link href="/dashboard" className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2">
                Go to Dashboard
                <ArrowRight size={20} />
              </Link>
            ) : (
              <Link href="/products" className="w-full sm:w-auto btn-primary flex items-center justify-center gap-2">
                Browse Automations
                <ArrowRight size={20} />
              </Link>
            )}
            {!user && (
              <Link href="/login" className="w-full sm:w-auto btn-secondary">
                Login to Account
              </Link>
            )}
          </div>
        </div>

        {/* Feature Grid Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-32 animate-hero" style={{ animationDelay: '0.8s' }}>
          <div className="premium-card p-8 text-left hover:border-blue-500/30 transition-colors group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
              <Box size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#E5E7EB] mb-3">Pre-Built Assets</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">Battle-tested automation products ready to deploy into your existing workflows immediately.</p>
          </div>
          <div className="premium-card p-8 text-left hover:border-blue-500/30 transition-colors group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
              <Terminal size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#E5E7EB] mb-3">Enterprise Scale</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">Every product is engineered for high-concurrency and maximum reliability under heavy loads.</p>
          </div>
          <div className="premium-card p-8 text-left hover:border-blue-500/30 transition-colors group">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 mb-6 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-[#E5E7EB] mb-3">Zero Management</h3>
            <p className="text-[#94A3B8] text-sm leading-relaxed">No complex configurations. We handle the infrastructure while you focus on results.</p>
          </div>
        </div>
      </main>
    </div>
  );
}
