import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { formatPrice } from '@/lib/price-utils';
import {
  buildBookingConfirmationHtml,
  buildBookingConfirmationText,
  type BookingConfirmationEmailData,
} from '@/lib/email-templates';

export const dynamic = 'force-dynamic';

/**
 * POST /api/email/booking-confirmation
 *
 * Sends booking confirmation email to guest.
 * Called fire-and-forget from booking creation.
 * Failures are logged but never block the booking flow.
 */
export async function POST(request: NextRequest) {
  try {
    const { bookingId } = await request.json();

    if (!bookingId) {
      return NextResponse.json({ error: 'Missing bookingId' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Fetch booking with property and room data
    const { data: booking, error: bookingError } = await supabase
      .from('accom_bookings')
      .select(
        `
        id,
        booking_code,
        guest_name,
        guest_last_name,
        guest_email,
        check_in_date,
        check_out_date,
        guest_count,
        status,
        price_per_night,
        num_nights,
        subtotal,
        cleaning_fee,
        discount_amount,
        total_price,
        currency,
        payment_method,
        room_id,
        property_id
      `
      )
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      console.error('Email: booking not found', bookingId, bookingError);
      return NextResponse.json({ error: 'booking_not_found' }, { status: 404 });
    }

    // Fetch property
    const { data: property, error: propError } = await supabase
      .from('accom_properties')
      .select('name, address, latitude, longitude, contact_phone, contact_whatsapp, host_name')
      .eq('id', booking.property_id)
      .single();

    if (propError || !property) {
      console.error('Email: property not found', booking.property_id, propError);
      return NextResponse.json({ error: 'property_not_found' }, { status: 404 });
    }

    // Fetch room type
    const { data: room } = await supabase
      .from('accom_rooms')
      .select('room_type')
      .eq('id', booking.room_id)
      .single();

    const roomType = room?.room_type || 'Standard';

    // Convert minor units to display values for email
    const minorUnits = booking.currency === 'VND' ? 1 : 100;

    const emailData: BookingConfirmationEmailData = {
      bookingCode: booking.booking_code,
      propertyName: property.name,
      checkIn: booking.check_in_date,
      checkOut: booking.check_out_date,
      roomType,
      guests: booking.guest_count,
      pricePerNight: booking.price_per_night / minorUnits,
      nights: booking.num_nights,
      cleaningFee: booking.cleaning_fee / minorUnits,
      discount: booking.discount_amount / minorUnits,
      totalPrice: booking.total_price / minorUnits,
      currency: booking.currency,
      paymentStatus: booking.status === 'confirmed' ? 'Confirmed' : 'Pending',
      propertyAddress: property.address,
      lat: property.latitude,
      lng: property.longitude,
      hostPhone: property.contact_whatsapp || property.contact_phone,
      hostName: property.host_name,
      brandColor: '#3D8B87',
    };

    const html = buildBookingConfirmationHtml(emailData);
    const text = buildBookingConfirmationText(emailData);

    // Send via Resend API
    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      console.warn('Email: RESEND_API_KEY not configured, skipping email send');
      await logEmailAttempt(
        supabase,
        booking.id,
        booking.guest_email,
        'skipped',
        null,
        'No email provider configured'
      );
      return NextResponse.json({ success: false, reason: 'no_provider' });
    }

    const emailFrom = process.env.EMAIL_FROM || 'GUDBRO Stays <noreply@gudbro.com>';

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: emailFrom,
        to: booking.guest_email,
        subject: `Booking Confirmed - ${property.name} (${booking.booking_code})`,
        html,
        text,
      }),
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Email: Resend API error', result);
      await logEmailAttempt(
        supabase,
        booking.id,
        booking.guest_email,
        'failed',
        null,
        result.message || 'Resend API error'
      );
      // Return 200 -- email failure should not propagate as error
      return NextResponse.json({ success: false, error: result.message });
    }

    await logEmailAttempt(supabase, booking.id, booking.guest_email, 'sent', result.id, null);

    return NextResponse.json({ success: true, messageId: result.id });
  } catch (err) {
    console.error('POST /api/email/booking-confirmation error:', err);
    return NextResponse.json({ success: false, error: 'internal_error' });
  }
}

/**
 * Log email attempt to accom_email_logs table
 */
async function logEmailAttempt(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  bookingId: string,
  recipientEmail: string,
  status: 'sent' | 'failed' | 'skipped',
  messageId: string | null,
  errorMessage: string | null
) {
  try {
    await supabase.from('accom_email_logs').insert({
      booking_id: bookingId,
      email_type: 'booking_confirmation',
      recipient_email: recipientEmail,
      status,
      provider_message_id: messageId,
      error_message: errorMessage,
    });
  } catch (logErr) {
    console.error('Email: failed to log email attempt', logErr);
  }
}
