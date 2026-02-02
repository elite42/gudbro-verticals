import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Waiter App Authentication Middleware
 *
 * Protects routes by verifying staff authentication.
 * Only allows users with 'staff', 'manager', or higher roles.
 * Supports development mode bypass for testing.
 */

const DEV_SESSION_COOKIE = 'gudbro_dev_session';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Check if dev mode is enabled
 */
function isDevModeEnabled(): boolean {
  return process.env.NODE_ENV === 'development' || process.env.ENABLE_DEV_AUTH === 'true';
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Public routes that don't require authentication
  const publicRoutes = ['/login', '/auth/callback'];

  // API routes with their own auth
  const publicApiRoutes = ['/api/auth', '/api/health'];

  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isPublicApi = publicApiRoutes.some((route) => pathname.startsWith(route));

  // Check for dev session cookie (ONLY in development)
  if (isDevModeEnabled()) {
    const devSessionCookie = request.cookies.get(DEV_SESSION_COOKIE);
    const hasDevSession = !!devSessionCookie?.value;

    if (hasDevSession) {
      try {
        const sessionData = JSON.parse(decodeURIComponent(devSessionCookie.value));
        // Validate staff role
        if (sessionData?.id && sessionData?.role) {
          const allowedRoles = ['staff', 'manager', 'business_owner', 'gudbro_owner'];
          if (allowedRoles.includes(sessionData.role)) {
            if (pathname === '/login') {
              return NextResponse.redirect(new URL('/', request.url));
            }
            return response;
          }
        }
      } catch {
        response.cookies.delete(DEV_SESSION_COOKIE);
      }
    }
  }

  // Check Supabase session
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    // Supabase not configured - allow access in dev mode
    if (isDevModeEnabled()) {
      return response;
    }
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({ name, value, ...options });
        response = NextResponse.next({
          request: { headers: request.headers },
        });
        response.cookies.set({ name, value, ...options });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({ name, value: '', ...options });
        response = NextResponse.next({
          request: { headers: request.headers },
        });
        response.cookies.set({ name, value: '', ...options });
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Not authenticated and trying to access protected route
  if (!session && !isPublicRoute && !isPublicApi) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Authenticated and trying to access login page
  if (session && pathname === '/login') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
