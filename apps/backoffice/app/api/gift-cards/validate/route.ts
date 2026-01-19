/**
 * Gift Card Validation API
 *
 * GET /api/gift-cards/validate?code=XXX - Validate a gift card code
 * POST /api/gift-cards/validate - Redeem a gift card
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import { validateGiftCard, redeemGiftCard, formatCurrency } from '@/lib/gift-card-service';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Missing code parameter' }, { status: 400 });
    }

    const validation = await validateGiftCard(code);

    if (!validation.valid) {
      return NextResponse.json({
        valid: false,
        error: validation.error,
      });
    }

    const giftCard = validation.gift_card!;

    return NextResponse.json({
      valid: true,
      amount_cents: giftCard.amount_cents,
      amount_formatted: formatCurrency(giftCard.amount_cents, giftCard.currency),
      currency: giftCard.currency,
      expires_at: giftCard.expires_at,
      recipient_name: giftCard.recipient_name,
    });
  } catch (error) {
    console.error('Gift Card Validation API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Require authentication to redeem
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: 'Missing code' }, { status: 400 });
    }

    const result = await redeemGiftCard(code, session.user.id);

    if (!result.success) {
      return NextResponse.json({
        success: false,
        error: result.error,
      });
    }

    return NextResponse.json({
      success: true,
      amount_cents: result.amount_cents,
      amount_formatted: formatCurrency(result.amount_cents!, result.currency),
      currency: result.currency,
      wallet_id: result.wallet_id,
      message: `${formatCurrency(result.amount_cents!, result.currency)} has been added to your wallet!`,
    });
  } catch (error) {
    console.error('Gift Card Redeem API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
