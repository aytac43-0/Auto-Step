import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "../auth/actions";
import Link from "next/link";
import { AutomationsList } from "./AutomationsList";
import { UserSettings } from "./UserSettings";
import { SubscriptionCard } from "./SubscriptionCard";
import { MyProducts } from "./MyProducts";
import { SubscriptionBadge } from "./SubscriptionBadge";
import { Activity, Zap, Shield } from "lucide-react";

export default async function DashboardPage() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // Fetch real data
    const [profileResponse, automationsResponse, subResponse, plansResponse, purchasesResponse] = await Promise.all([
        supabase.from("profiles").select("*").eq("user_id", user.id).single(),
        supabase.from("automations").select("*").eq("user_id", user.id).order('created_at', { ascending: false }),
        supabase.from("subscriptions").select("*, plans(*)").eq("user_id", user.id).single(),
        supabase.from("plans").select("*").eq("active", true).order("price", { ascending: true }),
        supabase.from("purchases").select("*, products(id, name, description, price)").eq("user_id", user.id)
    ]);

    const profile = profileResponse.data;
    const automations = automationsResponse.data || [];
    const subscription = subResponse.data;
    const plans = plansResponse.data || [];
    const purchases = purchasesResponse.data || [];

    const metrics = {
        total: automations.length,
        lastActivity: automations.length > 0 ? new Date(automations[0].created_at).toLocaleString() : 'Never'
    };

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/dashboard" className="flex items-center gap-2 group transition-all">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-xl">Auto Step</span>
                    </Link>
                    <div className="flex items-center gap-6">
                        {profile?.role === "admin" && (
                            <Link
                                href="/admin"
                                className="flex items-center gap-2 text-sm text-amber-500 hover:text-amber-400 transition-colors"
                            >
                                <Shield size={16} />
                                Admin Panel
                            </Link>
                        )}
                        <form action={logout}>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors"
                            >
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold mb-2">Hello, {profile?.username || 'User'}!</h1>
                    <p className="text-slate-400">Welcome back to your automation hub.</p>
                </div>

                {/* Metrics Grid */}
                <div className="grid md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Zap size={120} className="text-blue-500" />
                        </div>
                        <p className="text-slate-500 text-sm font-medium mb-1 flex items-center gap-2">
                            <Zap size={16} className="text-blue-500" />
                            Total Automations
                        </p>
                        <p className="text-5xl font-bold">{metrics.total}</p>
                    </div>
                    <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <Activity size={120} className="text-emerald-500" />
                        </div>
                        <p className="text-slate-500 text-sm font-medium mb-1 flex items-center gap-2">
                            <Activity size={16} className="text-emerald-500" />
                            Last Activity
                        </p>
                        <p className="text-2xl font-bold mt-4">{metrics.lastActivity}</p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-12">
                        <AutomationsList initialAutomations={automations} isAdmin={profile?.role === 'admin'} />
                        <MyProducts purchases={purchases} />
                        <SubscriptionCard subscription={subscription} plans={plans} />
                    </div>
                    <div className="space-y-12">
                        <SubscriptionBadge subscription={subscription} />
                        <UserSettings profile={profile} />
                    </div>
                </div>
            </main>
        </div>
    );
}
