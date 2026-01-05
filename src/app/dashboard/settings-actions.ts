'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'

export async function updateUsername(formData: FormData) {
    const supabase = createClient()
    const username = formData.get('username') as string

    if (!username) {
        return { error: 'Username is required' }
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('user_id', user.id)

    if (error) {
        if (error.code === '23505') {
            return { error: 'Username already taken' }
        }
        return { error: error.message }
    }

    revalidatePath('/dashboard')
    return { success: true, message: 'Username updated successfully' }
}
