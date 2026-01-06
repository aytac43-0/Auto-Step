'use client'

import { useState } from 'react'
import { getPaytrToken } from './paytr-actions'
import { Loader2, Briefcase, ChevronRight } from 'lucide-react'

export function BuyButton({ productId, productName, price, isLoggedIn }: { productId: string, productName: string, price: number, isLoggedIn: boolean }) {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handlePurchase = async () => {
        if (!isLoggedIn) {
            window.location.href = '/login'
            return
        }

        setLoading(true)
        setError(null)

        try {
            const result = await getPaytrToken(productId, productName, price)

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
            } else {
                setError(result.error || 'Gateway initialization failed')
            }
        } catch (err) {
            setError('Studio connection error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            <button
                onClick={handlePurchase}
                disabled={loading}
                className="w-full btn-primary !py-4 flex items-center justify-center gap-3"
            >
                {loading ? <Loader2 size={18} className="animate-spin text-gray-900" /> : <Briefcase size={18} />}
                {loading ? 'Initializing...' : 'Acquire System Module'}
                {!loading && <ChevronRight size={16} className="opacity-40" />}
            </button>
            {error && <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest mt-4 text-center bg-red-500/5 p-3 rounded-lg border border-red-500/10 italic">{error}</p>}
        </div>
    )
}
