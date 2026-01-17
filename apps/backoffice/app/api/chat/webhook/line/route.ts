// LINE Webhook Handler
// Receives incoming messages from LINE Messaging API

import { NextRequest, NextResponse } from 'next/server';
import { parseLINEWebhook, routeIncomingMessage } from '@/lib/ai/customer-chat/channel-router';
import { withRateLimit } from '@/lib/security/rate-limiter';
import crypto from 'crypto';

// Verify LINE signature
function verifySignature(body: string, signature: string, channelSecret: string): boolean {
  const hash = crypto.createHmac('sha256', channelSecret).update(body).digest('base64');

  return hash === signature;
}

export async function POST(request: NextRequest) {
  // Rate limit webhooks - 50 requests per minute per source
  const rateLimitResponse = await withRateLimit(request, 'webhook');
  if (rateLimitResponse) return rateLimitResponse;

  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('x-line-signature');
    const channelSecret = process.env.LINE_CHANNEL_SECRET;

    // Verify signature if secret is configured
    if (channelSecret && signature) {
      if (!verifySignature(rawBody, signature, channelSecret)) {
        console.error('LINE signature verification failed');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);

    // Parse the LINE webhook payload
    const message = parseLINEWebhook(payload);

    if (!message) {
      // Not a text message - acknowledge anyway
      return NextResponse.json({});
    }

    // Route to customer chat
    const response = await routeIncomingMessage(message);

    if (!response) {
      console.error('Failed to process LINE message - no location found');
      return NextResponse.json({ status: 'no_location' });
    }

    return NextResponse.json({
      status: 'processed',
      conversationId: response.conversationId,
      escalated: response.isEscalated,
    });
  } catch (error) {
    console.error('LINE webhook error:', error);
    // Return 200 to prevent retries
    return NextResponse.json({});
  }
}
