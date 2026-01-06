import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Admin Client with Service Role Key
 *
 * ⚠️  SECURITY WARNING: This client bypasses RLS (Row Level Security)
 *
 * USE ONLY FOR:
 * - Server-side API routes
 * - AI services that need to access data across merchants
 * - Background jobs and cron tasks
 *
 * NEVER:
 * - Expose this client to the browser
 * - Import in client components
 * - Use in middleware (use supabase-server.ts instead)
 */

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!supabaseServiceKey) {
  console.warn(
    '⚠️  SUPABASE_SERVICE_ROLE_KEY not set. ' + 'Admin client will not work. Add it to .env.local'
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || '', {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
