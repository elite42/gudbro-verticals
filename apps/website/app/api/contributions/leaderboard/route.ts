import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/contributions/leaderboard
 * Get top contributors leaderboard (public)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const limit = Math.min(parseInt(searchParams.get('limit') || '10', 10), 100);

    const { data, error } = await supabase
      .from('v_contributor_stats')
      .select('account_id, display_name, contributor_points, total_submissions, approved_count')
      .gt('contributor_points', 0)
      .order('contributor_points', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('[ContributionsAPI] Leaderboard error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Anonymize email, only show display name or "Contributor #X"
    const leaderboard = (data || []).map((d: any, index: number) => ({
      rank: index + 1,
      displayName: d.display_name || `Contributor #${index + 1}`,
      contributorPoints: d.contributor_points || 0,
      totalSubmissions: d.total_submissions || 0,
      approvedCount: d.approved_count || 0,
    }));

    return NextResponse.json({ leaderboard });
  } catch (err) {
    console.error('[ContributionsAPI] Leaderboard error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
