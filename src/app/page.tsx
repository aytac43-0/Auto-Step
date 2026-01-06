import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen w-full bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
      {/* Background Glow */}
      <div
        className="pointer-events-none absolute -top-[30%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] rounded-full bg-blue-500/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/4 -right-[10%] w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px]"
        aria-hidden="true"
      />

      {/* Navigation / Logo Header */}
      <header className="relative z-10 w-full px-6 py-8 flex justify-center">
        <Image
          src="/images/brand/auto-step-logo.svg"
          alt="Auto Step Logo"
          width={180}
          height={48}
          className="h-10 w-auto"
          priority
        />
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 text-center lg:px-8">
        <style dangerouslySetInnerHTML={{
          __html: `
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-up {
            opacity: 0;
            animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }
        `}} />
        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-slate-100 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Digital Automation, <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              Done Right.
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-400 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '0.4s' }}>
            We design and build scalable automation systems for modern businesses.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.6s' }}>
            <Link
              href="/register"
              className="w-full sm:w-auto px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-slate-200 transition-colors duration-200 text-center"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-semibold rounded-full border border-slate-800 hover:bg-slate-800 transition-colors duration-200 text-center"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>

      {/* Footer / Bottom Spacer */}
      <footer className="py-12 border-t border-slate-900/50 flex flex-col items-center gap-4 opacity-50 text-xs">
        <p>© {new Date().getFullYear()} Auto Step. All rights reserved.</p>
      </footer>
    </div>
  );
}
