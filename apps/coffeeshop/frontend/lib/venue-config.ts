/**
 * Venue Onboarding Configuration
 *
 * This file defines the onboarding experience configuration that can be
 * customized via backoffice for each venue.
 *
 * In production, this would be fetched from an API endpoint.
 * For now, it's a local config file.
 */

export interface VenueOnboardingConfig {
  // Welcome Message
  welcomeMessage: {
    enabled: boolean;
    title: {
      en: string;
      vi: string;
      it: string;
    }; // Can include {venueName} placeholder
    subtitle?: {
      en: string;
      vi: string;
      it: string;
    };
    icon: string; // Emoji or image URL
  };

  // Quick Actions
  quickActions: {
    wifi: {
      enabled: boolean;
      ssid: string;
      password: string;
      showQRCode: boolean; // Auto-generate WiFi QR code
    };
    shareLocation: {
      enabled: boolean;
      customMessage?: string; // "I'm at {venueName}!"
      platforms: ('whatsapp' | 'telegram' | 'copy')[];
    };
    callWaiter: {
      enabled: boolean;
      buttonText: {
        en: string;
        vi: string;
        it: string;
      };
      notificationMethod: 'websocket' | 'api' | 'mock'; // For future integration
    };
    languageCurrency: {
      enabled: boolean;
      showLanguageSelector: boolean;
      showCurrencySelector: boolean;
      autoDetect: boolean;
    };
  };

  // Auth CTA (Login/Signup)
  authCTA: {
    enabled: boolean;
    title: {
      en: string;
      vi: string;
      it: string;
    };
    benefits: {
      en: string[];
      vi: string[];
      it: string[];
    };
    allowSkip: boolean;
  };

  // Behavior
  behavior: {
    showOnce: boolean; // Show only on first visit
    allowDismiss: boolean; // Can user close modal?
    autoCloseAfter?: number; // Auto-close after X seconds (optional)
  };
}

/**
 * Default configuration for ROOTS Coffee & Kitchen
 *
 * TODO: In production, fetch this from API:
 * GET /api/venues/{venueId}/onboarding-config
 */
export const defaultVenueConfig: VenueOnboardingConfig = {
  welcomeMessage: {
    enabled: true,
    title: {
      en: 'Welcome to {venueName}',
      vi: 'Chào mừng đến {venueName}',
      it: 'Benvenuto a {venueName}',
    },
    subtitle: {
      en: 'Table {tableNumber}',
      vi: 'Bàn {tableNumber}',
      it: 'Tavolo {tableNumber}',
    },
    icon: '👋',
  },

  quickActions: {
    wifi: {
      enabled: true,
      ssid: 'RootsGuest',
      password: 'coffee2024',
      showQRCode: true,
    },
    shareLocation: {
      enabled: true,
      customMessage: "I'm at {venueName}! Join me 😊",
      platforms: ['whatsapp', 'telegram', 'copy'],
    },
    callWaiter: {
      enabled: true,
      buttonText: {
        en: 'Call Staff',
        vi: 'Gọi Nhân Viên',
        it: 'Chiama Staff',
      },
      notificationMethod: 'mock', // Will be 'websocket' in production
    },
    languageCurrency: {
      enabled: true,
      showLanguageSelector: true,
      showCurrencySelector: true,
      autoDetect: true,
    },
  },

  authCTA: {
    enabled: true,
    title: {
      en: 'Unlock Advanced Features',
      vi: 'Mở Khóa Tính Năng Cao Cấp',
      it: 'Sblocca Funzioni Avanzate',
    },
    benefits: {
      en: [
        'Loyalty Points & Rewards',
        'Saved Dietary Preferences',
        'Fast Reorder Favorites',
        'Order History & Analytics',
      ],
      vi: [
        'Điểm Thưởng & Quà Tặng',
        'Lưu Sở Thích Ăn Uống',
        'Đặt Lại Món Yêu Thích',
        'Lịch Sử Đơn Hàng',
      ],
      it: [
        'Punti Fedeltà & Premi',
        'Preferenze Alimentari Salvate',
        'Riordina Favoriti Velocemente',
        'Storico Ordini & Statistiche',
      ],
    },
    allowSkip: true,
  },

  behavior: {
    showOnce: true,
    allowDismiss: true,
  },
};

/**
 * Get venue configuration
 *
 * @param venueId - Venue identifier (from QR code scan)
 * @returns Venue onboarding configuration
 *
 * TODO: Fetch from API in production
 */
export async function getVenueConfig(
  venueId?: string
): Promise<VenueOnboardingConfig> {
  // In production:
  // const response = await fetch(`/api/venues/${venueId}/onboarding-config`);
  // return response.json();

  // For now, return default config
  return defaultVenueConfig;
}

/**
 * Update venue configuration (Backoffice only)
 *
 * @param venueId - Venue identifier
 * @param config - New configuration
 *
 * TODO: Implement in backoffice
 */
export async function updateVenueConfig(
  venueId: string,
  config: Partial<VenueOnboardingConfig>
): Promise<void> {
  // In production:
  // await fetch(`/api/venues/${venueId}/onboarding-config`, {
  //   method: 'PATCH',
  //   body: JSON.stringify(config),
  // });

  console.log('TODO: Implement updateVenueConfig', { venueId, config });
}
