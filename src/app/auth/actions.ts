'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { headers } from 'next/headers'
import { sendEmail } from '@/lib/email'

export async function login(formData: FormData) {
    const supabase = createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return { error: 'Could not authenticate user' }
    }

    revalidatePath('/', 'layout')
    return { success: true }
}

export async function signup(formData: FormData) {
    // Use origin from headers, or fallback to site URL, or localhost
    const origin = headers().get('origin') || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const username = formData.get('username') as string

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
            data: {
                username: username,
            },
        },
    })

    if (error) {
        console.error('Signup error:', error)
        return { error: 'Could not authenticate user' }
    }

    // Send Welcome Email
    await sendEmail({
        to: email,
        subject: 'Welcome to Auto Step Professional Studio',
        html: `
            <div style="font-family: sans-serif; color: #333;">
                <h1>Welcome into the ecosystem.</h1>
                <p>Your account has been created successfully.</p>
                <p>To access your professional dashboard, please verify your email address.</p>
                <p><i>Auto Step - Professional Automation Solutions</i></p>
            </div>
        `
    })

    return { success: true, message: 'Check email to continue sign in process' }
}

export async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/login')
}
