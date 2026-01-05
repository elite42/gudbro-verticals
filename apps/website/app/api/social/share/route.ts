import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * POST /api/social/share
 * Record a social share event
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
    const { contentType, contentId, platform, shareUrl, metadata } = body;

    const validContentTypes = ['review', 'badge', 'achievement', 'merchant', 'dish', 'referral'];
    if (!contentType || !validContentTypes.includes(contentType)) {
      return NextResponse.json(
        { error: 'Invalid contentType. Must be one of: ' + validContentTypes.join(', ') },
        { status: 400 }
      );
    }

    const validPlatforms = [
      'facebook',
      'twitter',
      'instagram',
      'linkedin',
      'whatsapp',
      'telegram',
      'email',
      'copy_link',
      'native',
    ];
    if (!platform || !validPlatforms.includes(platform)) {
      return NextResponse.json(
        { error: 'Invalid platform. Must be one of: ' + validPlatforms.join(', ') },
        { status: 400 }
      );
    }

    // Record the share
    const { data: share, error } = await supabase.rpc('record_social_share', {
      p_account_id: account.id,
      p_content_type: contentType,
      p_content_id: contentId || null,
      p_platform: platform,
      p_share_url: shareUrl || null,
      p_metadata: metadata || {},
    });

    if (error) {
      console.error('[SocialShareAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      shareId: share,
      message: 'Share recorded successfully',
    });
  } catch (err) {
    console.error('[SocialShareAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * GET /api/social/share
 * Get user's share history
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
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    const {
      data: shares,
      error,
      count,
    } = await supabase
      .from('social_shares')
      .select('*', { count: 'exact' })
      .eq('account_id', account.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error('[SocialShareAPI] Error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Get stats
    const { data: stats } = await supabase
      .from('social_shares')
      .select('platform')
      .eq('account_id', account.id);

    const platformCounts: Record<string, number> = {};
    stats?.forEach((s) => {
      platformCounts[s.platform] = (platformCounts[s.platform] || 0) + 1;
    });

    return NextResponse.json({
      shares:
        shares?.map((s) => ({
          id: s.id,
          contentType: s.content_type,
          contentId: s.content_id,
          platform: s.platform,
          clickCount: s.click_count,
          conversionCount: s.conversion_count,
          createdAt: s.created_at,
        })) || [],
      total: count || 0,
      platformStats: platformCounts,
    });
  } catch (err) {
    console.error('[SocialShareAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
