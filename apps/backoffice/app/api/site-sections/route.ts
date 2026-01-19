import { NextResponse } from 'next/server';
import { supabase, SiteSection, SiteSectionType, SiteSectionContent } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// ============================================================================
// Types
// ============================================================================

interface UpsertSectionRequest {
  locationId: string;
  sectionType: SiteSectionType;
  isEnabled?: boolean;
  displayOrder?: number;
  content?: SiteSectionContent;
  styleOverrides?: Record<string, unknown>;
}

// ============================================================================
// GET - Fetch all sections for a location
// ============================================================================

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');

    if (!locationId) {
      return NextResponse.json({ error: 'locationId is required' }, { status: 400 });
    }

    // Fetch all sections for this location
    const { data: sections, error } = await supabase
      .from('site_sections')
      .select('*')
      .eq('location_id', locationId)
      .order('display_order', { ascending: true });

    if (error) {
      console.error('Error fetching site sections:', error);
      return NextResponse.json({ error: 'Failed to fetch site sections' }, { status: 500 });
    }

    // If no sections exist, initialize defaults
    if (!sections || sections.length === 0) {
      // Call the initialize function
      const { error: initError } = await supabase.rpc('initialize_site_sections', {
        p_location_id: locationId,
      });

      if (initError) {
        console.error('Error initializing site sections:', initError);
        // Return empty array instead of error - might be RLS issue
        return NextResponse.json({ sections: [], isNew: true });
      }

      // Fetch the newly created sections
      const { data: newSections, error: fetchError } = await supabase
        .from('site_sections')
        .select('*')
        .eq('location_id', locationId)
        .order('display_order', { ascending: true });

      if (fetchError) {
        console.error('Error fetching initialized sections:', fetchError);
        return NextResponse.json({ sections: [], isNew: true });
      }

      return NextResponse.json({
        sections: transformSections(newSections || []),
        isNew: true,
      });
    }

    return NextResponse.json({
      sections: transformSections(sections),
      isNew: false,
    });
  } catch (error) {
    console.error('Error in GET /api/site-sections:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// PUT - Upsert a section
// ============================================================================

export async function PUT(request: Request) {
  try {
    const body: UpsertSectionRequest = await request.json();
    const { locationId, sectionType, isEnabled, displayOrder, content, styleOverrides } = body;

    if (!locationId) {
      return NextResponse.json({ error: 'locationId is required' }, { status: 400 });
    }

    if (!sectionType) {
      return NextResponse.json({ error: 'sectionType is required' }, { status: 400 });
    }

    // Build update data
    const updateData: Record<string, unknown> = {
      location_id: locationId,
      section_type: sectionType,
    };

    if (isEnabled !== undefined) updateData.is_enabled = isEnabled;
    if (displayOrder !== undefined) updateData.display_order = displayOrder;
    if (content !== undefined) updateData.content = content;
    if (styleOverrides !== undefined) updateData.style_overrides = styleOverrides;

    // Upsert (insert or update)
    const { data, error } = await supabase
      .from('site_sections')
      .upsert(updateData, { onConflict: 'location_id,section_type' })
      .select()
      .single();

    if (error) {
      console.error('Error saving site section:', error);
      return NextResponse.json({ error: 'Failed to save site section' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Section saved successfully',
      section: transformSection(data),
    });
  } catch (error) {
    console.error('Error in PUT /api/site-sections:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function transformSection(section: Record<string, unknown>): Record<string, unknown> {
  return {
    id: section.id,
    locationId: section.location_id,
    sectionType: section.section_type,
    isEnabled: section.is_enabled,
    displayOrder: section.display_order,
    content: section.content,
    styleOverrides: section.style_overrides,
    createdAt: section.created_at,
    updatedAt: section.updated_at,
    publishedAt: section.published_at,
  };
}

function transformSections(sections: Record<string, unknown>[]): Record<string, unknown>[] {
  return sections.map(transformSection);
}
