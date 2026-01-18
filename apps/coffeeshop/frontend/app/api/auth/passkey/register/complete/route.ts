/**
 * POST /api/auth/passkey/register/complete
 *
 * Verify WebAuthn registration response and store credential.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyRegistrationResponse } from '@simplewebauthn/server';
import type { RegistrationResponseJSON } from '@simplewebauthn/types';
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
const origin = process.env.NEXT_PUBLIC_ORIGIN || 'http://localhost:3004';

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
        { success: false, error: { code: 'UNAUTHORIZED', message: 'Must be logged in' } },
        { status: 401 }
      );
    }

    // Get account
    const { data: account, error: accountError } = await getSupabaseAdmin()
      .from('accounts')
      .select('id, email')
      .eq('auth_id', user.id)
      .single();

    if (accountError || !account) {
      return NextResponse.json(
        { success: false, error: { code: 'ACCOUNT_NOT_FOUND', message: 'Account not found' } },
        { status: 404 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { credential, friendlyName } = body as {
      credential: RegistrationResponseJSON;
      friendlyName?: string;
    };

    if (!credential) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_REQUEST', message: 'Credential required' } },
        { status: 400 }
      );
    }

    // Get the stored challenge
    const { data: challengeRecord, error: challengeError } = await getSupabaseAdmin()
      .from('passkey_challenges')
      .select('*')
      .eq('account_id', account.id)
      .eq('type', 'registration')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (challengeError || !challengeRecord) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'CHALLENGE_EXPIRED', message: 'Registration session expired' },
        },
        { status: 400 }
      );
    }

    // Verify the registration response
    let verification;
    try {
      verification = await verifyRegistrationResponse({
        response: credential,
        expectedChallenge: challengeRecord.challenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
      });
    } catch (err) {
      console.error('Verification failed:', err);
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VERIFICATION_FAILED', message: 'Credential verification failed' },
        },
        { status: 400 }
      );
    }

    if (!verification.verified || !verification.registrationInfo) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VERIFICATION_FAILED', message: 'Credential not verified' },
        },
        { status: 400 }
      );
    }

    const { registrationInfo } = verification;

    // Convert Uint8Array to base64url string
    const credentialIdBase64 = Buffer.from(registrationInfo.credential.id).toString('base64url');
    const publicKeyBase64 = Buffer.from(registrationInfo.credential.publicKey).toString(
      'base64url'
    );

    // Determine device type from authenticator attachment
    const deviceType =
      credential.authenticatorAttachment === 'platform'
        ? 'platform'
        : credential.authenticatorAttachment === 'cross-platform'
          ? 'cross-platform'
          : null;

    // Get transports from response
    const transports = credential.response.transports || [];

    // Store the passkey credential
    const { error: insertError } = await getSupabaseAdmin()
      .from('passkeys')
      .insert({
        account_id: account.id,
        credential_id: credentialIdBase64,
        public_key: publicKeyBase64,
        counter: registrationInfo.credential.counter,
        device_type: deviceType,
        transports: transports.length > 0 ? transports : null,
        friendly_name: friendlyName || 'My Passkey',
      });

    if (insertError) {
      console.error('Failed to store passkey:', insertError);
      // Check for duplicate
      if (insertError.code === '23505') {
        return NextResponse.json(
          {
            success: false,
            error: { code: 'DUPLICATE', message: 'This passkey is already registered' },
          },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { success: false, error: { code: 'DATABASE_ERROR', message: 'Failed to save passkey' } },
        { status: 500 }
      );
    }

    // Delete the used challenge
    await getSupabaseAdmin().from('passkey_challenges').delete().eq('id', challengeRecord.id);

    return NextResponse.json({
      success: true,
      message: 'Passkey registered successfully',
    });
  } catch (error) {
    console.error('Passkey registration complete error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
