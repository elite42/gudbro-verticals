import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * GET /api/referrals/validate?code=XXXXXXXX
 * Validate a referral code (public endpoint)
 */
export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code');

    if (!code || code.length < 6) {
      return NextResponse.json(
        { isValid: false, error: 'Invalid code format' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.rpc('validate_referral_code', {
      p_code: code.toUpperCase(),
    });

    if (error) {
      console.error('[ReferralsAPI] Validate error:', error);
      return NextResponse.json({ isValid: false, error: error.message }, { status: 500 });
    }

    const result = data?.[0];

    if (!result?.is_valid) {
      return NextResponse.json({
        isValid: false,
        error: result?.error_message || 'Invalid referral code',
      });
    }

    return NextResponse.json({
      isValid: true,
      referrerName: result.referrer_name,
      bonusPoints: 50, // Points the new user will receive
    });
  } catch (err) {
    console.error('[ReferralsAPI] Validate error:', err);
    return NextResponse.json({ isValid: false, error: 'Internal server error' }, { status: 500 });
  }
}
