'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTenant } from '@/lib/contexts/TenantContext';

export const dynamic = 'force-dynamic';

type AutomationLevel = 'suggest' | 'auto_routine' | 'full_auto';

interface AIBookingConfig {
  automationLevel: AutomationLevel;
  weightRevenue: number;
  weightOccupancy: number;
  weightRelationships: number;
  minMarginPercent: number;
  maxGroupPercent: number;
  blackoutDates: string[];
  preferredPartners: string[];
  blockedPartners: string[];
}

const DEFAULT_CONFIG: AIBookingConfig = {
  automationLevel: 'suggest',
  weightRevenue: 50,
  weightOccupancy: 30,
  weightRelationships: 20,
  minMarginPercent: 20,
  maxGroupPercent: 60,
  blackoutDates: [],
  preferredPartners: [],
  blockedPartners: [],
};

export default function BookingConfigPage() {
  const { location, isLoading: tenantLoading } = useTenant();
  const [config, setConfig] = useState<AIBookingConfig>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Fetch current config
  useEffect(() => {
    async function fetchConfig() {
      if (!location?.id) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/ai/tourism-bookings?merchantId=${location.id}&action=config`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.config) {
            setConfig({
              automationLevel: data.config.automationLevel || 'suggest',
              weightRevenue: data.config.weightRevenue || 50,
              weightOccupancy: data.config.weightOccupancy || 30,
              weightRelationships: data.config.weightRelationships || 20,
              minMarginPercent: data.config.minMarginPercent || 20,
              maxGroupPercent: data.config.maxGroupPercent || 60,
              blackoutDates: data.config.blackoutDates || [],
              preferredPartners: data.config.preferredPartners || [],
              blockedPartners: data.config.blockedPartners || [],
            });
          }
        }
      } catch (error) {
        console.error('Error fetching config:', error);
      } finally {
        setLoading(false);
      }
    }

    if (!tenantLoading) {
      fetchConfig();
    }
  }, [location?.id, tenantLoading]);

  // Normalize weights to sum to 100
  const normalizeWeights = (
    field: 'weightRevenue' | 'weightOccupancy' | 'weightRelationships',
    value: number
  ) => {
    const total = config.weightRevenue + config.weightOccupancy + config.weightRelationships;
    const otherFields = ['weightRevenue', 'weightOccupancy', 'weightRelationships'].filter(
      (f) => f !== field
    ) as ('weightRevenue' | 'weightOccupancy' | 'weightRelationships')[];
    const otherTotal = otherFields.reduce((sum, f) => sum + config[f], 0);

    if (value + otherTotal !== 100) {
      const remaining = 100 - value;
      const ratio = remaining / (otherTotal || 1);
      return {
        ...config,
        [field]: value,
        [otherFields[0]]: Math.round(config[otherFields[0]] * ratio),
        [otherFields[1]]: 100 - value - Math.round(config[otherFields[0]] * ratio),
      };
    }
    return { ...config, [field]: value };
  };

  // Save config
  const handleSave = async () => {
    if (!location?.id) return;

    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch('/api/ai/tourism-bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: location.id,
          action: 'update-config',
          ...config,
        }),
      });

      if (res.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (error) {
      console.error('Error saving config:', error);
    } finally {
      setSaving(false);
    }
  };

  const isLoading = loading || tenantLoading;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 rounded bg-gray-200" />
          <div className="mt-4 h-48 rounded-xl bg-gray-200" />
          <div className="mt-4 h-48 rounded-xl bg-gray-200" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Link href="/partnerships" className="hover:text-gray-700">
            Partnerships
          </Link>
          <span>/</span>
          <Link href="/partnerships/bookings" className="hover:text-gray-700">
            Bookings
          </Link>
          <span>/</span>
          <span>AI Configuration</span>
        </div>
        <h1 className="mt-1 text-2xl font-bold text-gray-900">AI Booking Coordinator</h1>
        <p className="mt-1 text-gray-600">
          Configure how AI handles group booking requests automatically.
        </p>
      </div>

      {/* Automation Level */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Automation Level</h2>
        <p className="mt-1 text-sm text-gray-500">
          Choose how much control AI has over booking decisions.
        </p>

        <div className="mt-4 space-y-3">
          <label
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
              config.automationLevel === 'suggest'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="automation"
              value="suggest"
              checked={config.automationLevel === 'suggest'}
              onChange={() => setConfig((c) => ({ ...c, automationLevel: 'suggest' }))}
              className="mt-1"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-900">Suggest Mode</span>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  Recommended
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                AI analyzes each request and suggests accept/decline, but you make the final
                decision.
              </p>
            </div>
          </label>

          <label
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
              config.automationLevel === 'auto_routine'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="automation"
              value="auto_routine"
              checked={config.automationLevel === 'auto_routine'}
              onChange={() => setConfig((c) => ({ ...c, automationLevel: 'auto_routine' }))}
              className="mt-1"
            />
            <div>
              <span className="font-medium text-gray-900">Auto-Routine Mode</span>
              <p className="mt-1 text-sm text-gray-500">
                AI automatically handles standard requests that meet your criteria. Complex requests
                still need approval.
              </p>
            </div>
          </label>

          <label
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
              config.automationLevel === 'full_auto'
                ? 'border-purple-500 bg-purple-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <input
              type="radio"
              name="automation"
              value="full_auto"
              checked={config.automationLevel === 'full_auto'}
              onChange={() => setConfig((c) => ({ ...c, automationLevel: 'full_auto' }))}
              className="mt-1"
            />
            <div>
              <span className="font-medium text-gray-900">Full Auto Mode</span>
              <p className="mt-1 text-sm text-gray-500">
                AI manages all booking decisions automatically. You only review reports and adjust
                settings.
              </p>
            </div>
          </label>
        </div>
      </div>

      {/* Optimization Weights */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Optimization Priorities</h2>
        <p className="mt-1 text-sm text-gray-500">
          How should AI balance these factors when making decisions? (Total: 100%)
        </p>

        <div className="mt-4 space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Revenue Optimization</label>
              <span className="text-sm font-medium text-purple-600">{config.weightRevenue}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={config.weightRevenue}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setConfig(normalizeWeights('weightRevenue', value));
              }}
              className="mt-1 w-full accent-purple-600"
            />
            <p className="text-xs text-gray-400">Prioritize high-value bookings</p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Occupancy Balance</label>
              <span className="text-sm font-medium text-purple-600">{config.weightOccupancy}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={config.weightOccupancy}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setConfig(normalizeWeights('weightOccupancy', value));
              }}
              className="mt-1 w-full accent-purple-600"
            />
            <p className="text-xs text-gray-400">Fill quieter time slots</p>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Partner Relationships</label>
              <span className="text-sm font-medium text-purple-600">
                {config.weightRelationships}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={config.weightRelationships}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setConfig(normalizeWeights('weightRelationships', value));
              }}
              className="mt-1 w-full accent-purple-600"
            />
            <p className="text-xs text-gray-400">Favor reliable long-term partners</p>
          </div>
        </div>
      </div>

      {/* Constraints */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Constraints</h2>
        <p className="mt-1 text-sm text-gray-500">Set limits to protect your business.</p>

        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">Minimum Margin</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                value={config.minMarginPercent}
                onChange={(e) =>
                  setConfig((c) => ({ ...c, minMarginPercent: parseInt(e.target.value) || 0 }))
                }
                className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Don&apos;t accept below this margin</p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Max Group Capacity</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                value={config.maxGroupPercent}
                onChange={(e) =>
                  setConfig((c) => ({ ...c, maxGroupPercent: parseInt(e.target.value) || 0 }))
                }
                className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Reserve space for walk-ins</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-4">
        {saved && <span className="text-sm text-green-600">Configuration saved!</span>}
        <Link
          href="/partnerships/bookings"
          className="rounded-lg border border-gray-300 bg-white px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-lg bg-purple-600 px-6 py-2 text-sm font-medium text-white hover:bg-purple-700 disabled:bg-purple-400"
        >
          {saving ? 'Saving...' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );
}
