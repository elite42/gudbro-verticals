import { NextRequest, NextResponse } from 'next/server';
import { getLatestBriefing, generateDailyBriefing } from '@/lib/ai';

export const dynamic = 'force-dynamic';

// GET /api/ai/briefing - Get today's briefing
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const forceRefresh = searchParams.get('refresh') === 'true';

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    const briefing = await getLatestBriefing(merchantId, forceRefresh);

    return NextResponse.json({
      success: true,
      briefing,
    });
  } catch (error) {
    console.error('AI Briefing GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    if (message.includes('OPENAI_API_KEY')) {
      return NextResponse.json({ error: 'AI service not configured' }, { status: 503 });
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST /api/ai/briefing - Generate a new briefing
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, locationId } = body;

    if (!merchantId) {
      return NextResponse.json({ error: 'Missing required field: merchantId' }, { status: 400 });
    }

    const briefing = await generateDailyBriefing(merchantId, locationId);

    return NextResponse.json({
      success: true,
      briefing,
    });
  } catch (error) {
    console.error('AI Briefing POST error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
