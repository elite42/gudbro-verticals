/**
 * POST /api/auth/passkey/register/start
 *
 * Generate WebAuthn registration options for authenticated user.
 * User must be logged in to register a new passkey.
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateRegistrationOptions } from '@simplewebauthn/server';
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

// Relying Party configuration
const rpID = process.env.NEXT_PUBLIC_RP_ID || 'localhost';
const rpName = 'GudBro';

export async function POST(request: NextRequest) {
  try {
    // Check feature flag
    if (process.env.NEXT_PUBLIC_PASSKEYS_ENABLED !== 'true') {
      return NextResponse.json(
        { success: false, error: { code: 'DISABLED', message: 'Passkeys not enabled' } },
        { status: 403 }
      );
    }

    // Get authenticated user from Supabase
    const cookieStore = cookies();

    const supabase = createServerClient(
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

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'UNAUTHORIZED', message: 'Must be logged in to register passkey' },
        },
        { status: 401 }
      );
    }

    // Get account from auth_id
    const { data: account, error: accountError } = await getSupabaseAdmin()
      .from('accounts')
      .select('id, email, display_name')
      .eq('auth_id', user.id)
      .single();

    if (accountError || !account) {
      return NextResponse.json(
        { success: false, error: { code: 'ACCOUNT_NOT_FOUND', message: 'Account not found' } },
        { status: 404 }
      );
    }

    // Parse request body
    const body = await request.json().catch(() => ({}));
    const { friendlyName } = body;

    // Get existing passkeys to exclude from new registration
    const { data: existingPasskeys } = await getSupabaseAdmin()
      .from('passkeys')
      .select('credential_id')
      .eq('account_id', account.id);

    const excludeCredentials = (existingPasskeys || []).map((p) => ({
      id: p.credential_id,
      transports: ['internal', 'hybrid'] as AuthenticatorTransport[],
    }));

    // Generate registration options
    const options = await generateRegistrationOptions({
      rpName,
      rpID,
      userName: account.email,
      userDisplayName: account.display_name || account.email,
      // Prefer platform authenticators (Face ID, Touch ID, Windows Hello)
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'preferred',
        residentKey: 'preferred',
      },
      excludeCredentials,
      // 30 second timeout
      timeout: 30000,
    });

    // Store challenge in database for verification
    const { error: challengeError } = await getSupabaseAdmin().from('passkey_challenges').insert({
      account_id: account.id,
      email: account.email,
      challenge: options.challenge,
      type: 'registration',
    });

    if (challengeError) {
      console.error('Failed to store challenge:', challengeError);
      return NextResponse.json(
        {
          success: false,
          error: { code: 'DATABASE_ERROR', message: 'Failed to create challenge' },
        },
        { status: 500 }
      );
    }

    return NextResponse.json(options);
  } catch (error) {
    console.error('Passkey registration start error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
