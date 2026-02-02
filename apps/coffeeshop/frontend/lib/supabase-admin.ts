import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase Admin Client for Coffeeshop API routes
 *
 * Uses SERVICE_ROLE_KEY to bypass RLS. Throws on missing key instead of
 * silently falling back to ANON key (SEC-04).
 *
 * NEVER import this in client components or middleware.
 */

let _client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (_client) return _client;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY — refusing to fall back to ANON key');
  }

  _client = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  return _client;
}
