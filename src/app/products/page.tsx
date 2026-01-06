import { createClient } from "@/utils/supabase/server";
import { ProductSearch } from "./ProductSearch";
import Link from "next/link";
import { Layers, ChevronRight, Briefcase } from "lucide-react";

export default async function ProductsPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    const { data: products } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen pt-20 flex flex-col items-center">
            {/* Page Header */}
            <section className="w-full max-w-7xl px-6 py-24 border-b border-white/5">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-[0.2em] mb-4">
                            <Briefcase size={16} />
                            Module Catalog
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight mb-8">
                            Reliable systems <br />
                            <span className="text-gray-500">for business growth.</span>
                        </h1>
                        <p className="text-gray-400 text-lg leading-relaxed">
                            Browse our architectural library of automation modules. Each system is designed to seamlessly integrate into your existing business environment.
                        </p>
                    </div>
                    <div className="hidden lg:flex flex-col items-end gap-2 text-right">
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Active Partner Nodes</p>
                        <p className="text-2xl font-bold text-white">128 Global Instances</p>
                        <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-bold uppercase tracking-widest mt-2">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            All Systems Fully Scalable
                        </div>
                    </div>
                </div>
            </section>

            <main className="w-full max-w-7xl px-6 py-20">
                {products && products.length > 0 ? (
                    <ProductSearch initialProducts={products} isLoggedIn={!!user} />
                ) : (
                    <div className="text-center py-40 bg-[#111827] border border-white/5 rounded-[2rem]">
                        <Layers size={48} className="mx-auto text-gray-700 mb-8" />
                        <h3 className="text-2xl font-bold text-white mb-2">Catalog Syncing...</h3>
                        <p className="text-gray-500 font-medium">Updating system records. Please refresh shortly.</p>
                    </div>
                )}
            </main>

            {/* Trust Quote */}
            <section className="w-full max-w-5xl px-6 py-32 text-center">
                <div className="w-px h-24 bg-gradient-to-b from-cyan-500/50 to-transparent mx-auto mb-12" />
                <h2 className="text-3xl md:text-4xl font-bold text-white italic tracking-tight mb-8 leading-relaxed">
                    &quot;The most powerful automation is the one you never notice because it just works.&quot;
                </h2>
                <p className="text-gray-500 uppercase tracking-[0.4em] font-bold text-xs">Auto Step Studio Principles</p>
            </section>
        </div>
    );
}
