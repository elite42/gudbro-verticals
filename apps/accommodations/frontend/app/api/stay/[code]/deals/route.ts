import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken } from '@/lib/auth';
import type { ApiResponse, DealResponse } from '@/types/stay';

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
 * GET /api/stay/[code]/deals
 *
 * Protected endpoint returning active local deals for the property.
 * Queries accom_deals where property_id matches the guest's property.
 *
 * Requires valid guest JWT token. propertyId from token payload determines results.
 */
export async function GET(request: NextRequest) {
  try {
    const guest = await authenticateGuest(request);
    if (!guest) {
      return NextResponse.json<ApiResponse<null>>({ error: 'session_expired' }, { status: 401 });
    }

    const supabase = getSupabaseAdmin();

    const { data, error } = await supabase
      .from('accom_deals')
      .select('id, partner_name, discount_description, description, url, image_url')
      .eq('property_id', guest.propertyId)
      .eq('is_active', true)
      .order('display_order', { ascending: true })
      .order('created_at', { ascending: true });

    if (error) {
      console.error('GET /api/stay/[code]/deals query error:', error);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // Map DB rows to DealResponse[]
    const deals: DealResponse[] = (data || []).map((deal) => ({
      id: deal.id,
      partnerName: deal.partner_name,
      discountLabel: deal.discount_description,
      description: deal.description || null,
      imageUrl: deal.image_url || null,
      url: deal.url || null,
    }));

    return NextResponse.json<ApiResponse<DealResponse[]>>({
      data: deals,
    });
  } catch (err) {
    console.error('GET /api/stay/[code]/deals error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
