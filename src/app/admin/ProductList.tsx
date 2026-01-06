'use client';

import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import {
    Edit2,
    Check,
    X,
    Globe,
    Loader2,
    ShieldCheck,
    Cpu,
    Database,
    Activity
} from "lucide-react";

export function ProductList({ initialProducts }: { initialProducts: any[] }) {
    const supabase = createClient();
    const [products, setProducts] = useState(initialProducts);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editUrl, setEditUrl] = useState('');
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await supabase
                .from("products")
                .select("*")
                .order("created_at", { ascending: false });
            if (data) setProducts(data);
            setLoading(false);
        };
        fetchProducts();
    }, []);

    const handleUpdateUrl = async (productId: string) => {
        setUpdating(true);
        const { error } = await supabase
            .from("products")
            .update({ access_url: editUrl })
            .eq("id", productId);

        if (!error) {
            setProducts(products.map(p => p.id === productId ? { ...p, access_url: editUrl } : p));
            setEditingId(null);
        }
        setUpdating(false);
    };

    if (loading) return (
        <div className="py-40 text-center flex flex-col items-center justify-center gap-6 animate-pulse">
            <Loader2 className="animate-spin text-[#00E5FF]" size={40} />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00E5FF]">Accessing Database Nodes...</p>
        </div>
    );

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-[rgba(0,229,255,0.1)]">
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#94A3B8]">Deployable Module</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#94A3B8]">System Code</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#94A3B8]">Deployment Gateway</th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.4em] text-[#E6F1FF] text-right">Metrics</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-[rgba(255,255,255,0.03)]">
                    {products.map((product) => (
                        <tr key={product.id} className="group hover:bg-[rgba(0,229,255,0.02)] transition-colors">
                            <td className="px-8 py-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 rounded-2xl bg-[#070B14] border border-[rgba(0,229,255,0.1)] flex items-center justify-center text-[#00E5FF] group-hover:border-[#00E5FF]/40 transition-all shadow-[inset_0_0_15px_rgba(0,229,255,0.05)]">
                                        <Cpu size={24} />
                                    </div>
                                    <div>
                                        <p className="text-white font-black uppercase tracking-tight text-base group-hover:text-[#00E5FF] transition-colors">{product.name}</p>
                                        <p className="text-[10px] text-[#94A3B8] font-bold tracking-widest mt-1">VAL: ${product.price} USD</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-8">
                                <code className="text-[11px] font-mono font-bold text-[#00E5FF]/70 bg-[#00E5FF]/5 px-3 py-1.5 rounded-lg border border-[#00E5FF]/10 flex items-center gap-2 w-fit">
                                    <Database size={12} />
                                    {product.id.split('-')[0].toUpperCase()}
                                </code>
                            </td>
                            <td className="px-8 py-8">
                                {editingId === product.id ? (
                                    <div className="flex items-center gap-3">
                                        <input
                                            type="text"
                                            value={editUrl}
                                            onChange={(e) => setEditUrl(e.target.value)}
                                            className="bg-[#070B14] border border-[#00E5FF] rounded-lg px-4 py-2 text-sm text-white focus:ring-2 focus:ring-[#00E5FF]/20 outline-none w-64"
                                            placeholder="https://..."
                                        />
                                        <button
                                            onClick={() => handleUpdateUrl(product.id)}
                                            disabled={updating}
                                            className="p-2 bg-emerald-500/20 text-emerald-500 rounded-lg hover:bg-emerald-500/30 transition-all"
                                        >
                                            {updating ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="p-2 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-all"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4 group/url">
                                        <div className="flex items-center gap-2 text-xs font-bold text-[#94A3B8] max-w-[200px] truncate">
                                            <Globe size={14} className="text-[#00E5FF]/40" />
                                            {product.access_url || 'N/A'}
                                        </div>
                                        <button
                                            onClick={() => {
                                                setEditingId(product.id);
                                                setEditUrl(product.access_url || '');
                                            }}
                                            className="p-1.5 glass-panel border-[rgba(0,229,255,0.1)] text-[#94A3B8] hover:text-[#00E5FF] transition-all opacity-0 group-hover/url:opacity-100"
                                        >
                                            <Edit2 size={12} />
                                        </button>
                                    </div>
                                )}
                            </td>
                            <td className="px-8 py-8 text-right">
                                <div className="flex flex-col items-end gap-2">
                                    <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                                        <ShieldCheck size={14} />
                                        Verified System
                                    </div>
                                    <div className="flex items-center gap-2 text-[#94A3B8] text-[9px] font-black uppercase tracking-widest">
                                        <Activity size={12} />
                                        Performance: Optimal
                                    </div>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
