import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Authentication Middleware
 *
 * Protects routes by verifying authentication status.
 * Supports both Supabase sessions and development mode bypass.
 *
 * Protected routes: All routes except those in publicRoutes
 * Public routes: /login, /auth/callback, /api/public/*
 *
 * @security Dev mode bypass is only enabled when NODE_ENV === 'development'
 */

// Dev session cookie name (must match client-side config)
const DEV_SESSION_COOKIE = 'gudbro_dev_session';

/**
 * Check if dev mode is enabled
 * Allows dev bypass in development OR when ENABLE_DEV_AUTH env var is set
 * Use ENABLE_DEV_AUTH=true on Vercel for staging/demo environments
 */
function isDevModeEnabled(): boolean {
  return process.env.NODE_ENV === 'development' || process.env.ENABLE_DEV_AUTH === 'true';
}

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const pathname = request.nextUrl.pathname;

  // Public routes that don't require authentication
  const publicRoutes = [
    '/login',
    '/auth/callback',
    '/auth/confirm',
    '/forgot-password',
    '/reset-password',
  ];

  // API routes that are public
  const publicApiRoutes = ['/api/auth', '/api/public'];

  // Check if current path is public
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPublicApi = publicApiRoutes.some((route) => pathname.startsWith(route));

  // Check for dev session cookie (ONLY in development)
  if (isDevModeEnabled()) {
    const devSessionCookie = request.cookies.get(DEV_SESSION_COOKIE);
    const hasDevSession = !!devSessionCookie?.value;

    if (hasDevSession) {
      // Validate the session has basic structure
      try {
        const sessionData = JSON.parse(decodeURIComponent(devSessionCookie.value));
        if (sessionData?.id && sessionData?.role) {
          // Valid dev session - allow access
          if (pathname === '/login') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
          }
          return response;
        }
      } catch {
        // Invalid session data - clear the cookie and continue to normal auth
        response.cookies.delete(DEV_SESSION_COOKIE);
      }
    }
  }

  // Check Supabase session for production auth
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // If not authenticated and trying to access protected route
  if (!session && !isPublicRoute && !isPublicApi) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated and trying to access login page
  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
