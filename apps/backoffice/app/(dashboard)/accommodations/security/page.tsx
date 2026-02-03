'use client';

import { useState, useEffect, useCallback } from 'react';
import { Check, FloppyDisk, ShieldCheck, LockSimple, LockSimpleOpen } from '@phosphor-icons/react';
import { SpinnerGap } from '@phosphor-icons/react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PROPERTY_ID = process.env.NEXT_PUBLIC_ACCOM_PROPERTY_ID || '';
const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';

function authHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ADMIN_API_KEY}`,
  };
}

// Duplicate preset definitions (avoid cross-app import from accommodations frontend)
interface AccessActions {
  order_service: boolean;
  order_fnb: boolean;
  request_checkout: boolean;
  view_orders: boolean;
  contact_host: boolean;
}

interface AccessSettings {
  preset: 'family' | 'standard' | 'structured';
  actions: AccessActions;
}

const ACCESS_PRESETS: Record<string, AccessSettings> = {
  family: {
    preset: 'family',
    actions: {
      order_service: false,
      order_fnb: false,
      request_checkout: false,
      view_orders: false,
      contact_host: false,
    },
  },
  standard: {
    preset: 'standard',
    actions: {
      order_service: true,
      order_fnb: true,
      request_checkout: false,
      view_orders: false,
      contact_host: false,
    },
  },
  structured: {
    preset: 'structured',
    actions: {
      order_service: true,
      order_fnb: true,
      request_checkout: true,
      view_orders: true,
      contact_host: true,
    },
  },
};

type ActionKey = keyof AccessActions;

const ACTION_LABELS: { key: ActionKey; label: string; description: string }[] = [
  {
    key: 'order_service',
    label: 'Order Room Service',
    description: 'Towels, amenities, housekeeping requests',
  },
  { key: 'order_fnb', label: 'Order Food & Beverage', description: 'Restaurant and bar orders' },
  {
    key: 'request_checkout',
    label: 'Request Checkout',
    description: 'Express checkout and late checkout requests',
  },
  { key: 'view_orders', label: 'View Order History', description: 'Past orders and their status' },
  {
    key: 'contact_host',
    label: 'Contact Host via WhatsApp',
    description: 'Direct messaging with property staff',
  },
];

const PRESET_CONFIG: {
  key: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
}[] = [
  {
    key: 'family',
    emoji: '\uD83C\uDFE1',
    title: 'Family',
    subtitle: 'No verification needed',
    description: 'Best for small family-run properties. Guests can order freely.',
  },
  {
    key: 'standard',
    emoji: '\uD83C\uDFE8',
    title: 'Standard',
    subtitle: 'Verify for orders',
    description: 'Guests verify identity before placing service or F&B orders.',
  },
  {
    key: 'structured',
    emoji: '\uD83C\uDFE2',
    title: 'Structured',
    subtitle: 'Verify for everything',
    description: 'Maximum security. Guests verify before any action.',
  },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Check if current actions match a known preset exactly */
function detectPreset(actions: AccessActions): string | null {
  for (const [name, preset] of Object.entries(ACCESS_PRESETS)) {
    const match = (Object.keys(preset.actions) as ActionKey[]).every(
      (k) => preset.actions[k] === actions[k]
    );
    if (match) return name;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SecuritySettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [propertyId, setPropertyId] = useState<string | null>(null);

  // Form state
  const [verificationMethod, setVerificationMethod] = useState<'last_name' | 'pin'>('last_name');
  const [accessSettings, setAccessSettings] = useState<AccessSettings>(ACCESS_PRESETS.standard);

  // Derived: is the current config a known preset or custom?
  const detectedPreset = detectPreset(accessSettings.actions);
  const isCustom = detectedPreset !== accessSettings.preset;

  // Load property settings
  useEffect(() => {
    if (!PROPERTY_ID) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch(`/api/accommodations/property?propertyId=${PROPERTY_ID}`, {
          headers: authHeaders(),
        });
        const data = await res.json();

        if (data.property) {
          const p = data.property;
          setPropertyId(p.id);
          setVerificationMethod(p.guest_verification_method || 'last_name');

          if (p.access_settings && p.access_settings.preset) {
            setAccessSettings(p.access_settings as AccessSettings);
          } else {
            setAccessSettings(ACCESS_PRESETS.standard);
          }
        }
      } catch (err) {
        console.error('Error loading property:', err);
        setError('Failed to load security settings');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // Select preset
  const handlePresetSelect = useCallback((presetName: string) => {
    const preset = ACCESS_PRESETS[presetName];
    if (preset) {
      setAccessSettings({ ...preset });
    }
  }, []);

  // Toggle individual action
  const handleActionToggle = useCallback((actionKey: ActionKey) => {
    setAccessSettings((prev) => {
      const newActions = { ...prev.actions, [actionKey]: !prev.actions[actionKey] };
      const matched = detectPreset(newActions);
      return {
        preset: matched ? (matched as AccessSettings['preset']) : prev.preset,
        actions: newActions,
      };
    });
  }, []);

  // Save
  const handleSave = async () => {
    if (!propertyId) return;

    setSaving(true);
    setError(null);

    try {
      const res = await fetch('/api/accommodations/property', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({
          id: propertyId,
          guest_verification_method: verificationMethod,
          access_settings: accessSettings,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving security settings:', err);
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  if (!PROPERTY_ID) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-bold text-gray-900">Guest Verification</h1>
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="font-medium text-amber-800">No property configured</p>
          <p className="mt-1 text-sm text-amber-600">
            Set the{' '}
            <code className="rounded bg-amber-100 px-1 py-0.5">NEXT_PUBLIC_ACCOM_PROPERTY_ID</code>{' '}
            environment variable to get started.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <SpinnerGap className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-7 w-7 text-blue-600" weight="duotone" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Guest Verification</h1>
            <p className="text-sm text-gray-500">
              Configure how guests verify their identity for services
            </p>
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? (
            <SpinnerGap className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <Check className="h-4 w-4" weight="bold" />
          ) : (
            <FloppyDisk className="h-4 w-4" weight="duotone" />
          )}
          {saved ? 'Saved!' : 'Save Settings'}
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {saved && (
        <div className="mb-6 rounded-xl border border-green-200 bg-green-50 p-4">
          <div className="flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600" weight="bold" />
            <p className="text-green-800">Security settings saved successfully</p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Verification Method */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-1 text-lg font-semibold text-gray-900">Verification Method</h2>
          <p className="mb-4 text-sm text-gray-500">
            How guests prove their identity when upgrading from browse to full access
          </p>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setVerificationMethod('last_name')}
              className={`flex-1 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
                verificationMethod === 'last_name'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">Last Name</div>
              <div className="text-xs text-gray-500">
                Guest enters their last name to verify identity. Simple and familiar.
              </div>
            </button>
            <button
              type="button"
              onClick={() => setVerificationMethod('pin')}
              className={`flex-1 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
                verificationMethod === 'pin'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-semibold text-gray-900">PIN</div>
              <div className="text-xs text-gray-500">
                Guest enters a PIN code set per booking. More secure for shared rooms.
              </div>
            </button>
          </div>
        </section>

        {/* Security Preset */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-1 text-lg font-semibold text-gray-900">Security Preset</h2>
          <p className="mb-4 text-sm text-gray-500">
            Choose a preset that matches your property style, then customize individual actions
            below
          </p>

          <div className="grid grid-cols-3 gap-3">
            {PRESET_CONFIG.map((preset) => {
              const isSelected = accessSettings.preset === preset.key && !isCustom;
              return (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => handlePresetSelect(preset.key)}
                  className={`rounded-xl border-2 p-4 text-left transition-all ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50 shadow-sm'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="mb-2 text-2xl">{preset.emoji}</div>
                  <div className="font-semibold text-gray-900">{preset.title}</div>
                  <div className="text-sm font-medium text-blue-600">{preset.subtitle}</div>
                  <div className="mt-1 text-xs text-gray-500">{preset.description}</div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Action Gates */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Action Gates</h2>
              <p className="text-sm text-gray-500">
                Fine-tune which actions require guest verification
              </p>
            </div>
            {isCustom && (
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
                Custom configuration — differs from {accessSettings.preset} preset
              </span>
            )}
          </div>

          <div className="divide-y divide-gray-100">
            {ACTION_LABELS.map(({ key, label, description }) => {
              const isGated = accessSettings.actions[key];
              return (
                <div
                  key={key}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    {isGated ? (
                      <LockSimple className="h-5 w-5 text-amber-500" weight="duotone" />
                    ) : (
                      <LockSimpleOpen className="h-5 w-5 text-green-500" weight="duotone" />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{label}</div>
                      <div className="text-xs text-gray-500">{description}</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    role="switch"
                    aria-checked={isGated}
                    onClick={() => handleActionToggle(key)}
                    className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isGated ? 'bg-amber-500' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                        isGated ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-lg bg-gray-50 p-3">
            <p className="text-xs text-gray-500">
              <strong>Gated</strong> (amber) = guest must verify identity before this action.{' '}
              <strong>Open</strong> (green) = available to all guests in browse mode.
            </p>
          </div>
        </section>
      </div>

      {/* Bottom Save */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? (
            <SpinnerGap className="h-4 w-4 animate-spin" />
          ) : (
            <FloppyDisk className="h-4 w-4" weight="duotone" />
          )}
          Save Settings
        </button>
      </div>
    </div>
  );
}
