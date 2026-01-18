/**
 * Supabase Client for PWA
 *
 * Handles connection to Supabase backend for:
 * - Order submission
 * - Order status tracking (realtime)
 * - Menu fetching (future)
 * - Authentication (OAuth, email/password)
 */

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Create browser client for proper cookie handling (required for OAuth PKCE flow)
export const supabase = isSupabaseConfigured
  ? createBrowserClient(supabaseUrl!, supabaseAnonKey!)
  : null;

/**
 * Get or create a session ID for anonymous order tracking
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  const STORAGE_KEY = 'gudbro-session-id';
  let sessionId = localStorage.getItem(STORAGE_KEY);

  if (!sessionId) {
    sessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(STORAGE_KEY, sessionId);
  }

  return sessionId;
}

/**
 * Get device fingerprint for fraud prevention
 * Simple implementation - in production use a proper fingerprinting library
 */
export function getDeviceFingerprint(): string {
  if (typeof window === 'undefined') return '';

  const components = [
    navigator.userAgent,
    navigator.language,
    screen.width,
    screen.height,
    screen.colorDepth,
    new Date().getTimezoneOffset(),
  ];

  // Simple hash
  const str = components.join('|');
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return `fp-${Math.abs(hash).toString(36)}`;
}
