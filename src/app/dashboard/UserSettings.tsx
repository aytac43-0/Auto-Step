'use client'

import { useState } from 'react'
import { updateUsername } from './settings-actions'
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react'

export function UserSettings({ profile }: { profile: any }) {
    const [username, setUsername] = useState(profile?.username || '')
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setMessage(null)

        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const result = await updateUsername(formData)

        if (result.success) {
            setMessage({ type: 'success', text: result.message! })
        } else {
            setMessage({ type: 'error', text: result.error! })
        }
        setLoading(false)
    }

    return (
        <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl">
            <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

            <form onSubmit={handleUpdate} className="grid gap-6">
                {message && (
                    <div className={`p-4 rounded-xl flex items-center gap-3 text-sm ${message.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                        {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                        {message.text}
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-sm text-slate-500 ml-1">Email Address (Read-only)</label>
                    <input
                        value={profile?.email}
                        disabled
                        className="w-full px-4 py-3 bg-slate-950/50 border border-slate-800/50 rounded-xl text-slate-400 cursor-not-allowed opacity-70"
                    />
                </div>

                <div className="space-y-2">
                    <label className="text-sm text-slate-500 ml-1">Username</label>
                    <input
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        placeholder="Choose a username"
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading || username === profile?.username}
                    className="py-4 bg-white text-black font-bold rounded-xl hover:bg-slate-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? <Loader2 className="animate-spin mx-auto" size={24} /> : 'Save Changes'}
                </button>
            </form>
        </div>
    )
}
