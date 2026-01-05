import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/loyalty/summary
 * Get user's loyalty summary (points, tier, progress)
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
      .select('id, points_balance, points_earned, points_spent, loyalty_tier, badges')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Get tier info
    const { data: tierInfo } = await supabase.rpc('get_tier_for_points', {
      p_points: account.points_balance,
    });

    const tier = tierInfo?.[0] || null;

    // Get recent transactions
    const { data: transactions } = await supabase
      .from('points_transactions')
      .select('*')
      .eq('account_id', account.id)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get active redemptions count
    const { count: activeRedemptions } = await supabase
      .from('reward_redemptions')
      .select('*', { count: 'exact', head: true })
      .eq('account_id', account.id)
      .eq('status', 'approved');

    return NextResponse.json({
      summary: {
        pointsBalance: account.points_balance,
        pointsEarned: account.points_earned,
        pointsSpent: account.points_spent,
        currentTier: {
          name: tier?.tier_name || account.loyalty_tier,
          displayName: tier?.display_name || account.loyalty_tier,
          benefits: tier?.benefits || {},
          colorHex: tier?.color_hex,
        },
        nextTier: tier?.next_tier_name
          ? {
              name: tier.next_tier_name,
              pointsRequired: tier.next_tier_points,
              pointsToGo: tier.points_to_next,
              progressPercent: tier.next_tier_points
                ? Math.round((account.points_balance / tier.next_tier_points) * 100)
                : 100,
            }
          : null,
        badges: account.badges || [],
        activeRedemptions: activeRedemptions || 0,
      },
      recentTransactions: (transactions || []).map((t: Record<string, unknown>) => ({
        id: t.id,
        points: t.points,
        transactionType: t.transaction_type,
        actionType: t.action_type,
        description: t.description,
        createdAt: t.created_at,
      })),
    });
  } catch (err) {
    console.error('[LoyaltyAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
