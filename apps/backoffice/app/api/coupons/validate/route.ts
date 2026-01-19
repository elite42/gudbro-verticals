/**
 * Coupon Validation API
 *
 * POST /api/coupons/validate - Validate a coupon for checkout
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import { validateCoupon } from '@/lib/coupon-service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code, orderSubtotalCents } = body;

    if (!code) {
      return NextResponse.json({ error: 'Missing code' }, { status: 400 });
    }

    const result = await validateCoupon(code, session.user.id, orderSubtotalCents || 0);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Coupon Validation API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
