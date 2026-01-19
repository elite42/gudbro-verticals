import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// ============================================================================
// Types
// ============================================================================

interface ReorderRequest {
  locationId: string;
  orderedSectionIds: string[]; // Array of section IDs in new order
}

// ============================================================================
// PATCH - Reorder sections
// ============================================================================

export async function PATCH(request: Request) {
  try {
    const body: ReorderRequest = await request.json();
    const { locationId, orderedSectionIds } = body;

    if (!locationId) {
      return NextResponse.json({ error: 'locationId is required' }, { status: 400 });
    }

    if (!orderedSectionIds || !Array.isArray(orderedSectionIds)) {
      return NextResponse.json(
        { error: 'orderedSectionIds must be an array of section IDs' },
        { status: 400 }
      );
    }

    // Update each section's display_order based on its position in the array
    const updates = orderedSectionIds.map((sectionId, index) => ({
      id: sectionId,
      display_order: index,
    }));

    // Execute updates in a transaction-like manner
    const errors: string[] = [];

    for (const update of updates) {
      const { error } = await supabase
        .from('site_sections')
        .update({ display_order: update.display_order })
        .eq('id', update.id)
        .eq('location_id', locationId); // Extra safety check

      if (error) {
        errors.push(`Failed to update section ${update.id}: ${error.message}`);
      }
    }

    if (errors.length > 0) {
      console.error('Errors during reorder:', errors);
      return NextResponse.json(
        { error: 'Some sections failed to update', details: errors },
        { status: 500 }
      );
    }

    // Fetch updated sections
    const { data: sections, error: fetchError } = await supabase
      .from('site_sections')
      .select('*')
      .eq('location_id', locationId)
      .order('display_order', { ascending: true });

    if (fetchError) {
      console.error('Error fetching reordered sections:', fetchError);
      return NextResponse.json(
        { error: 'Sections reordered but failed to fetch' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Sections reordered successfully',
      sections: sections?.map((s) => ({
        id: s.id,
        sectionType: s.section_type,
        displayOrder: s.display_order,
      })),
    });
  } catch (error) {
    console.error('Error in PATCH /api/site-sections/reorder:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
