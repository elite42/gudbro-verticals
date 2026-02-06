/**
 * /api/auth/passkey/manage
 *
 * Manage registered passkeys:
 * - GET: List passkeys for current user
 * - PATCH: Update passkey (friendly name)
 * - DELETE: Remove a passkey
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import {
  withErrorHandling,
  successResponse,
  AuthenticationError,
  ValidationError,
  NotFoundError,
  DatabaseError,
} from '@gudbro/utils';

// Lazy-initialized Supabase admin client
let _supabaseAdmin: SupabaseClient | null = null;
function getSupabaseAdmin() {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );
  }
  return _supabaseAdmin;
}

// Helper to create authenticated Supabase client
function createAuthClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          cookieStore.delete(name);
        },
      },
    }
  );
}

/**
 * Helper to get authenticated account. Throws AppError on failure.
 */
async function getAuthenticatedAccount() {
  const supabase = createAuthClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new AuthenticationError('Must be logged in');
  }

  const { data: account, error: accountError } = await getSupabaseAdmin()
    .from('accounts')
    .select('id')
    .eq('auth_id', user.id)
    .single();

  if (accountError || !account) {
    throw new NotFoundError('Account');
  }

  return account;
}

/**
 * GET - List passkeys for authenticated user
 */
export const GET = withErrorHandling(async (_request: Request) => {
  const account = await getAuthenticatedAccount();

  // Get passkeys (exclude sensitive data)
  const { data: passkeys, error: passkeysError } = await getSupabaseAdmin()
    .from('passkeys')
    .select('id, friendly_name, device_type, transports, last_used_at, created_at')
    .eq('account_id', account.id)
    .order('created_at', { ascending: false });

  if (passkeysError) {
    throw new DatabaseError(
      'Failed to load passkeys',
      undefined,
      passkeysError as unknown as Error
    );
  }

  // Transform to camelCase
  const transformedPasskeys = (passkeys || []).map((p) => ({
    id: p.id,
    friendlyName: p.friendly_name,
    deviceType: p.device_type,
    transports: p.transports,
    lastUsedAt: p.last_used_at,
    createdAt: p.created_at,
  }));

  return successResponse({
    passkeys: transformedPasskeys,
  });
}, 'auth/passkey/manage');

/**
 * PATCH - Update passkey friendly name
 */
export const PATCH = withErrorHandling(async (request: Request) => {
  const account = await getAuthenticatedAccount();

  // Parse body
  const body = await request.json();
  const { id, friendlyName } = body;

  if (!id) {
    throw new ValidationError('Passkey ID required');
  }

  // Update passkey (only if owned by user)
  const { data: updated, error: updateError } = await getSupabaseAdmin()
    .from('passkeys')
    .update({ friendly_name: friendlyName })
    .eq('id', id)
    .eq('account_id', account.id)
    .select()
    .single();

  if (updateError || !updated) {
    throw new NotFoundError('Passkey');
  }

  return successResponse({
    message: 'Passkey updated',
  });
}, 'auth/passkey/manage');

/**
 * DELETE - Remove a passkey
 */
export const DELETE = withErrorHandling(async (request: Request) => {
  const account = await getAuthenticatedAccount();

  // Get passkey ID from query params
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    throw new ValidationError('Passkey ID required');
  }

  // Check how many passkeys user has
  const { count, error: countError } = await getSupabaseAdmin()
    .from('passkeys')
    .select('*', { count: 'exact', head: true })
    .eq('account_id', account.id);

  if (countError) {
    throw new DatabaseError('Failed to check passkeys', undefined, countError as unknown as Error);
  }

  // Optionally prevent deleting last passkey (user can still use password)
  // Uncomment if you want to enforce at least one passkey:
  // if (count && count <= 1) {
  //   throw new ValidationError('Cannot delete your only passkey');
  // }

  // Delete passkey (only if owned by user)
  const { error: deleteError } = await getSupabaseAdmin()
    .from('passkeys')
    .delete()
    .eq('id', id)
    .eq('account_id', account.id);

  if (deleteError) {
    throw new DatabaseError('Failed to delete passkey', undefined, deleteError as unknown as Error);
  }

  return successResponse({
    message: 'Passkey deleted',
  });
}, 'auth/passkey/manage');
