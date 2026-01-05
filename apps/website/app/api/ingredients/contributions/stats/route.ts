import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/ingredients/contributions/stats
 * Get user's contribution statistics
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
      .select('id, contributor_points')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Get contribution counts by status
    const { data: contributions } = await supabase
      .from('ingredient_contributions')
      .select('status, points_awarded')
      .eq('account_id', account.id);

    const stats = {
      total: 0,
      pending: 0,
      inReview: 0,
      approved: 0,
      merged: 0,
      rejected: 0,
      duplicate: 0,
      totalPointsEarned: 0,
      contributorPoints: account.contributor_points || 0,
    };

    (contributions || []).forEach((c: { status: string; points_awarded: number }) => {
      stats.total++;
      stats.totalPointsEarned += c.points_awarded || 0;

      switch (c.status) {
        case 'pending':
          stats.pending++;
          break;
        case 'in_review':
          stats.inReview++;
          break;
        case 'approved':
          stats.approved++;
          break;
        case 'merged':
          stats.merged++;
          break;
        case 'rejected':
          stats.rejected++;
          break;
        case 'duplicate':
          stats.duplicate++;
          break;
      }
    });

    // Calculate approval rate
    const reviewedCount = stats.approved + stats.merged + stats.rejected + stats.duplicate;
    const approvalRate =
      reviewedCount > 0 ? Math.round(((stats.approved + stats.merged) / reviewedCount) * 100) : 0;

    return NextResponse.json({
      stats: {
        ...stats,
        approvalRate,
        successCount: stats.approved + stats.merged,
      },
    });
  } catch (err) {
    console.error('[ContributionsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
