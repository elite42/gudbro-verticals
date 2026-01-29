import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import type { ApiResponse, StayLookupResponse } from '@/types/stay';

export const dynamic = 'force-dynamic';

/**
 * GET /api/stay/[code]
 *
 * Public booking lookup endpoint. Returns minimal booking info
 * (property name, dates, guest first name) for the verification screen.
 *
 * No authentication required — this is the entry point for guests.
 */
export async function GET(_request: NextRequest, { params }: { params: { code: string } }) {
  try {
    const { code } = params;

    // Validate booking code format: BK- followed by 6 chars (excludes 0/O/1/I/L)
    const codePattern = /^BK-[A-HJ-NP-Z2-9]{6}$/;
    if (!codePattern.test(code)) {
      return NextResponse.json<ApiResponse<null>>({ error: 'booking_not_found' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('accom_bookings')
      .select('id, guest_first_name, check_in, check_out, accom_properties!inner(name)')
      .eq('booking_code', code)
      .single();

    if (error || !data) {
      return NextResponse.json<ApiResponse<null>>({ error: 'booking_not_found' }, { status: 404 });
    }

    // Check if booking has expired (checkout date has passed)
    const checkOut = new Date(data.check_out);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (checkOut < today) {
      return NextResponse.json<ApiResponse<null>>({ error: 'booking_expired' }, { status: 410 });
    }

    // Extract property name from joined data
    const property = data.accom_properties as unknown as { name: string };

    const response: StayLookupResponse = {
      propertyName: property.name,
      checkIn: data.check_in,
      checkOut: data.check_out,
      guestFirstName: data.guest_first_name,
    };

    return NextResponse.json<ApiResponse<StayLookupResponse>>({
      data: response,
    });
  } catch (err) {
    console.error('GET /api/stay/[code] error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
