import { NextResponse } from 'next/server';
import { getSession } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { generateTOTPSecret, encryptSecret, isTOTPConfigured } from '@/lib/auth/totp-service';
import QRCode from 'qrcode';

export const dynamic = 'force-dynamic';

// ============================================================================
// GET - Check 2FA status for current user
// ============================================================================

export async function GET() {
  try {
    // Check if TOTP encryption is configured
    if (!isTOTPConfigured()) {
      return NextResponse.json(
        {
          error: 'Two-factor authentication is not configured on this server',
          configured: false,
        },
        { status: 503 }
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
      .select('id, email')
      .eq('auth_id', session.user.id)
      .single();

    if (accountError || !account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Check if 2FA is already set up
    const { data: totpConfig } = await supabaseAdmin
      .from('account_totp_secrets')
      .select('is_enabled, is_verified, created_at, enabled_at, last_used_at')
      .eq('account_id', account.id)
      .single();

    return NextResponse.json({
      configured: true,
      twoFactorEnabled: totpConfig?.is_enabled ?? false,
      twoFactorVerified: totpConfig?.is_verified ?? false,
      enabledAt: totpConfig?.enabled_at ?? null,
      lastUsedAt: totpConfig?.last_used_at ?? null,
    });
  } catch (error) {
    console.error('Error in GET /api/auth/2fa/setup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================================
// POST - Start 2FA setup (generate secret and QR code)
// ============================================================================

export async function POST() {
  try {
    // Check if TOTP encryption is configured
    if (!isTOTPConfigured()) {
      return NextResponse.json(
        { error: 'Two-factor authentication is not configured on this server' },
        { status: 503 }
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
      .select('id, email')
      .eq('auth_id', session.user.id)
      .single();

    if (accountError || !account) {
      return NextResponse.json({ error: 'Account not found' }, { status: 404 });
    }

    // Check if 2FA is already enabled
    const { data: existingConfig } = await supabaseAdmin
      .from('account_totp_secrets')
      .select('is_enabled')
      .eq('account_id', account.id)
      .single();

    if (existingConfig?.is_enabled) {
      return NextResponse.json(
        { error: 'Two-factor authentication is already enabled' },
        { status: 400 }
      );
    }

    // Generate new TOTP secret
    const email = account.email || session.user.email || 'user@gudbro.com';
    const { secret, otpauth } = generateTOTPSecret(email);

    // Encrypt secret for storage
    const encryptedSecret = encryptSecret(secret);

    // Generate QR code as data URL
    const qrCodeDataUrl = await QRCode.toDataURL(otpauth, {
      width: 256,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    });

    // Store the pending setup (not yet verified/enabled)
    const { error: upsertError } = await supabaseAdmin.from('account_totp_secrets').upsert(
      {
        account_id: account.id,
        encrypted_secret: encryptedSecret,
        is_enabled: false,
        is_verified: false,
        recovery_codes: [],
        created_at: new Date().toISOString(),
      },
      { onConflict: 'account_id' }
    );

    if (upsertError) {
      console.error('Error saving TOTP setup:', upsertError);
      return NextResponse.json({ error: 'Failed to initialize 2FA setup' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      qrCode: qrCodeDataUrl,
      manualEntryKey: secret, // For manual entry if QR scan fails
      message: 'Scan the QR code with your authenticator app, then verify with a code',
    });
  } catch (error) {
    console.error('Error in POST /api/auth/2fa/setup:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
