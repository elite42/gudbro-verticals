/**
 * Supabase Read Replica Client
 *
 * For heavy read queries (analytics, dashboards) that don't need real-time data.
 * This reduces load on the primary database and improves read performance.
 *
 * Prerequisites:
 * - Supabase Pro plan for read replicas
 * - SUPABASE_READ_REPLICA_URL environment variable set
 *
 * Usage:
 * ```ts
 * import { supabaseReadReplica } from '@/lib/supabase-read-replica';
 *
 * // Heavy analytics query goes to read replica
 * const { data } = await supabaseReadReplica.from('analytics_events').select('*');
 *
 * // Writes still go through the primary client
 * import { createClient } from '@/lib/supabase-server';
 * const supabase = createClient();
 * await supabase.from('orders').insert(...);
 * ```
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

// Flag to enable/disable read replica
const USE_READ_REPLICA = process.env.SUPABASE_READ_REPLICA_URL ? true : false;

// Primary database URL (always available)
const PRIMARY_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Read replica URL (optional, requires Supabase Pro)
const READ_REPLICA_URL = process.env.SUPABASE_READ_REPLICA_URL || PRIMARY_URL;

let readReplicaClient: SupabaseClient | null = null;

/**
 * Get or create the read replica client
 *
 * Uses lazy initialization to avoid creating the client
 * until it's actually needed.
 */
function getReadReplicaClient(): SupabaseClient {
  if (!readReplicaClient) {
    readReplicaClient = createClient(READ_REPLICA_URL, ANON_KEY, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
      db: {
        schema: 'public',
      },
    });
  }
  return readReplicaClient;
}

/**
 * Proxy handler for lazy client initialization
 *
 * Creates the client on first access, not at import time.
 * This prevents build failures when env vars are not available.
 */
const proxyHandler: ProxyHandler<object> = {
  get(_target, prop: string) {
    const client = getReadReplicaClient();
    const value = client[prop as keyof SupabaseClient];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
};

/**
 * Supabase Read Replica Client
 *
 * Use this for heavy read queries:
 * - Analytics aggregations
 * - Dashboard statistics
 * - Reports generation
 * - Historical data queries
 *
 * Falls back to primary if read replica is not configured.
 */
export const supabaseReadReplica = new Proxy({}, proxyHandler) as SupabaseClient;

/**
 * Check if read replica is enabled
 */
export function isReadReplicaEnabled(): boolean {
  return USE_READ_REPLICA;
}

/**
 * Get the read replica URL (for debugging)
 */
export function getReadReplicaUrl(): string {
  return USE_READ_REPLICA ? READ_REPLICA_URL : 'Using primary (no replica configured)';
}

/**
 * Helper to choose between primary and read replica based on query type
 *
 * @param queryType - 'read' for heavy reads, 'write' for mutations
 * @param primaryClient - Your primary Supabase client
 * @returns The appropriate client for the query type
 */
export function selectClient(
  queryType: 'read' | 'write',
  primaryClient: SupabaseClient
): SupabaseClient {
  if (queryType === 'write') {
    return primaryClient;
  }

  // For reads, use replica if available, otherwise primary
  return USE_READ_REPLICA ? supabaseReadReplica : primaryClient;
}
