import { cookies } from 'next/headers';
import { getSession, createClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyTOTPCode, decryptSecret } from '@/lib/auth/totp-service';
import {
  withErrorHandling,
  successResponse,
  AuthenticationError,
  NotFoundError,
  ValidationError,
  DatabaseError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const dynamic = 'force-dynamic';

// ============================================================================
// POST - Disable 2FA (requires password + TOTP code)
// ============================================================================

export const POST = withErrorHandling(
  async (request: Request) => {
    const body = await request.json();
    const { password, code } = body;

    if (!code) {
      throw new ValidationError('Verification code is required');
    }

    // Get current session
    const session = await getSession();
    if (!session?.user?.id || !session?.user?.email) {
      throw new AuthenticationError();
    }

    // Get account for user
    const { data: account, error: accountError } = await supabaseAdmin
      .from('accounts')
      .select('id')
      .eq('auth_id', session.user.id)
      .single();

    if (accountError || !account) {
      throw new NotFoundError('Account');
    }

    // Get TOTP config
    const { data: totpConfig, error: configError } = await supabaseAdmin
      .from('account_totp_secrets')
      .select('encrypted_secret, is_enabled')
      .eq('account_id', account.id)
      .single();

    if (configError || !totpConfig) {
      throw new ValidationError('Two-factor authentication is not set up');
    }

    if (!totpConfig.is_enabled) {
      throw new ValidationError('Two-factor authentication is already disabled');
    }

    // Verify password (if provided and not dev mode)
    if (password && process.env.NODE_ENV !== 'development' && !process.env.ENABLE_DEV_AUTH) {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: session.user.email,
        password,
      });

      if (signInError) {
        throw new ValidationError('Invalid password');
      }
    }

    // Verify TOTP code
    let secret: string;
    try {
      secret = decryptSecret(totpConfig.encrypted_secret);
    } catch (decryptError) {
      throw new DatabaseError(
        'Verification failed. Please contact support.',
        undefined,
        decryptError as Error
      );
    }

    const isValid = verifyTOTPCode(secret, code);

    if (!isValid) {
      throw new ValidationError('Invalid verification code');
    }

    // Delete TOTP config (disables 2FA)
    const { error: deleteError } = await supabaseAdmin
      .from('account_totp_secrets')
      .delete()
      .eq('account_id', account.id);

    if (deleteError) {
      throw new DatabaseError(
        'Failed to disable two-factor authentication',
        undefined,
        deleteError as unknown as Error
      );
    }

    // Delete all 2FA sessions for this account
    await supabaseAdmin.from('account_2fa_sessions').delete().eq('account_id', account.id);

    // Clear 2FA verified cookie
    const cookieStore = cookies();
    cookieStore.delete('2fa_verified');

    return successResponse({
      message: 'Two-factor authentication has been disabled',
    });
  },
  { context: 'auth/2fa/disable', logger: backofficeLogger }
);
