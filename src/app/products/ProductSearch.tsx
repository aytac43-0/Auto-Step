'use client'

import { useState } from 'react'
import { Search, Tag, ArrowRight, ShoppingCart, Cpu, ShieldCheck } from 'lucide-react'
import { BuyButton } from './BuyButton'

export function ProductSearch({ initialProducts, isLoggedIn }: { initialProducts: any[], isLoggedIn: boolean }) {
    const [search, setSearch] = useState('')

    const filteredProducts = initialProducts.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.id.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-20">
            {/* Search Bar v2 */}
            <div className="max-w-2xl mx-auto relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Search size={22} className="text-[#94A3B8] group-focus-within:text-[#3B82F6] transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Search by product name or system code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-16 pr-8 py-6 bg-[#0B1220] border border-[#1E293B] rounded-[2rem] focus:ring-4 focus:ring-blue-500/10 focus:border-[#3B82F6] outline-none transition-all placeholder:text-[#94A3B8]/50 text-lg shadow-2xl shadow-black/40"
                />
            </div>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-24 bg-[#0B1220]/30 border border-dashed border-[#1E293B] rounded-[2rem] animate-in fade-in duration-500">
                    <p className="text-[#94A3B8] text-lg font-medium">No results found for "<span className="text-white">{search}</span>"</p>
                    <p className="text-[#94A3B8] text-sm mt-2">Try searching for generic terms like "Bot" or "Sync".</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="premium-card flex flex-col hover:border-blue-500/50 transition-all group hover:-translate-y-1 duration-300 overflow-hidden relative">
                            {/* Accent Glow */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[40px] rounded-full -mr-16 -mt-16 group-hover:bg-blue-500/10 transition-colors" />

                            <div className="p-8 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-14 h-14 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center border border-blue-500/20 group-hover:scale-110 transition-transform duration-500">
                                        <Cpu size={28} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[10px] items-center gap-1 font-mono text-blue-400 mb-1 bg-blue-500/5 px-2 py-1 rounded inline-flex w-fit border border-blue-500/10 uppercase font-black tracking-widest leading-none">
                                            Code: {product.id.slice(0, 8)}
                                        </p>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black mb-3 text-[#E5E7EB] leading-tight group-hover:text-blue-400 transition-colors">{product.name}</h3>

                                <p className="text-[#94A3B8] text-sm mb-8 flex-1 leading-relaxed line-clamp-3">
                                    {product.description}
                                </p>

                                <div className="pt-6 border-t border-[#1E293B] mt-auto">
                                    <div className="flex items-center justify-between mb-8">
                                        <div>
                                            <p className="text-[10px] text-[#94A3B8] font-black uppercase tracking-[0.2em] mb-1">Asset Value</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-3xl font-black text-white">${product.price}</span>
                                                <span className="text-[#94A3B8] text-xs font-bold uppercase tracking-widest italic opacity-50">USD</span>
                                            </div>
                                        </div>
                                        <div className="p-3 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                                            <ShieldCheck size={20} className="text-emerald-500" />
                                        </div>
                                    </div>

                                    <BuyButton productId={product.id} productName={product.name} price={product.price} isLoggedIn={isLoggedIn} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Marketplace Footer Note */}
            <div className="text-center pt-20">
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#0B1220] border border-[#1E293B] rounded-2xl text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.3em]">
                    <ShieldCheck size={14} className="text-blue-500" />
                    All assets verified for system security
                </div>
            </div>
        </div>
    )
}
