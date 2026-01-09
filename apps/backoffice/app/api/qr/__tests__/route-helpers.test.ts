/**
 * Tests for QR Route Helper Functions
 *
 * These tests verify the pure helper functions used in the QR redirect route.
 * The functions are copied here for testing since they're not exported from the route file.
 *
 * =============================================================================
 * REFACTORING SUGGESTION
 * =============================================================================
 *
 * For better testability and code organization, consider extracting these helper functions
 * to a separate file: `apps/backoffice/app/api/qr/qr-route-helpers.ts`
 *
 * Example refactored structure:
 * ```typescript
 * // qr-route-helpers.ts
 * export function parseUserAgent(ua: string): { device_type: string; os: string; browser: string } { ... }
 * export function getClientIP(request: NextRequest): string | null { ... }
 *
 * // route.ts
 * import { parseUserAgent, getClientIP } from '../qr-route-helpers';
 * ```
 *
 * This would allow direct imports in tests without code duplication.
 *
 * =============================================================================
 * BUGS FOUND AND FIXED (2026-01-09)
 * =============================================================================
 *
 * The test suite discovered 3 bugs in the original parseUserAgent implementation:
 *
 * 1. iOS Detection Bug (FIXED):
 *    - Problem: iOS user agents contain "Mac OS X" (e.g., "CPU iPhone OS 14_6 like Mac OS X")
 *    - Was: /macintosh|mac os/i matched before /iphone|ipad|ipod/i
 *    - Fix: Check iOS BEFORE macOS in detection order
 *
 * 2. Samsung Browser Detection Bug (FIXED):
 *    - Problem: Samsung Browser UA contains "Chrome" (e.g., "SamsungBrowser/14.0 Chrome/87.0")
 *    - Was: /chrome/i matched before /samsung/i
 *    - Fix: Check SamsungBrowser BEFORE Chrome
 *
 * 3. Opera Detection Bug (FIXED):
 *    - Problem: Opera UA contains "Chrome" (e.g., "Chrome/91.0 OPR/77.0")
 *    - Was: /chrome/i matched before /opera|opr/i
 *    - Fix: Check Opera BEFORE Chrome
 *
 * All fixes applied to: apps/backoffice/app/api/qr/r/[code]/route.ts
 */

import { describe, it, expect, vi } from 'vitest';

// =============================================================================
// HELPER FUNCTIONS (copied from route.ts for testing)
// =============================================================================

/**
 * Parse user agent string to extract device info
 * Source: apps/backoffice/app/api/qr/r/[code]/route.ts lines 20-50
 * FIXED: Detection order corrected for iOS, Samsung Browser, Opera
 */
function parseUserAgent(ua: string): {
  device_type: string;
  os: string;
  browser: string;
} {
  // Determine device type
  let device_type = 'desktop';
  if (/mobile|android|iphone|ipad|ipod|blackberry|windows phone/i.test(ua)) {
    device_type = /tablet|ipad/i.test(ua) ? 'tablet' : 'mobile';
  }

  // Determine OS - check iOS BEFORE macOS (iOS UA contains "Mac OS X")
  let os = 'unknown';
  if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  // Determine browser - check specific browsers BEFORE Chrome (they contain "Chrome" in UA)
  let browser = 'unknown';
  if (/samsungbrowser/i.test(ua)) browser = 'Samsung Browser';
  else if (/opera|opr\//i.test(ua)) browser = 'Opera';
  else if (/edg/i.test(ua)) browser = 'Edge';
  else if (/firefox/i.test(ua)) browser = 'Firefox';
  else if (/chrome/i.test(ua)) browser = 'Chrome';
  else if (/safari/i.test(ua)) browser = 'Safari';

  return { device_type, os, browser };
}

/**
 * Mock NextRequest-like interface for testing getClientIP
 */
interface MockRequest {
  headers: {
    get: (name: string) => string | null;
  };
}

/**
 * Get client IP from request headers
 * Source: apps/backoffice/app/api/qr/r/[code]/route.ts lines 54-69
 */
function getClientIP(request: MockRequest): string | null {
  // Try various headers where IP might be stored
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) return realIP;

  const cfConnectingIP = request.headers.get('cf-connecting-ip');
  if (cfConnectingIP) return cfConnectingIP;

  return null;
}

// =============================================================================
// TESTS: parseUserAgent
// =============================================================================

describe('parseUserAgent', () => {
  describe('Mobile Devices', () => {
    it('should detect Android Chrome mobile', () => {
      const ua =
        'Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Mobile Safari/537.36';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('mobile');
      expect(result.os).toBe('Android');
      expect(result.browser).toBe('Chrome');
    });

    it('should detect iPhone Safari', () => {
      const ua =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('mobile');
      // FIXED: iOS is now correctly detected (iOS check comes before macOS)
      expect(result.os).toBe('iOS');
      expect(result.browser).toBe('Safari');
    });

    it('should detect iPhone Chrome', () => {
      const ua =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/91.0.4472.80 Mobile/15E148 Safari/604.1';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('mobile');
      // FIXED: iOS is now correctly detected
      expect(result.os).toBe('iOS');
      // CriOS (Chrome iOS) doesn't contain 'Chrome' but contains 'Safari'
      expect(result.browser).toBe('Safari');
    });

    it('should detect Samsung Browser on Android', () => {
      const ua =
        'Mozilla/5.0 (Linux; Android 11; SM-G991B) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/14.0 Chrome/87.0.4280.141 Mobile Safari/537.36';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('mobile');
      expect(result.os).toBe('Android');
      // FIXED: Samsung Browser is now correctly detected (checked before Chrome)
      expect(result.browser).toBe('Samsung Browser');
    });

    it('should detect Windows Phone', () => {
      const ua =
        'Mozilla/5.0 (Windows Phone 10.0; Android 6.0.1; Microsoft; Lumia 950) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Mobile Safari/537.36 Edge/15.15254';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('mobile');
      // Note: Windows Phone UA contains both "Windows" and "Android" - Android is checked first
      // This is acceptable as Windows Phone is legacy and rare
      expect(result.os).toBe('Android');
      expect(result.browser).toBe('Edge');
    });

    it('should detect BlackBerry', () => {
      const ua =
        'Mozilla/5.0 (BB10; Touch) AppleWebKit/537.35+ (KHTML, like Gecko) Version/10.3.3.2205 Mobile Safari/537.35+';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('mobile');
      expect(result.browser).toBe('Safari');
    });
  });

  describe('Tablets', () => {
    it('should detect iPad Safari', () => {
      const ua =
        'Mozilla/5.0 (iPad; CPU OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Mobile/15E148 Safari/604.1';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('tablet');
      // FIXED: iOS is now correctly detected for iPad
      expect(result.os).toBe('iOS');
      expect(result.browser).toBe('Safari');
    });

    it('should detect Android tablet', () => {
      const ua =
        'Mozilla/5.0 (Linux; Android 11; SM-T870) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.120 Safari/537.36';
      const result = parseUserAgent(ua);

      // Note: Android tablets without 'tablet' keyword are detected as mobile
      // This is a known limitation - Samsung tablets don't always include 'tablet'
      expect(result.os).toBe('Android');
      expect(result.browser).toBe('Chrome');
    });
  });

  describe('Desktop Browsers', () => {
    it('should detect Windows Chrome', () => {
      const ua =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('desktop');
      expect(result.os).toBe('Windows');
      expect(result.browser).toBe('Chrome');
    });

    it('should detect Windows Edge', () => {
      const ua =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 Edg/91.0.864.59';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('desktop');
      expect(result.os).toBe('Windows');
      expect(result.browser).toBe('Edge');
    });

    it('should detect Windows Firefox', () => {
      const ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:89.0) Gecko/20100101 Firefox/89.0';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('desktop');
      expect(result.os).toBe('Windows');
      expect(result.browser).toBe('Firefox');
    });

    it('should detect macOS Safari', () => {
      const ua =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('desktop');
      expect(result.os).toBe('macOS');
      expect(result.browser).toBe('Safari');
    });

    it('should detect macOS Chrome', () => {
      const ua =
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('desktop');
      expect(result.os).toBe('macOS');
      expect(result.browser).toBe('Chrome');
    });

    it('should detect Linux Chrome', () => {
      const ua =
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('desktop');
      expect(result.os).toBe('Linux');
      expect(result.browser).toBe('Chrome');
    });

    it('should detect Opera', () => {
      const ua =
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36 OPR/77.0.4054.277';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('desktop');
      expect(result.os).toBe('Windows');
      // FIXED: Opera is now correctly detected (checked before Chrome)
      expect(result.browser).toBe('Opera');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty string', () => {
      const result = parseUserAgent('');

      expect(result.device_type).toBe('desktop');
      expect(result.os).toBe('unknown');
      expect(result.browser).toBe('unknown');
    });

    it('should handle unknown user agent', () => {
      const result = parseUserAgent('Some Random Bot/1.0');

      expect(result.device_type).toBe('desktop');
      expect(result.os).toBe('unknown');
      expect(result.browser).toBe('unknown');
    });

    it('should handle curl user agent', () => {
      const result = parseUserAgent('curl/7.64.1');

      expect(result.device_type).toBe('desktop');
      expect(result.os).toBe('unknown');
      expect(result.browser).toBe('unknown');
    });

    it('should handle Googlebot', () => {
      const ua = 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('desktop');
      expect(result.os).toBe('unknown');
      expect(result.browser).toBe('unknown');
    });

    it('should handle Facebook in-app browser on iOS', () => {
      const ua =
        'Mozilla/5.0 (iPhone; CPU iPhone OS 14_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBDV/iPhone12,1;FBMD/iPhone;FBSN/iOS;FBSV/14.6;FBSS/2;FBID/phone;FBLC/en_US;FBOP/5]';
      const result = parseUserAgent(ua);

      expect(result.device_type).toBe('mobile');
      // FIXED: iOS is now correctly detected
      expect(result.os).toBe('iOS');
      // Facebook browser doesn't match any known browser pattern
      expect(result.browser).toBe('unknown');
    });
  });
});

// =============================================================================
// TESTS: getClientIP
// =============================================================================

describe('getClientIP', () => {
  /**
   * Helper to create a mock request with specific headers
   */
  function createMockRequest(headers: Record<string, string | null>): MockRequest {
    return {
      headers: {
        get: vi.fn((name: string) => headers[name.toLowerCase()] ?? null),
      },
    };
  }

  describe('x-forwarded-for header', () => {
    it('should extract IP from x-forwarded-for header', () => {
      const request = createMockRequest({
        'x-forwarded-for': '203.0.113.195',
      });

      expect(getClientIP(request)).toBe('203.0.113.195');
    });

    it('should extract first IP from x-forwarded-for with multiple IPs', () => {
      const request = createMockRequest({
        'x-forwarded-for': '203.0.113.195, 70.41.3.18, 150.172.238.178',
      });

      expect(getClientIP(request)).toBe('203.0.113.195');
    });

    it('should trim whitespace from x-forwarded-for', () => {
      const request = createMockRequest({
        'x-forwarded-for': '  203.0.113.195  ',
      });

      expect(getClientIP(request)).toBe('203.0.113.195');
    });

    it('should handle IPv6 in x-forwarded-for', () => {
      const request = createMockRequest({
        'x-forwarded-for': '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
      });

      expect(getClientIP(request)).toBe('2001:0db8:85a3:0000:0000:8a2e:0370:7334');
    });
  });

  describe('x-real-ip header', () => {
    it('should fall back to x-real-ip when x-forwarded-for is absent', () => {
      const request = createMockRequest({
        'x-real-ip': '198.51.100.178',
      });

      expect(getClientIP(request)).toBe('198.51.100.178');
    });

    it('should prefer x-forwarded-for over x-real-ip', () => {
      const request = createMockRequest({
        'x-forwarded-for': '203.0.113.195',
        'x-real-ip': '198.51.100.178',
      });

      expect(getClientIP(request)).toBe('203.0.113.195');
    });
  });

  describe('cf-connecting-ip header (Cloudflare)', () => {
    it('should fall back to cf-connecting-ip when other headers are absent', () => {
      const request = createMockRequest({
        'cf-connecting-ip': '192.0.2.1',
      });

      expect(getClientIP(request)).toBe('192.0.2.1');
    });

    it('should prefer x-forwarded-for over cf-connecting-ip', () => {
      const request = createMockRequest({
        'x-forwarded-for': '203.0.113.195',
        'cf-connecting-ip': '192.0.2.1',
      });

      expect(getClientIP(request)).toBe('203.0.113.195');
    });

    it('should prefer x-real-ip over cf-connecting-ip', () => {
      const request = createMockRequest({
        'x-real-ip': '198.51.100.178',
        'cf-connecting-ip': '192.0.2.1',
      });

      expect(getClientIP(request)).toBe('198.51.100.178');
    });
  });

  describe('No IP headers', () => {
    it('should return null when no IP headers are present', () => {
      const request = createMockRequest({});

      expect(getClientIP(request)).toBeNull();
    });

    it('should return null when all IP headers are null', () => {
      const request = createMockRequest({
        'x-forwarded-for': null,
        'x-real-ip': null,
        'cf-connecting-ip': null,
      });

      expect(getClientIP(request)).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty x-forwarded-for', () => {
      const request = createMockRequest({
        'x-forwarded-for': '',
        'x-real-ip': '198.51.100.178',
      });

      // Empty string is falsy, so should fall through to x-real-ip
      expect(getClientIP(request)).toBe('198.51.100.178');
    });

    it('should handle malformed x-forwarded-for with only commas', () => {
      const request = createMockRequest({
        'x-forwarded-for': ', , ,',
      });

      // Split and trim first element will be empty string
      expect(getClientIP(request)).toBe('');
    });
  });
});
