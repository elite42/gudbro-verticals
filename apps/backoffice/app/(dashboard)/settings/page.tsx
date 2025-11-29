'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState('ROOTS Plant-Based Cafe');
  const [timezone, setTimezone] = useState('Asia/Ho_Chi_Minh');
  const [currency, setCurrency] = useState('VND');
  const [defaultLanguage, setDefaultLanguage] = useState('en');

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account and business preferences
        </p>
      </div>

      {/* Business Profile */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900">Business Profile</h3>
        <p className="text-sm text-gray-500">Update your business information</p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">
              🌱
            </div>
            <div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
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
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Business Type</label>
              <select className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tell customers about your business..."
            />
          </div>
        </div>
      </div>

      {/* Regional Settings */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900">Regional Settings</h3>
        <p className="text-sm text-gray-500">Configure your timezone, currency, and language preferences</p>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900">Branding</h3>
        <p className="text-sm text-gray-500">Customize how your QR pages look</p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Primary Color</label>
            <div className="mt-2 flex items-center gap-4">
              <input
                type="color"
                defaultValue="#000000"
                className="h-10 w-10 rounded cursor-pointer"
              />
              <input
                type="text"
                defaultValue="#000000"
                className="w-32 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Theme</label>
            <div className="mt-2 flex gap-4">
              <button className="p-4 border-2 border-blue-600 rounded-lg bg-white">
                <div className="w-16 h-10 bg-white border rounded mb-2" />
                <span className="text-sm text-gray-700">Light</span>
              </button>
              <button className="p-4 border-2 border-gray-200 rounded-lg bg-white hover:border-gray-300">
                <div className="w-16 h-10 bg-gray-900 rounded mb-2" />
                <span className="text-sm text-gray-700">Dark</span>
              </button>
              <button className="p-4 border-2 border-gray-200 rounded-lg bg-white hover:border-gray-300">
                <div className="w-16 h-10 bg-gradient-to-r from-white to-gray-900 rounded mb-2" />
                <span className="text-sm text-gray-700">Auto</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900">Notifications</h3>
        <p className="text-sm text-gray-500">Manage how you receive updates</p>

        <div className="mt-6 space-y-4">
          {[
            { id: 'email-weekly', label: 'Weekly analytics summary', description: 'Get a weekly email with your QR scan statistics' },
            { id: 'email-milestone', label: 'Milestone alerts', description: 'Get notified when you hit scan milestones' },
            { id: 'email-tips', label: 'Tips & best practices', description: 'Receive tips to improve your QR experience' },
          ].map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.label}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-xl border border-red-200 p-6">
        <h3 className="font-semibold text-red-600">Danger Zone</h3>
        <p className="text-sm text-gray-500">Irreversible actions</p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Delete all QR codes</p>
              <p className="text-sm text-gray-500">Remove all QR codes and their analytics</p>
            </div>
            <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100">
              Delete All
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Delete account</p>
              <p className="text-sm text-gray-500">Permanently delete your GUDBRO account</p>
            </div>
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex items-center justify-end gap-3">
        <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
          Cancel
        </button>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  );
}
