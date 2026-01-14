import { NextRequest, NextResponse } from 'next/server';
import {
  listTourOperators,
  listAccommodationPartners,
  listTourOperatorOutreach,
  listAccommodationOutreach,
  getPartnershipMetrics,
  createTourOperatorOutreach,
  createAccommodationOutreach,
  updateOutreachStatus,
  discoverPartners,
  analyzeTourismPotential,
  submitPartnerFeedback,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/tourism-partnerships - List partners, outreach pipeline, or metrics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const action = searchParams.get('action') || 'list-tour-operators';

    switch (action) {
      case 'list-tour-operators': {
        const countryCode = searchParams.get('countryCode') || undefined;
        const operatorType = searchParams.get('operatorType') || undefined;
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        const tourOperators = await listTourOperators({
          countryCode,
          operatorType: operatorType as any,
          limit,
          offset,
        });

        return NextResponse.json({
          success: true,
          tourOperators,
          count: tourOperators.length,
        });
      }

      case 'list-accommodations': {
        const city = searchParams.get('city') || undefined;
        const type = searchParams.get('type') || undefined;
        const maxDistanceM = parseInt(searchParams.get('maxDistance') || '1000');
        const limit = parseInt(searchParams.get('limit') || '50');
        const offset = parseInt(searchParams.get('offset') || '0');

        const accommodations = await listAccommodationPartners({
          city,
          accommodationType: type as any,
          maxDistanceM,
          limit,
          offset,
        });

        return NextResponse.json({
          success: true,
          accommodations,
          count: accommodations.length,
        });
      }

      case 'tour-operator-outreach': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }

        const status = searchParams.get('status') || undefined;
        const limit = parseInt(searchParams.get('limit') || '50');

        const outreach = await listTourOperatorOutreach(merchantId, {
          status: status as any,
          limit,
        });

        return NextResponse.json({
          success: true,
          outreach,
          count: outreach.length,
        });
      }

      case 'accommodation-outreach': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }

        const status = searchParams.get('status') || undefined;
        const limit = parseInt(searchParams.get('limit') || '50');

        const outreach = await listAccommodationOutreach(merchantId, {
          status: status as any,
          limit,
        });

        return NextResponse.json({
          success: true,
          outreach,
          count: outreach.length,
        });
      }

      case 'metrics': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }

        const metrics = await getPartnershipMetrics(merchantId);

        return NextResponse.json({
          success: true,
          metrics,
        });
      }

      default:
        return NextResponse.json(
          {
            error:
              'Invalid action. Use: list-tour-operators, list-accommodations, tour-operator-outreach, accommodation-outreach, or metrics',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Tourism Partnerships GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/tourism-partnerships - Discover partners, create outreach, submit feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action, ...params } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'discover-partners': {
        const { city, countryCode, latitude, longitude, radiusMeters } = params;

        if (!city || !countryCode) {
          return NextResponse.json(
            { error: 'Missing required fields: city, countryCode' },
            { status: 400 }
          );
        }

        const discovered = await discoverPartners({
          merchantId,
          city,
          countryCode,
          latitude,
          longitude,
          radiusMeters,
        });

        return NextResponse.json({
          success: true,
          discovered,
          count: discovered.length,
        });
      }

      case 'analyze-tourism-potential': {
        const { name, city, cuisineType, seatingCapacity } = params;

        if (!name || !city) {
          return NextResponse.json(
            { error: 'Missing required fields: name, city' },
            { status: 400 }
          );
        }

        const analysis = await analyzeTourismPotential(merchantId, {
          name,
          city,
          cuisineType,
          seatingCapacity,
        });

        return NextResponse.json({
          success: true,
          analysis,
        });
      }

      case 'create-tour-operator-outreach': {
        const { operatorId, templateUsed, customMessage } = params;

        if (!operatorId) {
          return NextResponse.json(
            { error: 'Missing required field: operatorId' },
            { status: 400 }
          );
        }

        const outreach = await createTourOperatorOutreach(merchantId, operatorId, {
          templateUsed,
          customMessage,
        });

        if (!outreach) {
          return NextResponse.json({ error: 'Failed to create outreach' }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          outreach,
        });
      }

      case 'create-accommodation-outreach': {
        const {
          accommodationId,
          partnershipType,
          discountPercent,
          commissionPercent,
          fixedPriceMenu,
        } = params;

        if (!accommodationId) {
          return NextResponse.json(
            { error: 'Missing required field: accommodationId' },
            { status: 400 }
          );
        }

        const outreach = await createAccommodationOutreach(merchantId, accommodationId, {
          partnershipType,
          discountPercent,
          commissionPercent,
          fixedPriceMenu,
        });

        if (!outreach) {
          return NextResponse.json({ error: 'Failed to create outreach' }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          outreach,
        });
      }

      case 'submit-feedback': {
        const { partnerType, partnerId, feedbackType, notes } = params;

        if (!partnerType || !partnerId || !feedbackType) {
          return NextResponse.json(
            { error: 'Missing required fields: partnerType, partnerId, feedbackType' },
            { status: 400 }
          );
        }

        const success = await submitPartnerFeedback(
          merchantId,
          partnerType,
          partnerId,
          feedbackType,
          notes
        );

        return NextResponse.json({
          success,
          message: success ? 'Feedback submitted' : 'Failed to submit feedback',
        });
      }

      default:
        return NextResponse.json(
          {
            error:
              'Invalid action. Use: discover-partners, analyze-tourism-potential, create-tour-operator-outreach, create-accommodation-outreach, or submit-feedback',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Tourism Partnerships POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/ai/tourism-partnerships - Update outreach status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { outreachId, partnerType, status, notes, partnershipTerms } = body;

    if (!outreachId || !partnerType || !status) {
      return NextResponse.json(
        { error: 'Missing required fields: outreachId, partnerType, status' },
        { status: 400 }
      );
    }

    if (!['tour_operator', 'accommodation'].includes(partnerType)) {
      return NextResponse.json(
        { error: 'Invalid partnerType. Use: tour_operator or accommodation' },
        { status: 400 }
      );
    }

    const success = await updateOutreachStatus(outreachId, partnerType, status, {
      notes,
      partnershipTerms,
    });

    return NextResponse.json({
      success,
      message: success ? 'Status updated' : 'Failed to update status',
    });
  } catch (error) {
    console.error('Tourism Partnerships PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
