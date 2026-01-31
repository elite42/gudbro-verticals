import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import QRCode from 'qrcode';
import {
  buildPreArrivalHtml,
  buildPreArrivalText,
  type PreArrivalEmailData,
} from '@/lib/email-templates';

export const dynamic = 'force-dynamic';

/**
 * GET /api/cron/pre-arrival-emails
 *
 * Vercel Cron job: runs daily at 08:00 UTC.
 * Sends pre-arrival emails with QR code to guests checking in tomorrow.
 * Protected by CRON_SECRET authorization header.
 */
export async function GET(request: NextRequest) {
  // Verify cron secret (Vercel sends Authorization: Bearer <CRON_SECRET>)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.warn('Pre-arrival cron: RESEND_API_KEY not configured');
    return NextResponse.json({ processed: 0, sent: 0, failed: 0, reason: 'no_provider' });
  }

  const supabase = getSupabaseAdmin();

  try {
    // Find bookings checking in tomorrow that haven't received pre-arrival email
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0]; // YYYY-MM-DD

    const { data: bookings, error: queryError } = await supabase
      .from('accom_bookings')
      .select(
        `
        id,
        booking_code,
        guest_name,
        guest_email,
        check_in_date,
        property_id,
        room_id
      `
      )
      .eq('check_in_date', tomorrowStr)
      .in('status', ['confirmed', 'pending_payment']);

    if (queryError) {
      console.error('Pre-arrival cron: query error', queryError);
      return NextResponse.json({ error: 'query_failed' }, { status: 500 });
    }

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({ processed: 0, sent: 0, failed: 0 });
    }

    // Filter out bookings that already have pre_arrival email logged
    const bookingIds = bookings.map((b) => b.id);
    const { data: existingLogs } = await supabase
      .from('accom_email_logs')
      .select('booking_id')
      .in('booking_id', bookingIds)
      .eq('email_type', 'pre_arrival');

    const alreadySent = new Set((existingLogs || []).map((l) => l.booking_id));
    const pendingBookings = bookings.filter((b) => !alreadySent.has(b.id));

    let sent = 0;
    let failed = 0;

    const emailFrom = process.env.EMAIL_FROM || 'GUDBRO Stays <noreply@gudbro.com>';

    for (const booking of pendingBookings) {
      try {
        // Fetch property details
        const { data: property } = await supabase
          .from('accom_properties')
          .select(
            'name, address, check_in_time, contact_phone, contact_whatsapp, host_name, wifi_network, wifi_password'
          )
          .eq('id', booking.property_id)
          .single();

        if (!property) {
          console.error('Pre-arrival: property not found for booking', booking.id);
          failed++;
          continue;
        }

        // Generate QR code for stay dashboard
        const stayUrl = `https://stays.gudbro.com/stay/${booking.booking_code}`;
        const qrDataUrl = await QRCode.toDataURL(stayUrl, {
          width: 200,
          margin: 2,
        });

        const emailData: PreArrivalEmailData = {
          propertyName: property.name,
          checkInTime: property.check_in_time || '14:00',
          qrDataUrl,
          propertyAddress: property.address,
          wifiName: property.wifi_network || null,
          wifiPassword: property.wifi_password || null,
          hostPhone: property.contact_whatsapp || property.contact_phone,
          hostName: property.host_name,
          brandColor: '#3D8B87',
        };

        const html = buildPreArrivalHtml(emailData);
        const text = buildPreArrivalText(emailData);

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: emailFrom,
            to: booking.guest_email,
            subject: `Your Stay Starts Tomorrow - ${property.name}`,
            html,
            text,
          }),
        });

        const result = await response.json();

        if (response.ok) {
          await logEmail(supabase, booking.id, booking.guest_email, 'sent', result.id, null);
          sent++;
        } else {
          await logEmail(
            supabase,
            booking.id,
            booking.guest_email,
            'failed',
            null,
            result.message || 'Resend error'
          );
          failed++;
        }
      } catch (err) {
        console.error('Pre-arrival: error processing booking', booking.id, err);
        await logEmail(
          supabase,
          booking.id,
          booking.guest_email,
          'failed',
          null,
          err instanceof Error ? err.message : 'Unknown error'
        );
        failed++;
      }
    }

    return NextResponse.json({
      processed: pendingBookings.length,
      sent,
      failed,
      skipped: alreadySent.size,
    });
  } catch (err) {
    console.error('Pre-arrival cron error:', err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}

async function logEmail(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  bookingId: string,
  recipientEmail: string,
  status: 'sent' | 'failed',
  messageId: string | null,
  errorMessage: string | null
) {
  try {
    await supabase.from('accom_email_logs').insert({
      booking_id: bookingId,
      email_type: 'pre_arrival',
      recipient_email: recipientEmail,
      status,
      provider_message_id: messageId,
      error_message: errorMessage,
    });
  } catch (logErr) {
    console.error('Pre-arrival: failed to log email', logErr);
  }
}
