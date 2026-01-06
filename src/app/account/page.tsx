import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
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
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <h1 className="text-4xl font-bold mb-8">Account Settings</h1>

                <div className="space-y-8">
                    {/* Email Section */}
                    <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl">
                        <h2 className="text-xl font-bold mb-4">Email Address</h2>
                        <p className="text-slate-400">{user.email}</p>
                        <p className="text-sm text-slate-500 mt-2">
                            Email cannot be changed. Contact support if needed.
                        </p>
                    </div>

                    {/* Username Section */}
                    <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl">
                        <h2 className="text-xl font-bold mb-4">Username</h2>
                        <form action={updateUsername} className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    name="username"
                                    defaultValue={profile?.username}
                                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                    placeholder="Enter username"
                                    required
                                    minLength={3}
                                />
                                <p className="text-sm text-slate-500 mt-2">
                                    Minimum 3 characters, must be unique
                                </p>
                            </div>
                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-colors"
                            >
                                Update Username
                            </button>
                        </form>
                    </div>

                    {/* Role Section */}
                    <div className="bg-slate-900/30 border border-slate-800 p-6 rounded-2xl">
                        <h2 className="text-xl font-bold mb-4">Account Type</h2>
                        <span className={`px-3 py-1 rounded-full text-sm font-bold ${profile?.role === 'admin'
                                ? 'bg-amber-500/10 text-amber-500'
                                : 'bg-blue-500/10 text-blue-500'
                            }`}>
                            {profile?.role?.toUpperCase()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
