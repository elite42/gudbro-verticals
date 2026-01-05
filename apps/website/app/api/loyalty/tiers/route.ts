import { NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/loyalty/tiers
 * Get all loyalty tiers
 */
export async function GET() {
  const supabase = getSupabase();

  try {
    const { data, error } = await supabase
      .from('loyalty_tiers')
      .select('*')
      .eq('is_active', true)
      .order('tier_order');

    if (error) {
      console.error('[LoyaltyAPI] Get tiers error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const tiers = (data || []).map((row: Record<string, unknown>) => ({
      id: row.id,
      tierName: row.tier_name,
      displayName: row.display_name,
      tierOrder: row.tier_order,
      pointsThreshold: row.points_threshold,
      benefits: row.benefits,
      badgeUrl: row.badge_url,
      colorHex: row.color_hex,
    }));

    return NextResponse.json({ tiers });
  } catch (err) {
    console.error('[LoyaltyAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
