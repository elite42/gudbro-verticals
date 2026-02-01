import { NextRequest, NextResponse } from 'next/server';
import { differenceInCalendarDays } from 'date-fns';
import { getSupabaseAdmin } from '@/lib/supabase';
import { signGuestToken } from '@/lib/auth';
import { buildWifiInfo } from '@/lib/wifi-utils';
import type {
  ApiResponse,
  VerifyResponse,
  StayData,
  PropertyInfo,
  RoomInfo,
  BookingInfo,
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
        id, booking_code, guest_name, guest_last_name, guest_count,
        guest_country, check_in_date, check_out_date, status,
        accom_rooms!inner(room_number, room_type, floor, wifi_ssid_override, wifi_password_override),
        accom_properties!inner(
          name, slug, type, description,
          contact_phone, contact_email, contact_whatsapp,
          checkout_time, house_rules, amenities, images,
          wifi_network, wifi_password, wifi_zones,
          has_linked_fnb, linked_fnb_slug
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
      checkoutDate: bookingData.check_out_date,
    });

    // Map database rows to API response types
    const rawProperty = bookingData.accom_properties as unknown as Record<string, unknown>;
    const rawRoom = bookingData.accom_rooms as unknown as Record<string, unknown>;

    const property: PropertyInfo = {
      name: rawProperty.name as string,
      slug: rawProperty.slug as string,
      type: rawProperty.type as string,
      description: (rawProperty.description as string) || null,
      contactPhone: (rawProperty.contact_phone as string) || null,
      contactEmail: (rawProperty.contact_email as string) || null,
      contactWhatsapp: (rawProperty.contact_whatsapp as string) || null,
      checkoutTime: (rawProperty.checkout_time as string) || '11:00',
      houseRules: (rawProperty.house_rules as string[]) || [],
      amenities: (rawProperty.amenities as string[]) || [],
      images: (rawProperty.images as string[]) || [],
      hasLinkedFnb: (rawProperty.has_linked_fnb as boolean) ?? false,
      linkedFnbSlug: (rawProperty.linked_fnb_slug as string) || null,
    };

    const room: RoomInfo = {
      number: rawRoom.room_number as string,
      name: (rawRoom.room_type as string) || '',
      floor: (rawRoom.floor as number) || null,
    };

    const nights = differenceInCalendarDays(
      new Date(bookingData.check_out_date),
      new Date(bookingData.check_in_date)
    );

    const booking: BookingInfo = {
      code: bookingData.booking_code,
      guestName: `${bookingData.guest_name} ${bookingData.guest_last_name}`,
      guestCount: bookingData.guest_count,
      checkIn: bookingData.check_in_date,
      checkOut: bookingData.check_out_date,
      nights,
      status: bookingData.status,
      guestCountry: (bookingData.guest_country as string) || null,
    };

    const wifi = buildWifiInfo(
      {
        wifi_network: (rawProperty.wifi_network as string) || null,
        wifi_password: (rawProperty.wifi_password as string) || null,
        wifi_zones: rawProperty.wifi_zones as unknown[] as
          | null
          | {
              zone_id: string;
              label: string;
              zone_type: string;
              icon: string;
              ssid: string;
              password: string;
              sort_order: number;
            }[],
      },
      {
        wifi_ssid_override: (rawRoom.wifi_ssid_override as string) || null,
        wifi_password_override: (rawRoom.wifi_password_override as string) || null,
      }
    );

    const stay: StayData = { property, room, booking, wifi };

    return NextResponse.json<ApiResponse<VerifyResponse>>({
      data: { token, stay },
    });
  } catch (err) {
    console.error('POST /api/stay/verify error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
