import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ProductList } from "./ProductList";
import {
    Users,
    Box,
    TrendingUp,
    ArrowUpRight,
    Zap,
    LogOut,
    ShieldCheck,
    Settings,
    Activity,
    CreditCard
} from "lucide-react";

export default async function AdminPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .single();

    if (profile?.role !== "admin") return redirect("/dashboard");

    // Fetch Stats
    const [usersCount, productsCount, salesCount, instancesCount] = await Promise.all([
        supabase.from("profiles").select("*", { count: 'exact', head: true }),
        supabase.from("products").select("*", { count: 'exact', head: true }),
        supabase.from("purchases").select("*", { count: 'exact', head: true }),
        supabase.from("automations").select("*", { count: 'exact', head: true }),
    ]);

    const stats = [
        { label: "Global Operators", value: usersCount.count || 0, icon: <Users size={20} />, trend: "+12%" },
        { label: "Active Modules", value: productsCount.count || 0, icon: <Box size={20} />, trend: "Optimal" },
        { label: "Market Volume", value: `$${((salesCount.count || 0) * 49).toLocaleString()}`, icon: <TrendingUp size={20} />, trend: "+8.4%" },
        { label: "Asset Instances", value: instancesCount.count || 0, icon: <Activity size={20} />, trend: "99.9% Up" },
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
        <div className="min-h-screen bg-[#070B14] text-[#E6F1FF] flex flex-col font-sans">
            {/* Admin Header */}
            <header className="border-b border-[rgba(0,229,255,0.1)] bg-[#0A1020]/50 backdrop-blur-xl sticky top-0 z-[60]">
                <div className="max-w-[1600px] mx-auto px-8 py-5 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#00E5FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                            <Zap size={22} className="text-[#070B14] fill-current" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black tracking-tighter font-space uppercase flex items-center gap-2">
                                Admin Intelligence
                                <span className="text-[9px] bg-[#00E5FF]/10 text-[#00E5FF] px-2 py-0.5 rounded-full border border-[#00E5FF]/20">ROOT_ACCESS</span>
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8] hover:text-[#00E5FF] flex items-center gap-2 transition-colors">
                            <ArrowUpRight size={14} />
                            Exit to Console
                        </Link>
                        <div className="w-px h-4 bg-white/10" />
                        <div className="flex items-center gap-3">
                            <button className="p-2 text-[#94A3B8] hover:text-white transition-colors">
                                <Settings size={20} />
                            </button>
                            <Link href="/dashboard" className="p-2 text-[#94A3B8] hover:text-red-500 transition-colors">
                                <LogOut size={20} />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-[1600px] mx-auto px-8 py-12 flex-1 w-full relative z-10">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="glass-panel p-8 neon-border bg-gradient-to-br from-[#0A1020] to-transparent group hover:border-[#00E5FF]/40 transition-all">
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 glass-panel border-[rgba(0,229,255,0.1)] text-[#00E5FF] group-hover:scale-110 transition-transform">
                                    {stat.icon}
                                </div>
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-1 rounded">
                                    {stat.trend}
                                </span>
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] mb-1">{stat.label}</p>
                            <p className="text-4xl font-black text-white">{stat.value}</p>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Module Management */}
                    <div className="lg:col-span-8 space-y-12">
                        <section>
                            <div className="flex items-center justify-between mb-8 px-2">
                                <h2 className="text-2xl font-black tracking-tight uppercase font-space flex items-center gap-3 italic">
                                    <Box className="text-[#00E5FF]" size={24} />
                                    Active Asset Inventory
                                </h2>
                                <button className="btn-primary !py-2 !px-6 text-[10px] !rounded-xl">deploy module</button>
                            </div>
                            <div className="glass-panel neon-border p-2">
                                <ProductList initialProducts={[]} />
                            </div>
                        </section>
                    </div>

                    {/* Acquisition Logs */}
                    <div className="lg:col-span-4">
                        <section>
                            <div className="flex items-center justify-between mb-8 px-2">
                                <h2 className="text-2xl font-black tracking-tight uppercase font-space flex items-center gap-3 italic">
                                    <CreditCard className="text-[#00E5FF]" size={24} />
                                    Acquisition Logs
                                </h2>
                            </div>
                            <div className="glass-panel neon-border p-8">
                                <div className="space-y-8">
                                    {recentPurchases?.map((purchase: any) => (
                                        <div key={purchase.id} className="flex items-center justify-between group">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-full bg-[#070B14] border border-[rgba(0,229,255,0.1)] flex items-center justify-center text-[#94A3B8] group-hover:border-[#00E5FF]/40 group-hover:text-[#00E5FF] transition-all">
                                                    <Users size={18} />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-white uppercase tracking-tight">{purchase.profiles?.username}</p>
                                                    <p className="text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">{purchase.products?.name}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-black text-[#00E5FF]">${purchase.amount}</p>
                                                <p className="text-[9px] text-[#94A3B8] font-bold uppercase tracking-tighter">verified</p>
                                            </div>
                                        </div>
                                    ))}
                                    {!recentPurchases?.length && (
                                        <div className="text-center py-10">
                                            <p className="text-[#94A3B8] text-xs font-bold uppercase tracking-widest opacity-30 italic">No logs detected</p>
                                        </div>
                                    )}
                                </div>
                                <button className="w-full mt-12 py-3 glass-panel border-[rgba(0,229,255,0.1)] text-[#00E5FF] text-[10px] font-black uppercase tracking-widest hover:border-[#00E5FF]/40 transition-all">
                                    View full acquisition history
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </main>

            {/* Static Grid Effect for Admin */}
            <div className="fixed inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(0,229,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,229,255,0.1)_1px,transparent_1px)] bg-[size:100px_100px]" />
        </div>
    );
}
