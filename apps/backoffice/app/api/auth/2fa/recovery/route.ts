import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  verifyRecoveryCode,
  parseRecoveryCode,
  generateRecoveryCodesWithHashes,
  formatRecoveryCodes,
} from '@/lib/auth/totp-service';

export const dynamic = 'force-dynamic';

// ============================================================================
// POST - Use a recovery code to complete 2FA
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { code, accountId: providedAccountId } = body;

    if (!code) {
      return NextResponse.json({ error: 'Recovery code is required' }, { status: 400 });
    }

    // Get current session
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get account for user
    let accountId = providedAccountId;
    if (!accountId) {
      const { data: account, error: accountError } = await supabaseAdmin
        .from('accounts')
        .select('id')
        .eq('auth_id', session.user.id)
        .single();

      if (accountError || !account) {
        return NextResponse.json({ error: 'Account not found' }, { status: 404 });
      }
      accountId = account.id;
    }

    // Get TOTP config with recovery codes
    const { data: totpConfig, error: configError } = await supabaseAdmin
      .from('account_totp_secrets')
      .select('is_enabled, is_verified, recovery_codes')
      .eq('account_id', accountId)
      .single();

    if (configError || !totpConfig) {
      return NextResponse.json(
        { error: 'Two-factor authentication is not set up' },
        { status: 400 }
      );
    }

    if (!totpConfig.is_enabled || !totpConfig.is_verified) {
      return NextResponse.json(
        { error: 'Two-factor authentication is not enabled' },
        { status: 400 }
      );
    }

    const recoveryCodes: string[] = totpConfig.recovery_codes || [];

    if (recoveryCodes.length === 0) {
      return NextResponse.json({ error: 'No recovery codes available' }, { status: 400 });
    }

    // Verify the recovery code
    const cleanCode = parseRecoveryCode(code);
    const codeIndex = verifyRecoveryCode(cleanCode, recoveryCodes);

    if (codeIndex === -1) {
      return NextResponse.json({ error: 'Invalid recovery code', success: false }, { status: 400 });
    }

    // Remove used recovery code
    const updatedCodes = [...recoveryCodes];
    updatedCodes.splice(codeIndex, 1);

    // Update recovery codes and last used timestamp
    const { error: updateError } = await supabaseAdmin
      .from('account_totp_secrets')
      .update({
        recovery_codes: updatedCodes,
        last_used_at: new Date().toISOString(),
      })
      .eq('account_id', accountId);

    if (updateError) {
      console.error('Error updating recovery codes:', updateError);
      return NextResponse.json({ error: 'Failed to process recovery code' }, { status: 500 });
    }

    // Create 2FA session record (7-day validity)
    const sessionId = session.access_token || `session_${Date.now()}_${accountId}`;
    const cookieStore = cookies();
    const userAgent = request.headers.get('user-agent') || null;
    const forwardedFor = request.headers.get('x-forwarded-for');
    const ipAddress = forwardedFor?.split(',')[0].trim() || null;

    await supabaseAdmin.from('account_2fa_sessions').upsert(
      {
        account_id: accountId,
        session_id: sessionId,
        verified_at: new Date().toISOString(),
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        user_agent: userAgent,
        ip_address: ipAddress,
      },
      { onConflict: 'account_id,session_id' }
    );

    // Set a cookie to indicate 2FA is verified for this session
    cookieStore.set('2fa_verified', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    const remainingCodes = updatedCodes.length;

    return NextResponse.json({
      success: true,
      message: 'Recovery code accepted',
      remainingRecoveryCodes: remainingCodes,
      warning:
        remainingCodes <= 2
          ? `You only have ${remainingCodes} recovery code${remainingCodes !== 1 ? 's' : ''} left. Consider regenerating them.`
          : null,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  } catch (error) {
    console.error('Error in POST /api/auth/2fa/recovery:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// PUT - Regenerate recovery codes
// ============================================================================

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        { error: 'Current TOTP code is required to regenerate recovery codes' },
        { status: 400 }
      );
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

    // Get TOTP config
    const { data: totpConfig, error: configError } = await supabaseAdmin
      .from('account_totp_secrets')
      .select('encrypted_secret, is_enabled, is_verified')
      .eq('account_id', account.id)
      .single();

    if (configError || !totpConfig) {
      return NextResponse.json(
        { error: 'Two-factor authentication is not set up' },
        { status: 400 }
      );
    }

    if (!totpConfig.is_enabled || !totpConfig.is_verified) {
      return NextResponse.json(
        { error: 'Two-factor authentication is not enabled' },
        { status: 400 }
      );
    }

    // Verify TOTP code before regenerating
    const { decryptSecret, verifyTOTPCode } = await import('@/lib/auth/totp-service');
    let secret: string;
    try {
      secret = decryptSecret(totpConfig.encrypted_secret);
    } catch (decryptError) {
      console.error('Failed to decrypt TOTP secret:', decryptError);
      return NextResponse.json(
        { error: 'Verification failed. Please contact support.' },
        { status: 500 }
      );
    }

    const isValid = verifyTOTPCode(secret, code);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid verification code', success: false },
        { status: 400 }
      );
    }

    // Generate new recovery codes
    const { codes, hashedCodes } = generateRecoveryCodesWithHashes();
    const formattedCodes = formatRecoveryCodes(codes);

    // Update recovery codes
    const { error: updateError } = await supabaseAdmin
      .from('account_totp_secrets')
      .update({
        recovery_codes: hashedCodes,
      })
      .eq('account_id', account.id);

    if (updateError) {
      console.error('Error regenerating recovery codes:', updateError);
      return NextResponse.json({ error: 'Failed to regenerate recovery codes' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Recovery codes regenerated successfully',
      recoveryCodes: formattedCodes,
      recoveryCodesWarning: 'Save these new recovery codes. Your old codes are now invalid!',
    });
  } catch (error) {
    console.error('Error in PUT /api/auth/2fa/recovery:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
