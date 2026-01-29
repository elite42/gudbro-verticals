import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken } from '@/lib/auth';
import type { ApiResponse, PropertyInfo, WifiInfo } from '@/types/stay';

export const dynamic = 'force-dynamic';

/**
 * Extract and verify guest JWT from Authorization header
 * @returns Guest payload { bookingId, propertyId } or null
 */
async function authenticateGuest(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader?.startsWith('Bearer ')) return null;

  const token = authHeader.slice(7);
  if (!token) return null;

  try {
    return await verifyGuestToken(token);
  } catch {
    return null;
  }
}

/**
 * GET /api/stay/[code]/property
 *
 * Protected endpoint returning property information including contact details,
 * house rules, checkout time, amenities, and WiFi credentials.
 *
 * Requires valid guest JWT token. propertyId from token payload determines
 * which property data is returned.
 */
export async function GET(request: NextRequest) {
  try {
    const guest = await authenticateGuest(request);
    if (!guest) {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('accom_properties')
      .select(
        `
        id, name, slug, type, description, address, city, area, country,
        contact_phone, contact_whatsapp, contact_email,
        check_in_time, checkout_time, house_rules, amenities,
        images, cover_image, rating, review_count,
        wifi_network, wifi_password
      `
      )
      .eq('id', guest.propertyId)
      .single();

    if (error || !data) {
      if (error?.code === 'PGRST116') {
        // No rows returned — shouldn't happen with valid JWT but handle gracefully
        return NextResponse.json<ApiResponse<null>>(
          { error: 'booking_not_found' },
          { status: 404 }
        );
      }
      console.error('GET /api/stay/[code]/property query error:', error);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    const property: PropertyInfo = {
      name: data.name,
      slug: data.slug,
      type: data.type,
      contactPhone: data.contact_phone || null,
      contactWhatsapp: data.contact_whatsapp || null,
      checkoutTime: data.checkout_time || '11:00',
      houseRules: data.house_rules || [],
      amenities: data.amenities || [],
      images: data.images || [],
    };

    const wifi: WifiInfo = {
      network: data.wifi_network || null,
      password: data.wifi_password || null,
    };

    return NextResponse.json<ApiResponse<{ property: PropertyInfo; wifi: WifiInfo }>>({
      data: { property, wifi },
    });
  } catch (err) {
    console.error('GET /api/stay/[code]/property error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
