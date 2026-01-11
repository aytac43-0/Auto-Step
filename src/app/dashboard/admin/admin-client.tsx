'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type Product = {
    id: string
    name: string
    description: string | null
    access_url: string | null
    created_at: string
}

type Purchase = {
    user_email: string
    product_name: string
    created_at: string
}

export default function AdminClient() {
    const [activeTab, setActiveTab] = useState<'products' | 'create' | 'purchases'>('products')
    const [products, setProducts] = useState<Product[]>([])
    const [purchases, setPurchases] = useState<Purchase[]>([])
    const [loading, setLoading] = useState(true)
    const [isAdmin, setIsAdmin] = useState(false)

    // Form State
    const [productName, setProductName] = useState('')
    const [productDesc, setProductDesc] = useState('')
    const [accessUrl, setAccessUrl] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [message, setMessage] = useState('')

    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        checkAdmin()
    }, [])

    const checkAdmin = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return router.push('/login')

        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single()

        if (profile?.role !== 'admin') {
            return router.push('/dashboard')
        }

        setIsAdmin(true)
        fetchData()
    }

    const fetchData = async () => {
        setLoading(true)
        // Fetch Products
        const { data: productsData } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })

        if (productsData) setProducts(productsData)

        // Fetch Purchases (Mock or Real join)
        const { data: purchasesData } = await supabase
            .from('purchases')
            .select(`
                created_at,
                profiles (email),
                products (name)
            `)
            .order('created_at', { ascending: false })

        if (purchasesData) {
            const formattedPurchases = purchasesData.map((p: any) => ({
                user_email: p.profiles?.email || 'Unknown',
                product_name: p.products?.name || 'Unknown',
                created_at: p.created_at
            }))
            setPurchases(formattedPurchases)
        }

        setLoading(false)
    }

    const handleCreateProduct = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)
        setMessage('')

        const { error } = await supabase
            .from('products')
            .insert({
                name: productName,
                description: productDesc,
                access_url: accessUrl,
            })

        if (error) {
            setMessage('Error creating product')
        } else {
            setMessage('Product created successfully!')
            setProductName('')
            setProductDesc('')
            setAccessUrl('')
            fetchData() // Refresh list
        }
        setIsSubmitting(false)
    }

    const deleteProduct = async (id: string) => {
        if (!confirm('Are you sure?')) return

        const { error } = await supabase.from('products').delete().eq('id', id)
        if (!error) {
            fetchData()
        }
    }

    if (!isAdmin && loading) return <div className="p-8 text-center text-muted-foreground">Checking permissions...</div>
    if (!isAdmin) return null // Will redirect

    return (
        <div className="container py-10 max-w-5xl">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Dashboard</h1>

            <div className="flex space-x-4 mb-8 border-b border-border pb-4">
                <button
                    onClick={() => setActiveTab('products')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'products' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Manage Products
                </button>
                <button
                    onClick={() => setActiveTab('create')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'create' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    Create Product
                </button>
                <button
                    onClick={() => setActiveTab('purchases')}
                    className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === 'purchases' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                >
                    View Purchases
                </button>
            </div>

            {activeTab === 'products' && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">All Products</h2>
                    <div className="grid gap-4">
                        {products.map(product => (
                            <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm">
                                <div>
                                    <h3 className="font-bold">{product.name}</h3>
                                    <p className="text-sm text-muted-foreground">{product.description}</p>
                                    <div className="text-xs text-brand-blue mt-1">Access: {product.access_url}</div>
                                </div>
                                <button
                                    onClick={() => deleteProduct(product.id)}
                                    className="text-sm text-destructive hover:underline px-3 py-1"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                        {products.length === 0 && <p className="text-muted-foreground">No products found.</p>}
                    </div>
                </div>
            )}

            {activeTab === 'create' && (
                <div className="max-w-xl">
                    <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                    <form onSubmit={handleCreateProduct} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Product Name</label>
                            <input
                                type="text"
                                required
                                value={productName}
                                onChange={e => setProductName(e.target.value)}
                                className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="E.g. SEO Masterclass"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea
                                required
                                value={productDesc}
                                onChange={e => setProductDesc(e.target.value)}
                                className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                rows={3}
                                placeholder="Product details..."
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Access URL (Private)</label>
                            <input
                                type="url"
                                required
                                value={accessUrl}
                                onChange={e => setAccessUrl(e.target.value)}
                                className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                placeholder="https://drive.google.com/..."
                            />
                            <p className="text-xs text-muted-foreground mt-1">
                                This is the link users will be redirected to after purchase validation.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Creating...' : 'Create Product'}
                        </button>

                        {message && (
                            <p className={`text-sm ${message.includes('success') ? 'text-green-500' : 'text-destructive'}`}>
                                {message}
                            </p>
                        )}
                    </form>
                </div>
            )}

            {activeTab === 'purchases' && (
                <div className="space-y-4">
                    <h2 className="text-xl font-semibold mb-4">Customer Transactions</h2>
                    <div className="rounded-md border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted text-muted-foreground">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Date</th>
                                    <th className="px-4 py-3 font-medium">Customer</th>
                                    <th className="px-4 py-3 font-medium">Product</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {purchases.map((purchase, i) => (
                                    <tr key={i} className="bg-card">
                                        <td className="px-4 py-3">{new Date(purchase.created_at).toLocaleDateString()}</td>
                                        <td className="px-4 py-3">{purchase.user_email}</td>
                                        <td className="px-4 py-3 font-medium">{purchase.product_name}</td>
                                    </tr>
                                ))}
                                {purchases.length === 0 && (
                                    <tr>
                                        <td colSpan={3} className="px-4 py-8 text-center text-muted-foreground">
                                            No purchases found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}
