import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/loyalty/redemptions
 * Get user's redemption history
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
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const { data, error } = await supabase.rpc('get_my_redemptions', {
      p_account_id: account.id,
      p_status: status || null,
    });

    if (error) {
      console.error('[LoyaltyAPI] Get redemptions error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const redemptions = (data || []).map((row: Record<string, unknown>) => ({
      id: row.id,
      rewardCode: row.reward_code,
      rewardName: row.reward_name,
      rewardType: row.reward_type,
      pointsSpent: row.points_spent,
      status: row.status,
      redemptionCode: row.redemption_code,
      validUntil: row.valid_until,
      usedAt: row.used_at,
      createdAt: row.created_at,
    }));

    return NextResponse.json({ redemptions });
  } catch (err) {
    console.error('[LoyaltyAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
