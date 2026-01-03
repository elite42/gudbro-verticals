import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/referrals/leaderboard
 * Get top referrers (public endpoint)
 */
export async function GET(request: NextRequest) {
  try {
    const limit = Math.min(
      parseInt(request.nextUrl.searchParams.get('limit') || '10', 10),
      100
    );

    const { data, error } = await supabase
      .from('v_referral_leaderboard')
      .select('display_name, first_name, successful_referrals, total_points_earned')
      .limit(limit);

    if (error) {
      console.error('[ReferralsAPI] Leaderboard error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const leaderboard = (data || []).map((r: any, index: number) => ({
      rank: index + 1,
      displayName: r.display_name || r.first_name || `Referrer #${index + 1}`,
      successfulReferrals: r.successful_referrals || 0,
      totalPointsEarned: r.total_points_earned || 0,
    }));

    return NextResponse.json({ leaderboard });
  } catch (err) {
    console.error('[ReferralsAPI] Leaderboard error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
