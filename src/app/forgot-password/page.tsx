import Link from "next/link";

export default function ForgotPassword() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
            <p className="text-muted-foreground mb-6">
                This feature is currently under maintenance. Please contact support.
            </p>
            <Link href="/login" className="text-primary hover:underline">
                Back to Login
            </Link>
        </div>
    );
}
