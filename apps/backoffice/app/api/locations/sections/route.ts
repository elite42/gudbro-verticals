/**
 * API Route: Location Sections
 *
 * @route GET /api/locations/sections - List sections for a location
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const locationId = searchParams.get('locationId');

    if (!locationId) {
      return NextResponse.json({ success: false, error: 'Location ID required' }, { status: 400 });
    }

    // Get sections with table count
    const { data, error } = await supabase
      .from('location_sections')
      .select(
        `
        id,
        name,
        name_translations,
        code,
        description,
        section_type,
        max_capacity,
        is_active,
        display_order,
        color_hex
      `
      )
      .eq('location_id', locationId)
      .eq('is_active', true)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching sections:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch sections' },
        { status: 500 }
      );
    }

    // Get table counts for each section
    const sectionIds = (data || []).map((s) => s.id);
    const { data: tableCounts } = await supabase
      .from('location_tables')
      .select('section_id')
      .in('section_id', sectionIds)
      .eq('is_active', true);

    const countBySection = (tableCounts || []).reduce(
      (acc, t) => {
        acc[t.section_id] = (acc[t.section_id] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    const sections = (data || []).map((s) => ({
      id: s.id,
      name: s.name,
      nameTranslations: s.name_translations,
      code: s.code,
      description: s.description,
      sectionType: s.section_type,
      maxCapacity: s.max_capacity,
      displayOrder: s.display_order,
      colorHex: s.color_hex,
      tableCount: countBySection[s.id] || 0,
    }));

    return NextResponse.json({
      success: true,
      sections,
    });
  } catch (error) {
    console.error('Error in sections API:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
