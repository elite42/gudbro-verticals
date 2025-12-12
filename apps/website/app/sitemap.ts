import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gudbro-website.vercel.app';

  // Static pages
  const staticPages = [
    '',
    '/sign-in',
    '/sign-up',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/demo',
    '/faq',
    '/about',
    '/solutions/restaurants',
    '/solutions/hotels',
    '/solutions/airbnb',
    '/solutions/food-trucks',
  ];

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  // Future: Add dynamic pages (blog posts, solutions, etc.)
  // const blogPosts = await getBlogPosts();
  // const blogRoutes = blogPosts.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: post.updatedAt,
  //   changeFrequency: 'weekly' as const,
  //   priority: 0.6,
  // }));

  return [
    ...staticRoutes,
    // ...blogRoutes,
  ];
}
