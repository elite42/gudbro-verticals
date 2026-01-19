/**
 * Gift Card Single Item API Routes
 *
 * GET /api/gift-cards/[id] - Get gift card details
 * PATCH /api/gift-cards/[id] - Update gift card (cancel, activate)
 * DELETE /api/gift-cards/[id] - Delete gift card (only pending)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import {
  getGiftCardById,
  activateGiftCard,
  cancelGiftCard,
  markDeliverySent,
  formatCurrency,
} from '@/lib/gift-card-service';

export const dynamic = 'force-dynamic';

/**
 * Check if user has merchant access
 */
async function hasMerchantAccess(accountId: string, merchantId: string): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  const { data } = await supabase
    .from('account_roles')
    .select('role_type')
    .eq('account_id', accountId)
    .eq('tenant_id', merchantId)
    .eq('tenant_type', 'merchant')
    .eq('is_active', true)
    .maybeSingle();

  return !!data;
}

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const giftCard = await getGiftCardById(id);

    if (!giftCard) {
      return NextResponse.json({ error: 'Gift card not found' }, { status: 404 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, giftCard.merchant_id);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json({
      gift_card: {
        ...giftCard,
        amount_formatted: formatCurrency(giftCard.amount_cents, giftCard.currency),
      },
    });
  } catch (error) {
    console.error('Gift Card API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const giftCard = await getGiftCardById(id);

    if (!giftCard) {
      return NextResponse.json({ error: 'Gift card not found' }, { status: 404 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, giftCard.merchant_id);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const { action, stripe_payment_intent_id } = body;

    // Activate gift card
    if (action === 'activate') {
      const success = await activateGiftCard(id, stripe_payment_intent_id);
      if (!success) {
        return NextResponse.json({ error: 'Failed to activate gift card' }, { status: 500 });
      }
      const updated = await getGiftCardById(id);
      return NextResponse.json({ gift_card: updated });
    }

    // Cancel gift card
    if (action === 'cancel') {
      const success = await cancelGiftCard(id);
      if (!success) {
        return NextResponse.json({ error: 'Failed to cancel gift card' }, { status: 500 });
      }
      const updated = await getGiftCardById(id);
      return NextResponse.json({ gift_card: updated });
    }

    // Mark delivery sent
    if (action === 'mark-sent') {
      const success = await markDeliverySent(id);
      if (!success) {
        return NextResponse.json({ error: 'Failed to mark delivery sent' }, { status: 500 });
      }
      const updated = await getGiftCardById(id);
      return NextResponse.json({ gift_card: updated });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Gift Card API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const giftCard = await getGiftCardById(id);

    if (!giftCard) {
      return NextResponse.json({ error: 'Gift card not found' }, { status: 404 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, giftCard.merchant_id);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Can only delete pending gift cards
    if (giftCard.status !== 'pending') {
      return NextResponse.json({ error: 'Can only delete pending gift cards' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase.from('gift_cards').delete().eq('id', id);

    if (error) {
      return NextResponse.json({ error: 'Failed to delete gift card' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Gift Card API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
