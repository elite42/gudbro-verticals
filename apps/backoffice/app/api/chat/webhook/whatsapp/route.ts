// WhatsApp Webhook Handler
// Receives incoming messages from WhatsApp Business API

import { NextRequest, NextResponse } from 'next/server';
import { parseWhatsAppWebhook, routeIncomingMessage } from '@/lib/ai/customer-chat/channel-router';

// WhatsApp webhook verification (GET)
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Verify token should match your configured webhook verify token
  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WhatsApp webhook verified');
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// WhatsApp incoming messages (POST)
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    // Parse the WhatsApp webhook payload
    const message = parseWhatsAppWebhook(payload);

    if (!message) {
      // Not a text message or not parseable - acknowledge anyway
      return NextResponse.json({ status: 'ignored' });
    }

    // Route to customer chat
    const response = await routeIncomingMessage(message);

    if (!response) {
      console.error('Failed to process WhatsApp message - no location found');
      return NextResponse.json({ status: 'no_location' });
    }

    return NextResponse.json({
      status: 'processed',
      conversationId: response.conversationId,
      escalated: response.isEscalated,
    });
  } catch (error) {
    console.error('WhatsApp webhook error:', error);
    // Always return 200 to WhatsApp to prevent retries
    return NextResponse.json({ status: 'error' });
  }
}
