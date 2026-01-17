// Telegram Webhook Handler
// Receives incoming messages from Telegram Bot API

import { NextRequest, NextResponse } from 'next/server';
import { parseTelegramWebhook, routeIncomingMessage } from '@/lib/ai/customer-chat/channel-router';
import { withRateLimit } from '@/lib/security/rate-limiter';
import crypto from 'crypto';

/**
 * Verify Telegram webhook by checking the secret_token header.
 * The secret token should be set when configuring the webhook via setWebhook API.
 * @see https://core.telegram.org/bots/api#setwebhook
 */
function verifyTelegramWebhook(request: NextRequest): boolean {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  // Skip verification if token not configured (development mode)
  if (!botToken) {
    console.warn('[Telegram] Bot token not configured - skipping signature verification');
    return true;
  }

  const secretToken = request.headers.get('X-Telegram-Bot-Api-Secret-Token');

  // If no secret token in header, reject the request
  if (!secretToken) {
    return false;
  }

  // The expected token is a hash of the bot token (first 32 chars)
  const expectedToken = crypto.createHash('sha256').update(botToken).digest('hex').slice(0, 32);

  // Use timing-safe comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(Buffer.from(secretToken), Buffer.from(expectedToken));
  } catch {
    return false;
  }
}

// Telegram sends all updates via POST
export async function POST(request: NextRequest) {
  // SECURITY: Verify webhook origin
  if (!verifyTelegramWebhook(request)) {
    console.error('[Telegram] Webhook signature verification failed');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Rate limit webhooks - 50 requests per minute per source
  const rateLimitResponse = await withRateLimit(request, 'webhook');
  if (rateLimitResponse) return rateLimitResponse;

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
