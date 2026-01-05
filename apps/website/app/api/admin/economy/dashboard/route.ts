import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/admin/economy/dashboard
 * Get HQ economy dashboard data
 */
export async function GET(request: NextRequest) {
  const supabase = getSupabase();

  try {
    // Check for admin auth (service role or admin account)
    const authHeader = request.headers.get('authorization');
    const cronSecret = request.headers.get('x-cron-secret');

    // Allow cron jobs with secret
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

      // Check if admin
      const { data: account } = await supabase
        .from('accounts')
        .select('id, account_type')
        .eq('auth_id', user.id)
        .single();

      if (!account || account.account_type !== 'admin') {
        return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
      }
    }

    // Get dashboard data from view
    const { data: dashboard, error } = await supabase
      .from('v_economy_dashboard_hq')
      .select('*')
      .single();

    if (error) {
      console.error('[AdminEconomyAPI] View error:', error);
      // Calculate manually if view doesn't exist
      const manualDashboard = await calculateDashboardManually();
      return NextResponse.json(manualDashboard);
    }

    // Get recent deposits
    const { data: recentDeposits } = await supabase
      .from('prepaid_deposits')
      .select('id, account_id, amount_eur, points_credited, payment_method, created_at')
      .eq('status', 'completed')
      .order('created_at', { ascending: false })
      .limit(10);

    // Get recent economy events
    const { data: recentEvents } = await supabase
      .from('economy_events')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(20);

    // Get float batches
    const { data: floatBatches } = await supabase
      .from('float_batches')
      .select('*')
      .order('opened_at', { ascending: false })
      .limit(12);

    // Get breakage records
    const { data: breakageRecords } = await supabase
      .from('breakage_records')
      .select('*')
      .order('period_start', { ascending: false })
      .limit(12);

    return NextResponse.json({
      ...dashboard,
      recentDeposits: recentDeposits || [],
      recentEvents: recentEvents || [],
      floatBatches: floatBatches || [],
      breakageRecords: breakageRecords || [],
    });
  } catch (err) {
    console.error('[AdminEconomyAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function calculateDashboardManually() {
  const supabase = getSupabase();
  // Fallback calculation if view doesn't exist
  const { data: deposits } = await supabase
    .from('prepaid_deposits')
    .select('amount_eur')
    .eq('status', 'completed');

  const { data: accounts } = await supabase
    .from('accounts')
    .select('points_balance, points_earned, points_spent');

  const totalFloat = deposits?.reduce((sum, d) => sum + parseFloat(d.amount_eur), 0) || 0;
  const totalOutstanding = accounts?.reduce((sum, a) => sum + (a.points_balance || 0), 0) || 0;
  const totalEarned = accounts?.reduce((sum, a) => sum + (a.points_earned || 0), 0) || 0;
  const totalSpent = accounts?.reduce((sum, a) => sum + (a.points_spent || 0), 0) || 0;

  return {
    total_float_eur: totalFloat,
    float_last_30_days_eur: 0, // Would need date filter
    total_outstanding_points: totalOutstanding,
    total_points_ever_issued: totalEarned,
    total_points_redeemed: totalSpent,
    total_expired_points: 0,
    total_breakage_eur: 0,
    outstanding_liability_eur: totalOutstanding * 0.01,
    expiring_soon_liability_eur: 0,
    total_revenue_shared_eur: 0,
    pending_revenue_share_eur: 0,
    accounts_with_points: accounts?.filter((a) => (a.points_balance || 0) > 0).length || 0,
    deposits_last_30_days: 0,
  };
}
