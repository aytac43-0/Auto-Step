import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { logout } from "../auth/actions";
import Link from "next/link";

export default async function DashboardPage() {
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

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg" />
                        <span className="font-bold text-xl">Auto Step</span>
                    </div>
                    <div className="flex items-center gap-4">
                        {profile?.role === "admin" && (
                            <Link
                                href="/admin"
                                className="text-sm text-slate-400 hover:text-white transition-colors"
                            >
                                Admin Panel
                            </Link>
                        )}
                        <form action={logout}>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors"
                            >
                                Logout
                            </button>
                        </form>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-8">
                    <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl">
                        <h1 className="text-3xl font-bold mb-6">User Dashboard</h1>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
                                <p className="text-slate-500 text-sm mb-1">Email Address</p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                            <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/50">
                                <p className="text-slate-500 text-sm mb-1">Account Status</p>
                                <p className="font-medium flex items-center gap-2">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full" />
                                    Active ({profile?.role || "user"})
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl hover:border-blue-500/30 transition-colors">
                            <h3 className="font-bold mb-2">My Automations</h3>
                            <p className="text-slate-400 text-sm">Manage your active automation sequences.</p>
                        </div>
                        <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl hover:border-emerald-500/30 transition-colors">
                            <h3 className="font-bold mb-2">Usage Metrics</h3>
                            <p className="text-slate-400 text-sm">Monitor your automation performance stats.</p>
                        </div>
                        <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl hover:border-purple-500/30 transition-colors">
                            <h3 className="font-bold mb-2">Settings</h3>
                            <p className="text-slate-400 text-sm">Configure your account and API keys.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
