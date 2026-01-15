/**
 * QR Code Types
 * Type definitions for QR code management
 */

export type QRType = 'url' | 'wifi';

export type QRContext = 'table' | 'external' | 'takeaway' | 'delivery';

export type QRSource =
  | 'google_maps'
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'tripadvisor'
  | 'website'
  | 'email'
  | 'event'
  | 'flyer'
  | 'table'
  | 'other';

export type WifiSecurity = 'WPA' | 'WEP' | 'nopass';
// Alias for compatibility
export type WiFiSecurity = WifiSecurity;

export interface QRDesign {
  colors: {
    foreground: string;
    background: string;
  };
  logo?: {
    url?: string;
    size?: number;
  };
  pattern?: 'squares' | 'dots' | 'rounded';
  eye_style?: 'square' | 'circle' | 'rounded';
  frame?: {
    enabled: boolean;
    text?: string;
    color?: string;
  };
}

// Export formats
export type ExportFormat = 'png' | 'png-hd' | 'svg' | 'pdf';

export type MaterialPreset =
  | 'paper'
  | 'sticker'
  | 'metal'
  | 'glass'
  | 'fabric'
  | 'tent-card'
  | 'menu'
  | 'tshirt'
  | 'banner'
  | 'business-card'
  | 'newspaper';

export type QRPattern = 'squares' | 'dots' | 'rounded';

// Color mode for professional printing
export type ColorMode = 'rgb' | 'cmyk' | 'grayscale';

export interface ExportOptions {
  format: ExportFormat;
  material?: MaterialPreset;
  customSize?: {
    width: number;
    height: number;
    unit: 'px' | 'cm' | 'in';
  };
  quietZone?: number;
  dpi?: number;
  colorMode?: ColorMode;
  includeBleed?: boolean;
  transparentBg?: boolean;
}

// Export presets for different materials
export const EXPORT_PRESETS: Record<MaterialPreset, ExportOptions> = {
  paper: { format: 'pdf', quietZone: 4, dpi: 300, colorMode: 'cmyk', includeBleed: true },
  sticker: { format: 'svg', quietZone: 2 },
  metal: { format: 'svg', quietZone: 4 },
  glass: { format: 'svg', quietZone: 6 },
  fabric: { format: 'png-hd', quietZone: 6, dpi: 150 },
  'tent-card': { format: 'pdf', quietZone: 4, dpi: 300, colorMode: 'cmyk', includeBleed: true },
  menu: { format: 'pdf', quietZone: 4, dpi: 300, colorMode: 'cmyk' },
  tshirt: { format: 'svg', quietZone: 2, transparentBg: true },
  banner: { format: 'svg', quietZone: 4 },
  'business-card': { format: 'png-hd', quietZone: 2, dpi: 300 },
  newspaper: { format: 'pdf', quietZone: 4, dpi: 150, colorMode: 'grayscale' },
};

// Default QR design
export const DEFAULT_QR_DESIGN: QRDesign = {
  colors: {
    foreground: '#000000',
    background: '#FFFFFF',
  },
  pattern: 'squares',
  eye_style: 'square',
};

// WiFi config type for generateWiFiString
export interface WiFiConfig {
  ssid: string;
  password: string;
  security: WifiSecurity;
  hidden?: boolean;
}

// WiFi string generator
export function generateWiFiString(config: WiFiConfig): string {
  const { ssid, password, security, hidden } = config;
  const hiddenStr = hidden ? 'H:true;' : '';

  if (security === 'nopass') {
    return `WIFI:T:nopass;S:${ssid};${hiddenStr};`;
  }

  return `WIFI:T:${security};S:${ssid};P:${password};${hiddenStr};`;
}

export interface QRCode {
  id: string;
  merchant_id: string;
  type: QRType;
  short_code: string | null;
  destination_url: string | null;
  use_short_url: boolean;
  context: QRContext | null;
  source: QRSource | null;
  table_number: number | null;
  event_id: string | null;
  wifi_ssid: string | null;
  wifi_password: string | null;
  wifi_security: WifiSecurity | null;
  wifi_hidden: boolean;
  title: string | null;
  description: string | null;
  design: QRDesign | null;
  is_active: boolean;
  expires_at: string | null;
  max_scans: number | null;
  total_scans: number;
  last_scanned_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateQRCodeInput {
  merchant_id?: string; // Optional - can be passed separately to createQRCode
  type: QRType;
  destination_url?: string;
  use_short_url?: boolean;
  context?: QRContext;
  source?: QRSource;
  table_number?: number;
  event_id?: string;
  wifi_ssid?: string;
  wifi_password?: string;
  wifi_security?: WifiSecurity;
  wifi_hidden?: boolean;
  title?: string;
  description?: string;
  design?: QRDesign;
  expires_at?: string;
  max_scans?: number;
}

export interface UpdateQRCodeInput {
  destination_url?: string;
  use_short_url?: boolean;
  context?: QRContext;
  source?: QRSource;
  table_number?: number;
  event_id?: string;
  wifi_ssid?: string;
  wifi_password?: string;
  wifi_security?: WifiSecurity;
  wifi_hidden?: boolean;
  title?: string;
  description?: string;
  design?: QRDesign;
  is_active?: boolean;
  expires_at?: string | null;
  max_scans?: number | null;
}

export interface QRCodeFilters {
  type?: QRType;
  context?: QRContext;
  source?: QRSource;
  is_active?: boolean;
}

export interface ListQRCodesOptions {
  filters?: QRCodeFilters;
  limit?: number;
  offset?: number;
  orderBy?: 'created_at' | 'total_scans' | 'last_scanned_at';
  orderDir?: 'asc' | 'desc';
}

export interface QRScan {
  id: string;
  qr_code_id: string;
  ip_address: string | null;
  user_agent: string | null;
  device_type: string | null;
  os: string | null;
  browser: string | null;
  country: string | null;
  city: string | null;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  referer: string | null;
  scanned_at: string;
}

// QR Builder Modal Props
export interface QRBuilderModalProps {
  open: boolean;
  onClose: () => void;
  merchantId?: string;
  merchantSlug?: string;
  defaultType?: QRType;
  defaultContext?: QRContext;
  defaultSource?: QRSource;
  tableNumber?: number;
  eventId?: string;
  editQRCode?: QRCode;
  onComplete?: (qrCode: QRCode) => void;
}
