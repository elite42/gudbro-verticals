/**
 * KakaoTalk Notification Provider
 *
 * Uses Kakao Talk Channel API to send notifications.
 * Dominant messaging platform in South Korea with 50M+ users.
 *
 * Setup:
 * 1. Create Kakao Talk Channel at https://center-pf.kakao.com
 * 2. Register app at https://developers.kakao.com
 * 3. Get API Key and set KAKAO_REST_API_KEY env var
 * 4. For template messages, get sender key and set KAKAO_SENDER_KEY env var
 * 5. User adds channel as friend (stored user_id in preferences)
 *
 * API Docs: https://developers.kakao.com/docs/latest/ko/message/rest-api
 */

const KAKAO_API_BASE = 'https://kapi.kakao.com';
const KAKAO_ALIMTALK_API = 'https://kakaoapi.aligo.in'; // For Alimtalk (requires business verification)

export interface KakaoTextMessage {
  objectType: 'text';
  text: string;
  link: KakaoLink;
  buttonTitle?: string;
}

export interface KakaoLink {
  webUrl?: string;
  mobileWebUrl?: string;
}

export interface KakaoFeedMessage {
  objectType: 'feed';
  content: KakaoContent;
  buttons?: KakaoButton[];
}

export interface KakaoContent {
  title: string;
  description: string;
  imageUrl?: string;
  link: KakaoLink;
}

export interface KakaoButton {
  title: string;
  link: KakaoLink;
}

export type KakaoMessage = KakaoTextMessage | KakaoFeedMessage;

export interface KakaoOptions {
  userId: string;
  message: KakaoMessage;
}

export interface KakaoTemplateOptions {
  phoneNumber: string; // Korean phone number format: 010xxxxxxxx
  templateCode: string;
  templateArgs: Record<string, string>;
  buttons?: KakaoTemplateButton[];
}

export interface KakaoTemplateButton {
  name: string;
  type: 'WL' | 'AL' | 'BK' | 'MD'; // Web Link, App Link, Bot Keyword, Message Delivery
  urlPc?: string;
  urlMobile?: string;
}

export interface KakaoResult {
  success: boolean;
  messageId?: string;
  error?: string;
  errorCode?: string;
}

/**
 * Send message to user via Kakao Talk Channel
 * Note: Requires user to have added the channel as friend
 */
export async function sendKakaoMessage(options: KakaoOptions): Promise<KakaoResult> {
  const apiKey = process.env.KAKAO_REST_API_KEY;
  const adminKey = process.env.KAKAO_ADMIN_KEY;

  if (!apiKey || !adminKey) {
    return { success: false, error: 'Kakao API keys not configured' };
  }

  if (!options.userId) {
    return { success: false, error: 'User ID is required' };
  }

  try {
    // Using the Kakao Talk API for sending messages
    const response = await fetch(`${KAKAO_API_BASE}/v1/api/talk/friends/message/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `KakaoAK ${adminKey}`,
      },
      body: new URLSearchParams({
        receiver_uuids: JSON.stringify([options.userId]),
        template_object: JSON.stringify(options.message),
      }),
    });

    const result = await response.json();

    if (result.successful_receiver_uuids && result.successful_receiver_uuids.length > 0) {
      return { success: true };
    }

    return {
      success: false,
      error: result.failure_info?.[0]?.msg || 'Failed to send Kakao message',
      errorCode: result.failure_info?.[0]?.code,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Send Alimtalk template message (requires business verification)
 * Alimtalk is for transactional/notification messages
 */
export async function sendKakaoAlimtalk(options: KakaoTemplateOptions): Promise<KakaoResult> {
  const apiKey = process.env.KAKAO_ALIMTALK_API_KEY;
  const senderKey = process.env.KAKAO_SENDER_KEY;

  if (!apiKey || !senderKey) {
    return { success: false, error: 'Kakao Alimtalk credentials not configured' };
  }

  try {
    const formData = new URLSearchParams({
      apikey: apiKey,
      userid: process.env.KAKAO_ALIMTALK_USER_ID || '',
      senderkey: senderKey,
      tpl_code: options.templateCode,
      sender: process.env.KAKAO_SENDER_PHONE || '',
      receiver_1: options.phoneNumber,
      subject_1: 'Reservation Notification',
      message_1: Object.entries(options.templateArgs)
        .map(([k, _v]) => `#{${k}}`)
        .join(''), // Template will replace these
    });

    // Add template variables
    Object.entries(options.templateArgs).forEach(([key, value], index) => {
      formData.append(`emtitle_${index + 1}`, key);
      formData.append(`emtitle_${index + 1}_value`, value);
    });

    // Add buttons if provided
    if (options.buttons) {
      options.buttons.forEach((btn, index) => {
        formData.append(`button_${index + 1}_name`, btn.name);
        formData.append(`button_${index + 1}_type`, btn.type);
        if (btn.urlPc) formData.append(`button_${index + 1}_url_pc`, btn.urlPc);
        if (btn.urlMobile) formData.append(`button_${index + 1}_url_mobile`, btn.urlMobile);
      });
    }

    const response = await fetch(`${KAKAO_ALIMTALK_API}/akv10/alimtalk/send/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    const result = await response.json();

    if (result.code === 0) {
      return { success: true, messageId: result.info?.mid };
    }

    return {
      success: false,
      error: result.message || 'Failed to send Alimtalk',
      errorCode: String(result.code),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Verify Kakao API connection
 */
export async function verifyKakaoChannel(): Promise<{ valid: boolean; channelName?: string }> {
  const adminKey = process.env.KAKAO_ADMIN_KEY;

  if (!adminKey) {
    return { valid: false };
  }

  try {
    const response = await fetch(`${KAKAO_API_BASE}/v1/api/talk/profile`, {
      headers: { Authorization: `KakaoAK ${adminKey}` },
    });

    if (response.ok) {
      const data = await response.json();
      return { valid: true, channelName: data.nickName };
    }
    return { valid: false };
  } catch {
    return { valid: false };
  }
}

/**
 * Format reservation notification for KakaoTalk (Korean)
 */
export function formatReservationForKakao(
  type: string,
  variables: Record<string, string | number>
): KakaoFeedMessage {
  const { guest_name, restaurant_name, date, time, party_size, reservation_code } = variables;

  const titles: Record<string, string> = {
    reservation_confirmed: '예약 확정',
    reminder_24h: '내일 예약 알림',
    reminder_2h: '2시간 후 예약',
    reservation_cancelled: '예약 취소',
  };

  const descriptions: Record<string, string> = {
    reservation_confirmed: `${guest_name}님, ${restaurant_name} 예약이 확정되었습니다.\n\n📅 날짜: ${date}\n⏰ 시간: ${time}\n👥 인원: ${party_size}명\n🎫 예약번호: ${reservation_code}`,
    reminder_24h: `${guest_name}님, 내일 예약이 있습니다.\n\n🍽 ${restaurant_name}\n📅 ${date} ${time}\n👥 ${party_size}명`,
    reminder_2h: `${guest_name}님, 2시간 후 예약이 있습니다.\n\n⏰ ${time}\n👥 ${party_size}명`,
    reservation_cancelled: `${restaurant_name} 예약이 취소되었습니다.\n\n📅 ${date} ${time}\n🎫 ${reservation_code}`,
  };

  return {
    objectType: 'feed',
    content: {
      title: titles[type] || '알림',
      description: descriptions[type] || `${restaurant_name}에서 알림`,
      link: {
        webUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://app.gudbro.com',
        mobileWebUrl: process.env.NEXT_PUBLIC_APP_URL || 'https://app.gudbro.com',
      },
    },
    buttons: [
      {
        title: '예약 확인',
        link: {
          webUrl: `${process.env.NEXT_PUBLIC_APP_URL}/reservations/${reservation_code}`,
          mobileWebUrl: `${process.env.NEXT_PUBLIC_APP_URL}/reservations/${reservation_code}`,
        },
      },
    ],
  };
}

/**
 * Format wallet notification for KakaoTalk (Korean)
 */
export function formatWalletForKakao(
  type: string,
  variables: Record<string, string | number>
): KakaoFeedMessage {
  const { amount, bonus, total, balance, restaurant_name } = variables;

  const titles: Record<string, string> = {
    topup_success: '충전 완료',
    payment_success: '결제 완료',
    low_balance: '잔액 부족 알림',
  };

  const descriptions: Record<string, string> = {
    topup_success: `${restaurant_name} 지갑에 ${amount}원이 충전되었습니다.\n\n${bonus ? `🎁 보너스: +${bonus}원\n` : ''}💳 총 충전액: ${total}원\n💰 현재 잔액: ${balance}원`,
    payment_success: `${restaurant_name}에서 ${amount}원이 결제되었습니다.\n\n💰 남은 잔액: ${balance}원`,
    low_balance: `${restaurant_name} 지갑 잔액이 ${balance}원입니다.\n\n충전하고 보너스를 받으세요!`,
  };

  return {
    objectType: 'feed',
    content: {
      title: titles[type] || '지갑 알림',
      description: descriptions[type] || `${restaurant_name}에서 알림`,
      link: {
        webUrl: `${process.env.NEXT_PUBLIC_APP_URL}/wallet`,
        mobileWebUrl: `${process.env.NEXT_PUBLIC_APP_URL}/wallet`,
      },
    },
    buttons: [
      {
        title: '지갑 확인',
        link: {
          webUrl: `${process.env.NEXT_PUBLIC_APP_URL}/wallet`,
          mobileWebUrl: `${process.env.NEXT_PUBLIC_APP_URL}/wallet`,
        },
      },
    ],
  };
}

/**
 * Format simple text message for KakaoTalk
 */
export function formatTextForKakao(text: string, linkUrl?: string): KakaoTextMessage {
  return {
    objectType: 'text',
    text,
    link: {
      webUrl: linkUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://app.gudbro.com',
      mobileWebUrl: linkUrl || process.env.NEXT_PUBLIC_APP_URL || 'https://app.gudbro.com',
    },
  };
}
