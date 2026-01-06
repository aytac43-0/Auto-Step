import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { AutomationsList } from "./AutomationsList";
import Link from "next/link";
import {
    Activity,
    Layers,
    ShieldCheck,
    ArrowRight,
    Plus,
    Search,
    UserCircle,
    ShoppingBag
} from "lucide-react";

export default async function DashboardPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("user_id", user.id)
        .single();

    return (
        <div className="min-h-screen flex flex-col pt-20">
            {/* Sub-Nav / Breadcrumbs */}
            <div className="w-full border-b border-white/5 py-4">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-400 font-medium tracking-tight">
                        <Layers size={16} />
                        <span>Client Dashboard</span>
                        <span className="opacity-20">/</span>
                        <span className="text-white">Active Systems</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/account" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <UserCircle size={18} />
                            <span className="text-xs font-bold uppercase tracking-wider">{profile?.username || 'Partner'}</span>
                        </Link>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12 w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2 leading-tight">Your Systems</h1>
                        <p className="text-gray-400 max-w-lg">Manage and monitor the automation modules currently active within your business environment.</p>
                    </div>
                    <Link href="/products" className="btn-primary flex items-center gap-2">
                        <Plus size={20} />
                        Deploy New System
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Active Modules</p>
                            <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">0 Units</h3>
                            <p className="text-gray-500 text-xs font-medium">Ready for transmission</p>
                        </div>
                        <Layers className="absolute right-[-10px] bottom-[-10px] text-white/5 scale-150 group-hover:text-cyan-400/10 transition-colors" size={100} />
                    </div>
                    <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">System Status</p>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                <h3 className="text-3xl font-bold text-white tracking-tight">Operational</h3>
                            </div>
                            <p className="text-gray-500 text-xs font-medium">Global uptime 99.9%</p>
                        </div>
                        <Activity className="absolute right-[-10px] bottom-[-10px] text-white/5 scale-150 group-hover:text-cyan-400/10 transition-colors" size={100} />
                    </div>
                    <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Partner Tier</p>
                            <h3 className="text-3xl font-bold text-white mb-1 tracking-tight italic">Standard Access</h3>
                            <p className="text-gray-500 text-xs font-medium">Verified Enterprise Partner</p>
                        </div>
                        <ShieldCheck className="absolute right-[-10px] bottom-[-10px] text-white/5 scale-150 group-hover:text-cyan-400/10 transition-colors" size={100} />
                    </div>
                </div>

                {/* Automation List Section */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <h2 className="text-xl font-bold text-white">System Inventory</h2>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Search size={16} />
                            <span className="text-xs font-medium">Filter systems</span>
                        </div>
                    </div>

                    <AutomationsList userId={user.id} />
                </div>

                {/* Marketplace Invitation */}
                <div className="mt-20 p-12 bg-gradient-to-r from-cyan-900/10 to-transparent border border-cyan-500/10 rounded-[2rem] flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl">
                        <h3 className="text-2xl font-bold text-white mb-4">Expand your automation network.</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">Our studio has released new pre-vetted systems designed for e-commerce scaling and lead generation. View the latest module catalog to optimize your operations.</p>
                    </div>
                    <Link href="/products" className="btn-primary whitespace-nowrap px-10 flex items-center gap-2 group">
                        <ShoppingBag size={18} />
                        Systems Catalog
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
