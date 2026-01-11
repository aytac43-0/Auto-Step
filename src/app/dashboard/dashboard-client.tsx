'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, TrendingUp, ShieldCheck, Zap, ExternalLink } from 'lucide-react'
import Link from 'next/link'

type Purchase = {
    id: string
    created_at: string
    status: string
    product: {
        id: string
        name: string
        description: string
    }
}

export default function DashboardClient() {
    const [profile, setProfile] = useState<any>(null)
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
                setProfile(data)

                // Fetch Purchases
                const { data: purchaseData } = await supabase
                    .from('purchases')
                    .select(`
                        id, created_at, status,
                        product:products (id, name, description)
                    `)
                    .eq('user_id', user.id)
                    .eq('status', 'paid')

                if (purchaseData) {
                    setPurchases(purchaseData as any)
                }
            }
            setLoading(false)
        }
        fetchProfile()
    }, [])

    if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>

    return (
        <div className="space-y-8">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Your Client Portal</h1>
                    <p className="text-muted-foreground mt-1">Manage and access your automation infrastructure.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-500/10 text-green-500 text-xs font-medium rounded-full border border-green-500/20">
                    <ShieldCheck className="w-3 h-3" />
                    Secure Session Active
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Active Solutions</p>
                            <h3 className="text-2xl font-bold text-white">{purchases.length}</h3>
                        </div>
                    </div>
                </div>
                {/* Placeholders for future metrics */}
                <div className="glass-card p-6 rounded-xl opacity-60">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-surface rounded-lg text-muted-foreground">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Uptime</p>
                            <h3 className="text-2xl font-bold text-white">99.9%</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    My Automations
                </h2>

                {purchases.length > 0 ? (
                    <div className="grid gap-4">
                        {purchases.map((p) => (
                            <div key={p.id} className="glass-card p-6 rounded-xl flex items-center justify-between hover:border-primary/20 transition-all group">
                                <div>
                                    <h3 className="font-bold text-lg text-white">{p.product.name}</h3>
                                    <p className="text-muted-foreground text-sm">{p.product.description}</p>
                                    <div className="mt-2 text-xs text-green-500 font-medium bg-green-500/10 inline-block px-2 py-0.5 rounded">Active</div>
                                </div>
                                <a
                                    href={`/api/access/${p.product.id}`}
                                    target="_blank"
                                    className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
                                >
                                    Access Portal
                                    <ExternalLink className="w-4 h-4" />
                                </a>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="glass-card rounded-xl p-12 border border-white/5 text-center">
                        <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4 text-muted-foreground">
                            <ShieldCheck className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No Active Solutions</h3>
                        <p className="text-muted-foreground max-w-sm mx-auto mb-6">
                            You currently do not have any active automation subscriptions. Browse the marketplace to get started.
                        </p>
                        <Link href="/products" className="text-primary hover:text-primary/80 font-medium">
                            Browse Marketplace &rarr;
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}
