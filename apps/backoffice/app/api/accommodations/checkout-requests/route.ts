import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

/**
 * GET /api/accommodations/checkout-requests?booking_id=...
 *
 * Fetch checkout requests for a specific booking.
 * Also performs conflict detection against adjacent bookings.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('booking_id');

    if (!bookingId) {
      return NextResponse.json({ error: 'booking_id is required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Fetch the booking to get room_id, check_in_date, check_out_date
    const { data: booking, error: bookingError } = await supabase
      .from('accom_bookings')
      .select('id, room_id, check_in_date, check_out_date, property_id')
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    // Fetch existing requests
    const { data: requests, error: reqError } = await supabase
      .from('accom_checkout_requests')
      .select('*')
      .eq('booking_id', bookingId)
      .order('created_at', { ascending: false });

    if (reqError) {
      console.error('Error fetching checkout requests:', reqError);
      return NextResponse.json({ error: 'Failed to fetch requests' }, { status: 500 });
    }

    // Conflict detection for each pending request
    const enrichedRequests = await Promise.all(
      (requests || []).map(async (req) => {
        if (req.status !== 'pending') return req;

        let hasConflict = false;
        let conflictBookingId: string | null = null;

        if (req.request_type === 'late_checkout' && booking.room_id) {
          // Check if another booking starts on check_out_date for the same room
          const { data: nextBooking } = await supabase
            .from('accom_bookings')
            .select('id')
            .eq('room_id', booking.room_id)
            .eq('check_in_date', booking.check_out_date)
            .neq('id', bookingId)
            .in('status', ['confirmed', 'checked_in', 'pending'])
            .limit(1)
            .maybeSingle();

          if (nextBooking) {
            hasConflict = true;
            conflictBookingId = nextBooking.id;
          }
        } else if (req.request_type === 'early_checkin' && booking.room_id) {
          // Check if another booking ends on check_in_date for the same room
          const { data: prevBooking } = await supabase
            .from('accom_bookings')
            .select('id')
            .eq('room_id', booking.room_id)
            .eq('check_out_date', booking.check_in_date)
            .neq('id', bookingId)
            .in('status', ['confirmed', 'checked_in', 'pending'])
            .limit(1)
            .maybeSingle();

          if (prevBooking) {
            hasConflict = true;
            conflictBookingId = prevBooking.id;
          }
        }

        // Update conflict status in DB if changed
        if (hasConflict !== req.has_conflict || conflictBookingId !== req.conflict_booking_id) {
          await supabase
            .from('accom_checkout_requests')
            .update({ has_conflict: hasConflict, conflict_booking_id: conflictBookingId })
            .eq('id', req.id);
        }

        return { ...req, has_conflict: hasConflict, conflict_booking_id: conflictBookingId };
      })
    );

    return NextResponse.json({ data: { requests: enrichedRequests } });
  } catch (err) {
    console.error('GET /api/accommodations/checkout-requests error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PATCH /api/accommodations/checkout-requests
 *
 * Approve or reject a checkout request.
 * Body: { requestId, action: 'approve' | 'reject', ownerResponse?: string }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { requestId, action, ownerResponse } = body;

    if (!requestId || !action || !['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'requestId and action (approve|reject) are required' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    const newStatus = action === 'approve' ? 'approved' : 'rejected';

    const { data: updated, error: updateError } = await supabase
      .from('accom_checkout_requests')
      .update({
        status: newStatus,
        owner_response: ownerResponse || null,
        responded_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', requestId)
      .eq('status', 'pending') // Only update if still pending
      .select('*')
      .single();

    if (updateError || !updated) {
      return NextResponse.json(
        { error: 'Request not found or already responded to' },
        { status: 404 }
      );
    }

    return NextResponse.json({ data: { request: updated } });
  } catch (err) {
    console.error('PATCH /api/accommodations/checkout-requests error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
