import { NextRequest, NextResponse } from 'next/server';
import { differenceInDays, parseISO, addHours, isBefore, startOfDay } from 'date-fns';
import { getSupabaseAdmin } from '@/lib/supabase';
import { signGuestToken } from '@/lib/auth';
import { calculatePriceBreakdown } from '@/lib/price-utils';
import type { ApiResponse, BookingResponse, BookingSubmission } from '@/types/property';

export const dynamic = 'force-dynamic';

/**
 * POST /api/booking
 *
 * Booking submission endpoint. Validates input, calculates pricing
 * server-side (authoritative), inserts booking, and returns JWT.
 *
 * Double-booking prevention is handled by the DB exclusion constraint
 * (migration 083). We catch PostgreSQL error 23P01 (exclusion_violation).
 *
 * Booking mode:
 * - instant: status = 'confirmed' immediately
 * - inquiry: status = 'pending' with expires_at deadline
 */
export async function POST(request: NextRequest) {
  try {
    let body: BookingSubmission;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json<ApiResponse<null>>({ error: 'validation_error' }, { status: 400 });
    }

    // Validate required fields
    const {
      propertySlug,
      roomId,
      firstName,
      lastName,
      email,
      phone,
      guestCount,
      checkIn,
      checkOut,
    } = body;
    if (
      !propertySlug ||
      !roomId ||
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !guestCount ||
      !checkIn ||
      !checkOut
    ) {
      return NextResponse.json<ApiResponse<null>>({ error: 'validation_error' }, { status: 400 });
    }

    // Validate dates
    const checkInDate = parseISO(checkIn);
    const checkOutDate = parseISO(checkOut);
    const today = startOfDay(new Date());

    if (isBefore(checkInDate, today)) {
      return NextResponse.json<ApiResponse<null>>({ error: 'invalid_dates' }, { status: 400 });
    }

    if (!isBefore(checkInDate, checkOutDate)) {
      return NextResponse.json<ApiResponse<null>>({ error: 'invalid_dates' }, { status: 400 });
    }

    const nights = differenceInDays(checkOutDate, checkInDate);

    const supabase = getSupabaseAdmin();

    // Fetch property
    const { data: property, error: propError } = await supabase
      .from('accom_properties')
      .select(
        'id, name, booking_mode, min_nights, max_nights, cleaning_fee, weekly_discount_percent, monthly_discount_percent, inquiry_timeout_hours, contact_phone, contact_whatsapp'
      )
      .eq('slug', propertySlug)
      .eq('is_active', true)
      .single();

    if (propError || !property) {
      return NextResponse.json<ApiResponse<null>>({ error: 'property_not_found' }, { status: 404 });
    }

    if (property.booking_mode === 'disabled') {
      return NextResponse.json<ApiResponse<null>>({ error: 'property_disabled' }, { status: 403 });
    }

    // Validate min/max nights
    if (nights < property.min_nights) {
      return NextResponse.json<ApiResponse<null>>({ error: 'min_nights_not_met' }, { status: 400 });
    }
    if (property.max_nights && nights > property.max_nights) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'max_nights_exceeded' },
        { status: 400 }
      );
    }

    // Fetch room
    const { data: room, error: roomError } = await supabase
      .from('accom_rooms')
      .select('id, base_price_per_night, currency, capacity')
      .eq('id', roomId)
      .eq('property_id', property.id)
      .eq('is_active', true)
      .single();

    if (roomError || !room) {
      return NextResponse.json<ApiResponse<null>>({ error: 'room_not_found' }, { status: 404 });
    }

    // Validate guest count
    if (guestCount > room.capacity) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'max_guests_exceeded' },
        { status: 400 }
      );
    }

    // Calculate price (server-authoritative)
    const priceBreakdown = calculatePriceBreakdown(
      room.base_price_per_night,
      checkInDate,
      checkOutDate,
      property.cleaning_fee || 0,
      property.weekly_discount_percent || 0,
      property.monthly_discount_percent || 0,
      room.currency
    );

    // Determine booking status
    const status = property.booking_mode === 'instant' ? 'confirmed' : 'pending';
    const expiresAt =
      status === 'pending' ? addHours(new Date(), property.inquiry_timeout_hours || 24) : null;

    // Insert booking -- let DB exclusion constraint handle double-booking
    const { data: booking, error: insertError } = await supabase
      .from('accom_bookings')
      .insert({
        property_id: property.id,
        room_id: roomId,
        guest_name: firstName,
        guest_last_name: lastName,
        guest_email: email,
        guest_phone: phone,
        guest_count: guestCount,
        check_in_date: checkIn,
        check_out_date: checkOut,
        special_requests: body.specialRequests || null,
        status,
        booking_source: 'direct',
        price_per_night: priceBreakdown.pricePerNight,
        num_nights: priceBreakdown.nights,
        subtotal: priceBreakdown.subtotal,
        cleaning_fee: priceBreakdown.cleaningFee,
        discount_amount: priceBreakdown.discountAmount,
        total_price: priceBreakdown.totalPrice,
        currency: priceBreakdown.currency,
        expires_at: expiresAt?.toISOString() || null,
      })
      .select('id, booking_code')
      .single();

    if (insertError) {
      // PostgreSQL 23P01 = exclusion_violation (double booking)
      if (insertError.code === '23P01') {
        return NextResponse.json<ApiResponse<null>>(
          { error: 'dates_unavailable' },
          { status: 409 }
        );
      }
      console.error('Booking insert error:', insertError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // Sign JWT for guest
    const token = await signGuestToken({
      bookingId: booking.id,
      propertyId: property.id,
      checkoutDate: checkOut,
    });

    return NextResponse.json<ApiResponse<BookingResponse>>({
      data: {
        bookingCode: booking.booking_code,
        token,
        status: status as 'confirmed' | 'pending',
        expiresAt: expiresAt?.toISOString() || null,
        priceBreakdown,
        propertyName: property.name,
        hostPhone: property.contact_phone,
        hostWhatsapp: property.contact_whatsapp,
      },
    });
  } catch (err) {
    console.error('POST /api/booking error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
