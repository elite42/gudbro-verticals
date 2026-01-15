/**
 * Notification Dispatcher Service
 *
 * Multi-channel notification system for reservations.
 * Supports: Email, SMS, Push, WhatsApp, Telegram, LINE, Zalo
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin';

// Types
export type NotificationChannel =
  | 'email'
  | 'sms'
  | 'push'
  | 'whatsapp'
  | 'telegram'
  | 'line'
  | 'zalo';

export type NotificationType =
  | 'reservation_confirmed'
  | 'reminder_24h'
  | 'reminder_2h'
  | 'reservation_updated'
  | 'reservation_cancelled'
  | 'no_show'
  | 'table_ready';

export interface NotificationTemplate {
  id: string;
  merchant_id: string | null;
  template_code: string;
  channel: NotificationChannel;
  locale: string;
  subject: string | null;
  title: string | null;
  body: string;
  html_body: string | null;
  buttons: Record<string, string>[];
  is_active: boolean;
}

export interface NotificationPreferences {
  id: string;
  account_id: string;
  merchant_id: string | null;
  email_enabled: boolean;
  sms_enabled: boolean;
  push_enabled: boolean;
  whatsapp_enabled: boolean;
  telegram_enabled: boolean;
  line_enabled: boolean;
  zalo_enabled: boolean;
  telegram_chat_id: string | null;
  line_user_id: string | null;
  zalo_user_id: string | null;
  whatsapp_phone: string | null;
  preferred_locale: string;
}

export interface ReservationNotification {
  id: string;
  reservation_id: string;
  notification_type: NotificationType;
  channel: NotificationChannel;
  recipient: string;
  recipient_name: string | null;
  subject: string | null;
  body: string;
  status: 'pending' | 'queued' | 'sent' | 'delivered' | 'read' | 'failed' | 'bounced';
  provider: string | null;
  provider_message_id: string | null;
  error_message: string | null;
  scheduled_for: string | null;
  sent_at: string | null;
}

export interface SendNotificationOptions {
  reservationId: string;
  type: NotificationType;
  channels?: NotificationChannel[];
  scheduledFor?: Date;
  priority?: number;
  locale?: string;
}

export interface NotificationResult {
  success: boolean;
  notificationIds: string[];
  errors: { channel: NotificationChannel; error: string }[];
}

// Template variable replacements
export interface TemplateVariables {
  guest_name: string;
  restaurant_name: string;
  date: string;
  time: string;
  party_size: number;
  reservation_code: string;
  reservation_id: string;
  section?: string;
  special_requests?: string;
  calendar_url?: string;
  reservation_url?: string;
  cancel_url?: string;
}

// Reservation type for query results
interface ReservationData {
  id: string;
  guest_name: string;
  guest_email: string | null;
  guest_phone: string | null;
  guest_locale: string | null;
  account_id: string | null;
  reservation_date: string;
  reservation_time: string;
  party_size: number;
  reservation_code: string;
  special_requests: string | null;
  location: {
    id: string;
    name: string;
    merchant_id: string | null;
  } | null;
}

/**
 * Get notification template with fallback
 */
export async function getTemplate(
  merchantId: string | null,
  templateCode: string,
  channel: NotificationChannel,
  locale: string
): Promise<NotificationTemplate | null> {
  const supabase = getSupabaseAdmin();

  // Try merchant-specific template first, then default
  const { data, error } = await supabase
    .from('notification_templates')
    .select('*')
    .or(`merchant_id.eq.${merchantId},merchant_id.is.null`)
    .eq('template_code', templateCode)
    .eq('channel', channel)
    .eq('locale', locale)
    .eq('is_active', true)
    .order('merchant_id', { nullsFirst: false })
    .limit(1)
    .single();

  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows returned
    console.error('Error fetching template:', error);
  }

  // If no template found, try English fallback
  if (!data && locale !== 'en') {
    return getTemplate(merchantId, templateCode, channel, 'en');
  }

  return data as NotificationTemplate | null;
}

/**
 * Replace template variables
 */
export function renderTemplate(template: string, variables: TemplateVariables): string {
  let result = template;

  for (const [key, value] of Object.entries(variables)) {
    if (value !== undefined && value !== null) {
      result = result.replace(new RegExp(`{{${key}}}`, 'g'), String(value));
    }
  }

  return result;
}

/**
 * Get user notification preferences
 */
export async function getNotificationPreferences(
  accountId: string,
  merchantId?: string
): Promise<NotificationPreferences | null> {
  const supabase = getSupabaseAdmin();

  const query = supabase
    .from('notification_channel_preferences')
    .select('*')
    .eq('account_id', accountId);

  if (merchantId) {
    query.eq('merchant_id', merchantId);
  } else {
    query.is('merchant_id', null);
  }

  const { data, error } = await query.single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching notification preferences:', error);
  }

  return data as NotificationPreferences | null;
}

/**
 * Get enabled channels for a user
 */
export async function getEnabledChannels(
  accountId: string | null,
  merchantId?: string,
  defaultChannels: NotificationChannel[] = ['email', 'push']
): Promise<NotificationChannel[]> {
  if (!accountId) {
    return defaultChannels;
  }

  const prefs = await getNotificationPreferences(accountId, merchantId);

  if (!prefs) {
    return defaultChannels;
  }

  const channels: NotificationChannel[] = [];

  if (prefs.email_enabled) channels.push('email');
  if (prefs.sms_enabled) channels.push('sms');
  if (prefs.push_enabled) channels.push('push');
  if (prefs.whatsapp_enabled) channels.push('whatsapp');
  if (prefs.telegram_enabled && prefs.telegram_chat_id) channels.push('telegram');
  if (prefs.line_enabled && prefs.line_user_id) channels.push('line');
  if (prefs.zalo_enabled && prefs.zalo_user_id) channels.push('zalo');

  return channels.length > 0 ? channels : defaultChannels;
}

/**
 * Queue a notification for sending
 */
export async function queueNotification(
  reservationId: string,
  notificationType: NotificationType,
  channel: NotificationChannel,
  recipient: string,
  recipientName: string,
  subject: string | null,
  body: string,
  scheduledFor?: Date,
  priority: number = 5
): Promise<string | null> {
  const supabase = getSupabaseAdmin();

  // Create notification log entry
  const { data: notificationData, error: notifError } = await supabase
    .from('reservation_notifications')
    .insert({
      reservation_id: reservationId,
      notification_type: notificationType,
      channel,
      recipient,
      recipient_name: recipientName,
      subject,
      body,
      status: 'pending',
      scheduled_for: scheduledFor?.toISOString() || new Date().toISOString(),
    } as Record<string, unknown>)
    .select('id')
    .single();

  if (notifError || !notificationData) {
    console.error('Error creating notification:', notifError);
    return null;
  }

  const notification = notificationData as { id: string };

  // Add to queue
  const { error: queueError } = await supabase.from('notification_queue').insert({
    notification_id: notification.id,
    priority,
    process_after: scheduledFor?.toISOString() || new Date().toISOString(),
  } as Record<string, unknown>);

  if (queueError) {
    console.error('Error queueing notification:', queueError);
    return null;
  }

  return notification.id;
}

/**
 * Send notification for a reservation
 */
export async function sendReservationNotification(
  options: SendNotificationOptions
): Promise<NotificationResult> {
  const supabase = getSupabaseAdmin();
  const { reservationId, type, channels, scheduledFor, priority = 5, locale } = options;

  const result: NotificationResult = {
    success: true,
    notificationIds: [],
    errors: [],
  };

  // Get reservation details
  const { data: reservationData, error: reservationError } = await supabase
    .from('reservations')
    .select(
      `
      *,
      location:locations(id, name, merchant_id)
    `
    )
    .eq('id', reservationId)
    .single();

  if (reservationError || !reservationData) {
    result.success = false;
    result.errors.push({ channel: 'email', error: 'Reservation not found' });
    return result;
  }

  // Cast to typed reservation
  const reservation = reservationData as unknown as ReservationData;

  // Build template variables
  const variables: TemplateVariables = {
    guest_name: reservation.guest_name,
    restaurant_name: reservation.location?.name || 'Our Restaurant',
    date: new Date(reservation.reservation_date).toLocaleDateString(),
    time: reservation.reservation_time?.slice(0, 5) || '',
    party_size: reservation.party_size,
    reservation_code: reservation.reservation_code,
    reservation_id: reservation.id,
    special_requests: reservation.special_requests || undefined,
  };

  // Determine channels to use
  const effectiveLocale = locale || reservation.guest_locale || 'en';
  let effectiveChannels = channels;

  if (!effectiveChannels || effectiveChannels.length === 0) {
    // Get user's preferred channels
    effectiveChannels = await getEnabledChannels(
      reservation.account_id,
      reservation.location?.merchant_id ?? undefined
    );

    // For guests without accounts, use email and SMS if phone provided
    if (!reservation.account_id) {
      effectiveChannels = ['email'];
      if (reservation.guest_phone) {
        effectiveChannels.push('sms');
      }
    }
  }

  // Send to each channel
  for (const channel of effectiveChannels) {
    try {
      // Get recipient based on channel
      let recipient: string | null = null;

      switch (channel) {
        case 'email':
          recipient = reservation.guest_email;
          break;
        case 'sms':
        case 'whatsapp':
          recipient = reservation.guest_phone;
          break;
        case 'push':
          recipient = reservation.account_id; // Push uses account ID
          break;
        case 'telegram':
        case 'line':
        case 'zalo':
          // These require user preferences with channel IDs
          if (reservation.account_id) {
            const prefs = await getNotificationPreferences(
              reservation.account_id,
              reservation.location?.merchant_id ?? undefined
            );
            if (prefs) {
              recipient =
                channel === 'telegram'
                  ? prefs.telegram_chat_id
                  : channel === 'line'
                    ? prefs.line_user_id
                    : prefs.zalo_user_id;
            }
          }
          break;
      }

      if (!recipient) {
        result.errors.push({ channel, error: 'No recipient available' });
        continue;
      }

      // Get template
      const template = await getTemplate(
        reservation.location?.merchant_id || null,
        type,
        channel,
        effectiveLocale
      );

      if (!template) {
        result.errors.push({ channel, error: 'Template not found' });
        continue;
      }

      // Render template
      const renderedBody = renderTemplate(template.body, variables);
      const renderedSubject = template.subject ? renderTemplate(template.subject, variables) : null;

      // Queue notification
      const notificationId = await queueNotification(
        reservationId,
        type,
        channel,
        recipient,
        reservation.guest_name,
        renderedSubject,
        renderedBody,
        scheduledFor,
        priority
      );

      if (notificationId) {
        result.notificationIds.push(notificationId);
      } else {
        result.errors.push({ channel, error: 'Failed to queue notification' });
      }
    } catch (error) {
      result.errors.push({
        channel,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  result.success = result.notificationIds.length > 0;
  return result;
}

/**
 * Schedule reminder notifications for a reservation
 */
export async function scheduleReminders(
  reservationId: string,
  reservationDate: string,
  reservationTime: string
): Promise<void> {
  const reservationDateTime = new Date(`${reservationDate}T${reservationTime}`);

  // Schedule 24h reminder
  const reminder24h = new Date(reservationDateTime);
  reminder24h.setHours(reminder24h.getHours() - 24);

  if (reminder24h > new Date()) {
    await sendReservationNotification({
      reservationId,
      type: 'reminder_24h',
      scheduledFor: reminder24h,
      priority: 3,
    });
  }

  // Schedule 2h reminder
  const reminder2h = new Date(reservationDateTime);
  reminder2h.setHours(reminder2h.getHours() - 2);

  if (reminder2h > new Date()) {
    await sendReservationNotification({
      reservationId,
      type: 'reminder_2h',
      scheduledFor: reminder2h,
      priority: 2,
    });
  }
}

/**
 * Cancel scheduled notifications for a reservation
 */
export async function cancelScheduledNotifications(reservationId: string): Promise<void> {
  const supabase = getSupabaseAdmin();

  // Get pending notifications
  const { data: notificationsData } = await supabase
    .from('reservation_notifications')
    .select('id')
    .eq('reservation_id', reservationId)
    .eq('status', 'pending');

  const notifications = notificationsData as { id: string }[] | null;

  if (!notifications || notifications.length === 0) return;

  const notificationIds = notifications.map((n) => n.id);

  // Cancel queue entries
  await supabase
    .from('notification_queue')
    .update({ status: 'cancelled' } as Record<string, unknown>)
    .in('notification_id', notificationIds);

  // Update notification status
  await supabase
    .from('reservation_notifications')
    .update({
      status: 'failed',
      error_message: 'Cancelled due to reservation cancellation',
    } as Record<string, unknown>)
    .in('id', notificationIds);
}

/**
 * Get notification history for a reservation
 */
export async function getNotificationHistory(
  reservationId: string
): Promise<ReservationNotification[]> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('reservation_notifications')
    .select('*')
    .eq('reservation_id', reservationId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching notification history:', error);
    return [];
  }

  return (data as ReservationNotification[]) || [];
}

/**
 * Update notification preferences for a user
 */
export async function updateNotificationPreferences(
  accountId: string,
  merchantId: string | null,
  preferences: Partial<Omit<NotificationPreferences, 'id' | 'account_id' | 'merchant_id'>>
): Promise<NotificationPreferences | null> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase
    .from('notification_channel_preferences')
    .upsert(
      {
        account_id: accountId,
        merchant_id: merchantId,
        ...preferences,
      } as Record<string, unknown>,
      {
        onConflict: 'account_id,merchant_id',
      }
    )
    .select()
    .single();

  if (error) {
    console.error('Error updating notification preferences:', error);
    return null;
  }

  return data as NotificationPreferences;
}
