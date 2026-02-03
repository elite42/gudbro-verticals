'use client';

/**
 * Messaging Channels Settings Section
 *
 * Allows merchants to configure notification channels:
 * - WhatsApp Business
 * - Telegram
 * - LINE
 * - Zalo
 * - KakaoTalk
 *
 * Each channel has:
 * - Enable/Disable toggle
 * - API credentials input
 * - Test connection button
 * - Status indicator
 */

import { useState, useEffect, useCallback } from 'react';
import {
  SpinnerGap,
  Check,
  WarningCircle,
  ArrowSquareOut,
  Eye,
  EyeSlash,
  ArrowsClockwise,
  QrCode,
  GearSix,
  ChatCircle,
} from '@phosphor-icons/react';

interface ChannelConfig {
  key: string;
  name: string;
  icon: string;
  description: string;
  region: string;
  docsUrl: string;
  fields: ChannelField[];
}

interface ChannelField {
  key: string;
  label: string;
  placeholder: string;
  type: 'text' | 'password';
  required: boolean;
  helpText?: string;
}

interface ChannelStatus {
  isEnabled: boolean;
  isConfigured: boolean;
  isVerified: boolean;
  displayName?: string;
  publicId?: string;
  lastVerifiedAt?: string;
  verificationError?: string;
}

interface ChannelCredentials {
  [key: string]: string;
}

// Channel configurations
const MESSAGING_CHANNELS: ChannelConfig[] = [
  {
    key: 'whatsapp',
    name: 'WhatsApp Business',
    icon: '💬',
    description: 'Send notifications via WhatsApp Business API',
    region: 'Global (2B+ users)',
    docsUrl: 'https://developers.facebook.com/docs/whatsapp/cloud-api',
    fields: [
      {
        key: 'phone_number_id',
        label: 'Phone Number ID',
        placeholder: '1234567890',
        type: 'text',
        required: true,
        helpText: 'From Meta Business Manager',
      },
      {
        key: 'access_token',
        label: 'Access Token',
        placeholder: 'EAAxxxxxxx...',
        type: 'password',
        required: true,
      },
      {
        key: 'business_id',
        label: 'Business ID (optional)',
        placeholder: '1234567890',
        type: 'text',
        required: false,
        helpText: 'For template management',
      },
    ],
  },
  {
    key: 'telegram',
    name: 'Telegram',
    icon: '✈️',
    description: 'Free unlimited messages via Telegram Bot',
    region: 'Global (900M users)',
    docsUrl: 'https://core.telegram.org/bots/api',
    fields: [
      {
        key: 'bot_token',
        label: 'Bot Token',
        placeholder: '123456:ABC-DEF1234ghIkl...',
        type: 'password',
        required: true,
        helpText: 'Get from @BotFather',
      },
      {
        key: 'bot_username',
        label: 'Bot Username',
        placeholder: '@yourbotname',
        type: 'text',
        required: false,
      },
    ],
  },
  {
    key: 'line',
    name: 'LINE',
    icon: '💚',
    description: 'Reach customers in Japan, Thailand, Taiwan',
    region: 'Japan, Thailand, Taiwan (200M users)',
    docsUrl: 'https://developers.line.biz/en/docs/messaging-api/',
    fields: [
      {
        key: 'channel_id',
        label: 'Channel ID',
        placeholder: '1234567890',
        type: 'text',
        required: true,
      },
      {
        key: 'channel_secret',
        label: 'Channel Secret',
        placeholder: 'abc123def456...',
        type: 'password',
        required: true,
      },
      {
        key: 'access_token',
        label: 'Channel Access Token',
        placeholder: 'xxxxxxxx...',
        type: 'password',
        required: true,
      },
    ],
  },
  {
    key: 'zalo',
    name: 'Zalo OA',
    icon: '🔵',
    description: 'Official Account for Vietnam market',
    region: 'Vietnam (75M users)',
    docsUrl: 'https://developers.zalo.me/docs/official-account',
    fields: [
      {
        key: 'oa_id',
        label: 'OA ID',
        placeholder: '1234567890',
        type: 'text',
        required: true,
      },
      {
        key: 'access_token',
        label: 'Access Token',
        placeholder: 'xxxxxxxx...',
        type: 'password',
        required: true,
      },
      {
        key: 'refresh_token',
        label: 'Refresh Token (optional)',
        placeholder: 'xxxxxxxx...',
        type: 'password',
        required: false,
        helpText: 'For auto token refresh',
      },
    ],
  },
  {
    key: 'kakao',
    name: 'KakaoTalk',
    icon: '💛',
    description: 'Channel messaging for Korea market',
    region: 'Korea (50M users)',
    docsUrl: 'https://developers.kakao.com/docs/latest/ko/message/rest-api',
    fields: [
      {
        key: 'rest_api_key',
        label: 'REST API Key',
        placeholder: 'xxxxxxxx...',
        type: 'password',
        required: true,
      },
      {
        key: 'admin_key',
        label: 'Admin Key',
        placeholder: 'xxxxxxxx...',
        type: 'password',
        required: true,
      },
      {
        key: 'sender_key',
        label: 'Sender Key (for Alimtalk)',
        placeholder: 'xxxxxxxx...',
        type: 'password',
        required: false,
        helpText: 'Required for template messages',
      },
    ],
  },
];

interface MessagingChannelsSectionProps {
  merchantId: string;
}

export function MessagingChannelsSection({ merchantId }: MessagingChannelsSectionProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [channelStatuses, setChannelStatuses] = useState<Record<string, ChannelStatus>>({});
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<Record<string, ChannelCredentials>>({});
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [savingChannel, setSavingChannel] = useState<string | null>(null);
  const [testingChannel, setTestingChannel] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Load channel statuses
  const loadChannelStatuses = useCallback(async () => {
    try {
      const res = await fetch(`/api/settings/messaging-channels?merchantId=${merchantId}`);
      if (!res.ok) throw new Error('Failed to load channels');
      const data = await res.json();
      setChannelStatuses(data.channels || {});
    } catch (err) {
      console.error('Error loading channels:', err);
      setError('Failed to load messaging channels');
    } finally {
      setIsLoading(false);
    }
  }, [merchantId]);

  useEffect(() => {
    loadChannelStatuses();
  }, [loadChannelStatuses]);

  // Toggle channel enabled/disabled
  const toggleChannel = async (channelKey: string, enabled: boolean) => {
    setSavingChannel(channelKey);
    setError(null);

    try {
      const res = await fetch('/api/settings/messaging-channels', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId,
          channel: channelKey,
          isEnabled: enabled,
        }),
      });

      if (!res.ok) throw new Error('Failed to update channel');

      setChannelStatuses((prev) => ({
        ...prev,
        [channelKey]: { ...prev[channelKey], isEnabled: enabled },
      }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update');
    } finally {
      setSavingChannel(null);
    }
  };

  // Save channel credentials
  const saveCredentials = async (channelKey: string) => {
    setSavingChannel(channelKey);
    setError(null);
    setSuccessMessage(null);

    try {
      const res = await fetch('/api/settings/messaging-channels', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId,
          channel: channelKey,
          credentials: credentials[channelKey] || {},
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save credentials');
      }

      const data = await res.json();
      setChannelStatuses((prev) => ({
        ...prev,
        [channelKey]: {
          ...prev[channelKey],
          isConfigured: true,
          displayName: data.displayName,
          publicId: data.publicId,
        },
      }));

      setSuccessMessage('Credentials saved successfully');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save');
    } finally {
      setSavingChannel(null);
    }
  };

  // Test channel connection
  const testConnection = async (channelKey: string) => {
    setTestingChannel(channelKey);
    setError(null);

    try {
      const res = await fetch('/api/settings/messaging-channels/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId,
          channel: channelKey,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Connection test failed');
      }

      setChannelStatuses((prev) => ({
        ...prev,
        [channelKey]: {
          ...prev[channelKey],
          isVerified: true,
          displayName: data.displayName,
          lastVerifiedAt: new Date().toISOString(),
          verificationError: undefined,
        },
      }));

      setSuccessMessage(
        `${MESSAGING_CHANNELS.find((c) => c.key === channelKey)?.name} connected successfully!`
      );
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Connection test failed';
      setChannelStatuses((prev) => ({
        ...prev,
        [channelKey]: {
          ...prev[channelKey],
          isVerified: false,
          verificationError: errorMsg,
        },
      }));
      setError(errorMsg);
    } finally {
      setTestingChannel(null);
    }
  };

  // Update credential field
  const updateCredential = (channelKey: string, fieldKey: string, value: string) => {
    setCredentials((prev) => ({
      ...prev,
      [channelKey]: {
        ...(prev[channelKey] || {}),
        [fieldKey]: value,
      },
    }));
  };

  // Count connected channels
  const connectedCount = Object.values(channelStatuses).filter(
    (s) => s.isEnabled && s.isConfigured
  ).length;

  if (isLoading) {
    return (
      <div className="flex h-32 items-center justify-center">
        <SpinnerGap className="h-6 w-6 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h3 className="flex items-center gap-2 font-semibold text-gray-900">
            <ChatCircle className="h-5 w-5 text-blue-600" />
            Messaging Channels
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Configure channels to send reservation notifications to customers
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
          <span className="text-sm font-medium text-blue-700">{connectedCount} connected</span>
        </div>
      </div>

      {/* Error/Success Messages */}
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
          <WarningCircle className="h-4 w-4" />
          {error}
        </div>
      )}
      {successMessage && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-sm text-green-700">
          <Check className="h-4 w-4" />
          {successMessage}
        </div>
      )}

      {/* Channel List */}
      <div className="space-y-3">
        {MESSAGING_CHANNELS.map((channel) => {
          const status = channelStatuses[channel.key] || {
            isEnabled: false,
            isConfigured: false,
            isVerified: false,
          };
          const isExpanded = expandedChannel === channel.key;
          const isSaving = savingChannel === channel.key;
          const isTesting = testingChannel === channel.key;

          return (
            <div
              key={channel.key}
              className={`rounded-lg border transition-all ${
                status.isEnabled && status.isConfigured
                  ? 'border-green-200 bg-green-50/50'
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              {/* Channel Header */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{channel.icon}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-gray-900">{channel.name}</span>
                      {status.isVerified && (
                        <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700">
                          <Check className="h-3 w-3" />
                          Connected
                        </span>
                      )}
                      {status.isConfigured && !status.isVerified && (
                        <span className="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">
                          Not verified
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{channel.region}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  {/* Enable Toggle */}
                  <button
                    onClick={() => toggleChannel(channel.key, !status.isEnabled)}
                    disabled={isSaving}
                    className={`relative h-6 w-11 rounded-full transition-colors ${
                      status.isEnabled ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${
                        status.isEnabled ? 'left-[22px]' : 'left-0.5'
                      }`}
                    />
                  </button>

                  {/* Settings Button */}
                  <button
                    onClick={() => setExpandedChannel(isExpanded ? null : channel.key)}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                  >
                    <GearSix className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Expanded Settings */}
              {isExpanded && (
                <div className="border-t border-gray-200 bg-white p-4">
                  <p className="mb-4 text-sm text-gray-600">{channel.description}</p>

                  {/* Credential Fields */}
                  <div className="space-y-3">
                    {channel.fields.map((field) => (
                      <div key={field.key}>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                          {field.label}
                          {field.required && <span className="text-red-500"> *</span>}
                        </label>
                        <div className="relative">
                          <input
                            type={
                              field.type === 'password' &&
                              !showPasswords[`${channel.key}_${field.key}`]
                                ? 'password'
                                : 'text'
                            }
                            value={credentials[channel.key]?.[field.key] || ''}
                            onChange={(e) =>
                              updateCredential(channel.key, field.key, e.target.value)
                            }
                            placeholder={field.placeholder}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                          />
                          {field.type === 'password' && (
                            <button
                              type="button"
                              onClick={() =>
                                setShowPasswords((prev) => ({
                                  ...prev,
                                  [`${channel.key}_${field.key}`]:
                                    !prev[`${channel.key}_${field.key}`],
                                }))
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                            >
                              {showPasswords[`${channel.key}_${field.key}`] ? (
                                <EyeSlash className="h-4 w-4" />
                              ) : (
                                <Eye className="h-4 w-4" />
                              )}
                            </button>
                          )}
                        </div>
                        {field.helpText && (
                          <p className="mt-1 text-xs text-gray-500">{field.helpText}</p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex items-center justify-between">
                    <a
                      href={channel.docsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                    >
                      <ArrowSquareOut className="h-3 w-3" />
                      Setup Guide
                    </a>

                    <div className="flex gap-2">
                      <button
                        onClick={() => testConnection(channel.key)}
                        disabled={isTesting || !status.isConfigured}
                        className="flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                      >
                        {isTesting ? (
                          <SpinnerGap className="h-3 w-3 animate-spin" />
                        ) : (
                          <ArrowsClockwise className="h-3 w-3" />
                        )}
                        Test
                      </button>
                      <button
                        onClick={() => saveCredentials(channel.key)}
                        disabled={isSaving}
                        className="flex items-center gap-1 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
                      >
                        {isSaving ? (
                          <SpinnerGap className="h-3 w-3 animate-spin" />
                        ) : (
                          <Check className="h-3 w-3" />
                        )}
                        Save
                      </button>
                    </div>
                  </div>

                  {/* Status Info */}
                  {status.displayName && (
                    <div className="mt-3 rounded-lg bg-gray-50 p-3">
                      <p className="text-sm text-gray-600">
                        <strong>Connected as:</strong> {status.displayName}
                      </p>
                      {status.publicId && (
                        <p className="text-sm text-gray-600">
                          <strong>Public ID:</strong> {status.publicId}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Verification Error */}
                  {status.verificationError && (
                    <div className="mt-3 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                      <WarningCircle className="mt-0.5 h-4 w-4" />
                      <div>
                        <p className="font-medium">Connection Error</p>
                        <p>{status.verificationError}</p>
                      </div>
                    </div>
                  )}

                  {/* QR Code for customer linking (if verified) */}
                  {status.isVerified && status.publicId && (
                    <div className="mt-3 flex items-center gap-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
                      <QrCode className="h-8 w-8 text-blue-600" />
                      <div>
                        <p className="text-sm font-medium text-blue-900">Customer QR Code</p>
                        <p className="text-xs text-blue-700">
                          Customers can scan to connect their {channel.name} account
                        </p>
                      </div>
                      <button className="ml-auto rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700">
                        Generate QR
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-6 rounded-lg bg-gray-50 p-4">
        <h4 className="flex items-center gap-2 font-medium text-gray-900">
          <span>💡</span>
          How it works
        </h4>
        <ul className="mt-2 space-y-1 text-sm text-gray-600">
          <li>1. Enable and configure the channels you want to use</li>
          <li>2. Test the connection to verify credentials</li>
          <li>3. Customers connect their accounts via QR code or bot link</li>
          <li>4. Reservation notifications are sent automatically</li>
        </ul>
      </div>
    </div>
  );
}

export default MessagingChannelsSection;
