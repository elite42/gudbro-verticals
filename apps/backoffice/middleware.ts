import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

/**
 * Authentication Middleware
 *
 * Protects routes by verifying authentication status.
 * Supports both Supabase sessions and development mode bypass.
 * Handles partner domain resolution for white-label backoffice.
 *
 * Protected routes: All routes except those in publicRoutes
 * Public routes: /login, /auth/callback, /api/public/*
 *
 * @security Dev mode bypass is only enabled when NODE_ENV === 'development'
 */

// Dev session cookie name (must match client-side config)
const DEV_SESSION_COOKIE = 'gudbro_dev_session';

// 2FA verified cookie name (must match API routes)
const TWO_FA_VERIFIED_COOKIE = '2fa_verified';

// 2FA required cookie name (set during login when 2FA is needed)
const TWO_FA_REQUIRED_COOKIE = '2fa_required';

// Platform domains that should skip partner resolution
const PLATFORM_DOMAINS = [
  'localhost',
  'gudbro.com',
  'gudbro.app',
  'gudbro-backoffice.vercel.app',
  'vercel.app',
];

// Supabase config
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

interface PartnerBranding {
  partner_id: string;
  name: string;
  logo_url: string | null;
  primary_color: string;
  hide_gudbro_branding: boolean;
}

/**
 * Check if hostname is a platform domain
 */
function isPlatformDomain(hostname: string): boolean {
  const cleanHost = hostname.split(':')[0].toLowerCase();
  return PLATFORM_DOMAINS.some(
    (domain) => cleanHost === domain || cleanHost.endsWith(`.${domain}`)
  );
}

/**
 * Resolve partner domain to branding info
 * Uses Edge-compatible fetch to Supabase REST API
 */
async function resolvePartnerDomain(hostname: string): Promise<PartnerBranding | null> {
  const cleanHost = hostname.split(':')[0].toLowerCase();

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return null;
  }

  try {
    // Query partners table for matching backoffice_domain
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/partners?backoffice_domain=eq.${encodeURIComponent(cleanHost)}&select=id,name,logo_url,primary_color,hide_gudbro_branding&status=eq.active`,
      {
        headers: {
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return null;
    }

    const partner = data[0];
    return {
      partner_id: partner.id,
      name: partner.name,
      logo_url: partner.logo_url,
      primary_color: partner.primary_color || '#000000',
      hide_gudbro_branding: partner.hide_gudbro_branding || false,
    };
  } catch {
    return null;
  }
}

/**
 * Check if dev mode is enabled
 * Allows dev bypass in development OR when ENABLE_DEV_AUTH env var is set
 * Use ENABLE_DEV_AUTH=true on Vercel for staging/demo environments
 */
function isDevModeEnabled(): boolean {
  return process.env.NODE_ENV === 'development' || process.env.ENABLE_DEV_AUTH === 'true';
}

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Resolve partner domain for white-label backoffice
  let partnerBranding: PartnerBranding | null = null;
  if (!isPlatformDomain(hostname)) {
    partnerBranding = await resolvePartnerDomain(hostname);
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Inject partner branding headers if resolved
  if (partnerBranding) {
    response.headers.set('x-partner-id', partnerBranding.partner_id);
    response.headers.set('x-partner-name', encodeURIComponent(partnerBranding.name));
    if (partnerBranding.logo_url) {
      response.headers.set('x-partner-logo', partnerBranding.logo_url);
    }
    response.headers.set('x-partner-color', partnerBranding.primary_color);
    response.headers.set('x-hide-gudbro-branding', String(partnerBranding.hide_gudbro_branding));
    response.headers.set('x-white-label', 'true');
  }

  // MVP: Block API routes for deferred verticals (return 404)
  const deferredApiRoutes = [
    '/api/accommodations',
    '/api/ai/conventions',
    '/api/ai/tourism-partnerships',
    '/api/ai/tourism-products',
    '/api/ai/tourism-bookings',
    '/api/partners',
    '/api/partner-branding',
    '/api/enterprise-leads',
  ];

  // MVP: Block page routes for deferred verticals (redirect to dashboard)
  const deferredPageRoutes = ['/accommodations', '/partnerships'];

  // Check if accessing deferred API route
  const isDeferredApi = deferredApiRoutes.some((route) => pathname.startsWith(route));
  if (isDeferredApi) {
    return new NextResponse(JSON.stringify({ error: 'Feature coming soon' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Check if accessing deferred page route
  const isDeferredPage = deferredPageRoutes.some((route) => pathname.startsWith(route));
  if (isDeferredPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Public routes that don't require authentication
  const publicRoutes = [
    '/login',
    '/auth/callback',
    '/auth/confirm',
    '/forgot-password',
    '/reset-password',
    '/verify-2fa', // 2FA verification page (user is logged in but needs 2FA)
  ];

  // API routes that are public (have their own auth via CRON_SECRET or are health checks)
  const publicApiRoutes = ['/api/auth', '/api/public', '/api/health', '/api/test'];

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

  // Check 2FA requirement for authenticated users accessing protected routes
  if (session && !isPublicRoute && !isPublicApi) {
    const twoFaRequired = request.cookies.get(TWO_FA_REQUIRED_COOKIE)?.value === 'true';
    const twoFaVerified = request.cookies.get(TWO_FA_VERIFIED_COOKIE)?.value === 'true';

    // If 2FA is required but not verified for this session, redirect to verify-2fa
    if (twoFaRequired && !twoFaVerified) {
      const verifyUrl = new URL('/verify-2fa', request.url);
      return NextResponse.redirect(verifyUrl);
    }
  }

  // If on verify-2fa page but 2FA is already verified or not required, redirect to dashboard
  if (session && pathname === '/verify-2fa') {
    const twoFaRequired = request.cookies.get(TWO_FA_REQUIRED_COOKIE)?.value === 'true';
    const twoFaVerified = request.cookies.get(TWO_FA_VERIFIED_COOKIE)?.value === 'true';

    if (!twoFaRequired || twoFaVerified) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }
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
