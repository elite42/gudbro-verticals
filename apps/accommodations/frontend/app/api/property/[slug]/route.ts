import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import type { ApiResponse, PropertyPageData } from '@/types/property';

export const dynamic = 'force-dynamic';

/**
 * GET /api/property/[slug]
 *
 * Public endpoint -- no JWT auth required.
 * Returns full property data with active rooms for the property page.
 */
export async function GET(_request: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const supabase = getSupabaseAdmin();

    const { data: property, error } = await supabase
      .from('accom_properties')
      .select(
        `
        id, name, slug, type, description, address, city, country_code,
        latitude, longitude, images, amenities, house_rules,
        contact_phone, contact_email, contact_whatsapp,
        check_in_time, check_out_time,
        host_name, host_photo, host_languages,
        booking_mode, accepted_payment_methods,
        min_nights, max_nights, cleaning_fee,
        weekly_discount_percent, monthly_discount_percent,
        deposit_percent, bank_transfer_info, crypto_wallets,
        cancellation_window_hours, cancellation_penalty_percent,
        has_linked_fnb, linked_fnb_slug,
        accom_rooms(
          id, room_number, room_type, capacity, description,
          base_price_per_night, currency, images, beds, is_active
        )
      `
      )
      .eq('slug', params.slug)
      .eq('is_active', true)
      .single();

    if (error || !property) {
      return NextResponse.json<ApiResponse<null>>({ error: 'property_not_found' }, { status: 404 });
    }

    // Filter to active rooms only
    const rooms = (property.accom_rooms as unknown as PropertyPageData['rooms']).filter(
      (r) => r.is_active
    );

    if (rooms.length === 0) {
      return NextResponse.json<ApiResponse<null>>({ error: 'property_not_found' }, { status: 404 });
    }

    // Build typed response, replacing join array with filtered rooms
    const { accom_rooms: _joinRooms, ...propertyFields } = property;
    const propertyData: PropertyPageData = {
      ...(propertyFields as unknown as Omit<PropertyPageData, 'rooms'>),
      rooms,
    };

    return NextResponse.json<ApiResponse<PropertyPageData>>({
      data: propertyData,
    });
  } catch (err) {
    console.error('GET /api/property/[slug] error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
