'use server'

import { createClient } from '@/lib/supabase/server'
import { sendEmail } from '@/lib/email'
import { revalidatePath } from 'next/cache'

export async function toggleProductStatus(productId: string, currentStatus: string) {
    const supabase = createClient()

    // Admin check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'admin') return { error: 'Unauthorized' }

    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'

    const { error } = await supabase
        .from('products')
        .update({ status: newStatus })
        .eq('id', productId)

    if (error) return { error: error.message }

    revalidatePath('/dashboard/admin')
    return { success: true, newStatus }
}

export async function updateUserAccess(purchaseId: string, action: 'revoke' | 'grant', userEmail: string) {
    const supabase = createClient()

    // Admin check
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
    if (profile?.role !== 'admin') return { error: 'Unauthorized' }

    const newStatus = action === 'revoke' ? 'suspended' : 'paid'

    const { error } = await supabase
        .from('purchases')
        .update({ status: newStatus })
        .eq('id', purchaseId)

    if (error) return { error: error.message }

    // Send Email
    if (action === 'revoke') {
        await sendEmail({
            to: userEmail,
            subject: 'Access Suspended - Auto Step',
            html: '<p>Your access to one or more Auto Step products has been suspended. Please contact support.</p>'
        })
    } else {
        await sendEmail({
            to: userEmail,
            subject: 'Access Granted - Auto Step',
            html: '<p>Your access has been restored. You can now access your products from the Client Portal.</p>'
        })
    }

    revalidatePath('/dashboard/admin')
    return { success: true }
}
