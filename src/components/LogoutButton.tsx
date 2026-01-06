'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { LogOut } from 'lucide-react'

export function LogoutButton() {
    const supabase = createClient()
    const router = useRouter()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        router.replace('/')
        router.refresh()
    }

    return (
        <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-400 hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-widest"
            title="Sign Out"
        >
            <LogOut size={16} />
            <span>Sign Out</span>
        </button>
    )
}
