import { NextRequest, NextResponse } from 'next/server';
import { chat, createSession, getSessions, archiveSession } from '@/lib/ai';
import { withRateLimit } from '@/lib/security/rate-limiter';

export const dynamic = 'force-dynamic';

// POST /api/ai/chat - Send a message
export async function POST(request: NextRequest) {
  // Rate limit AI endpoints - 20 requests per minute per user
  const rateLimitResponse = await withRateLimit(request, 'ai');
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const body = await request.json();
    const { merchantId, accountId, sessionId, message, newSession } = body;

    // Validate required fields
    if (!merchantId || !accountId || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: merchantId, accountId, message' },
        { status: 400 }
      );
    }

    // Create new session if requested or no sessionId provided
    let activeSessionId = sessionId;
    if (newSession || !sessionId) {
      activeSessionId = await createSession(merchantId, accountId);
    }

    // Send message and get response
    const response = await chat({
      merchantId,
      accountId,
      sessionId: activeSessionId,
      message,
    });

    return NextResponse.json({
      success: true,
      ...response,
    });
  } catch (error) {
    console.error('AI Chat API error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';

    // Check for specific errors
    if (message.includes('OPENAI_API_KEY')) {
      return NextResponse.json(
        { error: 'AI service not configured. Please contact support.' },
        { status: 503 }
      );
    }

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/ai/chat - Get sessions or session messages
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const merchantId = searchParams.get('merchantId');
    const accountId = searchParams.get('accountId');
    const sessionId = searchParams.get('sessionId');

    if (!merchantId || !accountId) {
      return NextResponse.json(
        { error: 'Missing required fields: merchantId, accountId' },
        { status: 400 }
      );
    }

    // If sessionId provided, get messages for that session
    // Otherwise, get list of sessions
    const sessions = await getSessions(merchantId, accountId);

    return NextResponse.json({
      success: true,
      sessions,
    });
  } catch (error) {
    console.error('AI Chat GET error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE /api/ai/chat - Archive a session
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing required field: sessionId' }, { status: 400 });
    }

    await archiveSession(sessionId);

    return NextResponse.json({
      success: true,
      message: 'Session archived',
    });
  } catch (error) {
    console.error('AI Chat DELETE error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
