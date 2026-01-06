import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { User, Mail, Shield, ArrowLeft, Zap, ShieldCheck } from "lucide-react";

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

    const identityInfo = [
        { label: "Operator Handle", value: profile?.username || "Not Registered", icon: <User className="text-[#00E5FF]" size={20} /> },
        { label: "Deployment Email", value: user.email, icon: <Mail className="text-[#00E5FF]" size={20} /> },
        { label: "Security Authorization", value: profile?.role?.toUpperCase() || "USER", icon: <Shield className="text-[#00E5FF]" size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-[#070B14] text-[#E6F1FF] flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-[#00E5FF]/5 blur-[120px]" />
                <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-blue-600/5 blur-[120px]" />
            </div>

            <div className="w-full max-w-2xl relative z-10">
                <div className="text-center mb-12">
                    <Link href="/dashboard" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-[#94A3B8] hover:text-[#00E5FF] transition-colors group mb-8">
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Return to Console
                    </Link>
                    <div className="w-16 h-16 bg-[#00E5FF] rounded-2xl flex items-center justify-center shadow-[0_0_30px_rgba(0,229,255,0.3)] mx-auto mb-8">
                        <Zap size={32} className="text-[#070B14] fill-current" />
                    </div>
                    <h1 className="text-4xl font-black tracking-tighter font-space uppercase italic">Operator Identity</h1>
                    <p className="text-[#94A3B8] font-medium mt-2">Verified credentials for Auto Step Marketplace.</p>
                </div>

                <div className="glass-panel p-10 neon-border shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-6 opacity-20">
                        <ShieldCheck size={80} className="text-[#00E5FF]" />
                    </div>

                    <div className="space-y-12 relative z-10">
                        {identityInfo.map((info, idx) => (
                            <div key={idx} className="flex items-start gap-6 group">
                                <div className="p-4 glass-panel border-[rgba(0,229,255,0.1)] group-hover:border-[#00E5FF]/40 transition-all shadow-inner">
                                    {info.icon}
                                </div>
                                <div className="flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#94A3B8] mb-1">{info.label}</p>
                                    <p className="text-2xl font-black text-white group-hover:text-[#00E5FF] transition-colors">{info.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 pt-10 border-t border-[rgba(0,229,255,0.1)]">
                        <div className="p-6 glass-panel border-[rgba(0,229,255,0.1)] bg-[#070B14]/40 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div>
                                <p className="text-[#E6F1FF] font-black tracking-tight uppercase">Need to update data?</p>
                                <p className="text-[#94A3B8] text-sm mt-1">Contact system architects for credential modifications.</p>
                            </div>
                            <Link href="mailto:support@autostep.io" className="btn-secondary px-8 py-3 !rounded-xl text-[10px]">
                                Open Support Tunnel
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center text-[10px] font-black uppercase tracking-[0.5em] text-[#94A3B8]/20 flex items-center justify-center gap-3">
                    <div className="w-12 h-px bg-white/5" />
                    AUTHENTICATED OPERATOR IDENTITY
                    <div className="w-12 h-px bg-white/5" />
                </div>
            </div>
        </div>
    );
}
