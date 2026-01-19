import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession, createClient } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyTOTPCode, decryptSecret } from '@/lib/auth/totp-service';

export const dynamic = 'force-dynamic';

// ============================================================================
// POST - Disable 2FA (requires password + TOTP code)
// ============================================================================

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, code } = body;

    if (!code) {
      return NextResponse.json({ error: 'Verification code is required' }, { status: 400 });
    }

    // Get current session
    const session = await getSession();
    if (!session?.user?.id || !session?.user?.email) {
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
      .select('encrypted_secret, is_enabled')
      .eq('account_id', account.id)
      .single();

    if (configError || !totpConfig) {
      return NextResponse.json(
        { error: 'Two-factor authentication is not set up' },
        { status: 400 }
      );
    }

    if (!totpConfig.is_enabled) {
      return NextResponse.json(
        { error: 'Two-factor authentication is already disabled' },
        { status: 400 }
      );
    }

    // Verify password (if provided and not dev mode)
    if (password && process.env.NODE_ENV !== 'development' && !process.env.ENABLE_DEV_AUTH) {
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: session.user.email,
        password,
      });

      if (signInError) {
        return NextResponse.json({ error: 'Invalid password' }, { status: 400 });
      }
    }

    // Verify TOTP code
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

    // Delete TOTP config (disables 2FA)
    const { error: deleteError } = await supabaseAdmin
      .from('account_totp_secrets')
      .delete()
      .eq('account_id', account.id);

    if (deleteError) {
      console.error('Error disabling 2FA:', deleteError);
      return NextResponse.json(
        { error: 'Failed to disable two-factor authentication' },
        { status: 500 }
      );
    }

    // Delete all 2FA sessions for this account
    await supabaseAdmin.from('account_2fa_sessions').delete().eq('account_id', account.id);

    // Clear 2FA verified cookie
    const cookieStore = cookies();
    cookieStore.delete('2fa_verified');

    return NextResponse.json({
      success: true,
      message: 'Two-factor authentication has been disabled',
    });
  } catch (error) {
    console.error('Error in POST /api/auth/2fa/disable:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
