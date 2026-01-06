import { createClient } from "@/utils/supabase/server";
import { ProductSearch } from "./ProductSearch";
import Link from "next/link";
import { Zap, ArrowLeft, LayoutGrid, Terminal } from "lucide-react";

export default async function ProductsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: products } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen bg-[#070B14] text-[#E6F1FF] flex flex-col relative overflow-hidden">
            {/* Background Orbs */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#00E5FF]/5 blur-[150px] rounded-full" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/5 blur-[150px] rounded-full" />
            </div>

            {/* Nav */}
            <nav className="relative z-50 w-full px-6 py-8 border-b border-[rgba(0,229,255,0.1)] backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-[#00E5FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-transform group-hover:scale-110">
                            <Zap size={22} className="text-[#070B14] fill-current" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-[#E6F1FF] uppercase font-space">AUTO STEP</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        {user ? (
                            <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-[#00E5FF] flex items-center gap-2 hover:opacity-80 transition-opacity">
                                <LayoutGrid size={14} />
                                Dashboard console
                            </Link>
                        ) : (
                            <Link href="/login" className="btn-secondary px-6 py-2 !rounded-xl text-[10px]">
                                Authorize Access
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <main className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
                <div className="text-center mb-24">
                    <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel border-[rgba(0,229,255,0.2)] mb-8">
                        <Terminal size={12} className="text-[#00E5FF]" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00E5FF]">Source Code Distribution</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter font-space uppercase italic mb-6">
                        Automation <span className="text-[#00E5FF] drop-shadow-[0_0_20px_rgba(0,229,255,0.3)]">Marketplace</span>
                    </h1>
                    <p className="text-[#94A3B8] text-lg max-w-2xl mx-auto font-medium leading-relaxed">
                        Acquire high-fidelity automation modules directly into your ecosystem. <br className="hidden md:block" />
                        No subscriptions. Pure ownership. Pure performance.
                    </p>
                </div>

                {products && products.length > 0 ? (
                    <ProductSearch initialProducts={products} isLoggedIn={!!user} />
                ) : (
                    <div className="text-center py-40 glass-panel neon-border animate-float">
                        <Zap size={40} className="mx-auto text-[#94A3B8]/20 mb-6" />
                        <p className="text-[#94A3B8] font-bold uppercase tracking-widest italic">Global Node Sync in Progress...</p>
                        <p className="text-[#94A3B8]/40 text-xs mt-2 font-medium uppercase tracking-[0.2em]">Check back shortly for new modules.</p>
                    </div>
                )}
            </main>

            {/* Decorative Sidebar Lines */}
            <div className="fixed left-6 top-1/2 -translate-y-1/2 h-[200px] w-px bg-gradient-to-b from-transparent via-[#00E5FF]/20 to-transparent pointer-events-none" />
            <div className="fixed right-6 top-1/2 -translate-y-1/2 h-[200px] w-px bg-gradient-to-b from-transparent via-[#00E5FF]/20 to-transparent pointer-events-none" />
        </div>
    );
}
