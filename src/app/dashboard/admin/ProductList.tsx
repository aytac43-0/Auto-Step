'use client';

import { useState, useEffect } from 'react';
import { createClient } from "@/utils/supabase/client";
import {
    Edit2,
    Check,
    X,
    Loader2,
    ShieldCheck,
    Server
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
        <div className="py-20 text-center flex flex-col items-center justify-center gap-6">
            <Loader2 className="animate-spin text-cyan-400/40" size={32} />
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Accessing Repository...</p>
        </div>
    );

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-white/5">
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">System Name</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Module Code</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">Target URL</th>
                        <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 text-right">Integrity</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.02]">
                    {products.map((product) => (
                        <tr key={product.id} className="group hover:bg-white/[0.01] transition-colors">
                            <td className="px-6 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/20 transition-all">
                                        <Server size={16} />
                                    </div>
                                    <div>
                                        <p className="text-white font-bold text-sm leading-none mb-1">{product.name}</p>
                                        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">${product.price}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-6">
                                <code className="text-[10px] font-mono font-bold text-gray-400 bg-white/5 px-2 py-1 rounded border border-white/5">
                                    {product.id.split('-')[0].toUpperCase()}
                                </code>
                            </td>
                            <td className="px-6 py-6">
                                {editingId === product.id ? (
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={editUrl}
                                            onChange={(e) => setEditUrl(e.target.value)}
                                            className="bg-[#0D121F] border border-[#1F2937] rounded-lg px-3 py-1.5 text-xs text-white focus:border-cyan-400/50 outline-none w-48"
                                            placeholder="https://..."
                                        />
                                        <button
                                            onClick={() => handleUpdateUrl(product.id)}
                                            disabled={updating}
                                            className="p-1.5 bg-emerald-500/10 text-emerald-500 rounded-lg hover:bg-emerald-500/20 transition-all"
                                        >
                                            {updating ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                                        </button>
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="p-1.5 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500/20 transition-all"
                                        >
                                            <X size={14} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 group/url max-w-[200px]">
                                        <div className="text-xs font-semibold text-gray-500 truncate italic">
                                            {product.access_url || 'No URL assigned'}
                                        </div>
                                        <button
                                            onClick={() => {
                                                setEditingId(product.id);
                                                setEditUrl(product.access_url || '');
                                            }}
                                            className="p-1 rounded bg-white/5 text-gray-600 hover:text-cyan-400 transition-all opacity-0 group-hover/url:opacity-100"
                                        >
                                            <Edit2 size={10} />
                                        </button>
                                    </div>
                                )}
                            </td>
                            <td className="px-6 py-6 text-right">
                                <div className="flex flex-col items-end gap-1">
                                    <div className="flex items-center gap-1.5 text-emerald-500 text-[9px] font-bold uppercase tracking-widest">
                                        <ShieldCheck size={12} />
                                        Verified
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
