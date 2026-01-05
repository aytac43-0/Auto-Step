import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(
    request: Request,
    { params }: { params: { productId: string } }
) {
    const supabase = createClient();

    // 1. Authenticate user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // 2. Fetch product (admin-only fields)
    const { data: product, error: productError } = await supabase
        .from("products")
        .select("id, access_url")
        .eq("id", params.productId)
        .single();

    if (productError || !product || !product.access_url) {
        return redirect("/products");
    }

    // 3. Check if user has purchased this product
    const { data: purchase } = await supabase
        .from("purchases")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", params.productId)
        .eq("status", "paid")
        .single();

    if (!purchase) {
        return redirect("/products");
    }

    // 4. Check subscription status
    const { data: subscription } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .single();

    // Validate subscription is active or in grace period
    const isSubscriptionValid = subscription &&
        (subscription.status === 'active' || subscription.status === 'grace') &&
        new Date(subscription.current_period_end) > new Date();

    // If no valid subscription, redirect to expired page
    if (!isSubscriptionValid) {
        return redirect("/purchase/expired");
    }

    // 5. All checks passed - redirect to product URL
    return redirect(product.access_url);
}
