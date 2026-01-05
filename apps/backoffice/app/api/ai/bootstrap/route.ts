import { NextRequest, NextResponse } from 'next/server';
import { bootstrapMerchant, getBootstrapData, analyzeZone, discoverCompetitors } from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/bootstrap - Get existing bootstrap data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const locationId = searchParams.get('locationId') || undefined;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    const data = await getBootstrapData(merchantId, locationId);

    return NextResponse.json({
      success: true,
      ...data,
      hasBootstrap: !!data.bootstrapResult,
    });
  } catch (error) {
    console.error('AI Bootstrap GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/bootstrap - Run full bootstrap for a location
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, locationId, action } = body;

    if (!merchantId || !locationId) {
      return NextResponse.json(
        { error: 'Missing required fields: merchantId, locationId' },
        { status: 400 }
      );
    }

    // Different actions
    if (action === 'zone_analysis') {
      const { address, city, country, latitude, longitude, businessType } = body;

      if (!address || !city || !country) {
        return NextResponse.json(
          { error: 'Missing location data for zone analysis' },
          { status: 400 }
        );
      }

      const zoneAnalysis = await analyzeZone(merchantId, locationId, {
        address,
        city,
        country,
        latitude: latitude || 0,
        longitude: longitude || 0,
        businessType,
      });

      return NextResponse.json({
        success: true,
        zoneAnalysis,
      });
    }

    if (action === 'competitors') {
      const { address, city, country, businessType } = body;

      if (!address || !city || !country) {
        return NextResponse.json(
          { error: 'Missing location data for competitor discovery' },
          { status: 400 }
        );
      }

      const competitors = await discoverCompetitors(merchantId, locationId, {
        address,
        city,
        country,
        businessType,
      });

      return NextResponse.json({
        success: true,
        competitors,
        count: competitors.length,
      });
    }

    // Default: full bootstrap
    const result = await bootstrapMerchant(merchantId, locationId);

    return NextResponse.json({
      success: true,
      bootstrap: result,
    });
  } catch (error) {
    console.error('AI Bootstrap POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message.includes('Location not found')) {
      return NextResponse.json(
        { error: 'Location not found. Please create the location first.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
