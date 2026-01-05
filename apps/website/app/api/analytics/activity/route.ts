import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/analytics/activity
 * Get user's own activity summary
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

    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30', 10);

    const { data, error } = await supabase.rpc('get_user_activity', {
      p_account_id: account.id,
      p_days: days,
    });

    if (error) {
      console.error('[AnalyticsAPI] Get activity error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const activity = (data || []).map((row: Record<string, unknown>) => ({
      eventDate: row.event_date,
      eventCount: row.event_count,
      pageViews: row.page_views,
      sessions: row.sessions,
    }));

    return NextResponse.json({ activity });
  } catch (err) {
    console.error('[AnalyticsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
