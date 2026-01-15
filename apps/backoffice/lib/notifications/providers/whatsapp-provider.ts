/**
 * WhatsApp Business Notification Provider
 *
 * Uses WhatsApp Business API (via Meta Cloud API) to send notifications.
 * Most important messaging channel globally with 2B+ users.
 *
 * Setup:
 * 1. Create Meta Business Account at https://business.facebook.com
 * 2. Set up WhatsApp Business API in Meta Developer Console
 * 3. Get Phone Number ID and Access Token
 * 4. Set WHATSAPP_PHONE_NUMBER_ID and WHATSAPP_ACCESS_TOKEN env vars
 * 5. Create and get approval for message templates
 *
 * API Docs: https://developers.facebook.com/docs/whatsapp/cloud-api
 *
 * Note: WhatsApp requires pre-approved templates for business-initiated messages.
 * Free-form messages only allowed within 24h of customer message.
 */

const WHATSAPP_API_VERSION = 'v18.0';
const WHATSAPP_API_BASE = `https://graph.facebook.com/${WHATSAPP_API_VERSION}`;

export interface WhatsAppTextMessage {
  type: 'text';
  text: string;
  previewUrl?: boolean;
}

export interface WhatsAppTemplateMessage {
  type: 'template';
  templateName: string;
  languageCode: string;
  components?: WhatsAppTemplateComponent[];
}

export interface WhatsAppTemplateComponent {
  type: 'header' | 'body' | 'button';
  parameters: WhatsAppParameter[];
}

export interface WhatsAppParameter {
  type: 'text' | 'currency' | 'date_time' | 'image' | 'document' | 'video';
  text?: string;
  currency?: { fallback_value: string; code: string; amount_1000: number };
  date_time?: { fallback_value: string };
  image?: { link: string };
}

export interface WhatsAppInteractiveMessage {
  type: 'interactive';
  interactive: {
    type: 'button' | 'list';
    header?: { type: 'text'; text: string };
    body: { text: string };
    footer?: { text: string };
    action: {
      buttons?: Array<{ type: 'reply'; reply: { id: string; title: string } }>;
      button?: string;
      sections?: Array<{
        title: string;
        rows: Array<{ id: string; title: string; description?: string }>;
      }>;
    };
  };
}

export type WhatsAppMessage =
  | WhatsAppTextMessage
  | WhatsAppTemplateMessage
  | WhatsAppInteractiveMessage;

export interface WhatsAppOptions {
  to: string; // Phone number in international format (e.g., 393331234567)
  message: WhatsAppMessage;
}

export interface WhatsAppResult {
  success: boolean;
  messageId?: string;
  error?: string;
  errorCode?: string;
}

/**
 * Send message via WhatsApp Business API
 */
export async function sendWhatsAppMessage(options: WhatsAppOptions): Promise<WhatsAppResult> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    return { success: false, error: 'WhatsApp Business API not configured' };
  }

  if (!options.to) {
    return { success: false, error: 'Recipient phone number is required' };
  }

  // Clean phone number (remove +, spaces, dashes)
  const cleanPhone = options.to.replace(/[\s+-]/g, '');

  try {
    let body: Record<string, unknown>;

    if (options.message.type === 'text') {
      body = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanPhone,
        type: 'text',
        text: {
          preview_url: options.message.previewUrl || false,
          body: options.message.text,
        },
      };
    } else if (options.message.type === 'template') {
      body = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanPhone,
        type: 'template',
        template: {
          name: options.message.templateName,
          language: { code: options.message.languageCode },
          components: options.message.components || [],
        },
      };
    } else if (options.message.type === 'interactive') {
      body = {
        messaging_product: 'whatsapp',
        recipient_type: 'individual',
        to: cleanPhone,
        type: 'interactive',
        interactive: options.message.interactive,
      };
    } else {
      return { success: false, error: 'Unsupported message type' };
    }

    const response = await fetch(`${WHATSAPP_API_BASE}/${phoneNumberId}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (result.error) {
      return {
        success: false,
        error: result.error.message || 'Failed to send WhatsApp message',
        errorCode: String(result.error.code),
      };
    }

    return {
      success: true,
      messageId: result.messages?.[0]?.id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send template message (for business-initiated conversations)
 */
export async function sendWhatsAppTemplate(
  to: string,
  templateName: string,
  languageCode: string,
  variables: Record<string, string>
): Promise<WhatsAppResult> {
  // Build body parameters from variables
  const bodyParameters: WhatsAppParameter[] = Object.values(variables).map((value) => ({
    type: 'text' as const,
    text: value,
  }));

  return sendWhatsAppMessage({
    to,
    message: {
      type: 'template',
      templateName,
      languageCode,
      components:
        bodyParameters.length > 0 ? [{ type: 'body', parameters: bodyParameters }] : undefined,
    },
  });
}

/**
 * Send simple text message (only works within 24h customer service window)
 */
export async function sendWhatsAppText(to: string, text: string): Promise<WhatsAppResult> {
  return sendWhatsAppMessage({
    to,
    message: { type: 'text', text },
  });
}

/**
 * Send interactive button message
 */
export async function sendWhatsAppButtons(
  to: string,
  bodyText: string,
  buttons: Array<{ id: string; title: string }>,
  headerText?: string,
  footerText?: string
): Promise<WhatsAppResult> {
  return sendWhatsAppMessage({
    to,
    message: {
      type: 'interactive',
      interactive: {
        type: 'button',
        header: headerText ? { type: 'text', text: headerText } : undefined,
        body: { text: bodyText },
        footer: footerText ? { text: footerText } : undefined,
        action: {
          buttons: buttons.slice(0, 3).map((btn) => ({
            type: 'reply' as const,
            reply: { id: btn.id, title: btn.title.slice(0, 20) }, // Max 20 chars
          })),
        },
      },
    },
  });
}

/**
 * Verify WhatsApp Business API connection
 */
export async function verifyWhatsAppBusiness(): Promise<{
  valid: boolean;
  phoneNumber?: string;
  displayName?: string;
}> {
  const phoneNumberId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!phoneNumberId || !accessToken) {
    return { valid: false };
  }

  try {
    const response = await fetch(
      `${WHATSAPP_API_BASE}/${phoneNumberId}?fields=verified_name,display_phone_number`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!response.ok) {
      return { valid: false };
    }

    const data = await response.json();
    return {
      valid: true,
      phoneNumber: data.display_phone_number,
      displayName: data.verified_name,
    };
  } catch {
    return { valid: false };
  }
}

/**
 * Get message templates
 */
export async function getWhatsAppTemplates(): Promise<{
  success: boolean;
  templates?: Array<{ name: string; status: string; language: string }>;
  error?: string;
}> {
  const businessId = process.env.WHATSAPP_BUSINESS_ID;
  const accessToken = process.env.WHATSAPP_ACCESS_TOKEN;

  if (!businessId || !accessToken) {
    return { success: false, error: 'WhatsApp Business ID not configured' };
  }

  try {
    const response = await fetch(`${WHATSAPP_API_BASE}/${businessId}/message_templates`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const data = await response.json();

    if (data.error) {
      return { success: false, error: data.error.message };
    }

    return {
      success: true,
      templates: data.data?.map((t: Record<string, unknown>) => ({
        name: t.name,
        status: t.status,
        language: t.language,
      })),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Suggested WhatsApp template names for GUDBRO
 * These need to be created and approved in Meta Business Manager
 */
export const WHATSAPP_TEMPLATE_NAMES = {
  reservation_confirmed: 'reservation_confirmed',
  reservation_reminder_24h: 'reservation_reminder_24h',
  reservation_reminder_2h: 'reservation_reminder_2h',
  reservation_cancelled: 'reservation_cancelled',
  reservation_updated: 'reservation_updated',
  wallet_topup_success: 'wallet_topup_success',
  wallet_payment_success: 'wallet_payment_success',
  wallet_low_balance: 'wallet_low_balance',
} as const;

/**
 * Format reservation for WhatsApp template
 * Returns the template name and variables to use
 */
export function formatReservationForWhatsApp(
  type: string,
  variables: Record<string, string | number>,
  locale: string = 'en'
): { templateName: string; languageCode: string; variables: Record<string, string> } {
  const { guest_name, restaurant_name, date, time, party_size, reservation_code } = variables;

  const templateMap: Record<string, string> = {
    reservation_confirmed: WHATSAPP_TEMPLATE_NAMES.reservation_confirmed,
    reminder_24h: WHATSAPP_TEMPLATE_NAMES.reservation_reminder_24h,
    reminder_2h: WHATSAPP_TEMPLATE_NAMES.reservation_reminder_2h,
    reservation_cancelled: WHATSAPP_TEMPLATE_NAMES.reservation_cancelled,
  };

  // Map locale to WhatsApp language code
  const languageMap: Record<string, string> = {
    en: 'en',
    it: 'it',
    vi: 'vi',
    ja: 'ja',
    ko: 'ko',
    th: 'th',
    zh: 'zh_CN',
  };

  return {
    templateName: templateMap[type] || WHATSAPP_TEMPLATE_NAMES.reservation_confirmed,
    languageCode: languageMap[locale] || 'en',
    variables: {
      guest_name: String(guest_name),
      restaurant_name: String(restaurant_name),
      date: String(date),
      time: String(time),
      party_size: String(party_size),
      reservation_code: String(reservation_code),
    },
  };
}

/**
 * Format wallet notification for WhatsApp template
 */
export function formatWalletForWhatsApp(
  type: string,
  variables: Record<string, string | number>,
  locale: string = 'en'
): { templateName: string; languageCode: string; variables: Record<string, string> } {
  const { amount, bonus, total, balance, restaurant_name } = variables;

  const templateMap: Record<string, string> = {
    topup_success: WHATSAPP_TEMPLATE_NAMES.wallet_topup_success,
    payment_success: WHATSAPP_TEMPLATE_NAMES.wallet_payment_success,
    low_balance: WHATSAPP_TEMPLATE_NAMES.wallet_low_balance,
  };

  const languageMap: Record<string, string> = {
    en: 'en',
    it: 'it',
    vi: 'vi',
  };

  return {
    templateName: templateMap[type] || WHATSAPP_TEMPLATE_NAMES.wallet_topup_success,
    languageCode: languageMap[locale] || 'en',
    variables: {
      restaurant_name: String(restaurant_name),
      amount: String(amount),
      bonus: String(bonus || '0'),
      total: String(total || amount),
      balance: String(balance),
    },
  };
}

/**
 * Format simple text for WhatsApp (for 24h service window)
 */
export function formatTextForWhatsApp(
  type: string,
  variables: Record<string, string | number>,
  locale: string = 'en'
): string {
  const { guest_name, restaurant_name, date, time, party_size, reservation_code } = variables;

  const messages: Record<string, Record<string, string>> = {
    en: {
      reservation_confirmed: `✅ *Reservation Confirmed*\n\nHello ${guest_name}!\n\nYour reservation at *${restaurant_name}* is confirmed:\n\n📅 Date: ${date}\n⏰ Time: ${time}\n👥 Party: ${party_size} guests\n🎫 Code: ${reservation_code}\n\nSee you soon!`,
      reminder_24h: `📅 *Reminder: Tomorrow!*\n\nHi ${guest_name}, reminder about your reservation:\n\n🍽 ${restaurant_name}\n📅 ${date} at ${time}\n👥 ${party_size} guests\n\nSee you tomorrow!`,
      reminder_2h: `⏰ *Reminder: In 2 hours!*\n\n${guest_name}, your table at *${restaurant_name}* is ready in 2 hours.\n\n⏰ ${time}\n👥 ${party_size} guests\n\nSee you soon!`,
      reservation_cancelled: `❌ *Reservation Cancelled*\n\nYour reservation at ${restaurant_name} has been cancelled.\n\n📅 Was: ${date} at ${time}\n🎫 Code: ${reservation_code}\n\nWe hope to see you again soon!`,
    },
    it: {
      reservation_confirmed: `✅ *Prenotazione Confermata*\n\nCiao ${guest_name}!\n\nLa tua prenotazione da *${restaurant_name}* è confermata:\n\n📅 Data: ${date}\n⏰ Ora: ${time}\n👥 Persone: ${party_size}\n🎫 Codice: ${reservation_code}\n\nA presto!`,
      reminder_24h: `📅 *Promemoria: Domani!*\n\nCiao ${guest_name}, ricordati della prenotazione:\n\n🍽 ${restaurant_name}\n📅 ${date} alle ${time}\n👥 ${party_size} persone\n\nA domani!`,
    },
    vi: {
      reservation_confirmed: `✅ *Xác Nhận Đặt Bàn*\n\nXin chào ${guest_name}!\n\nĐặt bàn của bạn tại *${restaurant_name}* đã được xác nhận:\n\n📅 Ngày: ${date}\n⏰ Giờ: ${time}\n👥 Số khách: ${party_size}\n🎫 Mã: ${reservation_code}\n\nHẹn gặp bạn!`,
    },
  };

  const localeMessages = messages[locale] || messages.en;
  return (
    localeMessages[type] ||
    localeMessages.reservation_confirmed ||
    `Notification from ${restaurant_name}`
  );
}
