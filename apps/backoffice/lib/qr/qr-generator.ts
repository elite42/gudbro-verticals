// QR Code Generator Utilities
// Uses 'qrcode' library for generation

import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import 'svg2pdf.js';
import {
  QRCode as QRCodeEntity,
  QRDesign,
  ExportOptions,
  ExportFormat,
  MaterialPreset,
  EXPORT_PRESETS,
  DEFAULT_QR_DESIGN,
  generateWiFiString,
} from './qr-types';

// ============================================
// TYPES
// ============================================

export interface GenerateQROptions {
  width?: number;
  margin?: number;
  errorCorrectionLevel?: 'L' | 'M' | 'Q' | 'H';
  design?: QRDesign;
}

export interface QRGenerationResult {
  dataUrl: string;
  svg?: string;
  width: number;
  height: number;
}

// ============================================
// SIZE PRESETS
// ============================================

export const SIZE_PRESETS = {
  small: 256,
  medium: 512,
  large: 1024,
  'print-standard': 2048,
  'print-hd': 4096,
} as const;

export const DPI_PRESETS = {
  screen: 72,
  print: 300,
  'high-quality': 600,
} as const;

// ============================================
// QR CODE GENERATION
// ============================================

/**
 * Generate QR code as Data URL (PNG)
 */
export async function generateQRDataUrl(
  content: string,
  options: GenerateQROptions = {}
): Promise<string> {
  const {
    width = SIZE_PRESETS.medium,
    margin = 4,
    errorCorrectionLevel = 'M',
    design = DEFAULT_QR_DESIGN,
  } = options;

  const qrOptions: QRCode.QRCodeToDataURLOptions = {
    width,
    margin,
    errorCorrectionLevel,
    color: {
      dark: design.colors.foreground,
      light: design.colors.background,
    },
  };

  try {
    return await QRCode.toDataURL(content, qrOptions);
  } catch (error) {
    console.error('QR generation error:', error);
    throw new Error('Failed to generate QR code');
  }
}

/**
 * Generate QR code as SVG string
 */
export async function generateQRSVG(
  content: string,
  options: GenerateQROptions = {}
): Promise<string> {
  const {
    width = SIZE_PRESETS.medium,
    margin = 4,
    errorCorrectionLevel = 'M',
    design = DEFAULT_QR_DESIGN,
  } = options;

  const qrOptions: QRCode.QRCodeToStringOptions = {
    type: 'svg',
    width,
    margin,
    errorCorrectionLevel,
    color: {
      dark: design.colors.foreground,
      light: design.colors.background,
    },
  };

  try {
    return await QRCode.toString(content, qrOptions);
  } catch (error) {
    console.error('QR SVG generation error:', error);
    throw new Error('Failed to generate QR code SVG');
  }
}

/**
 * Generate QR code as Buffer (for server-side use)
 */
export async function generateQRBuffer(
  content: string,
  options: GenerateQROptions = {}
): Promise<Buffer> {
  const {
    width = SIZE_PRESETS.medium,
    margin = 4,
    errorCorrectionLevel = 'M',
    design = DEFAULT_QR_DESIGN,
  } = options;

  const qrOptions: QRCode.QRCodeToBufferOptions = {
    type: 'png',
    width,
    margin,
    errorCorrectionLevel,
    color: {
      dark: design.colors.foreground,
      light: design.colors.background,
    },
  };

  try {
    return await QRCode.toBuffer(content, qrOptions);
  } catch (error) {
    console.error('QR buffer generation error:', error);
    throw new Error('Failed to generate QR code buffer');
  }
}

// ============================================
// CONTENT BUILDERS
// ============================================

/**
 * Build the content string for a QR code entity
 */
export function buildQRContent(
  qrCode: QRCodeEntity,
  config: { baseUrl?: string; merchantSlug?: string } = {}
): string {
  if (qrCode.type === 'wifi') {
    return generateWiFiString({
      ssid: qrCode.wifi_ssid || '',
      password: qrCode.wifi_password || '',
      security: qrCode.wifi_security || 'WPA',
      hidden: qrCode.wifi_hidden || false,
    });
  }

  // URL type
  if (qrCode.use_short_url && qrCode.short_code) {
    const baseUrl = config.baseUrl || 'https://go.gudbro.com';
    return `${baseUrl}/${qrCode.short_code}`;
  }

  return qrCode.destination_url || '';
}

/**
 * Build a table QR URL
 */
export function buildTableQRUrl(
  merchantSlug: string,
  tableNumber: number,
  baseUrl: string = 'https://menu.gudbro.com'
): string {
  return `${baseUrl}/${merchantSlug}/menu?table=${tableNumber}`;
}

/**
 * Build an external source QR URL with tracking
 */
export function buildExternalQRUrl(
  merchantSlug: string,
  source: string,
  baseUrl: string = 'https://menu.gudbro.com'
): string {
  return `${baseUrl}/${merchantSlug}?source=${encodeURIComponent(source)}`;
}

// ============================================
// EXPORT FUNCTIONS
// ============================================

/**
 * Get export configuration for a material preset
 */
export function getExportConfig(preset: MaterialPreset): ExportOptions {
  return EXPORT_PRESETS[preset] || EXPORT_PRESETS.paper;
}

/**
 * Calculate pixel size from physical dimensions
 */
export function calculatePixelSize(
  size: number,
  unit: 'px' | 'cm' | 'in',
  dpi: number = DPI_PRESETS.print
): number {
  if (unit === 'px') return size;
  if (unit === 'in') return Math.round(size * dpi);
  // cm to inches (1 inch = 2.54 cm), then to pixels
  return Math.round((size / 2.54) * dpi);
}

/**
 * Get recommended size for export format
 */
export function getRecommendedSize(format: ExportFormat): number {
  switch (format) {
    case 'png':
      return SIZE_PRESETS.medium;
    case 'png-hd':
      return SIZE_PRESETS['print-standard'];
    case 'svg':
      return SIZE_PRESETS.large;
    case 'pdf':
      return SIZE_PRESETS['print-standard'];
    default:
      return SIZE_PRESETS.medium;
  }
}

/**
 * Export QR code in specified format
 */
export async function exportQRCode(
  content: string,
  options: ExportOptions & { design?: QRDesign }
): Promise<{ data: string; mimeType: string; filename: string }> {
  const format = options.format;
  const design = options.design || DEFAULT_QR_DESIGN;

  // Calculate size
  let width = getRecommendedSize(format);
  if (options.customSize) {
    width = calculatePixelSize(options.customSize.width, options.customSize.unit);
  }

  const margin = options.quietZone ?? 4;

  switch (format) {
    case 'png':
    case 'png-hd': {
      const dataUrl = await generateQRDataUrl(content, {
        width,
        margin,
        design,
        errorCorrectionLevel: 'H', // High error correction for print
      });
      return {
        data: dataUrl,
        mimeType: 'image/png',
        filename: 'qr-code.png',
      };
    }

    case 'svg': {
      const svg = await generateQRSVG(content, {
        width,
        margin,
        design,
        errorCorrectionLevel: 'H',
      });
      return {
        data: svg,
        mimeType: 'image/svg+xml',
        filename: 'qr-code.svg',
      };
    }

    case 'pdf': {
      // Generate PDF using jsPDF and svg2pdf.js
      const svg = await generateQRSVG(content, {
        width,
        margin,
        design,
        errorCorrectionLevel: 'H',
      });

      // Create PDF document
      const pdfWidth = options.customSize?.width || 100; // mm
      const pdfHeight = options.customSize?.height || 100; // mm
      const pdf = new jsPDF({
        orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
        unit: 'mm',
        format: [pdfWidth, pdfHeight],
      });

      // Parse SVG string to element
      const parser = new DOMParser();
      const svgDoc = parser.parseFromString(svg, 'image/svg+xml');
      const svgElement = svgDoc.documentElement;

      // Add bleed margin if requested
      const bleed = options.includeBleed ? 3 : 0; // 3mm bleed
      const qrSize = Math.min(pdfWidth, pdfHeight) - bleed * 2;
      const offsetX = (pdfWidth - qrSize) / 2;
      const offsetY = (pdfHeight - qrSize) / 2;

      // Convert SVG to PDF
      await (pdf as unknown as { svg: (el: Element, opts: object) => Promise<void> }).svg(
        svgElement,
        {
          x: offsetX,
          y: offsetY,
          width: qrSize,
          height: qrSize,
        }
      );

      // Get PDF as base64
      const pdfData = pdf.output('datauristring');

      return {
        data: pdfData,
        mimeType: 'application/pdf',
        filename: 'qr-code.pdf',
      };
    }

    default:
      throw new Error(`Unsupported export format: ${format}`);
  }
}

// ============================================
// BATCH OPERATIONS
// ============================================

/**
 * Generate multiple QR codes in batch
 */
export async function batchGenerateQRCodes(
  items: Array<{ content: string; id: string }>,
  options: GenerateQROptions = {}
): Promise<Map<string, string>> {
  const results = new Map<string, string>();

  for (const item of items) {
    try {
      const dataUrl = await generateQRDataUrl(item.content, options);
      results.set(item.id, dataUrl);
    } catch (error) {
      console.error(`Failed to generate QR for ${item.id}:`, error);
      results.set(item.id, '');
    }
  }

  return results;
}

// ============================================
// VALIDATION
// ============================================

/**
 * Validate QR content length
 * QR codes have maximum capacity based on error correction level
 */
export function validateQRContent(content: string): {
  valid: boolean;
  maxLength: number;
  currentLength: number;
  message?: string;
} {
  // Approximate limits for alphanumeric content with M error correction
  const maxLength = 2953; // Characters for alphanumeric with M correction

  const currentLength = content.length;
  const valid = currentLength <= maxLength;

  return {
    valid,
    maxLength,
    currentLength,
    message: valid
      ? undefined
      : `Content too long. Maximum ${maxLength} characters, current: ${currentLength}`,
  };
}

/**
 * Validate WiFi configuration
 */
export function validateWiFiConfig(config: { ssid: string; password: string; security: string }): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!config.ssid || config.ssid.trim().length === 0) {
    errors.push('SSID is required');
  } else if (config.ssid.length > 32) {
    errors.push('SSID must be 32 characters or less');
  }

  if (config.security !== 'nopass') {
    if (!config.password || config.password.trim().length === 0) {
      errors.push('Password is required for secured networks');
    } else if (config.password.length > 63) {
      errors.push('Password must be 63 characters or less');
    } else if (config.security === 'WPA' && config.password.length < 8) {
      errors.push('WPA password must be at least 8 characters');
    }
  }

  if (!['WPA', 'WEP', 'nopass'].includes(config.security)) {
    errors.push('Invalid security type');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Validate URL
 */
export function validateURL(url: string): { valid: boolean; error?: string } {
  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

// ============================================
// DESIGN HELPERS
// ============================================

/**
 * Get contrasting colors for QR code
 * Ensures readability
 */
export function getContrastingColors(backgroundColor: string): {
  foreground: string;
  background: string;
} {
  // Simple luminance calculation
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  // If background is light, use dark foreground
  if (luminance > 0.5) {
    return { foreground: '#000000', background: backgroundColor };
  } else {
    return { foreground: '#FFFFFF', background: backgroundColor };
  }
}

/**
 * Validate color contrast for QR readability
 */
export function validateColorContrast(
  foreground: string,
  background: string
): { valid: boolean; ratio: number; message?: string } {
  // Calculate contrast ratio (simplified)
  const getLuminance = (hex: string): number => {
    const rgb = hex.replace('#', '');
    const r = parseInt(rgb.substr(0, 2), 16) / 255;
    const g = parseInt(rgb.substr(2, 2), 16) / 255;
    const b = parseInt(rgb.substr(4, 2), 16) / 255;

    const adjust = (c: number) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4));

    return 0.2126 * adjust(r) + 0.7152 * adjust(g) + 0.0722 * adjust(b);
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);

  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  // QR codes need at least 4:1 contrast for reliable scanning
  const minRatio = 4;
  const valid = ratio >= minRatio;

  return {
    valid,
    ratio: Math.round(ratio * 100) / 100,
    message: valid
      ? undefined
      : `Contrast ratio ${ratio.toFixed(1)}:1 is too low. Minimum 4:1 required for reliable scanning.`,
  };
}
