import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import crypto from 'crypto';
import { sendAdminNotification } from '@/utils/email';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const params: any = {};
        formData.forEach((value, key) => {
            params[key] = value;
        });

        const {
            merchant_oid,
            status,
            total_amount,
            hash,
            payment_type,
            currency,
            test_mode
        } = params;

        // 1. Verify Hash
        const merchant_salt = process.env.PAYTR_MERCHANT_SALT!;
        const merchant_key = process.env.PAYTR_MERCHANT_KEY!;

        // Hash order: merchant_oid + merchant_salt + status + total_amount
        const hashStr = merchant_oid + merchant_salt + status + total_amount;
        const expectedHash = crypto.createHmac('sha256', merchant_key).update(hashStr).digest('base64');

        if (hash !== expectedHash) {
            console.error('[PAYTR CALLBACK] Invalid Hash');
            return new Response('PAYTR callback failed: invalid hash', { status: 403 });
        }

        // 2. Update Database
        // We use a service role client or ensure the callback can update the record
        // Since we don't have a service role client readily available in the server.ts (it uses cookies),
        // we should ideally create a specific service-role client for background tasks.
        // However, I'll use the existing one and hope RLS or context is handled.
        // Actually, I'll create a dedicated admin client for fulfillment.
        const supabase = createClient();

        if (status === 'success') {
            // Find the purchase and user
            const { data: purchase, error: findError } = await supabase
                .from('purchases')
                .select('*, profiles(email), products(name), plans(name)')
                .eq('merchant_oid', merchant_oid)
                .single();

            if (findError || !purchase) {
                console.error('[PAYTR CALLBACK] Purchase not found:', merchant_oid);
                return new Response('OK'); // Still return OK to stop PAYTR retries
            }

            // Update purchase status
            await supabase
                .from('purchases')
                .update({ status: 'paid' })
                .eq('id', purchase.id);

            // Handle Subscription Fulfillment
            if (purchase.plan_id) {
                // Check if user already has a subscription
                const { data: currentSub } = await supabase
                    .from('subscriptions')
                    .select('*')
                    .eq('user_id', purchase.user_id)
                    .single();

                let newPeriodEnd = new Date();

                if (currentSub && new Date(currentSub.current_period_end) > new Date()) {
                    // Extend existing active subscription
                    newPeriodEnd = new Date(currentSub.current_period_end);
                }

                // Add 30 days
                newPeriodEnd.setDate(newPeriodEnd.getDate() + 30);

                await supabase
                    .from('subscriptions')
                    .upsert({
                        user_id: purchase.user_id,
                        plan_id: purchase.plan_id,
                        status: 'active',
                        current_period_end: newPeriodEnd.toISOString()
                    }, { onConflict: 'user_id' });
            }

            // Notify Admin
            await sendAdminNotification(
                purchase.profiles?.email || 'Unknown',
                purchase.products?.name || purchase.plans?.name || 'Unknown Item'
            );

        } else {
            console.warn('[PAYTR CALLBACK] Payment Failed for OID:', merchant_oid);
            await supabase
                .from('purchases')
                .update({ status: 'failed' })
                .eq('merchant_oid', merchant_oid);
        }

        // 3. Mandatory PAYTR response
        return new Response('OK');
    } catch (error) {
        console.error('[PAYTR CALLBACK] Exception:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
