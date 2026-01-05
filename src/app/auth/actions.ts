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
    const confirmPassword = formData.get('confirmPassword') as string
    const username = formData.get('username') as string
    const acceptTerms = formData.get('acceptTerms') as string

    if (!email || !password || !username) {
        return redirect('/register?error=All fields are required')
    }

    if (password !== confirmPassword) {
        return redirect('/register?error=Passwords do not match')
    }

    if (!acceptTerms) {
        return redirect('/register?error=You must accept the terms and privacy policy')
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                username: username
            }
        }
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
                username: username,
                role: 'user'
            }
        ])

        if (profileError) {
            console.error('Profile creation error:', profileError)
            if (profileError.code === '23505') {
                return redirect('/register?error=Username already taken')
            }
        }
    }

    revalidatePath('/', 'layout')
    redirect(`/auth/verify-email?email=${email}`)
}

export async function forgotPassword(formData: FormData) {
    const supabase = createClient()
    const email = formData.get('email') as string

    if (!email) {
        return redirect('/auth/forgot-password?error=Email is required')
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    })

    if (error) {
        return redirect(`/auth/forgot-password?error=${encodeURIComponent(error.message)}`)
    }

    return redirect('/auth/forgot-password?message=Check your email for the reset link')
}

export async function updatePassword(formData: FormData) {
    const supabase = createClient()
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string

    if (!password || !confirmPassword) {
        return redirect('/auth/reset-password?error=Passwords are required')
    }

    if (password !== confirmPassword) {
        return redirect('/auth/reset-password?error=Passwords do not match')
    }

    const { error } = await supabase.auth.updateUser({
        password,
    })

    if (error) {
        return redirect(`/auth/reset-password?error=${encodeURIComponent(error.message)}`)
    }

    return redirect('/login?message=Password updated successfully. Please login.')
}

export async function logout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    revalidatePath('/', 'layout')
    redirect('/')
}
