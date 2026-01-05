'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateProductUrl(productId: string, accessUrl: string) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error("Unauthorized");

    // Check if admin
    const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .single();

    if (profile?.role !== 'admin') throw new Error("Unauthorized");

    const { error } = await supabase
        .from("products")
        .update({ access_url: accessUrl })
        .eq("id", productId);

    if (error) throw new Error(error.message);

    revalidatePath("/admin");
    revalidatePath("/products");
    revalidatePath("/dashboard");
    return { success: true };
}
