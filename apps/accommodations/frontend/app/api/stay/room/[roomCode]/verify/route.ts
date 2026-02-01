import { NextRequest, NextResponse } from 'next/server';
import { differenceInCalendarDays } from 'date-fns';
import { getSupabaseAdmin } from '@/lib/supabase';
import { signGuestToken } from '@/lib/auth';
import { buildWifiInfo } from '@/lib/wifi-utils';
import type {
  ApiResponse,
  VerifyRoomResponse,
  StayData,
  PropertyInfo,
  RoomInfo,
  BookingInfo,
  VerificationMethod,
} from '@/types/stay';

export const dynamic = 'force-dynamic';

// ---------------------------------------------------------------------------
// Lightweight in-memory rate limiting (per room code)
// Sufficient for Phase 26 -- hardened rate limiting in Phase 27
// ---------------------------------------------------------------------------

interface RateLimitEntry {
  attempts: number;
  firstAttempt: number;
}

const rateLimitMap = new Map<string, RateLimitEntry>();
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 5 * 60 * 1000; // 5 minutes

/**
 * Check and update rate limit for a room code.
 * Returns remaining cooldown in seconds if blocked, or 0 if allowed.
 */
function checkRateLimit(roomCode: string): number {
  const now = Date.now();

  // Clean expired entries opportunistically
  rateLimitMap.forEach((entry, key) => {
    if (now - entry.firstAttempt > WINDOW_MS) {
      rateLimitMap.delete(key);
    }
  });

  const entry = rateLimitMap.get(roomCode);

  if (!entry || now - entry.firstAttempt > WINDOW_MS) {
    // New window
    rateLimitMap.set(roomCode, { attempts: 1, firstAttempt: now });
    return 0;
  }

  if (entry.attempts >= MAX_ATTEMPTS) {
    const remaining = Math.ceil((entry.firstAttempt + WINDOW_MS - now) / 1000);
    return remaining > 0 ? remaining : 0;
  }

  entry.attempts++;
  return 0;
}

/**
 * Normalize a name string for comparison.
 * Strips diacritics, lowercases, trims whitespace.
 */
function normalizeName(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

/**
 * POST /api/stay/room/[roomCode]/verify
 *
 * Verify guest identity for a room-based session, upgrading from
 * browse-tier to full-tier access.
 *
 * Accepts { method: 'last_name' | 'pin', value: string }
 *
 * On success: returns full-tier JWT + complete stay data.
 * On failure: returns 401 with generic error (to avoid info leaks).
 */
export async function POST(request: NextRequest, { params }: { params: { roomCode: string } }) {
  try {
    const { roomCode } = params;

    // Step 1: Validate room code format
    const codePattern = /^RM-[A-HJ-NP-Z2-9]{8}$/;
    if (!codePattern.test(roomCode)) {
      return NextResponse.json<ApiResponse<null>>({ error: 'invalid_room_code' }, { status: 400 });
    }

    // Step 2: Check rate limit
    const cooldown = checkRateLimit(roomCode);
    if (cooldown > 0) {
      return NextResponse.json(
        { error: 'too_many_attempts', retryAfter: cooldown },
        { status: 429 }
      );
    }

    // Step 3: Parse request body
    let body: { method?: string; value?: string };
    try {
      body = await request.json();
    } catch {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'verification_failed' },
        { status: 400 }
      );
    }

    const { method, value } = body;

    if (!method || !value || !['last_name', 'pin'].includes(method)) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'verification_failed' },
        { status: 400 }
      );
    }

    const verificationMethod = method as VerificationMethod;

    // Step 4: Resolve room code to active booking
    const supabase = getSupabaseAdmin();

    const { data: rpcData, error: rpcError } = await supabase.rpc('resolve_room_access', {
      p_room_code: roomCode,
    });

    if (rpcError) {
      console.error('resolve_room_access error:', rpcError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    const result = rpcData?.[0];
    if (!result?.is_valid || !result?.has_active_booking || !result?.booking_id) {
      return NextResponse.json<ApiResponse<null>>({ error: 'no_active_booking' }, { status: 404 });
    }

    // Step 5: Fetch booking for verification credentials
    const { data: bookingData, error: bookingError } = await supabase
      .from('accom_bookings')
      .select(
        `
        id, booking_code, guest_name, guest_last_name, guest_count,
        guest_country, check_in_date, check_out_date, status, verification_pin,
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

    // Step 6: Verify credentials based on method
    let verified = false;

    if (verificationMethod === 'last_name') {
      if (value.trim().length < 3) {
        return NextResponse.json<ApiResponse<null>>(
          { error: 'verification_failed' },
          { status: 401 }
        );
      }

      const normalizedInput = normalizeName(value);
      const normalizedStored = normalizeName(bookingData.guest_last_name || '');

      // Partial match: stored name must start with input
      verified = normalizedStored.startsWith(normalizedInput);
    } else if (verificationMethod === 'pin') {
      if (!bookingData.verification_pin) {
        // No PIN configured for this booking
        return NextResponse.json<ApiResponse<null>>(
          { error: 'verification_failed' },
          { status: 401 }
        );
      }

      verified = value === bookingData.verification_pin;
    }

    if (!verified) {
      return NextResponse.json<ApiResponse<null>>(
        { error: 'verification_failed' },
        { status: 401 }
      );
    }

    // Step 7: Verification succeeded — build full stay data (same shape as /api/stay/verify)
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
      guestName:
        bookingData.guest_last_name && !bookingData.guest_name.includes(bookingData.guest_last_name)
          ? `${bookingData.guest_name} ${bookingData.guest_last_name}`
          : bookingData.guest_name,
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

    // Step 8: Sign full-tier JWT
    const token = await signGuestToken({
      bookingId: result.booking_id,
      propertyId: result.property_id,
      checkoutDate: bookingData.check_out_date,
      accessTier: 'full',
      roomCode,
    });

    // Step 9: Return success with full stay data
    return NextResponse.json<ApiResponse<VerifyRoomResponse>>({
      data: { token, stay },
    });
  } catch (err) {
    console.error('POST /api/stay/room/[roomCode]/verify error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
