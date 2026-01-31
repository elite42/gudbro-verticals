/**
 * POST /api/checkout
 *
 * Creates a Stripe Checkout Session for card deposit payments.
 * Redirects guest to Stripe-hosted payment page.
 *
 * Flow:
 * 1. Validate booking exists, is pending_payment, and uses card
 * 2. Calculate deposit amount from property's deposit_percent
 * 3. Create Stripe Checkout Session
 * 4. Store session ID on booking
 * 5. Return checkout URL for redirect
 */
import { NextRequest, NextResponse } from 'next/server';
import { getStripe } from '@/lib/stripe';
import { getSupabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    let body: { bookingId: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const { bookingId } = body;
    if (!bookingId) {
      return NextResponse.json({ error: 'bookingId is required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Fetch booking with property join for deposit config
    const { data: booking, error: bookingError } = await supabase
      .from('accom_bookings')
      .select(
        `
        id,
        booking_code,
        status,
        payment_method,
        payment_status,
        total_price,
        currency,
        num_nights,
        guest_email,
        stripe_checkout_session_id,
        property:accom_properties!accom_bookings_property_id_fkey (
          id,
          name,
          deposit_percent
        )
      `
      )
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Validate booking state
    if (booking.status !== 'pending_payment') {
      return NextResponse.json(
        { error: `Booking status is '${booking.status}', expected 'pending_payment'` },
        { status: 400 }
      );
    }

    if (booking.payment_method !== 'card') {
      return NextResponse.json(
        { error: 'Checkout is only available for card payments' },
        { status: 400 }
      );
    }

    const property = booking.property as unknown as {
      id: string;
      name: string;
      deposit_percent: number;
    };

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    // Calculate deposit amount (integer minor currency units)
    const depositPercent = property.deposit_percent || 100;
    let depositAmount = Math.round(booking.total_price * (depositPercent / 100));

    // Stripe minimum is ~50 cents (50 units for USD). For zero-decimal currencies
    // like VND, 50 units is fine. Use total_price if deposit is below minimum.
    if (depositAmount < 50) {
      depositAmount = booking.total_price;
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Create Stripe Checkout Session
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      customer_email: booking.guest_email || undefined,
      line_items: [
        {
          price_data: {
            currency: (booking.currency || 'USD').toLowerCase(),
            product_data: {
              name: `Booking deposit - ${property.name}`,
              description: `${booking.num_nights} night${booking.num_nights !== 1 ? 's' : ''}`,
            },
            unit_amount: depositAmount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        booking_id: booking.id,
        property_id: property.id,
        deposit_percent: depositPercent.toString(),
      },
      success_url: `${appUrl}/booking/${booking.booking_code}?payment=success`,
      cancel_url: `${appUrl}/booking/${booking.booking_code}?payment=cancelled`,
    });

    // Store checkout session ID on booking
    await supabase
      .from('accom_bookings')
      .update({
        stripe_checkout_session_id: session.id,
        deposit_amount: depositAmount,
        deposit_percent: depositPercent,
      })
      .eq('id', booking.id);

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error('POST /api/checkout error:', err);
    return NextResponse.json({ error: 'stripe_checkout_failed' }, { status: 500 });
  }
}
