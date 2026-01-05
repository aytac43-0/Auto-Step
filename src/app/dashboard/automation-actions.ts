'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function createAutomation(formData: FormData) {
    const supabase = createClient()
    const name = formData.get('name') as string

    if (!name) {
        return { error: 'Name is required' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase.from('automations').insert([
        {
            user_id: user.id,
            name: name,
            status: 'active'
        }
    ])

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function toggleAutomationStatus(id: string, currentStatus: string) {
    const supabase = createClient()
    const newStatus = currentStatus === 'active' ? 'paused' : 'active'

    const { error } = await supabase
        .from('automations')
        .update({ status: newStatus })
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}

export async function deleteAutomation(id: string) {
    const supabase = createClient()

    const { error } = await supabase
        .from('automations')
        .delete()
        .eq('id', id)

    if (error) {
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true }
}
