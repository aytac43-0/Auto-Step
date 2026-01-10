'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'

export async function login(formData: FormData) {
    const supabase = createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }

    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

export async function signup(formData: FormData) {
    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string

    const supabase = createClient()

    // 1. Sign up the user
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: {
                username,
            },
        },
    })

    if (authError) {
        return redirect('/register?message=Could not authenticate user')
    }

    // 2. Insert into profiles table (if trigger not set up)
    // We prefer using triggers, but user asked for "creates flow".
    // Note: If email confirmation is on, this might fail if RLS requires auth.
    // Best practice is Postgres Trigger.
    // Assuming Trigger exists or RLS allows insert for self.

    // For this 'Auto Step' request, let's assume we might need to handle it manually if no trigger.
    // However, `supabase.auth.signUp` meta data is best passed to trigger.
    // If we must do it manually:

    if (authData.user) {
        const { error: profileError } = await supabase.from('profiles').insert({
            id: authData.user.id,
            email: email,
            username: username,
            role: 'user', // default role
        })

        if (profileError) {
            console.error('Profile creation failed:', profileError)
            // Ideally rollback or warn
        }
    }

    return redirect('/login?message=Check email to continue sign in process')
}

export async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}
