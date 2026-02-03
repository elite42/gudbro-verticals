// WhatsApp Webhook Handler
// Receives incoming messages from WhatsApp Business API

import { NextRequest, NextResponse } from 'next/server';
import { parseWhatsAppWebhook, routeIncomingMessage } from '@/lib/ai/customer-chat/channel-router';
import { withRateLimit } from '@/lib/security/rate-limiter';
import crypto from 'crypto';

/**
 * Verify WhatsApp/Meta webhook signature.
 * @see https://developers.facebook.com/docs/graph-api/webhooks/getting-started#verification-requests
 */
function verifyWhatsAppSignature(signatureHeader: string | null, body: string): boolean {
  const appSecret = process.env.WHATSAPP_APP_SECRET;

  // Skip verification if secret not configured (development mode)
  if (!appSecret) {
    console.warn('[WhatsApp] App secret not configured - skipping signature verification');
    return true;
  }

  // Signature header is required if app secret is configured
  if (!signatureHeader) {
    return false;
  }

  // Expected format: sha256=<hex signature>
  const expectedSignature =
    'sha256=' + crypto.createHmac('sha256', appSecret).update(body).digest('hex');

  // Use timing-safe comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(Buffer.from(signatureHeader), Buffer.from(expectedSignature));
  } catch {
    return false;
  }
}

// WhatsApp webhook verification (GET) - no rate limit for verification
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  // Verify token should match your configured webhook verify token
  const verifyToken = process.env.WHATSAPP_WEBHOOK_VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken) {
    return new NextResponse(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Verification failed' }, { status: 403 });
}

// WhatsApp incoming messages (POST)
export async function POST(request: NextRequest) {
  // Get raw body for signature verification
  const rawBody = await request.text();
  const signature = request.headers.get('X-Hub-Signature-256');

  // SECURITY: Verify webhook signature
  if (!verifyWhatsAppSignature(signature, rawBody)) {
    console.error('[WhatsApp] Webhook signature verification failed');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Rate limit webhooks - 50 requests per minute per source
  const rateLimitResponse = await withRateLimit(request, 'webhook');
  if (rateLimitResponse) return rateLimitResponse;

  try {
    const payload = JSON.parse(rawBody);

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
