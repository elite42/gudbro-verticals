/**
 * Supabase Client Configuration
 *
 * Provides a singleton Supabase client for database operations.
 * Uses environment variables for configuration.
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types';

// Singleton instance
let supabaseClient: SupabaseClient<Database> | null = null;

/**
 * Get or create the Supabase client singleton
 */
export function getSupabaseClient(): SupabaseClient<Database> {
  if (supabaseClient) {
    return supabaseClient;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. ' +
        'Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
    );
  }

  supabaseClient = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });

  return supabaseClient;
}

/**
 * Create a Supabase client with custom credentials
 * Useful for testing or admin operations
 */
export function createSupabaseClient(
  url: string,
  key: string
): SupabaseClient<Database> {
  return createClient<Database>(url, key, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
  });
}

/**
 * Create a Supabase admin client using service role key
 * WARNING: Only use on server-side, never expose to client
 */
export function getSupabaseAdminClient(): SupabaseClient<Database> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase admin environment variables. ' +
        'Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY'
    );
  }

  return createClient<Database>(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export type { SupabaseClient };
