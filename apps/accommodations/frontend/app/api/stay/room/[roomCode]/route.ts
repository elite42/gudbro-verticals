import { NextRequest, NextResponse } from 'next/server';
import { addDays, differenceInCalendarDays } from 'date-fns';
import { getSupabaseAdmin } from '@/lib/supabase';
import { signGuestToken } from '@/lib/auth';
import type {
  ApiResponse,
  RoomResolveResponse,
  RoomStayData,
  PropertyInfo,
  RoomInfo,
  BookingInfo,
  WifiInfo,
  VerificationMethod,
  AccessSettings,
} from '@/types/stay';

export const dynamic = 'force-dynamic';

/**
 * GET /api/stay/room/[roomCode]
 *
 * Room code resolution endpoint. Called when guest scans room QR code.
 * Resolves room code to active booking (or property-only fallback)
 * via the resolve_room_access() SECURITY DEFINER function.
 *
 * Returns a browse-tier JWT and stay data.
 * No verification required -- this is the frictionless entry point.
 */
export async function GET(_request: NextRequest, { params }: { params: { roomCode: string } }) {
  try {
    const { roomCode } = params;

    // Validate room code format: RM- followed by 8 valid chars
    const codePattern = /^RM-[A-HJ-NP-Z2-9]{8}$/;
    if (!codePattern.test(roomCode)) {
      return NextResponse.json<ApiResponse<null>>({ error: 'invalid_room_code' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Call SECURITY DEFINER function to resolve room code
    const { data: rpcData, error: rpcError } = await supabase.rpc('resolve_room_access', {
      p_room_code: roomCode,
    });

    if (rpcError) {
      console.error('resolve_room_access error:', rpcError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    const result = rpcData?.[0];
    if (!result?.is_valid) {
      return NextResponse.json<ApiResponse<null>>({ error: 'invalid_room_code' }, { status: 404 });
    }

    // Fetch property data (always needed for both booking and no-booking cases)
    const { data: propertyData, error: propertyError } = await supabase
      .from('accom_properties')
      .select(
        `
        name, slug, type, description,
        contact_phone, contact_email, contact_whatsapp,
        checkout_time, house_rules, amenities, images,
        wifi_network, wifi_password,
        has_linked_fnb, linked_fnb_slug
      `
      )
      .eq('id', result.property_id)
      .single();

    if (propertyError || !propertyData) {
      console.error('Property fetch error:', propertyError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // Map property data
    const property: PropertyInfo = {
      name: propertyData.name,
      slug: propertyData.slug,
      type: propertyData.type,
      description: propertyData.description || null,
      contactPhone: propertyData.contact_phone || null,
      contactEmail: propertyData.contact_email || null,
      contactWhatsapp: propertyData.contact_whatsapp || null,
      checkoutTime: propertyData.checkout_time || '11:00',
      houseRules: propertyData.house_rules || [],
      amenities: propertyData.amenities || [],
      images: propertyData.images || [],
      hasLinkedFnb: propertyData.has_linked_fnb ?? false,
      linkedFnbSlug: propertyData.linked_fnb_slug || null,
    };

    const room: RoomInfo = {
      number: result.room_number,
      name: result.room_type || '',
      floor: null, // Floor not returned by resolve_room_access for simplicity
    };

    const wifi: WifiInfo = {
      network: propertyData.wifi_network || null,
      password: propertyData.wifi_password || null,
    };

    // Build booking info if active booking exists
    let booking: BookingInfo | null = null;
    let checkoutDate: string;

    if (result.has_active_booking && result.booking_id) {
      const nights = differenceInCalendarDays(
        new Date(result.check_out),
        new Date(result.check_in)
      );

      booking = {
        code: '', // Not exposed in browse tier (privacy)
        guestName: '', // Not exposed in browse tier (privacy)
        guestCount: 0, // Not exposed in browse tier
        checkIn: result.check_in,
        checkOut: result.check_out,
        nights,
        status: 'checked_in', // Simplified for browse tier
        guestCountry: null,
      };

      checkoutDate = result.check_out;
    } else {
      // No active booking: token expires 7 days from now
      checkoutDate = addDays(new Date(), 7).toISOString().split('T')[0];
    }

    // Sign browse-tier JWT
    const token = await signGuestToken({
      bookingId: result.booking_id || null,
      propertyId: result.property_id,
      checkoutDate,
      accessTier: 'browse',
      roomCode,
    });

    const stay: RoomStayData = {
      property,
      room,
      booking,
      wifi,
      hasActiveBooking: result.has_active_booking,
      accessTier: 'browse',
      accessSettings: (result.access_settings as AccessSettings) || undefined,
      ...(result.has_active_booking && {
        verificationMethod: (result.guest_verification_method as VerificationMethod) || 'last_name',
      }),
    };

    return NextResponse.json<ApiResponse<RoomResolveResponse>>({
      data: { token, stay },
    });
  } catch (err) {
    console.error('GET /api/stay/room/[roomCode] error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
