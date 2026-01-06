'use client';

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import {
    Mail,
    User,
    ShieldCheck,
    LogOut,
    ChevronRight,
    Briefcase,
    Globe,
    ExternalLink,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AccountPage() {
    const supabase = createClient();
    const router = useRouter();
    const [user, setUser] = useState<any>(null);
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadIdentity() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.replace('/login');
                return;
            }
            setUser(user);

            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("user_id", user.id)
                .single();
            setProfile(profile);
            setLoading(false);
        }
        loadIdentity();
    }, []);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace('/');
        router.refresh();
    };

    if (loading) return null;

    return (
        <div className="min-h-screen pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center gap-4 mb-12">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-cyan-400">
                        <User size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-1 font-tight">User Identity</h1>
                        <p className="text-gray-400 text-sm font-medium">Verified System UID: {user.id.split('-')[0].toUpperCase()}</p>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Identity Cards */}
                    <div className="space-y-6">
                        <div className="bg-[#111827] border border-white/5 p-8 rounded-2xl shadow-xl">
                            <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-8 flex items-center gap-2">
                                <Briefcase size={14} className="text-cyan-400" />
                                Credentials & Access
                            </h2>

                            <div className="space-y-8">
                                <div className="group">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Display Name</p>
                                    <p className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{profile?.username || 'N/A'}</p>
                                </div>

                                <div className="group">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Business Email</p>
                                    <div className="flex items-center gap-3">
                                        <Mail size={16} className="text-gray-500" />
                                        <p className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">{user.email}</p>
                                    </div>
                                </div>

                                <div className="group">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Access Level</p>
                                    <div className="flex items-center gap-3">
                                        <ShieldCheck size={16} className="text-emerald-500" />
                                        <p className="text-lg font-bold text-white uppercase tracking-tight font-tight italic">{profile?.role || 'User'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="w-full bg-[#111827] border border-white/5 p-6 rounded-2xl flex items-center justify-between group hover:bg-red-500/5 hover:border-red-500/20 transition-all text-left"
                        >
                            <div className="flex items-center gap-4">
                                <div className="p-3 rounded-xl bg-white/5 text-gray-400 group-hover:text-red-400 transition-colors">
                                    <LogOut size={20} />
                                </div>
                                <div>
                                    <p className="font-bold text-white group-hover:text-red-400 transition-colors">Secure Sign Out</p>
                                    <p className="text-[10px] text-gray-500 uppercase tracking-widest mt-1">Terminate Secure Session</p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-gray-800 group-hover:text-red-400 transition-colors" />
                        </button>
                    </div>

                    {/* Support / Help */}
                    <div className="bg-[#111827] border border-white/5 p-8 rounded-2xl flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-cyan-500/5 border border-cyan-500/10 rounded-full flex items-center justify-center text-cyan-400 mb-8">
                            <Globe size={32} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4 tracking-tight font-tight italic">Support Architecture</h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium">
                            Our team is available to assist with custom automation logic or architectural optimization for your business systems.
                        </p>
                        <div className="w-full space-y-3">
                            <a href="mailto:architect@autostep.io" className="btn-secondary w-full py-3.5 flex items-center justify-center gap-3 text-xs">
                                <Mail size={14} />
                                architect@autostep.io
                            </a>
                            <a href="mailto:support@autostep.io" className="btn-secondary w-full py-3.5 flex items-center justify-center gap-3 text-xs">
                                <Mail size={14} />
                                support@autostep.io
                            </a>
                        </div>

                        <div className="mt-auto pt-10 border-t border-white/5 w-full">
                            <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                <ShieldCheck size={12} className="text-emerald-500" />
                                Verified System User
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 flex justify-center">
                    <Link href="/dashboard" className="text-xs font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2 hover:text-white transition-colors group">
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Return to Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
}
