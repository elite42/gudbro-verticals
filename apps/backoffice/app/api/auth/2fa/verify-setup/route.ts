import { NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  verifyTOTPCode,
  decryptSecret,
  generateRecoveryCodesWithHashes,
  formatRecoveryCodes,
} from '@/lib/auth/totp-service';

export const dynamic = 'force-dynamic';

// ============================================================================
// POST - Verify TOTP code and enable 2FA
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json({ error: 'Verification code is required' }, { status: 400 });
    }

    // Get current session
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get account for user
    const { data: account, error: accountError } = await supabaseAdmin
      .from('accounts')
      .select('id')
      .eq('auth_id', session.user.id)
      .single();

    if (accountError || !account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Get pending TOTP setup
    const { data: totpConfig, error: configError } = await supabaseAdmin
      .from('account_totp_secrets')
      .select('encrypted_secret, is_enabled, is_verified')
      .eq('account_id', account.id)
      .single();

    if (configError || !totpConfig) {
      return NextResponse.json(
        { error: 'No 2FA setup in progress. Please start setup first.' },
        { status: 400 }
      );
    }

    if (totpConfig.is_enabled && totpConfig.is_verified) {
      return NextResponse.json(
        { error: 'Two-factor authentication is already enabled' },
        { status: 400 }
      );
    }

    // Decrypt and verify the code
    let secret: string;
    try {
      secret = decryptSecret(totpConfig.encrypted_secret);
    } catch (decryptError) {
      console.error('Failed to decrypt TOTP secret:', decryptError);
      return NextResponse.json(
        { error: 'Failed to verify code. Please restart setup.' },
        { status: 500 }
      );
    }

    const isValid = verifyTOTPCode(secret, code);

    if (!isValid) {
      return NextResponse.json(
        {
          error: 'Invalid verification code. Please try again.',
          success: false,
        },
        { status: 400 }
      );
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
      console.error('Error enabling 2FA:', updateError);
      return NextResponse.json(
        { error: 'Failed to enable two-factor authentication' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Two-factor authentication enabled successfully',
      recoveryCodes: formattedCodes,
      recoveryCodesWarning:
        'Save these recovery codes in a secure place. They will only be shown once!',
    });
  } catch (error) {
    console.error('Error in POST /api/auth/2fa/verify-setup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
