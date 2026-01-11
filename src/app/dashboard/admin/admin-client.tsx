'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Users, ShoppingCart, Package } from 'lucide-react'

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

        const { error } = await supabase
            .from('products')
            .insert({
                name: productName,
                description: productDesc,
                access_url: accessUrl,
            })

        if (error) {
            toast.error('Error creating product')
        } else {
            toast.success('Product created successfully!')
            setProductName('')
            setProductDesc('')
            setAccessUrl('')
            fetchData()
        }
        setIsSubmitting(false)
    }

    const deleteProduct = async (id: string) => {
        if (!confirm('Are you sure?')) return

        const { error } = await supabase.from('products').delete().eq('id', id)
        if (!error) {
            toast.success('Product deleted')
            fetchData()
        } else {
            toast.error('Could not delete product')
        }
    }

    if (!isAdmin && loading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Checking permissions...</div>
    if (!isAdmin) return null // Will redirect

    return (
        <div className="container py-10 max-w-5xl">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Dashboard</h1>

            {/* Stats Row */}
            <div className="grid gap-4 md:grid-cols-3 mb-8">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Total Revenue</span>
                        <span className="text-brand-blue font-bold text-xl">$---</span>
                    </div>
                    <div className="text-xs text-muted-foreground">+0% from last month</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Active Products</span>
                        <span className="text-brand-blue font-bold text-xl">{products.length}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Currently listed</div>
                </div>
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6 flex flex-col space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-muted-foreground">Total Sales</span>
                        <span className="text-brand-blue font-bold text-xl">{purchases.length}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">Lifetime transactions</div>
                </div>
            </div>

            <div className="flex space-x-1 mb-8 border-b border-border pb-4 overflow-x-auto">
                {['products', 'create', 'purchases'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${activeTab === tab ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted'}`}
                    >
                        {tab === 'products' ? 'Manage Products' : tab === 'create' ? 'Create Product' : 'View Purchases'}
                    </button>
                ))}
            </div>

            <div className="min-h-[400px]">
                {activeTab === 'products' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="grid gap-4">
                            {products.map(product => (
                                <motion.div
                                    whileHover={{ scale: 1.01 }}
                                    key={product.id} className="flex items-center justify-between p-4 border rounded-lg bg-card text-card-foreground shadow-sm transition-colors"
                                >
                                    <div>
                                        <h3 className="font-bold">{product.name}</h3>
                                        <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                                        <div className="text-xs text-brand-blue mt-1">Access: {product.access_url}</div>
                                    </div>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 rounded px-3 py-1 transition-colors"
                                    >
                                        Delete
                                    </button>
                                </motion.div>
                            ))}
                            {products.length === 0 && <p className="text-muted-foreground text-center py-10">No products found.</p>}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'create' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto">
                        <form onSubmit={handleCreateProduct} className="space-y-4 bg-card p-6 rounded-lg border shadow-sm">
                            <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                            <div>
                                <label className="block text-sm font-medium mb-1">Product Name</label>
                                <input
                                    type="text"
                                    required
                                    value={productName}
                                    onChange={e => setProductName(e.target.value)}
                                    className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all focus:scale-[1.01]"
                                    placeholder="E.g. SEO Masterclass"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Description</label>
                                <textarea
                                    required
                                    value={productDesc}
                                    onChange={e => setProductDesc(e.target.value)}
                                    className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all focus:scale-[1.01]"
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
                                    className="w-full rounded-md border border-input bg-background/50 px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all focus:scale-[1.01]"
                                    placeholder="https://drive.google.com/..."
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                    The secure link sent to buyers.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-all"
                            >
                                {isSubmitting ? 'Creating...' : 'Create Product'}
                            </motion.button>
                        </form>
                    </motion.div>
                )}

                {activeTab === 'purchases' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="rounded-md border overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-muted text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Date</th>
                                        <th className="px-4 py-3 font-medium">Customer</th>
                                        <th className="px-4 py-3 font-medium">Product</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border bg-card">
                                    {purchases.map((purchase, i) => (
                                        <tr key={i} className="hover:bg-muted/50 transition-colors">
                                            <td className="px-4 py-3">{new Date(purchase.created_at).toLocaleDateString()}</td>
                                            <td className="px-4 py-3">{purchase.user_email}</td>
                                            <td className="px-4 py-3 font-medium">{purchase.product_name}</td>
                                        </tr>
                                    ))}
                                    {purchases.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="px-4 py-12 text-center text-muted-foreground">
                                                No purchases found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    )
}
