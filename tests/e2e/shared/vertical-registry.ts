/**
 * Vertical Registry — single source of truth for all PWA vertical configs.
 *
 * Used by Playwright projects and shared fixtures to map verticals
 * to their dev server port, base URL, pnpm filter, and key routes.
 */

export interface VerticalConfig {
  name: string;
  slug: string;
  port: number;
  baseURL: string;
  pnpmFilter: string;
  routes: {
    home: string;
    [key: string]: string;
  };
}

export const VERTICALS: Record<string, VerticalConfig> = {
  coffeeshop: {
    name: 'Coffeeshop',
    slug: 'coffeeshop',
    port: 3004,
    baseURL: 'http://localhost:3004',
    pnpmFilter: '@gudbro/coffeeshop',
    routes: { home: '/' },
  },
  accommodations: {
    name: 'Accommodations',
    slug: 'accommodations',
    port: 3028,
    baseURL: 'http://localhost:3028',
    pnpmFilter: '@gudbro/accommodations-frontend',
    routes: { home: '/' },
  },
  tours: {
    name: 'Tours',
    slug: 'tours',
    port: 3026,
    baseURL: 'http://localhost:3026',
    pnpmFilter: '@gudbro/tours-frontend',
    routes: { home: '/' },
  },
  wellness: {
    name: 'Wellness',
    slug: 'wellness',
    port: 3003,
    baseURL: 'http://localhost:3003',
    pnpmFilter: '@gudbro/wellness-frontend',
    routes: { home: '/', services: '/services', staff: '/staff' },
  },
  laundry: {
    name: 'Laundry',
    slug: 'laundry',
    port: 3030,
    baseURL: 'http://localhost:3030',
    pnpmFilter: '@gudbro/laundry-frontend',
    routes: { home: '/', services: '/services' },
  },
  pharmacy: {
    name: 'Pharmacy',
    slug: 'pharmacy',
    port: 3031,
    baseURL: 'http://localhost:3031',
    pnpmFilter: '@gudbro/pharmacy-frontend',
    routes: { home: '/', products: '/products', search: '/search' },
  },
  workshops: {
    name: 'Workshops',
    slug: 'workshops',
    port: 3032,
    baseURL: 'http://localhost:3032',
    pnpmFilter: '@gudbro/workshops-frontend',
    routes: { home: '/', workshops: '/workshops' },
  },
  gym: {
    name: 'Gym',
    slug: 'gym',
    port: 3033,
    baseURL: 'http://localhost:3033',
    pnpmFilter: '@gudbro/gym-frontend',
    routes: { home: '/', courses: '/courses', passes: '/passes' },
  },
};

export const VERTICAL_SLUGS = Object.keys(VERTICALS) as Array<keyof typeof VERTICALS>;
