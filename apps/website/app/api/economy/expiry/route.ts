import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/economy/expiry
 * Get user's points expiry summary
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
      .select('id, points_balance')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Get expiry summary from database function
    const { data: summary, error } = await supabase.rpc('get_points_expiry_summary', {
      p_account_id: account.id,
    });

    if (error) {
      console.error('[ExpiryAPI] Error:', error);
      // Return default values if function doesn't exist yet
      return NextResponse.json({
        pointsBalance: account.points_balance,
        totalActivePoints: account.points_balance,
        expiring3Months: 0,
        expiring6Months: 0,
        expiring12Months: 0,
        nextExpiryDate: null,
        nextExpiryAmount: 0,
        batches: [],
      });
    }

    // Get individual expiry batches
    const { data: batches } = await supabase
      .from('points_expiry_batches')
      .select('*')
      .eq('account_id', account.id)
      .eq('status', 'active')
      .gt('remaining_points', 0)
      .order('expires_at', { ascending: true })
      .limit(10);

    const firstRow = summary?.[0] || {};

    return NextResponse.json({
      pointsBalance: account.points_balance,
      totalActivePoints: firstRow.total_points || 0,
      expiring3Months: firstRow.expiring_3_months || 0,
      expiring6Months: firstRow.expiring_6_months || 0,
      expiring12Months: firstRow.expiring_12_months || 0,
      nextExpiryDate: firstRow.next_expiry_date || null,
      nextExpiryAmount: firstRow.next_expiry_amount || 0,
      batches:
        batches?.map((b) => ({
          id: b.id,
          pointsAmount: b.points_amount,
          remainingPoints: b.remaining_points,
          earnedAt: b.earned_at,
          expiresAt: b.expires_at,
          status: b.status,
          daysUntilExpiry: Math.ceil(
            (new Date(b.expires_at).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
          ),
        })) || [],
    });
  } catch (err) {
    console.error('[ExpiryAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
