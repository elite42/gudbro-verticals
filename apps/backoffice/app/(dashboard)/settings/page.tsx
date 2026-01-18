'use client';

import { useState } from 'react';
import { useToast, ToastType } from '@/lib/contexts/ToastContext';
import { useAuth } from '@/lib/contexts/AuthContext';
import Link from 'next/link';

export default function SettingsPage() {
  const { hasPermission } = useAuth();
  const [businessName, setBusinessName] = useState('ROOTS Plant-Based Cafe');
  const [timezone, setTimezone] = useState('Asia/Ho_Chi_Minh');
  const [currency, setCurrency] = useState('VND');
  const [defaultLanguage, setDefaultLanguage] = useState('en');

  const { soundSettings, updateSoundSettings, testSound } = useToast();

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">General Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your business profile, branding, and notifications
        </p>
      </div>

      {/* Business Profile */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-gray-900">Business Profile</h3>
        <p className="text-sm text-gray-500">Update your business information</p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gray-100 text-3xl">
              🌱
            </div>
            <div>
              <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                Change Logo
              </button>
              <p className="mt-1 text-xs text-gray-500">JPG, PNG or SVG. Max 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Type</label>
              <select className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Restaurant / Cafe</option>
                <option>Hotel</option>
                <option>Airbnb / Rental</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              rows={3}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell customers about your business..."
            />
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-gray-900">Regional Settings</h3>
        <p className="text-sm text-gray-500">
          Configure your timezone, currency, and language preferences
        </p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Asia/Ho_Chi_Minh">Vietnam (UTC+7)</option>
              <option value="Asia/Bangkok">Thailand (UTC+7)</option>
              <option value="Asia/Singapore">Singapore (UTC+8)</option>
              <option value="Asia/Seoul">Korea (UTC+9)</option>
              <option value="Asia/Tokyo">Japan (UTC+9)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Default Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="VND">Vietnamese Dong (₫)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="KRW">Korean Won (₩)</option>
              <option value="THB">Thai Baht (฿)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Default Language</label>
            <select
              value={defaultLanguage}
              onChange={(e) => setDefaultLanguage(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="en">English</option>
              <option value="vi">Vietnamese</option>
              <option value="ko">Korean</option>
              <option value="zh">Chinese</option>
              <option value="ja">Japanese</option>
            </select>
          </div>
        </div>
      </div>

      {/* Branding */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-gray-900">Branding</h3>
        <p className="text-sm text-gray-500">Customize how your QR pages look</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Color</label>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="color"
                defaultValue="#000000"
                className="h-10 w-10 cursor-pointer rounded"
              />
              <input
                type="text"
                defaultValue="#000000"
                className="w-32 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Theme</label>
            <div className="mt-2 flex gap-4">
              <button className="rounded-lg border-2 border-blue-600 bg-white p-4">
                <div className="mb-2 h-10 w-16 rounded border bg-white" />
                <span className="text-sm text-gray-700">Light</span>
              </button>
              <button className="rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-gray-300">
                <div className="mb-2 h-10 w-16 rounded bg-gray-900" />
                <span className="text-sm text-gray-700">Dark</span>
              </button>
              <button className="rounded-lg border-2 border-gray-200 bg-white p-4 hover:border-gray-300">
                <div className="mb-2 h-10 w-16 rounded bg-gradient-to-r from-white to-gray-900" />
                <span className="text-sm text-gray-700">Auto</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="font-semibold text-gray-900">Notifications</h3>
        <p className="text-sm text-gray-500">Manage how you receive updates</p>

        <div className="mt-6 space-y-4">
          {[
            {
              id: 'email-weekly',
              label: 'Weekly analytics summary',
              description: 'Get a weekly email with your QR scan statistics',
            },
            {
              id: 'email-milestone',
              label: 'Milestone alerts',
              description: 'Get notified when you hit scan milestones',
            },
            {
              id: 'email-tips',
              label: 'Tips & best practices',
              description: 'Receive tips to improve your QR experience',
            },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input type="checkbox" defaultChecked className="peer sr-only" />
                <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Sounds */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-gray-900">Notification Sounds</h3>
            <p className="text-sm text-gray-500">Configure audio alerts for notifications</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={soundSettings.enabled}
              onChange={(e) => updateSoundSettings({ enabled: e.target.checked })}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
          </label>
        </div>

        {soundSettings.enabled && (
          <div className="mt-6 space-y-4">
            {/* Volume Slider */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Volume: {Math.round(soundSettings.volume * 100)}%
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={soundSettings.volume}
                onChange={(e) => updateSoundSettings({ volume: parseFloat(e.target.value) })}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
              />
            </div>

            {/* Sound Types */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <p className="text-sm font-medium text-gray-700">Sound per notification type</p>
              {(
                [
                  {
                    type: 'success' as ToastType,
                    label: 'Success',
                    icon: '✓',
                    color: 'text-green-600',
                  },
                  { type: 'error' as ToastType, label: 'Error', icon: '✕', color: 'text-red-600' },
                  {
                    type: 'warning' as ToastType,
                    label: 'Warning',
                    icon: '⚠',
                    color: 'text-amber-600',
                  },
                  { type: 'info' as ToastType, label: 'Info', icon: 'ℹ', color: 'text-blue-600' },
                ] as const
              ).map((item) => (
                <div key={item.type} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className={`text-lg ${item.color}`}>{item.icon}</span>
                    <span className="text-sm text-gray-900">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => testSound(item.type)}
                      className="rounded px-2 py-1 text-xs text-blue-600 hover:bg-blue-50"
                    >
                      Test
                    </button>
                    <label className="relative inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        checked={soundSettings.enabledTypes[item.type]}
                        onChange={(e) =>
                          updateSoundSettings({
                            enabledTypes: {
                              ...soundSettings.enabledTypes,
                              [item.type]: e.target.checked,
                            },
                          })
                        }
                        className="peer sr-only"
                      />
                      <div className="peer h-5 w-9 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* System Alerts - Only visible to authorized users */}
      {hasPermission('system:alerts') && (
        <div className="rounded-xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-100">
                <span className="text-2xl">🔔</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">System Alerts</h3>
                <p className="text-sm text-gray-500">
                  Monitoraggio proattivo delle metriche e alert di sistema
                </p>
              </div>
            </div>
            <Link
              href="/settings/system-alerts"
              className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-orange-700"
            >
              Gestisci Alert
            </Link>
          </div>
        </div>
      )}

      {/* Audit Log - Only visible to authorized users */}
      {hasPermission('system:alerts') && (
        <div className="rounded-xl border border-slate-200 bg-gradient-to-br from-slate-50 to-gray-50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100">
                <span className="text-2xl">📋</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Audit Log</h3>
                <p className="text-sm text-gray-500">
                  Cronologia delle azioni e modifiche nel sistema
                </p>
              </div>
            </div>
            <Link
              href="/settings/audit-log"
              className="rounded-lg bg-slate-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            >
              Visualizza Log
            </Link>
          </div>
        </div>
      )}

      {/* Danger Zone */}
      <div className="rounded-xl border border-red-200 bg-white p-6">
        <h3 className="font-semibold text-red-600">Danger Zone</h3>
        <p className="text-sm text-gray-500">Irreversible actions</p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-red-50 p-4">
            <div>
              <p className="font-medium text-gray-900">Delete all QR codes</p>
              <p className="text-sm text-gray-500">Remove all QR codes and their analytics</p>
            </div>
            <button className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100">
              Delete All
            </button>
          </div>

          <div className="flex items-center justify-between rounded-lg bg-red-50 p-4">
            <div>
              <p className="font-medium text-gray-900">Delete account</p>
              <p className="text-sm text-gray-500">Permanently delete your GUDBRO account</p>
            </div>
            <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3">
        <button className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button className="rounded-lg bg-blue-600 px-6 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}
