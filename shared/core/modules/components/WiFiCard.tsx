/**
 * WiFi Card Component
 * Displays WiFi credentials with QR code for easy connection
 *
 * Features:
 * - Show/hide password toggle
 * - Copy to clipboard
 * - QR code for auto-connect (iOS/Android)
 * - Multi-network support
 */

'use client';

import React, { useState } from 'react';
import { WiFiNetwork, WiFiConfig } from '../types';
import { MultiLangText, LanguageCode, getLocalizedText } from '../../translation-engine/types';

interface WiFiCardProps {
  config: WiFiConfig;
  language: LanguageCode;
  className?: string;
}

interface WiFiNetworkCardProps {
  network: WiFiNetwork;
  showPassword: boolean;
  showQrCode: boolean;
  language: LanguageCode;
}

// Generate WiFi QR code string (standard format)
function generateWiFiQRString(network: WiFiNetwork): string {
  const security = network.security === 'Open' ? 'nopass' : network.security;
  const hidden = network.hidden ? 'H:true' : '';
  return `WIFI:T:${security};S:${network.ssid};P:${network.password};${hidden};`;
}

function WiFiNetworkCard({ network, showPassword, showQrCode, language }: WiFiNetworkCardProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [copied, setCopied] = useState<'ssid' | 'password' | null>(null);

  const copyToClipboard = async (text: string, type: 'ssid' | 'password') => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const note = network.note ? getLocalizedText(network.note, language) : null;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.14 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">WiFi</h3>
          {network.bandwidthMbps && (
            <p className="text-xs text-gray-500">{network.bandwidthMbps} Mbps</p>
          )}
        </div>
      </div>

      {/* Network Name */}
      <div className="mb-3">
        <label className="text-xs text-gray-500 uppercase tracking-wide">Network</label>
        <div className="flex items-center justify-between mt-1">
          <span className="font-mono text-lg text-gray-900">{network.ssid}</span>
          <button
            onClick={() => copyToClipboard(network.ssid, 'ssid')}
            className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
            aria-label="Copy network name"
          >
            {copied === 'ssid' ? (
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Password */}
      {showPassword && network.password && (
        <div className="mb-3">
          <label className="text-xs text-gray-500 uppercase tracking-wide">Password</label>
          <div className="flex items-center justify-between mt-1">
            <span className="font-mono text-lg text-gray-900">
              {passwordVisible ? network.password : '••••••••'}
            </span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                aria-label={passwordVisible ? 'Hide password' : 'Show password'}
              >
                {passwordVisible ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => copyToClipboard(network.password, 'password')}
                className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Copy password"
              >
                {copied === 'password' ? (
                  <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Code */}
      {showQrCode && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-center">
            <div className="bg-gray-50 p-3 rounded-lg">
              {/* TODO: Replace with actual QR code component */}
              <div className="w-24 h-24 bg-white border-2 border-dashed border-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                QR Code
              </div>
            </div>
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">
            Scan to connect automatically
          </p>
        </div>
      )}

      {/* Note */}
      {note && (
        <p className="text-sm text-gray-500 mt-3 pt-3 border-t border-gray-100">
          {note}
        </p>
      )}
    </div>
  );
}

export function WiFiCard({ config, language, className = '' }: WiFiCardProps) {
  if (!config.networks || config.networks.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {config.networks.map((network) => (
        <WiFiNetworkCard
          key={network.id}
          network={network}
          showPassword={config.showPassword}
          showQrCode={config.showQrCode}
          language={language}
        />
      ))}
    </div>
  );
}

export default WiFiCard;
