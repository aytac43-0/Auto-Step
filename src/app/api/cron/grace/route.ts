import { NextResponse } from 'next/server';
import { processGracePeriods } from '@/utils/grace-processor';

export async function GET(request: Request) {
    // Verify cron secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization');

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        await processGracePeriods();
        return NextResponse.json({ success: true, message: 'Grace periods processed' });
    } catch (error) {
        console.error('[CRON ERROR]', error);
        return NextResponse.json({ success: false, error: 'Processing failed' }, { status: 500 });
    }
}
