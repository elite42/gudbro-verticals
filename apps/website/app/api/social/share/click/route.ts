import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * POST /api/social/share/click
 * Record a click on a shared link (public endpoint)
 */
export async function POST(request: NextRequest) {
  const supabase = getSupabase();

  try {
    const body = await request.json();
    const { shareId, referrer, userAgent, ipHash, metadata } = body;

    if (!shareId) {
      return NextResponse.json({ error: 'shareId required' }, { status: 400 });
    }

    // Check share exists
    const { data: share } = await supabase
      .from('social_shares')
      .select('id')
      .eq('id', shareId)
      .single();

    if (!share) {
      return NextResponse.json({ error: 'Share not found' }, { status: 404 });
    }

    // Record click
    const { error: clickError } = await supabase.from('share_clicks').insert({
      share_id: shareId,
      referrer: referrer || null,
      user_agent: userAgent || request.headers.get('user-agent') || null,
      ip_hash: ipHash || null,
      metadata: metadata || {},
    });

    if (clickError) {
      console.error('[ShareClickAPI] Error:', clickError);
      return NextResponse.json({ error: clickError.message }, { status: 500 });
    }

    // Simple increment using RPC
    await supabase.rpc('increment_share_clicks', { p_share_id: shareId });

    return NextResponse.json({
      success: true,
      message: 'Click recorded',
    });
  } catch (err) {
    console.error('[ShareClickAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
