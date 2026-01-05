'use client'

import { useState } from 'react'
import { getPaytrToken } from './paytr-actions'
import { Loader2, ShoppingCart, CheckCircle2 } from 'lucide-react'

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
                // Create a hidden form and submit it to PAYTR
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
                setError(result.error || 'Failed to initialize payment')
            }
        } catch (err) {
            setError('An unexpected error occurred')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            <button
                onClick={handlePurchase}
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {loading ? <Loader2 size={20} className="animate-spin" /> : <ShoppingCart size={20} />}
                Checkout with PAYTR
            </button>
            {error && <p className="text-red-500 text-xs mt-3 text-center bg-red-500/10 p-2 rounded-lg border border-red-500/20">{error}</p>}
        </div>
    )
}
