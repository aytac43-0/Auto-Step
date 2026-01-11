import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) => {
    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY is missing. Email not sent.');
        return;
    }

    try {
        const { data, error } = await resend.emails.send({
            from: 'Auto Step <system@autostep.io>', // Update with verify domain
            to: [to],
            subject: subject,
            html: html,
        });

        if (error) {
            console.error('Email error:', error);
            return { error };
        }

        return { data };
    } catch (error) {
        console.error('Resend Exception:', error);
        return { error };
    }
};
