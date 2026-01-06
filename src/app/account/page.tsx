import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Mail, Shield, ArrowLeft, Zap } from "lucide-react";

export default async function AccountPage() {
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
        <div className="min-h-screen bg-[#020617] text-[#E5E7EB] flex flex-col">
            {/* Header / Nav */}
            <header className="border-b border-[#1E293B] bg-[#0B1220]/80 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/dashboard" className="flex items-center gap-2 group transition-all">
                        <div className="w-9 h-9 bg-gradient-to-br from-[#3B82F6] to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                            <Zap size={20} className="text-white fill-current" />
                        </div>
                        <span className="font-black text-xl tracking-tight uppercase">Auto Step</span>
                    </Link>
                    <Link
                        href="/dashboard"
                        className="text-xs font-black uppercase tracking-widest text-[#94A3B8] hover:text-white transition-colors flex items-center gap-2"
                    >
                        <ArrowLeft size={14} />
                        Return to Dashboard
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-1">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Security & Settings</h1>
                    <p className="text-[#94A3B8] text-lg">Manage your identity and account preferences.</p>
                </div>

                <div className="space-y-8">
                    {/* User Profile Card */}
                    <div className="premium-surface overflow-hidden">
                        <div className="px-8 py-6 bg-gradient-to-r from-[#0B1220] to-[#0F172A] border-b border-[#1E293B] flex items-center gap-3">
                            <User className="text-blue-500" size={20} />
                            <h2 className="text-sm font-black uppercase tracking-[0.2em]">Profile Identity</h2>
                        </div>

                        <div className="p-8 space-y-12">
                            <div className="grid md:grid-cols-2 gap-12">
                                <div>
                                    <h3 className="text-[#94A3B8] text-[10px] font-black mb-2 uppercase tracking-[0.2em]">Username</h3>
                                    <p className="text-2xl font-black text-white">{profile?.username || 'Not set'}</p>
                                    <p className="text-xs text-[#94A3B8] mt-2 italic">Standardized identity • Non-editable</p>
                                </div>

                                <div>
                                    <h3 className="text-[#94A3B8] text-[10px] font-black mb-2 uppercase tracking-[0.2em]">Access Role</h3>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className={`px-4 py-1.5 rounded-xl text-[10px] font-black tracking-widest border uppercase ${profile?.role === 'admin'
                                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                            : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                            }`}>
                                            {profile?.role || 'USER'}
                                        </span>
                                        {profile?.role === 'admin' && <Shield size={16} className="text-amber-500" />}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-10 border-t border-[#1E293B]">
                                <h3 className="text-[#94A3B8] text-[10px] font-black mb-2 uppercase tracking-[0.2em]">Authentication Email</h3>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-[#020617] rounded-lg border border-[#1E293B]">
                                        <Mail size={16} className="text-blue-500" />
                                    </div>
                                    <p className="text-lg font-bold text-slate-300">{user.email}</p>
                                </div>
                                <p className="text-xs text-[#94A3B8] mt-3 leading-relaxed">
                                    Your email is the primary key for your automation assets. <br />
                                    For security reasons, email changes must be handled by support.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Support Box */}
                    <div className="premium-card p-8 flex flex-col md:flex-row items-center justify-between gap-6 border-blue-500/10 bg-blue-500/5">
                        <div className="text-center md:text-left">
                            <p className="text-[#E5E7EB] font-black tracking-tight mb-1 uppercase">Support & Assistance</p>
                            <p className="text-[#94A3B8] text-sm">Need help with your account or assigned assets?</p>
                        </div>
                        <Link
                            href="mailto:support@autostep.app"
                            className="btn-secondary px-8 py-3 !rounded-xl"
                        >
                            Open Ticket
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
