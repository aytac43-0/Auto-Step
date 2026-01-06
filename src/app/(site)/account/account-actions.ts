'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function updateUsername(formData: FormData) {
    const supabase = createClient()

    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    const username = formData.get('username') as string

    if (!username || username.length < 3) {
        return redirect('/account?error=Username must be at least 3 characters')
    }

    const { error } = await supabase
        .from('profiles')
        .update({ username })
        .eq('user_id', user.id)

    if (error) {
        if (error.code === '23505') {
            return redirect('/account?error=Username already taken')
        }
        return redirect(`/account?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/account')
    revalidatePath('/dashboard')
    return redirect('/account?message=Username updated successfully')
}
