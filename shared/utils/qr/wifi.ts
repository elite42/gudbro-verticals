/**
 * WiFi QR Code String Generation
 *
 * Generates the standard WIFI: protocol string for QR codes.
 * Extracted from apps/backoffice/lib/qr/qr-types.ts for shared use.
 *
 * Spec: https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config
 */

export type WiFiSecurity = 'WPA' | 'WEP' | 'nopass';

export interface WiFiConfig {
  ssid: string;
  password: string;
  security?: WiFiSecurity;
  hidden?: boolean;
}

/**
 * Escape special characters for WiFi QR code string.
 * Characters that need escaping: \ ; : ,
 */
export function escapeWiFiValue(value: string): string {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/:/g, '\\:')
    .replace(/,/g, '\\,');
}

/**
 * Generate a WiFi QR code protocol string.
 *
 * @example
 * generateWiFiString({ ssid: 'MyWiFi', password: 'pass123' })
 * // => 'WIFI:T:WPA;S:MyWiFi;P:pass123;H:false;;'
 */
export function generateWiFiString(config: WiFiConfig): string {
  const { ssid, password, security = 'WPA', hidden = false } = config;
  const escapedSsid = escapeWiFiValue(ssid);
  const escapedPassword = escapeWiFiValue(password);
  const hiddenStr = hidden ? 'true' : 'false';

  return `WIFI:T:${security};S:${escapedSsid};P:${escapedPassword};H:${hiddenStr};;`;
}
