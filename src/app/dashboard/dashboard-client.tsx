'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Loader2, TrendingUp, Users, DollarSign } from 'lucide-react'

export default function DashboardClient() {
    const [profile, setProfile] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single()
                setProfile(data)
            }
            setLoading(false)
        }
        fetchProfile()
    }, [])

    if (loading) return <div className="h-full flex items-center justify-center"><Loader2 className="animate-spin text-primary" /></div>

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold">Overview</h1>
                <p className="text-muted-foreground mt-1">Welcome back, {profile?.username || 'User'}. Here is what's happening today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary/10 rounded-lg text-primary">
                            <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Revenue</p>
                            <h3 className="text-2xl font-bold text-white">$0.00</h3>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                            <Users className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Active Users</p>
                            <h3 className="text-2xl font-bold text-white">1</h3>
                        </div>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-xl">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Growth</p>
                            <h3 className="text-2xl font-bold text-white">+100%</h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-card rounded-xl p-8 border border-white/5 min-h-[300px] flex items-center justify-center text-muted-foreground">
                <p>Chart data unavailable.</p>
            </div>
        </div>
    )
}
