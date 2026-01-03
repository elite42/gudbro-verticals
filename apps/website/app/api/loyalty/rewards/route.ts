import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/loyalty/rewards
 * Get available rewards for authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { data: account } = await supabase
      .from('accounts')
      .select('id, points_balance')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const { data, error } = await supabase.rpc('get_available_rewards', {
      p_account_id: account.id,
      p_category: category || null,
    });

    if (error) {
      console.error('[LoyaltyAPI] Get rewards error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rewards = (data || []).map((row: Record<string, unknown>) => ({
      id: row.id,
      code: row.code,
      name: row.name,
      description: row.description,
      rewardType: row.reward_type,
      rewardValue: row.reward_value,
      pointsRequired: row.points_required,
      imageUrl: row.image_url,
      category: row.category,
      isFeatured: row.is_featured,
      canRedeem: row.can_redeem,
      timesRedeemed: row.times_redeemed,
      maxPerUser: row.max_per_user,
    }));

    return NextResponse.json({
      rewards,
      userPoints: account.points_balance,
    });
  } catch (err) {
    console.error('[LoyaltyAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
