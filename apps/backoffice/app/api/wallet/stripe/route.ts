/**
 * Stripe Wallet Top-Up API
 *
 * POST /api/wallet/stripe - Create Stripe checkout session for top-up
 * POST /api/wallet/stripe?action=webhook - Handle Stripe webhooks
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  createTopUpSession,
  completeStripeTopUp,
  getWalletById,
  calculateBonus,
  formatCurrency,
} from '@/lib/wallet-service';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_WALLET_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const action = searchParams.get('action');

  // Handle webhook
  if (action === 'webhook') {
    return handleWebhook(request);
  }

  // Create checkout session
  return createCheckoutSession(request);
}

/**
 * Create Stripe Checkout Session for wallet top-up
 */
async function createCheckoutSession(request: NextRequest) {
  try {
    const body = await request.json();
    const { walletId, amountCents, successUrl, cancelUrl } = body;

    if (!walletId || !amountCents) {
      return NextResponse.json({ error: 'Missing walletId or amountCents' }, { status: 400 });
    }

    // Get wallet details
    const wallet = await getWalletById(walletId);
    if (!wallet) {
      return NextResponse.json({ error: 'Wallet not found' }, { status: 404 });
    }

    // Calculate bonus
    const bonus = await calculateBonus(wallet.merchant_id, amountCents);

    // Create internal top-up session
    const topUpSession = await createTopUpSession(walletId, amountCents, 'stripe');
    if (!topUpSession) {
      return NextResponse.json({ error: 'Failed to create top-up session' }, { status: 500 });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: wallet.currency.toLowerCase(),
            product_data: {
              name: 'Wallet Top-Up',
              description:
                bonus.bonus_cents > 0
                  ? `${formatCurrency(amountCents, wallet.currency)} + ${formatCurrency(bonus.bonus_cents, wallet.currency)} bonus (${bonus.bonus_percent}%)`
                  : `Add ${formatCurrency(amountCents, wallet.currency)} to your wallet`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        topup_session_id: topUpSession.id,
        wallet_id: walletId,
        amount_cents: amountCents.toString(),
        bonus_cents: bonus.bonus_cents.toString(),
      },
      success_url:
        successUrl ||
        `${process.env.NEXT_PUBLIC_APP_URL}/wallet?success=true&session={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.NEXT_PUBLIC_APP_URL}/wallet?cancelled=true`,
    });

    // Update top-up session with Stripe session ID
    const { getSupabaseAdmin } = await import('@/lib/supabase-admin');
    const supabase = getSupabaseAdmin();

    await supabase
      .from('wallet_top_up_sessions')
      .update({
        stripe_checkout_session_id: session.id,
        status: 'processing',
      } as Record<string, unknown>)
      .eq('id', topUpSession.id);

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
      topUpSessionId: topUpSession.id,
      amountCents,
      bonusCents: bonus.bonus_cents,
      totalCents: bonus.total_cents,
    });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Checkout failed' },
      { status: 500 }
    );
  }
}

/**
 * Handle Stripe webhooks for payment completion
 */
async function handleWebhook(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !endpointSecret) {
    return NextResponse.json({ error: 'Missing signature or endpoint secret' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      // Get metadata
      const topupSessionId = session.metadata?.topup_session_id;
      const paymentIntentId = session.payment_intent as string;

      if (topupSessionId && paymentIntentId) {
        // Complete the top-up
        const transactionId = await completeStripeTopUp(topupSessionId, paymentIntentId);

        if (transactionId) {
          // Top-up completed successfully
        } else {
          console.error('Failed to complete wallet top-up:', topupSessionId);
        }
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const topupSessionId = session.metadata?.topup_session_id;

      if (topupSessionId) {
        // Mark session as expired
        const { getSupabaseAdmin } = await import('@/lib/supabase-admin');
        const supabase = getSupabaseAdmin();

        await supabase
          .from('wallet_top_up_sessions')
          .update({ status: 'expired' } as Record<string, unknown>)
          .eq('id', topupSessionId);
      }
      break;
    }

    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.warn('[Stripe] Payment failed:', paymentIntent.id);
      break;
    }

    default:
      console.warn('[Stripe] Unhandled event type:', event.type);
  }

  return NextResponse.json({ received: true });
}
