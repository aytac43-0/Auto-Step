'use client'

import { createClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import { Users, ShoppingCart, Package, AlertTriangle, CheckCircle, XCircle } from 'lucide-react'
import { toggleProductStatus, updateUserAccess } from '@/app/auth/admin-actions'

type Product = {
    id: string
    name: string
    description: string | null
    access_url: string | null
    status: string // 'active' | 'inactive'
    created_at: string
}

type Purchase = {
    id: string
    user_email: string
    product_name: string
    status: string
    created_at: string
}

export default function AdminClient() {
    const [activeTab, setActiveTab] = useState<'products' | 'create' | 'purchases'>('products')
    const [products, setProducts] = useState<Product[]>([])
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        const { data: productsData } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false })

        if (productsData) setProducts(productsData as any)

        const { data: purchasesData } = await supabase
            .from('purchases')
            .select(`
                id, status, created_at,
                profiles (email),
                products (name)
            `)
            .order('created_at', { ascending: false })

        if (purchasesData) {
            const formattedPurchases = purchasesData.map((p: any) => ({
                id: p.id,
                user_email: p.profiles?.email || 'Unknown',
                product_name: p.products?.name || 'Unknown',
                status: p.status || 'pending',
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
                status: 'active'
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

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const res = await toggleProductStatus(id, currentStatus)
        if (res.error) {
            toast.error(res.error)
        } else {
            toast.success(`Product ${res.newStatus}`)
            fetchData()
        }
    }

    const handleAccess = async (purchaseId: string, action: 'grant' | 'revoke', email: string) => {
        const res = await updateUserAccess(purchaseId, action, email)
        if (res.error) {
            toast.error(res.error)
        } else {
            toast.success(`Access ${action}ed`)
            fetchData()
        }
    }

    if (!isAdmin && loading) return <div className="p-8 text-center text-muted-foreground animate-pulse">Checking permissions...</div>
    if (!isAdmin) return null

    return (
        <div className="container py-10 max-w-5xl">
            <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Console</h1>

            <div className="flex space-x-1 mb-8 border-b border-white/10 pb-4 overflow-x-auto">
                {['products', 'create', 'purchases'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize ${activeTab === tab ? 'bg-primary text-white' : 'text-muted-foreground hover:text-white hover:bg-white/5'}`}
                    >
                        {tab === 'products' ? 'Manage Solutions' : tab === 'create' ? 'Deploy New' : 'Access Logs'}
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
                                    key={product.id} className="glass-card flex items-center justify-between p-4 rounded-lg transition-colors border-l-4 border-l-primary"
                                >
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-white">{product.name}</h3>
                                            <span className={`text-[10px] px-2 py-0.5 rounded uppercase font-bold ${product.status === 'active' ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                                {product.status || 'ACTIVE'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-muted-foreground line-clamp-1">{product.description}</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => handleToggleStatus(product.id, product.status || 'active')}
                                            className="text-xs font-medium bg-secondary text-white hover:bg-white/10 rounded px-3 py-2 transition-colors"
                                        >
                                            {product.status === 'active' ? 'Deactivate' : 'Activate'}
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                            {products.length === 0 && <p className="text-muted-foreground text-center py-10">No solutions deployed.</p>}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'create' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-xl mx-auto">
                        <form onSubmit={handleCreateProduct} className="space-y-4 glass-card p-6 rounded-lg">
                            <h2 className="text-xl font-semibold mb-4 text-white">Deploy New Solution</h2>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-400">Solution Name</label>
                                <input
                                    type="text"
                                    required
                                    value={productName}
                                    onChange={e => setProductName(e.target.value)}
                                    className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light text-white"
                                    placeholder="E.g. Enterprise SEO Engine"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-400">Capabilities</label>
                                <textarea
                                    required
                                    value={productDesc}
                                    onChange={e => setProductDesc(e.target.value)}
                                    className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light text-white"
                                    rows={3}
                                    placeholder="Technical description..."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-400">Access Endpoint (Private)</label>
                                <input
                                    type="url"
                                    required
                                    value={accessUrl}
                                    onChange={e => setAccessUrl(e.target.value)}
                                    className="w-full rounded-md border border-white/10 bg-black/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-light text-white"
                                    placeholder="https://..."
                                />
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 disabled:opacity-50 transition-all shadow-lg shadow-primary/20"
                            >
                                {isSubmitting ? 'Deploying...' : 'Deploy Solution'}
                            </motion.button>
                        </form>
                    </motion.div>
                )}

                {activeTab === 'purchases' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                        <div className="rounded-md border border-white/10 overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-surface text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3 font-medium">Timestamp</th>
                                        <th className="px-4 py-3 font-medium">Client</th>
                                        <th className="px-4 py-3 font-medium">Solution</th>
                                        <th className="px-4 py-3 font-medium">Status</th>
                                        <th className="px-4 py-3 font-medium">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 bg-black/20">
                                    {purchases.map((purchase, i) => (
                                        <tr key={i} className="hover:bg-white/5 transition-colors">
                                            <td className="px-4 py-3 text-gray-400">{new Date(purchase.created_at).toLocaleDateString()}</td>
                                            <td className="px-4 py-3 text-white">{purchase.user_email}</td>
                                            <td className="px-4 py-3 font-medium text-white">{purchase.product_name}</td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${purchase.status === 'paid' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                    {purchase.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3 flex gap-2">
                                                {purchase.status === 'paid' ? (
                                                    <button
                                                        onClick={() => handleAccess(purchase.id, 'revoke', purchase.user_email)}
                                                        className="p-1 hover:bg-red-500/20 text-red-500 rounded" title="Revoke Access"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleAccess(purchase.id, 'grant', purchase.user_email)}
                                                        className="p-1 hover:bg-green-500/20 text-green-500 rounded" title="Grant Access"
                                                    >
                                                        <CheckCircle className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {purchases.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="px-4 py-12 text-center text-muted-foreground">
                                                No access records found.
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
