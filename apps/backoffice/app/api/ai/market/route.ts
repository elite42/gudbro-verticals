import { NextRequest, NextResponse } from 'next/server';
import {
  analyzePricing,
  discoverPartnerships,
  getMarketTrends,
  getMarketIntelligence,
  updatePartnershipStatus,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/market - Get market intelligence data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    const data = await getMarketIntelligence(merchantId);

    return NextResponse.json({
      success: true,
      ...data,
    });
  } catch (error) {
    console.error('AI Market GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/market - Run market analysis
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action, ...params } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'pricing': {
        const { items, city, country, businessType, priceSegment } = params;

        if (!items || !Array.isArray(items) || items.length === 0) {
          return NextResponse.json(
            { error: 'Missing or invalid items array for pricing analysis' },
            { status: 400 }
          );
        }

        if (!city || !country) {
          return NextResponse.json(
            { error: 'Missing city or country for pricing analysis' },
            { status: 400 }
          );
        }

        const comparisons = await analyzePricing(merchantId, items, {
          city,
          country,
          businessType,
          priceSegment,
        });

        return NextResponse.json({
          success: true,
          comparisons,
          count: comparisons.length,
        });
      }

      case 'partnerships': {
        const { city, country, businessType, cuisineType, targetAudience } = params;

        if (!city || !country || !businessType) {
          return NextResponse.json(
            { error: 'Missing required fields for partnership discovery' },
            { status: 400 }
          );
        }

        const partnerships = await discoverPartnerships(merchantId, {
          businessType,
          city,
          country,
          cuisineType,
          targetAudience,
        });

        return NextResponse.json({
          success: true,
          partnerships,
          count: partnerships.length,
        });
      }

      case 'trends': {
        const { city, country, businessType, cuisineType } = params;

        if (!city || !country || !businessType) {
          return NextResponse.json(
            { error: 'Missing required fields for trends analysis' },
            { status: 400 }
          );
        }

        const trends = await getMarketTrends(merchantId, {
          businessType,
          city,
          country,
          cuisineType,
        });

        return NextResponse.json({
          success: true,
          trends,
          count: trends.length,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: pricing, partnerships, or trends' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('AI Market POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/ai/market - Update partnership status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { partnershipId, status, contactInfo } = body;

    if (!partnershipId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: partnershipId, status' },
        { status: 400 }
      );
    }

    await updatePartnershipStatus(partnershipId, status, contactInfo);

    return NextResponse.json({
      success: true,
      message: `Partnership status updated to ${status}`,
    });
  } catch (error) {
    console.error('AI Market PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
