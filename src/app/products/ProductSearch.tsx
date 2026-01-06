'use client'

import { useState } from 'react'
import { Search, Tag, ArrowRight } from 'lucide-react'
import { BuyButton } from './BuyButton'

export function ProductSearch({ initialProducts, isLoggedIn }: { initialProducts: any[], isLoggedIn: boolean }) {
    const [search, setSearch] = useState('')

    const filteredProducts = initialProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.id.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-12">
            <div className="max-w-2xl mx-auto relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                    <Search size={20} className="text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Search by product name or code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-14 pr-6 py-5 bg-slate-900/50 border border-slate-800 rounded-3xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-600 text-lg shadow-xl shadow-blue-500/5"
                />
            </div>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl">
                    <p className="text-slate-500">No products found matching "{search}".</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl flex flex-col hover:border-blue-500/30 transition-all group hover:bg-slate-900/40">
                            <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <Tag size={24} />
                            </div>
                            <h3 className="text-2xl font-bold mb-1 text-white">{product.name}</h3>
                            <p className="text-[10px] items-center gap-1 font-mono text-slate-600 mb-4 bg-slate-950 px-2 py-1 rounded inline-flex w-fit">
                                ID: {product.id}
                            </p>
                            <p className="text-slate-400 text-sm mb-8 flex-1 leading-relaxed">{product.description}</p>
                            <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-4xl font-bold text-white">${product.price}</span>
                                <span className="text-slate-500 text-sm italic">/ one-time</span>
                            </div>
                            <BuyButton productId={product.id} productName={product.name} price={product.price} isLoggedIn={isLoggedIn} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
