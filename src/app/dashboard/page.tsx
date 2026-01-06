import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "../auth/actions";
import Link from "next/link";
import { AutomationsList } from "./AutomationsList";
import { Activity, Zap, Shield, LogOut, User, ShoppingBag, Search, ArrowRight } from "lucide-react";

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
        lastActivity: automations.length > 0 ? new Date(automations[0].created_at).toLocaleString() : 'Never'
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#020617] text-[#E5E7EB]">
            {/* Header v2 */}
            <nav className="border-b border-[#1E293B] bg-[#0B1220]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/dashboard" className="flex items-center gap-2 group transition-all">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#3B82F6] to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            <Zap size={20} className="text-white fill-current" />
                        </div>
                        <span className="font-black text-xl tracking-tight">AUTO STEP</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#0F172A] border border-[#1E293B] rounded-full text-xs font-bold text-[#94A3B8]">
                            <User size={14} className="text-blue-500" />
                            <span>{profile?.username}</span>
                        </div>

                        <div className="flex items-center gap-3">
                            {profile?.role === "admin" && (
                                <Link
                                    href="/admin"
                                    className="p-2 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 rounded-xl transition-all border border-amber-500/20"
                                    title="Admin Console"
                                >
                                    <Shield size={20} />
                                </Link>
                            )}
                            <form action={logout}>
                                <button
                                    type="submit"
                                    className="p-2 text-[#94A3B8] hover:text-white hover:bg-red-500/10 rounded-xl transition-all group"
                                    title="Logout"
                                >
                                    <LogOut size={20} className="group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                {/* Greeting Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-black mb-3">Hello, {profile?.username || 'User'}!</h1>
                        <p className="text-[#94A3B8] text-lg">Manage your premium automation assets from one place.</p>
                    </div>

                    <Link
                        href="/products"
                        className="btn-primary flex items-center gap-3 group"
                    >
                        <ShoppingBag size={20} />
                        Browse Marketplace
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="grid lg:grid-cols-12 gap-12">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8 space-y-12">
                        <div className="premium-surface p-1">
                            <AutomationsList initialAutomations={automations} isAdmin={profile?.role === 'admin'} />
                        </div>
                    </div>

                    {/* Sidebar / Info */}
                    <div className="lg:col-span-4 space-y-8">
                        <div className="premium-card p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <Activity size={24} className="text-blue-500" />
                                <h2 className="font-bold text-lg">Activity Metrics</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-[#94A3B8] text-sm mb-1 uppercase tracking-widest font-bold">Active Assets</p>
                                    <p className="text-4xl font-black text-white">{metrics.total}</p>
                                </div>
                                <div className="pt-6 border-t border-[#1E293B]">
                                    <p className="text-[#94A3B8] text-sm mb-1 uppercase tracking-widest font-bold">Last Sync</p>
                                    <p className="text-sm font-mono text-blue-400">{metrics.lastActivity}</p>
                                </div>
                            </div>
                        </div>

                        <div className="premium-surface p-8 bg-gradient-to-br from-[#0B1220] to-[#020617]">
                            <h3 className="font-bold mb-4 flex items-center gap-2">
                                <Search size={18} className="text-blue-500" />
                                Find something else?
                            </h3>
                            <p className="text-sm text-[#94A3B8] leading-relaxed mb-6">
                                Looking for a specific automation code? Search our global marketplace to find the perfect fit.
                            </p>
                            <Link href="/products" className="text-sm font-bold text-blue-500 hover:text-blue-400 flex items-center gap-2 group transition-colors">
                                Marketplace Search
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
