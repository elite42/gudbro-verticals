import { generateSitemap } from '@/lib/seo/sitemap';
import { courses, products, instructors } from '@/config/gym.config';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gym.gudbro.com';

  const coursePages = courses.map(c => ({
    path: `courses/${c.slug}`,
    priority: 0.7,
    changefreq: 'weekly' as const,
  }));

  const productPages = products.map(p => ({
    path: `shop/${p.slug}`,
    priority: 0.6,
    changefreq: 'weekly' as const,
  }));

  const trainerPages = instructors.map(i => ({
    path: `courses/trainers/${i.slug}`,
    priority: 0.7,
    changefreq: 'weekly' as const,
  }));

  const sitemap = generateSitemap({
    baseUrl,
    pages: [
      { path: '', priority: 1.0, changefreq: 'daily' },
      { path: 'courses', priority: 0.9, changefreq: 'daily' },
      { path: 'passes', priority: 0.9, changefreq: 'weekly' },
      { path: 'shop', priority: 0.8, changefreq: 'weekly' },
      { path: 'account', priority: 0.5, changefreq: 'daily' },
      { path: 'register', priority: 0.8, changefreq: 'monthly' },
      { path: 'promotions', priority: 0.8, changefreq: 'weekly' },
      { path: 'search', priority: 0.6, changefreq: 'daily' },
      { path: 'info', priority: 0.7, changefreq: 'monthly' },
      ...coursePages,
      ...productPages,
      ...trainerPages,
    ],
    languages: ['en', 'vi', 'ko'],
    defaultLanguage: 'en',
  });

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
