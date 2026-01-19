import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

// ============================================================================
// Types
// ============================================================================

interface PublishRequest {
  locationId: string;
  sectionIds?: string[]; // Optional: specific sections to publish. If omitted, publish all enabled
}

// ============================================================================
// POST - Publish sections
// ============================================================================

export async function POST(request: Request) {
  try {
    const body: PublishRequest = await request.json();
    const { locationId, sectionIds } = body;

    if (!locationId) {
      return NextResponse.json({ error: 'locationId is required' }, { status: 400 });
    }

    const now = new Date().toISOString();

    let query = supabase
      .from('site_sections')
      .update({ published_at: now })
      .eq('location_id', locationId)
      .eq('is_enabled', true); // Only publish enabled sections

    // If specific section IDs provided, filter by them
    if (sectionIds && sectionIds.length > 0) {
      query = query.in('id', sectionIds);
    }

    const { data, error } = await query.select();

    if (error) {
      console.error('Error publishing sections:', error);
      return NextResponse.json({ error: 'Failed to publish sections' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `${data?.length || 0} sections published successfully`,
      publishedAt: now,
      publishedSections: data?.map((s) => ({
        id: s.id,
        sectionType: s.section_type,
        publishedAt: s.published_at,
      })),
    });
  } catch (error) {
    console.error('Error in POST /api/site-sections/publish:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// DELETE - Unpublish sections (set published_at to null)
// ============================================================================

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');
    const sectionId = searchParams.get('sectionId');

    if (!locationId) {
      return NextResponse.json({ error: 'locationId is required' }, { status: 400 });
    }

    let query = supabase
      .from('site_sections')
      .update({ published_at: null })
      .eq('location_id', locationId);

    // If specific section ID provided, only unpublish that one
    if (sectionId) {
      query = query.eq('id', sectionId);
    }

    const { data, error } = await query.select();

    if (error) {
      console.error('Error unpublishing sections:', error);
      return NextResponse.json({ error: 'Failed to unpublish sections' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `${data?.length || 0} sections unpublished successfully`,
      unpublishedSections: data?.map((s) => ({
        id: s.id,
        sectionType: s.section_type,
      })),
    });
  } catch (error) {
    console.error('Error in DELETE /api/site-sections/publish:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
