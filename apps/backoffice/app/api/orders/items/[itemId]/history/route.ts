import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

/**
 * GET /api/orders/items/[itemId]/history
 *
 * Get status change history for a specific order item.
 * Useful for debugging and audit trails.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    const { itemId } = await params;
    const { searchParams } = new URL(request.url);

    // Pagination
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const supabase = getSupabaseAdmin();

    // First verify item exists
    const { data: item, error: itemError } = await supabase
      .from('order_items')
      .select('id, item_name, order_id, item_status, station')
      .eq('id', itemId)
      .single();

    if (itemError || !item) {
      return NextResponse.json({ success: false, error: 'Order item not found' }, { status: 404 });
    }

    // Get history records
    const {
      data: history,
      error: historyError,
      count,
    } = await supabase
      .from('order_item_status_history')
      .select('*', { count: 'exact' })
      .eq('order_item_id', itemId)
      .order('changed_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (historyError) {
      console.error('Error fetching item history:', historyError);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch history' },
        { status: 500 }
      );
    }

    // Format history for display
    const formattedHistory = (history || []).map((record) => ({
      id: record.id,
      fromStatus: record.from_status,
      toStatus: record.to_status,
      station: record.station,
      changedAt: record.changed_at,
      changedBy: record.changed_by,
      changedByName: record.changed_by_name,
      durationFromPrevious: record.duration_from_previous_seconds,
      durationFormatted: formatDuration(record.duration_from_previous_seconds),
    }));

    // Calculate timeline summary
    const timeline = buildTimeline(history || []);

    return NextResponse.json({
      success: true,
      item: {
        id: item.id,
        name: item.item_name,
        currentStatus: item.item_status,
        station: item.station,
        orderId: item.order_id,
      },
      history: formattedHistory,
      timeline,
      pagination: {
        total: count || 0,
        limit,
        offset,
        hasMore: (count || 0) > offset + limit,
      },
    });
  } catch (error) {
    console.error('Item history API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

/**
 * Format duration in seconds to human-readable string
 */
function formatDuration(seconds: number | null): string | null {
  if (seconds === null || seconds === undefined) return null;

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (minutes < 60) {
    return remainingSeconds > 0 ? `${minutes}m ${remainingSeconds}s` : `${minutes}m`;
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

/**
 * Build a summary timeline from history records
 */
interface HistoryRecord {
  from_status: string | null;
  to_status: string;
  changed_at: string;
  duration_from_previous_seconds: number | null;
  station: string | null;
}

interface TimelineEntry {
  status: string;
  timestamp: string;
  duration: number | null;
  station: string | null;
}

function buildTimeline(history: HistoryRecord[]): {
  entries: TimelineEntry[];
  totalPrepTime: number | null;
  totalOrderTime: number | null;
} {
  // Reverse to get chronological order
  const chronological = [...history].reverse();

  const entries: TimelineEntry[] = [];
  let totalPrepTime: number | null = null;
  let totalOrderTime = 0;

  for (const record of chronological) {
    entries.push({
      status: record.to_status,
      timestamp: record.changed_at,
      duration: record.duration_from_previous_seconds,
      station: record.station,
    });

    // Track total time
    if (record.duration_from_previous_seconds) {
      totalOrderTime += record.duration_from_previous_seconds;
    }

    // Track prep time specifically (preparing -> ready)
    if (record.from_status === 'preparing' && record.to_status === 'ready') {
      totalPrepTime = record.duration_from_previous_seconds;
    }
  }

  return {
    entries,
    totalPrepTime,
    totalOrderTime: totalOrderTime > 0 ? totalOrderTime : null,
  };
}
