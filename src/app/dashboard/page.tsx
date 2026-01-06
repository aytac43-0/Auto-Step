import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "../auth/actions";
import Link from "next/link";
import { AutomationsList } from "./AutomationsList";
import { Activity, Zap, Shield, LogOut, User, ShoppingBag, Search, ArrowRight, Grid } from "lucide-react";

export default async function DashboardPage() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const [profileResponse, automationsResponse] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
        supabase.from("automations").select("*").eq("user_id", user.id).order('created_at', { ascending: false }),
    ]);

    const profile = profileResponse.data;
    const automations = automationsResponse.data || [];

    const metrics = {
        total: automations.length,
        uptime: "99.98%",
        status: "OPERATIONAL"
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#070B14] text-[#E6F1FF]">
            {/* Nav v2 */}
            <nav className="relative z-50 px-6 py-6 border-b border-[rgba(0,229,255,0.1)] backdrop-blur-md">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link href="/dashboard" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-[#00E5FF] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)] transition-transform group-hover:scale-110">
                            <Zap size={22} className="text-[#070B14] fill-current" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-[#E6F1FF] uppercase font-space">AUTO STEP</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <Link href="/dashboard" className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#00E5FF]">
                            <Grid size={14} />
                            Console
                        </Link>
                        <Link href="/products" className="hidden lg:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#94A3B8] hover:text-[#00E5FF]">
                            <ShoppingBag size={14} />
                            Marketplace
                        </Link>

                        <div className="h-4 w-px bg-white/10 hidden lg:block" />

                        <div className="flex items-center gap-4">
                            {profile?.role === "admin" && (
                                <Link href="/admin" className="p-2.5 glass-panel neon-border text-amber-500 hover:scale-105 transition-transform">
                                    <Shield size={18} />
                                </Link>
                            )}
                            <Link href="/account" className="p-2.5 glass-panel neon-border text-[#00E5FF] hover:scale-105 transition-transform">
                                <User size={18} />
                            </Link>
                            <form action={logout}>
                                <button type="submit" className="p-2.5 glass-panel neon-border text-red-500 hover:bg-red-500/10 transition-all">
                                    <LogOut size={18} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12 w-full relative z-10">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)] animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">System Ready</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter font-space uppercase">Hello, {profile?.username}</h1>
                        <p className="text-[#94A3B8] text-lg mt-2 font-medium">Command center for your automation assets.</p>
                    </div>

                    <Link href="/products" className="btn-primary flex items-center gap-3 group shadow-[0_0_30px_rgba(0,229,255,0.2)]">
                        Acquire New Assets
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Metrics Bar */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    <div className="glass-panel p-6 neon-border bg-gradient-to-br from-[#0A1020] to-transparent">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] mb-1">Active Assets</p>
                        <p className="text-3xl font-black text-[#00E5FF]">{metrics.total}</p>
                    </div>
                    <div className="glass-panel p-6 neon-border bg-gradient-to-br from-[#0A1020] to-transparent">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] mb-1">System Uptime</p>
                        <p className="text-3xl font-black text-[#E6F1FF]">{metrics.uptime}</p>
                    </div>
                    <div className="glass-panel p-6 neon-border bg-gradient-to-br from-[#0A1020] to-transparent">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] mb-1">Security Rank</p>
                        <p className="text-3xl font-black text-[#E6F1FF]">Elite</p>
                    </div>
                    <div className="glass-panel p-6 neon-border bg-gradient-to-br from-[#0A1020] to-transparent">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#94A3B8] mb-1">Auth Level</p>
                        <p className="text-2xl font-black text-emerald-500">{metrics.status}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-12">
                        <div className="flex items-center justify-between mb-8 px-2">
                            <h2 className="text-2xl font-black tracking-tight uppercase font-space flex items-center gap-3">
                                <Activity className="text-[#00E5FF]" size={24} />
                                Asset Management
                            </h2>
                        </div>
                        <div className="glass-panel p-2 neon-border">
                            <AutomationsList initialAutomations={automations} isAdmin={profile?.role === 'admin'} />
                        </div>
                    </div>
                </div>

                {/* Marketplace Invitation */}
                <div className="mt-20 glass-panel p-10 neon-border flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-r from-[#0A1020] to-transparent overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/5 blur-[80px] rounded-full -mr-32 -mt-32" />

                    <div className="relative z-10 text-center md:text-left">
                        <h3 className="text-3xl font-black mb-2 uppercase font-space italic tracking-tight">Expand Your Network</h3>
                        <p className="text-[#94A3B8] max-w-md">Discover ultra-high performance automation modules in the global marketplace.</p>
                    </div>

                    <Link href="/products" className="btn-secondary px-10 relative z-10 group">
                        Enter Marketplace
                        <ArrowRight size={18} className="inline-block ml-3 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
