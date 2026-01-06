'use client'

import { useState } from 'react'
import { updateProductUrl } from './product-actions'
import { Globe, Save, Loader2, Edit2, X, ShoppingBag } from 'lucide-react'

export function ProductList({ products }: { products: any[] }) {
    const [editingId, setEditingId] = useState<string | null>(null)
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSave = async (id: string) => {
        setLoading(true)
        try {
            await updateProductUrl(id, url)
            setEditingId(null)
            window.location.reload()
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="premium-card overflow-hidden">
            <div className="p-8 border-b border-[#1E293B] flex justify-between items-center bg-gradient-to-r from-[#0B1220] to-[#0F172A]">
                <div className="flex items-center gap-3">
                    <ShoppingBag className="text-blue-500" size={24} />
                    <h2 className="text-xl font-black tracking-tight">Manage Assets</h2>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-[#94A3B8] text-xs font-black uppercase tracking-widest bg-[#020617]/50">
                            <th className="px-8 py-5">Asset Name</th>
                            <th className="px-8 py-5">Market Value</th>
                            <th className="px-8 py-5">Management URL</th>
                            <th className="px-8 py-5 text-right">Verification</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1E293B]">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-[#3B82F6]/5 transition-colors group">
                                <td className="px-8 py-5 font-bold text-[#E5E7EB]">{product.name}</td>
                                <td className="px-8 py-5 font-mono text-emerald-500 font-bold">${product.price}</td>
                                <td className="px-8 py-5">
                                    {editingId === product.id ? (
                                        <div className="flex items-center gap-2 animate-in fade-in duration-300">
                                            <input
                                                type="url"
                                                value={url}
                                                onChange={(e) => setUrl(e.target.value)}
                                                placeholder="https://exclusive-asset-v1.com"
                                                className="w-full bg-[#020617] border border-[#1E293B] rounded-xl px-4 py-2 text-sm focus:border-[#3B82F6] outline-none text-[#E5E7EB] placeholder:text-[#94A3B8]/30"
                                            />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2 group/url">
                                            <Globe size={14} className="text-[#94A3B8]" />
                                            <span className="text-[#94A3B8] text-sm italic truncate block max-w-xs group-hover/url:text-[#E5E7EB] transition-colors">
                                                {product.access_url || 'Endpoint not configured'}
                                            </span>
                                        </div>
                                    )}
                                </td>
                                <td className="px-8 py-5 text-right">
                                    {editingId === product.id ? (
                                        <div className="flex items-center justify-end gap-3">
                                            <button
                                                onClick={() => handleSave(product.id)}
                                                disabled={loading}
                                                className="p-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 rounded-xl transition-all border border-emerald-500/20 disabled:opacity-50"
                                                title="Save Changes"
                                            >
                                                {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                            </button>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="p-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl transition-all border border-red-500/20"
                                                title="Cancel"
                                            >
                                                <X size={18} />
                                            </button>
                                        </div>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                setEditingId(product.id)
                                                setUrl(product.access_url || '')
                                            }}
                                            className="p-2.5 bg-[#0F172A] hover:bg-[#1E293B] text-[#94A3B8] hover:text-white rounded-xl transition-all border border-[#1E293B]"
                                            title="Edit Asset"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="px-8 py-4 bg-[#0B1220]/50 border-t border-[#1E293B]">
                <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-black flex items-center gap-2">
                    <ShieldCheck size={12} className="text-blue-500" />
                    Asset verification protocols active
                </p>
            </div>
        </div>
    )
}

function ShieldCheck(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    )
}
