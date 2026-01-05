import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/referrals/stats
 * Get referral stats for the authenticated user
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

    const { data, error } = await supabase.rpc('get_referral_stats', {
      p_account_id: account.id,
    });

    if (error) {
      console.error('[ReferralsAPI] Stats error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const stats = data?.[0];
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://gudbro-website.vercel.app';

    return NextResponse.json({
      stats: {
        totalReferrals: stats?.total_referrals || 0,
        pendingReferrals: stats?.pending_referrals || 0,
        successfulReferrals: stats?.successful_referrals || 0,
        totalPointsEarned: stats?.total_points_earned || 0,
        referralCode: stats?.referral_code || '',
        referralLink: stats?.referral_code ? `${baseUrl}/signup?ref=${stats.referral_code}` : '',
      },
    });
  } catch (err) {
    console.error('[ReferralsAPI] Stats error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
