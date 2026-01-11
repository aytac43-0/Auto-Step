import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/nav'
import ProductsClient from './products-client'

export const dynamic = 'force-dynamic'

type Product = {
    id: string
    name: string
    description: string | null
}

export default async function ProductsPage() {
    const supabase = createClient()

    const { data: products } = await supabase
        .from('products')
        .select('id, name, description')
        .order('created_at', { ascending: false })

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Navbar />
            <ProductsClient initialProducts={products} />
        </main>
    )
}
