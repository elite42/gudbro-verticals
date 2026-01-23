import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

type ItemStatus = 'pending' | 'preparing' | 'ready' | 'served';
type Station = 'kitchen' | 'bar' | 'other';

interface UpdateStatusBody {
  status: ItemStatus;
  station?: Station;
  changed_by?: string;
  changed_by_name?: string;
}

/**
 * PATCH /api/orders/items/[itemId]/status
 *
 * Update the status of a single order item.
 * This triggers the auto-logging via database trigger.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params;
    const body: UpdateStatusBody = await request.json();
    const { status, station, changed_by, changed_by_name } = body;

    // Validate required fields
    if (!status) {
      return NextResponse.json({ success: false, error: 'status is required' }, { status: 400 });
    }

    // Validate status value
    const validStatuses: ItemStatus[] = ['pending', 'preparing', 'ready', 'served'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid status. Must be one of: ${validStatuses.join(', ')}`,
        },
        { status: 400 }
      );
    }

    // Validate station if provided
    if (station) {
      const validStations: Station[] = ['kitchen', 'bar', 'other'];
      if (!validStations.includes(station)) {
        return NextResponse.json(
          {
            success: false,
            error: `Invalid station. Must be one of: ${validStations.join(', ')}`,
          },
          { status: 400 }
        );
      }
    }

    const supabase = getSupabaseAdmin();

    // Get current item to verify it exists
    const { data: currentItem, error: fetchError } = await supabase
      .from('order_items')
      .select('id, item_status, order_id, station')
      .eq('id', itemId)
      .single();

    if (fetchError || !currentItem) {
      return NextResponse.json({ success: false, error: 'Order item not found' }, { status: 404 });
    }

    // Skip update if status hasn't changed
    if (currentItem.item_status === status && (!station || currentItem.station === station)) {
      return NextResponse.json({
        success: true,
        message: 'No change needed',
        item: currentItem,
      });
    }

    // Build update object
    const updateData: Record<string, unknown> = {
      item_status: status,
    };

    // Only update station if provided
    if (station) {
      updateData.station = station;
    }

    // Update the item (trigger will auto-log to history)
    const { data: updatedItem, error: updateError } = await supabase
      .from('order_items')
      .update(updateData)
      .eq('id', itemId)
      .select('id, item_status, station, preparing_at, ready_at, served_at, order_id, item_name')
      .single();

    if (updateError) {
      console.error('Error updating item status:', updateError);
      return NextResponse.json(
        { success: false, error: 'Failed to update item status' },
        { status: 500 }
      );
    }

    // If changed_by info provided, update the latest history record
    if (changed_by || changed_by_name) {
      await supabase
        .from('order_item_status_history')
        .update({
          changed_by,
          changed_by_name,
        })
        .eq('order_item_id', itemId)
        .order('changed_at', { ascending: false })
        .limit(1);
    }

    return NextResponse.json({
      success: true,
      item: updatedItem,
      previousStatus: currentItem.item_status,
      newStatus: status,
    });
  } catch (error) {
    console.error('Item status API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

/**
 * GET /api/orders/items/[itemId]/status
 *
 * Get current status of an order item.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params;
    const supabase = getSupabaseAdmin();

    const { data: item, error } = await supabase
      .from('order_items')
      .select(
        `
        id,
        item_status,
        station,
        preparing_at,
        ready_at,
        served_at,
        item_name,
        quantity,
        order_id
      `
      )
      .eq('id', itemId)
      .single();

    if (error || !item) {
      return NextResponse.json({ success: false, error: 'Order item not found' }, { status: 404 });
    }

    // Calculate prep time if applicable
    let prepTimeSeconds: number | null = null;
    if (item.preparing_at && item.ready_at) {
      const start = new Date(item.preparing_at).getTime();
      const end = new Date(item.ready_at).getTime();
      prepTimeSeconds = Math.floor((end - start) / 1000);
    }

    return NextResponse.json({
      success: true,
      item: {
        ...item,
        prep_time_seconds: prepTimeSeconds,
      },
    });
  } catch (error) {
    console.error('Item status GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
