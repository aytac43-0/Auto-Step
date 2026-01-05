'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = createClient()

    // type-safe approach
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return redirect('/login?error=Email and password are required')
    }

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const supabase = createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return redirect('/register?error=Email and password are required')
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        return redirect(`/register?error=${encodeURIComponent(error.message)}`)
    }

    // Create profile
    if (data.user) {
        const { error: profileError } = await supabase.from('profiles').insert([
            {
                user_id: data.user.id,
                email: data.user.email,
                role: 'user'
            }
        ])

        if (profileError) {
            console.error('Profile creation error:', profileError)
            // We still redirect to dashboard as auth was successful
        }
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}
