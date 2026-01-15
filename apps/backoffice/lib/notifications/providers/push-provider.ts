/**
 * Push Notification Provider
 *
 * Supports web push notifications via Supabase Realtime
 * and FCM (Firebase Cloud Messaging) for mobile apps.
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin';

export interface PushOptions {
  accountId: string;
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: Record<string, unknown>;
  url?: string;
}

export interface PushResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send push notification via Supabase Realtime
 *
 * This stores the notification in a table that clients subscribe to.
 * The client-side app listens for new notifications and displays them.
 */
export async function sendPushNotification(options: PushOptions): Promise<PushResult> {
  const { accountId, title, body, icon, badge, data, url } = options;

  if (!accountId) {
    return { success: false, error: 'Account ID is required' };
  }

  try {
    const supabase = getSupabaseAdmin();

    // Insert notification into push_notifications table
    // Clients subscribe to this table via Supabase Realtime
    const { data: notificationData, error } = await supabase
      .from('push_notifications')
      .insert({
        account_id: accountId,
        title,
        body,
        icon: icon || '/icons/notification.png',
        badge: badge || '/icons/badge.png',
        data: data || {},
        url,
        status: 'pending',
        created_at: new Date().toISOString(),
      } as Record<string, unknown>)
      .select('id')
      .single();

    if (error) {
      // Table might not exist yet - this is okay for MVP
      if (error.code === '42P01') {
        console.warn('push_notifications table does not exist. Skipping push notification.');
        return { success: false, error: 'Push notifications not configured' };
      }
      return { success: false, error: error.message };
    }

    const notification = notificationData as { id: string } | null;
    return { success: true, messageId: notification?.id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send push notification via Firebase Cloud Messaging (FCM)
 *
 * Requires:
 * - FIREBASE_SERVICE_ACCOUNT_KEY env var with service account JSON
 * - User's FCM token stored in account preferences
 */
export async function sendViaFCM(
  fcmToken: string,
  options: Omit<PushOptions, 'accountId'>
): Promise<PushResult> {
  const serviceAccountKey = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;

  if (!serviceAccountKey) {
    return { success: false, error: 'Firebase service account not configured' };
  }

  if (!fcmToken) {
    return { success: false, error: 'FCM token is required' };
  }

  try {
    // Parse service account
    const serviceAccount = JSON.parse(serviceAccountKey);

    // Get access token using service account
    const accessToken = await getFirebaseAccessToken(serviceAccount);

    if (!accessToken) {
      return { success: false, error: 'Failed to get Firebase access token' };
    }

    // Send FCM message
    const response = await fetch(
      `https://fcm.googleapis.com/v1/projects/${serviceAccount.project_id}/messages:send`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          message: {
            token: fcmToken,
            notification: {
              title: options.title,
              body: options.body,
            },
            webpush: {
              notification: {
                icon: options.icon,
                badge: options.badge,
              },
              fcm_options: {
                link: options.url,
              },
            },
            data: options.data
              ? Object.fromEntries(Object.entries(options.data).map(([k, v]) => [k, String(v)]))
              : undefined,
          },
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error?.message || 'Failed to send FCM notification',
      };
    }

    return { success: true, messageId: result.name };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get Firebase access token using service account credentials
 */
async function getFirebaseAccessToken(serviceAccount: {
  client_email: string;
  private_key: string;
}): Promise<string | null> {
  try {
    // Create JWT for service account authentication
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: serviceAccount.client_email,
      scope: 'https://www.googleapis.com/auth/firebase.messaging',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    };

    // Sign JWT with private key
    // Note: In production, use a proper JWT library like jose
    const header = { alg: 'RS256', typ: 'JWT' };
    const encodedHeader = btoa(JSON.stringify(header));
    const encodedPayload = btoa(JSON.stringify(payload));

    // For simplicity, we'll use the Web Crypto API
    // In production, consider using the google-auth-library
    const key = await crypto.subtle.importKey(
      'pkcs8',
      pemToArrayBuffer(serviceAccount.private_key),
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signatureBuffer = await crypto.subtle.sign(
      'RSASSA-PKCS1-v1_5',
      key,
      new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`)
    );

    const signature = btoa(String.fromCharCode(...new Uint8Array(signatureBuffer)));
    const jwt = `${encodedHeader}.${encodedPayload}.${signature}`;

    // Exchange JWT for access token
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });

    const result = await response.json();
    return result.access_token || null;
  } catch (error) {
    console.error('Failed to get Firebase access token:', error);
    return null;
  }
}

/**
 * Convert PEM private key to ArrayBuffer
 */
function pemToArrayBuffer(pem: string): ArrayBuffer {
  const base64 = pem
    .replace('-----BEGIN PRIVATE KEY-----', '')
    .replace('-----END PRIVATE KEY-----', '')
    .replace(/\s/g, '');

  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * Mark push notification as delivered
 */
export async function markPushDelivered(notificationId: string): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();

    await supabase
      .from('push_notifications')
      .update({
        status: 'delivered',
        delivered_at: new Date().toISOString(),
      } as Record<string, unknown>)
      .eq('id', notificationId);
  } catch (error) {
    console.error('Failed to mark push notification as delivered:', error);
  }
}

/**
 * Mark push notification as read
 */
export async function markPushRead(notificationId: string): Promise<void> {
  try {
    const supabase = getSupabaseAdmin();

    await supabase
      .from('push_notifications')
      .update({
        status: 'read',
        read_at: new Date().toISOString(),
      } as Record<string, unknown>)
      .eq('id', notificationId);
  } catch (error) {
    console.error('Failed to mark push notification as read:', error);
  }
}
