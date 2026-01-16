/**
 * Geocoding Service
 *
 * Address to coordinates conversion using Nominatim (OpenStreetMap).
 * Free, no API key required, with rate limiting (1 req/sec).
 */

import { getSupabaseAdmin } from '@/lib/supabase-admin';

// Types
export interface GeocodingResult {
  latitude: number;
  longitude: number;
  display_name: string;
  address_components?: {
    city?: string;
    country?: string;
    country_code?: string;
    postal_code?: string;
  };
}

export interface BatchGeocodeResult {
  address: string;
  result: GeocodingResult | null;
  error?: string;
}

// Nominatim API URL (free, no API key)
const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';

// Rate limiting: 1 request per second for Nominatim
const RATE_LIMIT_MS = 1100; // 1.1 seconds to be safe

/**
 * Sleep utility for rate limiting
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Geocode a single address to coordinates
 */
export async function geocodeAddress(address: string): Promise<GeocodingResult | null> {
  try {
    const params = new URLSearchParams({
      q: address,
      format: 'json',
      limit: '1',
      addressdetails: '1',
    });

    const response = await fetch(`${NOMINATIM_BASE_URL}/search?${params}`, {
      headers: {
        'User-Agent': 'GUDBRO-Backoffice/1.0',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error('[Geocoding] API error:', response.status);
      return null;
    }

    const data = await response.json();

    if (!data || data.length === 0) {
      return null;
    }

    const result = data[0];
    const addr = result.address || {};

    return {
      latitude: parseFloat(result.lat),
      longitude: parseFloat(result.lon),
      display_name: result.display_name,
      address_components: {
        city: addr.city || addr.town || addr.village || addr.municipality,
        country: addr.country,
        country_code: addr.country_code?.toUpperCase(),
        postal_code: addr.postcode,
      },
    };
  } catch (error) {
    console.error('[Geocoding] Error:', error);
    return null;
  }
}

/**
 * Reverse geocode: coordinates to address
 */
export async function reverseGeocode(lat: number, lng: number): Promise<string | null> {
  try {
    const params = new URLSearchParams({
      lat: lat.toString(),
      lon: lng.toString(),
      format: 'json',
    });

    const response = await fetch(`${NOMINATIM_BASE_URL}/reverse?${params}`, {
      headers: {
        'User-Agent': 'GUDBRO-Backoffice/1.0',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      console.error('[Geocoding] Reverse API error:', response.status);
      return null;
    }

    const data = await response.json();
    return data?.display_name || null;
  } catch (error) {
    console.error('[Geocoding] Reverse error:', error);
    return null;
  }
}

/**
 * Batch geocode multiple addresses with rate limiting
 */
export async function batchGeocode(addresses: string[]): Promise<BatchGeocodeResult[]> {
  const results: BatchGeocodeResult[] = [];

  for (let i = 0; i < addresses.length; i++) {
    const address = addresses[i];

    try {
      const result = await geocodeAddress(address);
      results.push({
        address,
        result,
      });
    } catch (error) {
      results.push({
        address,
        result: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }

    // Rate limiting between requests (except last one)
    if (i < addresses.length - 1) {
      await sleep(RATE_LIMIT_MS);
    }
  }

  return results;
}

/**
 * Geocode all competitors without coordinates
 */
export async function geocodeCompetitors(
  merchantId?: string
): Promise<{ processed: number; success: number; failed: number }> {
  const supabase = getSupabaseAdmin();

  // Get competitors without coordinates
  let query = supabase
    .from('ai_competitor_profiles')
    .select('id, name, address')
    .is('latitude', null)
    .not('address', 'is', null);

  if (merchantId) {
    query = query.eq('merchant_id', merchantId);
  }

  const { data: competitors, error } = await query.limit(50); // Process in batches of 50

  if (error || !competitors) {
    console.error('[Geocoding] Error fetching competitors:', error);
    return { processed: 0, success: 0, failed: 0 };
  }

  let success = 0;
  let failed = 0;

  for (const competitor of competitors) {
    const result = await geocodeAddress(competitor.address);

    if (result) {
      const { error: updateError } = await supabase
        .from('ai_competitor_profiles')
        .update({
          latitude: result.latitude,
          longitude: result.longitude,
          geocoded_at: new Date().toISOString(),
        })
        .eq('id', competitor.id);

      if (updateError) {
        console.error(`[Geocoding] Failed to update competitor ${competitor.name}:`, updateError);
        failed++;
      } else {
        success++;
      }
    } else {
      console.log(`[Geocoding] No result for: ${competitor.address}`);
      failed++;
    }

    // Rate limiting
    await sleep(RATE_LIMIT_MS);
  }

  return {
    processed: competitors.length,
    success,
    failed,
  };
}

/**
 * Update customer location from address
 */
export async function geocodeCustomerAddress(
  accountId: string,
  address: string,
  city?: string,
  postalCode?: string,
  countryCode?: string
): Promise<boolean> {
  const supabase = getSupabaseAdmin();

  // Build full address string for geocoding
  const fullAddress = [address, city, postalCode, countryCode].filter(Boolean).join(', ');

  const result = await geocodeAddress(fullAddress);

  if (!result) {
    // Still save the text fields even without coordinates
    const { error } = await supabase
      .from('accounts')
      .update({
        delivery_address: address,
        delivery_city: city,
        delivery_postal_code: postalCode,
        delivery_country_code: countryCode,
        location_updated_at: new Date().toISOString(),
      })
      .eq('id', accountId);

    return !error;
  }

  // Save with coordinates
  const { error } = await supabase
    .from('accounts')
    .update({
      delivery_address: address,
      delivery_city: city || result.address_components?.city || result.display_name,
      delivery_postal_code: postalCode || result.address_components?.postal_code,
      delivery_country_code: countryCode || result.address_components?.country_code,
      delivery_latitude: result.latitude,
      delivery_longitude: result.longitude,
      location_updated_at: new Date().toISOString(),
    })
    .eq('id', accountId);

  if (error) {
    console.error('[Geocoding] Failed to update customer location:', error);
    return false;
  }

  return true;
}

/**
 * Calculate distance between two points (Haversine formula)
 */
export function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371000; // Earth radius in meters
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c); // Distance in meters
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

/**
 * Get location center from merchant's primary location
 * Uses merchant -> brand -> location relationship
 */
export async function getMerchantCenter(merchantId: string): Promise<{
  lat: number;
  lng: number;
  name: string;
} | null> {
  const supabase = getSupabaseAdmin();

  // First get the merchant to find associated brand
  const { data: merchant, error: merchantError } = await supabase
    .from('merchants')
    .select('id, name, slug')
    .eq('id', merchantId)
    .single();

  if (merchantError || !merchant) {
    console.error('[Geocoding] Merchant not found:', merchantId);
    return null;
  }

  // Find brand by matching name or slug
  const { data: brand } = await supabase
    .from('brands')
    .select('id')
    .or(`name.eq.${merchant.name},slug.eq.${merchant.slug}`)
    .limit(1)
    .single();

  if (!brand) {
    console.error('[Geocoding] Brand not found for merchant:', merchant.name);
    return null;
  }

  // Get first location for this brand with coordinates
  const { data: location } = await supabase
    .from('locations')
    .select('id, name, latitude, longitude')
    .eq('brand_id', brand.id)
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .limit(1)
    .single();

  if (!location || !location.latitude || !location.longitude) {
    console.error('[Geocoding] No location with coordinates for brand:', brand.id);
    return null;
  }

  return {
    lat: parseFloat(location.latitude),
    lng: parseFloat(location.longitude),
    name: location.name,
  };
}
