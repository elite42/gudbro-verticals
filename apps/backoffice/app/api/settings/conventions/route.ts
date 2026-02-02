import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

/**
 * GET /api/settings/conventions?merchantId=...
 *
 * Returns active conventions linked to the accommodation owner's properties.
 * The merchantId here is the accommodation owner's user.id (CON-04 decision).
 * We look up their properties, then find conventions targeting those properties.
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'merchantId is required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // 1. Find properties owned by this merchant
    const { data: properties, error: propError } = await supabase
      .from('accom_properties')
      .select('id')
      .eq('owner_id', merchantId);

    if (propError) {
      console.error('Error fetching properties:', propError);
      return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
    }

    if (!properties || properties.length === 0) {
      return NextResponse.json({ data: { conventions: [] } });
    }

    const propertyIds = properties.map((p) => p.id);

    // 2. Query conventions targeting these properties
    const { data: conventions, error: convError } = await supabase
      .from('partner_conventions')
      .select(
        'id, partner_name, convention_name, benefit_type, benefit_value, benefit_scope, benefit_description, valid_from, valid_until, is_active, total_redemptions'
      )
      .eq('partner_type', 'accommodation')
      .in('partner_id', propertyIds)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (convError) {
      console.error('Error fetching conventions:', convError);
      return NextResponse.json({ error: 'Failed to fetch conventions' }, { status: 500 });
    }

    // 3. Map to camelCase response
    const mapped = (conventions || []).map((c) => ({
      id: c.id,
      partnerName: c.partner_name,
      conventionName: c.convention_name,
      benefitType: c.benefit_type,
      benefitValue: c.benefit_value ?? 0,
      benefitScope: c.benefit_scope ?? 'per_order',
      benefitDescription: c.benefit_description || null,
      validFrom: c.valid_from,
      validUntil: c.valid_until || null,
      isActive: c.is_active,
      totalRedemptions: c.total_redemptions ?? 0,
    }));

    return NextResponse.json({ data: { conventions: mapped } });
  } catch (err) {
    console.error('GET /api/settings/conventions error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
