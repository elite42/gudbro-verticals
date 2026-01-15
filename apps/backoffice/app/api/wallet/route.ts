/**
 * Wallet API Routes
 *
 * GET /api/wallet?accountId&merchantId - Get wallet balance
 * GET /api/wallet?action=transactions&walletId - Get transactions
 * GET /api/wallet?action=tiers&merchantId - Get bonus tiers
 * POST /api/wallet - Create top-up or use wallet
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  getWalletBalance,
  getWalletTransactions,
  getBonusTiers,
  calculateBonus,
  createTopUpSession,
  processCashTopUp,
  useWalletForPayment,
  getWalletSettings,
  getOrCreateWallet,
  formatCurrency,
  type WalletTransactionType,
} from '@/lib/wallet-service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const accountId = searchParams.get('accountId');
    const merchantId = searchParams.get('merchantId');
    const walletId = searchParams.get('walletId');

    // Get bonus tiers
    if (action === 'tiers' && merchantId) {
      const tiers = await getBonusTiers(merchantId);

      // Format tiers for display
      const formattedTiers = tiers.map((tier) => ({
        ...tier,
        min_amount_formatted: formatCurrency(tier.min_amount_cents),
        max_bonus_formatted: tier.max_bonus_cents ? formatCurrency(tier.max_bonus_cents) : null,
      }));

      return NextResponse.json({ tiers: formattedTiers });
    }

    // Get transactions
    if (action === 'transactions' && walletId) {
      const limit = parseInt(searchParams.get('limit') || '50');
      const offset = parseInt(searchParams.get('offset') || '0');
      const type = searchParams.get('type') as string | undefined;

      const transactions = await getWalletTransactions(walletId, {
        limit,
        offset,
        type: type as WalletTransactionType | undefined,
      });

      // Format transactions for display
      const formattedTransactions = transactions.map((tx) => ({
        ...tx,
        amount_formatted: formatCurrency(tx.amount_cents),
        bonus_formatted: formatCurrency(tx.bonus_amount_cents),
        balance_formatted: formatCurrency(tx.balance_after_cents),
      }));

      return NextResponse.json({ transactions: formattedTransactions });
    }

    // Get settings
    if (action === 'settings' && merchantId) {
      const settings = await getWalletSettings(merchantId);
      return NextResponse.json({ settings });
    }

    // Calculate bonus preview
    if (action === 'preview' && merchantId) {
      const amount = parseInt(searchParams.get('amount') || '0');

      if (amount <= 0) {
        return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
      }

      const bonus = await calculateBonus(merchantId, amount);

      return NextResponse.json({
        amount_cents: amount,
        amount_formatted: formatCurrency(amount),
        bonus_cents: bonus.bonus_cents,
        bonus_formatted: formatCurrency(bonus.bonus_cents),
        bonus_percent: bonus.bonus_percent,
        tier_name: bonus.tier_name,
        total_cents: bonus.total_cents,
        total_formatted: formatCurrency(bonus.total_cents),
      });
    }

    // Get wallet balance (default action)
    if (accountId && merchantId) {
      const balance = await getWalletBalance(accountId, merchantId);

      if (!balance) {
        return NextResponse.json({ error: 'Failed to get wallet balance' }, { status: 500 });
      }

      // Also get wallet ID for convenience
      const wallet = await getOrCreateWallet(accountId, merchantId);

      return NextResponse.json({
        wallet_id: wallet?.id,
        ...balance,
      });
    }

    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  } catch (error) {
    console.error('Wallet API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Create top-up session (for Stripe checkout)
    if (action === 'create-session') {
      const { walletId, amountCents, paymentMethod = 'stripe' } = body;

      if (!walletId || !amountCents) {
        return NextResponse.json({ error: 'Missing walletId or amountCents' }, { status: 400 });
      }

      const session = await createTopUpSession(walletId, amountCents, paymentMethod);

      if (!session) {
        return NextResponse.json({ error: 'Failed to create top-up session' }, { status: 500 });
      }

      return NextResponse.json({ session });
    }

    // Process cash top-up (immediate)
    if (action === 'cash-topup') {
      const { walletId, amountCents, processedBy, notes } = body;

      if (!walletId || !amountCents || !processedBy) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }

      const transactionId = await processCashTopUp(walletId, amountCents, processedBy, notes);

      if (!transactionId) {
        return NextResponse.json({ error: 'Failed to process cash top-up' }, { status: 500 });
      }

      // Get updated balance
      const wallet = await getOrCreateWallet(body.accountId, body.merchantId);
      const balance = wallet ? await getWalletBalance(wallet.account_id, wallet.merchant_id) : null;

      return NextResponse.json({
        success: true,
        transactionId,
        balance,
      });
    }

    // Use wallet for payment
    if (action === 'pay') {
      const { walletId, amountCents, referenceType, referenceId, description } = body;

      if (!walletId || !amountCents || !referenceType || !referenceId) {
        return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
      }

      const transactionId = await useWalletForPayment(
        walletId,
        amountCents,
        referenceType,
        referenceId,
        description
      );

      if (!transactionId) {
        return NextResponse.json({ error: 'Failed to process payment' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        transactionId,
      });
    }

    return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    console.error('Wallet API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
