/**
 * Client-side API helpers for property data and availability.
 * Used by client components to fetch from API routes.
 */
import type { ApiResponse, PropertyPageData, AvailabilityResponse } from '@/types/property';

const BASE_URL = typeof window !== 'undefined' ? '' : process.env.NEXT_PUBLIC_APP_URL || '';

export async function fetchPropertyBySlug(slug: string): Promise<PropertyPageData | null> {
  const res = await fetch(`${BASE_URL}/api/property/${slug}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const json: ApiResponse<PropertyPageData> = await res.json();
  return json.data || null;
}

export async function fetchAvailability(
  slug: string,
  roomId: string
): Promise<AvailabilityResponse | null> {
  const res = await fetch(`${BASE_URL}/api/property/${slug}/availability?room_id=${roomId}`, {
    cache: 'no-store',
  });
  if (!res.ok) return null;
  const json: ApiResponse<AvailabilityResponse> = await res.json();
  return json.data || null;
}
