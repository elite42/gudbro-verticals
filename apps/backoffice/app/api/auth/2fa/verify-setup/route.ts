import { getSession } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  verifyTOTPCode,
  decryptSecret,
  generateRecoveryCodesWithHashes,
  formatRecoveryCodes,
} from '@/lib/auth/totp-service';
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
// POST - Verify TOTP code and enable 2FA
// ============================================================================

export const POST = withErrorHandling(
  async (request: Request) => {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      throw new ValidationError('Verification code is required');
    }

    // Get current session
    const session = await getSession();
    if (!session?.user?.id) {
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

    // Get pending TOTP setup
    const { data: totpConfig, error: configError } = await supabaseAdmin
      .from('account_totp_secrets')
      .select('encrypted_secret, is_enabled, is_verified')
      .eq('account_id', account.id)
      .single();

    if (configError || !totpConfig) {
      throw new ValidationError('No 2FA setup in progress. Please start setup first.');
    }

    if (totpConfig.is_enabled && totpConfig.is_verified) {
      throw new ValidationError('Two-factor authentication is already enabled');
    }

    // Decrypt and verify the code
    let secret: string;
    try {
      secret = decryptSecret(totpConfig.encrypted_secret);
    } catch (decryptError) {
      throw new DatabaseError(
        'Failed to verify code. Please restart setup.',
        undefined,
        decryptError as Error
      );
    }

    const isValid = verifyTOTPCode(secret, code);

    if (!isValid) {
      throw new ValidationError('Invalid verification code. Please try again.');
    }

    // Generate recovery codes
    const { codes, hashedCodes } = generateRecoveryCodesWithHashes();
    const formattedCodes = formatRecoveryCodes(codes);

    // Enable 2FA
    const now = new Date().toISOString();
    const { error: updateError } = await supabaseAdmin
      .from('account_totp_secrets')
      .update({
        is_enabled: true,
        is_verified: true,
        enabled_at: now,
        last_used_at: now,
        recovery_codes: hashedCodes,
      })
      .eq('account_id', account.id);

    if (updateError) {
      throw new DatabaseError(
        'Failed to enable two-factor authentication',
        undefined,
        updateError as unknown as Error
      );
    }

    return successResponse({
      message: 'Two-factor authentication enabled successfully',
      recoveryCodes: formattedCodes,
      recoveryCodesWarning:
        'Save these recovery codes in a secure place. They will only be shown once!',
    });
  },
  { context: 'auth/2fa/verify-setup', logger: backofficeLogger }
);
