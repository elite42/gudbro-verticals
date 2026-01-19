/**
 * Promo Code Validation API
 *
 * POST /api/promo-codes/validate - Validate a promo code for checkout
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import { validatePromoCode } from '@/lib/promo-code-service';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    const accountId = session?.user?.id;

    const body = await request.json();
    const { merchantId, code, orderSubtotalCents } = body;

    if (!merchantId || !code) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const result = await validatePromoCode(merchantId, code, orderSubtotalCents || 0, accountId);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Promo Code Validation API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
