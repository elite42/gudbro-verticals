/**
 * Dynamic Sitemap Generator for Rentals Module
 * Auto-generates XML sitemap with fleet items and locations
 */

import { generateRentalsSitemap } from '@/lib/seo/sitemap';

// Mock data - In production, fetch from API
const BUSINESS_DATA = {
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://danangbikes.gudbro.com',
  languages: ['vi', 'en', 'ko', 'zh'],
  defaultLanguage: 'vi'
};

const MOCK_FLEET = [
  { id: 'honda-wave', slug: 'honda-wave-alpha', updatedAt: '2025-11-06' },
  { id: 'honda-vision', slug: 'honda-vision', updatedAt: '2025-11-06' },
  { id: 'yamaha-exciter', slug: 'yamaha-exciter-150', updatedAt: '2025-11-06' },
  { id: 'vinfast-evo', slug: 'vinfast-evo-200', updatedAt: '2025-11-06' },
  { id: 'giant-atx', slug: 'giant-atx-bicycle', updatedAt: '2025-11-06' },
  { id: 'trek-fx', slug: 'trek-fx-bicycle', updatedAt: '2025-11-06' }
];

const MOCK_LOCATIONS = [
  { id: 'city-center', slug: 'da-nang-city-center' },
  { id: 'an-thuong', slug: 'an-thuong-beach' }
];

export async function GET() {
  try {
    // In production, fetch real data:
    // const business = await fetchBusiness();
    // const fleet = await fetchFleet();
    // const locations = await fetchLocations();

    const sitemap = generateRentalsSitemap(
      BUSINESS_DATA,
      MOCK_FLEET,
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
