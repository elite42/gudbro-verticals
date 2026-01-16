/**
 * Quick Actions API
 *
 * POST /api/quick-actions
 *
 * Handles quick actions from the map: wallet top-up, loyalty points, promo assignment.
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getOrCreateWallet,
  processCashTopUp,
  getWalletSettings,
  calculateBonus,
} from '@/lib/wallet-service';
import { awardPoints } from '@/lib/loyalty-service';

interface QuickActionRequest {
  action: 'wallet_topup' | 'loyalty_award' | 'promo_assign' | 'send_message';
  target_account_id: string;
  merchant_id: string;

  // For wallet_topup
  amount_cents?: number;
  add_bonus?: boolean;
  notes?: string;

  // For loyalty_award
  points?: number;
  reason?: string;

  // For promo_assign
  promotion_id?: string;

  // For send_message
  channel?: 'whatsapp' | 'email' | 'sms';
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: QuickActionRequest = await request.json();

    const { action, target_account_id, merchant_id } = body;

    if (!action || !target_account_id || !merchant_id) {
      return NextResponse.json(
        { error: 'action, target_account_id, and merchant_id are required' },
        { status: 400 }
      );
    }

    switch (action) {
      case 'wallet_topup': {
        const { amount_cents, add_bonus, notes } = body;

        if (!amount_cents || amount_cents <= 0) {
          return NextResponse.json({ error: 'amount_cents must be positive' }, { status: 400 });
        }

        // Get or create wallet for this customer
        const wallet = await getOrCreateWallet(target_account_id, merchant_id);
        if (!wallet) {
          return NextResponse.json({ error: 'Failed to get or create wallet' }, { status: 400 });
        }

        // Calculate bonus if enabled
        let bonusInfo = { bonus_cents: 0, tier_name: null as string | null };
        if (add_bonus) {
          bonusInfo = await calculateBonus(merchant_id, amount_cents);
        }

        // Process the top-up
        const transactionId = await processCashTopUp(
          wallet.id,
          amount_cents,
          'system', // TODO: Get actual user ID from auth
          notes || 'Quick top-up from map'
        );

        if (!transactionId) {
          return NextResponse.json({ error: 'Failed to process top-up' }, { status: 400 });
        }

        return NextResponse.json({
          success: true,
          action_id: transactionId,
          new_balance: {
            wallet_cents: wallet.balance_cents + amount_cents,
            bonus_cents: wallet.bonus_balance_cents + bonusInfo.bonus_cents,
          },
          message: `Added €${(amount_cents / 100).toFixed(2)} to wallet${bonusInfo.bonus_cents > 0 ? ` (+€${(bonusInfo.bonus_cents / 100).toFixed(2)} bonus)` : ''}`,
        });
      }

      case 'loyalty_award': {
        const { points, reason } = body;

        if (!points || points <= 0) {
          return NextResponse.json({ error: 'points must be positive' }, { status: 400 });
        }

        const result = await awardPoints(target_account_id, merchant_id, points, 'earn_bonus', {
          referenceType: 'quick_action',
          notes: reason || 'Quick bonus from map',
        });

        if (!result.success) {
          return NextResponse.json(
            { error: result.error || 'Failed to award points' },
            { status: 400 }
          );
        }

        return NextResponse.json({
          success: true,
          new_balance: {
            loyalty_points: result.newBalance,
          },
          message: `Awarded ${points} points`,
        });
      }

      case 'promo_assign': {
        const { promotion_id } = body;

        if (!promotion_id) {
          return NextResponse.json({ error: 'promotion_id is required' }, { status: 400 });
        }

        // TODO: Implement promo assignment
        // This would create a customer_promotions record

        return NextResponse.json({
          success: true,
          message: 'Promotion assigned (placeholder)',
        });
      }

      case 'send_message': {
        const { channel, message } = body;

        if (!channel || !message) {
          return NextResponse.json({ error: 'channel and message are required' }, { status: 400 });
        }

        // TODO: Implement message sending
        // This would integrate with WhatsApp/Email/SMS services

        return NextResponse.json({
          success: true,
          message: `Message sent via ${channel} (placeholder)`,
        });
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (error) {
    console.error('[Quick Actions API] Error:', error);
    return NextResponse.json({ error: 'Failed to execute action' }, { status: 500 });
  }
}
