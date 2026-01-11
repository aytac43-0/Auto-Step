'use client'

import { login } from '@/app/auth/actions'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import { Suspense, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'sonner'

export const dynamic = 'force-dynamic'

function LoginForm() {
    const searchParams = useSearchParams()
    const router = useRouter()

    // Auto-show toast from URL params
    useEffect(() => {
        const msg = searchParams.get('message')
        if (msg) {
            if (msg.includes('Could not')) toast.error(msg)
            else toast.info(msg)
        }
    }, [searchParams])

    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (formData: FormData) => {
        setIsLoading(true)

        try {
            const result = await login(formData)

            if (result?.error) {
                toast.error(result.error)
                setIsLoading(false)
            } else {
                toast.success('Login successful! Redirecting...')

                // Force hard refresh to clear any stale cache
                router.refresh()
                // Use window.location.href for immediate hard redirect
                window.location.href = '/dashboard'
            }
        } catch (err) {
            toast.error('An unexpected error occurred.')
            setIsLoading(false)
        }
    }

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-8 min-h-screen bg-background text-foreground">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md space-y-8"
            >
                <div>
                    <Link href="/" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors mb-8 inline-block">
                        &larr; Back to Home
                    </Link>
                    <div className="text-center">
                        <h2 className="mt-2 text-3xl font-bold tracking-tight">
                            Sign in to Auto-Step
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Access your dashboard and manage your products
                        </p>
                    </div>
                </div>

                <form className="mt-8 space-y-6" action={handleSubmit}>
                    <div className="rounded-md shadow-sm space-y-4">
                        <div>
                            <label htmlFor="email" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-md border border-input bg-transparent py-2 px-3 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-all duration-200 focus:scale-[1.01]"
                                placeholder="Email address"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-md border border-input bg-transparent py-2 px-3 text-foreground placeholder-muted-foreground focus:z-10 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary sm:text-sm transition-all duration-200 focus:scale-[1.01]"
                                placeholder="Password"
                            />
                            <div className="text-right mt-1">
                                <Link href="/forgot-password" className="text-xs font-medium text-primary hover:text-primary/80 transition-colors">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div>
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={isLoading}
                            className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary py-2 px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : (
                                'Sign in'
                            )}
                        </motion.button>
                    </div>

                    <div className="text-center text-sm">
                        <Link href="/register" className="font-medium text-primary hover:text-primary/80 transition-colors">
                            Don't have an account? Sign up
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    )
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}
