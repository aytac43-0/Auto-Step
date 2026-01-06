'use client'

import { useState, useMemo } from 'react'
import { Search, ArrowRight, Cpu, ShieldCheck, Zap, Layers, Activity } from 'lucide-react'
import { BuyButton } from './BuyButton'

export function ProductSearch({ initialProducts, isLoggedIn }: { initialProducts: any[], isLoggedIn: boolean }) {
    const [search, setSearch] = useState('')

    const filteredProducts = useMemo(() =>
        initialProducts.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.id.toLowerCase().includes(search.toLowerCase())
        ), [search, initialProducts]
    )

    return (
        <div className="space-y-16">
            {/* Command Search */}
            <div className="max-w-3xl mx-auto relative group">
                <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                    <Search size={24} className="text-[#94A3B8] group-focus-within:text-[#00E5FF] transition-colors" />
                </div>
                <input
                    type="text"
                    placeholder="Search by module name or unique identification code..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-16 pr-8 py-7 bg-[rgba(10,16,32,0.8)] border border-[rgba(0,229,255,0.15)] rounded-[2rem] focus:ring-4 focus:ring-[#00E5FF]/5 focus:border-[#00E5FF] outline-none transition-all placeholder:text-[#94A3B8]/30 text-xl shadow-2xl backdrop-blur-xl"
                />
                <div className="absolute inset-y-0 right-6 flex items-center pointer-events-none">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#94A3B8]/50 px-3 py-1 bg-white/5 rounded-full border border-white/10">CMD + K</span>
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <div className="text-center py-32 glass-panel neon-border animate-float">
                    <Activity size={48} className="mx-auto text-[#94A3B8]/20 mb-6" />
                    <p className="text-[#94A3B8] text-xl font-bold uppercase tracking-widest">No matching modules found</p>
                    <p className="text-[#94A3B8]/60 text-sm mt-2">Adjust your search parameters or query the global database.</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map((product) => (
                        <div key={product.id} className="glass-panel neon-border flex flex-col group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
                            {/* Inner Glow Background */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00E5FF]/5 blur-[40px] rounded-full -mr-16 -mt-16 group-hover:bg-[#00E5FF]/10 transition-colors" />

                            <div className="p-8 flex-1 flex flex-col relative z-10">
                                <div className="flex justify-between items-start mb-10">
                                    <div className="w-14 h-14 bg-[#00E5FF]/10 text-[#00E5FF] rounded-2xl flex items-center justify-center border border-[#00E5FF]/20 group-hover:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                                        <Cpu size={28} />
                                    </div>
                                    <div className="text-right">
                                        <p className="text-[9px] font-black text-[#00E5FF] mb-1 uppercase tracking-[0.2em] bg-[#00E5FF]/10 px-3 py-1.5 rounded-full border border-[#00E5FF]/20">
                                            MOD-ID: {product.id.slice(0, 8)}
                                        </p>
                                    </div>
                                </div>

                                <h3 className="text-2xl font-black mb-3 text-[#E6F1FF] leading-tight group-hover:text-[#00E5FF] transition-colors font-space uppercase italic tracking-tighter">{product.name}</h3>

                                <p className="text-[#94A3B8] text-sm mb-10 flex-1 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                                    {product.description}
                                </p>

                                <div className="pt-8 border-t border-[rgba(0,229,255,0.1)] mt-auto">
                                    <div className="flex items-end justify-between mb-8">
                                        <div>
                                            <p className="text-[10px] text-[#94A3B8] font-black uppercase tracking-[0.3em] mb-2">Acquisition Value</p>
                                            <div className="flex items-baseline gap-1">
                                                <span className="text-[10px] text-[#00E5FF] font-black mr-1">$</span>
                                                <span className="text-4xl font-black text-white leading-none">{product.price}</span>
                                                <span className="text-[#94A3B8] text-[10px] font-black uppercase tracking-widest ml-2 opacity-40">USD</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <div className="flex items-center gap-1.5 text-emerald-500 text-[9px] font-black uppercase tracking-widest mb-2">
                                                <ShieldCheck size={12} />
                                                Verified
                                            </div>
                                            <div className="flex items-center gap-1.5 text-blue-500 text-[9px] font-black uppercase tracking-widest">
                                                <Layers size={12} />
                                                v1.0.4
                                            </div>
                                        </div>
                                    </div>

                                    <BuyButton productId={product.id} productName={product.name} price={product.price} isLoggedIn={isLoggedIn} />
                                </div>
                            </div>

                            {/* Hover Bottom Glow */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00E5FF]/40 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                        </div>
                    ))}
                </div>
            )}

            {/* Marketplace Status */}
            <div className="text-center pt-24">
                <div className="inline-flex items-center gap-4 px-8 py-4 glass-panel border-[rgba(0,229,255,0.15)] text-[10px] font-black text-[#94A3B8] uppercase tracking-[0.4em] shadow-xl">
                    <Zap size={16} className="text-[#00E5FF] animate-pulse" />
                    Global Node Distribution Active
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>
            </div>
        </div>
    )
}
