/**
 * Stripe Webhook for Accommodations Booking Payments
 *
 * Handles payment lifecycle events from Stripe Checkout.
 * Signature verification ensures only legitimate Stripe events are processed.
 *
 * Events handled:
 * - checkout.session.completed: Confirm booking, update payment status
 * - checkout.session.expired: Revert to pending for retry
 *
 * POST /api/webhooks/stripe
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase';

const endpointSecret = process.env.STRIPE_ACCOM_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature || !endpointSecret) {
    return NextResponse.json({ error: 'Missing signature or endpoint secret' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const supabase = getSupabaseAdmin();

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;

      if (bookingId) {
        // Idempotency check: skip if already paid
        const { data: existing } = await supabase
          .from('accom_bookings')
          .select('payment_status')
          .eq('id', bookingId)
          .single();

        if (existing?.payment_status === 'paid') {
          console.log(`Payment already confirmed for booking ${bookingId}, skipping`);
          break;
        }

        // Determine payment status based on deposit percent
        const depositPercent = parseInt(session.metadata?.deposit_percent || '100', 10);
        const paymentStatus = depositPercent >= 100 ? 'paid' : 'partial';

        const { error: updateError } = await supabase
          .from('accom_bookings')
          .update({
            payment_status: paymentStatus,
            status: 'confirmed',
            stripe_payment_intent_id:
              typeof session.payment_intent === 'string'
                ? session.payment_intent
                : session.payment_intent?.id || null,
          })
          .eq('id', bookingId);

        if (updateError) {
          console.error(`Failed to update booking ${bookingId}:`, updateError);
        } else {
          console.log(
            `Payment confirmed for booking ${bookingId} (${paymentStatus}, ${depositPercent}% deposit)`
          );
        }
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;

      if (bookingId) {
        // Only revert if still pending_payment (conditional update)
        const { error: updateError } = await supabase
          .from('accom_bookings')
          .update({ status: 'pending' })
          .eq('id', bookingId)
          .eq('status', 'pending_payment');

        if (updateError) {
          console.error(`Failed to revert booking ${bookingId}:`, updateError);
        } else {
          console.log(`Checkout session expired for booking ${bookingId}, reverted to pending`);
        }
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
