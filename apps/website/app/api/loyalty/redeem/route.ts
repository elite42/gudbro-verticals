import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * POST /api/loyalty/redeem
 * Redeem a reward
 */
export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const { rewardId } = body;

    if (!rewardId) {
      return NextResponse.json({ error: 'rewardId is required' }, { status: 400 });
    }

    const { data, error } = await supabase.rpc('redeem_reward', {
      p_account_id: account.id,
      p_reward_id: rewardId,
    });

    if (error) {
      console.error('[LoyaltyAPI] Redeem error:', error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    // Get the redemption details
    const { data: redemption } = await supabase
      .from('reward_redemptions')
      .select('*')
      .eq('id', data)
      .single();

    return NextResponse.json(
      {
        success: true,
        redemptionId: data,
        redemptionCode: redemption?.redemption_code,
        validUntil: redemption?.valid_until,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[LoyaltyAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
