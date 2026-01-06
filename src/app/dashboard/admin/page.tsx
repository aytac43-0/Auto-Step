import { getCurrentProfile } from "@/lib/getCurrentProfile";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ProductList } from "./ProductList";
import {
    Users,
    Layout,
    TrendingUp,
    ArrowUpRight,
    ShieldCheck,
    Activity,
    CreditCard,
    Menu,
    Plus,
    LayoutDashboard
} from "lucide-react";

export default async function AdminPage() {
    const supabase = createClient();
    const profile = await getCurrentProfile();

    if (!profile || profile.role !== "admin") {
        return redirect("/dashboard");
    }

    // Fetch Stats
    const [usersCount, productsCount, salesCount, instancesCount] = await Promise.all([
        supabase.from("profiles").select("*", { count: 'exact', head: true }),
        supabase.from("products").select("*", { count: 'exact', head: true }),
        supabase.from("purchases").select("*", { count: 'exact', head: true }),
        supabase.from("automations").select("*", { count: 'exact', head: true }),
    ]);

    const stats = [
        { label: "Active Users", value: usersCount.count || 0, icon: <Users size={20} />, trend: "+2" },
        { label: "Module Inventory", value: productsCount.count || 0, icon: <Layout size={20} />, trend: "Stable" },
        { label: "Acquisition Vol", value: `$${((salesCount.count || 0) * 49).toLocaleString()}`, icon: <TrendingUp size={20} />, trend: "+4%" },
        { label: "Active Nodes", value: instancesCount.count || 0, icon: <Activity size={20} />, trend: "99.9%" },
    ];

    const { data: recentPurchases } = await supabase
        .from("purchases")
        .select(`
            *,
            profiles:user_id (username, email),
            products:product_id (name)
        `)
        .order("created_at", { ascending: false })
        .limit(5);

    return (
        <div className="min-h-screen pt-20 flex flex-col">
            {/* Admin Sub-Nav */}
            <div className="w-full border-b border-white/5 py-5 bg-[#0D121F]/50 backdrop-blur-md">
                <div className="max-w-[1600px] mx-auto px-8 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 bg-white/5 rounded-lg flex items-center justify-center text-cyan-400">
                            <Menu size={18} />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
                            Operations Intelligence
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-2 py-0.5 border border-white/5 rounded">Privileged Access</span>
                        </h1>
                    </div>

                    <Link href="/dashboard" className="text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                        <LayoutDashboard size={14} />
                        Return to Dashboard
                    </Link>
                </div>
            </div>

            <main className="max-w-[1600px] mx-auto px-8 py-12 w-full">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-[#111827] border border-white/5 p-8 rounded-2xl group hover:border-cyan-500/10 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-white/5 text-cyan-400 rounded-xl group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <span className="text-[9px] font-bold text-emerald-500 uppercase tracking-widest bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10">
                                    {stat.trend}
                                </span>
                            </div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">{stat.label}</p>
                            <p className="text-3xl font-bold text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Management */}
                    <div className="lg:col-span-8 space-y-12">
                        <section className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <h2 className="text-lg font-bold text-white flex items-center gap-3 italic">
                                    <Layout className="text-cyan-400" size={20} />
                                    Active Platform Inventory
                                </h2>
                                <button className="btn-primary !py-2.5 !px-5 text-xs flex items-center gap-2">
                                    <Plus size={16} />
                                    Deploy System
                                </button>
                            </div>
                            <div className="p-2">
                                <ProductList initialProducts={[]} />
                            </div>
                        </section>
                    </div>

                    {/* Logs */}
                    <div className="lg:col-span-4">
                        <section className="bg-[#111827] border border-white/5 rounded-2xl overflow-hidden shadow-2xl h-fit">
                            <div className="p-8 border-b border-white/5">
                                <h2 className="text-lg font-bold text-white flex items-center gap-3 italic">
                                    <CreditCard className="text-cyan-400" size={20} />
                                    Acquisition Feed
                                </h2>
                            </div>
                            <div className="p-8 space-y-8">
                                {recentPurchases?.map((purchase: any) => (
                                    <div key={purchase.id} className="flex items-center justify-between group cursor-default">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 group-hover:text-cyan-400 transition-colors">
                                                <Users size={18} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-white">{purchase.profiles?.username}</p>
                                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{purchase.products?.name}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-white">${purchase.amount}</p>
                                            <p className="text-[9px] text-emerald-500 font-bold uppercase tracking-tighter">Verified</p>
                                        </div>
                                    </div>
                                ))}
                                {!recentPurchases?.length && (
                                    <div className="text-center py-10 opacity-30 grayscale italic">
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">No Logs Available</p>
                                    </div>
                                )}

                                <button className="w-full mt-8 py-3 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-gray-400 uppercase tracking-widest hover:border-cyan-500/20 hover:text-cyan-400 transition-all">
                                    Download Acquisition Logs
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
