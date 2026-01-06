import Link from "next/link";
import { Shield } from "lucide-react";
import { createClient } from "@/utils/supabase/server";
import { UserNav } from "./UserNav";

export async function Header() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let profile = null;
    if (user) {
        const { data } = await supabase
            .from("profiles")
            .select("username, role")
            .eq("user_id", user.id)
            .single();
        profile = data;
    }

    return (
        <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#0A0F1A]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/30 transition-all">
                        <Shield size={18} />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white uppercase font-sans">AUTO STEP</span>
                </Link>

                <UserNav user={user} profile={profile} />
            </div>
        </nav>
    );
}
