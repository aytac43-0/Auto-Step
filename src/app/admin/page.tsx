import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ProductList } from "./ProductList";
import { ShoppingBag, Users, Zap, Shield, ArrowLeft, Cpu, CreditCard, Activity } from "lucide-react";

export default async function AdminPage() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (profile?.role !== "admin") {
        return redirect("/dashboard");
    }

    // Fetch Admin Stats for Marketplace
    const [usersCount, productsResponse, purchasesResponse, automationsCount] = await Promise.all([
        supabase.from("profiles").select("*", { count: 'exact', head: true }),
        supabase.from("products").select("*").order("name", { ascending: true }),
        supabase.from("purchases").select(`
          *,
          profiles (email),
          products (name, price)
        `).order('created_at', { ascending: false }),
        supabase.from("automations").select("*", { count: 'exact', head: true })
    ]);

    const products = productsResponse.data || [];
    const purchases = purchasesResponse.data || [];

    return (
        <div className="min-h-screen bg-[#020617] text-[#E5E7EB] flex flex-col">
            {/* Header v2 */}
            <nav className="border-b border-[#1E293B] bg-[#0B1220]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Link href="/dashboard" className="flex items-center gap-2 group">
                            <Shield className="text-amber-500 group-hover:scale-110 transition-transform" />
                            <span className="font-black text-xl tracking-tight uppercase">Admin Console</span>
                        </Link>
                    </div>
                    <Link
                        href="/dashboard"
                        className="text-xs font-black uppercase tracking-widest text-[#94A3B8] hover:text-white transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Exit to Dashboard
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
                <div className="mb-12">
                    <h1 className="text-4xl font-black mb-2 tracking-tight">Marketplace Intel</h1>
                    <p className="text-[#94A3B8]">Global oversight of automation assets and customer acquisitions.</p>
                </div>

                {/* KPI Summary v2 */}
                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="premium-card p-6 bg-blue-500/5 border-blue-500/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Users size={18} className="text-blue-400" />
                            <p className="text-[#94A3B8] text-[10px] font-black uppercase tracking-widest">Global Users</p>
                        </div>
                        <p className="text-3xl font-black text-white">{usersCount.count || 0}</p>
                    </div>

                    <div className="premium-card p-6 bg-emerald-500/5 border-emerald-500/10">
                        <div className="flex items-center gap-3 mb-2">
                            <ShoppingBag size={18} className="text-emerald-400" />
                            <p className="text-[#94A3B8] text-[10px] font-black uppercase tracking-widest">Active Products</p>
                        </div>
                        <p className="text-3xl font-black text-white">{products.length}</p>
                    </div>

                    <div className="premium-card p-6 bg-amber-500/5 border-amber-500/10">
                        <div className="flex items-center gap-3 mb-2">
                            <CreditCard size={18} className="text-amber-400" />
                            <p className="text-[#94A3B8] text-[10px] font-black uppercase tracking-widest">Asset Sales</p>
                        </div>
                        <p className="text-3xl font-black text-white">{purchases.length}</p>
                    </div>

                    <div className="premium-card p-6 bg-indigo-500/5 border-indigo-500/10">
                        <div className="flex items-center gap-3 mb-2">
                            <Cpu size={18} className="text-indigo-400" />
                            <p className="text-[#94A3B8] text-[10px] font-black uppercase tracking-widest">Active Instances</p>
                        </div>
                        <p className="text-3xl font-black text-white">{automationsCount.count || 0}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    <div className="lg:col-span-12 space-y-12">
                        {/* Product Management */}
                        <div className="premium-surface p-1">
                            <ProductList products={products} />
                        </div>

                        {/* Recent Asset Acquisitions Table */}
                        <div className="premium-card overflow-hidden">
                            <div className="p-8 border-b border-[#1E293B] flex justify-between items-center bg-gradient-to-r from-[#0B1220] to-[#0F172A]">
                                <div className="flex items-center gap-3">
                                    <Activity className="text-emerald-400" size={24} />
                                    <h2 className="text-xl font-black tracking-tight">Recent Acquisitions</h2>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-[#94A3B8] text-xs font-black uppercase tracking-widest bg-[#020617]/50">
                                            <th className="px-8 py-5">Customer Entity</th>
                                            <th className="px-8 py-5">Asset Acquired</th>
                                            <th className="px-8 py-5">Verification</th>
                                            <th className="px-8 py-5">Value</th>
                                            <th className="px-8 py-5 text-right">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1E293B]">
                                        {purchases.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-8 py-16 text-center text-[#94A3B8] italic">No transaction data available.</td>
                                            </tr>
                                        ) : (
                                            purchases.map((purchase: any) => (
                                                <tr key={purchase.id} className="hover:bg-[#3B82F6]/5 transition-colors group">
                                                    <td className="px-8 py-5 text-[#E5E7EB] font-bold">{purchase.profiles?.email}</td>
                                                    <td className="px-8 py-5">
                                                        <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                                                            {purchase.products?.name}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5">
                                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${purchase.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' :
                                                            purchase.status === 'failed' ? 'bg-red-500/10 text-red-500' :
                                                                'bg-amber-500/10 text-amber-500'
                                                            }`}>
                                                            {purchase.status || 'PENDING'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-5 font-mono text-white text-sm font-bold">${purchase.products?.price}</td>
                                                    <td className="px-8 py-5 text-right text-[#94A3B8] text-xs font-medium">
                                                        {new Date(purchase.created_at).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
