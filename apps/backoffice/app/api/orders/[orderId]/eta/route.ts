import { getSupabaseAdmin } from '@/lib/supabase-admin';
import {
  withErrorHandlingDynamic,
  successResponse,
  NotFoundError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const dynamic = 'force-dynamic';

interface OrderItem {
  id: string;
  item_status: string;
  station: string | null;
  preparing_at: string | null;
  menu_item_id: string | null;
}

interface Order {
  id: string;
  merchant_id: string;
  status: string;
  submitted_at: string;
  confirmed_at: string | null;
  preparing_at: string | null;
  order_items: OrderItem[];
}

/**
 * GET /api/orders/[orderId]/eta
 *
 * Get estimated time to completion for an order.
 * Uses historical prep time data to predict when order will be ready.
 */
export const GET = withErrorHandlingDynamic<unknown, { orderId: string }>(
  async (request: Request, { params }) => {
    const { orderId } = await params;
    const supabase = getSupabaseAdmin();

    // Get order with items
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .select(
        `
        id,
        merchant_id,
        status,
        submitted_at,
        confirmed_at,
        preparing_at,
        order_items (
          id,
          item_status,
          station,
          preparing_at,
          menu_item_id
        )
      `
      )
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      throw new NotFoundError('Order');
    }

    const typedOrder = order as unknown as Order;

    // If order is already ready or delivered, no ETA needed
    if (['ready', 'delivered', 'cancelled'].includes(typedOrder.status)) {
      return successResponse({
        orderId,
        status: typedOrder.status,
        eta: null,
        message: `Order is already ${typedOrder.status}`,
      });
    }

    // Calculate ETA based on item statuses and historical data
    const eta = await calculateOrderETA(supabase, typedOrder);

    return successResponse({
      orderId,
      status: typedOrder.status,
      ...eta,
    });
  },
  { context: 'orders-eta', logger: backofficeLogger }
);

async function calculateOrderETA(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  order: Order
): Promise<{
  etaSeconds: number;
  etaMinutes: number;
  etaReadyAt: string;
  confidence: 'high' | 'medium' | 'low';
  itemsRemaining: number;
  itemsPreparing: number;
  itemsReady: number;
  breakdown: Array<{ itemId: string; estimatedSeconds: number }>;
}> {
  const items = order.order_items || [];

  // Count items by status
  const itemsReady = items.filter(
    (i) => i.item_status === 'ready' || i.item_status === 'served'
  ).length;
  const itemsPreparing = items.filter((i) => i.item_status === 'preparing').length;
  const itemsPending = items.filter((i) => i.item_status === 'pending').length;
  const itemsRemaining = itemsPreparing + itemsPending;

  if (itemsRemaining === 0) {
    return {
      etaSeconds: 0,
      etaMinutes: 0,
      etaReadyAt: new Date().toISOString(),
      confidence: 'high',
      itemsRemaining: 0,
      itemsPreparing,
      itemsReady,
      breakdown: [],
    };
  }

  // Get historical prep times for this merchant
  const { data: historicalData } = await supabase
    .from('mv_prep_time_summary')
    .select('avg_prep_seconds, median_prep_seconds, station')
    .eq('merchant_id', order.merchant_id)
    .order('prep_date', { ascending: false })
    .limit(14);

  // Calculate average prep time per item
  let avgPrepTime = 300; // Default: 5 minutes
  let confidence: 'high' | 'medium' | 'low' = 'low';

  if (historicalData && historicalData.length > 0) {
    const avgValues = historicalData
      .map((d) => d.median_prep_seconds || d.avg_prep_seconds)
      .filter(Boolean) as number[];

    if (avgValues.length > 0) {
      avgPrepTime = Math.round(avgValues.reduce((a, b) => a + b, 0) / avgValues.length);
      confidence = avgValues.length >= 7 ? 'high' : avgValues.length >= 3 ? 'medium' : 'low';
    }
  }

  // Get current hour for time-of-day adjustment
  const currentHour = new Date().getHours();
  const isPeakHour =
    (currentHour >= 11 && currentHour <= 14) || (currentHour >= 18 && currentHour <= 21);
  const peakMultiplier = isPeakHour ? 1.2 : 1.0; // 20% longer during peak

  // Calculate ETA for each item
  const breakdown: Array<{ itemId: string; estimatedSeconds: number }> = [];
  let totalEstimatedSeconds = 0;

  for (const item of items) {
    if (item.item_status === 'ready' || item.item_status === 'served') {
      continue; // Skip completed items
    }

    let estimatedSeconds = avgPrepTime;

    // If already preparing, use elapsed time
    if (item.item_status === 'preparing' && item.preparing_at) {
      const elapsed = Math.floor((Date.now() - new Date(item.preparing_at).getTime()) / 1000);
      estimatedSeconds = Math.max(avgPrepTime - elapsed, 30); // At least 30 seconds
    }

    // Apply peak hour multiplier
    estimatedSeconds = Math.round(estimatedSeconds * peakMultiplier);

    breakdown.push({
      itemId: item.id,
      estimatedSeconds,
    });

    totalEstimatedSeconds = Math.max(totalEstimatedSeconds, estimatedSeconds);
  }

  // Add queue wait time if order is pending/confirmed
  if (order.status === 'pending' || order.status === 'confirmed') {
    // Estimate based on number of items in queue
    const { count: queueSize } = await supabase
      .from('order_items')
      .select('id', { count: 'exact', head: true })
      .in('item_status', ['pending', 'preparing'])
      .not('order_id', 'eq', order.id);

    const queueWait = Math.min((queueSize || 0) * 60, 600); // Max 10 min queue wait
    totalEstimatedSeconds += queueWait;
  }

  const etaReadyAt = new Date(Date.now() + totalEstimatedSeconds * 1000).toISOString();

  return {
    etaSeconds: totalEstimatedSeconds,
    etaMinutes: Math.ceil(totalEstimatedSeconds / 60),
    etaReadyAt,
    confidence,
    itemsRemaining,
    itemsPreparing,
    itemsReady,
    breakdown,
  };
}
