'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState('ROOTS Plant-Based Cafe');
  const [timezone, setTimezone] = useState('Asia/Ho_Chi_Minh');
  const [currency, setCurrency] = useState('VND');
  const [defaultLanguage, setDefaultLanguage] = useState('en');

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your account and business preferences</p>
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

        {/* Language Settings Link */}
        <div className="mt-6 space-y-3 border-t border-gray-200 pt-4">
          <Link
            href="/settings/languages"
            className="flex items-center justify-between rounded-lg bg-blue-50 p-4 transition-colors hover:bg-blue-100"
          >
            <div>
              <p className="font-medium text-gray-900">Manage Languages</p>
              <p className="text-sm text-gray-600">
                Enable/disable languages for your digital menu
              </p>
            </div>
            <span className="text-xl text-blue-600">→</span>
          </Link>

          <Link
            href="/settings/currency"
            className="flex items-center justify-between rounded-lg bg-green-50 p-4 transition-colors hover:bg-green-100"
          >
            <div>
              <p className="font-medium text-gray-900">Currency & Exchange Rates</p>
              <p className="text-sm text-gray-600">
                View exchange rates for tourist price conversion
              </p>
            </div>
            <span className="text-xl text-green-600">→</span>
          </Link>

          <Link
            href="/settings/auth"
            className="flex items-center justify-between rounded-lg bg-purple-50 p-4 transition-colors hover:bg-purple-100"
          >
            <div>
              <p className="font-medium text-gray-900">Authentication Providers</p>
              <p className="text-sm text-gray-600">
                Configure Google, Apple, Facebook and other OAuth providers
              </p>
            </div>
            <span className="text-xl text-purple-600">→</span>
          </Link>

          <Link
            href="/settings/hours"
            className="flex items-center justify-between rounded-lg bg-orange-50 p-4 transition-colors hover:bg-orange-100"
          >
            <div>
              <p className="font-medium text-gray-900">Operating Hours</p>
              <p className="text-sm text-gray-600">
                Set your weekly opening hours and temporary closures
              </p>
            </div>
            <span className="text-xl text-orange-600">→</span>
          </Link>
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
