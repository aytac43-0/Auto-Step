import { createClient } from '@/utils/supabase/server';
import { sendGraceNotification, sendGraceFinalWarning, sendGraceAdminAlert } from '@/utils/grace-emails';

export async function processGracePeriods() {
    const supabase = createClient();

    // Find all subscriptions in grace period
    const { data: graceSubscriptions } = await supabase
        .from('subscriptions')
        .select('*, profiles(email), plans(name)')
        .eq('status', 'grace');

    if (!graceSubscriptions || graceSubscriptions.length === 0) {
        console.log('[GRACE PROCESSOR] No subscriptions in grace period');
        return;
    }

    for (const sub of graceSubscriptions) {
        const graceStarted = new Date(sub.grace_started_at);
        const now = new Date();
        const daysSinceGrace = Math.floor((now.getTime() - graceStarted.getTime()) / (1000 * 60 * 60 * 24));

        console.log(`[GRACE PROCESSOR] Processing ${sub.profiles?.email} - Day ${daysSinceGrace}`);

        // Prevent duplicate notifications
        if (daysSinceGrace === sub.last_notification_day) {
            continue;
        }

        const userEmail = sub.profiles?.email || 'unknown';
        const planName = sub.plans?.name || 'Unknown Plan';

        // Day 0: Initial payment failed notification
        if (daysSinceGrace === 0 && sub.last_notification_day < 0) {
            await sendGraceNotification(userEmail, planName, 3);
            await sendGraceAdminAlert(userEmail, planName, 0);
            await supabase
                .from('subscriptions')
                .update({ last_notification_day: 0 })
                .eq('id', sub.id);
        }

        // Day 2: Reminder
        if (daysSinceGrace === 2 && sub.last_notification_day < 2) {
            await sendGraceNotification(userEmail, planName, 1);
            await supabase
                .from('subscriptions')
                .update({ last_notification_day: 2 })
                .eq('id', sub.id);
        }

        // Day 3: Final warning
        if (daysSinceGrace === 3 && sub.last_notification_day < 3) {
            await sendGraceFinalWarning(userEmail, planName);
            await supabase
                .from('subscriptions')
                .update({ last_notification_day: 3 })
                .eq('id', sub.id);
        }

        // Day 4+: Expire subscription
        if (daysSinceGrace >= 4) {
            console.log(`[GRACE PROCESSOR] Expiring subscription for ${userEmail}`);
            await supabase
                .from('subscriptions')
                .update({ status: 'expired' })
                .eq('id', sub.id);
        }
    }

    console.log('[GRACE PROCESSOR] Processing complete');
}
