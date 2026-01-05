import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/merchant/economy
 * Get merchant's economy dashboard
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

    // Get account and check if merchant
    const { data: account } = await supabase
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Get merchant role
    const { data: merchantRole } = await supabase
      .from('account_roles')
      .select('reference_id')
      .eq('account_id', account.id)
      .eq('role_type', 'merchant')
      .eq('is_active', true)
      .single();

    if (!merchantRole) {
      return NextResponse.json({ error: 'Merchant access required' }, { status: 403 });
    }

    const merchantId = merchantRole.reference_id;

    // Get merchant info
    const { data: merchant } = await supabase
      .from('merchants')
      .select('id, business_name, partner_tier')
      .eq('id', merchantId)
      .single();

    // Get economy dashboard from function
    const { data: dashboard, error: dashboardError } = await supabase.rpc(
      'get_economy_dashboard_merchant',
      { p_merchant_id: merchantId }
    );

    if (dashboardError) {
      console.error('[MerchantEconomyAPI] Dashboard error:', dashboardError);
      // Return defaults
      return NextResponse.json({
        merchant: merchant || { partner_tier: 'standard' },
        dashboard: {
          partner_tier: merchant?.partner_tier || 'standard',
          total_points_earned: 0,
          total_points_redeemed: 0,
          total_revenue_earned_eur: 0,
          pending_revenue_eur: 0,
          last_payout_date: null,
          last_payout_amount: 0,
          next_payout_estimate: 0,
        },
        revenueShares: [],
        tierBenefits: getTierBenefits(merchant?.partner_tier || 'standard'),
      });
    }

    // Get revenue share history
    const { data: revenueShares } = await supabase
      .from('merchant_revenue_shares')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('period_month', { ascending: false })
      .limit(12);

    const firstRow = dashboard?.[0] || {};

    return NextResponse.json({
      merchant: merchant || { partner_tier: 'standard' },
      dashboard: {
        partnerTier: firstRow.partner_tier || 'standard',
        totalPointsEarned: firstRow.total_points_earned || 0,
        totalPointsRedeemed: firstRow.total_points_redeemed || 0,
        totalRevenueEarnedEur: parseFloat(firstRow.total_revenue_earned_eur) || 0,
        pendingRevenueEur: parseFloat(firstRow.pending_revenue_eur) || 0,
        lastPayoutDate: firstRow.last_payout_date,
        lastPayoutAmount: parseFloat(firstRow.last_payout_amount) || 0,
        nextPayoutEstimate: parseFloat(firstRow.next_payout_estimate) || 0,
      },
      revenueShares:
        revenueShares?.map((rs) => ({
          id: rs.id,
          periodMonth: rs.period_month,
          pointsEarned: rs.points_earned_at_merchant,
          pointsRedeemed: rs.points_redeemed_at_merchant,
          floatShareBasis: parseFloat(rs.float_share_basis_eur),
          floatReturnShare: parseFloat(rs.float_return_share_eur),
          breakageShare: parseFloat(rs.breakage_share_eur),
          totalRevenue: parseFloat(rs.total_revenue_share_eur),
          status: rs.status,
          paidAt: rs.paid_at,
        })) || [],
      tierBenefits: getTierBenefits(firstRow.partner_tier || 'standard'),
    });
  } catch (err) {
    console.error('[MerchantEconomyAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function getTierBenefits(tier: string) {
  const tiers: Record<string, { floatShare: number; breakageShare: number; description: string }> =
    {
      standard: {
        floatShare: 0.2,
        breakageShare: 0.1,
        description: 'Standard partner tier with 20% float return share and 10% breakage share',
      },
      premium: {
        floatShare: 0.3,
        breakageShare: 0.15,
        description: 'Premium partner tier with 30% float return share and 15% breakage share',
      },
      founding: {
        floatShare: 0.4,
        breakageShare: 0.2,
        description: 'Founding partner tier with 40% float return share and 20% breakage share',
      },
    };

  return tiers[tier] || tiers.standard;
}
