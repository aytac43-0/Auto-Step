'use client'

import { AlertTriangle, Clock } from 'lucide-react'

export function PaymentIssuesPanel({ graceSubscriptions }: { graceSubscriptions: any[] }) {
    if (graceSubscriptions.length === 0) return null;

    return (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-amber-500/20 flex justify-between items-center bg-amber-500/5">
                <div className="flex items-center gap-2">
                    <AlertTriangle className="text-amber-500" />
                    <h2 className="text-xl font-bold">Payment Issues</h2>
                </div>
                <span className="px-3 py-1 bg-amber-500/20 text-amber-400 rounded-full text-xs font-bold">
                    {graceSubscriptions.length} ACTIVE
                </span>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-500 text-sm bg-slate-950/50">
                            <th className="px-6 py-4">User Email</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">Grace Started</th>
                            <th className="px-6 py-4 text-right">Days Remaining</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-500/10">
                        {graceSubscriptions.map((sub: any) => {
                            const graceStarted = new Date(sub.grace_started_at);
                            const daysSinceGrace = Math.floor((Date.now() - graceStarted.getTime()) / (1000 * 60 * 60 * 24));
                            const daysRemaining = Math.max(0, 3 - daysSinceGrace);

                            return (
                                <tr key={sub.id} className="hover:bg-amber-500/5 transition-colors">
                                    <td className="px-6 py-4 font-medium">{sub.profiles?.email}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-bold">
                                            {sub.plans?.name}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-slate-400 text-sm">
                                        {graceStarted.toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center justify-end gap-1 ${daysRemaining === 0 ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                                            }`}>
                                            <Clock size={14} />
                                            {daysRemaining} days
                                        </span>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
