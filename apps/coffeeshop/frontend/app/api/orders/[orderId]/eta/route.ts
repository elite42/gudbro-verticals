/**
 * Order ETA API
 *
 * Returns estimated time to completion for a customer order
 * based on historical prep time data and current queue.
 */

import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

interface ETAResponse {
  orderId: string;
  etaMinutes: number;
  etaRange: { min: number; max: number };
  confidence: 'high' | 'medium' | 'low';
  itemsRemaining: number;
  etaReadyAt: string;
  message: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
): Promise<NextResponse> {
  const { orderId } = await params;

  if (!orderId) {
    return NextResponse.json({ error: 'Order ID required' }, { status: 400 });
  }

  // Use service role key for server-side operations
  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  try {
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
          ready_at,
          menu_item_id,
          item_name
        )
      `
      )
      .eq('id', orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    // If order is already ready or delivered, no ETA needed
    if (['ready', 'delivered', 'cancelled'].includes(order.status)) {
      return NextResponse.json({
        orderId,
        etaMinutes: 0,
        etaRange: { min: 0, max: 0 },
        confidence: 'high',
        itemsRemaining: 0,
        etaReadyAt: new Date().toISOString(),
        message: order.status === 'ready' ? 'Il tuo ordine è pronto!' : 'Ordine completato',
      } as ETAResponse);
    }

    const items =
      (order.order_items as Array<{
        id: string;
        item_status: string;
        station: string | null;
        preparing_at: string | null;
        ready_at: string | null;
        menu_item_id: string | null;
        item_name: Record<string, string>;
      }>) || [];

    // Count items by status
    const itemsReady = items.filter(
      (i) => i.item_status === 'ready' || i.item_status === 'served'
    ).length;
    const itemsPreparing = items.filter((i) => i.item_status === 'preparing').length;
    const itemsPending = items.filter((i) => i.item_status === 'pending').length;
    const itemsRemaining = itemsPreparing + itemsPending;

    if (itemsRemaining === 0) {
      return NextResponse.json({
        orderId,
        etaMinutes: 0,
        etaRange: { min: 0, max: 0 },
        confidence: 'high',
        itemsRemaining: 0,
        etaReadyAt: new Date().toISOString(),
        message: 'Quasi pronto!',
      } as ETAResponse);
    }

    // Get merchant's average prep time from materialized view
    const { data: prepTimeData } = await supabase
      .from('mv_prep_time_summary')
      .select('avg_prep_seconds, median_prep_seconds')
      .eq('merchant_id', order.merchant_id)
      .order('prep_date', { ascending: false })
      .limit(14);

    let baseAvgPrepTime = 300; // Default: 5 minutes
    if (prepTimeData && prepTimeData.length > 0) {
      const avgValues = prepTimeData
        .map((d) => d.median_prep_seconds || d.avg_prep_seconds)
        .filter(Boolean) as number[];
      if (avgValues.length > 0) {
        baseAvgPrepTime = Math.round(avgValues.reduce((a, b) => a + b, 0) / avgValues.length);
      }
    }

    // Calculate ETA for remaining items
    let maxEstimatedSeconds = 0;

    for (const item of items) {
      if (item.item_status === 'ready' || item.item_status === 'served') {
        continue;
      }

      let estimatedSeconds = baseAvgPrepTime;

      // If already preparing, subtract elapsed time
      if (item.item_status === 'preparing' && item.preparing_at) {
        const elapsedSeconds = Math.floor(
          (Date.now() - new Date(item.preparing_at).getTime()) / 1000
        );
        estimatedSeconds = Math.max(estimatedSeconds - elapsedSeconds, 30);
      }

      maxEstimatedSeconds = Math.max(maxEstimatedSeconds, estimatedSeconds);
    }

    // Add queue wait time if order is pending/confirmed
    if (order.status === 'pending' || order.status === 'confirmed') {
      const { count: queueSize } = await supabase
        .from('order_items')
        .select('id', { count: 'exact', head: true })
        .in('item_status', ['pending', 'preparing'])
        .neq('order_id', orderId);

      const queueAdjustment = Math.min((queueSize || 0) * 45, 600); // ~45s per item, max 10 min
      maxEstimatedSeconds += queueAdjustment;
    }

    // Determine confidence level based on historical data
    let confidence: 'high' | 'medium' | 'low' = 'low';
    const historyCount = prepTimeData?.length || 0;
    if (historyCount >= 14) {
      confidence = 'high';
    } else if (historyCount >= 7) {
      confidence = 'medium';
    }

    const etaMinutes = Math.ceil(maxEstimatedSeconds / 60);
    const variance = { high: 0.15, medium: 0.25, low: 0.4 };
    const v = variance[confidence];

    const etaRange = {
      min: Math.max(1, Math.round(etaMinutes * (1 - v))),
      max: Math.round(etaMinutes * (1 + v)),
    };

    const etaReadyAt = new Date(Date.now() + maxEstimatedSeconds * 1000).toISOString();

    // Format message
    let message: string;
    if (etaMinutes <= 2) {
      message = 'Quasi pronto!';
    } else if (etaMinutes < 60) {
      message = `~${etaMinutes} minuti`;
    } else {
      const hours = Math.floor(etaMinutes / 60);
      const mins = etaMinutes % 60;
      message = mins === 0 ? `~${hours}h` : `~${hours}h ${mins}m`;
    }

    return NextResponse.json({
      orderId,
      etaMinutes,
      etaRange,
      confidence,
      itemsRemaining,
      etaReadyAt,
      message,
    } as ETAResponse);
  } catch (error) {
    console.error('Error calculating ETA:', error);
    return NextResponse.json({ error: 'Failed to calculate ETA' }, { status: 500 });
  }
}
