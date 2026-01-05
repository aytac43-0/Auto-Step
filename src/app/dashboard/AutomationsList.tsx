'use client'

import { useState } from 'react'
import { createAutomation, toggleAutomationStatus, deleteAutomation } from './automation-actions'
import { Plus, Play, Pause, Trash2, Loader2 } from 'lucide-react'

export function AutomationsList({ initialAutomations }: { initialAutomations: any[] }) {
    const [automations, setAutomations] = useState(initialAutomations)
    const [isAdding, setIsAdding] = useState(false)
    const [newName, setNewName] = useState('')
    const [loading, setLoading] = useState<string | null>(null)

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!newName) return
        setLoading('adding')
        const result = await createAutomation(new FormData(e.currentTarget as HTMLFormElement))
        if (result.success) {
            setNewName('')
            setIsAdding(false)
            // Refresh logic would ideally use router.refresh() but local state is faster for UX
            window.location.reload()
        }
        setLoading(null)
    }

    const handleToggle = async (id: string, status: string) => {
        setLoading(id)
        const result = await toggleAutomationStatus(id, status)
        if (result.success) {
            window.location.reload()
        }
        setLoading(null)
    }

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this automation?')) return
        setLoading(id)
        const result = await deleteAutomation(id)
        if (result.success) {
            window.location.reload()
        }
        setLoading(null)
    }

    return (
        <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Automations</h2>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium transition-colors"
                >
                    <Plus size={18} />
                    Create New
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAdd} className="mb-8 p-4 bg-slate-950/50 rounded-2xl border border-slate-800 flex gap-4">
                    <input
                        name="name"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="Automation Name"
                        className="flex-1 bg-transparent border-none focus:ring-0 outline-none"
                        autoFocus
                    />
                    <button
                        type="submit"
                        disabled={loading === 'adding'}
                        className="px-4 py-2 bg-white text-black rounded-lg text-sm font-bold disabled:opacity-50"
                    >
                        {loading === 'adding' ? <Loader2 className="animate-spin" size={18} /> : 'Save'}
                    </button>
                    <button
                        type="button"
                        onClick={() => setIsAdding(false)}
                        className="px-4 py-2 text-slate-400 hover:text-white text-sm"
                    >
                        Cancel
                    </button>
                </form>
            )}

            {automations.length === 0 ? (
                <div className="text-center py-12 bg-slate-950/30 rounded-2xl border border-dashed border-slate-800">
                    <p className="text-slate-500 mb-4">No automations found. Create your first one to get started!</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {automations.map((auto) => (
                        <div key={auto.id} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors">
                            <div>
                                <h3 className="font-medium">{auto.name}</h3>
                                <p className="text-xs text-slate-500">Created {new Date(auto.created_at).toLocaleDateString()}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${auto.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                    {auto.status}
                                </span>
                                <button
                                    onClick={() => handleToggle(auto.id, auto.status)}
                                    disabled={loading === auto.id}
                                    className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors disabled:opacity-50"
                                >
                                    {loading === auto.id ? <Loader2 className="animate-spin" size={18} /> : (auto.status === 'active' ? <Pause size={18} /> : <Play size={18} />)}
                                </button>
                                <button
                                    onClick={() => handleDelete(auto.id)}
                                    disabled={loading === auto.id}
                                    className="p-2 hover:bg-red-500/10 rounded-lg text-slate-400 hover:text-red-500 transition-colors disabled:opacity-50"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
