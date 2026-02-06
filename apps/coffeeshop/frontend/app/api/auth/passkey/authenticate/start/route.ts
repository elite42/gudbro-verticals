/**
 * POST /api/auth/passkey/authenticate/start
 *
 * Generate WebAuthn authentication options.
 * Does not require user to be logged in - this is for passwordless login.
 */

import { generateAuthenticationOptions } from '@simplewebauthn/server';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import {
  withErrorHandling,
  successResponse,
  DatabaseError,
  ExternalServiceError,
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

// Relying Party configuration
const rpID = process.env.NEXT_PUBLIC_RP_ID || 'localhost';

export const POST = withErrorHandling(async (request: Request) => {
  // Check feature flag
  if (process.env.NEXT_PUBLIC_PASSKEYS_ENABLED !== 'true') {
    throw new ExternalServiceError('Passkeys', 'Passkeys not enabled');
  }

  // Parse request body
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    // Empty body is acceptable for this route
  }
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
      email: (email as string) || 'anonymous@passkey.local',
      challenge: options.challenge,
      type: 'authentication',
    });

  if (challengeError) {
    throw new DatabaseError(
      'Failed to create challenge',
      undefined,
      challengeError as unknown as Error
    );
  }

  return successResponse(options);
}, 'auth/passkey/authenticate/start');
