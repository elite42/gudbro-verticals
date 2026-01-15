/**
 * LINE Notification Provider
 *
 * Uses LINE Messaging API to send notifications.
 * Dominant in Japan, Thailand, Taiwan, Indonesia with 200M+ users.
 *
 * Setup:
 * 1. Create LINE Official Account at https://manager.line.biz
 * 2. Enable Messaging API in settings
 * 3. Get Channel Access Token and set LINE_CHANNEL_ACCESS_TOKEN env var
 * 4. User adds friend and shares user_id (stored in preferences)
 *
 * API Docs: https://developers.line.biz/en/docs/messaging-api/
 */

const LINE_API_BASE = 'https://api.line.me/v2/bot';

export interface LineTextMessage {
  type: 'text';
  text: string;
  emojis?: LineEmoji[];
}

export interface LineEmoji {
  index: number;
  productId: string;
  emojiId: string;
}

export interface LineFlexMessage {
  type: 'flex';
  altText: string;
  contents: LineFlexContainer;
}

export interface LineFlexContainer {
  type: 'bubble' | 'carousel';
  header?: LineFlexBox;
  hero?: LineFlexImage;
  body?: LineFlexBox;
  footer?: LineFlexBox;
  styles?: Record<string, unknown>;
}

export interface LineFlexBox {
  type: 'box';
  layout: 'horizontal' | 'vertical' | 'baseline';
  contents: LineFlexComponent[];
  spacing?: string;
  margin?: string;
}

export interface LineFlexComponent {
  type: 'text' | 'button' | 'image' | 'box' | 'separator' | 'filler';
  [key: string]: unknown;
}

export interface LineFlexImage {
  type: 'image';
  url: string;
  size?: string;
  aspectRatio?: string;
  aspectMode?: 'cover' | 'fit';
}

export type LineMessage = LineTextMessage | LineFlexMessage;

export interface LineOptions {
  userId: string;
  messages: LineMessage[];
}

export interface LineResult {
  success: boolean;
  error?: string;
}

/**
 * Send message(s) via LINE Messaging API
 * Can send up to 5 messages at once
 */
export async function sendLineMessage(options: LineOptions): Promise<LineResult> {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!accessToken) {
    return { success: false, error: 'LINE channel access token not configured' };
  }

  if (!options.userId) {
    return { success: false, error: 'User ID is required' };
  }

  if (!options.messages || options.messages.length === 0) {
    return { success: false, error: 'At least one message is required' };
  }

  try {
    const response = await fetch(`${LINE_API_BASE}/message/push`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        to: options.userId,
        messages: options.messages.slice(0, 5), // Max 5 messages
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        success: false,
        error: error.message || `LINE API error: ${response.status}`,
      };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send simple text message
 */
export async function sendLineText(userId: string, text: string): Promise<LineResult> {
  return sendLineMessage({
    userId,
    messages: [{ type: 'text', text }],
  });
}

/**
 * Send multicast message to multiple users
 * Can send to up to 500 users at once
 */
export async function sendLineMulticast(
  userIds: string[],
  messages: LineMessage[]
): Promise<LineResult> {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!accessToken) {
    return { success: false, error: 'LINE channel access token not configured' };
  }

  try {
    const response = await fetch(`${LINE_API_BASE}/message/multicast`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        to: userIds.slice(0, 500),
        messages: messages.slice(0, 5),
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get user profile
 */
export async function getLineUserProfile(
  userId: string
): Promise<{ success: boolean; profile?: Record<string, unknown>; error?: string }> {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!accessToken) {
    return { success: false, error: 'LINE channel access token not configured' };
  }

  try {
    const response = await fetch(`${LINE_API_BASE}/profile/${userId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      return { success: false, error: `Failed to get profile: ${response.status}` };
    }

    const profile = await response.json();
    return { success: true, profile };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Verify bot token is valid
 */
export async function verifyLineBot(): Promise<{ valid: boolean; botName?: string }> {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!accessToken) {
    return { valid: false };
  }

  try {
    const response = await fetch(`${LINE_API_BASE}/info`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.ok) {
      const info = await response.json();
      return { valid: true, botName: info.basicId };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}

/**
 * Get message quota
 */
export async function getLineMessageQuota(): Promise<{
  success: boolean;
  quota?: { type: string; value: number };
  error?: string;
}> {
  const accessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!accessToken) {
    return { success: false, error: 'LINE channel access token not configured' };
  }

  try {
    const response = await fetch(`${LINE_API_BASE}/message/quota`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (!response.ok) {
      return { success: false, error: `Failed to get quota: ${response.status}` };
    }

    const data = await response.json();
    return { success: true, quota: data };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Create a reservation confirmation Flex Message
 */
export function createReservationFlexMessage(
  type: string,
  variables: Record<string, string | number>,
  locale: 'en' | 'ja' | 'th' | 'vi' = 'en'
): LineFlexMessage {
  const { guest_name, restaurant_name, date, time, party_size, reservation_code } = variables;

  const labels = {
    en: {
      confirmed: 'Reservation Confirmed',
      reminder24h: 'Reminder: Tomorrow!',
      reminder2h: 'Reminder: In 2 hours!',
      cancelled: 'Reservation Cancelled',
      date: 'Date',
      time: 'Time',
      guests: 'Guests',
      code: 'Code',
      seeYou: 'See you soon!',
    },
    ja: {
      confirmed: 'ご予約確定',
      reminder24h: 'リマインダー：明日！',
      reminder2h: 'リマインダー：2時間後！',
      cancelled: '予約キャンセル',
      date: '日付',
      time: '時間',
      guests: '人数',
      code: '予約番号',
      seeYou: 'お待ちしております！',
    },
    th: {
      confirmed: 'ยืนยันการจอง',
      reminder24h: 'เตือน: พรุ่งนี้!',
      reminder2h: 'เตือน: อีก 2 ชั่วโมง!',
      cancelled: 'ยกเลิกการจอง',
      date: 'วันที่',
      time: 'เวลา',
      guests: 'จำนวน',
      code: 'รหัส',
      seeYou: 'แล้วพบกัน!',
    },
    vi: {
      confirmed: 'Xác nhận đặt bàn',
      reminder24h: 'Nhắc nhở: Ngày mai!',
      reminder2h: 'Nhắc nhở: 2 giờ nữa!',
      cancelled: 'Đã hủy đặt bàn',
      date: 'Ngày',
      time: 'Giờ',
      guests: 'Số khách',
      code: 'Mã',
      seeYou: 'Hẹn gặp bạn!',
    },
  };

  const l = labels[locale];
  const isConfirmation = type === 'reservation_confirmed';
  const isCancellation = type === 'reservation_cancelled';

  const headerColor = isCancellation ? '#DC2626' : isConfirmation ? '#16A34A' : '#2563EB';
  const headerText = isCancellation
    ? l.cancelled
    : isConfirmation
      ? l.confirmed
      : type === 'reminder_24h'
        ? l.reminder24h
        : l.reminder2h;

  return {
    type: 'flex',
    altText: `${headerText} - ${restaurant_name}`,
    contents: {
      type: 'bubble',
      header: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: headerText,
            weight: 'bold',
            size: 'lg',
            color: '#FFFFFF',
          },
        ],
      },
      body: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: String(restaurant_name),
            weight: 'bold',
            size: 'xl',
            margin: 'md',
          },
          {
            type: 'text',
            text: `${guest_name}`,
            size: 'sm',
            color: '#666666',
            margin: 'sm',
          },
          { type: 'separator', margin: 'lg' },
          {
            type: 'box',
            layout: 'vertical',
            margin: 'lg',
            spacing: 'sm',
            contents: [
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  { type: 'text', text: `📅 ${l.date}`, size: 'sm', color: '#666666', flex: 1 },
                  { type: 'text', text: String(date), size: 'sm', weight: 'bold', flex: 2 },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  { type: 'text', text: `⏰ ${l.time}`, size: 'sm', color: '#666666', flex: 1 },
                  { type: 'text', text: String(time), size: 'sm', weight: 'bold', flex: 2 },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  { type: 'text', text: `👥 ${l.guests}`, size: 'sm', color: '#666666', flex: 1 },
                  { type: 'text', text: String(party_size), size: 'sm', weight: 'bold', flex: 2 },
                ],
              },
              {
                type: 'box',
                layout: 'horizontal',
                contents: [
                  { type: 'text', text: `🎫 ${l.code}`, size: 'sm', color: '#666666', flex: 1 },
                  {
                    type: 'text',
                    text: String(reservation_code),
                    size: 'sm',
                    weight: 'bold',
                    flex: 2,
                  },
                ],
              },
            ],
          },
        ],
      },
      footer: {
        type: 'box',
        layout: 'vertical',
        contents: [
          {
            type: 'text',
            text: l.seeYou,
            size: 'sm',
            color: '#888888',
            align: 'center',
          },
        ],
      },
      styles: {
        header: { backgroundColor: headerColor },
      },
    },
  };
}

/**
 * Format simple text reservation notification for LINE
 */
export function formatReservationForLine(
  type: string,
  variables: Record<string, string | number>,
  locale: 'en' | 'ja' | 'th' | 'vi' = 'en'
): string {
  const { guest_name, restaurant_name, date, time, party_size, reservation_code } = variables;

  if (locale === 'ja') {
    switch (type) {
      case 'reservation_confirmed':
        return `✅ ご予約確定

${guest_name}様

${restaurant_name}のご予約が確定しました：

📅 日付：${date}
⏰ 時間：${time}
👥 人数：${party_size}名様
🎫 予約番号：${reservation_code}

お待ちしております！`;

      case 'reminder_24h':
        return `📅 リマインダー：明日！

${guest_name}様、明日のご予約をお忘れなく：

🍽 ${restaurant_name}
📅 ${date} ${time}
👥 ${party_size}名様
🎫 ${reservation_code}

お待ちしております！`;

      default:
        return `${restaurant_name}からのお知らせ`;
    }
  }

  if (locale === 'th') {
    switch (type) {
      case 'reservation_confirmed':
        return `✅ ยืนยันการจอง

สวัสดี ${guest_name}!

การจองที่ ${restaurant_name} ได้รับการยืนยันแล้ว:

📅 วันที่: ${date}
⏰ เวลา: ${time}
👥 จำนวน: ${party_size} ท่าน
🎫 รหัส: ${reservation_code}

แล้วพบกัน!`;

      default:
        return `แจ้งเตือนจาก ${restaurant_name}`;
    }
  }

  // Default English
  switch (type) {
    case 'reservation_confirmed':
      return `✅ Reservation Confirmed

Hello ${guest_name}!

Your reservation at ${restaurant_name} is confirmed:

📅 Date: ${date}
⏰ Time: ${time}
👥 Party: ${party_size} guests
🎫 Code: ${reservation_code}

See you soon!`;

    case 'reminder_24h':
      return `📅 Reminder: Tomorrow!

Hi ${guest_name}, reminder about your reservation:

🍽 ${restaurant_name}
📅 ${date} at ${time}
👥 ${party_size} guests
🎫 Code: ${reservation_code}

See you tomorrow!`;

    case 'reminder_2h':
      return `⏰ Reminder: In 2 hours!

${guest_name}, your table at ${restaurant_name} is ready in 2 hours.

⏰ ${time}
👥 ${party_size} guests

See you soon!`;

    case 'reservation_cancelled':
      return `❌ Reservation Cancelled

Your reservation at ${restaurant_name} has been cancelled.

📅 Was: ${date} at ${time}
🎫 Code: ${reservation_code}

We hope to see you again soon!`;

    default:
      return `Notification from ${restaurant_name}`;
  }
}
