'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Search,
    Terminal,
    ArrowUpRight,
    Layers,
    CheckCircle2,
    Boxes,
    Filter,
    ArrowRight
} from "lucide-react";
import { BuyButton } from "./BuyButton";

export function ProductSearch({ initialProducts, isLoggedIn }: { initialProducts: any[], isLoggedIn: boolean }) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = initialProducts.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-12">
            {/* Search Header */}
            <div className="bg-[#111827] border border-white/5 rounded-[2rem] p-8 md:p-12 shadow-2xl">
                <div className="max-w-3xl">
                    <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">System Discovery</h2>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-gray-500 group-focus-within:text-cyan-400 transition-colors">
                            <Search size={22} />
                        </div>
                        <input
                            type="text"
                            placeholder="Find automation modules by name or system code (e.g. LeadGen-01)..."
                            className="w-full bg-[#0D121F] border border-[#1F2937] px-16 py-6 rounded-2xl text-lg text-white font-medium placeholder:text-gray-600 focus:border-cyan-400/50 outline-none transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-6 flex items-center gap-3">
                            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                                <Terminal size={12} />
                                System Filter
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
                {filteredProducts.map((product) => (
                    <div
                        key={product.id}
                        className="bg-[#111827] border border-white/5 rounded-2xl p-8 hover:border-cyan-500/20 transition-all flex flex-col group shadow-lg"
                    >
                        <div className="flex justify-between items-start mb-10">
                            <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/5 transition-all">
                                <Boxes size={28} />
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">ID Code</span>
                                <span className="text-xs font-mono font-bold text-white/40">{product.id.split('-')[0].toUpperCase()}</span>
                            </div>
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-4">
                                <div className="px-2 py-0.5 bg-cyan-500/10 text-cyan-400 text-[9px] font-bold uppercase tracking-widest rounded border border-cyan-500/10">
                                    V1.2 Active
                                </div>
                                <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
                                    <CheckCircle2 size={10} className="text-emerald-500" />
                                    Verified
                                </span>
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors">{product.name}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed mb-10 opacity-80 line-clamp-3">
                                {product.description || "A professional-grade automation module designed for architectural stability and high-performance scaling within enterprise environments."}
                            </p>
                        </div>

                        <div className="mt-auto space-y-6 pt-10 border-t border-white/5">
                            <div className="flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">System Value</p>
                                    <p className="text-2xl font-bold text-white">${product.price}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">License</p>
                                    <p className="text-xs font-bold text-white">Lifetime Ownership</p>
                                </div>
                            </div>

                            <BuyButton
                                productId={product.id}
                                productName={product.name}
                                price={product.price}
                                isLoggedIn={isLoggedIn}
                            />
                        </div>
                    </div>
                ))}

                {filteredProducts.length === 0 && (
                    <div className="col-span-full py-40 text-center bg-[#111827] border border-white/5 rounded-3xl">
                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-600">
                            <Filter size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">No systems found.</h3>
                        <p className="text-gray-400 max-w-sm mx-auto">Try refining your search terms or view the full catalog.</p>
                        <button
                            onClick={() => setSearchTerm('')}
                            className="mt-8 text-cyan-400 font-bold uppercase tracking-widest text-xs hover:underline"
                        >
                            Reset System Filter
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
