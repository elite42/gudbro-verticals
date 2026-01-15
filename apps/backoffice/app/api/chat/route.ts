// Customer Chat API
// Handles chat requests from the web widget

import { NextRequest, NextResponse } from 'next/server';
import { customerChat, closeConversation } from '@/lib/ai/customer-chat';

// POST - Send a message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      locationId,
      conversationId,
      message,
      customerName,
      customerPhone,
      customerEmail,
      language,
    } = body;

    if (!locationId) {
      return NextResponse.json({ error: 'locationId is required' }, { status: 400 });
    }

    if (!message) {
      return NextResponse.json({ error: 'message is required' }, { status: 400 });
    }

    const response = await customerChat({
      locationId,
      conversationId,
      channel: 'widget',
      message,
      customerName,
      customerPhone,
      customerEmail,
      language: language || 'en',
    });

    return NextResponse.json({
      conversationId: response.conversationId,
      message: response.message,
      suggestedReplies: response.suggestedReplies,
      isEscalated: response.isEscalated,
      latencyMs: response.latencyMs,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}

// PATCH - Close conversation with optional rating
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();

    const { conversationId, rating, feedback } = body;

    if (!conversationId) {
      return NextResponse.json({ error: 'conversationId is required' }, { status: 400 });
    }

    await closeConversation(conversationId, rating, feedback);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Close conversation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal error' },
      { status: 500 }
    );
  }
}
