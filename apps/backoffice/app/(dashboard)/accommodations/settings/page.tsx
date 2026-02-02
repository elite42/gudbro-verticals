'use client';

import { useState, useEffect } from 'react';
import {
  Check,
  FloppyDisk,
  WifiHigh,
  ArrowUp,
  ArrowDown,
  Trash,
  Eye,
  EyeSlash,
  Plus,
} from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';
import StructuredPolicies from '@/components/accommodations/StructuredPolicies';
import PropertyDataForm from '@/components/accommodations/PropertyDataForm';

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
  wifi_zones: WifiZone[] | null;
  social_links: SocialLinks | null;
  google_maps_url: string | null;
  communication_methods: string[] | null;
  operating_hours: OperatingHours | null;
  staff_languages: string[] | null;
  receipt_enabled: boolean;
  receipt_auto_confirm_hours: number;
}

interface SocialLinks {
  instagram?: string;
  facebook?: string;
  tiktok?: string;
  website?: string;
}

interface OperatingHours {
  reception?: { open: string; close: string };
  restaurant?: { open: string; close: string };
}

interface WifiZone {
  zone_id: string;
  label: string;
  zone_type: string;
  icon: string;
  ssid: string;
  password: string;
  sort_order: number;
}

const ZONE_TYPE_OPTIONS = [
  { value: 'room', label: 'Room', icon: 'Bed' },
  { value: 'restaurant', label: 'Restaurant', icon: 'ForkKnife' },
  { value: 'pool', label: 'Pool', icon: 'SwimmingPool' },
  { value: 'lobby', label: 'Lobby', icon: 'Buildings' },
  { value: 'garden', label: 'Garden', icon: 'Tree' },
  { value: 'rooftop', label: 'Rooftop', icon: 'CloudSun' },
  { value: 'coworking', label: 'Coworking', icon: 'Laptop' },
  { value: 'custom', label: 'Other', icon: 'WifiHigh' },
] as const;

function getIconForZoneType(zoneType: string): string {
  const match = ZONE_TYPE_OPTIONS.find((o) => o.value === zoneType);
  return match ? match.icon : 'WifiHigh';
}

function getLabelForZoneType(zoneType: string): string {
  const match = ZONE_TYPE_OPTIONS.find((o) => o.value === zoneType);
  return match ? match.label : 'Other';
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
  const [houseRules, setHouseRules] = useState<string[]>([]);
  const [cancellationPolicy, setCancellationPolicy] = useState('');
  const [hostPhone, setHostPhone] = useState('');
  const [hostWhatsapp, setHostWhatsapp] = useState('');
  const [hostEmail, setHostEmail] = useState('');
  const [contactEmail, setContactEmail] = useState('');

  // Property data state
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [communicationMethods, setCommunicationMethods] = useState<string[]>([]);
  const [operatingHours, setOperatingHours] = useState<OperatingHours>({});
  const [staffLanguages, setStaffLanguages] = useState<string[]>([]);

  // Receipt confirmation state
  const [receiptEnabled, setReceiptEnabled] = useState(false);
  const [receiptAutoConfirmHours, setReceiptAutoConfirmHours] = useState(24);

  // WiFi Zones state
  const [wifiZones, setWifiZones] = useState<WifiZone[]>([]);
  const [wifiZoneErrors, setWifiZoneErrors] = useState<Record<string, string>>({});
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});

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
          setHouseRules(Array.isArray(p.house_rules) ? p.house_rules : []);
          setCancellationPolicy(p.cancellation_policy || '');
          setHostPhone(p.host_phone || '');
          setHostWhatsapp(p.host_whatsapp || '');
          setHostEmail(p.host_email || '');
          setContactEmail(p.contact_email || '');
          setReceiptEnabled(p.receipt_enabled || false);
          setReceiptAutoConfirmHours(p.receipt_auto_confirm_hours ?? 24);
          setWifiZones(Array.isArray(p.wifi_zones) ? p.wifi_zones : []);
          setSocialLinks(p.social_links || {});
          setGoogleMapsUrl(p.google_maps_url || '');
          setCommunicationMethods(
            Array.isArray(p.communication_methods) ? p.communication_methods : []
          );
          setOperatingHours(p.operating_hours || {});
          setStaffLanguages(Array.isArray(p.staff_languages) ? p.staff_languages : []);
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

  // WiFi Zone handlers
  const addWifiZone = () => {
    if (wifiZones.length >= 8) return;
    const newZone: WifiZone = {
      zone_id: crypto.randomUUID(),
      label: '',
      zone_type: 'custom',
      icon: 'WifiHigh',
      ssid: '',
      password: '',
      sort_order: wifiZones.length,
    };
    setWifiZones([...wifiZones, newZone]);
  };

  const removeWifiZone = (zoneId: string) => {
    const updated = wifiZones
      .filter((z) => z.zone_id !== zoneId)
      .map((z, i) => ({ ...z, sort_order: i }));
    setWifiZones(updated);
    // Clear errors for removed zone
    const newErrors = { ...wifiZoneErrors };
    delete newErrors[zoneId];
    setWifiZoneErrors(newErrors);
  };

  const updateWifiZone = (zoneId: string, field: keyof WifiZone, value: string) => {
    setWifiZones(
      wifiZones.map((z) => {
        if (z.zone_id !== zoneId) return z;
        if (field === 'zone_type') {
          const icon = getIconForZoneType(value);
          const label = z.label || getLabelForZoneType(value);
          return { ...z, zone_type: value, icon, label };
        }
        return { ...z, [field]: value };
      })
    );
    // Clear error on edit
    if (field === 'ssid' && value.trim()) {
      const newErrors = { ...wifiZoneErrors };
      delete newErrors[zoneId];
      setWifiZoneErrors(newErrors);
    }
  };

  const moveWifiZone = (zoneId: string, direction: 'up' | 'down') => {
    const idx = wifiZones.findIndex((z) => z.zone_id === zoneId);
    if (idx < 0) return;
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === wifiZones.length - 1) return;

    const swapIdx = direction === 'up' ? idx - 1 : idx + 1;
    const updated = [...wifiZones];
    [updated[idx], updated[swapIdx]] = [updated[swapIdx], updated[idx]];
    setWifiZones(updated.map((z, i) => ({ ...z, sort_order: i })));
  };

  const togglePasswordVisibility = (zoneId: string) => {
    setShowPasswords((prev) => ({ ...prev, [zoneId]: !prev[zoneId] }));
  };

  // Validate WiFi zones before save
  const validateWifiZones = (): boolean => {
    const errors: Record<string, string> = {};
    for (const zone of wifiZones) {
      if (!zone.ssid.trim()) {
        errors[zone.zone_id] = 'SSID is required';
      }
    }
    setWifiZoneErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Save settings
  const handleSave = async () => {
    if (!settings) return;

    // Validate WiFi zones
    if (!validateWifiZones()) {
      setError('Please fill in all required WiFi zone fields');
      return;
    }

    setSaving(true);
    setError(null);

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
          wifi_zones: wifiZones.length > 0 ? wifiZones : null,
          social_links: Object.values(socialLinks).some((v) => v) ? socialLinks : null,
          google_maps_url: googleMapsUrl || null,
          communication_methods: communicationMethods.length > 0 ? communicationMethods : null,
          operating_hours: Object.keys(operatingHours).length > 0 ? operatingHours : null,
          staff_languages: staffLanguages.length > 0 ? staffLanguages : null,
          receipt_enabled: receiptEnabled,
          receipt_auto_confirm_hours: receiptAutoConfirmHours,
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

        {/* WiFi Zones */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <WifiHigh className="h-5 w-5 text-blue-600" weight="duotone" />
              <h2 className="text-lg font-semibold text-gray-900">WiFi Zones</h2>
            </div>
            <span className="text-xs text-gray-400">{wifiZones.length}/8 zones</span>
          </div>

          <p className="mb-4 text-sm text-gray-500">
            Configure WiFi networks for different areas of your property. Guests will see the
            relevant network based on their location.
          </p>

          {wifiZones.length === 0 && (
            <div className="mb-4 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center">
              <WifiHigh className="mx-auto h-8 w-8 text-gray-300" weight="duotone" />
              <p className="mt-2 text-sm text-gray-500">No WiFi zones configured yet</p>
              <p className="text-xs text-gray-400">Add zones so guests can connect easily</p>
            </div>
          )}

          <div className="space-y-4">
            {wifiZones.map((zone, idx) => (
              <div
                key={zone.zone_id}
                className={`rounded-lg border p-4 ${
                  wifiZoneErrors[zone.zone_id] ? 'border-red-300 bg-red-50/50' : 'border-gray-200'
                }`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-xs font-medium text-gray-400">Zone {idx + 1}</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveWifiZone(zone.zone_id, 'up')}
                      disabled={idx === 0}
                      className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30"
                      title="Move up"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveWifiZone(zone.zone_id, 'down')}
                      disabled={idx === wifiZones.length - 1}
                      className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 disabled:opacity-30"
                      title="Move down"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeWifiZone(zone.zone_id)}
                      className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-500"
                      title="Remove zone"
                    >
                      <Trash className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {/* Zone Type */}
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                      Zone Type
                    </label>
                    <select
                      value={zone.zone_type}
                      onChange={(e) => updateWifiZone(zone.zone_id, 'zone_type', e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    >
                      {ZONE_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Label */}
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Label</label>
                    <input
                      type="text"
                      value={zone.label}
                      onChange={(e) => updateWifiZone(zone.zone_id, 'label', e.target.value)}
                      placeholder={getLabelForZoneType(zone.zone_type)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* SSID */}
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">
                      SSID (Network Name) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={zone.ssid}
                      onChange={(e) => updateWifiZone(zone.zone_id, 'ssid', e.target.value)}
                      placeholder="e.g. MyProperty-Guest"
                      className={`w-full rounded-lg border px-3 py-2 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 ${
                        wifiZoneErrors[zone.zone_id] ? 'border-red-400' : 'border-gray-300'
                      }`}
                    />
                    {wifiZoneErrors[zone.zone_id] && (
                      <p className="mt-1 text-xs text-red-500">{wifiZoneErrors[zone.zone_id]}</p>
                    )}
                  </div>

                  {/* Password */}
                  <div>
                    <label className="mb-1 block text-xs font-medium text-gray-600">Password</label>
                    <div className="relative">
                      <input
                        type={showPasswords[zone.zone_id] ? 'text' : 'password'}
                        value={zone.password}
                        onChange={(e) => updateWifiZone(zone.zone_id, 'password', e.target.value)}
                        placeholder="Leave empty if open"
                        className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-9 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(zone.zone_id)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPasswords[zone.zone_id] ? (
                          <EyeSlash className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addWifiZone}
            disabled={wifiZones.length >= 8}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-300 px-4 py-3 text-sm font-medium text-gray-500 transition-colors hover:border-blue-400 hover:text-blue-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
            Add WiFi Zone
          </button>
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

        {/* Receipt Confirmation (SVC-08) */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Guest Receipts</h2>
          <p className="mb-4 text-sm text-gray-500">
            When enabled, guests can review and confirm itemized receipts for delivered orders.
            Receipts auto-confirm after the timeout period.
          </p>

          {/* Toggle */}
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900">Enable receipt confirmation</p>
              <p className="text-sm text-gray-500">
                Guests will see a &quot;Confirm Receipt&quot; button after delivery
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={receiptEnabled}
              onClick={() => setReceiptEnabled(!receiptEnabled)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                receiptEnabled ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  receiptEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Auto-confirm timeout (only visible when enabled) */}
          {receiptEnabled && (
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Auto-confirm after (hours)
              </label>
              <input
                type="number"
                min={1}
                max={168}
                value={receiptAutoConfirmHours}
                onChange={(e) => setReceiptAutoConfirmHours(parseInt(e.target.value) || 24)}
                className="w-32 rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                If the guest doesn&apos;t confirm, the receipt auto-confirms after this period
                (1-168 hours)
              </p>
            </div>
          )}
        </section>

        {/* Policies */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Policies</h2>

          <StructuredPolicies
            houseRules={houseRules}
            cancellationPolicy={cancellationPolicy}
            onChange={(data) => {
              setHouseRules(data.houseRules);
              setCancellationPolicy(data.cancellationPolicy);
            }}
          />
        </section>

        {/* Property Information */}
        <section className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">Property Information</h2>
          <p className="mb-4 text-sm text-gray-500">
            Social links, location, communication preferences, hours, and languages.
          </p>

          <PropertyDataForm
            socialLinks={socialLinks}
            googleMapsUrl={googleMapsUrl}
            communicationMethods={communicationMethods}
            operatingHours={operatingHours}
            staffLanguages={staffLanguages}
            onChange={(data) => {
              setSocialLinks(data.socialLinks);
              setGoogleMapsUrl(data.googleMapsUrl);
              setCommunicationMethods(data.communicationMethods);
              setOperatingHours(data.operatingHours);
              setStaffLanguages(data.staffLanguages);
            }}
          />
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
