import { createClient } from "@/utils/supabase/server";
import {
    Mail,
    User,
    ShieldCheck,
    LogOut,
    ChevronRight,
    Briefcase,
    Globe,
    ExternalLink
} from "lucide-react";
import Link from "next/link";
import { logout } from "../auth/actions";
import { redirect } from "next/navigation";

export default async function AccountPage() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) return redirect("/login");

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-cyan-400">
                        <User size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1">Partner Identity</h1>
                        <p className="text-gray-400 font-medium italic">Verified Operator ID: {user.id.split('-')[0].toUpperCase()}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Identity Cards */}
                    <div className="space-y-6">
                        <div className="bg-[#111827] border border-white/5 p-8 rounded-2xl shadow-xl">
                            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <Briefcase size={14} className="text-cyan-400" />
                                Official Credentials
                            </h2>

                            <div className="space-y-8">
                                <div className="group">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Display Name</p>
                                    <p className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{profile?.username || 'N/A'}</p>
                                </div>

                                <div className="group">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Registered Email</p>
                                    <div className="flex items-center gap-3">
                                        <Mail size={16} className="text-gray-500" />
                                        <p className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{user.email}</p>
                                    </div>
                                </div>

                                <div className="group">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">System Role</p>
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck size={16} className="text-emerald-500" />
                                        <p className="text-lg font-bold text-white uppercase tracking-tight">{profile?.role || 'Partner'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-[#111827] border border-white/5 p-6 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-red-500/5 hover:border-red-500/20 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-white/5 text-gray-400 group-hover:text-red-400 transition-colors">
                                    <LogOut size={20} />
                                </div>
                                <div onClick={logout}>
                                    <p className="font-bold text-white group-hover:text-red-400 transition-colors">Secure Logout</p>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Terminate Transmission</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-800 group-hover:text-red-400 transition-colors" />
                        </div>
                    </div>

                    {/* Support / Help */}
                    <div className="bg-[#111827] border border-white/5 p-8 rounded-2xl flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-cyan-500/5 border border-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 mb-8">
                            <Globe size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 italic tracking-tight">Support Architecture</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-10">
                            Need a custom automation module or architectural support? Our lead system designers are available to help optimize your operations.
                        </p>
                        <Link href="mailto:support@autostep.md" className="btn-secondary w-full py-4 flex items-center justify-center gap-3">
                            Contact Lead Designer
                            <ExternalLink size={16} />
                        </Link>

                        <div className="mt-auto pt-10 border-t border-white/5 w-full">
                            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                <ShieldCheck size={12} className="text-emerald-500" />
                                Tier-3 Protocol Security
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <Link href="/dashboard" className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors group">
                        <ChevronRight size={14} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                        Return to Systems Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
