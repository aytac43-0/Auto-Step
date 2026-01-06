'use client';

import { useState, useEffect } from 'react';
import { Power, Activity, Settings, Trash2, Cpu, ArrowUpRight, ShieldAlert } from 'lucide-react';

export function AutomationsList({ initialAutomations, isAdmin }: { initialAutomations: any[], isAdmin: boolean }) {
    const [automations, setAutomations] = useState(initialAutomations);

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-[rgba(0,229,255,0.1)]">
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#94A3B8]">Automation Module</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#94A3B8]">Operational Status</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#94A3B8]">Identification</th>
                        <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-[#94A3B8] text-right">Command</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.03)] font-medium">
                    {automations.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="px-8 py-20 text-center">
                                <p className="text-[#94A3B8] font-bold uppercase tracking-[0.2em] italic">No active assets detected.</p>
                                <p className="text-[#94A3B8]/40 text-xs mt-2">Initialize modules via the Marketplace.</p>
                            </td>
                        </tr>
                    ) : (
                        automations.map((auto) => (
                            <tr key={auto.id} className="group hover:bg-[rgba(0,229,255,0.02)] transition-colors">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[#0A1020] border border-[rgba(0,229,255,0.1)] flex items-center justify-center text-[#00E5FF] group-hover:border-[#00E5FF]/40 transition-all shadow-inner">
                                            <Cpu size={20} />
                                        </div>
                                        <div>
                                            <p className="text-white font-black uppercase tracking-tight text-sm group-hover:text-[#00E5FF] transition-colors">{auto.name || "UNNAMED_MODULE"}</p>
                                            <p className="text-[10px] text-[#94A3B8] font-bold">SYSLOG: Verified</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className={`w-1.5 h-1.5 rounded-full ${auto.is_active ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]' : 'bg-[#94A3B8] opacity-30 shadow-none'}`} />
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${auto.is_active ? 'text-emerald-500' : 'text-[#94A3B8]/50'}`}>
                                            {auto.is_active ? 'Online' : 'Hibernating'}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <code className="text-[10px] font-mono font-bold text-[#00E5FF]/60 bg-[#00E5FF]/5 px-2 py-1 rounded border border-[#00E5FF]/10">
                                        {auto.id.split('-')[0].toUpperCase()}
                                    </code>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-3 opacity-40 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2.5 glass-panel border-[rgba(0,229,255,0.15)] text-[#94A3B8] hover:text-[#00E5FF] hover:border-[#00E5FF]/40 transition-all">
                                            <Settings size={16} />
                                        </button>
                                        <button
                                            onClick={() => window.open(auto.products?.access_url || '#', '_blank')}
                                            className="p-2.5 glass-panel border-[rgba(0,229,255,0.15)] text-[#00E5FF] hover:scale-110 transition-all shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                                        >
                                            <ArrowUpRight size={16} />
                                        </button>
                                        {isAdmin && (
                                            <button className="p-2.5 glass-panel border-[rgba(239,68,68,0.15)] text-red-500/60 hover:text-red-500 hover:bg-red-500/10 transition-all">
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}
