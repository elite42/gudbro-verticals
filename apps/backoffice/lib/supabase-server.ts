import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

// Dev session configuration (must match client-side)
const DEV_SESSION_COOKIE = 'gudbro_dev_session';

/**
 * Check if dev mode is enabled (server-side)
 */
function isDevModeEnabled(): boolean {
  return process.env.NODE_ENV === 'development' || process.env.ENABLE_DEV_AUTH === 'true';
}

/**
 * Create Supabase client for Server Components
 * Use this in Server Components and Server Actions
 */
export function createClient() {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // Handle cookies in Server Components (read-only)
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // Handle cookies in Server Components (read-only)
          }
        },
      },
    }
  );
}

/**
 * Check for valid dev session cookie
 * Returns parsed dev session data or null
 */
function getDevSessionFromCookie(): { id: string; email: string; role: string } | null {
  if (!isDevModeEnabled()) {
    return null;
  }

  const cookieStore = cookies();
  const devCookie = cookieStore.get(DEV_SESSION_COOKIE);

  if (!devCookie?.value) {
    return null;
  }

  try {
    const sessionData = JSON.parse(decodeURIComponent(devCookie.value));
    if (sessionData?.id && sessionData?.role) {
      return sessionData;
    }
  } catch {
    // Invalid cookie data
  }

  return null;
}

/**
 * Get current user session
 * Supports both Supabase auth and dev mode sessions
 * Returns null if not authenticated
 */
export async function getSession() {
  // Check dev session first (in dev mode)
  const devSession = getDevSessionFromCookie();
  if (devSession) {
    // Return a mock session object for dev mode
    // This allows API routes to work with dev accounts
    return {
      access_token: 'dev-mode-token',
      token_type: 'bearer',
      expires_in: 3600,
      expires_at: Math.floor(Date.now() / 1000) + 3600,
      refresh_token: 'dev-mode-refresh',
      user: {
        id: devSession.id,
        email: devSession.email,
        role: devSession.role,
        aud: 'authenticated',
        created_at: new Date().toISOString(),
        app_metadata: { provider: 'dev' },
        user_metadata: { role: devSession.role },
      },
    } as unknown as Awaited<
      ReturnType<ReturnType<typeof createClient>['auth']['getSession']>
    >['data']['session'];
  }

  // Fall back to Supabase auth
  const supabase = createClient();
  try {
    const {
      data: { session },
      error,
    } = await supabase.auth.getSession();
    if (error) {
      console.error('Error getting session:', error.message);
      return null;
    }
    return session;
  } catch (error) {
    console.error('Session error:', error);
    return null;
  }
}

/**
 * Get current user
 * Supports both Supabase auth and dev mode sessions
 * Returns null if not authenticated
 */
export async function getUser() {
  // Check dev session first (in dev mode)
  const devSession = getDevSessionFromCookie();
  if (devSession) {
    // Return a mock user object for dev mode
    return {
      id: devSession.id,
      email: devSession.email,
      role: devSession.role,
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      app_metadata: { provider: 'dev' },
      user_metadata: { role: devSession.role },
    } as unknown as Awaited<
      ReturnType<ReturnType<typeof createClient>['auth']['getUser']>
    >['data']['user'];
  }

  // Fall back to Supabase auth
  const supabase = createClient();
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (error) {
      console.error('Error getting user:', error.message);
      return null;
    }
    return user;
  } catch (error) {
    console.error('User error:', error);
    return null;
  }
}
