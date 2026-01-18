import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Auth Callback Handler for Coffeeshop PWA
 *
 * Handles:
 * - OAuth provider redirects (Google, Apple, Facebook)
 * - Email confirmation links
 * - Password reset links
 *
 * Exchanges the auth code for a session and redirects appropriately.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const next = searchParams.get('next') || '/account';
  const type = searchParams.get('type'); // 'recovery' for password reset

  if (code) {
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

    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data.session) {
      console.log('Auth callback success for user:', data.user?.email);

      // Handle password reset redirect
      if (type === 'recovery') {
        return NextResponse.redirect(`${origin}/auth/reset-password`);
      }

      // Normal auth flow - redirect to account or specified page
      return NextResponse.redirect(`${origin}${next}`);
    }

    console.error('Auth callback error:', error?.message, error?.status, error);
  } else {
    console.error('Auth callback: No code provided in URL');
  }

  // Return to account page with error
  return NextResponse.redirect(`${origin}/account?error=auth_callback_error`);
}
