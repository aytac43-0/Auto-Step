import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ProductList } from "./ProductList";
import { ShoppingBag, Users, Activity, Zap, Shield, ArrowLeft, Globe } from "lucide-react";

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

    // Fetch Admin Stats
    const [usersCount, productsResponse, purchasesResponse, subsResponse] = await Promise.all([
        supabase.from("profiles").select("*", { count: 'exact', head: true }),
        supabase.from("products").select("*").order("name", { ascending: true }),
        supabase.from("purchases").select(`
      *,
      profiles (email),
      products (name, price),
      plans (name, price)
    `).order('created_at', { ascending: false }),
        supabase.from("subscriptions").select(`
      *,
      profiles (email),
      plans (name)
    `).order('current_period_end', { ascending: false })
    ]);

    const products = productsResponse.data || [];
    const purchases = purchasesResponse.data || [];
    const subscriptions = subsResponse.data || [];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Link href="/dashboard" className="flex items-center gap-2 group">
                            <Shield className="text-amber-500 group-hover:scale-110 transition-transform" />
                            <span className="font-bold text-xl">Admin Console</span>
                        </Link>
                    </div>
                    <Link
                        href="/dashboard"
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft size={16} />
                        Back to Dashboard
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold mb-8">System Overview</h1>

                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
                        <p className="text-blue-400 text-sm font-medium mb-1">Total Users</p>
                        <p className="text-3xl font-bold">{usersCount.count || 0}</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
                        <p className="text-emerald-400 text-sm font-medium mb-1">Subscriptions</p>
                        <p className="text-3xl font-bold">{subscriptions.filter((s: any) => s.status === 'active').length}</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 p-6 rounded-2xl">
                        <p className="text-purple-400 text-sm font-medium mb-1">Total Sales</p>
                        <p className="text-3xl font-bold">{purchases.length}</p>
                    </div>
                    <div className="bg-amber-500/10 border border-amber-500/20 p-6 rounded-2xl">
                        <p className="text-amber-400 text-sm font-medium mb-1">Revenue</p>
                        <p className="text-3xl font-bold">
                            ${purchases.reduce((acc: number, curr: any) => acc + (curr.products?.price || curr.plans?.price || 0), 0)}
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-3 space-y-12">
                        {/* Product Management */}
                        <ProductList products={products} />

                        {/* Subscriptions Table */}
                        <div className="bg-slate-900/30 border border-slate-800 rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                                <div className="flex items-center gap-2">
                                    <Activity className="text-blue-500" />
                                    <h2 className="text-xl font-bold">Active Subscriptions</h2>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-slate-500 text-sm bg-slate-950/50">
                                            <th className="px-6 py-4">User Email</th>
                                            <th className="px-6 py-4">Plan</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Expiration</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {subscriptions.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-12 text-center text-slate-500">No subscriptions found.</td>
                                            </tr>
                                        ) : (
                                            subscriptions.map((sub: any) => (
                                                <tr key={sub.id} className="hover:bg-slate-800/20 transition-colors">
                                                    <td className="px-6 py-4 font-medium">{sub.profiles?.email}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-bold">
                                                            {sub.plans?.name}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-bold ${sub.status === 'active' && new Date(sub.current_period_end) > new Date() ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                                                            {sub.status?.toUpperCase()}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 text-right text-slate-500 text-sm">
                                                        {new Date(sub.current_period_end).toLocaleDateString()}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Recent Purchases Table */}
                        <div className="bg-slate-900/30 border border-slate-800 rounded-3xl overflow-hidden">
                            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                                <div className="flex items-center gap-2">
                                    <ShoppingCart className="text-emerald-500" />
                                    <h2 className="text-xl font-bold">Recent Purchases</h2>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-slate-500 text-sm bg-slate-950/50">
                                            <th className="px-6 py-4">Customer Email</th>
                                            <th className="px-6 py-4">Item Name</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4 text-right">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-800">
                                        {purchases.length === 0 ? (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">No purchases found.</td>
                                            </tr>
                                        ) : (
                                            purchases.map((purchase: any) => (
                                                <tr key={purchase.id} className="hover:bg-slate-800/20 transition-colors">
                                                    <td className="px-6 py-4 font-medium">{purchase.profiles?.email}</td>
                                                    <td className="px-6 py-4">
                                                        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-bold">
                                                            {purchase.products?.name || purchase.plans?.name}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <span className={`px-2 py-1 rounded text-xs font-bold ${purchase.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500' :
                                                            purchase.status === 'failed' ? 'bg-red-500/10 text-red-500' :
                                                                'bg-amber-500/10 text-amber-500'
                                                            }`}>
                                                            {purchase.status?.toUpperCase() || 'PENDING'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 font-mono">${purchase.products?.price || purchase.plans?.price}</td>
                                                    <td className="px-6 py-4 text-right text-slate-500 text-sm">
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

// Minimal icons helper if Lucide doesn't have it (but it should)
function ShoppingCart(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
        </svg>
    )
}
