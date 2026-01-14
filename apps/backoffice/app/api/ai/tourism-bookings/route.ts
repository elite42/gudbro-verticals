import { NextRequest, NextResponse } from 'next/server';
import {
  getBookingConfig,
  updateBookingConfig,
  createBookingRequest,
  listBookingRequests,
  processBookingRequest,
  updateBookingRequestStatus,
  getBookingAnalytics,
  recordBookingPerformance,
} from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/tourism-bookings - Get config, requests, or analytics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const action = searchParams.get('action') || 'requests';

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'config': {
        const config = await getBookingConfig(merchantId);

        return NextResponse.json({
          success: true,
          config,
        });
      }

      case 'requests': {
        const status = searchParams.get('status') || undefined;
        const fromDate = searchParams.get('fromDate') || undefined;
        const toDate = searchParams.get('toDate') || undefined;
        const limit = parseInt(searchParams.get('limit') || '50');

        const requests = await listBookingRequests(merchantId, {
          status: status as any,
          fromDate,
          toDate,
          limit,
        });

        return NextResponse.json({
          success: true,
          requests,
          count: requests.length,
        });
      }

      case 'analytics': {
        const fromDate = searchParams.get('fromDate');
        const toDate = searchParams.get('toDate');

        if (!fromDate || !toDate) {
          return NextResponse.json(
            { error: 'Missing required fields: fromDate, toDate' },
            { status: 400 }
          );
        }

        const analytics = await getBookingAnalytics(merchantId, fromDate, toDate);

        return NextResponse.json({
          success: true,
          analytics,
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: config, requests, or analytics' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Tourism Bookings GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/tourism-bookings - Create request, process AI, update config
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action, ...params } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    switch (action) {
      case 'create-request': {
        const {
          partnerType,
          partnerId,
          requestedDate,
          requestedSlot,
          partySize,
          pricePerPerson,
          menuType,
          dietaryRequirements,
          specialRequests,
        } = params;

        if (!requestedDate || !partySize) {
          return NextResponse.json(
            { error: 'Missing required fields: requestedDate, partySize' },
            { status: 400 }
          );
        }

        const bookingRequest = await createBookingRequest(merchantId, {
          partnerType,
          partnerId,
          requestedDate,
          requestedSlot,
          partySize,
          pricePerPerson,
          menuType,
          dietaryRequirements,
          specialRequests,
        });

        if (!bookingRequest) {
          return NextResponse.json({ error: 'Failed to create booking request' }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          request: bookingRequest,
        });
      }

      case 'process-request': {
        const { requestId } = params;

        if (!requestId) {
          return NextResponse.json({ error: 'Missing required field: requestId' }, { status: 400 });
        }

        const decision = await processBookingRequest(merchantId, requestId);

        if (!decision) {
          return NextResponse.json({ error: 'Failed to process booking request' }, { status: 500 });
        }

        return NextResponse.json({
          success: true,
          decision,
        });
      }

      case 'update-config': {
        const {
          automationLevel,
          weightRevenue,
          weightOccupancy,
          weightRelationships,
          minMarginPercent,
          maxGroupPercent,
          blackoutDates,
          preferredPartners,
          blockedPartners,
        } = params;

        const success = await updateBookingConfig(merchantId, {
          automationLevel,
          weightRevenue,
          weightOccupancy,
          weightRelationships,
          minMarginPercent,
          maxGroupPercent,
          blackoutDates,
          preferredPartners,
          blockedPartners,
        });

        return NextResponse.json({
          success,
          message: success ? 'Config updated' : 'Failed to update config',
        });
      }

      case 'record-performance': {
        const {
          date,
          slot,
          totalCapacity,
          groupCovers,
          walkinCovers,
          groupRevenue,
          walkinRevenue,
          isHoliday,
          weatherConditions,
          specialEvents,
        } = params;

        if (!date || !slot) {
          return NextResponse.json(
            { error: 'Missing required fields: date, slot' },
            { status: 400 }
          );
        }

        const success = await recordBookingPerformance(merchantId, {
          date,
          slot,
          totalCapacity,
          groupCovers,
          walkinCovers,
          groupRevenue,
          walkinRevenue,
          isHoliday,
          weatherConditions,
          specialEvents,
        });

        return NextResponse.json({
          success,
          message: success ? 'Performance recorded' : 'Failed to record performance',
        });
      }

      default:
        return NextResponse.json(
          {
            error:
              'Invalid action. Use: create-request, process-request, update-config, or record-performance',
          },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Tourism Bookings POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/ai/tourism-bookings - Accept, decline, or counter booking
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { requestId, action, ...params } = body;

    if (!requestId) {
      return NextResponse.json({ error: 'Missing required field: requestId' }, { status: 400 });
    }

    switch (action) {
      case 'accept': {
        const { decidedBy } = params;

        const success = await updateBookingRequestStatus(
          requestId,
          'accepted',
          decidedBy || 'manager'
        );

        return NextResponse.json({
          success,
          message: success ? 'Booking accepted' : 'Failed to accept booking',
        });
      }

      case 'decline': {
        const { decidedBy } = params;

        const success = await updateBookingRequestStatus(
          requestId,
          'declined',
          decidedBy || 'manager'
        );

        return NextResponse.json({
          success,
          message: success ? 'Booking declined' : 'Failed to decline booking',
        });
      }

      case 'counter': {
        const { counterPricePerPerson, counterDate, counterSlot, decidedBy } = params;

        if (!counterPricePerPerson && !counterDate && !counterSlot) {
          return NextResponse.json(
            {
              error:
                'At least one counter field required: counterPricePerPerson, counterDate, or counterSlot',
            },
            { status: 400 }
          );
        }

        const success = await updateBookingRequestStatus(
          requestId,
          'countered',
          decidedBy || 'manager',
          {
            counterPricePerPerson,
            counterDate,
            counterSlot,
          }
        );

        return NextResponse.json({
          success,
          message: success ? 'Counter offer sent' : 'Failed to send counter offer',
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: accept, decline, or counter' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Tourism Bookings PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
