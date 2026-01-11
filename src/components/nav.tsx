'use client'

import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { logout } from "@/app/auth/actions";
import { useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";

export default function Navbar() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const getUser = async () => {
            const { data } = await supabase.auth.getUser();
            setUser(data.user);
            setLoading(false);
        };
        getUser();

        // Listen for auth state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0a0f1a]/80 backdrop-blur-xl supports-[backdrop-filter]:bg-[#0a0f1a]/60">
            <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
                <Link href="/" className="flex items-center space-x-3 group">
                    <div className="relative w-8 h-8 overflow-hidden rounded-lg">
                        <Image src="/logo.png" alt="Auto-Step" fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <span className="font-bold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Auto-Step</span>
                </Link>

                <div className="flex items-center gap-6">
                    {loading ? (
                        <div className="h-9 w-24 bg-white/5 rounded-full animate-pulse"></div>
                    ) : user ? (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
                            >
                                Client Portal
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                            </Link>
                            <form action={async () => {
                                await logout();
                                setUser(null); // Optimistic update
                            }}>
                                <button
                                    className="text-sm font-medium px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 hover:text-destructive transition-all"
                                >
                                    Log Out
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link
                                href="/login"
                                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
                            >
                                Log In
                            </Link>
                            <Link
                                href="/register"
                                className="text-sm font-medium px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-full shadow-lg shadow-primary/20 transition-all hover:scale-105"
                            >
                                Get Started
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
