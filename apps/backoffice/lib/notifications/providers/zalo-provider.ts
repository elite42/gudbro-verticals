/**
 * Zalo Notification Provider
 *
 * Uses Zalo Official Account (OA) API to send notifications.
 * Dominant messaging platform in Vietnam with 75M+ users.
 *
 * Setup:
 * 1. Create Official Account at https://oa.zalo.me
 * 2. Get OA ID and generate access token
 * 3. Set ZALO_OA_ACCESS_TOKEN env var
 * 4. User follows OA and shares user_id (stored in preferences)
 *
 * API Docs: https://developers.zalo.me/docs/official-account
 */

const ZALO_API_BASE = 'https://openapi.zalo.me/v3.0/oa';

export interface ZaloOptions {
  userId: string;
  text: string;
  buttons?: ZaloButton[];
}

export interface ZaloButton {
  title: string;
  type: 'oa.open.url' | 'oa.query.show' | 'oa.query.hide' | 'oa.open.phone';
  payload: string; // URL or phone number or query string
}

export interface ZaloTemplateOptions {
  userId: string;
  templateId: string;
  templateData: Record<string, string>;
  buttons?: ZaloButton[];
}

export interface ZaloResult {
  success: boolean;
  messageId?: string;
  error?: string;
  errorCode?: number;
}

/**
 * Send text message via Zalo OA API
 */
export async function sendZaloMessage(options: ZaloOptions): Promise<ZaloResult> {
  const accessToken = process.env.ZALO_OA_ACCESS_TOKEN;

  if (!accessToken) {
    return { success: false, error: 'Zalo OA access token not configured' };
  }

  if (!options.userId) {
    return { success: false, error: 'User ID is required' };
  }

  try {
    // Build message payload
    const message: Record<string, unknown> = {
      text: options.text,
    };

    // Add buttons if provided (Zalo supports up to 5 buttons)
    if (options.buttons && options.buttons.length > 0) {
      message.attachment = {
        type: 'template',
        payload: {
          template_type: 'button',
          buttons: options.buttons.slice(0, 5).map((btn) => ({
            title: btn.title,
            type: btn.type,
            payload: btn.payload,
          })),
        },
      };
    }

    const response = await fetch(`${ZALO_API_BASE}/message/cs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
      body: JSON.stringify({
        recipient: {
          user_id: options.userId,
        },
        message,
      }),
    });

    const result = await response.json();

    if (result.error !== 0) {
      return {
        success: false,
        error: result.message || 'Failed to send Zalo message',
        errorCode: result.error,
      };
    }

    return {
      success: true,
      messageId: result.data?.message_id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send template message via Zalo OA API
 * Templates must be pre-approved by Zalo
 */
export async function sendZaloTemplate(options: ZaloTemplateOptions): Promise<ZaloResult> {
  const accessToken = process.env.ZALO_OA_ACCESS_TOKEN;

  if (!accessToken) {
    return { success: false, error: 'Zalo OA access token not configured' };
  }

  try {
    const payload: Record<string, unknown> = {
      template_id: options.templateId,
      template_data: options.templateData,
    };

    if (options.buttons && options.buttons.length > 0) {
      payload.buttons = options.buttons.slice(0, 5).map((btn) => ({
        title: btn.title,
        type: btn.type,
        payload: btn.payload,
      }));
    }

    const response = await fetch(`${ZALO_API_BASE}/message/template`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
      body: JSON.stringify({
        recipient: {
          user_id: options.userId,
        },
        message: {
          attachment: {
            type: 'template',
            payload,
          },
        },
      }),
    });

    const result = await response.json();

    if (result.error !== 0) {
      return {
        success: false,
        error: result.message || 'Failed to send Zalo template',
        errorCode: result.error,
      };
    }

    return {
      success: true,
      messageId: result.data?.message_id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send image message via Zalo OA API
 */
export async function sendZaloImage(
  userId: string,
  imageUrl: string,
  caption?: string
): Promise<ZaloResult> {
  const accessToken = process.env.ZALO_OA_ACCESS_TOKEN;

  if (!accessToken) {
    return { success: false, error: 'Zalo OA access token not configured' };
  }

  try {
    const message: Record<string, unknown> = {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'media',
          elements: [
            {
              media_type: 'image',
              url: imageUrl,
            },
          ],
        },
      },
    };

    // If caption provided, send as separate text message first
    if (caption) {
      await sendZaloMessage({ userId, text: caption });
    }

    const response = await fetch(`${ZALO_API_BASE}/message/cs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        access_token: accessToken,
      },
      body: JSON.stringify({
        recipient: { user_id: userId },
        message,
      }),
    });

    const result = await response.json();

    if (result.error !== 0) {
      return { success: false, error: result.message, errorCode: result.error };
    }

    return { success: true, messageId: result.data?.message_id };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Get OA info to verify token is valid
 */
export async function verifyZaloOA(): Promise<{ valid: boolean; oaName?: string }> {
  const accessToken = process.env.ZALO_OA_ACCESS_TOKEN;

  if (!accessToken) {
    return { valid: false };
  }

  try {
    const response = await fetch(`${ZALO_API_BASE}/getoa`, {
      headers: { access_token: accessToken },
    });

    const result = await response.json();

    if (result.error === 0 && result.data) {
      return { valid: true, oaName: result.data.name };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}

/**
 * Get user profile by user_id
 */
export async function getZaloUserProfile(
  userId: string
): Promise<{ success: boolean; profile?: Record<string, unknown>; error?: string }> {
  const accessToken = process.env.ZALO_OA_ACCESS_TOKEN;

  if (!accessToken) {
    return { success: false, error: 'Zalo OA access token not configured' };
  }

  try {
    const response = await fetch(`${ZALO_API_BASE}/user/detail?user_id=${userId}`, {
      headers: { access_token: accessToken },
    });

    const result = await response.json();

    if (result.error === 0) {
      return { success: true, profile: result.data };
    }
    return { success: false, error: result.message };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Format reservation notification for Zalo
 * Zalo supports limited formatting - mainly plain text
 */
export function formatReservationForZalo(
  type: string,
  variables: Record<string, string | number>
): string {
  const { guest_name, restaurant_name, date, time, party_size, reservation_code } = variables;

  switch (type) {
    case 'reservation_confirmed':
      return `✅ XÁC NHẬN ĐẶT BÀN

Xin chào ${guest_name}!

Đặt bàn của bạn tại ${restaurant_name} đã được xác nhận:

📅 Ngày: ${date}
⏰ Giờ: ${time}
👥 Số khách: ${party_size}
🎫 Mã đặt bàn: ${reservation_code}

Hẹn gặp bạn!`;

    case 'reminder_24h':
      return `📅 NHẮC NHỞ: NGÀY MAI!

Xin chào ${guest_name}, nhắc bạn về đặt bàn:

🍽 ${restaurant_name}
📅 ${date} lúc ${time}
👥 ${party_size} khách
🎫 Mã: ${reservation_code}

Hẹn gặp bạn ngày mai!`;

    case 'reminder_2h':
      return `⏰ NHẮC NHỞ: 2 GIỜ NỮA!

${guest_name}, bàn của bạn tại ${restaurant_name} sẽ sẵn sàng sau 2 giờ.

⏰ ${time}
👥 ${party_size} khách

Hẹn gặp bạn sớm!`;

    case 'reservation_cancelled':
      return `❌ ĐÃ HỦY ĐẶT BÀN

Đặt bàn của bạn tại ${restaurant_name} đã được hủy.

📅 Đã đặt: ${date} lúc ${time}
🎫 Mã: ${reservation_code}

Hy vọng sớm gặp lại bạn!`;

    default:
      return `Thông báo từ ${restaurant_name}`;
  }
}

/**
 * Format wallet notification for Zalo
 */
export function formatWalletForZalo(
  type: string,
  variables: Record<string, string | number>
): string {
  const { amount, bonus, total, balance, restaurant_name } = variables;

  switch (type) {
    case 'topup_success':
      return `💰 NẠP TIỀN THÀNH CÔNG

Bạn đã nạp ${amount} vào ví tại ${restaurant_name}.

${bonus ? `🎁 Thưởng: +${bonus}\n` : ''}💳 Tổng nhận: ${total}
💰 Số dư mới: ${balance}

Cảm ơn bạn!`;

    case 'payment_success':
      return `✅ THANH TOÁN THÀNH CÔNG

Bạn đã thanh toán ${amount} từ ví tại ${restaurant_name}.

💰 Số dư còn lại: ${balance}

Cảm ơn bạn đã sử dụng ví!`;

    case 'low_balance':
      return `⚠️ SỐ DƯ THẤP

Ví của bạn tại ${restaurant_name} còn ${balance}.

Nạp thêm để nhận thưởng!`;

    default:
      return `Thông báo ví từ ${restaurant_name}`;
  }
}
