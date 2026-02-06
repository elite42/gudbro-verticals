/**
 * POST /api/auth/passkey/register/complete
 *
 * Verify WebAuthn registration response and store credential.
 */

import { verifyRegistrationResponse } from '@simplewebauthn/server';
import type { RegistrationResponseJSON } from '@simplewebauthn/types';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import {
  withErrorHandling,
  successResponse,
  AuthenticationError,
  ValidationError,
  NotFoundError,
  ConflictError,
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
const origin = process.env.NEXT_PUBLIC_ORIGIN || 'http://localhost:3004';

export const POST = withErrorHandling(async (request: Request) => {
  // Check feature flag
  if (process.env.NEXT_PUBLIC_PASSKEYS_ENABLED !== 'true') {
    throw new ExternalServiceError('Passkeys', 'Passkeys not enabled');
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
    throw new AuthenticationError('Must be logged in');
  }

  // Get account
  const { data: account, error: accountError } = await getSupabaseAdmin()
    .from('accounts')
    .select('id, email')
    .eq('auth_id', user.id)
    .single();

  if (accountError || !account) {
    throw new NotFoundError('Account');
  }

  // Parse request body
  const body = await request.json();
  const { credential, friendlyName } = body as {
    credential: RegistrationResponseJSON;
    friendlyName?: string;
  };

  if (!credential) {
    throw new ValidationError('Credential required');
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
    throw new ValidationError('Registration session expired');
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
    throw new ValidationError('Credential verification failed', {}, { cause: String(err) });
  }

  if (!verification.verified || !verification.registrationInfo) {
    throw new ValidationError('Credential not verified');
  }

  const { registrationInfo } = verification;

  // Convert Uint8Array to base64url string
  const credentialIdBase64 = Buffer.from(registrationInfo.credential.id).toString('base64url');
  const publicKeyBase64 = Buffer.from(registrationInfo.credential.publicKey).toString('base64url');

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
    // Check for duplicate
    if (insertError.code === '23505') {
      throw new ConflictError('This passkey is already registered');
    }
    throw new DatabaseError('Failed to save passkey', undefined, insertError as unknown as Error);
  }

  // Delete the used challenge
  await getSupabaseAdmin().from('passkey_challenges').delete().eq('id', challengeRecord.id);

  return successResponse({
    message: 'Passkey registered successfully',
  });
}, 'auth/passkey/register/complete');
