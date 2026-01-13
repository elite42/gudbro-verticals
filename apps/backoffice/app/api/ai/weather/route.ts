import { NextRequest, NextResponse } from 'next/server';
import {
  getWeatherForLocation,
  getWeatherSummaryForAI,
  getWeatherWidgetData,
} from '@/lib/ai/weather-service';

export const dynamic = 'force-dynamic';

// GET /api/ai/weather - Get weather data for a location
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locationId = searchParams.get('locationId');
    const format = searchParams.get('format'); // 'full', 'widget', 'summary'
    const forceRefresh = searchParams.get('refresh') === 'true';

    if (!locationId) {
      return NextResponse.json({ error: 'Missing required field: locationId' }, { status: 400 });
    }

    // Different formats for different use cases
    if (format === 'widget') {
      // Simple data for header widget
      const widgetData = await getWeatherWidgetData(locationId);
      if (!widgetData) {
        return NextResponse.json({ error: 'Weather data unavailable' }, { status: 503 });
      }
      return NextResponse.json(widgetData);
    }

    if (format === 'summary') {
      // Text summary for AI context
      const summary = await getWeatherSummaryForAI(locationId);
      return NextResponse.json({ summary });
    }

    // Full weather data (default)
    const weather = await getWeatherForLocation(locationId, forceRefresh);

    return NextResponse.json(weather);
  } catch (error) {
    console.error('Weather API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    // Return 503 for API-related errors (user should retry later)
    if (message.includes('API') || message.includes('fetch')) {
      return NextResponse.json(
        { error: 'Weather service temporarily unavailable', details: message },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/weather - Force refresh weather data
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { locationId } = body;

    if (!locationId) {
      return NextResponse.json({ error: 'Missing required field: locationId' }, { status: 400 });
    }

    const weather = await getWeatherForLocation(locationId, true);

    return NextResponse.json({
      success: true,
      message: 'Weather data refreshed',
      data: weather,
    });
  } catch (error) {
    console.error('Weather refresh error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
