/**
 * ETA Prediction Service
 *
 * Predicts estimated time to completion for orders based on:
 * - Historical prep time data
 * - Current queue depth
 * - Time of day patterns
 * - Item-specific prep times
 */

import { getSupabaseAdmin } from './supabase-admin';

export interface ETAPrediction {
  orderId: string;
  etaSeconds: number;
  etaMinutes: number;
  etaReadyAt: string;
  confidence: 'high' | 'medium' | 'low';
  itemsRemaining: number;
  itemsPreparing: number;
  itemsReady: number;
  breakdown: Array<{
    itemId: string;
    itemName: string;
    estimatedSeconds: number;
    currentStatus: string;
    elapsedSeconds?: number;
  }>;
  factors: {
    baseEstimate: number;
    peakHourAdjustment: number;
    queueAdjustment: number;
  };
}

interface OrderItem {
  id: string;
  item_status: string;
  station: string | null;
  preparing_at: string | null;
  ready_at: string | null;
  menu_item_id: string | null;
  item_name: Record<string, string>;
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
 * Predict ETA for a specific order
 */
export async function predictOrderETA(orderId: string): Promise<ETAPrediction | null> {
  const supabase = getSupabaseAdmin();

  // Get order with items
  const { data: orderData, error: orderError } = await supabase
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
        ready_at,
        menu_item_id,
        item_name
      )
    `
    )
    .eq('id', orderId)
    .single();

  if (orderError || !orderData) {
    console.error('Error fetching order for ETA:', orderError);
    return null;
  }

  const order = orderData as unknown as Order;

  // If order is already ready or delivered, no ETA needed
  if (['ready', 'delivered', 'cancelled'].includes(order.status)) {
    return {
      orderId,
      etaSeconds: 0,
      etaMinutes: 0,
      etaReadyAt: new Date().toISOString(),
      confidence: 'high',
      itemsRemaining: 0,
      itemsPreparing: 0,
      itemsReady: order.order_items.length,
      breakdown: [],
      factors: {
        baseEstimate: 0,
        peakHourAdjustment: 0,
        queueAdjustment: 0,
      },
    };
  }

  return calculateOrderETA(supabase, order);
}

/**
 * Get ETA for multiple orders at once (batch)
 */
export async function predictMultipleOrderETAs(
  orderIds: string[]
): Promise<Map<string, ETAPrediction>> {
  const results = new Map<string, ETAPrediction>();

  // Process in parallel for efficiency
  const predictions = await Promise.all(orderIds.map((id) => predictOrderETA(id)));

  orderIds.forEach((id, index) => {
    const prediction = predictions[index];
    if (prediction) {
      results.set(id, prediction);
    }
  });

  return results;
}

/**
 * Get merchant's average prep time (used for initial estimates)
 */
export async function getMerchantAvgPrepTime(
  merchantId: string,
  station: string | null = null
): Promise<number> {
  const supabase = getSupabaseAdmin();

  let query = supabase
    .from('mv_prep_time_summary')
    .select('avg_prep_seconds, median_prep_seconds')
    .eq('merchant_id', merchantId)
    .order('prep_date', { ascending: false })
    .limit(14);

  if (station) {
    query = query.eq('station', station);
  }

  const { data, error } = await query;

  if (error || !data || data.length === 0) {
    return 300; // Default: 5 minutes
  }

  const avgValues = data
    .map((d) => d.median_prep_seconds || d.avg_prep_seconds)
    .filter(Boolean) as number[];

  if (avgValues.length === 0) {
    return 300;
  }

  return Math.round(avgValues.reduce((a, b) => a + b, 0) / avgValues.length);
}

/**
 * Get item-specific average prep time
 */
export async function getItemAvgPrepTime(
  merchantId: string,
  menuItemId: string
): Promise<number | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('mv_item_prep_time_30d')
    .select('avg_prep_seconds, median_prep_seconds')
    .eq('merchant_id', merchantId)
    .eq('menu_item_id', menuItemId)
    .single();

  if (error || !data) {
    return null; // Item-specific data not available
  }

  return Math.round(data.median_prep_seconds || data.avg_prep_seconds || 300);
}

/**
 * Check if current hour is a peak hour
 */
export function isPeakHour(hour: number): boolean {
  // Typical peak hours: 11-14 (lunch) and 18-21 (dinner)
  return (hour >= 11 && hour <= 14) || (hour >= 18 && hour <= 21);
}

/**
 * Get peak hour multiplier based on historical data
 */
export async function getPeakHourMultiplier(
  merchantId: string,
  hour: number,
  dayOfWeek: number
): Promise<number> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('mv_prep_time_hourly')
    .select('avg_prep_seconds, items_completed')
    .eq('merchant_id', merchantId)
    .eq('hour_of_day', hour)
    .eq('day_of_week', dayOfWeek);

  if (error || !data || data.length === 0) {
    // Default multipliers
    return isPeakHour(hour) ? 1.2 : 1.0;
  }

  // Get overall average
  const { data: overallData } = await supabase
    .from('mv_prep_time_hourly')
    .select('avg_prep_seconds, items_completed')
    .eq('merchant_id', merchantId);

  if (!overallData || overallData.length === 0) {
    return isPeakHour(hour) ? 1.2 : 1.0;
  }

  const hourAvg = data.reduce((sum, d) => sum + (d.avg_prep_seconds || 0), 0) / data.length;
  const overallAvg =
    overallData.reduce((sum, d) => sum + (d.avg_prep_seconds || 0), 0) / overallData.length;

  if (overallAvg === 0) {
    return 1.0;
  }

  // Multiplier is ratio of this hour's avg to overall avg
  const multiplier = hourAvg / overallAvg;

  // Clamp to reasonable range (0.8 - 1.5)
  return Math.max(0.8, Math.min(1.5, multiplier));
}

// Internal calculation function

async function calculateOrderETA(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  order: Order
): Promise<ETAPrediction> {
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
      orderId: order.id,
      etaSeconds: 0,
      etaMinutes: 0,
      etaReadyAt: new Date().toISOString(),
      confidence: 'high',
      itemsRemaining: 0,
      itemsPreparing,
      itemsReady,
      breakdown: [],
      factors: {
        baseEstimate: 0,
        peakHourAdjustment: 0,
        queueAdjustment: 0,
      },
    };
  }

  // Get base prep time
  const baseAvgPrepTime = await getMerchantAvgPrepTime(order.merchant_id);

  // Get time-of-day adjustment
  const now = new Date();
  const currentHour = now.getHours();
  const dayOfWeek = now.getDay();
  const peakMultiplier = await getPeakHourMultiplier(order.merchant_id, currentHour, dayOfWeek);

  // Calculate per-item estimates
  const breakdown: ETAPrediction['breakdown'] = [];
  let maxEstimatedSeconds = 0;

  for (const item of items) {
    if (item.item_status === 'ready' || item.item_status === 'served') {
      continue;
    }

    // Try to get item-specific prep time
    let estimatedSeconds = baseAvgPrepTime;
    if (item.menu_item_id) {
      const itemSpecificTime = await getItemAvgPrepTime(order.merchant_id, item.menu_item_id);
      if (itemSpecificTime) {
        estimatedSeconds = itemSpecificTime;
      }
    }

    // If already preparing, subtract elapsed time
    let elapsedSeconds: number | undefined;
    if (item.item_status === 'preparing' && item.preparing_at) {
      elapsedSeconds = Math.floor((Date.now() - new Date(item.preparing_at).getTime()) / 1000);
      estimatedSeconds = Math.max(estimatedSeconds - elapsedSeconds, 30);
    }

    // Apply peak hour multiplier
    estimatedSeconds = Math.round(estimatedSeconds * peakMultiplier);

    breakdown.push({
      itemId: item.id,
      itemName: item.item_name.en || item.item_name.vi || 'Unknown',
      estimatedSeconds,
      currentStatus: item.item_status,
      elapsedSeconds,
    });

    maxEstimatedSeconds = Math.max(maxEstimatedSeconds, estimatedSeconds);
  }

  // Add queue wait time if order is pending/confirmed
  let queueAdjustment = 0;
  if (order.status === 'pending' || order.status === 'confirmed') {
    const { count: queueSize } = await supabase
      .from('order_items')
      .select('id', { count: 'exact', head: true })
      .in('item_status', ['pending', 'preparing'])
      .neq('order_id', order.id);

    queueAdjustment = Math.min((queueSize || 0) * 45, 600); // ~45s per item in queue, max 10 min
    maxEstimatedSeconds += queueAdjustment;
  }

  // Determine confidence level
  let confidence: 'high' | 'medium' | 'low' = 'low';

  // Check if we have enough historical data
  const { count: historyCount } = await supabase
    .from('mv_prep_time_summary')
    .select('*', { count: 'exact', head: true })
    .eq('merchant_id', order.merchant_id);

  if ((historyCount || 0) >= 14) {
    confidence = 'high';
  } else if ((historyCount || 0) >= 7) {
    confidence = 'medium';
  }

  const etaReadyAt = new Date(Date.now() + maxEstimatedSeconds * 1000).toISOString();

  return {
    orderId: order.id,
    etaSeconds: maxEstimatedSeconds,
    etaMinutes: Math.ceil(maxEstimatedSeconds / 60),
    etaReadyAt,
    confidence,
    itemsRemaining,
    itemsPreparing,
    itemsReady,
    breakdown,
    factors: {
      baseEstimate: baseAvgPrepTime,
      peakHourAdjustment: Math.round((peakMultiplier - 1) * 100),
      queueAdjustment,
    },
  };
}

/**
 * Format ETA for display
 */
export function formatETA(etaMinutes: number): string {
  if (etaMinutes <= 0) return 'Ready';
  if (etaMinutes < 2) return '~1 min';
  if (etaMinutes < 60) return `~${etaMinutes} mins`;

  const hours = Math.floor(etaMinutes / 60);
  const mins = etaMinutes % 60;
  if (mins === 0) return `~${hours}h`;
  return `~${hours}h ${mins}m`;
}

/**
 * Get ETA range for display (accounts for uncertainty)
 */
export function getETARange(
  etaMinutes: number,
  confidence: 'high' | 'medium' | 'low'
): { min: number; max: number } {
  const variance = {
    high: 0.15, // ±15%
    medium: 0.25, // ±25%
    low: 0.4, // ±40%
  };

  const v = variance[confidence];
  return {
    min: Math.max(1, Math.round(etaMinutes * (1 - v))),
    max: Math.round(etaMinutes * (1 + v)),
  };
}
