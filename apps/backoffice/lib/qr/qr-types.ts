// QR Codes TypeScript Types
// Migration: 042-qr-codes.sql

// ============================================
// ENUMS
// ============================================

export type QRType = 'url' | 'wifi';

export type QRContext = 'table' | 'external' | 'takeaway' | 'delivery';

export type QRSource =
  | 'google_maps'
  | 'instagram'
  | 'facebook'
  | 'event'
  | 'flyer'
  | 'table'
  | 'tripadvisor'
  | 'website'
  | 'email'
  | 'other';

export type WiFiSecurity = 'WPA' | 'WEP' | 'nopass';

export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// ============================================
// EXPORT FORMATS
// ============================================

export type ExportFormat = 'png' | 'png-hd' | 'svg' | 'pdf';

export type MaterialPreset =
  | 'paper'
  | 'tshirt'
  | 'sticker'
  | 'banner'
  | 'newspaper'
  | 'business-card'
  | 'menu'
  | 'tent-card';

export type ColorMode = 'rgb' | 'cmyk' | 'grayscale';

export interface ExportOptions {
  format: ExportFormat;
  preset?: MaterialPreset;
  customSize?: {
    width: number;
    height: number;
    unit: 'px' | 'cm' | 'in';
  };
  colorMode?: ColorMode;
  includeBleed?: boolean;
  includeCropMarks?: boolean;
  transparentBg?: boolean;
  quietZone?: number; // margin around QR in modules
}

// Export preset configurations
export const EXPORT_PRESETS: Record<MaterialPreset, ExportOptions> = {
  paper: {
    format: 'pdf',
    colorMode: 'cmyk',
    includeBleed: true,
    quietZone: 4,
  },
  tshirt: {
    format: 'svg',
    transparentBg: true,
    quietZone: 2,
  },
  sticker: {
    format: 'svg',
    quietZone: 2,
  },
  banner: {
    format: 'svg',
    quietZone: 4,
  },
  newspaper: {
    format: 'pdf',
    colorMode: 'grayscale',
    quietZone: 4,
  },
  'business-card': {
    format: 'png-hd',
    quietZone: 4,
  },
  menu: {
    format: 'pdf',
    colorMode: 'cmyk',
    quietZone: 4,
  },
  'tent-card': {
    format: 'pdf',
    colorMode: 'cmyk',
    includeBleed: true,
    quietZone: 4,
  },
};

// ============================================
// DESIGN
// ============================================

export type QRPattern = 'square' | 'dots' | 'rounded';

export interface QRColors {
  foreground: string;
  background: string;
}

export interface QRLogo {
  url: string;
  size: number; // percentage of QR size (10-30%)
}

export interface QRFrame {
  text: string;
  style: 'simple' | 'rounded' | 'banner';
  position: 'top' | 'bottom';
}

export interface QRDesign {
  colors: QRColors;
  logo?: QRLogo;
  pattern?: QRPattern;
  frame?: QRFrame;
}

// Default design
export const DEFAULT_QR_DESIGN: QRDesign = {
  colors: {
    foreground: '#000000',
    background: '#FFFFFF',
  },
  pattern: 'square',
};

// ============================================
// WIFI CONFIG
// ============================================

export interface WiFiConfig {
  ssid: string;
  password: string;
  security: WiFiSecurity;
  hidden: boolean;
}

// Generate WiFi QR string
export function generateWiFiString(config: WiFiConfig): string {
  const escapedSSID = config.ssid.replace(/[\\;,:]/g, '\\$&');
  const escapedPassword = config.password.replace(/[\\;,:]/g, '\\$&');
  return `WIFI:T:${config.security};S:${escapedSSID};P:${escapedPassword};H:${config.hidden};;`;
}

// ============================================
// QR CODE ENTITY
// ============================================

export interface QRCode {
  id: string;
  merchant_id: string;

  // Type
  type: QRType;

  // URL Info (only for type='url')
  short_code?: string;
  destination_url?: string;
  use_short_url: boolean;
  context?: QRContext;
  source?: QRSource;
  table_number?: number;
  event_id?: string;

  // WiFi Info (only for type='wifi')
  wifi_ssid?: string;
  wifi_password?: string;
  wifi_security?: WiFiSecurity;
  wifi_hidden?: boolean;

  // Metadata
  title?: string;
  description?: string;

  // Design
  design: QRDesign;

  // Status
  is_active: boolean;
  expires_at?: string;
  max_scans?: number;
  total_scans: number;
  last_scanned_at?: string;

  // Timestamps
  created_at: string;
  updated_at: string;
}

// ============================================
// QR SCAN ENTITY (Analytics)
// ============================================

export interface QRScan {
  id: string;
  qr_code_id: string;

  // Device Info
  ip_address?: string;
  user_agent?: string;
  device_type?: DeviceType;
  os?: string;
  browser?: string;

  // Location
  country?: string;
  city?: string;

  // UTM Parameters
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;

  // Referer
  referer?: string;

  // Timestamp
  scanned_at: string;
}

// ============================================
// API INPUT TYPES
// ============================================

export interface CreateQRCodeInput {
  type: QRType;

  // URL Info
  destination_url?: string;
  use_short_url?: boolean;
  context?: QRContext;
  source?: QRSource;
  table_number?: number;
  event_id?: string;

  // WiFi Info
  wifi_ssid?: string;
  wifi_password?: string;
  wifi_security?: WiFiSecurity;
  wifi_hidden?: boolean;

  // Metadata
  title?: string;
  description?: string;

  // Design
  design?: Partial<QRDesign>;

  // Status
  expires_at?: string;
  max_scans?: number;
}

export interface UpdateQRCodeInput {
  // Metadata
  title?: string;
  description?: string;

  // Design
  design?: Partial<QRDesign>;

  // Status
  is_active?: boolean;
  expires_at?: string | null;
  max_scans?: number | null;

  // URL changes (limited)
  destination_url?: string;
  source?: QRSource;

  // WiFi changes
  wifi_ssid?: string;
  wifi_password?: string;
  wifi_security?: WiFiSecurity;
  wifi_hidden?: boolean;
}

export interface CreateQRScanInput {
  qr_code_id: string;
  ip_address?: string;
  user_agent?: string;
  device_type?: DeviceType;
  os?: string;
  browser?: string;
  country?: string;
  city?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referer?: string;
}

// ============================================
// BULK OPERATIONS
// ============================================

export interface BulkCreateQRInput {
  type: 'tables' | 'custom';

  // For tables
  table_count?: number;
  table_start?: number;

  // For custom
  items?: Array<{
    title?: string;
    source?: QRSource;
    context?: QRContext;
  }>;

  // Shared
  destination_base_url: string;
  use_short_url?: boolean;
  design?: Partial<QRDesign>;
}

// ============================================
// ANALYTICS TYPES
// ============================================

export interface QRAnalyticsSummary {
  total_scans: number;
  unique_ips: number;
  mobile_scans: number;
  desktop_scans: number;
  tablet_scans: number;
  scans_today: number;
  scans_this_week: number;
  scans_this_month: number;
}

export interface QRSourcePerformance {
  source: QRSource | null;
  qr_count: number;
  total_scans: number;
  avg_scans_per_qr: number;
}

export interface QRTimelineData {
  date: string;
  scans: number;
}

export interface QRDeviceBreakdown {
  device_type: DeviceType;
  count: number;
  percentage: number;
}

// ============================================
// FILTER/QUERY TYPES
// ============================================

export interface QRCodeFilters {
  type?: QRType;
  context?: QRContext;
  source?: QRSource;
  is_active?: boolean;
  search?: string;
  created_after?: string;
  created_before?: string;
}

export interface QRCodeListOptions {
  filters?: QRCodeFilters;
  page?: number;
  limit?: number;
  sort_by?: 'created_at' | 'updated_at' | 'total_scans' | 'title';
  sort_order?: 'asc' | 'desc';
}

// ============================================
// BUILDER MODAL PROPS
// ============================================

export interface QRBuilderModalProps {
  open: boolean;
  onClose: () => void;

  // Auth context
  merchantId?: string;
  merchantSlug?: string;

  // Pre-population
  defaultType?: QRType;
  defaultContext?: QRContext;
  defaultSource?: QRSource;
  tableNumber?: number;
  eventId?: string;
  promoId?: string;

  // Edit mode
  editQRCode?: QRCode;

  // Callbacks
  onComplete?: (qr: QRCode) => void;
}

// ============================================
// AI INTEGRATION TYPES
// ============================================

export interface AIQRCreateParams {
  type: QRType;
  context?: QRContext;
  count?: number;
  exportFormat?: ExportFormat;
  preset?: MaterialPreset;
}

export interface AIQRExportParams {
  qrIds: string[];
  format: ExportFormat;
  preset?: MaterialPreset;
}

export interface AIQRAnalyzeParams {
  qrIds?: string[];
  timeRange?: {
    start: string;
    end: string;
  };
}

export interface AIQRAlert {
  type: 'low_scans' | 'high_performer' | 'source_comparison' | 'missing_qr';
  qr_code_id?: string;
  message: string;
  data?: Record<string, unknown>;
}
