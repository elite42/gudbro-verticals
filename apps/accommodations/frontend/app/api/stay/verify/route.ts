import { NextRequest, NextResponse } from 'next/server';
import { differenceInCalendarDays } from 'date-fns';
import { getSupabaseAdmin } from '@/lib/supabase';
import { signGuestToken } from '@/lib/auth';
import type {
  ApiResponse,
  VerifyResponse,
  StayData,
  PropertyInfo,
  RoomInfo,
  BookingInfo,
  WifiInfo,
} from '@/types/stay';

export const dynamic = 'force-dynamic';

/**
 * POST /api/stay/verify
 *
 * Guest verification endpoint. Validates booking code + last name
 * via the verify_booking_access() SECURITY DEFINER function,
 * then returns a JWT session token and full stay data.
 *
 * The error response is intentionally generic (verification_failed)
 * to avoid revealing whether a booking code exists.
 */
export async function POST(request: NextRequest) {
  try {
    let body: { bookingCode?: string; lastName?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'verification_failed' },
        { status: 400 }
      );
    }

    const { bookingCode, lastName } = body;

    if (!bookingCode || !lastName) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'verification_failed' },
        { status: 400 }
      );
    }

    const supabase = getSupabaseAdmin();

    // Call the SECURITY DEFINER function to verify booking access
    // .rpc() returns an array, not a single object
    const { data: rpcData, error: rpcError } = await supabase.rpc('verify_booking_access', {
      p_booking_code: bookingCode,
      p_last_name: lastName,
    });

    if (rpcError) {
      console.error('verify_booking_access error:', rpcError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    const result = rpcData?.[0];
    if (!result?.is_valid) {
      // Generic message -- don't reveal if code exists
      return NextResponse.json<ApiResponse<null>>(
        { error: 'verification_failed' },
        { status: 401 }
      );
    }

    // Fetch full stay data for the verified booking
    const { data: bookingData, error: bookingError } = await supabase
      .from('accom_bookings')
      .select(
        `
        id, booking_code, guest_first_name, guest_last_name, guest_count,
        check_in, check_out, status,
        accom_rooms!inner(room_number, name, floor),
        accom_properties!inner(
          name, slug, type, contact_phone, contact_whatsapp,
          checkout_time, house_rules, amenities, images,
          wifi_network, wifi_password
        )
      `
      )
      .eq('id', result.booking_id)
      .single();

    if (bookingError || !bookingData) {
      console.error('Booking fetch error:', bookingError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // Sign JWT with checkout-based expiry
    const token = await signGuestToken({
      bookingId: result.booking_id,
      propertyId: result.property_id,
      checkoutDate: bookingData.check_out,
    });

    // Map database rows to API response types
    const rawProperty = bookingData.accom_properties as unknown as Record<string, unknown>;
    const rawRoom = bookingData.accom_rooms as unknown as Record<string, unknown>;

    const property: PropertyInfo = {
      name: rawProperty.name as string,
      slug: rawProperty.slug as string,
      type: rawProperty.type as string,
      contactPhone: (rawProperty.contact_phone as string) || null,
      contactWhatsapp: (rawProperty.contact_whatsapp as string) || null,
      checkoutTime: (rawProperty.checkout_time as string) || '11:00',
      houseRules: (rawProperty.house_rules as string[]) || [],
      amenities: (rawProperty.amenities as string[]) || [],
      images: (rawProperty.images as string[]) || [],
    };

    const room: RoomInfo = {
      number: rawRoom.room_number as string,
      name: rawRoom.name as string,
      floor: (rawRoom.floor as number) || null,
    };

    const nights = differenceInCalendarDays(
      new Date(bookingData.check_out),
      new Date(bookingData.check_in)
    );

    const booking: BookingInfo = {
      code: bookingData.booking_code,
      guestName: `${bookingData.guest_first_name} ${bookingData.guest_last_name}`,
      guestCount: bookingData.guest_count,
      checkIn: bookingData.check_in,
      checkOut: bookingData.check_out,
      nights,
      status: bookingData.status,
    };

    const wifi: WifiInfo = {
      network: (rawProperty.wifi_network as string) || null,
      password: (rawProperty.wifi_password as string) || null,
    };

    const stay: StayData = { property, room, booking, wifi };

    return NextResponse.json<ApiResponse<VerifyResponse>>({
      data: { token, stay },
    });
  } catch (err) {
    console.error('POST /api/stay/verify error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
