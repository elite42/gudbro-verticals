import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/analytics/events
 * Get event counts for a date range
 */
export async function GET(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const eventName = searchParams.get('eventName');
    const eventCategory = searchParams.get('eventCategory');
    const merchantId = searchParams.get('merchantId');

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'startDate and endDate are required' }, { status: 400 });
    }

    const { data, error } = await supabase.rpc('get_event_counts', {
      p_start_date: startDate,
      p_end_date: endDate,
      p_event_name: eventName || null,
      p_event_category: eventCategory || null,
      p_merchant_id: merchantId || null,
    });

    if (error) {
      console.error('[AnalyticsAPI] Get events error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const events = (data || []).map((row: Record<string, unknown>) => ({
      eventDate: row.event_date,
      eventName: row.event_name,
      eventCount: row.event_count,
      uniqueUsers: row.unique_users,
    }));

    return NextResponse.json({ events });
  } catch (err) {
    console.error('[AnalyticsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
