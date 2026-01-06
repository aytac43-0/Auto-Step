import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { updateUsername } from "./account-actions";

export default async function AccountPage() {
    const supabase = createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header / Nav */}
            <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <Link href="/dashboard" className="flex items-center gap-2 group transition-all">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg group-hover:scale-110 transition-transform" />
                        <span className="font-bold text-xl text-white">Auto Step</span>
                    </Link>
                    <Link
                        href="/"
                        className="text-sm font-medium text-slate-400 hover:text-white transition-colors"
                    >
                        Back to Home
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <h1 className="text-4xl font-bold mb-8 text-white">Account Settings</h1>

                <div className="space-y-6">
                    {/* User Profile Card */}
                    <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-3xl">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Username</h2>
                                <p className="text-2xl font-bold text-white">{profile?.username || 'Not set'}</p>
                            </div>

                            <div>
                                <h2 className="text-slate-500 text-sm font-medium mb-1 uppercase tracking-wider">Email Address</h2>
                                <p className="text-xl font-medium text-slate-300">{user.email}</p>
                                <p className="text-sm text-slate-500 mt-2">
                                    Your email is used for account security and notifications.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-slate-500 text-sm font-medium mb-3 uppercase tracking-wider">Account Type</h2>
                                <span className={`inline-flex px-4 py-1.5 rounded-xl text-sm font-bold border ${profile?.role === 'admin'
                                    ? 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                                    : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                                    }`}>
                                    {profile?.role?.toUpperCase() || 'USER'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Support Box */}
                    <div className="bg-blue-500/5 border border-blue-500/10 p-6 rounded-2xl flex items-center justify-between">
                        <div>
                            <p className="text-blue-400 font-medium">Need to change your email?</p>
                            <p className="text-slate-500 text-sm">Contact our support team for help.</p>
                        </div>
                        <Link
                            href="/contact"
                            className="text-sm font-bold text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-lg transition-colors"
                        >
                            Support
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
