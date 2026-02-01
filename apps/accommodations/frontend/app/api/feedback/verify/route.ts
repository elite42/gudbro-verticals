import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyFeedbackToken } from '@/lib/auth';

export const dynamic = 'force-dynamic';

/**
 * GET /api/feedback/verify?bookingId=xxx&token=xxx
 *
 * Verifies feedback token and returns booking info for the feedback page.
 * Also checks if feedback was already submitted.
 */
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const bookingId = url.searchParams.get('bookingId');
  const token = url.searchParams.get('token');

  if (!bookingId || !token) {
    return NextResponse.json({ error: 'session_expired' }, { status: 401 });
  }

  // Verify token
  let tokenPayload;
  try {
    tokenPayload = await verifyFeedbackToken(token);
  } catch {
    return NextResponse.json({ error: 'session_expired' }, { status: 401 });
  }

  // Ensure token bookingId matches URL bookingId
  if (tokenPayload.bookingId !== bookingId) {
    return NextResponse.json({ error: 'session_expired' }, { status: 401 });
  }

  const supabase = getSupabaseAdmin();

  // Fetch booking info
  const { data: booking, error: bookingError } = await supabase
    .from('accom_bookings')
    .select(
      `
      id,
      booking_code,
      guest_name,
      check_in_date,
      check_out_date,
      property:accom_properties(name)
    `
    )
    .eq('id', bookingId)
    .single();

  if (bookingError || !booking) {
    return NextResponse.json({ error: 'booking_not_found' }, { status: 404 });
  }

  // Check if post_stay feedback already exists
  const { data: existingFeedback } = await supabase
    .from('accom_guest_feedback')
    .select('id')
    .eq('booking_id', bookingId)
    .eq('feedback_type', 'post_stay')
    .limit(1);

  if (existingFeedback && existingFeedback.length > 0) {
    return NextResponse.json({ error: 'already_submitted' }, { status: 409 });
  }

  const property = booking.property as unknown as { name: string };

  return NextResponse.json({
    booking: {
      propertyName: property?.name || 'Property',
      guestName: booking.guest_name || 'Guest',
      checkIn: booking.check_in_date,
      checkOut: booking.check_out_date,
      bookingCode: booking.booking_code,
    },
  });
}
