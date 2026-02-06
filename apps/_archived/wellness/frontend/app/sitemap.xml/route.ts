/**
 * Dynamic Sitemap Generator for Wellness Module
 * Auto-generates XML sitemap with services, staff, and locations
 */

import { generateWellnessSitemap } from '@/lib/seo/sitemap';

// Mock data - In production, fetch from API
const BUSINESS_DATA = {
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://danangspa.gudbro.com',
  languages: ['vi', 'en', 'ko', 'zh'],
  defaultLanguage: 'vi',
};

const MOCK_SERVICES = [
  { id: 'svc-thai', slug: 'traditional-thai-massage', updatedAt: '2025-11-06' },
  { id: 'svc-deep', slug: 'deep-tissue-massage', updatedAt: '2025-11-06' },
  { id: 'svc-facial', slug: 'korean-glass-skin-facial', updatedAt: '2025-11-06' },
  { id: 'svc-reflex', slug: 'reflexology-foot-massage', updatedAt: '2025-11-06' },
  { id: 'svc-couples', slug: 'couples-spa-package', updatedAt: '2025-11-06' },
];

const MOCK_STAFF = [
  { id: 'staff-linh', slug: 'linh-nguyen', updatedAt: '2025-11-06' },
  { id: 'staff-mai', slug: 'mai-tran', updatedAt: '2025-11-06' },
  { id: 'staff-hoa', slug: 'hoa-le', updatedAt: '2025-11-06' },
];

const MOCK_LOCATIONS = [
  { id: 'loc-city', slug: 'city-center' },
  { id: 'loc-beach', slug: 'my-khe-beach' },
];

export async function GET() {
  try {
    // In production, fetch real data:
    // const business = await fetchBusiness();
    // const services = await fetchServices();
    // const staff = await fetchStaff();
    // const locations = await fetchLocations();

    const sitemap = generateWellnessSitemap(
      BUSINESS_DATA,
      MOCK_SERVICES,
      MOCK_STAFF,
      MOCK_LOCATIONS
    );

    return new Response(sitemap, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hours
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new Response('Error generating sitemap', { status: 500 });
  }
}
