/**
 * POST /api/auth/passkey/authenticate/complete
 *
 * Verify WebAuthn authentication response and create session.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyAuthenticationResponse } from '@simplewebauthn/server';
import type { AuthenticationResponseJSON } from '@simplewebauthn/types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

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

    // Parse request body
    const body = await request.json();
    const { credential } = body as { credential: AuthenticationResponseJSON };

    if (!credential) {
      return NextResponse.json(
        { success: false, error: { code: 'INVALID_REQUEST', message: 'Credential required' } },
        { status: 400 }
      );
    }

    // Find the passkey by credential ID
    const credentialIdBase64 = credential.id;
    const { data: passkey, error: passkeyError } = await getSupabaseAdmin()
      .from('passkeys')
      .select('*, accounts!inner(id, auth_id, email, display_name)')
      .eq('credential_id', credentialIdBase64)
      .single();

    if (passkeyError || !passkey) {
      return NextResponse.json(
        { success: false, error: { code: 'PASSKEY_NOT_FOUND', message: 'Passkey not recognized' } },
        { status: 404 }
      );
    }

    // Get the most recent authentication challenge
    const { data: challengeRecord, error: challengeError } = await getSupabaseAdmin()
      .from('passkey_challenges')
      .select('*')
      .eq('type', 'authentication')
      .gt('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (challengeError || !challengeRecord) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'CHALLENGE_EXPIRED', message: 'Authentication session expired' },
        },
        { status: 400 }
      );
    }

    // Convert base64url public key back to Uint8Array
    const publicKey = Buffer.from(passkey.public_key, 'base64url');

    // Verify the authentication response
    let verification;
    try {
      verification = await verifyAuthenticationResponse({
        response: credential,
        expectedChallenge: challengeRecord.challenge,
        expectedOrigin: origin,
        expectedRPID: rpID,
        credential: {
          id: passkey.credential_id,
          publicKey: publicKey,
          counter: passkey.counter,
          transports: passkey.transports as AuthenticatorTransport[] | undefined,
        },
      });
    } catch (err) {
      console.error('Verification failed:', err);
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VERIFICATION_FAILED', message: 'Authentication verification failed' },
        },
        { status: 400 }
      );
    }

    if (!verification.verified) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 'VERIFICATION_FAILED', message: 'Authentication not verified' },
        },
        { status: 400 }
      );
    }

    // Update the passkey counter and last used timestamp
    const { error: updateError } = await getSupabaseAdmin()
      .from('passkeys')
      .update({
        counter: verification.authenticationInfo.newCounter,
        last_used_at: new Date().toISOString(),
      })
      .eq('id', passkey.id);

    if (updateError) {
      console.error('Failed to update counter:', updateError);
      // Continue anyway - counter update is not critical for auth
    }

    // Delete the used challenge
    await getSupabaseAdmin().from('passkey_challenges').delete().eq('id', challengeRecord.id);

    // Get the account info
    const account = passkey.accounts as {
      id: string;
      auth_id: string;
      email: string;
      display_name: string | null;
    };

    // Create a Supabase session using admin API
    // This creates a magic link session without requiring password
    const { data: sessionData, error: sessionError } =
      await getSupabaseAdmin().auth.admin.generateLink({
        type: 'magiclink',
        email: account.email,
        options: {
          redirectTo: origin,
        },
      });

    if (sessionError || !sessionData) {
      console.error('Failed to generate session:', sessionError);
      return NextResponse.json(
        { success: false, error: { code: 'SESSION_ERROR', message: 'Failed to create session' } },
        { status: 500 }
      );
    }

    // Extract the token from the magic link
    const linkUrl = new URL(
      sessionData.properties.hashed_token
        ? `${origin}/auth/callback#access_token=${sessionData.properties.hashed_token}`
        : sessionData.properties.action_link
    );

    // Return user info and redirect URL
    // The client will need to complete the magic link flow
    return NextResponse.json({
      success: true,
      verified: true,
      user: {
        id: account.id,
        email: account.email,
        displayName: account.display_name,
      },
      // Return the verification link for the client to complete auth
      authUrl: sessionData.properties.action_link,
      message: 'Authentication successful',
    });
  } catch (error) {
    console.error('Passkey authentication complete error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
