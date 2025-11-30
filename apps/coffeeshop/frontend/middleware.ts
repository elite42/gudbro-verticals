import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Block /design-system routes in production
  // Design System should only be accessible during local development
  if (
    process.env.NODE_ENV === 'production' &&
    request.nextUrl.pathname.startsWith('/design-system')
  ) {
    // Redirect to homepage
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/design-system/:path*',
};
