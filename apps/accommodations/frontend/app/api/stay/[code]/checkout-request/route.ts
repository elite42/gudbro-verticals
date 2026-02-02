import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken, requireFullAccess } from '@/lib/auth';
import type { ApiResponse } from '@/types/stay';

export const dynamic = 'force-dynamic';

interface CheckoutRequestBody {
  request_type: 'early_checkin' | 'late_checkout';
  requested_time: string;
  reason?: string;
}

/**
 * POST /api/stay/[code]/checkout-request
 *
 * Guest submits an early check-in or late checkout request.
 * Requires full-access JWT. Prevents duplicate requests per type.
 */
export async function POST(request: NextRequest, { params }: { params: { code: string } }) {
  try {
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
      .select('id, property_id, status')
      .eq('booking_code', code)
      .eq('id', guest.bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json<ApiResponse<null>>({ error: 'booking_not_found' }, { status: 404 });
    }

    // Don't allow requests for checked out or cancelled bookings
    if (['checked_out', 'cancelled'].includes(booking.status)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Booking is no longer active' },
        { status: 400 }
      );
    }

    let body: CheckoutRequestBody;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Validate request_type
    if (!['early_checkin', 'late_checkout'].includes(body.request_type)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Invalid request_type' },
        { status: 400 }
      );
    }

    // Validate requested_time format (HH:MM or HH:MM:SS)
    if (!body.requested_time || !/^\d{2}:\d{2}(:\d{2})?$/.test(body.requested_time)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'Invalid requested_time format' },
        { status: 400 }
      );
    }

    // Insert (unique constraint prevents duplicates per booking+type)
    const { data: created, error: insertError } = await supabase
      .from('accom_checkout_requests')
      .insert({
        booking_id: booking.id,
        property_id: booking.property_id,
        request_type: body.request_type,
        requested_time: body.requested_time,
        reason: body.reason || null,
      })
      .select('*')
      .single();

    if (insertError) {
      // Check for unique constraint violation (duplicate request)
      if (insertError.code === '23505') {
        return NextResponse.json<ApiResponse<null>>(
          { error: 'You already submitted this type of request' },
          { status: 409 }
        );
      }
      console.error('Checkout request insert error:', insertError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    return NextResponse.json({ data: { request: created } });
  } catch (err) {
    console.error('POST /api/stay/[code]/checkout-request error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}

/**
 * GET /api/stay/[code]/checkout-request
 *
 * Returns existing checkout requests for the guest's booking.
 */
export async function GET(request: NextRequest, { params }: { params: { code: string } }) {
  try {
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
      .select('id')
      .eq('booking_code', code)
      .eq('id', guest.bookingId)
      .single();

    if (bookingError || !booking) {
      return NextResponse.json<ApiResponse<null>>({ error: 'booking_not_found' }, { status: 404 });
    }

    const { data: requests, error: reqError } = await supabase
      .from('accom_checkout_requests')
      .select('*')
      .eq('booking_id', booking.id)
      .order('created_at', { ascending: false });

    if (reqError) {
      console.error('Checkout request fetch error:', reqError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    return NextResponse.json({ data: { requests: requests || [] } });
  } catch (err) {
    console.error('GET /api/stay/[code]/checkout-request error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
