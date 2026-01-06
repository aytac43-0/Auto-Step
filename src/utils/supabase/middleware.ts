import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
    let response = NextResponse.next({
        request: {
            headers: request.headers,
        },
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                get(name: string) {
                    return request.cookies.get(name)?.value;
                },
                set(name: string, value: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value,
                        ...options,
                    });
                },
                remove(name: string, options: CookieOptions) {
                    request.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                    response = NextResponse.next({
                        request: {
                            headers: request.headers,
                        },
                    });
                    response.cookies.set({
                        name,
                        value: "",
                        ...options,
                    });
                },
            },
        }
    );

    const { data: { user } } = await supabase.auth.getUser();

    // Protection logic
    const { pathname } = request.nextUrl;

    // 1. Logged out users: Redirect to login if accessing protected routes
    if (!user && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    // 2. Logged in users: Verification & Auth page logic
    if (user) {
        const isEmailVerified = !!user.email_confirmed_at;

        // Redirect unverified users away from dashboard/admin (unless on verification notice page)
        if (!isEmailVerified && (pathname.startsWith("/dashboard") || pathname.startsWith("/admin"))) {
            if (pathname !== "/auth/verify-email") {
                return NextResponse.redirect(new URL(`/auth/verify-email?email=${user.email}`, request.url));
            }
        }

        // Redirect verified users away from login/register
        if (isEmailVerified && (pathname === "/login" || pathname === "/register")) {
            return NextResponse.redirect(new URL("/dashboard", request.url));
        }

        // 3. Subscription Enforcement - ONLY for /access/* routes
        // Dashboard and admin are accessible to FREE users (no subscription)
        if (pathname.startsWith("/access/")) {
            const { data: subscription } = await supabase
                .from("subscriptions")
                .select("*")
                .eq("user_id", user.id)
                .single();

            // Check if subscription exists and is valid
            // FREE users (no subscription) will be blocked from /access/* routes
            const isSubscriptionValid = subscription &&
                (subscription.status === 'active' || subscription.status === 'grace') &&
                new Date(subscription.current_period_end) > new Date();

            if (!isSubscriptionValid) {
                return NextResponse.redirect(new URL("/purchase/expired", request.url));
            }
        }

        // Admin protection is handled at the page level in src/app/dashboard/admin/page.tsx
        // and in the dashboard layout for general auth state.
    }

    return response;
}
