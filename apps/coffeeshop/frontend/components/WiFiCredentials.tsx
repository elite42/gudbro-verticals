'use client';

import { useState } from 'react';
import { Button } from './ui/button';

interface WiFiCredentialsProps {
  ssid: string;
  password: string;
  showQRCode?: boolean;
}

/**
 * WiFiCredentials Component
 *
 * Displays WiFi credentials with copy functionality and optional QR code.
 *
 * QR Code Format: WIFI:T:WPA;S:SSID;P:PASSWORD;;
 * This format allows automatic WiFi connection on most smartphones.
 */
export function WiFiCredentials({
  ssid,
  password,
  showQRCode = true,
}: WiFiCredentialsProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  /**
   * Copy password to clipboard
   */
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  /**
   * Generate WiFi QR code data string
   * Format: WIFI:T:WPA;S:SSID;P:PASSWORD;;
   */
  const getWiFiQRString = () => {
    // Escape special characters in SSID and password
    const escapedSSID = ssid.replace(/([\\;,":])/g, '\\$1');
    const escapedPassword = password.replace(/([\\;,":])/g, '\\$1');
    return `WIFI:T:WPA;S:${escapedSSID};P:${escapedPassword};;`;
  };

  /**
   * Generate QR code SVG using a simple QR code library
   * For production, use a library like 'qrcode' or 'qrcode.react'
   *
   * For now, we'll use a data URL approach with an external service
   */
  const getQRCodeURL = () => {
    const qrData = encodeURIComponent(getWiFiQRString());
    // Using QR Server API (free, no registration required)
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrData}`;
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4 shadow-sm">
      {/* Compact Single Row Layout */}
      <div className="flex items-center gap-3">
        {/* Modern WiFi Icon (SVG Flat) */}
        <div className="flex-shrink-0">
          <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-4c-2.2 0-4 1.8-4 4h2c0-1.1.9-2 2-2s2 .9 2 2h2c0-2.2-1.8-4-4-4zm0-4c-3.3 0-6 2.7-6 6h2c0-2.2 1.8-4 4-4s4 1.8 4 4h2c0-3.3-2.7-6-6-6zm0-4C6.5 6 2 10.5 2 16h2c0-4.4 3.6-8 8-8s8 3.6 8 8h2c0-5.5-4.5-10-10-10z"/>
          </svg>
        </div>

        {/* WiFi Info */}
        <div className="flex-1 min-w-0">
          <div className="text-base font-bold text-gray-900">{ssid}</div>
          <div className="font-mono text-sm font-semibold text-gray-700 truncate">
            {showPassword ? password : '•'.repeat(password.length)}
          </div>
        </div>

        {/* Action Icons - Inline */}
        <div className="flex gap-1.5 flex-shrink-0">
          {/* Copy */}
          <button
            onClick={handleCopy}
            className="p-2.5 hover:bg-blue-100 rounded-lg transition-colors active:scale-95"
            title="Copia password"
            aria-label="Copia password WiFi"
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {copied ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              ) : (
                <>
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" strokeWidth="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" strokeWidth="2" />
                </>
              )}
            </svg>
          </button>

          {/* Show/Hide */}
          <button
            onClick={() => setShowPassword(!showPassword)}
            className="p-2.5 hover:bg-blue-100 rounded-lg transition-colors active:scale-95"
            title={showPassword ? 'Nascondi' : 'Mostra'}
            aria-label={showPassword ? 'Nascondi password' : 'Mostra password'}
          >
            <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {showPassword ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              )}
            </svg>
          </button>

          {/* QR Code */}
          {showQRCode && (
            <button
              onClick={() => setShowQR(!showQR)}
              className="p-2.5 hover:bg-blue-100 rounded-lg transition-colors active:scale-95"
              title={showQR ? 'Nascondi QR' : 'Mostra QR'}
              aria-label={showQR ? 'Nascondi QR Code' : 'Mostra QR Code'}
            >
              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* QR Code (expandable) */}
      {showQRCode && showQR && (
        <div className="mt-2 pt-2 border-t border-blue-200 text-center">
          <div className="bg-white rounded-lg p-2 inline-block">
            <img
              src={getQRCodeURL()}
              alt="WiFi QR Code"
              className="w-32 h-32"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </div>
  );
}
