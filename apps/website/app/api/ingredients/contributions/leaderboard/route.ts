import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/ingredients/contributions/leaderboard
 * Get top contributors leaderboard
 */
export async function GET(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    // Get top contributors by approved contributions
    const { data, error } = await supabase
      .from('ingredient_contributions')
      .select(
        `
        account_id,
        accounts!inner(display_name, avatar_url)
      `
      )
      .in('status', ['approved', 'merged']);

    if (error) {
      console.error('[ContributionsAPI] Leaderboard error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Aggregate by account
    const contributorMap = new Map<
      string,
      {
        accountId: string;
        displayName: string;
        avatarUrl: string | null;
        approvedCount: number;
      }
    >();

    (data || []).forEach((row: any) => {
      const accountId = row.account_id;
      const existing = contributorMap.get(accountId);

      if (existing) {
        existing.approvedCount++;
      } else {
        contributorMap.set(accountId, {
          accountId,
          displayName: row.accounts?.display_name || 'Anonymous',
          avatarUrl: row.accounts?.avatar_url || null,
          approvedCount: 1,
        });
      }
    });

    // Sort by approved count and take top N
    const leaderboard = Array.from(contributorMap.values())
      .sort((a, b) => b.approvedCount - a.approvedCount)
      .slice(0, limit)
      .map((c, index) => ({
        rank: index + 1,
        ...c,
        pointsEarned: c.approvedCount * 50, // 50 points per approved ingredient
      }));

    return NextResponse.json({ leaderboard });
  } catch (err) {
    console.error('[ContributionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
