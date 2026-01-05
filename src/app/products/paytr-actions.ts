'use server'

import { createClient } from '@/utils/supabase/server'
import { generatePaytrToken } from '@/utils/paytr'
import { headers } from 'next/headers'

export async function getPaytrToken(productId: string, productName: string, price: number) {
    const supabase = createClient()
    const headerList = headers()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return { error: 'Unauthorized' }

    // 1. Create a pending purchase record to get a merchant_oid
    const { data: purchase, error: purchaseError } = await supabase
        .from('purchases')
        .insert([{
            user_id: user.id,
            product_id: productId,
            status: 'pending'
        }])
        .select()
        .single()

    if (purchaseError) return { error: 'Failed to initialize purchase' }

    const merchant_oid = purchase.id // Using UUID as OID

    // Update the merchant_oid in the record
    await supabase.from('purchases').update({ merchant_oid }).eq('id', purchase.id)

    // 2. Prepare PAYTR parameters
    const merchant_id = process.env.PAYTR_MERCHANT_ID!
    const merchant_key = process.env.PAYTR_MERCHANT_KEY!
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT!

    const user_ip = headerList.get('x-forwarded-for') || headerList.get('x-real-ip') || '127.0.0.1'
    const email = user.email!
    const payment_amount = Math.round(price * 100) // PAYTR expects kuruş
    const user_basket = [[productName, price.toString(), '1']]
    const no_installment = '1' // 1 for no installments
    const max_installment = '0'
    const currency = 'TRY'
    const test_mode = '1' // Initially 1 for testing

    const { paytr_token, user_basket: user_basket_base64 } = generatePaytrToken({
        merchant_id,
        user_ip,
        merchant_oid,
        email,
        payment_amount,
        user_basket,
        no_installment,
        max_installment,
        currency,
        test_mode,
        merchant_key,
        merchant_salt
    })

    // 3. Return parameters for PAYTR iframe/redirect
    return {
        success: true,
        paytr_params: {
            merchant_id,
            user_ip,
            merchant_oid,
            email,
            payment_amount,
            paytr_token,
            user_basket: user_basket_base64,
            no_installment,
            max_installment,
            currency,
            test_mode,
            merchant_ok_url: `${process.env.NEXT_PUBLIC_SITE_URL}/purchase/success`,
            merchant_fail_url: `${process.env.NEXT_PUBLIC_SITE_URL}/purchase/fail`,
        }
    }
}
