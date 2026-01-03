/**
 * Analytics Service
 *
 * Tracks user behavior and provides analytics data
 */

import { supabase, isSupabaseConfigured } from './supabase';

// Types
export interface TrackEventParams {
  eventName: string;
  eventCategory: string;
  accountId?: string;
  anonymousId?: string;
  sessionId?: string;
  pagePath?: string;
  properties?: Record<string, unknown>;
  deviceType?: 'desktop' | 'mobile' | 'tablet';
  platform?: 'web' | 'ios' | 'android' | 'pwa';
  merchantId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  clientTimestamp?: string;
}

export interface EventCount {
  eventDate: string;
  eventName: string;
  eventCount: number;
  uniqueUsers: number;
}

export interface UserActivity {
  eventDate: string;
  eventCount: number;
  pageViews: number;
  sessions: number;
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

export interface UTMPerformance {
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  eventCount: number;
  uniqueUsers: number;
}

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

let sessionId: string | null = null;
let anonymousId: string | null = null;

/**
 * Get or create session ID
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  if (!sessionId) {
    sessionId = sessionStorage.getItem('gudbro_session_id');
    if (!sessionId) {
      sessionId = generateId();
      sessionStorage.setItem('gudbro_session_id', sessionId);
    }
  }
  return sessionId;
}

/**
 * Get or create anonymous ID (persists across sessions)
 */
export function getAnonymousId(): string {
  if (typeof window === 'undefined') return '';

  if (!anonymousId) {
    anonymousId = localStorage.getItem('gudbro_anonymous_id');
    if (!anonymousId) {
      anonymousId = generateId();
      localStorage.setItem('gudbro_anonymous_id', anonymousId);
    }
  }
  return anonymousId;
}

/**
 * Generate a unique ID
 */
function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Get device type from user agent
 */
export function getDeviceType(): 'desktop' | 'mobile' | 'tablet' {
  if (typeof window === 'undefined') return 'desktop';

  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet';
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile';
  }
  return 'desktop';
}

/**
 * Get UTM parameters from URL
 */
export function getUTMParams(): {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
} {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') || undefined,
    utmMedium: params.get('utm_medium') || undefined,
    utmCampaign: params.get('utm_campaign') || undefined,
    utmTerm: params.get('utm_term') || undefined,
    utmContent: params.get('utm_content') || undefined,
  };
}

// ============================================================================
// TRACKING FUNCTIONS
// ============================================================================

/**
 * Track a custom event
 */
export async function trackEvent(params: TrackEventParams): Promise<string | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  try {
    const { data, error } = await supabase.rpc('track_event', {
      p_event_name: params.eventName,
      p_event_category: params.eventCategory,
      p_account_id: params.accountId || null,
      p_anonymous_id: params.anonymousId || getAnonymousId(),
      p_session_id: params.sessionId || getSessionId(),
      p_page_path: params.pagePath || (typeof window !== 'undefined' ? window.location.pathname : null),
      p_properties: params.properties || {},
      p_device_type: params.deviceType || getDeviceType(),
      p_platform: params.platform || 'web',
      p_merchant_id: params.merchantId || null,
      p_utm_source: params.utmSource || null,
      p_utm_medium: params.utmMedium || null,
      p_utm_campaign: params.utmCampaign || null,
      p_client_timestamp: params.clientTimestamp || new Date().toISOString(),
    });

    if (error) {
      console.error('[Analytics] Track event error:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('[Analytics] Track event error:', err);
    return null;
  }
}

/**
 * Track page view
 */
export async function trackPageView(
  pagePath?: string,
  pageTitle?: string,
  accountId?: string,
  merchantId?: string
): Promise<string | null> {
  const utm = getUTMParams();

  return trackEvent({
    eventName: 'page_view',
    eventCategory: 'navigation',
    accountId,
    pagePath: pagePath || (typeof window !== 'undefined' ? window.location.pathname : undefined),
    properties: {
      page_title: pageTitle || (typeof document !== 'undefined' ? document.title : undefined),
      referrer: typeof document !== 'undefined' ? document.referrer : undefined,
    },
    merchantId,
    ...utm,
  });
}

/**
 * Track button click
 */
export async function trackClick(
  buttonName: string,
  properties?: Record<string, unknown>,
  accountId?: string
): Promise<string | null> {
  return trackEvent({
    eventName: 'button_click',
    eventCategory: 'engagement',
    accountId,
    properties: {
      button_name: buttonName,
      ...properties,
    },
  });
}

/**
 * Track search
 */
export async function trackSearch(
  query: string,
  resultsCount: number,
  accountId?: string,
  merchantId?: string
): Promise<string | null> {
  return trackEvent({
    eventName: 'search',
    eventCategory: 'engagement',
    accountId,
    merchantId,
    properties: {
      query,
      results_count: resultsCount,
    },
  });
}

/**
 * Track product view
 */
export async function trackProductView(
  productId: string,
  productName: string,
  price?: number,
  accountId?: string,
  merchantId?: string
): Promise<string | null> {
  return trackEvent({
    eventName: 'product_view',
    eventCategory: 'engagement',
    accountId,
    merchantId,
    properties: {
      product_id: productId,
      product_name: productName,
      price,
    },
  });
}

/**
 * Track add to cart
 */
export async function trackAddToCart(
  productId: string,
  productName: string,
  quantity: number,
  price: number,
  accountId?: string,
  merchantId?: string
): Promise<string | null> {
  return trackEvent({
    eventName: 'add_to_cart',
    eventCategory: 'conversion',
    accountId,
    merchantId,
    properties: {
      product_id: productId,
      product_name: productName,
      quantity,
      price,
      total: price * quantity,
    },
  });
}

/**
 * Track signup
 */
export async function trackSignup(
  method: string,
  accountId: string,
  referralCode?: string
): Promise<string | null> {
  return trackEvent({
    eventName: 'signup',
    eventCategory: 'conversion',
    accountId,
    properties: {
      method,
      referral_code: referralCode,
    },
  });
}

/**
 * Track login
 */
export async function trackLogin(
  method: string,
  accountId: string
): Promise<string | null> {
  return trackEvent({
    eventName: 'login',
    eventCategory: 'engagement',
    accountId,
    properties: {
      method,
    },
  });
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
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

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

  return (data || []).map((row: any) => ({
    eventDate: row.event_date,
    eventName: row.event_name,
    eventCount: row.event_count,
    uniqueUsers: row.unique_users,
  }));
}

/**
 * Get user activity summary
 */
export async function getUserActivity(
  accountId: string,
  days: number = 30
): Promise<UserActivity[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc('get_user_activity', {
    p_account_id: accountId,
    p_days: days,
  });

  if (error) {
    console.error('[Analytics] Get user activity error:', error);
    return [];
  }

  return (data || []).map((row: any) => ({
    eventDate: row.event_date,
    eventCount: row.event_count,
    pageViews: row.page_views,
    sessions: row.sessions,
  }));
}

/**
 * Get popular pages
 */
export async function getPopularPages(
  merchantId?: string,
  days: number = 7,
  limit: number = 10
): Promise<PopularPage[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc('get_popular_pages', {
    p_merchant_id: merchantId || null,
    p_days: days,
    p_limit: limit,
  });

  if (error) {
    console.error('[Analytics] Get popular pages error:', error);
    return [];
  }

  return (data || []).map((row: any) => ({
    pagePath: row.page_path,
    viewCount: row.view_count,
    uniqueVisitors: row.unique_visitors,
  }));
}

/**
 * Get device breakdown
 */
export async function getDeviceBreakdown(
  merchantId?: string,
  days: number = 30
): Promise<DeviceBreakdown[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc('get_device_breakdown', {
    p_merchant_id: merchantId || null,
    p_days: days,
  });

  if (error) {
    console.error('[Analytics] Get device breakdown error:', error);
    return [];
  }

  return (data || []).map((row: any) => ({
    deviceType: row.device_type,
    eventCount: row.event_count,
    percentage: row.percentage,
  }));
}

/**
 * Get UTM performance
 */
export async function getUTMPerformance(
  merchantId?: string,
  days: number = 30
): Promise<UTMPerformance[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc('get_utm_performance', {
    p_merchant_id: merchantId || null,
    p_days: days,
  });

  if (error) {
    console.error('[Analytics] Get UTM performance error:', error);
    return [];
  }

  return (data || []).map((row: any) => ({
    utmSource: row.utm_source,
    utmMedium: row.utm_medium,
    utmCampaign: row.utm_campaign,
    eventCount: row.event_count,
    uniqueUsers: row.unique_users,
  }));
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const EVENT_CATEGORIES = {
  NAVIGATION: 'navigation',
  ENGAGEMENT: 'engagement',
  CONVERSION: 'conversion',
  ERROR: 'error',
  SYSTEM: 'system',
};

export const STANDARD_EVENTS = {
  PAGE_VIEW: 'page_view',
  BUTTON_CLICK: 'button_click',
  SEARCH: 'search',
  PRODUCT_VIEW: 'product_view',
  ADD_TO_CART: 'add_to_cart',
  REMOVE_FROM_CART: 'remove_from_cart',
  CHECKOUT_START: 'checkout_start',
  PURCHASE: 'purchase',
  SIGNUP: 'signup',
  LOGIN: 'login',
  LOGOUT: 'logout',
  SHARE: 'share',
  FAVORITE: 'favorite',
  ERROR: 'error',
};
