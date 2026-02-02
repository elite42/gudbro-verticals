/**
 * Supabase Client for Waiter PWA
 *
 * Handles connection to Supabase backend for:
 * - Staff authentication
 * - Real-time requests and orders
 * - Table assignments
 */

import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createBrowserClient(supabaseUrl!, supabaseAnonKey!)
  : null;

/**
 * Get backoffice API URL
 * Waiter app calls backoffice API endpoints
 */
export function getBackofficeApiUrl(): string {
  // In production, use relative URLs (same domain)
  // In development, point to backoffice port
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3023';
  }
  return '';
}
