import { NextRequest, NextResponse } from 'next/server';
import {
  getUpcomingHolidays,
  getHolidaysForDate,
  getMerchantCustomHolidays,
  createCustomHoliday,
  deleteCustomHoliday,
  getDateImpact,
  getUpcomingHolidaysContext,
  getHolidaysAIContext,
  searchHolidays,
  getHolidaysForYear,
} from '@/lib/ai/holidays-service';

export const dynamic = 'force-dynamic';

// GET /api/ai/holidays - Get holidays data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'upcoming';
    const countryCode = searchParams.get('countryCode') || 'VN';
    const regionCode = searchParams.get('regionCode') || undefined;
    const city = searchParams.get('city') || undefined;
    const merchantId = searchParams.get('merchantId') || undefined;

    switch (action) {
      case 'upcoming': {
        const daysAhead = parseInt(searchParams.get('daysAhead') || '90');
        const limit = parseInt(searchParams.get('limit') || '20');
        const holidays = await getUpcomingHolidays(countryCode, {
          regionCode,
          city,
          daysAhead,
          limit,
        });
        return NextResponse.json({ success: true, holidays, count: holidays.length });
      }

      case 'date': {
        const date = searchParams.get('date');
        if (!date) {
          return NextResponse.json({ error: 'Missing required field: date' }, { status: 400 });
        }
        const holidays = await getHolidaysForDate(date, countryCode, { regionCode, city });
        return NextResponse.json({ success: true, holidays, count: holidays.length });
      }

      case 'custom': {
        if (!merchantId) {
          return NextResponse.json(
            { error: 'Missing required field: merchantId' },
            { status: 400 }
          );
        }
        const daysAhead = parseInt(searchParams.get('daysAhead') || '90');
        const customHolidays = await getMerchantCustomHolidays(merchantId, { daysAhead });
        return NextResponse.json({ success: true, customHolidays, count: customHolidays.length });
      }

      case 'impact': {
        const date = searchParams.get('date');
        if (!date || !merchantId) {
          return NextResponse.json(
            { error: 'Missing required fields: date, merchantId' },
            { status: 400 }
          );
        }
        const impact = await getDateImpact(date, merchantId, countryCode, { regionCode, city });
        return NextResponse.json({ success: true, impact });
      }

      case 'context': {
        const context = await getUpcomingHolidaysContext(countryCode, {
          regionCode,
          city,
          merchantId,
        });
        return NextResponse.json({ success: true, context });
      }

      case 'ai-context': {
        const aiContext = await getHolidaysAIContext(countryCode, { regionCode, city });
        return NextResponse.json({ success: true, aiContext });
      }

      case 'search': {
        const query = searchParams.get('query');
        if (!query) {
          return NextResponse.json({ error: 'Missing required field: query' }, { status: 400 });
        }
        const limit = parseInt(searchParams.get('limit') || '20');
        const holidays = await searchHolidays(query, { countryCode, limit });
        return NextResponse.json({ success: true, holidays, count: holidays.length });
      }

      case 'year': {
        const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());
        const holidays = await getHolidaysForYear(year, countryCode);
        return NextResponse.json({ success: true, holidays, count: holidays.length, year });
      }

      default:
        return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
    }
  } catch (error) {
    console.error('[API] Holidays GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/holidays - Create custom holiday
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, action } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    if (action === 'create-custom') {
      const { date, name, type, impactLevel, isClosed, specialHours, notes, isRecurring } = body;

      if (!date || !name) {
        return NextResponse.json({ error: 'Missing required fields: date, name' }, { status: 400 });
      }

      const customHoliday = await createCustomHoliday(merchantId, {
        date,
        name,
        type: type || 'other',
        impactLevel: impactLevel || 'medium',
        isClosed: isClosed ?? false,
        specialHours,
        notes,
        isRecurring: isRecurring ?? false,
      });

      if (!customHoliday) {
        return NextResponse.json({ error: 'Failed to create custom holiday' }, { status: 500 });
      }

      return NextResponse.json({ success: true, customHoliday });
    }

    return NextResponse.json({ error: 'Unknown action or missing action' }, { status: 400 });
  } catch (error) {
    console.error('[API] Holidays POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/ai/holidays - Delete custom holiday
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const holidayId = searchParams.get('holidayId');

    if (!holidayId) {
      return NextResponse.json({ error: 'Missing required field: holidayId' }, { status: 400 });
    }

    const success = await deleteCustomHoliday(holidayId);

    if (!success) {
      return NextResponse.json({ error: 'Failed to delete custom holiday' }, { status: 500 });
    }

    return NextResponse.json({ success: true, deleted: holidayId });
  } catch (error) {
    console.error('[API] Holidays DELETE error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
