'use client'

import { useState } from 'react'
import { getPaytrToken } from '../products/paytr-actions'
import { Calendar, CreditCard, Loader2, Sparkles } from 'lucide-react'

export function SubscriptionCard({ subscription, plans }: { subscription: any, plans: any[] }) {
    const [loading, setLoading] = useState<string | null>(null)

    const handleRenew = async (plan: any) => {
        setLoading(plan.id)
        try {
            const result = await getPaytrToken(null, plan.name, plan.price, plan.id)
            if (result.success && result.paytr_params) {
                const form = document.createElement('form')
                form.method = 'POST'
                form.action = 'https://www.paytr.com/odeme'
                Object.entries(result.paytr_params).forEach(([key, value]) => {
                    const input = document.createElement('input')
                    input.type = 'hidden'
                    input.name = key
                    input.value = value as string
                    form.appendChild(input)
                })
                document.body.appendChild(form)
                form.submit()
            }
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(null)
        }
    }

    const isActive = subscription && subscription.status === 'active' && new Date(subscription.current_period_end) > new Date()

    return (
        <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Subscription</h2>
                {isActive && (
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-full text-xs font-bold border border-emerald-500/20 flex items-center gap-1">
                        <Sparkles size={12} />
                        ACTIVE
                    </span>
                )}
            </div>

            {subscription ? (
                <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
                        <div>
                            <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Current Plan</p>
                            <h3 className="text-xl font-bold">{subscription.plans?.name || 'Standard'}</h3>
                        </div>
                        <div className="text-right">
                            <p className="text-slate-500 text-xs uppercase font-bold tracking-wider">Expires On</p>
                            <p className="font-mono">{new Date(subscription.current_period_end).toLocaleDateString()}</p>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <p className="text-sm text-slate-400 mb-2">Want to extend or upgrade?</p>
                        {plans.map(plan => (
                            <button
                                key={plan.id}
                                onClick={() => handleRenew(plan)}
                                disabled={!!loading}
                                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-xl hover:border-slate-600 transition-all flex items-center justify-between group disabled:opacity-50"
                            >
                                <div className="text-left">
                                    <p className="font-bold group-hover:text-blue-400 transition-colors">{plan.name}</p>
                                    <p className="text-xs text-slate-500">${plan.price} / month</p>
                                </div>
                                {loading === plan.id ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} className="text-slate-500 group-hover:text-white" />}
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-8">
                    <p className="text-slate-500 mb-6">You don't have an active subscription.</p>
                    <div className="grid gap-4">
                        {plans.map(plan => (
                            <button
                                key={plan.id}
                                onClick={() => handleRenew(plan)}
                                disabled={!!loading}
                                className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading === plan.id ? <Loader2 size={20} className="animate-spin" /> : <Sparkles size={18} />}
                                Subscribe to {plan.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
