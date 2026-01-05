'use client'

import Link from 'next/link'
import { AlertCircle, CheckCircle, Clock, XCircle } from 'lucide-react'

type SubscriptionStatus = 'FREE' | 'ACTIVE' | 'GRACE' | 'EXPIRED'

interface SubscriptionBadgeProps {
    subscription: any
}

export function SubscriptionBadge({ subscription }: SubscriptionBadgeProps) {
    // Determine status
    let status: SubscriptionStatus = 'FREE'
    let daysRemaining = 0
    let renewalDate = ''

    if (subscription) {
        status = subscription.status?.toUpperCase() as SubscriptionStatus
        const periodEnd = new Date(subscription.current_period_end)
        renewalDate = periodEnd.toLocaleDateString()

        if (status === 'GRACE') {
            const graceStarted = new Date(subscription.grace_started_at)
            const daysSinceGrace = Math.floor((Date.now() - graceStarted.getTime()) / (1000 * 60 * 60 * 24))
            daysRemaining = Math.max(0, 3 - daysSinceGrace)
        }
    }

    // Status configurations
    const statusConfig = {
        FREE: {
            icon: AlertCircle,
            color: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
            label: 'Free',
            message: 'Upgrade to unlock premium features',
            cta: 'Upgrade Now',
            ctaLink: '/products'
        },
        ACTIVE: {
            icon: CheckCircle,
            color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
            label: 'Active',
            message: `Renews on ${renewalDate}`,
            cta: 'Manage Plan',
            ctaLink: '/products'
        },
        GRACE: {
            icon: Clock,
            color: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
            label: 'Grace Period',
            message: `${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining - Payment required`,
            cta: 'Renew Now',
            ctaLink: '/products'
        },
        EXPIRED: {
            icon: XCircle,
            color: 'bg-red-500/10 text-red-500 border-red-500/20',
            label: 'Expired',
            message: 'Your subscription has expired',
            cta: 'Renew Now',
            ctaLink: '/products'
        }
    }

    const config = statusConfig[status]
    const Icon = config.icon

    return (
        <div className={`border rounded-2xl p-6 ${config.color}`}>
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                    <Icon size={24} />
                    <div>
                        <h3 className="font-bold text-lg">Subscription Status</h3>
                        <p className="text-sm opacity-80">{config.label}</p>
                    </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${config.color}`}>
                    {config.label}
                </span>
            </div>
            <p className="text-sm mb-4 opacity-90">{config.message}</p>
            <Link
                href={config.ctaLink}
                className={`block text-center px-6 py-3 rounded-xl font-bold text-sm transition-all ${status === 'ACTIVE'
                        ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                        : 'bg-white hover:bg-slate-100 text-black'
                    }`}
            >
                {config.cta}
            </Link>
        </div>
    )
}
