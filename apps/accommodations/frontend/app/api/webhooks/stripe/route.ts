/**
 * Stripe Webhook for Accommodations Booking Payments
 *
 * Handles payment lifecycle events from Stripe Checkout.
 * Signature verification ensures only legitimate Stripe events are processed.
 *
 * Event handlers are stubbed -- actual logic added in Phase 20 (Payments).
 *
 * POST /api/webhooks/stripe
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16',
});

const endpointSecret = process.env.STRIPE_ACCOM_WEBHOOK_SECRET;

export async function POST(request: NextRequest) {
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
      const bookingId = session.metadata?.booking_id;

      if (bookingId) {
        // TODO Phase 20: Update booking payment_status to 'paid', status to 'confirmed'
        console.log('Checkout session completed for booking:', bookingId);
      }
      break;
    }

    case 'checkout.session.expired': {
      const session = event.data.object as Stripe.Checkout.Session;
      const bookingId = session.metadata?.booking_id;

      if (bookingId) {
        // TODO Phase 20: Handle expired checkout session
        console.log('Checkout session expired for booking:', bookingId);
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
