import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

/**
 * GET /api/locations/all
 *
 * Returns all active locations with their brand and organization context.
 * Used by the simplified TenantSwitcher for direct location selection.
 */
export async function GET() {
  try {
    const { data, error } = await supabase
      .from('locations')
      .select(
        `
        id,
        name,
        slug,
        city,
        country_code,
        brand_id,
        brands!inner (
          id,
          name,
          slug,
          organization_id,
          organizations!inner (
            id,
            name,
            slug
          )
        )
      `
      )
      .eq('is_active', true)
      .order('name');

    if (error) {
      console.error('Error fetching locations:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Transform the nested data to a flat structure
    const locations = (data || []).map((loc: any) => ({
      id: loc.id,
      name: loc.name,
      slug: loc.slug,
      city: loc.city,
      country_code: loc.country_code,
      brand_id: loc.brands.id,
      brand_name: loc.brands.name,
      brand_slug: loc.brands.slug,
      org_id: loc.brands.organizations.id,
      org_name: loc.brands.organizations.name,
      org_slug: loc.brands.organizations.slug,
    }));

    return NextResponse.json({
      locations,
      total: locations.length,
    });
  } catch (err) {
    console.error('Error in GET /api/locations/all:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
