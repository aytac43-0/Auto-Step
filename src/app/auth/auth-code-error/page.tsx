import Link from 'next/link'

export default function AuthErrorPage() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
            <div className="max-w-md text-center p-8">
                <h1 className="text-4xl font-bold mb-4">Authentication Error</h1>
                <p className="text-muted-foreground mb-8">
                    There was an error verifying your email or logging you in. The link may have expired or is invalid.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/login"
                        className="block w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                    >
                        Return to Login
                    </Link>
                    <Link
                        href="/register"
                        className="block w-full rounded-md border border-input bg-transparent px-4 py-2 text-sm font-medium hover:bg-muted"
                    >
                        Try Registering Again
                    </Link>
                </div>
            </div>
        </div>
    )
}
