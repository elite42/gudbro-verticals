import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/contributions/stats
 * Get contribution stats for the authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // Get auth token from header
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

    // Get account ID from auth user
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Get contributor stats
    const { data: stats } = await supabase
      .from('v_contributor_stats')
      .select('*')
      .eq('account_id', account.id)
      .single();

    // Get loyalty summary
    const { data: loyalty } = await supabase
      .from('v_loyalty_summary')
      .select('*')
      .eq('account_id', account.id)
      .single();

    // Get status breakdown
    const { data: contributions } = await supabase
      .from('ingredient_contributions')
      .select('status')
      .eq('account_id', account.id);

    const statusBreakdown = {
      pending: 0,
      in_review: 0,
      approved: 0,
      merged: 0,
      rejected: 0,
      duplicate: 0,
    };

    (contributions || []).forEach((c: { status: string }) => {
      if (c.status in statusBreakdown) {
        statusBreakdown[c.status as keyof typeof statusBreakdown]++;
      }
    });

    return NextResponse.json({
      stats: stats
        ? {
            accountId: stats.account_id,
            email: stats.email,
            displayName: stats.display_name,
            contributorPoints: stats.contributor_points || 0,
            totalSubmissions: stats.total_submissions || 0,
            approvedCount: stats.approved_count || 0,
            rejectedCount: stats.rejected_count || 0,
            pendingCount: stats.pending_count || 0,
            totalPointsFromContributions: stats.total_points_from_contributions || 0,
          }
        : null,
      loyalty: loyalty
        ? {
            totalPoints: loyalty.total_points || 0,
            consumerPoints: loyalty.consumer_points || 0,
            merchantPoints: loyalty.merchant_points || 0,
            contributorPoints: loyalty.contributor_points || 0,
            loyaltyTier: loyalty.loyalty_tier || 'bronze',
            pointsToNextTier: loyalty.points_to_next_tier || 0,
            nextTier: loyalty.next_tier,
            totalTransactions: loyalty.total_transactions || 0,
            lastTransactionAt: loyalty.last_transaction_at,
            successfulReferrals: loyalty.successful_referrals || 0,
          }
        : null,
      statusBreakdown,
    });
  } catch (err) {
    console.error('[ContributionsAPI] Stats error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
