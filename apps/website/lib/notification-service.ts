/**
 * Notification Service
 *
 * Handles notification preferences, push tokens, and in-app notifications
 */

import { supabase, isSupabaseConfigured } from './supabase';

// Types
export interface NotificationPreferences {
  // Email
  emailEnabled: boolean;
  emailMarketing: boolean;
  emailOrders: boolean;
  emailLoyalty: boolean;
  emailContributions: boolean;
  emailTeam: boolean;
  emailDigestFrequency: 'daily' | 'weekly' | 'monthly' | 'never';

  // Push
  pushEnabled: boolean;
  pushOrders: boolean;
  pushLoyalty: boolean;
  pushPromotions: boolean;
  pushReminders: boolean;

  // In-app
  inappEnabled: boolean;

  // Quiet hours
  quietHoursEnabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;

  // Locale
  timezone: string;
  notificationLocale: string;
}

export interface PushToken {
  tokenId: string;
  token: string;
  platform: 'ios' | 'android' | 'web';
  deviceName?: string;
  lastUsedAt: string;
}

export interface InAppNotification {
  notificationId: string;
  category: string;
  title: string;
  body?: string;
  data: Record<string, unknown>;
  isRead: boolean;
  createdAt: string;
}

// ============================================================================
// PREFERENCES
// ============================================================================

/**
 * Get notification preferences for the current user
 */
export async function getNotificationPreferences(accountId: string): Promise<NotificationPreferences | null> {
  if (!isSupabaseConfigured || !supabase) {
    return null;
  }

  const { data, error } = await supabase.rpc('get_notification_preferences', {
    p_account_id: accountId,
  });

  if (error) {
    console.error('[NotificationService] Get preferences error:', error);
    return null;
  }

  if (!data || data.length === 0) {
    return getDefaultPreferences();
  }

  const row = data[0];
  return {
    emailEnabled: row.email_enabled,
    emailMarketing: row.email_marketing,
    emailOrders: row.email_orders,
    emailLoyalty: row.email_loyalty,
    emailContributions: row.email_contributions,
    emailTeam: row.email_team,
    emailDigestFrequency: row.email_digest_frequency,
    pushEnabled: row.push_enabled,
    pushOrders: row.push_orders,
    pushLoyalty: row.push_loyalty,
    pushPromotions: row.push_promotions,
    pushReminders: row.push_reminders,
    inappEnabled: row.inapp_enabled,
    quietHoursEnabled: row.quiet_hours_enabled,
    quietHoursStart: row.quiet_hours_start,
    quietHoursEnd: row.quiet_hours_end,
    timezone: row.timezone,
    notificationLocale: row.notification_locale,
  };
}

/**
 * Update notification preferences
 */
export async function updateNotificationPreferences(
  accountId: string,
  preferences: Partial<NotificationPreferences>
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  // Convert camelCase to snake_case for DB
  const dbPreferences: Record<string, unknown> = {};

  if (preferences.emailEnabled !== undefined) dbPreferences.email_enabled = preferences.emailEnabled;
  if (preferences.emailMarketing !== undefined) dbPreferences.email_marketing = preferences.emailMarketing;
  if (preferences.emailOrders !== undefined) dbPreferences.email_orders = preferences.emailOrders;
  if (preferences.emailLoyalty !== undefined) dbPreferences.email_loyalty = preferences.emailLoyalty;
  if (preferences.emailContributions !== undefined) dbPreferences.email_contributions = preferences.emailContributions;
  if (preferences.emailTeam !== undefined) dbPreferences.email_team = preferences.emailTeam;
  if (preferences.emailDigestFrequency !== undefined) dbPreferences.email_digest_frequency = preferences.emailDigestFrequency;
  if (preferences.pushEnabled !== undefined) dbPreferences.push_enabled = preferences.pushEnabled;
  if (preferences.pushOrders !== undefined) dbPreferences.push_orders = preferences.pushOrders;
  if (preferences.pushLoyalty !== undefined) dbPreferences.push_loyalty = preferences.pushLoyalty;
  if (preferences.pushPromotions !== undefined) dbPreferences.push_promotions = preferences.pushPromotions;
  if (preferences.pushReminders !== undefined) dbPreferences.push_reminders = preferences.pushReminders;
  if (preferences.inappEnabled !== undefined) dbPreferences.inapp_enabled = preferences.inappEnabled;
  if (preferences.quietHoursEnabled !== undefined) dbPreferences.quiet_hours_enabled = preferences.quietHoursEnabled;
  if (preferences.quietHoursStart !== undefined) dbPreferences.quiet_hours_start = preferences.quietHoursStart;
  if (preferences.quietHoursEnd !== undefined) dbPreferences.quiet_hours_end = preferences.quietHoursEnd;
  if (preferences.timezone !== undefined) dbPreferences.timezone = preferences.timezone;
  if (preferences.notificationLocale !== undefined) dbPreferences.notification_locale = preferences.notificationLocale;

  const { error } = await supabase.rpc('update_notification_preferences', {
    p_account_id: accountId,
    p_preferences: dbPreferences,
  });

  if (error) {
    console.error('[NotificationService] Update preferences error:', error);
    return { success: false, error: error.message };
  }

  return { success: true };
}

// ============================================================================
// PUSH TOKENS
// ============================================================================

/**
 * Register a push notification token
 */
export async function registerPushToken(
  accountId: string,
  token: string,
  platform: 'ios' | 'android' | 'web',
  deviceName?: string,
  deviceId?: string
): Promise<{ success: boolean; tokenId?: string; error?: string }> {
  if (!isSupabaseConfigured || !supabase) {
    return { success: false, error: 'Supabase not configured' };
  }

  const { data, error } = await supabase.rpc('register_push_token', {
    p_account_id: accountId,
    p_token: token,
    p_platform: platform,
    p_device_name: deviceName || null,
    p_device_id: deviceId || null,
  });

  if (error) {
    console.error('[NotificationService] Register token error:', error);
    return { success: false, error: error.message };
  }

  return { success: true, tokenId: data };
}

/**
 * Deactivate a push token (e.g., on logout)
 */
export async function deactivatePushToken(token: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const { data, error } = await supabase.rpc('deactivate_push_token', {
    p_token: token,
  });

  if (error) {
    console.error('[NotificationService] Deactivate token error:', error);
    return false;
  }

  return data === true;
}

/**
 * Get active push tokens for the user
 */
export async function getPushTokens(accountId: string): Promise<PushToken[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc('get_push_tokens', {
    p_account_id: accountId,
  });

  if (error) {
    console.error('[NotificationService] Get tokens error:', error);
    return [];
  }

  return (data || []).map((t: any) => ({
    tokenId: t.token_id,
    token: t.token,
    platform: t.platform,
    deviceName: t.device_name,
    lastUsedAt: t.last_used_at,
  }));
}

// ============================================================================
// IN-APP NOTIFICATIONS
// ============================================================================

/**
 * Get unread notifications count
 */
export async function getUnreadCount(accountId: string): Promise<number> {
  if (!isSupabaseConfigured || !supabase) {
    return 0;
  }

  const { data, error } = await supabase.rpc('get_unread_notifications_count', {
    p_account_id: accountId,
  });

  if (error) {
    console.error('[NotificationService] Get unread count error:', error);
    return 0;
  }

  return data || 0;
}

/**
 * Get in-app notifications
 */
export async function getInAppNotifications(
  accountId: string,
  limit: number = 20,
  offset: number = 0
): Promise<InAppNotification[]> {
  if (!isSupabaseConfigured || !supabase) {
    return [];
  }

  const { data, error } = await supabase.rpc('get_inapp_notifications', {
    p_account_id: accountId,
    p_limit: limit,
    p_offset: offset,
  });

  if (error) {
    console.error('[NotificationService] Get notifications error:', error);
    return [];
  }

  return (data || []).map((n: any) => ({
    notificationId: n.notification_id,
    category: n.category,
    title: n.title,
    body: n.body,
    data: n.data || {},
    isRead: n.is_read,
    createdAt: n.created_at,
  }));
}

/**
 * Mark notification as read
 */
export async function markNotificationRead(notificationId: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const { error } = await supabase.rpc('mark_notification_read', {
    p_log_id: notificationId,
  });

  if (error) {
    console.error('[NotificationService] Mark read error:', error);
    return false;
  }

  return true;
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsRead(accountId: string): Promise<boolean> {
  if (!isSupabaseConfigured || !supabase) {
    return false;
  }

  const { error } = await supabase
    .from('notification_log')
    .update({ status: 'read', read_at: new Date().toISOString() })
    .eq('account_id', accountId)
    .eq('notification_type', 'inapp')
    .neq('status', 'read');

  if (error) {
    console.error('[NotificationService] Mark all read error:', error);
    return false;
  }

  return true;
}

// ============================================================================
// HELPERS
// ============================================================================

function getDefaultPreferences(): NotificationPreferences {
  return {
    emailEnabled: true,
    emailMarketing: true,
    emailOrders: true,
    emailLoyalty: true,
    emailContributions: true,
    emailTeam: true,
    emailDigestFrequency: 'weekly',
    pushEnabled: true,
    pushOrders: true,
    pushLoyalty: true,
    pushPromotions: false,
    pushReminders: true,
    inappEnabled: true,
    quietHoursEnabled: false,
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
    timezone: 'Europe/Rome',
    notificationLocale: 'it',
  };
}

// ============================================================================
// CONSTANTS
// ============================================================================

export const NOTIFICATION_CATEGORIES = {
  ORDERS: 'orders',
  LOYALTY: 'loyalty',
  MARKETING: 'marketing',
  CONTRIBUTIONS: 'contributions',
  TEAM: 'team',
  REMINDERS: 'reminders',
  PROMOTIONS: 'promotions',
  SYSTEM: 'system',
};

export const DIGEST_FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Giornaliero' },
  { value: 'weekly', label: 'Settimanale' },
  { value: 'monthly', label: 'Mensile' },
  { value: 'never', label: 'Mai' },
];

export const TIMEZONE_OPTIONS = [
  { value: 'Europe/Rome', label: 'Roma (GMT+1/+2)' },
  { value: 'Europe/London', label: 'Londra (GMT+0/+1)' },
  { value: 'Europe/Paris', label: 'Parigi (GMT+1/+2)' },
  { value: 'Europe/Berlin', label: 'Berlino (GMT+1/+2)' },
  { value: 'America/New_York', label: 'New York (GMT-5/-4)' },
  { value: 'America/Los_Angeles', label: 'Los Angeles (GMT-8/-7)' },
  { value: 'Asia/Tokyo', label: 'Tokyo (GMT+9)' },
];

export const LOCALE_OPTIONS = [
  { value: 'it', label: 'Italiano' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' },
  { value: 'fr', label: 'Français' },
  { value: 'de', label: 'Deutsch' },
];
