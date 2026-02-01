import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken, requireFullAccess } from '@/lib/auth';
import type { ApiResponse, GuestFeedback, FeedbackListResponse } from '@/types/stay';

export const dynamic = 'force-dynamic';

/**
 * POST /api/stay/[code]/feedback
 *
 * Submit in-stay feedback (maintenance, housekeeping, complaint, etc.).
 * Requires full-access tier. Queues notification to property owner.
 *
 * Body: { category: string, message: string, photoUrl?: string }
 * Returns: { data: GuestFeedback }
 */
export async function POST(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    // Authenticate guest
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    let guest;
    try {
      guest = await verifyGuestToken(authHeader.slice(7));
    } catch {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    // Require full access (browse-tier cannot submit feedback)
    if (!requireFullAccess(guest)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'verification_required' },
        { status: 403 }
      );
    }

    const supabase = getSupabaseAdmin();
    const { code } = params;

    // Verify booking_code matches guest token
    const { data: booking, error: bookingError } = await supabase
      .from('accom_bookings')
      .select('id, guest_name, room:accom_rooms(id, room_number)')
      .eq('booking_code', code)
      .eq('id', guest.bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json<ApiResponse<null>>({ error: 'booking_not_found' }, { status: 404 });
    }

    // Parse and validate body
    const body = await request.json();
    const { category, message, photoUrl } = body;

    const validCategories = [
      'maintenance',
      'housekeeping',
      'question',
      'complaint',
      'compliment',
      'other',
    ];
    if (!category || !validCategories.includes(category)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Invalid category. Must be one of: ' + validCategories.join(', ') },
        { status: 400 }
      );
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Message must be at least 10 characters.' },
        { status: 400 }
      );
    }

    // Supabase returns single FK join as object, but TS sees array; cast through unknown
    const room = (booking.room as unknown as { id: string; room_number: string }) || null;

    // Insert feedback record
    const { data: feedback, error: insertError } = await supabase
      .from('accom_guest_feedback')
      .insert({
        property_id: guest.propertyId,
        booking_id: guest.bookingId,
        room_id: room?.id || null,
        feedback_type: 'in_stay',
        category,
        message: message.trim(),
        photo_url: photoUrl || null,
        guest_name: (booking.guest_name as string) || null,
        guest_room_number: room?.room_number || null,
      })
      .select('*')
      .single();

    if (insertError || !feedback) {
      console.error('POST /api/stay/[code]/feedback insert error:', insertError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // Queue notification to property owner
    try {
      // Look up property owner
      const { data: property } = await supabase
        .from('accom_properties')
        .select('owner_id')
        .eq('id', guest.propertyId)
        .single();

      if (property?.owner_id) {
        const priority = category === 'complaint' ? 'high' : 'normal';
        await supabase.rpc('queue_notification', {
          p_type: 'in_app',
          p_payload: {
            event: 'guest_feedback',
            feedbackId: feedback.id,
            category,
            roomNumber: room?.room_number || 'Unknown',
            guestName: (booking.guest_name as string) || 'Guest',
            messagePreview: message.trim().slice(0, 100),
          },
          p_user_id: property.owner_id,
          p_priority: priority,
        });
      }
    } catch (notifErr) {
      // Notification failure should not fail the feedback submission
      console.error('POST /api/stay/[code]/feedback notification error:', notifErr);
    }

    // Map to camelCase response
    const result: GuestFeedback = {
      id: feedback.id,
      propertyId: feedback.property_id,
      bookingId: feedback.booking_id,
      roomId: feedback.room_id,
      feedbackType: feedback.feedback_type,
      category: feedback.category,
      message: feedback.message,
      photoUrl: feedback.photo_url,
      status: feedback.status,
      ownerResponse: feedback.owner_response,
      respondedAt: feedback.responded_at,
      guestName: feedback.guest_name,
      guestRoomNumber: feedback.guest_room_number,
      createdAt: feedback.created_at,
      updatedAt: feedback.updated_at,
    };

    return NextResponse.json<ApiResponse<GuestFeedback>>({ data: result }, { status: 201 });
  } catch (err) {
    console.error('POST /api/stay/[code]/feedback error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}

/**
 * GET /api/stay/[code]/feedback
 *
 * Retrieve all feedback for the current booking.
 * Returns feedback list ordered by created_at DESC so guest can see
 * their submissions and any owner responses.
 */
export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    // Authenticate guest
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    let guest;
    try {
      guest = await verifyGuestToken(authHeader.slice(7));
    } catch {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    // Require full access
    if (!requireFullAccess(guest)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'verification_required' },
        { status: 403 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Verify booking exists
    const { data: booking } = await supabase
      .from('accom_bookings')
      .select('id')
      .eq('booking_code', params.code)
      .eq('id', guest.bookingId)
      .single();

    if (!booking) {
      return NextResponse.json<ApiResponse<null>>({ error: 'booking_not_found' }, { status: 404 });
    }

    // Fetch feedback for this booking
    const { data: feedbackRows, error: fetchError } = await supabase
      .from('accom_guest_feedback')
      .select('*')
      .eq('booking_id', guest.bookingId)
      .order('created_at', { ascending: false });

    if (fetchError) {
      console.error('GET /api/stay/[code]/feedback fetch error:', fetchError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    const feedback: GuestFeedback[] = (feedbackRows || []).map((row) => ({
      id: row.id,
      propertyId: row.property_id,
      bookingId: row.booking_id,
      roomId: row.room_id,
      feedbackType: row.feedback_type,
      category: row.category,
      message: row.message,
      photoUrl: row.photo_url,
      status: row.status,
      ownerResponse: row.owner_response,
      respondedAt: row.responded_at,
      guestName: row.guest_name,
      guestRoomNumber: row.guest_room_number,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    }));

    return NextResponse.json<ApiResponse<FeedbackListResponse>>({
      data: { feedback },
    });
  } catch (err) {
    console.error('GET /api/stay/[code]/feedback error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
