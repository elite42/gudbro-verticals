'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function BookingConfigPage() {
  const [automationLevel, setAutomationLevel] = useState('suggest');

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
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${automationLevel === 'suggest' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <input
              type="radio"
              name="automation"
              value="suggest"
              checked={automationLevel === 'suggest'}
              onChange={(e) => setAutomationLevel(e.target.value)}
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
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${automationLevel === 'auto_routine' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <input
              type="radio"
              name="automation"
              value="auto_routine"
              checked={automationLevel === 'auto_routine'}
              onChange={(e) => setAutomationLevel(e.target.value)}
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
            className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 ${automationLevel === 'full_auto' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <input
              type="radio"
              name="automation"
              value="full_auto"
              checked={automationLevel === 'full_auto'}
              onChange={(e) => setAutomationLevel(e.target.value)}
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
              <label className="text-sm font-medium text-gray-700">Revenue</label>
              <span className="text-sm text-gray-500">50%</span>
            </div>
            <input type="range" min="0" max="100" defaultValue="50" className="mt-1 w-full" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Occupancy</label>
              <span className="text-sm text-gray-500">30%</span>
            </div>
            <input type="range" min="0" max="100" defaultValue="30" className="mt-1 w-full" />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700">Partner Relationships</label>
              <span className="text-sm text-gray-500">20%</span>
            </div>
            <input type="range" min="0" max="100" defaultValue="20" className="mt-1 w-full" />
          </div>
        </div>
      </div>

      {/* Constraints */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-gray-900">Constraints</h2>
        <p className="mt-1 text-sm text-gray-500">Set limits to protect your business.</p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm font-medium text-gray-700">Minimum Margin</label>
            <div className="mt-1 flex items-center gap-2">
              <input
                type="number"
                defaultValue="20"
                className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm"
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
                defaultValue="60"
                className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              <span className="text-sm text-gray-500">%</span>
            </div>
            <p className="mt-1 text-xs text-gray-500">Reserve space for walk-ins</p>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="rounded-lg bg-red-600 px-6 py-2 text-sm font-medium text-white hover:bg-red-700">
          Save Configuration
        </button>
      </div>
    </div>
  );
}
