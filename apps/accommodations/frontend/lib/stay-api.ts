import type { ServiceCategoryResponse, DealResponse, PropertyInfo, WifiInfo } from '@/types/stay';

/**
 * Generic result type for all stay API calls.
 */
interface FetchResult<T> {
  data: T | null;
  error: string | null;
}

/**
 * Generic fetch wrapper for authenticated stay API routes.
 *
 * Sends GET request with Bearer token in Authorization header.
 * Returns { data, error } shape for consistent error handling.
 */
async function fetchStayAPI<T>(path: string, token: string): Promise<FetchResult<T>> {
  try {
    const res = await fetch(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      const json = await res.json().catch(() => ({}));
      return {
        data: null,
        error: json.error || `Request failed (${res.status})`,
      };
    }

    const json = await res.json();

    if (json.error) {
      return { data: null, error: json.error };
    }

    return { data: json.data as T, error: null };
  } catch {
    return { data: null, error: 'Network error. Please check your connection.' };
  }
}

/**
 * Fetch service categories with items for a stay.
 * GET /api/stay/[code]/services
 */
export function fetchServices(
  code: string,
  token: string
): Promise<FetchResult<ServiceCategoryResponse>> {
  return fetchStayAPI<ServiceCategoryResponse>(`/api/stay/${code}/services`, token);
}

/**
 * Fetch local deals for a stay.
 * GET /api/stay/[code]/deals
 */
export function fetchDeals(code: string, token: string): Promise<FetchResult<DealResponse[]>> {
  return fetchStayAPI<DealResponse[]>(`/api/stay/${code}/deals`, token);
}

/**
 * Fetch property info and WiFi credentials for a stay.
 * GET /api/stay/[code]/property
 */
export function fetchProperty(
  code: string,
  token: string
): Promise<FetchResult<{ property: PropertyInfo; wifi: WifiInfo }>> {
  return fetchStayAPI<{ property: PropertyInfo; wifi: WifiInfo }>(
    `/api/stay/${code}/property`,
    token
  );
}

/**
 * Fetch useful numbers (emergency, local services) for a stay.
 * GET /api/stay/[code]/useful-numbers
 *
 * Note: This route will be implemented in a future phase.
 * The wrapper is ready for when the API route exists.
 */
export function fetchUsefulNumbers(
  code: string,
  token: string
): Promise<FetchResult<UsefulNumbersResponse>> {
  return fetchStayAPI<UsefulNumbersResponse>(`/api/stay/${code}/useful-numbers`, token);
}

/**
 * Useful numbers response type.
 * Defined here until the API route is built and types are added to stay.ts.
 */
export interface UsefulNumbersResponse {
  numbers: UsefulNumber[];
}

export interface UsefulNumber {
  id: string;
  category: string;
  name: string;
  number: string;
  icon: string | null;
  sortOrder: number;
}
