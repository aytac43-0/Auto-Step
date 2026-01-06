import Link from "next/link";
import { Shield, LayoutDashboard, ShoppingBag, ShieldAlert } from "lucide-react";
import { LogoutButton } from "./LogoutButton";

type Props = {
    role: 'user' | 'admin'
}

export default function DashboardHeader({ role }: Props) {
    return (
        <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#0A0F1A]/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2.5 group">
                    <div className="w-8 h-8 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center text-cyan-400 group-hover:border-cyan-400/30 transition-all">
                        <Shield size={18} />
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white uppercase font-sans">AUTO STEP</span>
                </Link>

                <div className="flex items-center gap-8">
                    <div className="hidden md:flex items-center gap-8">
                        <Link href="/dashboard" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                            <LayoutDashboard size={14} />
                            Dashboard
                        </Link>
                        <Link href="/products" className="text-sm font-semibold text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                            <ShoppingBag size={14} />
                            Products
                        </Link>
                        {role === 'admin' && (
                            <Link href="/dashboard/admin" className="text-sm font-bold text-emerald-500 hover:text-emerald-400 transition-colors flex items-center gap-2 uppercase tracking-tighter">
                                <ShieldAlert size={14} />
                                Admin Panel
                            </Link>
                        )}
                    </div>

                    <div className="h-6 w-px bg-white/10 hidden md:block" />

                    <LogoutButton />
                </div>
            </div>
        </nav>
    );
}
