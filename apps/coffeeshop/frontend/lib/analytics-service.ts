/**
 * Analytics Service
 * Tracks user events for the self-improvement cycle
 * Sends to Supabase with localStorage fallback
 */

import { supabase, isSupabaseConfigured } from './supabase';

// ============================================
// TYPES
// ============================================

export type EventCategory =
  | 'page_view'
  | 'interaction'
  | 'conversion'
  | 'engagement'
  | 'error'
  | 'performance';

export type EventType =
  // Page views
  | 'page_view'
  | 'menu_view'
  | 'item_view'
  | 'cart_view'
  | 'checkout_view'
  // Interactions
  | 'item_click'
  | 'category_click'
  | 'search'
  | 'filter_applied'
  | 'language_changed'
  | 'currency_changed'
  // Conversions
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'order_placed'
  | 'order_completed'
  // Engagement
  | 'review_submitted'
  | 'photo_shared'
  | 'social_follow'
  | 'feedback_given'
  // Errors
  | 'error_occurred'
  | 'api_error'
  // Performance
  | 'page_load_time'
  | 'api_response_time';

export interface AnalyticsEvent {
  event_type: EventType;
  event_category: EventCategory;
  event_data?: Record<string, unknown>;
  page_url?: string;
}

interface StoredEvent extends AnalyticsEvent {
  id: string;
  session_id: string;
  device_id: string;
  created_at: string;
}

// ============================================
// STORAGE KEYS
// ============================================

const SESSION_ID_KEY = 'gudbro-session-id';
const DEVICE_ID_KEY = 'gudbro-device-id';
const EVENTS_QUEUE_KEY = 'gudbro-analytics-queue';
const FLUSH_INTERVAL = 10000; // 10 seconds

// ============================================
// IDENTITY MANAGEMENT
// ============================================

/**
 * Get or create session ID (new per browser session)
 */
function getSessionId(): string {
  if (typeof window === 'undefined') return 'server';

  let sessionId = sessionStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    sessionStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
}

/**
 * Get or create device ID (persistent across sessions)
 */
function getDeviceId(): string {
  if (typeof window === 'undefined') return 'server';

  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    // Create fingerprint-based device ID
    const userAgent = navigator.userAgent || 'unknown';
    const language = navigator.language || 'unknown';
    const screenRes = `${screen.width}x${screen.height}`;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'unknown';

    const fingerprint = btoa(`${userAgent}-${language}-${screenRes}-${timezone}`).substring(0, 24);
    deviceId = `device_${fingerprint}_${Date.now()}`;
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

// ============================================
// EVENT QUEUE (for batching)
// ============================================

let eventQueue: StoredEvent[] = [];
let flushTimeout: ReturnType<typeof setTimeout> | null = null;

/**
 * Add event to queue
 */
function queueEvent(event: StoredEvent): void {
  eventQueue.push(event);

  // Persist to localStorage in case page closes
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem(EVENTS_QUEUE_KEY, JSON.stringify(eventQueue));
    } catch {
      // localStorage might be full, continue anyway
    }
  }

  // Schedule flush
  if (!flushTimeout) {
    flushTimeout = setTimeout(flushEvents, FLUSH_INTERVAL);
  }
}

/**
 * Flush events to Supabase
 */
async function flushEvents(): Promise<void> {
  if (eventQueue.length === 0) return;

  const eventsToSend = [...eventQueue];
  eventQueue = [];
  flushTimeout = null;

  // Clear localStorage queue
  if (typeof window !== 'undefined') {
    localStorage.removeItem(EVENTS_QUEUE_KEY);
  }

  if (!isSupabaseConfigured || !supabase) {
    // Store locally if Supabase not configured
    return;
  }

  try {
    const { error } = await supabase.from('analytics_events').insert(
      eventsToSend.map((e) => ({
        session_id: e.session_id,
        device_id: e.device_id,
        event_type: e.event_type,
        event_category: e.event_category,
        event_data: e.event_data || {},
        page_url: e.page_url,
        created_at: e.created_at,
      }))
    );

    if (error) {
      console.error('[Analytics] Failed to send events:', error);
      // Re-queue failed events
      eventQueue = [...eventsToSend, ...eventQueue];
    } else {
      // Silently ignore
    }
  } catch (err) {
    console.error('[Analytics] Error sending events:', err);
    // Re-queue failed events
    eventQueue = [...eventsToSend, ...eventQueue];
  }
}

// ============================================
// PUBLIC API
// ============================================

/**
 * Track an analytics event
 */
export function track(
  eventType: EventType,
  eventData?: Record<string, unknown>,
  category?: EventCategory
): void {
  if (typeof window === 'undefined') return;

  const event: StoredEvent = {
    id: `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
    session_id: getSessionId(),
    device_id: getDeviceId(),
    event_type: eventType,
    event_category: category || inferCategory(eventType),
    event_data: eventData,
    page_url: window.location.pathname,
    created_at: new Date().toISOString(),
  };

  queueEvent(event);
}

/**
 * Track page view (convenience method)
 */
export function trackPageView(pageName?: string): void {
  track(
    'page_view',
    {
      page_name: pageName || document.title,
      referrer: document.referrer,
    },
    'page_view'
  );
}

/**
 * Track item click
 */
export function trackItemClick(itemId: string, itemName: string, category?: string): void {
  track(
    'item_click',
    {
      item_id: itemId,
      item_name: itemName,
      category,
    },
    'interaction'
  );
}

/**
 * Track add to cart
 */
export function trackAddToCart(
  itemId: string,
  itemName: string,
  quantity: number,
  price: number,
  extras?: string[]
): void {
  track(
    'add_to_cart',
    {
      item_id: itemId,
      item_name: itemName,
      quantity,
      price,
      extras,
      total: price * quantity,
    },
    'conversion'
  );
}

/**
 * Track order placed
 */
export function trackOrderPlaced(
  orderId: string,
  orderCode: string,
  total: number,
  itemCount: number
): void {
  track(
    'order_placed',
    {
      order_id: orderId,
      order_code: orderCode,
      total,
      item_count: itemCount,
    },
    'conversion'
  );
}

/**
 * Track error
 */
export function trackError(
  errorType: string,
  errorMessage: string,
  context?: Record<string, unknown>
): void {
  track(
    'error_occurred',
    {
      error_type: errorType,
      error_message: errorMessage,
      ...context,
    },
    'error'
  );
}

/**
 * Track performance metric
 */
export function trackPerformance(
  metricName: string,
  durationMs: number,
  context?: Record<string, unknown>
): void {
  track(
    'page_load_time',
    {
      metric_name: metricName,
      duration_ms: durationMs,
      ...context,
    },
    'performance'
  );
}

// ============================================
// HELPERS
// ============================================

/**
 * Infer category from event type
 */
function inferCategory(eventType: EventType): EventCategory {
  if (eventType.includes('view')) return 'page_view';
  if (eventType.includes('cart') || eventType.includes('order')) return 'conversion';
  if (eventType.includes('review') || eventType.includes('share') || eventType.includes('follow'))
    return 'engagement';
  if (eventType.includes('error')) return 'error';
  if (eventType.includes('time') || eventType.includes('performance')) return 'performance';
  return 'interaction';
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize analytics (call once on app start)
 */
export function initAnalytics(): void {
  if (typeof window === 'undefined') return;

  // Load any queued events from localStorage
  try {
    const stored = localStorage.getItem(EVENTS_QUEUE_KEY);
    if (stored) {
      const storedEvents = JSON.parse(stored) as StoredEvent[];
      eventQueue = [...storedEvents, ...eventQueue];
      localStorage.removeItem(EVENTS_QUEUE_KEY);
    }
  } catch {
    // Ignore parse errors
  }

  // Flush on page unload
  window.addEventListener('beforeunload', () => {
    if (eventQueue.length > 0) {
      // Use sendBeacon for reliability
      if ('sendBeacon' in navigator && isSupabaseConfigured) {
        // Note: sendBeacon with Supabase would need a dedicated endpoint
        // For now, just flush synchronously
        flushEvents();
      }
    }
  });

  // Track initial page view
  trackPageView();

  // Track page load performance
  if (performance && performance.timing) {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    if (loadTime > 0) {
      trackPerformance('page_load', loadTime);
    }
  }
}

// ============================================
// ANALYTICS SERVICE OBJECT (for advanced use)
// ============================================

export const analyticsService = {
  track,
  trackPageView,
  trackItemClick,
  trackAddToCart,
  trackOrderPlaced,
  trackError,
  trackPerformance,
  init: initAnalytics,
  flush: flushEvents,
  getSessionId,
  getDeviceId,
};

export default analyticsService;
