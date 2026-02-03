'use client';

import { useState, useEffect, useCallback } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { Shield, Warning, Check, ArrowsClockwise, Key, Trash } from '@phosphor-icons/react';
import { useTranslations } from 'next-intl';
import TwoFactorSetup from '@/components/auth/TwoFactorSetup';
import { InfoTooltip } from '@/components/ui/info-tooltip';

interface OAuthProvider {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  enabled: boolean;
  client_id: string;
  client_secret: string;
  redirect_url: string;
  scopes: string[];
  setup_url: string;
  description: string;
}

const DEFAULT_PROVIDERS: OAuthProvider[] = [
  {
    id: 'google',
    name: 'Google',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
    ),
    color: 'border-gray-300 hover:border-blue-400',
    enabled: false,
    client_id: '',
    client_secret: '',
    redirect_url: '',
    scopes: ['email', 'profile'],
    setup_url: 'https://console.cloud.google.com/apis/credentials',
    description:
      'Allow users to sign in with their Google account. Most popular option for web apps.',
  },
  {
    id: 'apple',
    name: 'Apple',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
      </svg>
    ),
    color: 'border-gray-300 hover:border-gray-600',
    enabled: false,
    client_id: '',
    client_secret: '',
    redirect_url: '',
    scopes: ['email', 'name'],
    setup_url: 'https://developer.apple.com/account/resources/identifiers/list/serviceId',
    description: 'Sign in with Apple. Required for iOS apps, popular with Apple users.',
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: (
      <svg className="h-6 w-6" fill="#1877F2" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
    color: 'border-gray-300 hover:border-blue-600',
    enabled: false,
    client_id: '',
    client_secret: '',
    redirect_url: '',
    scopes: ['email', 'public_profile'],
    setup_url: 'https://developers.facebook.com/apps/',
    description: 'Allow users to sign in with Facebook. Good for social-focused apps.',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
    color: 'border-gray-300 hover:border-gray-800',
    enabled: false,
    client_id: '',
    client_secret: '',
    redirect_url: '',
    scopes: ['user:email'],
    setup_url: 'https://github.com/settings/developers',
    description: 'Sign in with GitHub. Popular for developer-focused platforms.',
  },
  {
    id: 'twitter',
    name: 'Twitter/X',
    icon: (
      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: 'border-gray-300 hover:border-gray-800',
    enabled: false,
    client_id: '',
    client_secret: '',
    redirect_url: '',
    scopes: ['tweet.read', 'users.read'],
    setup_url: 'https://developer.twitter.com/en/portal/dashboard',
    description: 'Sign in with X (Twitter). Useful for social media integrations.',
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    icon: (
      <svg className="h-6 w-6" fill="#0A66C2" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: 'border-gray-300 hover:border-blue-700',
    enabled: false,
    client_id: '',
    client_secret: '',
    redirect_url: '',
    scopes: ['r_liteprofile', 'r_emailaddress'],
    setup_url: 'https://www.linkedin.com/developers/apps',
    description: 'Sign in with LinkedIn. Great for B2B and professional networks.',
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: (
      <svg className="h-6 w-6" fill="#5865F2" viewBox="0 0 24 24">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
      </svg>
    ),
    color: 'border-gray-300 hover:border-indigo-500',
    enabled: false,
    client_id: '',
    client_secret: '',
    redirect_url: '',
    scopes: ['identify', 'email'],
    setup_url: 'https://discord.com/developers/applications',
    description: 'Sign in with Discord. Popular for gaming and community platforms.',
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    icon: (
      <svg className="h-6 w-6" viewBox="0 0 24 24">
        <path fill="#F25022" d="M1 1h10v10H1z" />
        <path fill="#00A4EF" d="M1 13h10v10H1z" />
        <path fill="#7FBA00" d="M13 1h10v10H13z" />
        <path fill="#FFB900" d="M13 13h10v10H13z" />
      </svg>
    ),
    color: 'border-gray-300 hover:border-blue-500',
    enabled: false,
    client_id: '',
    client_secret: '',
    redirect_url: '',
    scopes: ['openid', 'email', 'profile'],
    setup_url: 'https://portal.azure.com/#blade/Microsoft_AAD_RegisteredApps/ApplicationsListBlade',
    description: 'Sign in with Microsoft/Azure AD. Best for enterprise and Office 365 users.',
  },
];

export default function AuthSettingsPage() {
  const t = useTranslations('authPage');
  const [providers, setProviders] = useState<OAuthProvider[]>(DEFAULT_PROVIDERS);
  const [editingProvider, setEditingProvider] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [callbackUrl, setCallbackUrl] = useState('');

  // 2FA State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [twoFactorConfigured, setTwoFactorConfigured] = useState(true);
  const [twoFactorLoading, setTwoFactorLoading] = useState(true);
  const [showTwoFactorSetup, setShowTwoFactorSetup] = useState(false);
  const [showDisableConfirm, setShowDisableConfirm] = useState(false);
  const [disableCode, setDisableCode] = useState('');
  const [disableError, setDisableError] = useState('');
  const [isDisabling, setIsDisabling] = useState(false);
  const [showRegenerateRecovery, setShowRegenerateRecovery] = useState(false);
  const [regenerateCode, setRegenerateCode] = useState('');
  const [regenerateError, setRegenerateError] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [newRecoveryCodes, setNewRecoveryCodes] = useState<string[] | null>(null);

  // Generate callback URL on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const baseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
      setCallbackUrl(`${baseUrl}/auth/v1/callback`);
    }
  }, []);

  // Load 2FA status
  const load2FAStatus = useCallback(async () => {
    try {
      setTwoFactorLoading(true);
      const response = await fetch('/api/auth/2fa/setup');
      const data = await response.json();

      if (response.ok) {
        setTwoFactorConfigured(data.configured ?? true);
        setTwoFactorEnabled(data.twoFactorEnabled ?? false);
      }
    } catch (err) {
      console.error('Error loading 2FA status:', err);
    } finally {
      setTwoFactorLoading(false);
    }
  }, []);

  useEffect(() => {
    load2FAStatus();
  }, [load2FAStatus]);

  // Handle 2FA setup complete
  const handleTwoFactorSetupComplete = useCallback(() => {
    setShowTwoFactorSetup(false);
    setTwoFactorEnabled(true);
  }, []);

  // Handle 2FA disable
  const handleDisable2FA = useCallback(async () => {
    if (!disableCode || disableCode.length !== 6) {
      setDisableError('Please enter a 6-digit code');
      return;
    }

    setIsDisabling(true);
    setDisableError('');

    try {
      const response = await fetch('/api/auth/2fa/disable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: disableCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to disable 2FA');
      }

      setTwoFactorEnabled(false);
      setShowDisableConfirm(false);
      setDisableCode('');
    } catch (err) {
      setDisableError(err instanceof Error ? err.message : 'Failed to disable');
    } finally {
      setIsDisabling(false);
    }
  }, [disableCode]);

  // Handle recovery codes regeneration
  const handleRegenerateRecoveryCodes = useCallback(async () => {
    if (!regenerateCode || regenerateCode.length !== 6) {
      setRegenerateError('Please enter a 6-digit code');
      return;
    }

    setIsRegenerating(true);
    setRegenerateError('');

    try {
      const response = await fetch('/api/auth/2fa/recovery', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: regenerateCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to regenerate codes');
      }

      setNewRecoveryCodes(data.recoveryCodes);
      setRegenerateCode('');
    } catch (err) {
      setRegenerateError(err instanceof Error ? err.message : 'Failed to regenerate');
    } finally {
      setIsRegenerating(false);
    }
  }, [regenerateCode]);

  // Load saved config from database
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        );

        const { data, error } = await supabase.from('merchant_oauth_config').select('*').single();

        if (data && !error) {
          // Merge saved config with defaults
          setProviders((prev) =>
            prev.map((p) => {
              const saved = data.providers?.[p.id];
              if (saved) {
                return { ...p, ...saved };
              }
              return p;
            })
          );
        }
      } catch (err) {
        console.error('Error loading OAuth config:', err);
      }
    };

    loadConfig();
  }, []);

  // Save config
  const handleSave = async () => {
    setIsSaving(true);
    setSaveSuccess(false);

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const providersConfig = providers.reduce(
        (acc, p) => {
          acc[p.id] = {
            enabled: p.enabled,
            client_id: p.client_id,
            client_secret: p.client_secret,
          };
          return acc;
        },
        {} as Record<string, { enabled: boolean; client_id: string; client_secret: string }>
      );

      // Upsert config
      const { error } = await supabase.from('merchant_oauth_config').upsert({
        merchant_id: process.env.NEXT_PUBLIC_MERCHANT_ID,
        providers: providersConfig,
        updated_at: new Date().toISOString(),
      });

      if (error) throw error;

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Error saving OAuth config:', err);
    } finally {
      setIsSaving(false);
    }
  };

  // Toggle provider
  const toggleProvider = (providerId: string) => {
    setProviders((prev) =>
      prev.map((p) => (p.id === providerId ? { ...p, enabled: !p.enabled } : p))
    );
  };

  // Update provider field
  const updateProviderField = (providerId: string, field: keyof OAuthProvider, value: string) => {
    setProviders((prev) => prev.map((p) => (p.id === providerId ? { ...p, [field]: value } : p)));
  };

  const enabledCount = providers.filter((p) => p.enabled).length;

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          <InfoTooltip contentKey="pages.authSettings" kbPageId="settings-auth" />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          {t('subtitle', { count: enabledCount, plural: enabledCount !== 1 ? 's' : '' })}
        </p>
      </div>

      {/* Info Banner */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h4 className="font-medium text-blue-900">How OAuth Setup Works</h4>
            <p className="mt-0.5 text-sm text-blue-700">
              1. Create an OAuth app on each provider&apos;s developer console
              <br />
              2. Copy the Client ID and Client Secret here
              <br />
              3. Add the callback URL to your OAuth app settings
              <br />
              4. Enable the provider and save
            </p>
          </div>
        </div>
      </div>

      {/* Callback URL */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h3 className="mb-2 font-semibold text-gray-900">OAuth Callback URL</h3>
        <p className="mb-3 text-sm text-gray-500">
          Use this URL as the redirect/callback URL when setting up OAuth apps:
        </p>
        <div className="flex items-center gap-2">
          <code className="flex-1 overflow-x-auto rounded-lg bg-gray-100 px-4 py-2 font-mono text-sm text-gray-800">
            {callbackUrl}
          </code>
          <button
            onClick={() => {
              navigator.clipboard.writeText(callbackUrl);
            }}
            className="rounded-lg bg-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-300"
          >
            Copy
          </button>
        </div>
      </div>

      {/* Providers Grid */}
      <div className="space-y-4">
        {providers.map((provider) => (
          <div
            key={provider.id}
            className={`rounded-xl border-2 bg-white transition-colors ${
              provider.enabled ? 'border-green-300 bg-green-50/30' : 'border-gray-200'
            }`}
          >
            {/* Provider Header */}
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-12 w-12 rounded-xl border bg-white ${provider.color} flex items-center justify-center`}
                  >
                    {provider.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{provider.name}</h3>
                      {provider.enabled && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                          Enabled
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">{provider.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      setEditingProvider(editingProvider === provider.id ? null : provider.id)
                    }
                    className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    {editingProvider === provider.id ? 'Close' : 'Configure'}
                  </button>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      checked={provider.enabled}
                      onChange={() => toggleProvider(provider.id)}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* Provider Config (Expandable) */}
            {editingProvider === provider.id && (
              <div className="border-t border-gray-200 bg-gray-50/50 px-5 pb-5 pt-3">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Client ID
                    </label>
                    <input
                      type="text"
                      value={provider.client_id}
                      onChange={(e) =>
                        updateProviderField(provider.id, 'client_id', e.target.value)
                      }
                      placeholder="Enter your Client ID"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Client Secret
                    </label>
                    <input
                      type="password"
                      value={provider.client_secret}
                      onChange={(e) =>
                        updateProviderField(provider.id, 'client_secret', e.target.value)
                      }
                      placeholder="Enter your Client Secret"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    Scopes:{' '}
                    <code className="rounded bg-gray-200 px-1.5 py-0.5 text-xs">
                      {provider.scopes.join(', ')}
                    </code>
                  </div>
                  <a
                    href={provider.setup_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Open {provider.name} Developer Console
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Email/Password Toggle */}
      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Email & Password</h3>
              <p className="mt-0.5 text-sm text-gray-500">
                Traditional email/password authentication. Always available.
              </p>
            </div>
          </div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Always Enabled
          </span>
        </div>
      </div>

      {/* Two-Factor Authentication Section */}
      <div
        className={`rounded-xl border-2 bg-white transition-colors ${
          twoFactorEnabled ? 'border-green-300 bg-green-50/30' : 'border-gray-200'
        }`}
      >
        <div className="p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  twoFactorEnabled ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                <Shield
                  className={`h-6 w-6 ${twoFactorEnabled ? 'text-green-600' : 'text-gray-600'}`}
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">Two-Factor Authentication</h3>
                  {twoFactorEnabled && (
                    <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      Enabled
                    </span>
                  )}
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Add an extra layer of security using an authenticator app.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {twoFactorLoading ? (
                <ArrowsClockwise className="h-5 w-5 animate-spin text-gray-400" />
              ) : !twoFactorConfigured ? (
                <span className="text-sm text-gray-500">Not configured on server</span>
              ) : twoFactorEnabled ? (
                <button
                  onClick={() => setShowDisableConfirm(true)}
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                >
                  Disable
                </button>
              ) : (
                <button
                  onClick={() => setShowTwoFactorSetup(true)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                >
                  Enable 2FA
                </button>
              )}
            </div>
          </div>

          {/* 2FA Setup Modal */}
          {showTwoFactorSetup && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-xl bg-white p-6">
                <TwoFactorSetup
                  onSetupComplete={handleTwoFactorSetupComplete}
                  onCancel={() => setShowTwoFactorSetup(false)}
                />
              </div>
            </div>
          )}

          {/* Disable 2FA Confirmation */}
          {showDisableConfirm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="w-full max-w-md rounded-xl bg-white p-6">
                <div className="mb-4 flex items-center gap-3 text-red-600">
                  <Warning className="h-6 w-6" />
                  <h3 className="text-lg font-semibold">Disable Two-Factor Authentication</h3>
                </div>
                <p className="mb-4 text-gray-600">
                  Disabling 2FA will make your account less secure. Enter your current authenticator
                  code to confirm.
                </p>
                <input
                  type="text"
                  value={disableCode}
                  onChange={(e) => {
                    setDisableCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                    setDisableError('');
                  }}
                  placeholder="000000"
                  className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-center font-mono text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-red-500"
                  maxLength={6}
                />
                {disableError && <p className="mb-4 text-sm text-red-600">{disableError}</p>}
                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setShowDisableConfirm(false);
                      setDisableCode('');
                      setDisableError('');
                    }}
                    className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDisable2FA}
                    disabled={isDisabling || disableCode.length !== 6}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 disabled:opacity-50"
                  >
                    {isDisabling ? (
                      <>
                        <ArrowsClockwise className="h-4 w-4 animate-spin" />
                        Disabling...
                      </>
                    ) : (
                      <>
                        <Trash className="h-4 w-4" />
                        Disable 2FA
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Recovery Codes Actions - shown when 2FA is enabled */}
          {twoFactorEnabled && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Key className="h-4 w-4" />
                  <span>Recovery Codes</span>
                </div>
                <button
                  onClick={() => setShowRegenerateRecovery(true)}
                  className="text-sm font-medium text-blue-600 hover:text-blue-700"
                >
                  Regenerate Codes
                </button>
              </div>

              {/* Regenerate Recovery Codes Modal */}
              {showRegenerateRecovery && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                  <div className="w-full max-w-md rounded-xl bg-white p-6">
                    {newRecoveryCodes ? (
                      <>
                        <div className="mb-4 flex items-center gap-3 text-green-600">
                          <Check className="h-6 w-6" />
                          <h3 className="text-lg font-semibold">New Recovery Codes</h3>
                        </div>
                        <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
                          <p className="text-sm text-yellow-700">
                            Save these codes securely. Your old codes are now invalid!
                          </p>
                        </div>
                        <div className="mb-4 grid grid-cols-2 gap-2">
                          {newRecoveryCodes.map((code, index) => (
                            <div
                              key={index}
                              className="rounded border border-gray-200 bg-gray-50 px-3 py-2 text-center font-mono text-sm"
                            >
                              {code}
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            setShowRegenerateRecovery(false);
                            setNewRecoveryCodes(null);
                          }}
                          className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
                        >
                          I&apos;ve Saved My Codes
                        </button>
                      </>
                    ) : (
                      <>
                        <h3 className="mb-2 text-lg font-semibold">Regenerate Recovery Codes</h3>
                        <p className="mb-4 text-gray-600">
                          Enter your current authenticator code to generate new recovery codes. Your
                          old codes will be invalidated.
                        </p>
                        <input
                          type="text"
                          value={regenerateCode}
                          onChange={(e) => {
                            setRegenerateCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                            setRegenerateError('');
                          }}
                          placeholder="000000"
                          className="mb-4 w-full rounded-lg border border-gray-300 px-4 py-3 text-center font-mono text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500"
                          maxLength={6}
                        />
                        {regenerateError && (
                          <p className="mb-4 text-sm text-red-600">{regenerateError}</p>
                        )}
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setShowRegenerateRecovery(false);
                              setRegenerateCode('');
                              setRegenerateError('');
                            }}
                            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleRegenerateRecoveryCodes}
                            disabled={isRegenerating || regenerateCode.length !== 6}
                            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
                          >
                            {isRegenerating ? (
                              <>
                                <ArrowsClockwise className="h-4 w-4 animate-spin" />
                                Generating...
                              </>
                            ) : (
                              'Generate New Codes'
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-between border-t border-gray-200 pt-4">
        <div>
          {saveSuccess && (
            <span className="flex items-center gap-1 text-sm text-green-600">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              {t('saveSuccess')}
            </span>
          )}
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {isSaving ? (
            <>
              <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {t('saving')}
            </>
          ) : (
            t('saveConfig')
          )}
        </button>
      </div>

      {/* Note about Supabase */}
      <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
        <div className="flex gap-3">
          <svg
            className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div>
            <h4 className="font-medium text-yellow-800">Supabase Configuration Required</h4>
            <p className="mt-0.5 text-sm text-yellow-700">
              After saving, the OAuth providers also need to be enabled in your Supabase Dashboard
              under Authentication → Providers. This is a security measure that requires admin
              access to Supabase.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
