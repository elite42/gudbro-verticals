import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { generateFeedbackToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * GET /api/cron/post-checkout-feedback
 *
 * Vercel Cron job: runs every 2 hours.
 * Sends post-stay feedback request emails to guests who checked out 2-24 hours ago.
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
    console.warn('Post-checkout cron: RESEND_API_KEY not configured');
    return NextResponse.json({ processed: 0, sent: 0, failed: 0, reason: 'no_provider' });
  }

  const supabase = getSupabaseAdmin();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://stays.gudbro.com';

  try {
    // Find bookings checked out between 2 and 24 hours ago
    const now = new Date();
    const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString();
    const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();

    const { data: bookings, error: queryError } = await supabase
      .from('accom_bookings')
      .select(
        `
        id,
        booking_code,
        guest_name,
        guest_email,
        check_in_date,
        check_out_date,
        checked_out_at,
        property_id
      `
      )
      .eq('status', 'checked_out')
      .not('guest_email', 'is', null)
      .not('checked_out_at', 'is', null)
      .gte('checked_out_at', twentyFourHoursAgo)
      .lte('checked_out_at', twoHoursAgo);

    if (queryError) {
      console.error('Post-checkout cron: query error', queryError);
      return NextResponse.json({ error: 'query_failed' }, { status: 500 });
    }

    if (!bookings || bookings.length === 0) {
      return NextResponse.json({ processed: 0, sent: 0, failed: 0 });
    }

    // Filter out bookings that already have post_stay_feedback email logged
    const bookingIds = bookings.map((b) => b.id);
    const { data: existingLogs } = await supabase
      .from('accom_email_logs')
      .select('booking_id')
      .in('booking_id', bookingIds)
      .eq('email_type', 'post_stay_feedback');

    const alreadySent = new Set((existingLogs || []).map((l) => l.booking_id));
    const pendingBookings = bookings.filter((b) => !alreadySent.has(b.id));

    // Also filter out bookings that already have post_stay feedback submitted
    const { data: existingFeedback } = await supabase
      .from('accom_guest_feedback')
      .select('booking_id')
      .in(
        'booking_id',
        pendingBookings.map((b) => b.id)
      )
      .eq('feedback_type', 'post_stay');

    const alreadyReviewed = new Set((existingFeedback || []).map((f) => f.booking_id));
    const eligibleBookings = pendingBookings.filter((b) => !alreadyReviewed.has(b.id));

    let sent = 0;
    let failed = 0;

    const emailFrom = process.env.EMAIL_FROM || 'GUDBRO Stays <noreply@gudbro.com>';

    for (const booking of eligibleBookings) {
      try {
        // Fetch property name
        const { data: property } = await supabase
          .from('accom_properties')
          .select('name')
          .eq('id', booking.property_id)
          .single();

        if (!property) {
          console.error('Post-checkout: property not found for booking', booking.id);
          failed++;
          continue;
        }

        // Generate feedback token (72h expiry)
        const feedbackToken = await generateFeedbackToken({
          id: booking.id,
          property_id: booking.property_id,
        });

        const feedbackUrl = `${appUrl}/feedback/${booking.id}?token=${feedbackToken}`;
        const guestFirstName = booking.guest_name?.split(' ')[0] || 'Guest';

        const html = buildFeedbackEmailHtml({
          guestName: guestFirstName,
          propertyName: property.name,
          feedbackUrl,
          checkIn: booking.check_in_date,
          checkOut: booking.check_out_date,
        });

        const text = buildFeedbackEmailText({
          guestName: guestFirstName,
          propertyName: property.name,
          feedbackUrl,
        });

        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${resendApiKey}`,
          },
          body: JSON.stringify({
            from: emailFrom,
            to: booking.guest_email,
            subject: `How was your stay at ${property.name}?`,
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
        console.error('Post-checkout: error processing booking', booking.id, err);
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
      processed: eligibleBookings.length,
      sent,
      failed,
      skippedAlreadySent: alreadySent.size,
      skippedAlreadyReviewed: alreadyReviewed.size,
    });
  } catch (err) {
    console.error('Post-checkout cron error:', err);
    return NextResponse.json({ error: 'internal_error' }, { status: 500 });
  }
}

// =============================================================================
// Email Logging (same pattern as pre-arrival)
// =============================================================================

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
      email_type: 'post_stay_feedback',
      recipient_email: recipientEmail,
      status,
      provider_message_id: messageId,
      error_message: errorMessage,
    });
  } catch (logErr) {
    console.error('Post-checkout: failed to log email', logErr);
  }
}

// =============================================================================
// Email Templates
// =============================================================================

interface FeedbackEmailData {
  guestName: string;
  propertyName: string;
  feedbackUrl: string;
  checkIn?: string;
  checkOut?: string;
}

function buildFeedbackEmailHtml(data: FeedbackEmailData): string {
  const brandColor = '#3D8B87';
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb">
  <div style="max-width:560px;margin:0 auto;padding:32px 16px">
    <div style="background:white;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1)">
      <div style="background:${brandColor};padding:32px 24px;text-align:center">
        <h1 style="color:white;margin:0;font-size:22px;font-weight:600">How was your stay?</h1>
      </div>
      <div style="padding:32px 24px">
        <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 16px">
          Hi ${data.guestName},
        </p>
        <p style="color:#374151;font-size:16px;line-height:1.6;margin:0 0 16px">
          Thank you for staying at <strong>${data.propertyName}</strong>! We'd love to hear about your experience.
        </p>
        <p style="color:#6b7280;font-size:14px;line-height:1.5;margin:0 0 24px">
          Your feedback helps us improve and helps future guests make informed decisions. It only takes a minute.
        </p>
        <div style="text-align:center;margin:24px 0">
          <a href="${data.feedbackUrl}" style="display:inline-block;background:${brandColor};color:white;text-decoration:none;padding:14px 32px;border-radius:12px;font-size:16px;font-weight:600">
            Rate Your Stay
          </a>
        </div>
        <p style="color:#9ca3af;font-size:12px;text-align:center;margin:24px 0 0">
          This link expires in 72 hours.
        </p>
      </div>
    </div>
    <p style="color:#9ca3af;font-size:11px;text-align:center;margin-top:16px">
      Powered by GUDBRO Stays
    </p>
  </div>
</body>
</html>`;
}

function buildFeedbackEmailText(data: FeedbackEmailData): string {
  return `Hi ${data.guestName},

Thank you for staying at ${data.propertyName}! We'd love to hear about your experience.

Rate your stay here: ${data.feedbackUrl}

This link expires in 72 hours.

- GUDBRO Stays`;
}
