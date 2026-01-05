import { sendUserEmail, sendAdminEmail } from './resend';
import { getPaymentFailedTemplate, getReminderTemplate, getFinalWarningTemplate, getAdminAlertTemplate } from './email-templates';

export async function sendGraceNotification(userEmail: string, planName: string, daysRemaining: number) {
    console.log(`[GRACE NOTIFICATION] Day ${3 - daysRemaining} - Sending to ${userEmail} for ${planName}`);

    const subject = `Payment Required - ${daysRemaining} days remaining`;
    const html = getPaymentFailedTemplate(planName, daysRemaining);

    await sendUserEmail(userEmail, subject, html);
}

export async function sendGraceReminder(userEmail: string, planName: string, daysRemaining: number) {
    console.log(`[GRACE REMINDER] Sending to ${userEmail} for ${planName}`);

    const subject = `⚠️ Reminder: ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining`;
    const html = getReminderTemplate(planName, daysRemaining);

    await sendUserEmail(userEmail, subject, html);
}

export async function sendGraceFinalWarning(userEmail: string, planName: string) {
    console.log(`[GRACE FINAL WARNING] Sending to ${userEmail} for ${planName}`);

    const subject = '🚨 FINAL WARNING - Subscription expires today';
    const html = getFinalWarningTemplate(planName);

    await sendUserEmail(userEmail, subject, html);
}

export async function sendGraceAdminAlert(userEmail: string, planName: string, daysInGrace: number) {
    console.log(`[ADMIN ALERT] User ${userEmail} in grace period for ${planName} - Day ${daysInGrace}`);

    const subject = `Payment Issue Alert - ${userEmail}`;
    const html = getAdminAlertTemplate(userEmail, planName, daysInGrace);

    await sendAdminEmail(subject, html);
}

export async function sendSubscriptionExpiredNotification(userEmail: string, planName: string) {
    console.log(`[SUBSCRIPTION EXPIRED] Sending to ${userEmail} for ${planName}`);

    const subject = 'Subscription Expired';
    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #0a0a0a; color: #ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 16px; overflow: hidden;">
          <tr>
            <td style="padding: 40px; text-align: center; background-color: #1f2937;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;">Subscription Expired</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                Your ${planName} subscription has expired due to non-payment.
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                You no longer have access to premium automation features. To restore access, please renew your subscription.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/products" style="display: inline-block; padding: 16px 32px; background-color: #3b82f6; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      Renew Subscription
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px; background-color: #0f0f0f; text-align: center;">
              <p style="margin: 0; font-size: 12px; color: #6b7280;">
                © ${new Date().getFullYear()} Auto Step. All rights reserved.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

    await sendUserEmail(userEmail, subject, html);
}
