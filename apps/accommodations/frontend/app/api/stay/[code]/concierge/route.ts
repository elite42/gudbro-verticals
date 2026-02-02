import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken } from '@/lib/auth';
import type { ApiResponse, ConciergeConfig, ConciergeSections } from '@/types/stay';
import { DEFAULT_CONCIERGE_SECTIONS } from '@/types/stay';

export const dynamic = 'force-dynamic';

/**
 * Extract and verify guest JWT from Authorization header
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
 * GET /api/stay/[code]/concierge
 *
 * Returns concierge section visibility toggles plus property country/city.
 * Requires valid guest JWT token.
 */
export async function GET(request: NextRequest) {
  try {
    const guest = await authenticateGuest(request);
    if (!guest) {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    const { data: property, error: propertyError } = await supabase
      .from('accom_properties')
      .select('concierge_sections, country, city')
      .eq('id', guest.propertyId)
      .single();

    if (propertyError || !property) {
      console.error('GET /api/stay/[code]/concierge property query error:', propertyError);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    const sections: ConciergeSections =
      (property.concierge_sections as ConciergeSections) ?? DEFAULT_CONCIERGE_SECTIONS;

    const response: ConciergeConfig = {
      sections,
      country: property.country ?? '',
      city: property.city ?? '',
    };

    return NextResponse.json<ApiResponse<ConciergeConfig>>({ data: response });
  } catch (err) {
    console.error('GET /api/stay/[code]/concierge error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
