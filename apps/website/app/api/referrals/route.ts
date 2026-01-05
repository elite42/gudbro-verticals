import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase-lazy';

export const dynamic = 'force-dynamic';

/**
 * GET /api/referrals
 * Get referrals for the authenticated user
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

    const searchParams = request.nextUrl.searchParams;
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    const { data: referrals } = await supabase.rpc('get_my_referrals', {
      p_account_id: account.id,
      p_limit: limit,
      p_offset: offset,
    });

    return NextResponse.json({
      referrals: (referrals || []).map((r: any) => ({
        referralId: r.referral_id,
        referredEmail: r.referred_email,
        referredName: r.referred_name,
        referralType: r.referral_type,
        status: r.status,
        pointsAwarded: r.points_awarded || 0,
        createdAt: r.created_at,
        signedUpAt: r.signed_up_at,
      })),
    });
  } catch (err) {
    console.error('[ReferralsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * POST /api/referrals
 * Create a referral invite
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
      .select('id, display_name, first_name, referral_code')
      .eq('auth_id', user.id)
      .single();

    if (!account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    const body = await request.json();
    const { email, referralType } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const { data, error } = await supabase.rpc('create_referral_invite', {
      p_referrer_account_id: account.id,
      p_referred_email: email,
      p_referral_type: referralType || 'consumer_to_consumer',
    });

    if (error) {
      console.error('[ReferralsAPI] Create error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const result = data?.[0];
    if (!result?.success) {
      return NextResponse.json(
        { error: result?.error_message || 'Failed to create referral' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        referralId: result.referral_id,
        referralCode: result.referral_code,
        referralLink: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://gudbro-website.vercel.app'}/signup?ref=${result.referral_code}`,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('[ReferralsAPI] Error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
