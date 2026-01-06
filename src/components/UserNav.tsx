'use client';

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    UserCircle,
    LogOut,
    LayoutDashboard,
    ShieldAlert,
    ShoppingBag
} from "lucide-react";

export function UserNav({
    user,
    profile
}: {
    user: any,
    profile: any
}) {
    const supabase = createClient();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.replace('/');
        router.refresh();
    };

    if (!user) {
        return (
            <div className="flex items-center gap-6">
                <Link href="/products" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors">Catalog</Link>
                <Link href="/login" className="text-sm font-bold text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-widest">
                    Sign In
                </Link>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-6 mr-2">
                <Link href="/dashboard" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <LayoutDashboard size={14} />
                    Dashboard
                </Link>
                <Link href="/products" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                    <ShoppingBag size={14} />
                    Products
                </Link>
                {profile?.role === 'admin' && (
                    <Link href="/dashboard/admin" className="text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2 uppercase tracking-tighter">
                        <ShieldAlert size={14} />
                        Admin Panel
                    </Link>
                )}
            </div>

            <div className="h-6 w-px bg-white/10 hidden md:block" />

            <div className="flex items-center gap-4">
                <Link href="/account" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                    <UserCircle size={20} />
                    <span className="text-xs font-bold uppercase tracking-wider hidden sm:inline">
                        {profile?.username || 'User'}
                    </span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    title="Sign Out"
                >
                    <LogOut size={18} />
                </button>
            </div>
        </div>
    );
}
