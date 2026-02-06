import { cookies } from 'next/headers';
import { getSession } from '@/lib/supabase-server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { verifyTOTPCode, decryptSecret } from '@/lib/auth/totp-service';
import {
  withErrorHandling,
  successResponse,
  AuthenticationError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  DatabaseError,
  backofficeLogger,
} from '@/lib/api/error-handler';

export const dynamic = 'force-dynamic';

// Rate limiting: max 5 attempts per session
const RATE_LIMIT_ATTEMPTS = 5;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes

// In-memory rate limit store (in production, use Redis)
const rateLimitStore = new Map<string, { attempts: number; firstAttempt: number }>();

function checkRateLimit(accountId: string): {
  allowed: boolean;
  remaining: number;
} {
  const now = Date.now();
  const record = rateLimitStore.get(accountId);

  if (!record || now - record.firstAttempt > RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(accountId, { attempts: 1, firstAttempt: now });
    return { allowed: true, remaining: RATE_LIMIT_ATTEMPTS - 1 };
  }

  if (record.attempts >= RATE_LIMIT_ATTEMPTS) {
    return { allowed: false, remaining: 0 };
  }

  record.attempts++;
  return { allowed: true, remaining: RATE_LIMIT_ATTEMPTS - record.attempts };
}

function resetRateLimit(accountId: string) {
  rateLimitStore.delete(accountId);
}

// ============================================================================
// POST - Verify TOTP code during login
// ============================================================================

export const POST = withErrorHandling(
  async (request: Request) => {
    const body = await request.json();
    const { code, accountId: providedAccountId } = body;

    if (!code) {
      throw new ValidationError('Verification code is required');
    }

    // Get current session
    const session = await getSession();
    if (!session?.user?.id) {
      throw new AuthenticationError();
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
        throw new NotFoundError('Account');
      }
      accountId = account.id;
    }

    // Check rate limit
    const rateLimit = checkRateLimit(accountId);
    if (!rateLimit.allowed) {
      throw new RateLimitError('Too many attempts. Please wait 15 minutes.', 15 * 60);
    }

    // Get TOTP config
    const { data: totpConfig, error: configError } = await supabaseAdmin
      .from('account_totp_secrets')
      .select('encrypted_secret, is_enabled, is_verified')
      .eq('account_id', accountId)
      .single();

    if (configError || !totpConfig) {
      throw new ValidationError('Two-factor authentication is not set up');
    }

    if (!totpConfig.is_enabled || !totpConfig.is_verified) {
      throw new ValidationError('Two-factor authentication is not enabled');
    }

    // Decrypt and verify the code
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

    // Reset rate limit on success
    resetRateLimit(accountId);

    // Update last used timestamp
    await supabaseAdmin
      .from('account_totp_secrets')
      .update({ last_used_at: new Date().toISOString() })
      .eq('account_id', accountId);

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

    return successResponse({
      message: 'Two-factor authentication verified',
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
  },
  { context: 'auth/2fa/verify', logger: backofficeLogger }
);

// ============================================================================
// GET - Check if 2FA verification is needed for current session
// ============================================================================

interface TwoFactorStatusData {
  twoFactorRequired: boolean;
  twoFactorVerified?: boolean;
  reason?: string;
  verifiedAt?: string;
  expiresAt?: string;
}

export const GET = withErrorHandling<TwoFactorStatusData>(
  async () => {
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

    // Check if 2FA is enabled for this account
    const { data: totpConfig } = await supabaseAdmin
      .from('account_totp_secrets')
      .select('is_enabled, is_verified')
      .eq('account_id', account.id)
      .single();

    if (!totpConfig?.is_enabled || !totpConfig?.is_verified) {
      return successResponse({
        twoFactorRequired: false,
        reason: '2FA not enabled for this account',
      });
    }

    // Check if there's a valid 2FA session
    const sessionId = session.access_token || '';
    const { data: twoFaSession } = await supabaseAdmin
      .from('account_2fa_sessions')
      .select('verified_at, expires_at')
      .eq('account_id', account.id)
      .eq('session_id', sessionId)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (twoFaSession) {
      return successResponse({
        twoFactorRequired: false,
        twoFactorVerified: true,
        verifiedAt: twoFaSession.verified_at,
        expiresAt: twoFaSession.expires_at,
      });
    }

    // 2FA is required but not verified for this session
    return successResponse({
      twoFactorRequired: true,
      twoFactorVerified: false,
    });
  },
  { context: 'auth/2fa/verify', logger: backofficeLogger }
);
