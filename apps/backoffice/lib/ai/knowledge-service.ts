// AI Knowledge Service
// Fetches merchant data for AI context (Phase 2)

import { supabase } from '@/lib/supabase';
import { getUpcomingHolidaysContext, UpcomingHolidaysContext } from './holidays-service';

export interface MerchantKnowledge {
  menu: MenuKnowledge | null;
  analytics: AnalyticsKnowledge | null;
  events: EventsKnowledge | null;
  feedback: FeedbackKnowledge | null;
  inventory: InventoryKnowledge | null;
  holidays: UpcomingHolidaysContext | null;
  lastUpdated: string;
}

export interface MenuKnowledge {
  totalItems: number;
  categories: CategorySummary[];
  topItems: MenuItem[];
  recentChanges: string[];
}

interface CategorySummary {
  name: string;
  itemCount: number;
  priceRange: { min: number; max: number };
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
}

export interface AnalyticsKnowledge {
  periodDays: number;
  totalViews: number;
  totalOrders: number;
  topItems: TopItem[];
  peakHours: string[];
  trends: TrendItem[];
}

interface TopItem {
  name: string;
  views: number;
  orders: number;
}

interface TrendItem {
  metric: string;
  change: number; // percentage
  direction: 'up' | 'down' | 'stable';
}

export interface EventsKnowledge {
  upcoming: EventSummary[];
  recent: EventSummary[];
  totalThisMonth: number;
}

interface EventSummary {
  id: string;
  title: string;
  date: string;
  type: string;
}

export interface FeedbackKnowledge {
  averageRating: number;
  totalReviews: number;
  recentFeedback: FeedbackItem[];
  sentimentSummary: {
    positive: number;
    neutral: number;
    negative: number;
  };
}

interface FeedbackItem {
  rating: number;
  comment: string;
  date: string;
}

export interface InventoryKnowledge {
  totalItems: number;
  lowStockItems: InventoryItem[];
  categories: { name: string; itemCount: number }[];
  suppliers: { name: string; categories: string[] }[];
  pendingOrders: number;
}

interface InventoryItem {
  id: string;
  name: string;
  currentStock: number;
  minStock: number;
  unit: string;
  daysUntilEmpty?: number;
}

// Fetch menu data for AI context
async function fetchMenuKnowledge(
  merchantId: string,
  locationId?: string
): Promise<MenuKnowledge | null> {
  try {
    // Try to get menu items from menu_items table (if exists)
    // Fallback to product_taxonomy for coffeeshop
    const { data: menuItems, error } = await supabase
      .from('menu_items')
      .select('id, name, price, category, is_active')
      .eq('merchant_id', merchantId)
      .eq('is_active', true)
      .limit(100);

    if (error || !menuItems || menuItems.length === 0) {
      // Try product_taxonomy as fallback (for coffeeshop)
      const { data: products } = await supabase
        .from('product_taxonomy')
        .select('id, name, base_price, product_type, category')
        .limit(50);

      if (!products || products.length === 0) {
        return null;
      }

      // Group by category
      const categoryMap = new Map<string, MenuItem[]>();
      products.forEach((p) => {
        const cat = p.category || p.product_type || 'Other';
        if (!categoryMap.has(cat)) categoryMap.set(cat, []);
        categoryMap.get(cat)!.push({
          id: p.id,
          name: p.name,
          price: p.base_price || 0,
          category: cat,
        });
      });

      const categories: CategorySummary[] = Array.from(categoryMap.entries()).map(
        ([name, items]) => ({
          name,
          itemCount: items.length,
          priceRange: {
            min: Math.min(...items.map((i) => i.price)),
            max: Math.max(...items.map((i) => i.price)),
          },
        })
      );

      return {
        totalItems: products.length,
        categories,
        topItems: products.slice(0, 10).map((p) => ({
          id: p.id,
          name: p.name,
          price: p.base_price || 0,
          category: p.category || p.product_type || 'Other',
        })),
        recentChanges: [],
      };
    }

    // Process menu_items data
    const categoryMap = new Map<string, MenuItem[]>();
    menuItems.forEach((item) => {
      const cat = item.category || 'Other';
      if (!categoryMap.has(cat)) categoryMap.set(cat, []);
      categoryMap.get(cat)!.push({
        id: item.id,
        name: item.name,
        price: item.price || 0,
        category: cat,
      });
    });

    const categories: CategorySummary[] = Array.from(categoryMap.entries()).map(
      ([name, items]) => ({
        name,
        itemCount: items.length,
        priceRange: {
          min: Math.min(...items.map((i) => i.price)),
          max: Math.max(...items.map((i) => i.price)),
        },
      })
    );

    return {
      totalItems: menuItems.length,
      categories,
      topItems: menuItems.slice(0, 10).map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price || 0,
        category: item.category || 'Other',
      })),
      recentChanges: [],
    };
  } catch (error) {
    console.error('Error fetching menu knowledge:', error);
    return null;
  }
}

// Fetch analytics data for AI context
async function fetchAnalyticsKnowledge(
  merchantId: string,
  locationId?: string,
  periodDays: number = 30
): Promise<AnalyticsKnowledge | null> {
  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - periodDays);

    // Get analytics aggregates
    const { data: aggregates } = await supabase
      .from('analytics_daily_aggregates')
      .select('*')
      .eq('location_id', locationId || merchantId)
      .gte('date', startDate.toISOString().split('T')[0])
      .order('date', { ascending: false });

    if (!aggregates || aggregates.length === 0) {
      return {
        periodDays,
        totalViews: 0,
        totalOrders: 0,
        topItems: [],
        peakHours: [],
        trends: [],
      };
    }

    const totalViews = aggregates.reduce((sum, a) => sum + (a.page_views || 0), 0);
    const totalOrders = aggregates.reduce((sum, a) => sum + (a.orders || 0), 0);

    // Get top items
    const { data: topItemsData } = await supabase.rpc('get_top_items', {
      p_location_id: locationId || merchantId,
      p_start_date: startDate.toISOString(),
      p_end_date: new Date().toISOString(),
      p_limit: 5,
    });

    const topItems: TopItem[] = (topItemsData || []).map((item: any) => ({
      name: item.item_name || item.name || 'Unknown',
      views: item.views || 0,
      orders: item.orders || 0,
    }));

    // Calculate trends (compare first half vs second half of period)
    const midpoint = Math.floor(aggregates.length / 2);
    const recentHalf = aggregates.slice(0, midpoint);
    const olderHalf = aggregates.slice(midpoint);

    const recentViews = recentHalf.reduce((sum, a) => sum + (a.page_views || 0), 0);
    const olderViews = olderHalf.reduce((sum, a) => sum + (a.page_views || 0), 0);

    const viewsChange = olderViews > 0 ? ((recentViews - olderViews) / olderViews) * 100 : 0;

    const trends: TrendItem[] = [
      {
        metric: 'Page Views',
        change: Math.round(viewsChange),
        direction: viewsChange > 5 ? 'up' : viewsChange < -5 ? 'down' : 'stable',
      },
    ];

    return {
      periodDays,
      totalViews,
      totalOrders,
      topItems,
      peakHours: ['12:00-14:00', '18:00-21:00'], // Could be calculated from hourly data
      trends,
    };
  } catch (error) {
    console.error('Error fetching analytics knowledge:', error);
    return null;
  }
}

// Fetch events data for AI context
async function fetchEventsKnowledge(
  merchantId: string,
  locationId?: string
): Promise<EventsKnowledge | null> {
  try {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

    // Get upcoming events
    const { data: upcoming } = await supabase
      .from('events')
      .select('id, title, start_date, event_type')
      .eq('merchant_id', merchantId)
      .gte('start_date', now.toISOString())
      .order('start_date', { ascending: true })
      .limit(5);

    // Get recent past events
    const { data: recent } = await supabase
      .from('events')
      .select('id, title, start_date, event_type')
      .eq('merchant_id', merchantId)
      .lt('start_date', now.toISOString())
      .order('start_date', { ascending: false })
      .limit(3);

    // Count events this month
    const { count: totalThisMonth } = await supabase
      .from('events')
      .select('id', { count: 'exact', head: true })
      .eq('merchant_id', merchantId)
      .gte('start_date', monthStart.toISOString());

    return {
      upcoming: (upcoming || []).map((e) => ({
        id: e.id,
        title: e.title,
        date: e.start_date,
        type: e.event_type || 'general',
      })),
      recent: (recent || []).map((e) => ({
        id: e.id,
        title: e.title,
        date: e.start_date,
        type: e.event_type || 'general',
      })),
      totalThisMonth: totalThisMonth || 0,
    };
  } catch (error) {
    console.error('Error fetching events knowledge:', error);
    return null;
  }
}

// Fetch feedback data for AI context
async function fetchFeedbackKnowledge(
  merchantId: string,
  locationId?: string
): Promise<FeedbackKnowledge | null> {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get recent feedback
    const { data: feedback } = await supabase
      .from('customer_feedback')
      .select('rating, comment, created_at')
      .eq('merchant_id', merchantId)
      .gte('created_at', thirtyDaysAgo.toISOString())
      .order('created_at', { ascending: false })
      .limit(10);

    if (!feedback || feedback.length === 0) {
      return {
        averageRating: 0,
        totalReviews: 0,
        recentFeedback: [],
        sentimentSummary: { positive: 0, neutral: 0, negative: 0 },
      };
    }

    const ratings = feedback.map((f) => f.rating || 0).filter((r) => r > 0);
    const averageRating =
      ratings.length > 0 ? ratings.reduce((a, b) => a + b, 0) / ratings.length : 0;

    // Sentiment based on rating
    const positive = feedback.filter((f) => (f.rating || 0) >= 4).length;
    const negative = feedback.filter((f) => (f.rating || 0) <= 2).length;
    const neutral = feedback.length - positive - negative;

    return {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: feedback.length,
      recentFeedback: feedback.slice(0, 5).map((f) => ({
        rating: f.rating || 0,
        comment: f.comment || '',
        date: f.created_at,
      })),
      sentimentSummary: { positive, neutral, negative },
    };
  } catch (error) {
    console.error('Error fetching feedback knowledge:', error);
    return null;
  }
}

// Fetch inventory data for AI context
async function fetchInventoryKnowledge(merchantId: string): Promise<InventoryKnowledge | null> {
  try {
    // Get inventory items
    const { data: items } = await supabase
      .from('ai_inventory_items')
      .select('id, name, category, unit, current_stock, min_stock, max_stock, avg_daily_usage')
      .eq('merchant_id', merchantId)
      .order('name');

    if (!items || items.length === 0) {
      return null;
    }

    // Find low stock items (current_stock <= min_stock * 1.2)
    const lowStockItems: InventoryItem[] = items
      .filter((item) => item.current_stock <= item.min_stock * 1.2)
      .map((item) => ({
        id: item.id,
        name: item.name,
        currentStock: Number(item.current_stock),
        minStock: Number(item.min_stock),
        unit: item.unit,
        daysUntilEmpty:
          item.avg_daily_usage > 0
            ? Math.floor(Number(item.current_stock) / Number(item.avg_daily_usage))
            : undefined,
      }));

    // Group by category
    const categoryMap = new Map<string, number>();
    items.forEach((item) => {
      const cat = item.category || 'Other';
      categoryMap.set(cat, (categoryMap.get(cat) || 0) + 1);
    });
    const categories = Array.from(categoryMap.entries()).map(([name, itemCount]) => ({
      name,
      itemCount,
    }));

    // Get suppliers
    const { data: suppliers } = await supabase
      .from('ai_suppliers')
      .select('name, categories')
      .eq('merchant_id', merchantId)
      .eq('is_active', true);

    // Count pending orders
    const { count: pendingOrders } = await supabase
      .from('ai_purchase_orders')
      .select('id', { count: 'exact', head: true })
      .eq('merchant_id', merchantId)
      .in('status', ['draft', 'sent', 'confirmed']);

    return {
      totalItems: items.length,
      lowStockItems,
      categories,
      suppliers: (suppliers || []).map((s) => ({
        name: s.name,
        categories: s.categories || [],
      })),
      pendingOrders: pendingOrders || 0,
    };
  } catch (error) {
    console.error('Error fetching inventory knowledge:', error);
    return null;
  }
}

// Main function to fetch all knowledge for a merchant
export async function fetchMerchantKnowledge(
  merchantId: string,
  locationId?: string,
  options: {
    includeMenu?: boolean;
    includeAnalytics?: boolean;
    includeEvents?: boolean;
    includeFeedback?: boolean;
    includeInventory?: boolean;
    includeHolidays?: boolean;
    analyticsPeriodDays?: number;
    countryCode?: string;
    regionCode?: string;
    city?: string;
  } = {}
): Promise<MerchantKnowledge> {
  const {
    includeMenu = true,
    includeAnalytics = true,
    includeEvents = true,
    includeFeedback = true,
    includeInventory = true,
    includeHolidays = true,
    analyticsPeriodDays = 30,
    countryCode = 'VN',
    regionCode,
    city,
  } = options;

  const [menu, analytics, events, feedback, inventory, holidays] = await Promise.all([
    includeMenu ? fetchMenuKnowledge(merchantId, locationId) : null,
    includeAnalytics ? fetchAnalyticsKnowledge(merchantId, locationId, analyticsPeriodDays) : null,
    includeEvents ? fetchEventsKnowledge(merchantId, locationId) : null,
    includeFeedback ? fetchFeedbackKnowledge(merchantId, locationId) : null,
    includeInventory ? fetchInventoryKnowledge(merchantId) : null,
    includeHolidays
      ? getUpcomingHolidaysContext(countryCode, { regionCode, city, merchantId }).catch(() => null)
      : null,
  ]);

  return {
    menu,
    analytics,
    events,
    feedback,
    inventory,
    holidays,
    lastUpdated: new Date().toISOString(),
  };
}

// Format knowledge into a string for AI context
export function formatKnowledgeForAI(knowledge: MerchantKnowledge): string {
  const sections: string[] = [];

  if (knowledge.menu) {
    const menu = knowledge.menu;
    sections.push(`
## Menu Data
- Total items: ${menu.totalItems}
- Categories: ${menu.categories.map((c) => `${c.name} (${c.itemCount} items, $${c.priceRange.min}-$${c.priceRange.max})`).join(', ')}
- Top items: ${menu.topItems.map((i) => `${i.name} ($${i.price})`).join(', ')}
`);
  }

  if (knowledge.analytics) {
    const analytics = knowledge.analytics;
    sections.push(`
## Analytics (Last ${analytics.periodDays} days)
- Total page views: ${analytics.totalViews}
- Total orders: ${analytics.totalOrders}
- Top performing items: ${analytics.topItems.map((i) => `${i.name} (${i.views} views, ${i.orders} orders)`).join(', ') || 'No data yet'}
- Peak hours: ${analytics.peakHours.join(', ')}
- Trends: ${analytics.trends.map((t) => `${t.metric}: ${t.direction === 'up' ? '↑' : t.direction === 'down' ? '↓' : '→'} ${t.change}%`).join(', ')}
`);
  }

  if (knowledge.events) {
    const events = knowledge.events;
    sections.push(`
## Events
- Events this month: ${events.totalThisMonth}
- Upcoming: ${events.upcoming.length > 0 ? events.upcoming.map((e) => `${e.title} (${new Date(e.date).toLocaleDateString()})`).join(', ') : 'None scheduled'}
- Recent: ${events.recent.length > 0 ? events.recent.map((e) => `${e.title} (${new Date(e.date).toLocaleDateString()})`).join(', ') : 'None'}
`);
  }

  if (knowledge.feedback) {
    const feedback = knowledge.feedback;
    sections.push(`
## Customer Feedback (Last 30 days)
- Average rating: ${feedback.averageRating}/5 (${feedback.totalReviews} reviews)
- Sentiment: ${feedback.sentimentSummary.positive} positive, ${feedback.sentimentSummary.neutral} neutral, ${feedback.sentimentSummary.negative} negative
- Recent feedback:
${
  feedback.recentFeedback
    .slice(0, 3)
    .map(
      (f) => `  - ${f.rating}/5: "${f.comment.slice(0, 100)}${f.comment.length > 100 ? '...' : ''}"`
    )
    .join('\n') || '  No recent feedback'
}
`);
  }

  if (knowledge.inventory) {
    const inv = knowledge.inventory;
    sections.push(`
## Inventory Status
- Total items tracked: ${inv.totalItems}
- Categories: ${inv.categories.map((c) => `${c.name} (${c.itemCount})`).join(', ')}
- Suppliers: ${inv.suppliers.map((s) => s.name).join(', ') || 'None configured'}
- Pending orders: ${inv.pendingOrders}
${
  inv.lowStockItems.length > 0
    ? `- ⚠️ LOW STOCK ALERTS:
${inv.lowStockItems.map((item) => `  - ${item.name}: ${item.currentStock} ${item.unit} (min: ${item.minStock})${item.daysUntilEmpty ? ` - ~${item.daysUntilEmpty} days left` : ''}`).join('\n')}`
    : '- All items well stocked'
}
`);
  }

  if (knowledge.holidays) {
    const h = knowledge.holidays;
    sections.push(`
## Upcoming Holidays & Events
${h.aiContext}
${
  h.criticalAlerts.length > 0
    ? `- ⚠️ CRITICAL DATES:
${h.criticalAlerts.map((alert) => `  - ${alert.nameEn || alert.name} on ${alert.date} (${alert.impactLevel} impact)`).join('\n')}`
    : ''
}
${
  h.upcomingWeek.length > 0
    ? `- This Week:
${h.upcomingWeek.map((holiday) => `  - ${holiday.nameEn || holiday.name} (${new Date(holiday.date).toLocaleDateString()}) - ${holiday.impactLevel} impact`).join('\n')}`
    : ''
}
`);
  }

  if (sections.length === 0) {
    return '\n## Business Data\nNo data available yet. The merchant is just getting started!\n';
  }

  return '\n# Current Business Data\n' + sections.join('\n');
}
