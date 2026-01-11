import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: Request, { params }: { params: { productId: string } }) {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const productId = params.productId

    // Verify ownership
    // Assuming 'purchases' table links user_id and product_id
    const { data: purchase } = await supabase
        .from('purchases')
        .select('id')
        .eq('user_id', user.id)
        .eq('product_id', productId)
        .single()

    if (!purchase) {
        return new Response('Unauthorized: You do not own this product.', { status: 403 })
    }

    // Get Product Access URL
    const { data: product } = await supabase
        .from('products')
        .select('access_url')
        .eq('id', productId)
        .single()

    if (!product || !product.access_url) {
        return new Response('Product content not found.', { status: 404 })
    }

    // Redirect to the secret content
    return redirect(product.access_url)
}
