import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase Admin Client with Service Role Key
 *
 * SECURITY WARNING: This client bypasses RLS (Row Level Security)
 *
 * USE ONLY FOR:
 * - Server-side API routes
 * - Background jobs
 *
 * NEVER:
 * - Expose this client to the browser
 * - Import in client components
 */

// Lazy initialization - client is created on first access
// This allows build to pass without SUPABASE_SERVICE_ROLE_KEY
let _supabaseAdmin: SupabaseClient | null = null;
let _initialized = false;

function initializeAdmin(): SupabaseClient | null {
  if (_initialized) return _supabaseAdmin;
  _initialized = true;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (supabaseUrl && supabaseServiceKey) {
    _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  } else {
    console.warn(
      'SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_URL not set. ' +
        'Admin client will not work. Add them to .env.local'
    );
  }

  return _supabaseAdmin;
}

/**
 * Supabase Admin Client - lazily initialized via Proxy
 * Access will initialize the client on first use
 * Throws at runtime if credentials are not available
 */
export const supabaseAdmin = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = initializeAdmin();
    if (!client) {
      throw new Error(
        'Supabase admin client is not available. ' +
          'Make sure SUPABASE_SERVICE_ROLE_KEY is set in environment variables.'
      );
    }
    return (client as unknown as Record<string | symbol, unknown>)[prop];
  },
});

/**
 * Get the admin client with runtime check
 * @returns SupabaseClient or throws if not available
 */
export function getSupabaseAdmin(): SupabaseClient {
  const client = initializeAdmin();
  if (!client) {
    throw new Error(
      'Supabase admin client is not available. ' +
        'Make sure SUPABASE_SERVICE_ROLE_KEY is set in environment variables.'
    );
  }
  return client;
}
