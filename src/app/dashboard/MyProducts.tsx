'use client'

import { ShoppingBag, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function MyProducts({ purchases }: { purchases: any[] }) {
    // Filter out paid purchases with products
    const paidPurchases = purchases.filter(p => p.status === 'paid' && p.products);

    if (paidPurchases.length === 0) return null;

    return (
        <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl">
            <div className="flex items-center gap-2 mb-8">
                <ShoppingBag className="text-emerald-500" />
                <h2 className="text-2xl font-bold">My Products</h2>
            </div>

            <div className="grid gap-4">
                {paidPurchases.map((purchase) => (
                    <div key={purchase.id} className="bg-slate-950/50 border border-slate-800 p-6 rounded-2xl flex items-center justify-between group hover:border-emerald-500/30 transition-all">
                        <div>
                            <h3 className="font-bold text-lg">{purchase.products.name}</h3>
                            <p className="text-slate-500 text-sm">{purchase.products.description}</p>
                        </div>
                        <Link
                            href={`/access/product/${purchase.products.id}`}
                            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-all"
                        >
                            Access Product
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}
