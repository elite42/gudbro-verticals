/**
 * robots.txt Generator for Wellness Module
 * Configures search engine crawling rules
 */

import { generateProductionRobots, generateDevelopmentRobots } from '@/lib/seo/robots';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://danangspa.gudbro.com';
const isProduction = process.env.NODE_ENV === 'production';

export async function GET() {
  const robots = isProduction
    ? generateProductionRobots(baseUrl)
    : generateDevelopmentRobots();

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400', // 24 hours
    },
  });
}
