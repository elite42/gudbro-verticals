import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import {
  getSections,
  getSection,
  createSection,
  updateSection,
  deleteSection,
  updateSectionFloorPlan,
} from '@/lib/reservations/table-management-service';

export const dynamic = 'force-dynamic';

// GET /api/sections - Get sections for a location
export async function GET(request: NextRequest) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');
    const type = searchParams.get('type') || 'list'; // list, single
    const sectionId = searchParams.get('sectionId');
    const activeOnly = searchParams.get('activeOnly') !== 'false'; // default true
    const reservableOnly = searchParams.get('reservableOnly') === 'true';

    switch (type) {
      case 'list': {
        if (!locationId) {
          return NextResponse.json(
            { error: 'Missing required field: locationId' },
            { status: 400 }
          );
        }

        const sections = await getSections(locationId, {
          activeOnly,
          reservableOnly,
        });

        return NextResponse.json({
          success: true,
          sections,
          count: sections.length,
        });
      }

      case 'single': {
        if (!sectionId) {
          return NextResponse.json({ error: 'Missing required field: sectionId' }, { status: 400 });
        }

        const section = await getSection(sectionId);

        if (!section) {
          return NextResponse.json({ error: 'Section not found' }, { status: 404 });
        }

        return NextResponse.json({
          success: true,
          section,
        });
      }

      default:
        return NextResponse.json({ error: 'Invalid type. Use: list, single' }, { status: 400 });
    }
  } catch (error) {
    console.error('Sections GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/sections - Create a section
export async function POST(request: NextRequest) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { action, ...params } = body;

    switch (action || 'create') {
      case 'create': {
        const {
          locationId,
          name,
          nameTranslations,
          code,
          description,
          maxCapacity,
          defaultCoversPerTable,
          sectionType,
          amenities,
          weatherDependent,
          isReservable,
          displayOrder,
          colorHex,
        } = params;

        if (!locationId || !name || !code) {
          return NextResponse.json(
            { error: 'Missing required fields: locationId, name, code' },
            { status: 400 }
          );
        }

        const section = await createSection({
          location_id: locationId,
          name: name,
          name_translations: nameTranslations,
          code: code,
          description: description,
          max_capacity: maxCapacity,
          default_covers_per_table: defaultCoversPerTable,
          section_type: sectionType,
          amenities: amenities,
          weather_dependent: weatherDependent,
          is_reservable: isReservable,
          display_order: displayOrder,
          color_hex: colorHex,
        });

        return NextResponse.json({
          success: true,
          section,
          message: 'Section created',
        });
      }

      case 'updateFloorPlan': {
        const { sectionId, floorPlanConfig } = params;

        if (!sectionId || !floorPlanConfig) {
          return NextResponse.json(
            { error: 'Missing required fields: sectionId, floorPlanConfig' },
            { status: 400 }
          );
        }

        await updateSectionFloorPlan(sectionId, floorPlanConfig);

        return NextResponse.json({
          success: true,
          message: 'Floor plan updated',
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: create, updateFloorPlan' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Sections POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/sections - Update a section
export async function PATCH(request: NextRequest) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { sectionId, ...updates } = body;

    if (!sectionId) {
      return NextResponse.json({ error: 'Missing required field: sectionId' }, { status: 400 });
    }

    // Map camelCase to snake_case
    const mappedUpdates: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      nameTranslations: 'name_translations',
      sectionType: 'section_type',
      weatherDependent: 'weather_dependent',
      isReservable: 'is_reservable',
      isActive: 'is_active',
      displayOrder: 'display_order',
      floorPlanConfig: 'floor_plan_config',
      colorHex: 'color_hex',
    };

    for (const [key, value] of Object.entries(updates)) {
      const mappedKey = fieldMap[key] || key;
      mappedUpdates[mappedKey] = value;
    }

    const section = await updateSection(sectionId, mappedUpdates);

    return NextResponse.json({
      success: true,
      section,
      message: 'Section updated',
    });
  } catch (error) {
    console.error('Sections PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/sections - Delete a section
export async function DELETE(request: NextRequest) {
  try {
    // Auth check
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const sectionId = searchParams.get('sectionId');
    const hardDelete = searchParams.get('hardDelete') === 'true';

    if (!sectionId) {
      return NextResponse.json({ error: 'Missing required field: sectionId' }, { status: 400 });
    }

    await deleteSection(sectionId, hardDelete);

    return NextResponse.json({
      success: true,
      message: hardDelete ? 'Section deleted' : 'Section deactivated',
    });
  } catch (error) {
    console.error('Sections DELETE error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
