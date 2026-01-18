/**
 * POST /api/auth/passkey/authenticate/start
 *
 * Generate WebAuthn authentication options.
 * Does not require user to be logged in - this is for passwordless login.
 */

import { NextRequest, NextResponse } from 'next/server';
import { generateAuthenticationOptions } from '@simplewebauthn/server';
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
    const body = await request.json().catch(() => ({}));
    const { email } = body;

    // If email provided, get passkeys for that user to show as hints
    let allowCredentials: { id: string; transports?: AuthenticatorTransport[] }[] = [];

    if (email) {
      // Get account by email
      const { data: account } = await getSupabaseAdmin()
        .from('accounts')
        .select('id')
        .eq('email', email)
        .single();

      if (account) {
        // Get passkeys for this account
        const { data: passkeys } = await getSupabaseAdmin()
          .from('passkeys')
          .select('credential_id, transports')
          .eq('account_id', account.id);

        allowCredentials = (passkeys || []).map((p) => ({
          id: p.credential_id,
          transports: (p.transports as AuthenticatorTransport[]) || ['internal', 'hybrid'],
        }));
      }
    }

    // Generate authentication options
    // If no allowCredentials, browser will show all available passkeys
    const options = await generateAuthenticationOptions({
      rpID,
      userVerification: 'preferred',
      // Only include allowCredentials if we have them
      ...(allowCredentials.length > 0 && { allowCredentials }),
      // 60 second timeout
      timeout: 60000,
    });

    // Store challenge in database for verification
    // For discoverable credentials (no email provided), use placeholder to satisfy constraint
    const { error: challengeError } = await getSupabaseAdmin()
      .from('passkey_challenges')
      .insert({
        email: email || 'anonymous@passkey.local',
        challenge: options.challenge,
        type: 'authentication',
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
    console.error('Passkey authentication start error:', error);
    return NextResponse.json(
      { success: false, error: { code: 'INTERNAL_ERROR', message: 'Internal server error' } },
      { status: 500 }
    );
  }
}
