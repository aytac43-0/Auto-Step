import { createClient } from "@/utils/supabase/server";
import { ProductSearch } from "./ProductSearch";
import Link from "next/link";
import { ArrowLeft, Zap, ShoppingBag } from "lucide-react";

export default async function ProductsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("price", { ascending: true });

    return (
        <div className="min-h-screen bg-[#020617] text-[#E5E7EB] flex flex-col">
            {/* Header v2 */}
            <nav className="border-b border-[#1E293B] bg-[#0B1220]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2 group transition-all">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#3B82F6] to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            <Zap size={20} className="text-white fill-current" />
                        </div>
                        <span className="font-black text-xl tracking-tight">AUTO STEP</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link href={user ? "/dashboard" : "/login"} className="text-sm font-bold text-[#94A3B8] hover:text-white transition-colors">
                            {user ? "Dashboard" : "Login"}
                        </Link>
                        {user && (
                            <Link href="/dashboard" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-[#0F172A] border border-[#1E293B] rounded-xl text-xs font-bold hover:bg-[#1E293B] transition-all">
                                <ShoppingBag size={14} className="text-blue-500" />
                                My Assets
                            </Link>
                        )}
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                <div className="text-center mb-20">
                    <Link href="/" className="inline-flex items-center gap-2 text-[#94A3B8] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest mb-8">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                    <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">Automation Marketplace</h1>
                    <p className="text-[#94A3B8] max-w-2xl mx-auto text-lg leading-relaxed">
                        Discover elite automation products engineered for high performance. <br className="hidden md:block" />
                        Select an asset to scale your operations instantly.
                    </p>
                </div>

                {!products ? (
                    <div className="text-center py-20 bg-[#0B1220]/50 border border-dashed border-[#1E293B] rounded-3xl">
                        <div className="w-16 h-16 bg-[#0F172A] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#1E293B]">
                            <ShoppingBag size={32} className="text-[#1E293B]" />
                        </div>
                        <p className="text-[#94A3B8] font-medium">Marketplace is currently being updated. Check back soon.</p>
                    </div>
                ) : (
                    <ProductSearch initialProducts={products} isLoggedIn={!!user} />
                )}
            </main>
        </div>
    );
}
