/**
 * Google Places API Client
 *
 * Handles autocomplete and place details requests.
 * Uses the new Places API (not legacy).
 *
 * Docs: https://developers.google.com/maps/documentation/places/web-service
 */

const PLACES_API_BASE = 'https://places.googleapis.com/v1';

export interface PlaceSuggestion {
  placeId: string;
  name: string;
  address: string;
  types: string[];
}

export interface PlaceDetails {
  placeId: string;
  name: string;
  formattedAddress: string;
  latitude: number;
  longitude: number;
  types: string[];
  rating?: number;
  phoneNumber?: string;
  website?: string;
}

export interface AutocompleteOptions {
  input: string;
  type: 'lodging' | 'address';
  locationBias?: {
    lat: number;
    lng: number;
    radiusMeters?: number;
  };
  language?: string;
}

/**
 * Get autocomplete suggestions from Google Places API
 */
export async function getAutocompleteSuggestions(
  options: AutocompleteOptions
): Promise<PlaceSuggestion[]> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    console.error('[Google Places] GOOGLE_PLACES_API_KEY not configured');
    throw new Error('Google Places API key not configured');
  }

  const body: Record<string, unknown> = {
    input: options.input,
    languageCode: options.language || 'en',
  };

  // Filter by type
  if (options.type === 'lodging') {
    body.includedPrimaryTypes = ['lodging'];
  }
  // For 'address' type, we don't filter - allows any place/address

  // Location bias (prioritize results near a location)
  if (options.locationBias) {
    body.locationBias = {
      circle: {
        center: {
          latitude: options.locationBias.lat,
          longitude: options.locationBias.lng,
        },
        radius: options.locationBias.radiusMeters || 50000, // 50km default
      },
    };
  }

  const response = await fetch(`${PLACES_API_BASE}/places:autocomplete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('[Google Places] Autocomplete error:', error);
    throw new Error(`Google Places API error: ${response.status}`);
  }

  const data = await response.json();

  // Transform response to our format
  const suggestions: PlaceSuggestion[] = (data.suggestions || []).map(
    (s: {
      placePrediction?: {
        placeId: string;
        structuredFormat?: {
          mainText?: { text: string };
          secondaryText?: { text: string };
        };
        types?: string[];
      };
    }) => ({
      placeId: s.placePrediction?.placeId || '',
      name: s.placePrediction?.structuredFormat?.mainText?.text || '',
      address: s.placePrediction?.structuredFormat?.secondaryText?.text || '',
      types: s.placePrediction?.types || [],
    })
  );

  return suggestions;
}

/**
 * Get place details from Google Places API
 */
export async function getPlaceDetails(placeId: string): Promise<PlaceDetails> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    console.error('[Google Places] GOOGLE_PLACES_API_KEY not configured');
    throw new Error('Google Places API key not configured');
  }

  const fields = [
    'id',
    'displayName',
    'formattedAddress',
    'location',
    'types',
    'rating',
    'nationalPhoneNumber',
    'websiteUri',
  ].join(',');

  const response = await fetch(`${PLACES_API_BASE}/places/${placeId}?fields=${fields}`, {
    headers: {
      'X-Goog-Api-Key': apiKey,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    console.error('[Google Places] Details error:', error);
    throw new Error(`Google Places API error: ${response.status}`);
  }

  const data = await response.json();

  return {
    placeId: data.id || placeId,
    name: data.displayName?.text || '',
    formattedAddress: data.formattedAddress || '',
    latitude: data.location?.latitude || 0,
    longitude: data.location?.longitude || 0,
    types: data.types || [],
    rating: data.rating,
    phoneNumber: data.nationalPhoneNumber,
    website: data.websiteUri,
  };
}
