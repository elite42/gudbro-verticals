/**
 * Google Places Details API Proxy
 *
 * GET /api/places/details?placeId=xxx
 *
 * Proxies requests to Google Places API to hide the API key from client.
 */

import { NextRequest, NextResponse } from 'next/server';
import { getPlaceDetails } from '@/lib/google-places';

export async function GET(request: NextRequest) {
  try {
    const placeId = request.nextUrl.searchParams.get('placeId');

    // Validate placeId
    if (!placeId) {
      return NextResponse.json({ error: 'placeId is required' }, { status: 400 });
    }

    const details = await getPlaceDetails(placeId);

    return NextResponse.json({ place: details });
  } catch (error) {
    console.error('[Places Details] Error:', error);

    // Check if it's an API key issue
    if (error instanceof Error && error.message.includes('not configured')) {
      return NextResponse.json({ error: 'Places API not configured' }, { status: 503 });
    }

    return NextResponse.json({ error: 'Failed to fetch place details' }, { status: 500 });
  }
}
