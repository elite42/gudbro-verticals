/**
 * API Route: Location Tables
 *
 * @route GET /api/locations/tables - List tables for a location
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
    const sectionId = searchParams.get('sectionId');

    if (!locationId) {
      return NextResponse.json({ success: false, error: 'Location ID required' }, { status: 400 });
    }

    let query = supabase
      .from('location_tables')
      .select(
        `
        id,
        table_number,
        display_name,
        section_id,
        min_capacity,
        max_capacity,
        optimal_capacity,
        table_shape,
        table_size,
        is_combinable,
        is_reservable,
        is_active,
        priority,
        location_sections(name)
      `
      )
      .eq('location_id', locationId)
      .eq('is_active', true)
      .order('priority', { ascending: true })
      .order('table_number', { ascending: true });

    if (sectionId) {
      query = query.eq('section_id', sectionId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching tables:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch tables' },
        { status: 500 }
      );
    }

    const tables = (data || []).map((t: any) => ({
      id: t.id,
      tableNumber: t.table_number,
      displayName: t.display_name,
      sectionId: t.section_id,
      sectionName: t.location_sections?.name,
      minCapacity: t.min_capacity,
      maxCapacity: t.max_capacity,
      optimalCapacity: t.optimal_capacity,
      tableShape: t.table_shape,
      tableSize: t.table_size,
      isCombinable: t.is_combinable,
      isReservable: t.is_reservable,
      priority: t.priority,
    }));

    return NextResponse.json({
      success: true,
      tables,
    });
  } catch (error) {
    console.error('Error in tables API:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
