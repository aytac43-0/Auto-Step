'use client'

import { useState } from 'react'
import { createAutomation, toggleAutomationStatus, deleteAutomation } from './automation-actions'
import { Plus, Play, Pause, Trash2, Loader2, Cpu, ShieldCheck, Activity } from 'lucide-react'

export function AutomationsList({ initialAutomations, isAdmin }: { initialAutomations: any[], isAdmin: boolean }) {
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
        <div className="bg-[#0B1220] rounded-2xl overflow-hidden">
            <div className="px-8 py-6 border-b border-[#1E293B] flex justify-between items-center bg-gradient-to-r from-[#0B1220] to-[#0F172A]">
                <div className="flex items-center gap-3">
                    <Cpu className="text-blue-500" size={24} />
                    <h2 className="text-xl font-black tracking-tight text-[#E5E7EB]">My Automations</h2>
                </div>
                {isAdmin && (
                    <button
                        onClick={() => setIsAdding(!isAdding)}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={16} />
                        New Asset
                    </button>
                )}
            </div>

            <div className="p-8">
                {isAdmin && isAdding && (
                    <form onSubmit={handleAdd} className="mb-8 p-6 bg-[#020617] rounded-2xl border border-[#1E293B] flex gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
                        <input
                            name="name"
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            placeholder="Automation Name"
                            className="flex-1 bg-transparent border-none focus:ring-0 outline-none text-[#E5E7EB] placeholder:text-[#94A3B8]"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={loading === 'adding'}
                            className="px-6 py-2 bg-[#3B82F6] text-white rounded-lg text-xs font-bold disabled:opacity-50 hover:bg-blue-500 transition-colors"
                        >
                            {loading === 'adding' ? <Loader2 className="animate-spin" size={16} /> : 'Deploy'}
                        </button>
                    </form>
                )}

                {automations.length === 0 ? (
                    <div className="text-center py-20 bg-[#020617]/50 rounded-2xl border border-dashed border-[#1E293B]">
                        <div className="w-16 h-16 bg-[#0B1220] rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#1E293B]">
                            <Activity size={32} className="text-[#1E293B]" />
                        </div>
                        <p className="text-[#94A3B8] font-medium">No automation assets currently assigned.</p>
                        {isAdmin && <p className="text-[#94A3B8] text-xs mt-2 italic">Add a new asset to get started as admin.</p>}
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {automations.map((auto) => (
                            <div key={auto.id} className="group flex items-center justify-between p-5 bg-[#0F172A]/50 rounded-2xl border border-[#1E293B] hover:border-blue-500/30 transition-all hover:bg-[#0F172A] relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/0 group-hover:bg-blue-500/50 transition-all" />

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-[#020617] rounded-xl flex items-center justify-center text-blue-400 border border-[#1E293B]">
                                        <Cpu size={20} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#E5E7EB]">{auto.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <ShieldCheck size={12} className="text-emerald-500" />
                                            <p className="text-[10px] text-[#94A3B8] font-mono tracking-tighter uppercase italic">System Asset: {auto.id.slice(0, 8)}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <div className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 ${auto.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                        <span className={`w-1 h-1 rounded-full ${auto.status === 'active' ? 'bg-emerald-500' : 'bg-amber-500'} animate-pulse`} />
                                        {auto.status}
                                    </div>

                                    {isAdmin && (
                                        <div className="flex items-center gap-1 border-l border-[#1E293B] ml-2 pl-3">
                                            <button
                                                onClick={() => handleToggle(auto.id, auto.status)}
                                                disabled={loading === auto.id}
                                                className="p-2 hover:bg-[#1E293B] rounded-lg text-[#94A3B8] hover:text-white transition-colors disabled:opacity-50"
                                                title={auto.status === 'active' ? 'Pause' : 'Resume'}
                                            >
                                                {loading === auto.id ? <Loader2 className="animate-spin" size={16} /> : (auto.status === 'active' ? <Pause size={16} /> : <Play size={16} />)}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(auto.id)}
                                                disabled={loading === auto.id}
                                                className="p-2 hover:bg-red-500/10 rounded-lg text-[#94A3B8] hover:text-red-500 transition-colors disabled:opacity-50"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="px-8 py-4 bg-[#0B1220]/50 border-t border-[#1E293B] text-center">
                <p className="text-[10px] text-[#94A3B8] uppercase tracking-widest font-bold">Secure Access • System Integrity Guaranteed</p>
            </div>
        </div>
    )
}
