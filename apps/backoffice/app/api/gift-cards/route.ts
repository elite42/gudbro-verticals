/**
 * Gift Cards API Routes
 *
 * GET /api/gift-cards?merchantId - List gift cards
 * GET /api/gift-cards?action=settings&merchantId - Get settings
 * GET /api/gift-cards?action=presets&merchantId - Get presets
 * GET /api/gift-cards?action=stats&merchantId - Get statistics
 * POST /api/gift-cards - Create gift card or update settings
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import {
  listGiftCards,
  createGiftCard,
  getGiftCardSettings,
  updateGiftCardSettings,
  getGiftCardPresets,
  upsertGiftCardPresets,
  getGiftCardStats,
  formatCurrency,
  type GiftCardStatus,
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

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing merchantId' }, { status: 400 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get settings
    if (action === 'settings') {
      const settings = await getGiftCardSettings(merchantId);
      return NextResponse.json({ settings });
    }

    // Get presets
    if (action === 'presets') {
      const presets = await getGiftCardPresets(merchantId);
      const formattedPresets = presets.map((p) => ({
        ...p,
        amount_formatted: formatCurrency(p.amount_cents),
      }));
      return NextResponse.json({ presets: formattedPresets });
    }

    // Get statistics
    if (action === 'stats') {
      const stats = await getGiftCardStats(merchantId);
      return NextResponse.json({
        ...stats,
        total_sold_formatted: formatCurrency(stats.total_sold_cents),
        total_redeemed_formatted: formatCurrency(stats.total_redeemed_cents),
        total_active_formatted: formatCurrency(stats.total_active_cents),
        total_expired_formatted: formatCurrency(stats.total_expired_cents),
      });
    }

    // List gift cards (default)
    const status = searchParams.get('status') as GiftCardStatus | null;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const { data, total } = await listGiftCards(merchantId, {
      status: status || undefined,
      limit,
      offset,
    });

    const formattedData = data.map((gc) => ({
      ...gc,
      amount_formatted: formatCurrency(gc.amount_cents, gc.currency),
    }));

    return NextResponse.json({
      data: formattedData,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Gift Cards API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, merchantId } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing merchantId' }, { status: 400 });
    }

    // Verify merchant access
    const hasAccess = await hasMerchantAccess(session.user.id, merchantId);
    if (!hasAccess) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Update settings
    if (action === 'update-settings') {
      const { settings } = body;
      const updated = await updateGiftCardSettings(merchantId, settings);

      if (!updated) {
        return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
      }

      return NextResponse.json({ settings: updated });
    }

    // Update presets
    if (action === 'update-presets') {
      const { presets } = body;
      const success = await upsertGiftCardPresets(merchantId, presets);

      if (!success) {
        return NextResponse.json({ error: 'Failed to update presets' }, { status: 500 });
      }

      const updatedPresets = await getGiftCardPresets(merchantId);
      return NextResponse.json({ presets: updatedPresets });
    }

    // Create gift card
    if (action === 'create') {
      const { amount_cents, recipient_email, recipient_name, recipient_message, delivery_method } =
        body;

      if (!amount_cents || !delivery_method) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }

      const giftCard = await createGiftCard({
        merchant_id: merchantId,
        amount_cents,
        purchaser_account_id: session.user.id,
        recipient_email,
        recipient_name,
        recipient_message,
        delivery_method,
      });

      if (!giftCard) {
        return NextResponse.json({ error: 'Failed to create gift card' }, { status: 500 });
      }

      return NextResponse.json({
        gift_card: {
          ...giftCard,
          amount_formatted: formatCurrency(giftCard.amount_cents, giftCard.currency),
        },
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Gift Cards API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
