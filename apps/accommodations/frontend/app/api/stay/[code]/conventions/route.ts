import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { verifyGuestToken } from '@/lib/auth';
import type { ApiResponse, ConventionPartner } from '@/types/stay';

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
 * GET /api/stay/[code]/conventions
 *
 * Protected endpoint returning active convention partners for the property.
 * Queries partner_conventions where partner_type='accommodation' and partner_id
 * matches the guest's property, filtered by active status and date validity.
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

    const today = new Date().toISOString().split('T')[0];

    const { data, error } = await supabase
      .from('partner_conventions')
      .select(
        'id, partner_name, convention_name, benefit_type, benefit_value, benefit_scope, benefit_description'
      )
      .eq('partner_type', 'accommodation')
      .eq('partner_id', guest.propertyId)
      .eq('is_active', true)
      .lte('valid_from', today)
      .or(`valid_until.is.null,valid_until.gte.${today}`)
      .order('created_at', { ascending: true });

    if (error) {
      console.error('GET /api/stay/[code]/conventions query error:', error);
      return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
    }

    // Map snake_case DB columns to camelCase response
    const conventions: ConventionPartner[] = (data || []).map((row) => ({
      id: row.id,
      partnerName: row.partner_name,
      conventionName: row.convention_name,
      benefitType: row.benefit_type,
      benefitValue: row.benefit_value ?? 0,
      benefitScope: row.benefit_scope ?? 'per_order',
      benefitDescription: row.benefit_description || null,
    }));

    return NextResponse.json<ApiResponse<ConventionPartner[]>>({
      data: conventions,
    });
  } catch (err) {
    console.error('GET /api/stay/[code]/conventions error:', err);
    return NextResponse.json<ApiResponse<null>>({ error: 'internal_error' }, { status: 500 });
  }
}
