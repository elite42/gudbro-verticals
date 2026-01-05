import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/analytics/devices
 * Get device breakdown
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
    const merchantId = searchParams.get('merchantId');
    const days = parseInt(searchParams.get('days') || '30', 10);

    const { data, error } = await supabase.rpc('get_device_breakdown', {
      p_merchant_id: merchantId || null,
      p_days: days,
    });

    if (error) {
      console.error('[AnalyticsAPI] Get devices error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const devices = (data || []).map((row: Record<string, unknown>) => ({
      deviceType: row.device_type,
      eventCount: row.event_count,
      percentage: row.percentage,
    }));

    return NextResponse.json({ devices });
  } catch (err) {
    console.error('[AnalyticsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
