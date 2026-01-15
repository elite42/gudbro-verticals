import { NextRequest, NextResponse } from 'next/server';
import {
  getTables,
  getTable,
  createTable,
  updateTable,
  deleteTable,
  createTablesBulk,
  getTablesForPartySize,
  getLocationTotalCapacity,
  getLocationCapacityBreakdown,
  updateTableFloorPlan,
  getFloorPlanData,
  type CreateTableInput,
} from '@/lib/reservations/table-management-service';

export const dynamic = 'force-dynamic';

// GET /api/tables - Get tables for a location
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');
    const type = searchParams.get('type') || 'list'; // list, single, forPartySize, capacity, floorPlan
    const tableId = searchParams.get('tableId');
    const sectionId = searchParams.get('sectionId');
    const partySize = searchParams.get('partySize');
    const activeOnly = searchParams.get('activeOnly') !== 'false'; // default true
    const reservableOnly = searchParams.get('reservableOnly') === 'true';
    const includeSection = searchParams.get('includeSection') === 'true';

    switch (type) {
      case 'list': {
        if (!locationId) {
          return NextResponse.json(
            { error: 'Missing required field: locationId' },
            { status: 400 }
          );
        }

        const tables = await getTables(locationId, {
          sectionId: sectionId || undefined,
          activeOnly,
          reservableOnly,
          includeSection,
        });

        return NextResponse.json({
          success: true,
          tables,
          count: tables.length,
        });
      }

      case 'single': {
        if (!tableId) {
          return NextResponse.json({ error: 'Missing required field: tableId' }, { status: 400 });
        }

        const table = await getTable(tableId);

        if (!table) {
          return NextResponse.json({ error: 'Table not found' }, { status: 404 });
        }

        return NextResponse.json({
          success: true,
          table,
        });
      }

      case 'forPartySize': {
        if (!locationId || !partySize) {
          return NextResponse.json(
            { error: 'Missing required fields: locationId, partySize' },
            { status: 400 }
          );
        }

        const tables = await getTablesForPartySize(
          locationId,
          parseInt(partySize),
          sectionId || undefined
        );

        return NextResponse.json({
          success: true,
          tables,
          count: tables.length,
        });
      }

      case 'capacity': {
        if (!locationId) {
          return NextResponse.json(
            { error: 'Missing required field: locationId' },
            { status: 400 }
          );
        }

        const breakdown = await getLocationCapacityBreakdown(locationId);
        const totalCapacity = await getLocationTotalCapacity(locationId);

        return NextResponse.json({
          success: true,
          totalCapacity,
          breakdown,
        });
      }

      case 'floorPlan': {
        if (!locationId) {
          return NextResponse.json(
            { error: 'Missing required field: locationId' },
            { status: 400 }
          );
        }

        const floorPlanData = await getFloorPlanData(locationId);

        return NextResponse.json({
          success: true,
          ...floorPlanData,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid type. Use: list, single, forPartySize, capacity, floorPlan' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Tables GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/tables - Create tables
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, ...params } = body;

    switch (action || 'create') {
      case 'create': {
        const {
          locationId,
          sectionId,
          tableNumber,
          displayName,
          minCapacity,
          maxCapacity,
          optimalCapacity,
          tableShape,
          tableSize,
          isCombinable,
          combineWith,
          features,
          priority,
          isReservable,
          notes,
        } = params;

        if (!locationId || !tableNumber) {
          return NextResponse.json(
            { error: 'Missing required fields: locationId, tableNumber' },
            { status: 400 }
          );
        }

        const table = await createTable({
          location_id: locationId,
          section_id: sectionId,
          table_number: tableNumber,
          display_name: displayName,
          min_capacity: minCapacity,
          max_capacity: maxCapacity,
          optimal_capacity: optimalCapacity,
          table_shape: tableShape,
          table_size: tableSize,
          is_combinable: isCombinable,
          combine_with: combineWith,
          features: features,
          priority: priority,
          is_reservable: isReservable,
          notes: notes,
        });

        return NextResponse.json({
          success: true,
          table,
          message: 'Table created',
        });
      }

      case 'createBulk': {
        const { tables } = params;

        if (!tables || !Array.isArray(tables) || tables.length === 0) {
          return NextResponse.json(
            { error: 'Missing required field: tables (array)' },
            { status: 400 }
          );
        }

        const mappedTables = tables.map(
          (t: {
            locationId: string;
            sectionId?: string;
            tableNumber: string;
            displayName?: string;
            minCapacity?: number;
            maxCapacity?: number;
            optimalCapacity?: number;
            tableShape?: string;
            tableSize?: string;
            isCombinable?: boolean;
            features?: string[];
            priority?: number;
            isReservable?: boolean;
            notes?: string;
          }) => ({
            location_id: t.locationId,
            section_id: t.sectionId,
            table_number: t.tableNumber,
            display_name: t.displayName,
            min_capacity: t.minCapacity,
            max_capacity: t.maxCapacity,
            optimal_capacity: t.optimalCapacity,
            table_shape: t.tableShape,
            table_size: t.tableSize,
            is_combinable: t.isCombinable,
            features: t.features,
            priority: t.priority,
            is_reservable: t.isReservable,
            notes: t.notes,
          })
        ) as CreateTableInput[];

        const createdTables = await createTablesBulk(mappedTables);

        return NextResponse.json({
          success: true,
          tables: createdTables,
          count: createdTables.length,
          message: `Created ${createdTables.length} tables`,
        });
      }

      case 'updateFloorPlan': {
        const { tableId, floorPlanConfig } = params;

        if (!tableId || !floorPlanConfig) {
          return NextResponse.json(
            { error: 'Missing required fields: tableId, floorPlanConfig' },
            { status: 400 }
          );
        }

        await updateTableFloorPlan(tableId, floorPlanConfig);

        return NextResponse.json({
          success: true,
          message: 'Floor plan updated',
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: create, createBulk, updateFloorPlan' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Tables POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/tables - Update a table
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { tableId, ...updates } = body;

    if (!tableId) {
      return NextResponse.json({ error: 'Missing required field: tableId' }, { status: 400 });
    }

    // Map camelCase to snake_case
    const mappedUpdates: Record<string, unknown> = {};
    const fieldMap: Record<string, string> = {
      sectionId: 'section_id',
      displayName: 'display_name',
      minCapacity: 'min_capacity',
      maxCapacity: 'max_capacity',
      optimalCapacity: 'optimal_capacity',
      tableShape: 'table_shape',
      tableSize: 'table_size',
      isCombinable: 'is_combinable',
      combineWith: 'combine_with',
      isReservable: 'is_reservable',
      isActive: 'is_active',
      floorPlanConfig: 'floor_plan_config',
    };

    for (const [key, value] of Object.entries(updates)) {
      const mappedKey = fieldMap[key] || key;
      mappedUpdates[mappedKey] = value;
    }

    const table = await updateTable(tableId, mappedUpdates);

    return NextResponse.json({
      success: true,
      table,
      message: 'Table updated',
    });
  } catch (error) {
    console.error('Tables PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/tables - Delete a table
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tableId = searchParams.get('tableId');
    const hardDelete = searchParams.get('hardDelete') === 'true';

    if (!tableId) {
      return NextResponse.json({ error: 'Missing required field: tableId' }, { status: 400 });
    }

    await deleteTable(tableId, hardDelete);

    return NextResponse.json({
      success: true,
      message: hardDelete ? 'Table deleted' : 'Table deactivated',
    });
  } catch (error) {
    console.error('Tables DELETE error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
