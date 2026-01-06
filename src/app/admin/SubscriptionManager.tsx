'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Activity, Copy, User, Check } from 'lucide-react'

interface SubscriptionManagerProps {
    subscriptions: any[]
    currentFilter: string
}

export function SubscriptionManager({ subscriptions, currentFilter }: SubscriptionManagerProps) {
    const [copiedId, setCopiedId] = useState<string | null>(null)

    const copyRenewalLink = (userEmail: string, subscriptionId: string) => {
        const renewalLink = `${window.location.origin}/products?ref=${subscriptionId}`
        navigator.clipboard.writeText(renewalLink)
        setCopiedId(subscriptionId)
        setTimeout(() => setCopiedId(null), 2000)
    }

    const filters = [
        { key: 'issues', label: 'Issues', color: 'text-red-400 border-red-500/20' },
        { key: 'all', label: 'All', color: 'text-slate-400 border-slate-500/20' },
        { key: 'active', label: 'Active', color: 'text-emerald-400 border-emerald-500/20' },
        { key: 'grace', label: 'Grace', color: 'text-amber-400 border-amber-500/20' },
        { key: 'expired', label: 'Expired', color: 'text-red-400 border-red-500/20' },
    ]

    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 bg-slate-900/50">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <Activity className="text-blue-500" />
                        <h2 className="text-xl font-bold">Subscription Management</h2>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 flex-wrap">
                    {filters.map((filter) => (
                        <Link
                            key={filter.key}
                            href={`/admin?filter=${filter.key}`}
                            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${currentFilter === filter.key
                                    ? `${filter.color} bg-opacity-10`
                                    : 'text-slate-500 border-slate-700 hover:border-slate-600'
                                }`}
                        >
                            {filter.label}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-500 text-sm bg-slate-950/50">
                            <th className="px-6 py-4">User Email</th>
                            <th className="px-6 py-4">Plan</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Expiration</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {subscriptions.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                    No subscriptions found for this filter.
                                </td>
                            </tr>
                        ) : (
                            subscriptions.map((sub: any) => {
                                const isExpired = sub.status === 'expired' ||
                                    (sub.status === 'active' && new Date(sub.current_period_end) < new Date())

                                return (
                                    <tr key={sub.id} className="hover:bg-slate-800/20 transition-colors">
                                        <td className="px-6 py-4 font-medium">{sub.profiles?.email}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded text-xs font-bold">
                                                {sub.plans?.name}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold ${sub.status === 'active' && !isExpired
                                                    ? 'bg-emerald-500/10 text-emerald-500'
                                                    : sub.status === 'grace'
                                                        ? 'bg-amber-500/10 text-amber-500'
                                                        : 'bg-red-500/10 text-red-500'
                                                }`}>
                                                {sub.status?.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-400 text-sm">
                                            {new Date(sub.current_period_end).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => copyRenewalLink(sub.profiles?.email, sub.id)}
                                                    className="p-2 hover:bg-blue-500/10 text-blue-400 rounded-lg transition-colors"
                                                    title="Copy renewal link"
                                                >
                                                    {copiedId === sub.id ? <Check size={18} /> : <Copy size={18} />}
                                                </button>
                                                <Link
                                                    href={`/admin/users/${sub.user_id}`}
                                                    className="p-2 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors"
                                                    title="View user profile"
                                                >
                                                    <User size={18} />
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
