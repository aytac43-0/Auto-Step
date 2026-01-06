'use client';

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import {
    ExternalLink,
    Box,
    ShieldCheck,
    ChevronRight,
    Loader2,
    FileCode2
} from "lucide-react";

export function AutomationsList({ userId }: { userId: string }) {
    const supabase = createClient();
    const [automations, setAutomations] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchMyAutomations() {
            const { data } = await supabase
                .from("automations")
                .select(`
                    *,
                    products (name, access_url)
                `)
                .eq("user_id", userId);

            if (data) setAutomations(data);
            setLoading(false);
        }
        fetchMyAutomations();
    }, [userId]);

    if (loading) return (
        <div className="py-24 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-cyan-400/40" size={32} />
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">Accessing System Data...</p>
        </div>
    );

    if (automations.length === 0) return (
        <div className="bg-[#111827] border border-white/5 rounded-2xl p-16 text-center">
            <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-500">
                <Box size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No active systems detected.</h3>
            <p className="text-gray-400 text-sm max-w-sm mx-auto mb-8">You haven&apos;t deployed any automation modules yet. Visit the catalog to get started.</p>
        </div>
    );

    return (
        <div className="grid gap-4">
            {automations.map((automation) => (
                <div
                    key={automation.id}
                    className="bg-[#111827] border border-white/5 rounded-2xl p-6 hover:bg-[#161D2C] transition-all group lg:flex items-center justify-between"
                >
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/20 transition-colors">
                            <Box size={24} />
                        </div>
                        <div>
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-lg font-bold text-white">{automation.products?.name}</h3>
                                <div className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-bold uppercase tracking-widest border border-emerald-500/10">
                                    Operational
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 italic">
                                <span>Ref: {automation.id.split('-')[0].toUpperCase()}</span>
                                <span className="opacity-20">•</span>
                                <span className="flex items-center gap-1">
                                    <ShieldCheck size={12} className="text-cyan-400" />
                                    Studio Verified
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 lg:mt-0 flex items-center gap-4">
                        <div className="hidden sm:flex flex-col items-end px-6 border-r border-white/5">
                            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Last Transmission</p>
                            <p className="text-sm font-bold text-white">Active Now</p>
                        </div>
                        <a
                            href={automation.products?.access_url}
                            target="_blank"
                            className="btn-secondary !py-2.5 !px-5 text-sm flex items-center gap-2 group/btn"
                        >
                            <ExternalLink size={16} className="text-gray-500 group-hover/btn:text-cyan-400" />
                            Access Module
                        </a>
                    </div>
                </div>
            ))}
        </div>
    );
}
