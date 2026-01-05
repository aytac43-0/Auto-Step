'use client'

import { useState } from 'react'
import { purchaseProduct } from './purchase-actions'
import { Loader2, ShoppingCart, CheckCircle2 } from 'lucide-react'

export function BuyButton({ productId, productName, isLoggedIn }: { productId: string, productName: string, isLoggedIn: boolean }) {
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handlePurchase = async () => {
        if (!isLoggedIn) {
            window.location.href = '/login'
            return
        }

        setLoading(true)
        setError(null)

        const result = await purchaseProduct(productId, productName)

        if (result.success) {
            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } else {
            setError(result.error!)
        }
        setLoading(false)
    }

    if (success) {
        return (
            <div className="flex items-center gap-2 text-emerald-500 font-bold py-3">
                <CheckCircle2 size={20} />
                Purchased!
            </div>
        )
    }

    return (
        <div className="w-full">
            <button
                onClick={handlePurchase}
                disabled={loading}
                className="w-full py-3 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <ShoppingCart size={18} />}
                Buy Now
            </button>
            {error && <p className="text-red-500 text-xs mt-2 text-center">{error}</p>}
        </div>
    )
}
