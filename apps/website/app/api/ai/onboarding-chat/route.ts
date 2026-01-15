/**
 * AI Onboarding Chat API Route
 *
 * POST /api/ai/onboarding-chat
 * Handles conversational onboarding messages
 *
 * No authentication required - uses sessionToken validation
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  chatOnboarding,
  getInitialGreeting,
  OnboardingMessage,
} from '@/lib/ai/onboarding-chat-service';

export const dynamic = 'force-dynamic';

// Rate limiting: simple in-memory store (use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 20; // 20 requests per minute

function checkRateLimit(sessionToken: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(sessionToken);

  if (!record || record.resetTime < now) {
    rateLimitMap.set(sessionToken, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { sessionToken, message, conversationHistory, action } = body;

    // Validate required fields
    if (!sessionToken) {
      return NextResponse.json({ error: 'Session token is required' }, { status: 400 });
    }

    // Rate limiting
    if (!checkRateLimit(sessionToken)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment.' },
        { status: 429 }
      );
    }

    // Handle initial greeting request
    if (action === 'start') {
      const { email, firstName } = body;
      if (!email) {
        return NextResponse.json({ error: 'Email is required for start action' }, { status: 400 });
      }

      const greeting = getInitialGreeting({ email, first_name: firstName });
      return NextResponse.json({
        message: greeting,
        conversationHistory: [{ role: 'assistant', content: greeting }] as OnboardingMessage[],
        completionPercentage: 0,
        isComplete: false,
      });
    }

    // Handle chat message
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const result = await chatOnboarding({
      sessionToken,
      message,
      conversationHistory: conversationHistory || [],
    });

    if (result.error) {
      // Check for specific errors
      if (result.error === 'Invalid or expired session') {
        return NextResponse.json({ error: result.error }, { status: 401 });
      }
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      message: result.message,
      updatedFields: result.updatedFields,
      conversationHistory: result.conversationHistory,
      completionPercentage: result.completionPercentage,
      isComplete: result.isComplete,
    });
  } catch (error) {
    console.error('[OnboardingChat API] Error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
