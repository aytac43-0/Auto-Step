export function getPaymentFailedTemplate(planName: string, daysRemaining: number) {
    return `
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
            <td style="padding: 40px; text-align: center; background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%);">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;">Payment Required</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                Your subscription to <strong style="color: #ffffff;">${planName}</strong> has expired due to a payment issue.
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                You have <strong style="color: #fbbf24;">${daysRemaining} days</strong> remaining in your grace period to renew your subscription and avoid service interruption.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/products" style="display: inline-block; padding: 16px 32px; background-color: #10b981; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      Renew Subscription
                    </a>
                  </td>
                </tr>
              </table>
              <p style="margin: 20px 0 0; font-size: 14px; line-height: 1.6; color: #9ca3af;">
                If you have any questions, please contact our support team.
              </p>
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
}

export function getReminderTemplate(planName: string, daysRemaining: number) {
    return `
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
            <td style="padding: 40px; text-align: center; background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;">⚠️ Reminder: Payment Required</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                This is a reminder that your <strong style="color: #ffffff;">${planName}</strong> subscription requires payment.
              </p>
              <p style="margin: 0 0 20px; font-size: 18px; line-height: 1.6; color: #fbbf24; font-weight: bold;">
                Only ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''} remaining!
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                Please renew your subscription immediately to maintain uninterrupted access to your automation features.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/products" style="display: inline-block; padding: 16px 32px; background-color: #ef4444; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      Renew Now
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
}

export function getFinalWarningTemplate(planName: string) {
    return `
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
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 16px; overflow: hidden; border: 2px solid #ef4444;">
          <tr>
            <td style="padding: 40px; text-align: center; background-color: #7f1d1d;">
              <h1 style="margin: 0; font-size: 28px; font-weight: bold; color: #ffffff;">🚨 FINAL WARNING</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 18px; line-height: 1.6; color: #fecaca; font-weight: bold;">
                Your ${planName} subscription will be terminated TODAY without payment.
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                This is your final opportunity to renew and maintain access to your automation features.
              </p>
              <p style="margin: 0 0 20px; font-size: 16px; line-height: 1.6; color: #e5e7eb;">
                After today, your subscription will be permanently expired and you will lose access to all premium features.
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${process.env.NEXT_PUBLIC_SITE_URL}/products" style="display: inline-block; padding: 16px 32px; background-color: #dc2626; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                      Renew Immediately
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
}

export function getAdminAlertTemplate(userEmail: string, planName: string, daysInGrace: number) {
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <tr>
            <td style="padding: 30px; border-bottom: 3px solid #f59e0b;">
              <h1 style="margin: 0; font-size: 20px; font-weight: bold; color: #111827;">⚠️ Payment Issue Alert</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px;">
              <p style="margin: 0 0 15px; font-size: 14px; color: #374151;">
                <strong>User:</strong> ${userEmail}
              </p>
              <p style="margin: 0 0 15px; font-size: 14px; color: #374151;">
                <strong>Plan:</strong> ${planName}
              </p>
              <p style="margin: 0 0 15px; font-size: 14px; color: #374151;">
                <strong>Grace Period Day:</strong> ${daysInGrace}
              </p>
              <p style="margin: 20px 0 0; font-size: 14px; color: #6b7280;">
                This user's subscription has entered the grace period. Monitor for payment or consider manual outreach.
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
}
