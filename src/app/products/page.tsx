import { createClient } from "@/utils/supabase/server";
import { BuyButton } from "./BuyButton";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";

export default async function ProductsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: products } = await supabase
        .from("products")
        .select("*")
        .eq("active", true)
        .order("price", { ascending: true });

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg" />
                        <span className="font-bold text-xl">Auto Step</span>
                    </Link>
                    <Link href={user ? "/dashboard" : "/login"} className="text-sm font-medium hover:text-blue-400 transition-colors">
                        {user ? "Dashboard" : "Login"}
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center mb-16">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors text-sm mb-6">
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                    <h1 className="text-5xl font-bold mb-4">Marketplace</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto italic">Premium automation products designed to accelerate your workflow and scale your operations effortlessly.</p>
                </div>

                {!products || products.length === 0 ? (
                    <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl">
                        <p className="text-slate-500">No products available at the moment. Please check back later.</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 gap-8">
                        {products.map((product) => (
                            <div key={product.id} className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl flex flex-col hover:border-blue-500/30 transition-all group">
                                <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    <Tag size={24} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
                                <p className="text-slate-400 text-sm mb-8 flex-1">{product.description}</p>
                                <div className="flex items-baseline gap-1 mb-8">
                                    <span className="text-4xl font-bold">${product.price}</span>
                                    <span className="text-slate-500 text-sm italic">/ one-time</span>
                                </div>
                                <BuyButton productId={product.id} productName={product.name} price={product.price} isLoggedIn={!!user} />
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
