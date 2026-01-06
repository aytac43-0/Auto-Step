import { createClient } from '@/utils/supabase/server'

export async function getCurrentProfile() {
    const supabase = createClient()

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser()

    if (!user || authError) return null

    const { data: profile } = await supabase
        .from('profiles')
        .select('user_id, email, role, username')
        .eq('user_id', user.id)
        .single()

    return profile
}
