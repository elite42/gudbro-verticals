/**
 * /api/auth/passkey/manage
 *
 * Manage registered passkeys:
 * - GET: List passkeys for current user
 * - PATCH: Update passkey (friendly name)
 * - DELETE: Remove a passkey
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

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
 * GET - List passkeys for authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = createAuthClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 }
      );
    }

    // Get account
    const { data: account, error: accountError } = await getSupabaseAdmin()
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (accountError || !account) {
      return NextResponse.json(
        { success: false, error: { code: 'ACCOUNT_NOT_FOUND', message: 'Account not found' } },
        { status: 404 }
      );
    }

    // Get passkeys (exclude sensitive data)
    const { data: passkeys, error: passkeysError } = await getSupabaseAdmin()
      .from('passkeys')
      .select('id, friendly_name, device_type, transports, last_used_at, created_at')
      .eq('account_id', account.id)
      .order('created_at', { ascending: false });

    if (passkeysError) {
      console.error('Failed to fetch passkeys:', passkeysError);
      return NextResponse.json(
        { success: false, error: { code: 'DATABASE_ERROR', message: 'Failed to load passkeys' } },
        { status: 500 }
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

    return NextResponse.json({
      success: true,
      passkeys: transformedPasskeys,
    });
  } catch (error) {
    console.error('Get passkeys error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}

/**
 * PATCH - Update passkey friendly name
 */
export async function PATCH(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = createAuthClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 }
      );
    }

    // Get account
    const { data: account, error: accountError } = await getSupabaseAdmin()
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (accountError || !account) {
      return NextResponse.json(
        { success: false, error: { code: 'ACCOUNT_NOT_FOUND', message: 'Account not found' } },
        { status: 404 }
      );
    }

    // Parse body
    const body = await request.json();
    const { id, friendlyName } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_REQUEST', message: 'Passkey ID required' } },
        { status: 400 }
      );
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
      return NextResponse.json(
        { success: false, error: { code: 'NOT_FOUND', message: 'Passkey not found' } },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Passkey updated',
    });
  } catch (error) {
    console.error('Update passkey error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}

/**
 * DELETE - Remove a passkey
 */
export async function DELETE(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = createAuthClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 }
      );
    }

    // Get account
    const { data: account, error: accountError } = await getSupabaseAdmin()
      .from('accounts')
      .select('id')
      .eq('auth_id', user.id)
      .single();

    if (accountError || !account) {
      return NextResponse.json(
        { success: false, error: { code: 'ACCOUNT_NOT_FOUND', message: 'Account not found' } },
        { status: 404 }
      );
    }

    // Get passkey ID from query params
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_REQUEST', message: 'Passkey ID required' } },
        { status: 400 }
      );
    }

    // Check how many passkeys user has
    const { count, error: countError } = await getSupabaseAdmin()
      .from('passkeys')
      .select('*', { count: 'exact', head: true })
      .eq('account_id', account.id);

    if (countError) {
      return NextResponse.json(
        { success: false, error: { code: 'DATABASE_ERROR', message: 'Failed to check passkeys' } },
        { status: 500 }
      );
    }

    // Optionally prevent deleting last passkey (user can still use password)
    // Uncomment if you want to enforce at least one passkey:
    // if (count && count <= 1) {
    //   return NextResponse.json(
    //     { success: false, error: { code: 'LAST_PASSKEY', message: 'Cannot delete your only passkey' } },
    //     { status: 400 }
    //   );
    // }

    // Delete passkey (only if owned by user)
    const { error: deleteError } = await getSupabaseAdmin()
      .from('passkeys')
      .delete()
      .eq('id', id)
      .eq('account_id', account.id);

    if (deleteError) {
      console.error('Failed to delete passkey:', deleteError);
      return NextResponse.json(
        { success: false, error: { code: 'DATABASE_ERROR', message: 'Failed to delete passkey' } },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Passkey deleted',
    });
  } catch (error) {
    console.error('Delete passkey error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
