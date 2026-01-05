import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendUserEmail(to: string, subject: string, html: string) {
    try {
        const { data, error } = await resend.emails.send({
            from: process.env.FROM_EMAIL || 'Auto Step <noreply@autostep.app>',
            to: [to],
            subject,
            html,
        });

        if (error) {
            console.error('[EMAIL ERROR]', error);
            throw error;
        }

        console.log('[EMAIL SENT]', { to, subject, id: data?.id });
        return data;
    } catch (error) {
        console.error('[EMAIL SEND FAILED]', { to, subject, error });
        throw error;
    }
}

export async function sendAdminEmail(subject: string, html: string) {
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!adminEmail) {
        console.warn('[ADMIN EMAIL] ADMIN_EMAIL not configured, skipping');
        return;
    }

    return sendUserEmail(adminEmail, subject, html);
}
