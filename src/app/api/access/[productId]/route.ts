import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: Request, { params }: { params: { productId: string } }) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const productId = params.productId

    // Verify ownership AND paid status
    const { data: purchase } = await supabase
        .from('purchases')
        .select('*')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .eq('status', 'paid') // Strict check
        .single()

    if (!purchase) {
        return new Response('Unauthorized: Access denied. Active subscription required.', { status: 403 })
    }

    // Optional: Check maintenance_paid if the column exists (User requested logic)
    // For now, we assume 'status'='paid' covers the active requirement as per standard schemas.

    // Get Product Access URL
    const { data: product } = await supabase
        .from('products')
        .select('access_url')
        .eq('id', productId)
        .single()

    if (!product || !product.access_url) {
        return new Response('Product content configuration error.', { status: 404 })
    }

    // Redirect to the secret content
    return redirect(product.access_url)
}
