// Channel Router
// Routes incoming messages from various channels to the customer chat service

import { supabaseAdmin } from '@/lib/supabase-admin';
import { customerChat, CustomerChatRequest, CustomerChatResponse } from './customer-chat-service';

// Notification providers for sending responses
import { sendWhatsAppText } from '@/lib/notifications/providers/whatsapp-provider';
import { sendTelegramMessage } from '@/lib/notifications/providers/telegram-provider';
import { sendLineMessage } from '@/lib/notifications/providers/line-provider';
import { sendZaloMessage } from '@/lib/notifications/providers/zalo-provider';

export interface IncomingMessage {
  channel: 'whatsapp' | 'telegram' | 'line' | 'zalo';
  channelUserId: string;
  message: string;
  // Channel-specific metadata
  channelMessageId?: string;
  customerName?: string;
  customerPhone?: string;
  // For location routing
  locationId?: string;
  // Raw payload for debugging
  rawPayload?: unknown;
}

export interface ChannelCredentials {
  whatsapp?: {
    phoneNumberId: string;
    accessToken: string;
  };
  telegram?: {
    botToken: string;
  };
  line?: {
    channelAccessToken: string;
  };
  zalo?: {
    accessToken: string;
    oaId: string;
  };
}

// Get location ID from channel user mapping
async function getLocationForChannelUser(
  channel: string,
  channelUserId: string
): Promise<string | null> {
  // First check if there's an active conversation for this user
  const { data: conversation } = await supabaseAdmin
    .from('customer_conversations')
    .select('location_id')
    .eq('channel', channel)
    .eq('channel_user_id', channelUserId)
    .eq('status', 'active')
    .order('last_message_at', { ascending: false })
    .limit(1)
    .single();

  if (conversation) {
    return conversation.location_id;
  }

  // Check merchant_notification_channels for a default location
  // This assumes the business has registered their channel
  const { data: channelConfig } = await supabaseAdmin
    .from('merchant_notification_channels')
    .select('location_id')
    .eq('channel_type', channel)
    .eq('is_active', true)
    .limit(1)
    .single();

  return channelConfig?.location_id || null;
}

// Get credentials for a channel
async function getChannelCredentials(
  locationId: string,
  channel: string
): Promise<ChannelCredentials[keyof ChannelCredentials] | null> {
  const { data } = await supabaseAdmin
    .from('merchant_notification_channels')
    .select('credentials')
    .eq('location_id', locationId)
    .eq('channel_type', channel)
    .eq('is_active', true)
    .single();

  return data?.credentials || null;
}

// Send response back through the same channel
async function sendChannelResponse(
  channel: string,
  channelUserId: string,
  message: string,
  locationId: string
): Promise<boolean> {
  const credentials = await getChannelCredentials(locationId, channel);

  if (!credentials) {
    console.error(`No credentials found for ${channel} at location ${locationId}`);
    return false;
  }

  try {
    switch (channel) {
      case 'whatsapp': {
        // Uses env vars WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN
        await sendWhatsAppText(channelUserId, message);
        break;
      }
      case 'telegram': {
        // Uses env var TELEGRAM_BOT_TOKEN
        await sendTelegramMessage({ chatId: channelUserId, text: message });
        break;
      }
      case 'line': {
        // Uses env var LINE_CHANNEL_ACCESS_TOKEN
        await sendLineMessage({
          userId: channelUserId,
          messages: [{ type: 'text', text: message }],
        });
        break;
      }
      case 'zalo': {
        // Uses env var ZALO_OA_ACCESS_TOKEN
        await sendZaloMessage({
          userId: channelUserId,
          text: message,
        });
        break;
      }
      default:
        console.error(`Unknown channel: ${channel}`);
        return false;
    }
    return true;
  } catch (error) {
    console.error(`Failed to send ${channel} response:`, error);
    return false;
  }
}

// Main router function
export async function routeIncomingMessage(
  incoming: IncomingMessage
): Promise<CustomerChatResponse | null> {
  // Get location ID
  let locationId = incoming.locationId;

  if (!locationId) {
    const foundLocation = await getLocationForChannelUser(incoming.channel, incoming.channelUserId);
    locationId = foundLocation ?? undefined;
  }

  if (!locationId) {
    console.error(
      `Could not determine location for ${incoming.channel} user ${incoming.channelUserId}`
    );
    return null;
  }

  // Build chat request
  const chatRequest: CustomerChatRequest = {
    locationId,
    channel: incoming.channel,
    channelUserId: incoming.channelUserId,
    message: incoming.message,
    customerName: incoming.customerName,
    customerPhone: incoming.customerPhone,
  };

  // Process through AI chat
  const response = await customerChat(chatRequest);

  // Send response back through the channel
  await sendChannelResponse(incoming.channel, incoming.channelUserId, response.message, locationId);

  return response;
}

// Parse incoming webhook payloads from different channels
export function parseWhatsAppWebhook(payload: {
  entry?: Array<{
    changes?: Array<{
      value?: {
        messages?: Array<{
          from: string;
          id: string;
          text?: { body: string };
          type: string;
        }>;
        contacts?: Array<{
          profile?: { name: string };
          wa_id: string;
        }>;
      };
    }>;
  }>;
}): IncomingMessage | null {
  const entry = payload.entry?.[0];
  const change = entry?.changes?.[0];
  const value = change?.value;
  const message = value?.messages?.[0];

  if (!message || message.type !== 'text' || !message.text?.body) {
    return null;
  }

  const contact = value?.contacts?.[0];

  return {
    channel: 'whatsapp',
    channelUserId: message.from,
    message: message.text.body,
    channelMessageId: message.id,
    customerName: contact?.profile?.name,
    customerPhone: message.from,
    rawPayload: payload,
  };
}

export function parseTelegramWebhook(payload: {
  message?: {
    message_id: number;
    from?: { id: number; first_name?: string; last_name?: string };
    chat?: { id: number };
    text?: string;
  };
}): IncomingMessage | null {
  const message = payload.message;

  if (!message || !message.text) {
    return null;
  }

  const fromUser = message.from;
  const chatId = message.chat?.id?.toString() || fromUser?.id?.toString();

  if (!chatId) {
    return null;
  }

  return {
    channel: 'telegram',
    channelUserId: chatId,
    message: message.text,
    channelMessageId: message.message_id.toString(),
    customerName:
      [fromUser?.first_name, fromUser?.last_name].filter(Boolean).join(' ') || undefined,
    rawPayload: payload,
  };
}

export function parseLINEWebhook(payload: {
  events?: Array<{
    type: string;
    source?: { userId?: string };
    message?: { id: string; type: string; text?: string };
    replyToken?: string;
  }>;
}): IncomingMessage | null {
  const event = payload.events?.[0];

  if (!event || event.type !== 'message' || event.message?.type !== 'text') {
    return null;
  }

  const userId = event.source?.userId;
  if (!userId) {
    return null;
  }

  return {
    channel: 'line',
    channelUserId: userId,
    message: event.message.text || '',
    channelMessageId: event.message.id,
    rawPayload: payload,
  };
}

export function parseZaloWebhook(payload: {
  event_name?: string;
  sender?: { id: string };
  message?: { msg_id: string; text?: string };
}): IncomingMessage | null {
  if (payload.event_name !== 'user_send_text' || !payload.message?.text) {
    return null;
  }

  const senderId = payload.sender?.id;
  if (!senderId) {
    return null;
  }

  return {
    channel: 'zalo',
    channelUserId: senderId,
    message: payload.message.text,
    channelMessageId: payload.message.msg_id,
    rawPayload: payload,
  };
}
