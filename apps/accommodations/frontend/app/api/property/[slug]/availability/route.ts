import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import type { ApiResponse, AvailabilityResponse } from '@/types/property';

export const dynamic = 'force-dynamic';

/**
 * GET /api/property/[slug]/availability?room_id=<uuid>
 *
 * Public endpoint -- no JWT auth required.
 * Returns booked date ranges for the calendar component.
 *
 * Excludes:
 * - Cancelled and no_show bookings
 * - Past bookings (check_out_date < today)
 * - Expired inquiry bookings (expires_at < NOW())
 */
export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const roomId = request.nextUrl.searchParams.get('room_id');
    if (!roomId) {
      return NextResponse.json<ApiResponse<null>>({ error: 'validation_error' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Resolve slug to property_id
    const { data: property } = await supabase
      .from('accom_properties')
      .select('id')
      .eq('slug', params.slug)
      .eq('is_active', true)
      .single();

    if (!property) {
      return NextResponse.json<ApiResponse<null>>({ error: 'property_not_found' }, { status: 404 });
    }

    const today = new Date().toISOString().split('T')[0];
    const now = new Date().toISOString();

    const { data: bookings, error } = await supabase
      .from('accom_bookings')
      .select('check_in_date, check_out_date')
      .eq('property_id', property.id)
      .eq('room_id', roomId)
      .not('status', 'in', '("cancelled","no_show")')
      .gte('check_out_date', today)
      .or(`expires_at.is.null,expires_at.gte.${now}`);

    if (error) {
      console.error('Availability query error:', error);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    return NextResponse.json<ApiResponse<AvailabilityResponse>>({
      data: {
        bookedRanges: (bookings || []).map((b) => ({
          from: b.check_in_date,
          to: b.check_out_date,
        })),
      },
    });
  } catch (err) {
    console.error('GET /api/property/[slug]/availability error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
