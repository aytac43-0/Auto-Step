import crypto from 'crypto';

export function generatePaytrHash(params: string, merchant_salt: string, merchant_key: string): string {
    const hashStr = params + merchant_salt;
    return crypto.createHmac('sha256', merchant_key).update(hashStr).digest('base64');
}

export function generatePaytrToken(params: any) {
    const {
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
        merchant_ok_url,
        merchant_fail_url,
        merchant_key,
        merchant_salt
    } = params;

    const user_basket_base64 = Buffer.from(JSON.stringify(user_basket)).toString('base64');

    // PAYTR specific hash order: 
    // merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket + no_installment + max_installment + currency + test_mode
    const hashParams = merchant_id + user_ip + merchant_oid + email + payment_amount + user_basket_base64 + no_installment + max_installment + currency + test_mode;
    const paytr_token = generatePaytrHash(hashParams, merchant_salt, merchant_key);

    return {
        paytr_token,
        user_basket: user_basket_base64
    };
}
