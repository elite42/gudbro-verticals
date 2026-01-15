// Telegram Webhook Handler
// Receives incoming messages from Telegram Bot API

import { NextRequest, NextResponse } from 'next/server';
import { parseTelegramWebhook, routeIncomingMessage } from '@/lib/ai/customer-chat/channel-router';

// Telegram sends all updates via POST
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Parse the Telegram webhook payload
    const message = parseTelegramWebhook(payload);

    if (!message) {
      // Not a text message - acknowledge anyway
      return NextResponse.json({ ok: true });
    }

    // Route to customer chat
    const response = await routeIncomingMessage(message);

    if (!response) {
      console.error('Failed to process Telegram message - no location found');
      return NextResponse.json({ ok: true, status: 'no_location' });
    }

    return NextResponse.json({
      ok: true,
      conversationId: response.conversationId,
      escalated: response.isEscalated,
    });
  } catch (error) {
    console.error('Telegram webhook error:', error);
    // Return 200 to prevent retries
    return NextResponse.json({ ok: true, error: 'internal' });
  }
}
