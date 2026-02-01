import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken, verifyFeedbackToken } from '@/lib/auth';
import type { ApiResponse, GuestFeedback } from '@/types/stay';

export const dynamic = 'force-dynamic';

interface PostStayRatings {
  cleanliness: number;
  location: number;
  value: number;
  communication: number;
  wifi: number;
}

interface PostStayBody {
  ratings: PostStayRatings;
  overallRating: number;
  comment?: string;
}

/**
 * POST /api/stay/[code]/feedback/post-stay
 *
 * Submit post-stay feedback with star ratings.
 * Auth: accepts EITHER guest JWT (session) OR feedback token (email link).
 *
 * Body: { ratings: { cleanliness, location, value, communication, wifi }, overallRating, comment? }
 * Returns: { data: GuestFeedback } or 409 if already submitted
 */
export async function POST(request: NextRequest, { params }: { params: { code: string } }) {
  try {
    const supabase = getSupabaseAdmin();
    const { code } = params;

    // Try to authenticate via guest JWT or feedback token
    let bookingId: string | null = null;
    let propertyId: string | null = null;

    const authHeader = request.headers.get('authorization');
    const url = new URL(request.url);
    const feedbackToken = url.searchParams.get('token');

    if (authHeader?.startsWith('Bearer ')) {
      // Try guest JWT first
      try {
        const guest = await verifyGuestToken(authHeader.slice(7));
        bookingId = guest.bookingId;
        propertyId = guest.propertyId;
      } catch {
        // Not a valid guest JWT, try feedback token from header value
      }
    }

    if (!bookingId && feedbackToken) {
      try {
        const feedback = await verifyFeedbackToken(feedbackToken);
        bookingId = feedback.bookingId;
        propertyId = feedback.propertyId;
      } catch {
        return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
      }
    }

    if (!bookingId || !propertyId) {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    // Verify booking exists and matches code
    const { data: booking, error: bookingError } = await supabase
      .from('accom_bookings')
      .select('id, guest_name, room:accom_rooms(id, room_number)')
      .eq('booking_code', code)
      .eq('id', bookingId)
      .single();

    if (bookingError || !booking) {
      // For feedback token auth, code might not match - try by bookingId only
      const { data: bookingById } = await supabase
        .from('accom_bookings')
        .select('id, booking_code, guest_name, room:accom_rooms(id, room_number)')
        .eq('id', bookingId)
        .single();

      if (!bookingById) {
        return NextResponse.json<ApiResponse<null>>(
          { error: 'booking_not_found' },
          { status: 404 }
        );
      }

      // Use the booking found by ID
      Object.assign(booking || {}, bookingById);
      if (!booking) {
        return NextResponse.json<ApiResponse<null>>(
          { error: 'booking_not_found' },
          { status: 404 }
        );
      }
    }

    // Parse and validate body
    const body: PostStayBody = await request.json();
    const { ratings, overallRating, comment } = body;

    if (!ratings || typeof ratings !== 'object') {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Ratings object is required' },
        { status: 400 }
      );
    }

    // Validate all ratings are 1-5 integers
    const ratingFields: (keyof PostStayRatings)[] = [
      'cleanliness',
      'location',
      'value',
      'communication',
      'wifi',
    ];
    for (const field of ratingFields) {
      const val = ratings[field];
      if (!Number.isInteger(val) || val < 1 || val > 5) {
        return NextResponse.json<ApiResponse<null>>(
          { error: `Rating "${field}" must be an integer between 1 and 5` },
          { status: 400 }
        );
      }
    }

    if (!Number.isInteger(overallRating) || overallRating < 1 || overallRating > 5) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Overall rating must be an integer between 1 and 5' },
        { status: 400 }
      );
    }

    // Supabase FK join cast
    const room = (booking.room as unknown as { id: string; room_number: string }) || null;

    // Insert feedback record
    const { data: feedback, error: insertError } = await supabase
      .from('accom_guest_feedback')
      .insert({
        property_id: propertyId,
        booking_id: bookingId,
        room_id: room?.id || null,
        feedback_type: 'post_stay',
        category: 'compliment', // Default category for post-stay (required by schema)
        message: comment?.trim() || 'Rating submitted without comment.',
        rating_cleanliness: ratings.cleanliness,
        rating_location: ratings.location,
        rating_value: ratings.value,
        rating_communication: ratings.communication,
        rating_wifi: ratings.wifi,
        rating_overall: overallRating,
        guest_name: (booking.guest_name as string) || null,
        guest_room_number: room?.room_number || null,
      })
      .select('*')
      .single();

    if (insertError) {
      // Handle UNIQUE constraint violation (one post_stay per booking)
      if (
        insertError.code === '23505' ||
        insertError.message?.includes('unique') ||
        insertError.message?.includes('duplicate')
      ) {
        return NextResponse.json<ApiResponse<null>>(
          { error: 'Feedback already submitted for this stay.' },
          { status: 409 }
        );
      }

      console.error('POST /api/stay/[code]/feedback/post-stay insert error:', insertError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
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
    console.error('POST /api/stay/[code]/feedback/post-stay error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
