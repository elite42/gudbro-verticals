import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/suggestions/leaderboard
 * Get suggestion leaderboard (top contributors)
 */
export async function GET(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);

    const { data, error } = await supabase
      .from('v_suggestion_leaderboard')
      .select('*')
      .limit(limit);

    if (error) {
      console.error('[SuggestionsAPI] Get leaderboard error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const leaderboard = (data || []).map((row: Record<string, unknown>) => ({
      accountId: row.account_id,
      displayName: row.display_name,
      avatarUrl: row.avatar_url,
      totalSuggestions: row.total_suggestions,
      implementedCount: row.implemented_count,
      totalPoints: row.total_points,
      acceptanceRate: row.acceptance_rate,
    }));

    return NextResponse.json({ leaderboard });
  } catch (err) {
    console.error('[SuggestionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
