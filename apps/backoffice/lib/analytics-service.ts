/**
 * Analytics Service for Backoffice
 *
 * Fetches analytics data from Supabase for dashboard visualization
 */

import { createClient } from './supabase-browser';

// Types
export interface EventCount {
  eventDate: string;
  eventName: string;
  eventCount: number;
  uniqueUsers: number;
}

export interface DailyMetrics {
  date: string;
  pageViews: number;
  uniqueVisitors: number;
  sessions: number;
  avgSessionDuration: number;
}

export interface TopItem {
  itemId: string;
  itemName: string;
  viewCount: number;
  addToCartCount: number;
  conversionRate: number;
}

export interface PopularPage {
  pagePath: string;
  viewCount: number;
  uniqueVisitors: number;
}

export interface DeviceBreakdown {
  deviceType: string;
  eventCount: number;
  percentage: number;
}

export interface HourlyBreakdown {
  hour: number;
  eventCount: number;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  totalUniqueVisitors: number;
  totalSessions: number;
  avgSessionDuration: number;
  totalItemViews: number;
  totalAddToCarts: number;
  conversionRate: number;
  // Comparisons with previous period
  pageViewsChange: number;
  visitorsChange: number;
  sessionsChange: number;
}

// ============================================================================
// ANALYTICS DATA FUNCTIONS
// ============================================================================

/**
 * Get event counts for a date range
 */
export async function getEventCounts(
  startDate: string,
  endDate: string,
  eventName?: string,
  eventCategory?: string,
  merchantId?: string
): Promise<EventCount[]> {
  const supabase = createClient();

  const { data, error } = await supabase.rpc('get_event_counts', {
    p_start_date: startDate,
    p_end_date: endDate,
    p_event_name: eventName || null,
    p_event_category: eventCategory || null,
    p_merchant_id: merchantId || null,
  });

  if (error) {
    console.error('[Analytics] Get event counts error:', error);
    return [];
  }

  return (data || []).map((row: Record<string, unknown>) => ({
    eventDate: row.event_date as string,
    eventName: row.event_name as string,
    eventCount: row.event_count as number,
    uniqueUsers: row.unique_users as number,
  }));
}

/**
 * Get daily metrics for a date range
 */
export async function getDailyMetrics(
  startDate: string,
  endDate: string,
  merchantId?: string
): Promise<DailyMetrics[]> {
  const supabase = createClient();

  // Query analytics_events directly for daily aggregation
  const { data, error } = await supabase
    .from('analytics_events')
    .select('event_date, event_name, anonymous_id, session_id')
    .gte('event_date', startDate)
    .lte('event_date', endDate)
    .order('event_date', { ascending: true });

  if (error) {
    console.error('[Analytics] Get daily metrics error:', error);
    return [];
  }

  // Aggregate by date
  const dailyMap = new Map<
    string,
    {
      pageViews: number;
      visitors: Set<string>;
      sessions: Set<string>;
    }
  >();

  for (const event of data || []) {
    const date = event.event_date;
    if (!dailyMap.has(date)) {
      dailyMap.set(date, {
        pageViews: 0,
        visitors: new Set(),
        sessions: new Set(),
      });
    }

    const dayData = dailyMap.get(date)!;
    if (event.event_name === 'page_view') {
      dayData.pageViews++;
    }
    if (event.anonymous_id) {
      dayData.visitors.add(event.anonymous_id);
    }
    if (event.session_id) {
      dayData.sessions.add(event.session_id);
    }
  }

  return Array.from(dailyMap.entries()).map(([date, data]) => ({
    date,
    pageViews: data.pageViews,
    uniqueVisitors: data.visitors.size,
    sessions: data.sessions.size,
    avgSessionDuration: 0, // Would need session duration tracking
  }));
}

/**
 * Get top items by views
 */
export async function getTopItems(
  startDate: string,
  endDate: string,
  limit: number = 10,
  merchantId?: string
): Promise<TopItem[]> {
  const supabase = createClient();

  // Get item_view and add_to_cart events
  const { data, error } = await supabase
    .from('analytics_events')
    .select('event_name, properties')
    .in('event_name', ['item_view', 'add_to_cart'])
    .gte('event_date', startDate)
    .lte('event_date', endDate);

  if (error) {
    console.error('[Analytics] Get top items error:', error);
    return [];
  }

  // Aggregate by item
  const itemMap = new Map<
    string,
    {
      name: string;
      views: number;
      addToCarts: number;
    }
  >();

  for (const event of data || []) {
    const props = event.properties as Record<string, unknown> | null;
    if (!props) continue;

    const itemId = (props.item_id as string) || '';
    const itemName = (props.item_name as string) || itemId;

    if (!itemId) continue;

    if (!itemMap.has(itemId)) {
      itemMap.set(itemId, { name: itemName, views: 0, addToCarts: 0 });
    }

    const item = itemMap.get(itemId)!;
    if (event.event_name === 'item_view') {
      item.views++;
    } else if (event.event_name === 'add_to_cart') {
      item.addToCarts++;
    }
  }

  // Sort by views and limit
  return Array.from(itemMap.entries())
    .map(([id, data]) => ({
      itemId: id,
      itemName: data.name,
      viewCount: data.views,
      addToCartCount: data.addToCarts,
      conversionRate: data.views > 0 ? (data.addToCarts / data.views) * 100 : 0,
    }))
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
}

/**
 * Get popular pages
 */
export async function getPopularPages(
  startDate: string,
  endDate: string,
  limit: number = 10,
  merchantId?: string
): Promise<PopularPage[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('analytics_events')
    .select('page_path, anonymous_id')
    .eq('event_name', 'page_view')
    .gte('event_date', startDate)
    .lte('event_date', endDate);

  if (error) {
    console.error('[Analytics] Get popular pages error:', error);
    return [];
  }

  // Aggregate by page
  const pageMap = new Map<
    string,
    {
      viewCount: number;
      visitors: Set<string>;
    }
  >();

  for (const event of data || []) {
    const path = event.page_path || '/';

    if (!pageMap.has(path)) {
      pageMap.set(path, { viewCount: 0, visitors: new Set() });
    }

    const page = pageMap.get(path)!;
    page.viewCount++;
    if (event.anonymous_id) {
      page.visitors.add(event.anonymous_id);
    }
  }

  return Array.from(pageMap.entries())
    .map(([path, data]) => ({
      pagePath: path,
      viewCount: data.viewCount,
      uniqueVisitors: data.visitors.size,
    }))
    .sort((a, b) => b.viewCount - a.viewCount)
    .slice(0, limit);
}

/**
 * Get device breakdown
 */
export async function getDeviceBreakdown(
  startDate: string,
  endDate: string,
  merchantId?: string
): Promise<DeviceBreakdown[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('analytics_events')
    .select('device_type')
    .gte('event_date', startDate)
    .lte('event_date', endDate);

  if (error) {
    console.error('[Analytics] Get device breakdown error:', error);
    return [];
  }

  // Count by device type
  const deviceMap = new Map<string, number>();
  let total = 0;

  for (const event of data || []) {
    const device = event.device_type || 'unknown';
    deviceMap.set(device, (deviceMap.get(device) || 0) + 1);
    total++;
  }

  return Array.from(deviceMap.entries())
    .map(([device, count]) => ({
      deviceType: device,
      eventCount: count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }))
    .sort((a, b) => b.eventCount - a.eventCount);
}

/**
 * Get hourly breakdown
 */
export async function getHourlyBreakdown(
  startDate: string,
  endDate: string,
  merchantId?: string
): Promise<HourlyBreakdown[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('analytics_events')
    .select('created_at')
    .gte('event_date', startDate)
    .lte('event_date', endDate);

  if (error) {
    console.error('[Analytics] Get hourly breakdown error:', error);
    return [];
  }

  // Initialize all hours
  const hourlyMap = new Map<number, number>();
  for (let i = 0; i < 24; i++) {
    hourlyMap.set(i, 0);
  }

  for (const event of data || []) {
    if (event.created_at) {
      const hour = new Date(event.created_at).getHours();
      hourlyMap.set(hour, (hourlyMap.get(hour) || 0) + 1);
    }
  }

  return Array.from(hourlyMap.entries())
    .map(([hour, count]) => ({
      hour,
      eventCount: count,
    }))
    .sort((a, b) => a.hour - b.hour);
}

/**
 * Get analytics summary with comparison to previous period
 */
export async function getAnalyticsSummary(
  startDate: string,
  endDate: string,
  merchantId?: string
): Promise<AnalyticsSummary> {
  const supabase = createClient();

  // Calculate previous period
  const start = new Date(startDate);
  const end = new Date(endDate);
  const daysDiff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

  const prevEnd = new Date(start);
  prevEnd.setDate(prevEnd.getDate() - 1);
  const prevStart = new Date(prevEnd);
  prevStart.setDate(prevStart.getDate() - daysDiff);

  // Get current period data
  const { data: currentData, error: currentError } = await supabase
    .from('analytics_events')
    .select('event_name, anonymous_id, session_id, properties')
    .gte('event_date', startDate)
    .lte('event_date', endDate);

  if (currentError) {
    console.error('[Analytics] Get summary error:', currentError);
    return getEmptySummary();
  }

  // Get previous period data
  const { data: prevData, error: prevError } = await supabase
    .from('analytics_events')
    .select('event_name, anonymous_id, session_id')
    .gte('event_date', prevStart.toISOString().split('T')[0])
    .lte('event_date', prevEnd.toISOString().split('T')[0]);

  if (prevError) {
    console.error('[Analytics] Get prev summary error:', prevError);
  }

  // Calculate current metrics
  const currentMetrics = calculateMetrics(currentData || []);
  const prevMetrics = calculateMetrics(prevData || []);

  return {
    ...currentMetrics,
    pageViewsChange: calculateChange(currentMetrics.totalPageViews, prevMetrics.totalPageViews),
    visitorsChange: calculateChange(
      currentMetrics.totalUniqueVisitors,
      prevMetrics.totalUniqueVisitors
    ),
    sessionsChange: calculateChange(currentMetrics.totalSessions, prevMetrics.totalSessions),
  };
}

// Helper function to calculate metrics from event data
function calculateMetrics(
  events: Array<{
    event_name: string;
    anonymous_id?: string | null;
    session_id?: string | null;
    properties?: Record<string, unknown> | null;
  }>
): Omit<AnalyticsSummary, 'pageViewsChange' | 'visitorsChange' | 'sessionsChange'> {
  const visitors = new Set<string>();
  const sessions = new Set<string>();
  let pageViews = 0;
  let itemViews = 0;
  let addToCarts = 0;

  for (const event of events) {
    if (event.anonymous_id) visitors.add(event.anonymous_id);
    if (event.session_id) sessions.add(event.session_id);

    switch (event.event_name) {
      case 'page_view':
        pageViews++;
        break;
      case 'item_view':
        itemViews++;
        break;
      case 'add_to_cart':
        addToCarts++;
        break;
    }
  }

  return {
    totalPageViews: pageViews,
    totalUniqueVisitors: visitors.size,
    totalSessions: sessions.size,
    avgSessionDuration: 0,
    totalItemViews: itemViews,
    totalAddToCarts: addToCarts,
    conversionRate: itemViews > 0 ? (addToCarts / itemViews) * 100 : 0,
  };
}

// Helper to calculate percentage change
function calculateChange(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

// Helper to return empty summary
function getEmptySummary(): AnalyticsSummary {
  return {
    totalPageViews: 0,
    totalUniqueVisitors: 0,
    totalSessions: 0,
    avgSessionDuration: 0,
    totalItemViews: 0,
    totalAddToCarts: 0,
    conversionRate: 0,
    pageViewsChange: 0,
    visitorsChange: 0,
    sessionsChange: 0,
  };
}

/**
 * Get date range for time period
 */
export function getDateRange(period: '7d' | '30d' | '90d' | '1y'): {
  startDate: string;
  endDate: string;
} {
  const end = new Date();
  const start = new Date();

  switch (period) {
    case '7d':
      start.setDate(start.getDate() - 7);
      break;
    case '30d':
      start.setDate(start.getDate() - 30);
      break;
    case '90d':
      start.setDate(start.getDate() - 90);
      break;
    case '1y':
      start.setFullYear(start.getFullYear() - 1);
      break;
  }

  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  };
}
