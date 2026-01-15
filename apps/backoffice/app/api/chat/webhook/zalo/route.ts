// Zalo Webhook Handler
// Receives incoming messages from Zalo OA API

import { NextRequest, NextResponse } from 'next/server';
import { parseZaloWebhook, routeIncomingMessage } from '@/lib/ai/customer-chat/channel-router';
import crypto from 'crypto';

// Verify Zalo signature
function verifySignature(body: string, signature: string, oaSecretKey: string): boolean {
  const hash = crypto.createHmac('sha256', oaSecretKey).update(body).digest('hex');

  return hash === signature;
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    const signature = request.headers.get('x-zalo-signature');
    const oaSecretKey = process.env.ZALO_OA_SECRET_KEY;

    // Verify signature if secret is configured
    if (oaSecretKey && signature) {
      if (!verifySignature(rawBody, signature, oaSecretKey)) {
        console.error('Zalo signature verification failed');
        return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
      }
    }

    const payload = JSON.parse(rawBody);

    // Parse the Zalo webhook payload
    const message = parseZaloWebhook(payload);

    if (!message) {
      // Not a text message - acknowledge anyway
      return NextResponse.json({ error: 0 });
    }

    // Route to customer chat
    const response = await routeIncomingMessage(message);

    if (!response) {
      console.error('Failed to process Zalo message - no location found');
      return NextResponse.json({ error: 0, status: 'no_location' });
    }

    return NextResponse.json({
      error: 0,
      conversationId: response.conversationId,
      escalated: response.isEscalated,
    });
  } catch (error) {
    console.error('Zalo webhook error:', error);
    // Return success to prevent retries
    return NextResponse.json({ error: 0 });
  }
}
