import Link from "next/link";
import Nav from "@/components/nav";

export default function Home() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

      <Nav />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400">
            Elevate Your Digital
          </span>
          <br />
          <span className="text-primary">Presence Example.</span>
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Premium automated solutions for the modern agency. Built for scale, security, and performance.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-8 py-4 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 rounded-full bg-surface border border-white/10 text-white font-medium hover:bg-white/5 transition-all hover:scale-105"
          >
            Live Demo
          </Link>
        </div>

        {/* Feature Cards Mockup */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 rounded-2xl">
              <div className="w-10 h-10 bg-primary/20 rounded-lg mb-4 flex items-center justify-center text-primary font-bold">
                {i}
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Premium Feature</h3>
              <p className="text-sm text-muted-foreground">Optimized for high-performance and scalability using the latest tech stack.</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
