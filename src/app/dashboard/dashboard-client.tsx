'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Profile = {
    username: string | null
    role: string
}

type Product = {
    id: string
    name: string
    description: string | null
    access_url: string | null
}

export default function DashboardClient() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                return router.push('/login')
            }

            // Fetch Profile
            const { data: profileData } = await supabase
                .from('profiles')
                .select('username, role')
                .eq('id', user.id)
                .single()

            if (profileData) {
                setProfile(profileData)
            }

            // Fetch Purchases
            const { data: purchasesData } = await supabase
                .from('purchases')
                .select(`
          product_id,
          products (
            id,
            name,
            description,
            access_url
          )
        `)
                .eq('user_id', user.id)

            if (purchasesData) {
                const mappedProducts = purchasesData.map((p: any) => p.products).filter(Boolean)
                setProducts(mappedProducts)
            }

            setLoading(false)
        }

        getData()
    }, [router, supabase])

    if (loading) {
        return <div className="p-8 text-center text-muted-foreground">Loading dashboard...</div>
    }

    return (
        <div className="container py-10">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Hello, {profile?.username || 'User'}
                </h1>
                {profile?.role === 'admin' && (
                    <div className="mt-2">
                        <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs font-bold uppercase tracking-wider">
                            Admin Account
                        </span>
                    </div>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.length === 0 ? (
                    <div className="col-span-full text-center py-12 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">You haven't purchased any products yet.</p>
                    </div>
                ) : (
                    products.map((product) => (
                        <div key={product.id} className="rounded-lg border bg-card text-card-foreground shadow-sm">
                            <div className="p-6 space-y-2">
                                <h3 className="text-xl font-semibold leading-none tracking-tight">{product.name}</h3>
                                <p className="text-sm text-muted-foreground">{product.description}</p>
                            </div>
                            <div className="p-6 pt-0">
                                {product.access_url ? (
                                    <a href={product.access_url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-4 py-2 w-full">
                                        Access Content
                                    </a>
                                ) : (
                                    <button disabled className="w-full inline-flex items-center justify-center rounded-md text-sm font-medium bg-muted text-muted-foreground h-10 px-4 py-2 cursor-not-allowed">
                                        Coming Soon
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}
