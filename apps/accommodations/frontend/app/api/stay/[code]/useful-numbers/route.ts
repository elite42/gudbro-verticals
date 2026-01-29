import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken } from '@/lib/auth';
import type { ApiResponse, UsefulNumbersResponse } from '@/types/stay';

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
 * GET /api/stay/[code]/useful-numbers
 *
 * Protected endpoint returning emergency numbers (by country),
 * city useful numbers (by country + city), and property contact info.
 *
 * Requires valid guest JWT token. propertyId from token payload determines
 * which property's location is used for number lookups.
 */
export async function GET(request: NextRequest) {
  try {
    const guest = await authenticateGuest(request);
    if (!guest) {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    // Fetch property location info for number lookups
    const { data: property, error: propertyError } = await supabase
      .from('accom_properties')
      .select('country_code, city, host_name, host_phone, emergency_phone')
      .eq('id', guest.propertyId)
      .single();

    if (propertyError || !property) {
      console.error('GET /api/stay/[code]/useful-numbers property query error:', propertyError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // Parallel fetch: emergency numbers + city numbers
    const [emergencyResult, cityResult] = await Promise.all([
      supabase
        .from('emergency_numbers')
        .select('service_type, phone_number')
        .eq('country_code', property.country_code),
      supabase
        .from('city_useful_numbers')
        .select('label, phone_number, category, sort_order')
        .eq('country_code', property.country_code)
        .eq('city_name', property.city)
        .eq('is_active', true)
        .order('sort_order', { ascending: true }),
    ]);

    if (emergencyResult.error) {
      console.error(
        'GET /api/stay/[code]/useful-numbers emergency query error:',
        emergencyResult.error
      );
    }
    if (cityResult.error) {
      console.error('GET /api/stay/[code]/useful-numbers city query error:', cityResult.error);
    }

    const response: UsefulNumbersResponse = {
      emergency: (emergencyResult.data || []).map((row) => ({
        serviceType: row.service_type,
        phoneNumber: row.phone_number,
      })),
      city: (cityResult.data || []).map((row) => ({
        label: row.label,
        phoneNumber: row.phone_number,
        category: row.category,
        sortOrder: row.sort_order,
      })),
      property: {
        name: property.host_name || '',
        phone: property.emergency_phone || property.host_phone || '',
      },
    };

    return NextResponse.json<ApiResponse<UsefulNumbersResponse>>({
      data: response,
    });
  } catch (err) {
    console.error('GET /api/stay/[code]/useful-numbers error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
