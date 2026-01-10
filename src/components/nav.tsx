import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/auth/actions";

export default async function Navbar() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 max-w-screen-2xl items-center">
                <Link href="/" className="mr-6 flex items-center space-x-2">
                    <span className="hidden font-bold sm:inline-block">Auto-Step</span>
                </Link>
                <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                    <div className="w-full flex-1 md:w-auto md:flex-none">
                        {/* Add search or other nav items here */}
                    </div>
                    <nav className="flex items-center gap-4">
                        {user ? (
                            <>
                                <Link
                                    href="/dashboard"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                >
                                    Dashboard
                                </Link>
                                <form action={logout}>
                                    <button
                                        className="text-sm font-medium transition-colors hover:text-destructive"
                                    >
                                        Logout
                                    </button>
                                </form>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/register"
                                    className="text-sm font-medium transition-colors hover:text-primary"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </nav>
    );
}
