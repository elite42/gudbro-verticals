import { generateProductionRobots } from '@/lib/seo/robots';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gym.gudbro.com';
  const robots = generateProductionRobots(baseUrl);

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
