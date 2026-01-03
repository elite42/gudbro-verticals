import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * POST /api/social/share/conversion
 * Record a conversion from a shared link
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { shareId, conversionType } = body;

    if (!shareId) {
      return NextResponse.json({ error: 'shareId required' }, { status: 400 });
    }

    const validConversionTypes = ['signup', 'purchase', 'visit', 'engagement'];
    if (!conversionType || !validConversionTypes.includes(conversionType)) {
      return NextResponse.json(
        { error: 'Invalid conversionType. Must be one of: ' + validConversionTypes.join(', ') },
        { status: 400 }
      );
    }

    // Check share exists
    const { data: share } = await supabase
      .from('social_shares')
      .select('id, account_id')
      .eq('id', shareId)
      .single();

    if (!share) {
      return NextResponse.json({ error: 'Share not found' }, { status: 404 });
    }

    // Update conversion count
    await supabase.rpc('increment_share_conversions', {
      p_share_id: shareId,
      p_conversion_type: conversionType,
    });

    // Update click that led to conversion (mark latest unlinked click)
    const { data: latestClick } = await supabase
      .from('share_clicks')
      .select('id')
      .eq('share_id', shareId)
      .is('converted_at', null)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (latestClick) {
      await supabase
        .from('share_clicks')
        .update({
          converted_at: new Date().toISOString(),
          conversion_type: conversionType,
        })
        .eq('id', latestClick.id);
    }

    // Award bonus points to sharer for successful conversions
    if (conversionType === 'signup' || conversionType === 'purchase') {
      const bonusPoints = conversionType === 'signup' ? 100 : 50;

      // This would trigger the points system
      await supabase.rpc('award_bonus_points', {
        p_account_id: share.account_id,
        p_points: bonusPoints,
        p_reason: `social_${conversionType}_bonus`,
        p_reference_id: shareId,
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Conversion recorded',
    });
  } catch (err) {
    console.error('[ShareConversionAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
