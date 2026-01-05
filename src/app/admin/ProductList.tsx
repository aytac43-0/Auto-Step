'use client'

import { useState } from 'react'
import { updateProductUrl } from './product-actions'
import { Globe, Save, Loader2, Edit2, X } from 'lucide-react'

export function ProductList({ products }: { products: any[] }) {
    const [editingId, setEditingId] = useState<string | null>(null)
    const [url, setUrl] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSave = async (id: string) => {
        setLoading(true)
        try {
            await updateProductUrl(id, url)
            setEditingId(null)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-slate-900/30 border border-slate-800 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <div className="flex items-center gap-2">
                    <Globe className="text-blue-500" />
                    <h2 className="text-xl font-bold">Manage Products</h2>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="text-slate-500 text-sm bg-slate-950/50">
                            <th className="px-6 py-4">Product Name</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Access URL</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                        {products.map((product) => (
                            <tr key={product.id} className="hover:bg-slate-800/10 transition-colors">
                                <td className="px-6 py-4 font-bold">{product.name}</td>
                                <td className="px-6 py-4 font-mono text-emerald-500">${product.price}</td>
                                <td className="px-6 py-4">
                                    {editingId === product.id ? (
                                        <input
                                            type="url"
                                            value={url}
                                            onChange={(e) => setUrl(e.target.value)}
                                            placeholder="https://..."
                                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-sm focus:border-blue-500 outline-none"
                                        />
                                    ) : (
                                        <span className="text-slate-500 text-sm italic truncate block max-w-xs">
                                            {product.access_url || 'No URL set'}
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    {editingId === product.id ? (
                                        <div className="flex items-center justify-end gap-2">
                                            <button
                                                onClick={() => handleSave(product.id)}
                                                disabled={loading}
                                                className="p-2 hover:bg-emerald-500/10 text-emerald-500 rounded-lg transition-colors disabled:opacity-50"
                                            >
                                                {loading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                                            </button>
                                            <button
                                                onClick={() => setEditingId(null)}
                                                className="p-2 hover:bg-red-500/10 text-red-500 rounded-lg transition-colors"
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
                                            className="p-2 hover:bg-blue-500/10 text-blue-500 rounded-lg transition-colors"
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
        </div>
    )
}
