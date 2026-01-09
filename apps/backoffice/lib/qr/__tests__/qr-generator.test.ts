import { describe, it, expect } from 'vitest';
import {
  validateWiFiConfig,
  validateURL,
  validateQRContent,
  calculatePixelSize,
  getRecommendedSize,
  getContrastingColors,
  validateColorContrast,
  buildTableQRUrl,
  buildExternalQRUrl,
  SIZE_PRESETS,
  DPI_PRESETS,
} from '../qr-generator';
import { generateWiFiString } from '../qr-types';

// ============================================
// generateWiFiString (from qr-types)
// ============================================

describe('generateWiFiString', () => {
  it('should generate valid WiFi string for WPA network', () => {
    const result = generateWiFiString({
      ssid: 'MyNetwork',
      password: 'mypassword123',
      security: 'WPA',
      hidden: false,
    });

    expect(result).toBe('WIFI:T:WPA;S:MyNetwork;P:mypassword123;H:false;;');
  });

  it('should generate valid WiFi string for open network', () => {
    const result = generateWiFiString({
      ssid: 'FreeWiFi',
      password: '',
      security: 'nopass',
      hidden: false,
    });

    expect(result).toBe('WIFI:T:nopass;S:FreeWiFi;P:;H:false;;');
  });

  it('should escape special characters in SSID and password', () => {
    const result = generateWiFiString({
      ssid: 'My;Network:Name',
      password: 'pass;word:123',
      security: 'WPA',
      hidden: false,
    });

    expect(result).toBe('WIFI:T:WPA;S:My\\;Network\\:Name;P:pass\\;word\\:123;H:false;;');
  });

  it('should handle hidden network flag', () => {
    const result = generateWiFiString({
      ssid: 'HiddenNet',
      password: 'secret',
      security: 'WPA',
      hidden: true,
    });

    expect(result).toBe('WIFI:T:WPA;S:HiddenNet;P:secret;H:true;;');
  });

  it('should generate valid string for WEP security', () => {
    const result = generateWiFiString({
      ssid: 'OldNetwork',
      password: 'wepkey123',
      security: 'WEP',
      hidden: false,
    });

    expect(result).toBe('WIFI:T:WEP;S:OldNetwork;P:wepkey123;H:false;;');
  });
});

// ============================================
// validateWiFiConfig
// ============================================

describe('validateWiFiConfig', () => {
  it('should validate correct WPA config', () => {
    const result = validateWiFiConfig({
      ssid: 'MyNetwork',
      password: 'password123',
      security: 'WPA',
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should require SSID', () => {
    const result = validateWiFiConfig({
      ssid: '',
      password: 'password123',
      security: 'WPA',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('SSID is required');
  });

  it('should reject SSID with only whitespace', () => {
    const result = validateWiFiConfig({
      ssid: '   ',
      password: 'password123',
      security: 'WPA',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('SSID is required');
  });

  it('should reject SSID longer than 32 characters', () => {
    const result = validateWiFiConfig({
      ssid: 'A'.repeat(33),
      password: 'password123',
      security: 'WPA',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('SSID must be 32 characters or less');
  });

  it('should accept SSID exactly 32 characters', () => {
    const result = validateWiFiConfig({
      ssid: 'A'.repeat(32),
      password: 'password123',
      security: 'WPA',
    });

    expect(result.valid).toBe(true);
  });

  it('should require password for secured networks', () => {
    const result = validateWiFiConfig({
      ssid: 'MyNetwork',
      password: '',
      security: 'WPA',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Password is required for secured networks');
  });

  it('should not require password for open networks', () => {
    const result = validateWiFiConfig({
      ssid: 'FreeWiFi',
      password: '',
      security: 'nopass',
    });

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it('should require WPA password to be at least 8 characters', () => {
    const result = validateWiFiConfig({
      ssid: 'MyNetwork',
      password: 'short',
      security: 'WPA',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('WPA password must be at least 8 characters');
  });

  it('should accept WPA password exactly 8 characters', () => {
    const result = validateWiFiConfig({
      ssid: 'MyNetwork',
      password: '12345678',
      security: 'WPA',
    });

    expect(result.valid).toBe(true);
  });

  it('should reject password longer than 63 characters', () => {
    const result = validateWiFiConfig({
      ssid: 'MyNetwork',
      password: 'A'.repeat(64),
      security: 'WPA',
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Password must be 63 characters or less');
  });

  it('should reject invalid security type', () => {
    const result = validateWiFiConfig({
      ssid: 'MyNetwork',
      password: 'password123',
      security: 'WPA3' as 'WPA', // Invalid type
    });

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Invalid security type');
  });

  it('should accept WEP security with short password', () => {
    const result = validateWiFiConfig({
      ssid: 'MyNetwork',
      password: '12345', // WEP doesn't have 8 char minimum
      security: 'WEP',
    });

    expect(result.valid).toBe(true);
  });

  it('should collect multiple errors', () => {
    const result = validateWiFiConfig({
      ssid: '',
      password: '',
      security: 'INVALID' as 'WPA',
    });

    expect(result.valid).toBe(false);
    expect(result.errors.length).toBeGreaterThan(1);
    expect(result.errors).toContain('SSID is required');
    expect(result.errors).toContain('Invalid security type');
  });
});

// ============================================
// validateURL
// ============================================

describe('validateURL', () => {
  it('should validate correct HTTPS URL', () => {
    const result = validateURL('https://example.com');

    expect(result.valid).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should validate correct HTTP URL', () => {
    const result = validateURL('http://example.com');

    expect(result.valid).toBe(true);
  });

  it('should validate URL with path', () => {
    const result = validateURL('https://example.com/path/to/page');

    expect(result.valid).toBe(true);
  });

  it('should validate URL with query parameters', () => {
    const result = validateURL('https://example.com?foo=bar&baz=qux');

    expect(result.valid).toBe(true);
  });

  it('should validate URL with port', () => {
    const result = validateURL('https://example.com:8080');

    expect(result.valid).toBe(true);
  });

  it('should validate URL with subdomain', () => {
    const result = validateURL('https://api.example.com');

    expect(result.valid).toBe(true);
  });

  it('should reject invalid URL without protocol', () => {
    const result = validateURL('example.com');

    expect(result.valid).toBe(false);
    expect(result.error).toBe('Invalid URL format');
  });

  it('should reject empty string', () => {
    const result = validateURL('');

    expect(result.valid).toBe(false);
    expect(result.error).toBe('Invalid URL format');
  });

  it('should reject malformed URL', () => {
    const result = validateURL('not a url at all');

    expect(result.valid).toBe(false);
    expect(result.error).toBe('Invalid URL format');
  });

  it('should validate localhost URL', () => {
    const result = validateURL('http://localhost:3000');

    expect(result.valid).toBe(true);
  });
});

// ============================================
// validateQRContent
// ============================================

describe('validateQRContent', () => {
  it('should validate short content', () => {
    const result = validateQRContent('Hello World');

    expect(result.valid).toBe(true);
    expect(result.currentLength).toBe(11);
    expect(result.maxLength).toBe(2953);
    expect(result.message).toBeUndefined();
  });

  it('should validate URL content', () => {
    const url = 'https://menu.gudbro.com/merchant/menu?table=5';
    const result = validateQRContent(url);

    expect(result.valid).toBe(true);
    expect(result.currentLength).toBe(url.length);
  });

  it('should validate WiFi string', () => {
    const wifiString = 'WIFI:T:WPA;S:MyNetwork;P:password123;H:false;;';
    const result = validateQRContent(wifiString);

    expect(result.valid).toBe(true);
  });

  it('should validate content at maximum length', () => {
    const maxContent = 'A'.repeat(2953);
    const result = validateQRContent(maxContent);

    expect(result.valid).toBe(true);
    expect(result.currentLength).toBe(2953);
  });

  it('should reject content exceeding maximum length', () => {
    const tooLong = 'A'.repeat(2954);
    const result = validateQRContent(tooLong);

    expect(result.valid).toBe(false);
    expect(result.currentLength).toBe(2954);
    expect(result.message).toContain('Content too long');
    expect(result.message).toContain('Maximum 2953');
  });

  it('should validate empty content', () => {
    const result = validateQRContent('');

    expect(result.valid).toBe(true);
    expect(result.currentLength).toBe(0);
  });

  it('should validate content with special characters', () => {
    const result = validateQRContent('Hello! @#$%^&*() World');

    expect(result.valid).toBe(true);
  });
});

// ============================================
// calculatePixelSize
// ============================================

describe('calculatePixelSize', () => {
  it('should return pixels as-is', () => {
    const result = calculatePixelSize(512, 'px');

    expect(result).toBe(512);
  });

  it('should return pixels as-is regardless of DPI', () => {
    const result = calculatePixelSize(1024, 'px', 600);

    expect(result).toBe(1024);
  });

  it('should convert inches to pixels with default DPI (300)', () => {
    const result = calculatePixelSize(1, 'in');

    expect(result).toBe(300); // 1 inch * 300 DPI
  });

  it('should convert inches to pixels with custom DPI', () => {
    const result = calculatePixelSize(2, 'in', 150);

    expect(result).toBe(300); // 2 inches * 150 DPI
  });

  it('should convert cm to pixels with default DPI', () => {
    // 1 cm = 0.393701 inches, * 300 DPI = ~118 pixels
    const result = calculatePixelSize(2.54, 'cm');

    expect(result).toBe(300); // 2.54 cm = 1 inch * 300 DPI
  });

  it('should convert cm to pixels with custom DPI', () => {
    const result = calculatePixelSize(2.54, 'cm', 72);

    expect(result).toBe(72); // 2.54 cm = 1 inch * 72 DPI
  });

  it('should round to nearest pixel', () => {
    // 1 cm at 300 DPI = (1/2.54) * 300 = 118.11...
    const result = calculatePixelSize(1, 'cm', 300);

    expect(result).toBe(118);
  });

  it('should handle fractional inches', () => {
    const result = calculatePixelSize(0.5, 'in', 300);

    expect(result).toBe(150); // 0.5 inches * 300 DPI
  });

  it('should work with screen DPI preset', () => {
    const result = calculatePixelSize(1, 'in', DPI_PRESETS.screen);

    expect(result).toBe(72);
  });

  it('should work with print DPI preset', () => {
    const result = calculatePixelSize(1, 'in', DPI_PRESETS.print);

    expect(result).toBe(300);
  });

  it('should work with high-quality DPI preset', () => {
    const result = calculatePixelSize(1, 'in', DPI_PRESETS['high-quality']);

    expect(result).toBe(600);
  });
});

// ============================================
// getRecommendedSize
// ============================================

describe('getRecommendedSize', () => {
  it('should return medium size for PNG format', () => {
    const result = getRecommendedSize('png');

    expect(result).toBe(SIZE_PRESETS.medium);
    expect(result).toBe(512);
  });

  it('should return print-standard size for PNG-HD format', () => {
    const result = getRecommendedSize('png-hd');

    expect(result).toBe(SIZE_PRESETS['print-standard']);
    expect(result).toBe(2048);
  });

  it('should return large size for SVG format', () => {
    const result = getRecommendedSize('svg');

    expect(result).toBe(SIZE_PRESETS.large);
    expect(result).toBe(1024);
  });

  it('should return print-standard size for PDF format', () => {
    const result = getRecommendedSize('pdf');

    expect(result).toBe(SIZE_PRESETS['print-standard']);
    expect(result).toBe(2048);
  });

  it('should return medium size for unknown format', () => {
    const result = getRecommendedSize('unknown' as 'png');

    expect(result).toBe(SIZE_PRESETS.medium);
    expect(result).toBe(512);
  });
});

// ============================================
// getContrastingColors
// ============================================

describe('getContrastingColors', () => {
  it('should return black foreground for white background', () => {
    const result = getContrastingColors('#FFFFFF');

    expect(result.foreground).toBe('#000000');
    expect(result.background).toBe('#FFFFFF');
  });

  it('should return white foreground for black background', () => {
    const result = getContrastingColors('#000000');

    expect(result.foreground).toBe('#FFFFFF');
    expect(result.background).toBe('#000000');
  });

  it('should return black foreground for light gray', () => {
    const result = getContrastingColors('#CCCCCC');

    expect(result.foreground).toBe('#000000');
    expect(result.background).toBe('#CCCCCC');
  });

  it('should return white foreground for dark blue', () => {
    const result = getContrastingColors('#000080');

    expect(result.foreground).toBe('#FFFFFF');
    expect(result.background).toBe('#000080');
  });

  it('should return black foreground for bright yellow', () => {
    const result = getContrastingColors('#FFFF00');

    expect(result.foreground).toBe('#000000');
    expect(result.background).toBe('#FFFF00');
  });

  it('should return white foreground for dark red', () => {
    const result = getContrastingColors('#800000');

    expect(result.foreground).toBe('#FFFFFF');
    expect(result.background).toBe('#800000');
  });

  it('should handle lowercase hex colors', () => {
    const result = getContrastingColors('#ffffff');

    expect(result.foreground).toBe('#000000');
    expect(result.background).toBe('#ffffff');
  });

  it('should return black for mid-gray (edge case)', () => {
    // RGB 128,128,128 = luminance ~0.5
    const result = getContrastingColors('#808080');

    // Luminance = (0.299*128 + 0.587*128 + 0.114*128)/255 = 0.502
    // > 0.5, so black foreground
    expect(result.foreground).toBe('#000000');
  });
});

// ============================================
// validateColorContrast
// ============================================

describe('validateColorContrast', () => {
  it('should validate black on white (highest contrast)', () => {
    const result = validateColorContrast('#000000', '#FFFFFF');

    expect(result.valid).toBe(true);
    expect(result.ratio).toBeGreaterThan(20);
    expect(result.message).toBeUndefined();
  });

  it('should validate white on black', () => {
    const result = validateColorContrast('#FFFFFF', '#000000');

    expect(result.valid).toBe(true);
    expect(result.ratio).toBeGreaterThan(20);
  });

  it('should reject same colors (1:1 ratio)', () => {
    const result = validateColorContrast('#FFFFFF', '#FFFFFF');

    expect(result.valid).toBe(false);
    expect(result.ratio).toBe(1);
    expect(result.message).toContain('too low');
    expect(result.message).toContain('Minimum 4:1');
  });

  it('should reject low contrast colors', () => {
    // Light gray on white - very low contrast
    const result = validateColorContrast('#DDDDDD', '#FFFFFF');

    expect(result.valid).toBe(false);
    expect(result.ratio).toBeLessThan(4);
  });

  it('should validate adequate contrast', () => {
    // Dark blue on white - good contrast
    const result = validateColorContrast('#0000AA', '#FFFFFF');

    expect(result.valid).toBe(true);
    expect(result.ratio).toBeGreaterThanOrEqual(4);
  });

  it('should validate dark gray on white', () => {
    const result = validateColorContrast('#333333', '#FFFFFF');

    expect(result.valid).toBe(true);
    expect(result.ratio).toBeGreaterThan(10);
  });

  it('should handle lowercase hex values', () => {
    const result = validateColorContrast('#000000', '#ffffff');

    expect(result.valid).toBe(true);
  });

  it('should return rounded ratio', () => {
    const result = validateColorContrast('#000000', '#FFFFFF');

    // Ratio should be rounded to 2 decimal places
    expect(Number.isInteger(result.ratio * 100)).toBe(true);
  });

  it('should reject medium gray on light gray', () => {
    const result = validateColorContrast('#888888', '#CCCCCC');

    expect(result.valid).toBe(false);
    expect(result.ratio).toBeLessThan(4);
  });
});

// ============================================
// buildTableQRUrl
// ============================================

describe('buildTableQRUrl', () => {
  it('should build URL with default base', () => {
    const result = buildTableQRUrl('la-pizzeria', 5);

    expect(result).toBe('https://menu.gudbro.com/la-pizzeria/menu?table=5');
  });

  it('should build URL with custom base', () => {
    const result = buildTableQRUrl('restaurant', 10, 'https://custom.domain.com');

    expect(result).toBe('https://custom.domain.com/restaurant/menu?table=10');
  });

  it('should handle table number 1', () => {
    const result = buildTableQRUrl('cafe', 1);

    expect(result).toBe('https://menu.gudbro.com/cafe/menu?table=1');
  });

  it('should handle large table numbers', () => {
    const result = buildTableQRUrl('hotel', 999);

    expect(result).toBe('https://menu.gudbro.com/hotel/menu?table=999');
  });

  it('should handle slug with hyphens', () => {
    const result = buildTableQRUrl('best-italian-restaurant', 3);

    expect(result).toBe('https://menu.gudbro.com/best-italian-restaurant/menu?table=3');
  });

  it('should handle slug with numbers', () => {
    const result = buildTableQRUrl('restaurant123', 7);

    expect(result).toBe('https://menu.gudbro.com/restaurant123/menu?table=7');
  });
});

// ============================================
// buildExternalQRUrl
// ============================================

describe('buildExternalQRUrl', () => {
  it('should build URL with default base and simple source', () => {
    const result = buildExternalQRUrl('la-pizzeria', 'instagram');

    expect(result).toBe('https://menu.gudbro.com/la-pizzeria?source=instagram');
  });

  it('should build URL with custom base', () => {
    const result = buildExternalQRUrl('restaurant', 'flyer', 'https://custom.domain.com');

    expect(result).toBe('https://custom.domain.com/restaurant?source=flyer');
  });

  it('should encode special characters in source', () => {
    const result = buildExternalQRUrl('cafe', 'google maps');

    expect(result).toBe('https://menu.gudbro.com/cafe?source=google%20maps');
  });

  it('should encode ampersand in source', () => {
    const result = buildExternalQRUrl('cafe', 'facebook&instagram');

    expect(result).toBe('https://menu.gudbro.com/cafe?source=facebook%26instagram');
  });

  it('should handle tripadvisor source', () => {
    const result = buildExternalQRUrl('hotel-restaurant', 'tripadvisor');

    expect(result).toBe('https://menu.gudbro.com/hotel-restaurant?source=tripadvisor');
  });

  it('should handle event source', () => {
    const result = buildExternalQRUrl('catering', 'event');

    expect(result).toBe('https://menu.gudbro.com/catering?source=event');
  });

  it('should handle email source', () => {
    const result = buildExternalQRUrl('bistro', 'email');

    expect(result).toBe('https://menu.gudbro.com/bistro?source=email');
  });

  it('should encode unicode characters', () => {
    const result = buildExternalQRUrl('ristorante', 'evento_speciale');

    expect(result).toBe('https://menu.gudbro.com/ristorante?source=evento_speciale');
  });
});

// ============================================
// SIZE_PRESETS and DPI_PRESETS exports
// ============================================

describe('SIZE_PRESETS', () => {
  it('should export correct size values', () => {
    expect(SIZE_PRESETS.small).toBe(256);
    expect(SIZE_PRESETS.medium).toBe(512);
    expect(SIZE_PRESETS.large).toBe(1024);
    expect(SIZE_PRESETS['print-standard']).toBe(2048);
    expect(SIZE_PRESETS['print-hd']).toBe(4096);
  });
});

describe('DPI_PRESETS', () => {
  it('should export correct DPI values', () => {
    expect(DPI_PRESETS.screen).toBe(72);
    expect(DPI_PRESETS.print).toBe(300);
    expect(DPI_PRESETS['high-quality']).toBe(600);
  });
});
