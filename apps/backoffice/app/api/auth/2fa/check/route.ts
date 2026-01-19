import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getSession } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

// ============================================================================
// GET - Check if 2FA is required for the current session
// ============================================================================
// This endpoint should be called after successful login to determine
// if the user needs to complete 2FA verification

export async function GET() {
  try {
    // Get current session
    const session = await getSession();
    if (!session?.user?.id) {
      return NextResponse.json(
        { twoFactorRequired: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get account for user
    const { data: account, error: accountError } = await supabaseAdmin
      .from('accounts')
      .select('id')
      .eq('auth_id', session.user.id)
      .single();

    if (accountError || !account) {
      // No account means no 2FA
      return NextResponse.json({
        twoFactorRequired: false,
        reason: 'Account not found',
      });
    }

    // Check if 2FA is enabled for this account
    const { data: totpConfig } = await supabaseAdmin
      .from('account_totp_secrets')
      .select('is_enabled, is_verified')
      .eq('account_id', account.id)
      .single();

    const twoFactorEnabled = totpConfig?.is_enabled && totpConfig?.is_verified;

    // Set the 2fa_required cookie based on the account's 2FA status
    const cookieStore = cookies();

    if (twoFactorEnabled) {
      // Check if there's already a valid 2FA session
      const sessionId = session.access_token || '';
      const { data: twoFaSession } = await supabaseAdmin
        .from('account_2fa_sessions')
        .select('expires_at')
        .eq('account_id', account.id)
        .eq('session_id', sessionId)
        .gt('expires_at', new Date().toISOString())
        .single();

      if (twoFaSession) {
        // 2FA already verified for this session
        cookieStore.set('2fa_required', 'true', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: '/',
        });
        cookieStore.set('2fa_verified', 'true', {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax',
          maxAge: 7 * 24 * 60 * 60, // 7 days
          path: '/',
        });

        return NextResponse.json({
          twoFactorRequired: true,
          twoFactorVerified: true,
          expiresAt: twoFaSession.expires_at,
        });
      }

      // 2FA is required but not yet verified
      cookieStore.set('2fa_required', 'true', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60, // 1 hour (until they verify)
        path: '/',
      });
      // Ensure 2fa_verified is cleared
      cookieStore.delete('2fa_verified');

      return NextResponse.json({
        twoFactorRequired: true,
        twoFactorVerified: false,
        redirectTo: '/verify-2fa',
      });
    }

    // 2FA not enabled - clear any 2FA cookies
    cookieStore.delete('2fa_required');
    cookieStore.delete('2fa_verified');

    return NextResponse.json({
      twoFactorRequired: false,
      twoFactorVerified: false,
    });
  } catch (error) {
    console.error('Error in GET /api/auth/2fa/check:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
