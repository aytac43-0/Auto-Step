'use client';

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    ShoppingBag,
    ShieldAlert,
    Loader2
} from "lucide-react";

export default function DashboardPage() {
    const supabase = createClient();
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);
    const [automations, setAutomations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.replace("/login");
                return;
            }

            // Fetch Profile and Automations in parallel
            const [profileRes, automationsRes] = await Promise.all([
                supabase
                    .from("profiles")
                    .select("*")
                    .eq("user_id", user.id)
                    .single(),
                supabase
                    .from("automations")
                    .select(`
                        *,
                        products (name, access_url)
                    `)
                    .eq("user_id", user.id)
            ]);

            if (profileRes.data) {
                setProfile(profileRes.data);
            }
            if (automationsRes.data) {
                setAutomations(automationsRes.data);
            }

            setLoading(false);
        }

        fetchData();
    }, [supabase, router]);

    if (loading) {
        return <div className="min-h-screen" />;
    }

    if (!profile) return null;

    const username = profile.username || 'User';

    return (
        <div className="min-h-screen flex flex-col pt-20">
            {/* Sub-Nav / Breadcrumbs */}
            <div className="w-full border-b border-white/5 py-4 bg-[#0A0F1A]">
                <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-sm">
                    <div className="flex items-center gap-2 text-gray-400 font-medium tracking-tight">
                        <Layers size={16} />
                        <span>Dashboard</span>
                        <span className="opacity-20">/</span>
                        <span className="text-white">Active Systems</span>
                    </div>
                    <div className="flex items-center gap-6">
                        {profile?.role === 'admin' && (
                            <Link href="/dashboard/admin" className="flex items-center gap-2 text-emerald-500 hover:text-emerald-400 transition-colors font-bold uppercase tracking-tighter text-xs">
                                <ShieldAlert size={16} />
                                Admin Panel
                            </Link>
                        )}
                        <Link href="/account" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <UserCircle size={18} />
                            <span className="text-xs font-bold uppercase tracking-wider">{username}</span>
                        </Link>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-6 py-12 w-full">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2 leading-tight font-tight tracking-tight">
                            Hello, <span className="text-cyan-400">{username}</span>
                        </h1>
                        <p className="text-gray-400 max-w-lg font-medium">Manage and monitor the automation modules currently active within your environment.</p>
                    </div>
                    <Link href="/products" className="btn-primary flex items-center gap-2 px-8">
                        <Plus size={20} />
                        Deploy New System
                    </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div className="bg-[#111827] border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all">
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Active Modules</p>
                            <h3 className="text-3xl font-bold text-white mb-1 tracking-tight">0 Units</h3>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Ready for deployment</p>
                        </div>
                        <Layers className="absolute right-[-10px] bottom-[-10px] text-white/5 scale-150 group-hover:text-cyan-400/10 transition-colors" size={100} />
                    </div>
                    <div className="bg-[#111827] border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all">
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">System Status</p>
                            <div className="flex items-center gap-2 mb-1">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.3)]" />
                                <h3 className="text-3xl font-bold text-white tracking-tight text-emerald-500">Operational</h3>
                            </div>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Global Status: Active</p>
                        </div>
                        <Activity className="absolute right-[-10px] bottom-[-10px] text-white/5 scale-150 group-hover:text-cyan-400/10 transition-colors" size={100} />
                    </div>
                    <div className="bg-[#111827] border border-white/5 p-8 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all">
                        <div className="relative z-10">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">Access Tier</p>
                            <h3 className="text-3xl font-bold text-white mb-1 tracking-tight italic">Standard</h3>
                            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest">Verified User</p>
                        </div>
                        <ShieldCheck className="absolute right-[-10px] bottom-[-10px] text-white/5 scale-150 group-hover:text-cyan-400/10 transition-colors" size={100} />
                    </div>
                </div>

                {/* Automation List Section */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                        <h2 className="text-2xl font-bold text-white font-tight">System Inventory</h2>
                        <div className="flex items-center gap-2 text-gray-500">
                            <Search size={16} />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Filter active systems</span>
                        </div>
                    </div>

                    <AutomationsList userId={profile.user_id} initialAutomations={automations} />
                </div>

                {/* Marketplace Invitation */}
                <div className="mt-20 p-12 bg-gradient-to-r from-blue-900/10 to-transparent border border-white/5 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-xl text-center md:text-left">
                        <h3 className="text-2xl font-bold text-white mb-4 font-tight">Expand your automation network.</h3>
                        <p className="text-gray-400 text-sm leading-relaxed font-medium">Our studio has released new pre-vetted systems designed for enterprise scaling. View the latest catalog to optimize your operations.</p>
                    </div>
                    <Link href="/products" className="btn-primary whitespace-nowrap px-10 flex items-center gap-2 group text-sm h-14">
                        <ShoppingBag size={18} />
                        Systems Catalog
                        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </main>
        </div>
    );
}
