/**
 * Messaging Channel Connection Test API
 *
 * POST /api/settings/messaging-channels/test
 * - Tests connection to a messaging channel using stored credentials
 */

import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase-admin';
import { verifyTelegramBot } from '@/lib/notifications/providers/telegram-provider';
import { verifyWhatsAppBusiness } from '@/lib/notifications/providers/whatsapp-provider';
import { verifyLineBot } from '@/lib/notifications/providers/line-provider';
import { verifyZaloOA } from '@/lib/notifications/providers/zalo-provider';
import { verifyKakaoChannel } from '@/lib/notifications/providers/kakao-provider';

interface VerifyResult {
  valid: boolean;
  displayName?: string;
  publicId?: string;
  error?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { merchantId, channel } = body;

    if (!merchantId || !channel) {
      return NextResponse.json({ error: 'merchantId and channel are required' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();

    // Get channel configuration
    const { data: channelConfig, error: fetchError } = await supabase
      .from('merchant_notification_channels')
      .select('*')
      .eq('merchant_id', merchantId)
      .eq('channel_type', channel)
      .single();

    if (fetchError || !channelConfig) {
      return NextResponse.json({ error: 'Channel not configured' }, { status: 404 });
    }

    if (!channelConfig.credentials_encrypted) {
      return NextResponse.json(
        { error: 'No credentials configured for this channel' },
        { status: 400 }
      );
    }

    // Decrypt credentials (in production, use proper decryption)
    let credentials: Record<string, string>;
    try {
      credentials = JSON.parse(channelConfig.credentials_encrypted);
    } catch {
      return NextResponse.json({ error: 'Invalid credentials format' }, { status: 500 });
    }

    // Test connection based on channel type
    let result: VerifyResult;

    switch (channel) {
      case 'telegram':
        result = await testTelegram(credentials);
        break;
      case 'whatsapp':
        result = await testWhatsApp(credentials);
        break;
      case 'line':
        result = await testLine(credentials);
        break;
      case 'zalo':
        result = await testZalo(credentials);
        break;
      case 'kakao':
        result = await testKakao(credentials);
        break;
      default:
        return NextResponse.json({ error: `Unknown channel: ${channel}` }, { status: 400 });
    }

    // Update verification status in database
    await supabase
      .from('merchant_notification_channels')
      .update({
        is_verified: result.valid,
        display_name: result.displayName || null,
        public_id: result.publicId || null,
        last_verified_at: new Date().toISOString(),
        verification_error: result.error || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', channelConfig.id);

    if (result.valid) {
      return NextResponse.json({
        success: true,
        displayName: result.displayName,
        publicId: result.publicId,
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Connection test failed' },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error testing channel:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Server error' },
      { status: 500 }
    );
  }
}

// Test Telegram connection
async function testTelegram(credentials: Record<string, string>): Promise<VerifyResult> {
  const { bot_token } = credentials;

  if (!bot_token) {
    return { valid: false, error: 'Bot token is required' };
  }

  // Temporarily set env var for the provider
  const originalToken = process.env.TELEGRAM_BOT_TOKEN;
  process.env.TELEGRAM_BOT_TOKEN = bot_token;

  try {
    const result = await verifyTelegramBot();
    return {
      valid: result.valid,
      displayName: result.botName,
      publicId: result.botName ? `@${result.botName}` : undefined,
      error: result.valid ? undefined : 'Invalid bot token',
    };
  } finally {
    process.env.TELEGRAM_BOT_TOKEN = originalToken;
  }
}

// Test WhatsApp connection
async function testWhatsApp(credentials: Record<string, string>): Promise<VerifyResult> {
  const { phone_number_id, access_token } = credentials;

  if (!phone_number_id || !access_token) {
    return { valid: false, error: 'Phone Number ID and Access Token are required' };
  }

  // Temporarily set env vars for the provider
  const originalPhoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const originalToken = process.env.WHATSAPP_ACCESS_TOKEN;
  process.env.WHATSAPP_PHONE_NUMBER_ID = phone_number_id;
  process.env.WHATSAPP_ACCESS_TOKEN = access_token;

  try {
    const result = await verifyWhatsAppBusiness();
    return {
      valid: result.valid,
      displayName: result.displayName,
      publicId: result.phoneNumber,
      error: result.valid ? undefined : 'Invalid WhatsApp credentials',
    };
  } finally {
    process.env.WHATSAPP_PHONE_NUMBER_ID = originalPhoneId;
    process.env.WHATSAPP_ACCESS_TOKEN = originalToken;
  }
}

// Test LINE connection
async function testLine(credentials: Record<string, string>): Promise<VerifyResult> {
  const { channel_id, channel_secret, access_token } = credentials;

  if (!channel_id || !access_token) {
    return { valid: false, error: 'Channel ID and Access Token are required' };
  }

  // Temporarily set env vars for the provider
  const originalId = process.env.LINE_CHANNEL_ID;
  const originalSecret = process.env.LINE_CHANNEL_SECRET;
  const originalToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  process.env.LINE_CHANNEL_ID = channel_id;
  process.env.LINE_CHANNEL_SECRET = channel_secret;
  process.env.LINE_CHANNEL_ACCESS_TOKEN = access_token;

  try {
    const result = await verifyLineBot();
    return {
      valid: result.valid,
      displayName: result.botName,
      publicId: result.botName,
      error: result.valid ? undefined : 'Invalid LINE credentials',
    };
  } finally {
    process.env.LINE_CHANNEL_ID = originalId;
    process.env.LINE_CHANNEL_SECRET = originalSecret;
    process.env.LINE_CHANNEL_ACCESS_TOKEN = originalToken;
  }
}

// Test Zalo connection
async function testZalo(credentials: Record<string, string>): Promise<VerifyResult> {
  const { oa_id, access_token } = credentials;

  if (!oa_id || !access_token) {
    return { valid: false, error: 'OA ID and Access Token are required' };
  }

  // Temporarily set env vars for the provider
  const originalId = process.env.ZALO_OA_ID;
  const originalToken = process.env.ZALO_ACCESS_TOKEN;
  process.env.ZALO_OA_ID = oa_id;
  process.env.ZALO_ACCESS_TOKEN = access_token;

  try {
    const result = await verifyZaloOA();
    return {
      valid: result.valid,
      displayName: result.oaName,
      error: result.valid ? undefined : 'Invalid Zalo credentials',
    };
  } finally {
    process.env.ZALO_OA_ID = originalId;
    process.env.ZALO_ACCESS_TOKEN = originalToken;
  }
}

// Test KakaoTalk connection
async function testKakao(credentials: Record<string, string>): Promise<VerifyResult> {
  const { rest_api_key, admin_key } = credentials;

  if (!admin_key) {
    return { valid: false, error: 'Admin Key is required' };
  }

  // Temporarily set env vars for the provider
  const originalApiKey = process.env.KAKAO_REST_API_KEY;
  const originalAdminKey = process.env.KAKAO_ADMIN_KEY;
  process.env.KAKAO_REST_API_KEY = rest_api_key;
  process.env.KAKAO_ADMIN_KEY = admin_key;

  try {
    const result = await verifyKakaoChannel();
    return {
      valid: result.valid,
      displayName: result.channelName,
      error: result.valid ? undefined : 'Invalid KakaoTalk credentials',
    };
  } finally {
    process.env.KAKAO_REST_API_KEY = originalApiKey;
    process.env.KAKAO_ADMIN_KEY = originalAdminKey;
  }
}
