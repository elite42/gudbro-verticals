import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/economy/breakage
 * Get breakage records
 */
export async function GET(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = request.headers.get('x-cron-secret');

    if (cronSecret !== process.env.CRON_SECRET) {
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
        .select('id, account_type')
        .eq('auth_id', user.id)
        .single();

      if (!account || account.account_type !== 'admin') {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
      }
    }

    const { data: records, error } = await supabase
      .from('breakage_records')
      .select('*')
      .order('period_start', { ascending: false })
      .limit(24);

    if (error) {
      console.error('[BreakageAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate totals
    const totals =
      records?.reduce(
        (acc, r) => ({
          totalIssued: acc.totalIssued + (r.points_issued || 0),
          totalRedeemed: acc.totalRedeemed + (r.points_redeemed || 0),
          totalExpired: acc.totalExpired + (r.points_expired || 0),
          totalBreakageEur: acc.totalBreakageEur + parseFloat(r.breakage_eur || 0),
          totalGudbro: acc.totalGudbro + parseFloat(r.gudbro_share_eur || 0),
          totalPartnerPool: acc.totalPartnerPool + parseFloat(r.partner_pool_eur || 0),
        }),
        {
          totalIssued: 0,
          totalRedeemed: 0,
          totalExpired: 0,
          totalBreakageEur: 0,
          totalGudbro: 0,
          totalPartnerPool: 0,
        }
      ) || {};

    return NextResponse.json({
      records: records || [],
      totals,
    });
  } catch (err) {
    console.error('[BreakageAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/admin/economy/breakage
 * Calculate breakage for a period
 */
export async function POST(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = request.headers.get('x-cron-secret');

    if (cronSecret !== process.env.CRON_SECRET) {
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
        .select('id, account_type')
        .eq('auth_id', user.id)
        .single();

      if (!account || account.account_type !== 'admin') {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
      }
    }

    const body = await request.json();
    const { startDate, endDate } = body;

    if (!startDate || !endDate) {
      return NextResponse.json({ error: 'startDate and endDate required' }, { status: 400 });
    }

    // Call the database function
    const { data: recordId, error } = await supabase.rpc('calculate_breakage_for_period', {
      p_start_date: startDate,
      p_end_date: endDate,
    });

    if (error) {
      console.error('[BreakageAPI] Calculation error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get the created record
    const { data: record } = await supabase
      .from('breakage_records')
      .select('*')
      .eq('id', recordId)
      .single();

    return NextResponse.json({
      success: true,
      recordId,
      record,
      message: `Breakage calculated for ${startDate} to ${endDate}`,
    });
  } catch (err) {
    console.error('[BreakageAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
