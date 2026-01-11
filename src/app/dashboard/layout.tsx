'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutDashboard, ShoppingBag, Settings, LogOut, Menu, X, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'sonner'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()
    const supabase = createClient()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const checkRole = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single()
                if (data?.role === 'admin') setIsAdmin(true)
            }
        }
        checkRole()
    }, [])

    const navItems = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'Products', href: '/products', icon: ShoppingBag },
        ...(isAdmin ? [{ name: 'Admin', href: '/dashboard/admin', icon: Settings }] : []),
    ]

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            toast.error('Error signing out')
        } else {
            router.push('/login')
            router.refresh()
        }
    }

    return (
        <div className="min-h-screen bg-background text-foreground flex">
            {/* Sidebar - Desktop */}
            <aside className="hidden md:flex flex-col w-64 border-r border-border bg-surface/50 backdrop-blur-md h-screen sticky top-0">
                <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                            <span className="font-bold text-white">AS</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight">Auto-Step</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href
                        const Icon = item.icon
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                                    ? 'bg-primary/10 text-primary border border-primary/20'
                                    : 'text-muted-foreground hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                {item.name}
                            </Link>
                        )
                    })}
                </nav>

                <div className="p-4 border-t border-border">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-border flex items-center justify-between p-4">
                <span className="font-bold text-lg">Auto-Step</span>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2">
                    {isMobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 z-40 bg-background pt-20 px-6">
                    <nav className="space-y-4">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="flex items-center gap-4 text-lg font-medium py-2 text-muted-foreground hover:text-white"
                            >
                                <item.icon className="w-6 h-6" />
                                {item.name}
                            </Link>
                        ))}
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-4 text-lg font-medium py-4 text-destructive w-full text-left"
                        >
                            <LogOut className="w-6 h-6" />
                            Sign Out
                        </button>
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 overflow-auto md:p-8 p-4 pt-20 md:pt-8 w-full max-w-[1600px] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    {children}
                </motion.div>
            </main>
        </div>
    )
}
