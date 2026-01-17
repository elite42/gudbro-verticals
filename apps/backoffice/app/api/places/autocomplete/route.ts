/**
 * Google Places Autocomplete API Proxy
 *
 * POST /api/places/autocomplete
 *
 * Proxies requests to Google Places API to hide the API key from client.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAutocompleteSuggestions } from '@/lib/google-places';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { input, type, locationBias, language } = body;

    // Validate input
    if (!input || typeof input !== 'string') {
      return NextResponse.json({ error: 'Input is required' }, { status: 400 });
    }

    if (input.length < 2) {
      return NextResponse.json({ suggestions: [] });
    }

    // Validate type
    if (type && !['lodging', 'address'].includes(type)) {
      return NextResponse.json(
        { error: 'Invalid type. Must be "lodging" or "address"' },
        { status: 400 }
      );
    }

    const suggestions = await getAutocompleteSuggestions({
      input,
      type: type || 'address',
      locationBias,
      language,
    });

    return NextResponse.json({ suggestions });
  } catch (error) {
    console.error('[Places Autocomplete] Error:', error);

    // Check if it's an API key issue
    if (error instanceof Error && error.message.includes('not configured')) {
      return NextResponse.json({ error: 'Places API not configured' }, { status: 503 });
    }

    return NextResponse.json({ error: 'Failed to fetch suggestions' }, { status: 500 });
  }
}
