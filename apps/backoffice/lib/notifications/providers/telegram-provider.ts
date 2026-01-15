/**
 * Telegram Notification Provider
 *
 * Uses Telegram Bot API to send notifications.
 * FREE unlimited messages - great for Asia/MENA markets.
 *
 * Setup:
 * 1. Create bot via @BotFather on Telegram
 * 2. Get bot token and set TELEGRAM_BOT_TOKEN env var
 * 3. User adds bot and shares chat_id (stored in preferences)
 */

export interface TelegramOptions {
  chatId: string;
  text: string;
  parseMode?: 'HTML' | 'Markdown' | 'MarkdownV2';
  buttons?: TelegramButton[];
  disableNotification?: boolean;
}

export interface TelegramButton {
  text: string;
  url?: string;
  callbackData?: string;
}

export interface TelegramResult {
  success: boolean;
  messageId?: number;
  error?: string;
}

/**
 * Send message via Telegram Bot API
 */
export async function sendTelegramMessage(options: TelegramOptions): Promise<TelegramResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return { success: false, error: 'Telegram bot token not configured' };
  }

  if (!options.chatId) {
    return { success: false, error: 'Chat ID is required' };
  }

  try {
    // Build request body
    const body: Record<string, unknown> = {
      chat_id: options.chatId,
      text: options.text,
      parse_mode: options.parseMode || 'HTML',
      disable_notification: options.disableNotification || false,
    };

    // Add inline keyboard if buttons provided
    if (options.buttons && options.buttons.length > 0) {
      body.reply_markup = {
        inline_keyboard: [
          options.buttons.map((btn) => ({
            text: btn.text,
            url: btn.url,
            callback_data: btn.callbackData,
          })),
        ],
      };
    }

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const result = await response.json();

    if (!result.ok) {
      return {
        success: false,
        error: result.description || 'Failed to send Telegram message',
      };
    }

    return {
      success: true,
      messageId: result.result.message_id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send photo with caption via Telegram
 */
export async function sendTelegramPhoto(
  chatId: string,
  photoUrl: string,
  caption?: string
): Promise<TelegramResult> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return { success: false, error: 'Telegram bot token not configured' };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        photo: photoUrl,
        caption,
        parse_mode: 'HTML',
      }),
    });

    const result = await response.json();

    if (!result.ok) {
      return { success: false, error: result.description };
    }

    return { success: true, messageId: result.result.message_id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get bot info to verify token is valid
 */
export async function verifyTelegramBot(): Promise<{ valid: boolean; botName?: string }> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return { valid: false };
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const result = await response.json();

    if (result.ok) {
      return { valid: true, botName: result.result.username };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}

/**
 * Set webhook for receiving messages (for bot interactions)
 */
export async function setTelegramWebhook(webhookUrl: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;

  if (!botToken) {
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: webhookUrl }),
    });

    const result = await response.json();
    return result.ok;
  } catch {
    return false;
  }
}

/**
 * Format reservation notification for Telegram
 */
export function formatReservationForTelegram(
  type: string,
  variables: Record<string, string | number>
): string {
  const { guest_name, restaurant_name, date, time, party_size, reservation_code } = variables;

  switch (type) {
    case 'reservation_confirmed':
      return `
<b>✅ Reservation Confirmed</b>

Hello <b>${guest_name}</b>!

Your reservation at <b>${restaurant_name}</b> is confirmed:

📅 <b>Date:</b> ${date}
⏰ <b>Time:</b> ${time}
👥 <b>Party:</b> ${party_size} guests
🎫 <b>Code:</b> <code>${reservation_code}</code>

See you soon!
      `.trim();

    case 'reminder_24h':
      return `
<b>📅 Reminder: Tomorrow!</b>

Hi ${guest_name}, just a reminder about your reservation:

🍽 <b>${restaurant_name}</b>
📅 ${date} at ${time}
👥 ${party_size} guests
🎫 Code: <code>${reservation_code}</code>

See you tomorrow!
      `.trim();

    case 'reminder_2h':
      return `
<b>⏰ Reminder: In 2 hours!</b>

${guest_name}, your table at <b>${restaurant_name}</b> is ready in 2 hours.

⏰ ${time}
👥 ${party_size} guests

See you soon!
      `.trim();

    case 'reservation_cancelled':
      return `
<b>❌ Reservation Cancelled</b>

Your reservation at ${restaurant_name} has been cancelled.

📅 Was: ${date} at ${time}
🎫 Code: <code>${reservation_code}</code>

We hope to see you again soon!
      `.trim();

    default:
      return `Notification from ${restaurant_name}`;
  }
}
