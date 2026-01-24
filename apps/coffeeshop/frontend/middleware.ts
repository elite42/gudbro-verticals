import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// =============================================================================
// CONSTANTS
// =============================================================================

// Platform domains that should skip resolution
const PLATFORM_DOMAINS = [
  'localhost',
  'gudbro.com',
  'gudbro.app',
  'gudbro-coffeeshop.vercel.app',
  'vercel.app',
];

// Supabase config for Edge runtime
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// =============================================================================
// TYPES
// =============================================================================

interface DomainResolution {
  entity_type: 'brand' | 'location' | 'partner';
  entity_id: string;
  brand_id: string | null;
  location_id: string | null;
  organization_id: string | null;
  partner_id: string | null;
}

// =============================================================================
// HELPERS
// =============================================================================

/**
 * Check if hostname is a platform domain (should skip resolution)
 */
function isPlatformDomain(hostname: string): boolean {
  const cleanHost = hostname.split(':')[0].toLowerCase();
  return PLATFORM_DOMAINS.some(
    (domain) => cleanHost === domain || cleanHost.endsWith(`.${domain}`)
  );
}

/**
 * Resolve custom domain to entity via Supabase RPC
 * Uses Edge-compatible fetch to Supabase REST API
 */
async function resolveDomain(hostname: string): Promise<DomainResolution | null> {
  const cleanHost = hostname.split(':')[0].toLowerCase();

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('[Middleware] Supabase config missing');
    return null;
  }

  try {
    // Call the database function via REST API
    const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/resolve_custom_domain`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ p_domain: cleanHost }),
    });

    if (!response.ok) {
      console.error('[Middleware] Domain resolution failed:', response.status);
      return null;
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return null;
    }

    return data[0] as DomainResolution;
  } catch (error) {
    console.error('[Middleware] Domain resolution error:', error);
    return null;
  }
}

// =============================================================================
// MIDDLEWARE
// =============================================================================

export async function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;
  const searchParams = request.nextUrl.searchParams;

  // Block /design-system routes in production
  if (process.env.NODE_ENV === 'production' && pathname.startsWith('/design-system')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // ==========================================================================
  // V2 REDIRECT LOGIC (Gradual Migration)
  // ==========================================================================
  // Routes to migrate: / → /v2, /menu → /v2/menu, /cart → /v2/cart
  // Opt-out: ?legacy=true sets cookie to prefer v1
  // Opt-in: ?use-v2=true forces v2 and clears legacy preference
  // ==========================================================================

  const V2_ROUTES: Record<string, string> = {
    '/': '/v2',
    '/menu': '/v2/menu',
    '/cart': '/v2/cart',
    '/favorites': '/v2/favorites',
  };

  const preferV1Cookie = request.cookies.get('prefer-v1')?.value === 'true';
  const legacyParam = searchParams.get('legacy') === 'true';
  const useV2Param = searchParams.get('use-v2') === 'true';

  // Handle opt-in to v2 (clears legacy preference)
  if (useV2Param && V2_ROUTES[pathname]) {
    const v2Url = new URL(V2_ROUTES[pathname], request.url);
    const response = NextResponse.redirect(v2Url);
    response.cookies.delete('prefer-v1');
    return response;
  }

  // Handle opt-out to v1 (sets legacy preference)
  if (legacyParam) {
    const v1Url = new URL(pathname, request.url);
    v1Url.searchParams.delete('legacy');
    const response = NextResponse.redirect(v1Url);
    response.cookies.set('prefer-v1', 'true', { maxAge: 60 * 60 * 24 * 30 }); // 30 days
    return response;
  }

  // Redirect to v2 if: route is migratable AND user hasn't opted out
  if (V2_ROUTES[pathname] && !preferV1Cookie) {
    return NextResponse.redirect(new URL(V2_ROUTES[pathname], request.url));
  }

  // Skip domain resolution for platform domains
  if (isPlatformDomain(hostname)) {
    return NextResponse.next();
  }

  // Skip for static files and API routes (they get context from headers)
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return NextResponse.next();
  }

  // Resolve custom domain to entity
  const resolution = await resolveDomain(hostname);

  if (!resolution) {
    // Domain not found - show error page or redirect to main site
    // For now, continue to let the app handle it
    const response = NextResponse.next();
    response.headers.set('x-domain-status', 'not-found');
    return response;
  }

  // Inject tenant context into request headers for downstream use
  const response = NextResponse.next();

  // Core tenant info
  response.headers.set('x-tenant-type', resolution.entity_type);
  response.headers.set('x-tenant-id', resolution.entity_id);

  // Brand/Location hierarchy
  if (resolution.brand_id) {
    response.headers.set('x-brand-id', resolution.brand_id);
  }
  if (resolution.location_id) {
    response.headers.set('x-location-id', resolution.location_id);
  }
  if (resolution.organization_id) {
    response.headers.set('x-organization-id', resolution.organization_id);
  }
  if (resolution.partner_id) {
    response.headers.set('x-partner-id', resolution.partner_id);
  }

  // Mark domain as resolved
  response.headers.set('x-domain-status', 'resolved');
  response.headers.set('x-custom-domain', hostname.split(':')[0]);

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - Static assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
