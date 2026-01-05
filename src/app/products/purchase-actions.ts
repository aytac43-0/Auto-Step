'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import { sendAdminNotification } from '@/utils/email'

export async function purchaseProduct(productId: string, productName: string) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
        return { error: 'You must be logged in to make a purchase' }
    }

    // Record the purchase
    const { error } = await supabase.from('purchases').insert([
        {
            user_id: user.id,
            product_id: productId
        }
    ])

    if (error) {
        return { error: error.message }
    }

    // Notify admin
    await sendAdminNotification(user.email!, productName)

    revalidatePath('/products')
    revalidatePath('/dashboard')
    revalidatePath('/admin')

    return { success: true, message: `Successfully purchased ${productName}!` }
}
