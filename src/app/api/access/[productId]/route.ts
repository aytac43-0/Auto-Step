import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

export async function GET(request: Request, { params }: { params: { productId: string } }) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const productId = params.productId

    // 1. Check Product Maintenance Status
    const { data: product } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single()

    if (!product || !product.access_url) {
        return new Response('Configuration Error: content not found.', { status: 404 })
    }

    if (product.status === 'inactive') {
        return new Response('Service Unavailable: This solution is currently under maintenance.', { status: 503 })
    }

    // 2. Check Purchase Status
    const { data: purchase } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .eq('status', 'paid')
        .single()

    if (!purchase) {
        return new Response('Unauthorized: Active subscription required.', { status: 403 })
    }

    // Check for suspended access
    if (purchase.status === 'suspended') {
        return new Response('Access Suspended: Please contact support.', { status: 403 })
    }

    // Redirect to the secret content
    return redirect(product.access_url)
}
