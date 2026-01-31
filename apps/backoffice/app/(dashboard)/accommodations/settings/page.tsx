'use client';

import { useState, useEffect } from 'react';
import { Check, FloppyDisk } from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';

const PROPERTY_ID = process.env.NEXT_PUBLIC_ACCOM_PROPERTY_ID || '';
const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';

function authHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ADMIN_API_KEY}`,
  };
}

interface PropertySettings {
  id: string;
  name: string;
  slug: string;
  booking_mode: 'instant' | 'inquiry' | 'hybrid';
  check_in_time: string;
  check_out_time: string;
  deposit_percent: number;
  cancellation_penalty_percent: number;
  house_rules: string[] | null;
  cancellation_policy: string | null;
  host_phone: string | null;
  host_whatsapp: string | null;
  host_email: string | null;
  contact_email: string | null;
}

export default function PropertySettingsPage() {
  const [settings, setSettings] = useState<PropertySettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Form state
  const [bookingMode, setBookingMode] = useState<'instant' | 'inquiry' | 'hybrid'>('instant');
  const [checkInTime, setCheckInTime] = useState('14:00');
  const [checkOutTime, setCheckOutTime] = useState('11:00');
  const [depositPercent, setDepositPercent] = useState(100);
  const [cancellationPenalty, setCancellationPenalty] = useState(0);
  const [houseRulesText, setHouseRulesText] = useState('');
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [hostPhone, setHostPhone] = useState('');
  const [hostWhatsapp, setHostWhatsapp] = useState('');
  const [hostEmail, setHostEmail] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // Load settings
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
          const p = data.property as PropertySettings;
          setSettings(p);
          setBookingMode(p.booking_mode || 'instant');
          setCheckInTime(p.check_in_time || '14:00');
          setCheckOutTime(p.check_out_time || '11:00');
          setDepositPercent(p.deposit_percent ?? 100);
          setCancellationPenalty(p.cancellation_penalty_percent ?? 0);
          setHouseRulesText(p.house_rules ? p.house_rules.join('\n') : '');
          setCancellationPolicy(p.cancellation_policy || '');
          setHostPhone(p.host_phone || '');
          setHostWhatsapp(p.host_whatsapp || '');
          setHostEmail(p.host_email || '');
          setContactEmail(p.contact_email || '');
        }
      } catch (err) {
        console.error('Error loading property:', err);
        setError('Failed to load property settings');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  // Save settings
  const handleSave = async () => {
    if (!settings) return;

    setSaving(true);
    setError(null);

    const houseRules = houseRulesText
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    try {
      const res = await fetch('/api/accommodations/property', {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({
          id: settings.id,
          booking_mode: bookingMode,
          check_in_time: checkInTime,
          check_out_time: checkOutTime,
          deposit_percent: depositPercent,
          cancellation_penalty_percent: cancellationPenalty,
          house_rules: houseRules.length > 0 ? houseRules : null,
          cancellation_policy: cancellationPolicy || null,
          host_phone: hostPhone || null,
          host_whatsapp: hostWhatsapp || null,
          host_email: hostEmail || null,
          contact_email: contactEmail || null,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save');
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      console.error('Error saving property:', err);
      setError(err instanceof Error ? err.message : 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (!PROPERTY_ID) {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <h1 className="text-2xl font-bold text-gray-900">Property Settings</h1>
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
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Property Settings</h1>
          {settings?.name && <p className="text-sm text-gray-500">{settings.name}</p>}
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
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
            <p className="text-green-800">Settings saved successfully</p>
          </div>
        </div>
      )}

      <div className="space-y-8">
        {/* Booking Configuration */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Booking Configuration</h2>

          {/* Booking Mode */}
          <div className="mb-5">
            <label className="mb-2 block text-sm font-medium text-gray-700">Booking Mode</label>
            <div className="flex gap-3">
              {(['instant', 'inquiry', 'hybrid'] as const).map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setBookingMode(mode)}
                  className={`flex-1 rounded-lg border-2 px-4 py-3 text-left transition-colors ${
                    bookingMode === mode
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="font-semibold capitalize text-gray-900">{mode}</div>
                  <div className="text-xs text-gray-500">
                    {mode === 'instant' && 'Guests book immediately'}
                    {mode === 'inquiry' && 'Owner approves each request'}
                    {mode === 'hybrid' && 'Instant for regulars, inquiry for new'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Check-in / Check-out Times */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Check-in Time</label>
              <input
                type="time"
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Check-out Time</label>
              <input
                type="time"
                value={checkOutTime}
                onChange={(e) => setCheckOutTime(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Financial */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Financial</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Deposit Percent
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={depositPercent}
                  onChange={(e) => setDepositPercent(parseInt(e.target.value) || 1)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-8 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">1-100% of total price required upfront</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Cancellation Penalty
              </label>
              <div className="relative">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={cancellationPenalty}
                  onChange={(e) => setCancellationPenalty(parseInt(e.target.value) || 0)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-8 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">%</span>
              </div>
              <p className="mt-1 text-xs text-gray-500">0-100% of deposit kept on cancellation</p>
            </div>
          </div>
        </section>

        {/* Policies */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Policies</h2>

          <div className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">House Rules</label>
              <textarea
                value={houseRulesText}
                onChange={(e) => setHouseRulesText(e.target.value)}
                placeholder="One rule per line, e.g.&#10;No smoking indoors&#10;Quiet hours: 22:00-08:00&#10;No pets"
                rows={4}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">Enter one rule per line</p>
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Cancellation Policy
              </label>
              <textarea
                value={cancellationPolicy}
                onChange={(e) => setCancellationPolicy(e.target.value)}
                placeholder="e.g. Free cancellation up to 48 hours before check-in. After that, the deposit is non-refundable."
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Contact Information</h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Host Phone</label>
              <input
                type="tel"
                value={hostPhone}
                onChange={(e) => setHostPhone(e.target.value)}
                placeholder="+66 812345678"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                WhatsApp Number
              </label>
              <input
                type="tel"
                value={hostWhatsapp}
                onChange={(e) => setHostWhatsapp(e.target.value)}
                placeholder="+66 812345678"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Host Email</label>
              <input
                type="email"
                value={hostEmail}
                onChange={(e) => setHostEmail(e.target.value)}
                placeholder="owner@property.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Contact Email</label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="bookings@property.com"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">Shown to guests for booking inquiries</p>
            </div>
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
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <FloppyDisk className="h-4 w-4" weight="duotone" />
          )}
          Save Settings
        </button>
      </div>
    </div>
  );
}
