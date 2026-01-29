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
 * Protected endpoint returning local partnership deals for the property.
 * Queries partner_conventions where the property is the partner (accommodation type).
 * Joins with merchants table for business display info.
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
      .from('partner_conventions')
      .select(
        `
        id, convention_name, benefit_type, benefit_value, benefit_description,
        valid_from, valid_until, verification_method,
        merchants!partner_conventions_merchant_id_fkey(name, slug, city, logo_url)
      `
      )
      .eq('partner_id', guest.propertyId)
      .eq('partner_type', 'accommodation')
      .eq('is_active', true);

    if (error) {
      console.error('GET /api/stay/[code]/deals query error:', error);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // Map DB rows to DealResponse[]
    const deals: DealResponse[] = (data || []).map((conv) => {
      const merchant = conv.merchants as unknown as Record<string, unknown> | null;

      return {
        id: conv.id,
        merchantName: (merchant?.name as string) || 'Local Partner',
        merchantSlug: (merchant?.slug as string) || '',
        discountLabel: conv.convention_name,
        description: conv.benefit_description || null,
        validUntil: conv.valid_until || null,
        bookingAction: conv.verification_method || null,
      };
    });

    return NextResponse.json<ApiResponse<DealResponse[]>>({
      data: deals,
    });
  } catch (err) {
    console.error('GET /api/stay/[code]/deals error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
