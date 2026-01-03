import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/admin/economy/expiry
 * Get expiry stats and upcoming expirations
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = request.headers.get('x-cron-secret');

    if (cronSecret !== process.env.CRON_SECRET) {
      if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const token = authHeader.substring(7);
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);

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

    // Get expiry stats by status
    const { data: byStatus } = await supabase
      .from('points_expiry_batches')
      .select('status, points_amount, remaining_points');

    const stats = {
      active: { count: 0, points: 0, remaining: 0 },
      warning_sent_21: { count: 0, points: 0, remaining: 0 },
      warning_sent_23: { count: 0, points: 0, remaining: 0 },
      expired: { count: 0, points: 0, remaining: 0 },
      redeemed: { count: 0, points: 0, remaining: 0 },
    };

    byStatus?.forEach(b => {
      if (b.status in stats) {
        const key = b.status as keyof typeof stats;
        stats[key].count += 1;
        stats[key].points += b.points_amount || 0;
        stats[key].remaining += b.remaining_points || 0;
      }
    });

    // Get upcoming expirations (next 30 days)
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

    const { data: upcomingExpirations } = await supabase
      .from('points_expiry_batches')
      .select(`
        id, account_id, points_amount, remaining_points,
        earned_at, expires_at, status,
        account:accounts(email, display_name)
      `)
      .eq('status', 'active')
      .gt('remaining_points', 0)
      .lt('expires_at', thirtyDaysFromNow.toISOString())
      .order('expires_at', { ascending: true })
      .limit(50);

    // Get recent expirations
    const { data: recentExpirations } = await supabase
      .from('points_expiry_batches')
      .select(`
        id, account_id, points_amount, expired_at,
        account:accounts(email, display_name)
      `)
      .eq('status', 'expired')
      .order('expired_at', { ascending: false })
      .limit(20);

    // Calculate totals
    const totalActivePoints = stats.active.remaining + stats.warning_sent_21.remaining + stats.warning_sent_23.remaining;
    const totalExpiredPoints = stats.expired.points;
    const pointsExpiringSoon = upcomingExpirations?.reduce((sum, e) => sum + (e.remaining_points || 0), 0) || 0;

    return NextResponse.json({
      stats,
      totals: {
        totalActivePoints,
        totalExpiredPoints,
        pointsExpiringSoon,
        activePointsValueEur: totalActivePoints * 0.01,
        expiredPointsValueEur: totalExpiredPoints * 0.01,
      },
      upcomingExpirations: upcomingExpirations?.map(e => ({
        ...e,
        daysUntilExpiry: Math.ceil(
          (new Date(e.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        ),
      })) || [],
      recentExpirations: recentExpirations || [],
    });
  } catch (err) {
    console.error('[AdminExpiryAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/admin/economy/expiry
 * Run expiry jobs (expire points, send warnings)
 */
export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = request.headers.get('x-cron-secret');

    if (cronSecret !== process.env.CRON_SECRET) {
      if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const token = authHeader.substring(7);
      const { data: { user }, error: authError } = await supabase.auth.getUser(token);

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
    const { action } = body; // 'expire_points' or 'send_warnings'

    const results: Record<string, unknown> = {};

    if (!action || action === 'expire_points') {
      // Expire old points
      const { data: expiredCount, error: expireError } = await supabase.rpc('expire_old_points');

      if (expireError) {
        console.error('[AdminExpiryAPI] Expire error:', expireError);
        results.expireError = expireError.message;
      } else {
        results.pointsExpired = expiredCount || 0;
      }
    }

    if (!action || action === 'send_warnings') {
      // Send warnings
      const { data: warningCount, error: warningError } = await supabase.rpc('send_expiry_warnings');

      if (warningError) {
        console.error('[AdminExpiryAPI] Warning error:', warningError);
        results.warningError = warningError.message;
      } else {
        results.warningsSent = warningCount || 0;
      }
    }

    return NextResponse.json({
      success: true,
      results,
      message: 'Expiry jobs completed',
    });
  } catch (err) {
    console.error('[AdminExpiryAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
