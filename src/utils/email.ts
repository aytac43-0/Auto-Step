export async function sendAdminNotification(userEmail: string, productName: string) {
    // In a real production app, you would use Resend, SendGrid, etc.
    // For this implementation, we log the notification to the console.
    console.log(`[ADMIN NOTIFICATION]
  Subject: New Purchase
  Body: ${userEmail} purchased ${productName}
  Timestamp: ${new Date().toISOString()}
  `);

    // To simulate a 'functional' utility as requested, we return a promise.
    return Promise.resolve({ success: true });
}
