import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect('/login')
    }

    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()

    if (profile?.role !== 'admin') {
        return (
            <div className="container py-20 text-center">
                <h1 className="text-2xl font-bold text-destructive">Access Denied</h1>
                <p className="text-muted-foreground mt-2">You do not have permission to view this page.</p>
            </div>
        )
    }

    // Admin stats (Placeholder)
    return (
        <div className="container py-10">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
            <div className="grid gap-4 md:grid-cols-3">
                <div className="p-6 rounded-lg border bg-card">
                    <h3 className="font-medium text-sm text-muted-foreground">Total Users</h3>
                    <p className="text-2xl font-bold mt-2">--</p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                    <h3 className="font-medium text-sm text-muted-foreground">Active Products</h3>
                    <p className="text-2xl font-bold mt-2">--</p>
                </div>
                <div className="p-6 rounded-lg border bg-card">
                    <h3 className="font-medium text-sm text-muted-foreground">Total Sales</h3>
                    <p className="text-2xl font-bold mt-2">$ --</p>
                </div>
            </div>
        </div>
    )
}
