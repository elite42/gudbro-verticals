/**
 * Send Notification Helper
 *
 * Sends notifications via the appropriate channel provider.
 * Extracted from /api/notifications/process for reuse in Trigger.dev tasks.
 */

import { sendEmail, textToHtml } from '@/lib/notifications/providers/email-provider';
import { sendPushNotification } from '@/lib/notifications/providers/push-provider';
import {
  sendTelegramMessage,
  formatReservationForTelegram,
} from '@/lib/notifications/providers/telegram-provider';
import {
  sendZaloMessage,
  formatReservationForZalo,
} from '@/lib/notifications/providers/zalo-provider';
import {
  sendLineText,
  formatReservationForLine,
} from '@/lib/notifications/providers/line-provider';
import {
  sendKakaoMessage,
  formatReservationForKakao,
} from '@/lib/notifications/providers/kakao-provider';
import {
  sendWhatsAppTemplate,
  formatReservationForWhatsApp,
} from '@/lib/notifications/providers/whatsapp-provider';

interface Notification {
  id: string;
  reservation_id: string;
  notification_type: string;
  channel: string;
  recipient: string;
  recipient_name: string | null;
  subject: string | null;
  body: string;
  status: string;
}

interface SendResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

/**
 * Send notification via appropriate channel
 */
export async function sendNotification(notification: Notification): Promise<SendResult> {
  const { channel, recipient, recipient_name, subject, body, notification_type, reservation_id } =
    notification;

  switch (channel) {
    case 'email':
      return sendEmail({
        to: recipient,
        subject: subject || 'Reservation Notification',
        text: body,
        html: textToHtml(body),
      });

    case 'push':
      return sendPushNotification({
        accountId: recipient,
        title: subject || 'Reservation Update',
        body,
        data: {
          type: notification_type,
          reservationId: reservation_id,
        },
      });

    case 'telegram': {
      const formattedMessage = formatReservationForTelegram(notification_type, {
        guest_name: recipient_name || 'Guest',
        restaurant_name: 'Restaurant',
        date: '',
        time: '',
        party_size: 0,
        reservation_code: '',
      });

      const telegramResult = await sendTelegramMessage({
        chatId: recipient,
        text: formattedMessage || body,
        parseMode: 'HTML',
      });

      return {
        success: telegramResult.success,
        messageId: telegramResult.messageId?.toString(),
        error: telegramResult.error,
      };
    }

    case 'sms':
      return { success: false, error: 'SMS provider not configured' };

    case 'whatsapp': {
      const whatsappData = formatReservationForWhatsApp(notification_type, {
        guest_name: recipient_name || 'Guest',
        restaurant_name: 'Restaurant',
        date: '',
        time: '',
        party_size: 0,
        reservation_code: '',
      });

      const whatsappResult = await sendWhatsAppTemplate(
        recipient,
        whatsappData.templateName,
        whatsappData.languageCode,
        whatsappData.variables
      );

      return {
        success: whatsappResult.success,
        messageId: whatsappResult.messageId,
        error: whatsappResult.error,
      };
    }

    case 'line': {
      const lineMessage = formatReservationForLine(notification_type, {
        guest_name: recipient_name || 'Guest',
        restaurant_name: 'Restaurant',
        date: '',
        time: '',
        party_size: 0,
        reservation_code: '',
      });

      const lineResult = await sendLineText(recipient, lineMessage);
      return {
        success: lineResult.success,
        error: lineResult.error,
      };
    }

    case 'zalo': {
      const zaloMessage = formatReservationForZalo(notification_type, {
        guest_name: recipient_name || 'Guest',
        restaurant_name: 'Restaurant',
        date: '',
        time: '',
        party_size: 0,
        reservation_code: '',
      });

      const zaloResult = await sendZaloMessage({
        userId: recipient,
        text: zaloMessage,
      });

      return {
        success: zaloResult.success,
        messageId: zaloResult.messageId,
        error: zaloResult.error,
      };
    }

    case 'kakao': {
      const kakaoMessage = formatReservationForKakao(notification_type, {
        guest_name: recipient_name || 'Guest',
        restaurant_name: 'Restaurant',
        date: '',
        time: '',
        party_size: 0,
        reservation_code: '',
      });

      const kakaoResult = await sendKakaoMessage({
        userId: recipient,
        message: kakaoMessage,
      });

      return {
        success: kakaoResult.success,
        messageId: kakaoResult.messageId,
        error: kakaoResult.error,
      };
    }

    default:
      return { success: false, error: `Unknown channel: ${channel}` };
  }
}
