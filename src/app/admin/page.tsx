import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

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

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <Link href="/dashboard" className="font-bold text-xl hover:text-blue-400 transition-colors">Auto Step Admin</Link>
                    </div>
                    <Link
                        href="/dashboard"
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm transition-colors"
                    >
                        Exit Admin
                    </Link>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-bold mb-8">System Overview</h1>

                <div className="grid md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-blue-500/10 border border-blue-500/20 p-6 rounded-2xl">
                        <p className="text-blue-400 text-sm font-medium mb-1">Total Users</p>
                        <p className="text-3xl font-bold">1,284</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl">
                        <p className="text-emerald-400 text-sm font-medium mb-1">Active Tasks</p>
                        <p className="text-3xl font-bold">45.2k</p>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 p-6 rounded-2xl">
                        <p className="text-purple-400 text-sm font-medium mb-1">System Load</p>
                        <p className="text-3xl font-bold">12%</p>
                    </div>
                    <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
                        <p className="text-red-400 text-sm font-medium mb-1">Open Issues</p>
                        <p className="text-3xl font-bold">3</p>
                    </div>
                </div>

                <div className="bg-slate-900/30 border border-slate-800 rounded-3xl overflow-hidden">
                    <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                        <h2 className="text-xl font-bold">User Management</h2>
                        <button className="text-sm text-blue-400 hover:underline">View all</button>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-500 text-sm bg-slate-950/50">
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Account</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                <tr>
                                    <td className="px-6 py-4">admin@autostep.io</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs">ADMIN</span></td>
                                    <td className="px-6 py-4 font-mono text-xs">Standard</td>
                                    <td className="px-6 py-4"><button className="text-slate-400 hover:text-white">Edit</button></td>
                                </tr>
                                <tr>
                                    <td className="px-6 py-4">user@example.com</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 bg-slate-500/20 text-slate-400 rounded text-xs">USER</span></td>
                                    <td className="px-6 py-4 font-mono text-xs">Free</td>
                                    <td className="px-6 py-4"><button className="text-slate-400 hover:text-white">Edit</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
