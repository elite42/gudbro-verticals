import { NextRequest, NextResponse } from 'next/server';
import { getActiveAlerts, checkAlerts, dismissAlert } from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/alerts - Get active alerts
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const limit = parseInt(searchParams.get('limit') || '10');
    const refresh = searchParams.get('refresh') === 'true';

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    // If refresh requested, check for new alerts first
    if (refresh) {
      await checkAlerts(merchantId);
    }

    const alerts = await getActiveAlerts(merchantId, limit);

    return NextResponse.json({
      success: true,
      alerts,
      count: alerts.length,
    });
  } catch (error) {
    console.error('AI Alerts GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/alerts - Check for new alerts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, locationId } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    const alerts = await checkAlerts(merchantId, locationId);

    return NextResponse.json({
      success: true,
      newAlerts: alerts,
      count: alerts.length,
    });
  } catch (error) {
    console.error('AI Alerts POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// PATCH /api/ai/alerts - Dismiss an alert
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { alertId } = body;

    if (!alertId) {
      return NextResponse.json({ error: 'Missing required field: alertId' }, { status: 400 });
    }

    await dismissAlert(alertId);

    return NextResponse.json({
      success: true,
      message: 'Alert dismissed',
    });
  } catch (error) {
    console.error('AI Alerts PATCH error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
