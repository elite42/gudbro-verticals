import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { validateAdminApiKey } from '@/lib/accommodations/helpers';

export const dynamic = 'force-dynamic';

interface OrderRow {
  id: string;
  status: string;
  created_at: string;
  delivered_at: string | null;
  items: { category_tag: string | null }[];
}

/**
 * Determine the primary category of an order by majority vote of item category_tags.
 * Falls back to 'general' when no tags are present.
 */
function primaryCategoryTag(items: { category_tag: string | null }[]): string {
  if (!items || items.length === 0) return 'general';

  const counts: Record<string, number> = {};
  for (const item of items) {
    const tag = item.category_tag || 'general';
    counts[tag] = (counts[tag] || 0) + 1;
  }

  let best = 'general';
  let bestCount = 0;
  for (const [tag, count] of Object.entries(counts)) {
    if (count > bestCount) {
      best = tag;
      bestCount = count;
    }
  }
  return best;
}

/**
 * GET /api/accommodations/analytics/order-performance?propertyId=X&days=30
 *
 * Returns order performance metrics:
 * - avgFulfillmentMinutes: average created_at to delivered_at in minutes
 * - totalDelivered, totalCancelled, totalPending counts
 * - byCategory: per-category avg fulfillment time and order count
 */
export async function GET(request: NextRequest) {
  const auth = validateAdminApiKey(request);
  if (!auth.valid) return auth.response;

  const { searchParams } = new URL(request.url);
  const propertyId = searchParams.get('propertyId');
  const days = parseInt(searchParams.get('days') || '30', 10);

  if (!propertyId) {
    return NextResponse.json({ error: 'Missing required parameter: propertyId' }, { status: 400 });
  }

  const validDays = [7, 30, 90, 365];
  const periodDays = validDays.includes(days) ? days : 30;

  const periodEnd = new Date();
  const periodStart = new Date(periodEnd);
  periodStart.setDate(periodStart.getDate() - periodDays);

  const startStr = periodStart.toISOString();
  const endStr = periodEnd.toISOString();

  try {
    const { data: orders, error } = await supabaseAdmin
      .from('accom_service_orders')
      .select(
        `
        id, status, created_at, delivered_at,
        items:accom_service_order_items(category_tag)
      `
      )
      .eq('property_id', propertyId)
      .gte('created_at', startStr)
      .lte('created_at', endStr);

    if (error) {
      console.error('[accommodations/analytics/order-performance] Query error:', error);
      return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
    }

    const rows = (orders || []) as unknown as OrderRow[];

    // Count by status
    let totalDelivered = 0;
    let totalCancelled = 0;
    let totalPending = 0;

    // Fulfillment tracking
    const fulfillmentMinutes: number[] = [];
    const categoryMap: Record<string, { totalMinutes: number; count: number }> = {};

    for (const order of rows) {
      if (order.status === 'delivered') {
        totalDelivered++;

        if (order.delivered_at && order.created_at) {
          const created = new Date(order.created_at).getTime();
          const delivered = new Date(order.delivered_at).getTime();
          const minutes = (delivered - created) / (1000 * 60);

          if (minutes >= 0) {
            fulfillmentMinutes.push(minutes);

            const category = primaryCategoryTag(order.items);
            if (!categoryMap[category]) {
              categoryMap[category] = { totalMinutes: 0, count: 0 };
            }
            categoryMap[category].totalMinutes += minutes;
            categoryMap[category].count++;
          }
        }
      } else if (order.status === 'cancelled') {
        totalCancelled++;
      } else {
        totalPending++;
      }
    }

    // Compute averages
    const avgFulfillmentMinutes =
      fulfillmentMinutes.length > 0
        ? Math.round(fulfillmentMinutes.reduce((a, b) => a + b, 0) / fulfillmentMinutes.length)
        : null;

    const byCategory = Object.entries(categoryMap)
      .map(([category, data]) => ({
        category,
        avgMinutes: data.count > 0 ? Math.round(data.totalMinutes / data.count) : null,
        count: data.count,
      }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      avgFulfillmentMinutes,
      totalDelivered,
      totalCancelled,
      totalPending,
      byCategory,
    });
  } catch (err) {
    console.error('[accommodations/analytics/order-performance] Error:', err);
    return NextResponse.json({ error: 'Failed to compute order performance' }, { status: 500 });
  }
}
