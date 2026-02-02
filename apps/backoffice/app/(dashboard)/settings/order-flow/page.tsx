'use client';

/**
 * Order Flow Settings
 *
 * Configure how orders are split between Kitchen and Bar,
 * notification preferences, and service order.
 */

import { useState } from 'react';
import { InfoTooltip } from '@/components/ui/info-tooltip';

interface OrderFlowSettings {
  // Service mode
  serveBeveragesImmediately: boolean;
  notifyPartialReady: boolean;
  maxWaitForKitchen: number; // minutes, 0 = always wait

  // Notifications
  notifyWaiterOnNewOrder: boolean;
  notifyWaiterOnBeveragesReady: boolean;
  notifyWaiterOnFoodReady: boolean;
  notifyWaiterOnAllReady: boolean;
  notifyManagerOnDelay: boolean;
  delayThresholdMinutes: number;

  // Kitchen/Bar split
  autoSplitOrders: boolean;
  beverageCategories: string[];

  // Sound settings
  kitchenSoundEnabled: boolean;
  barSoundEnabled: boolean;
  waiterSoundEnabled: boolean;
}

const DEFAULT_SETTINGS: OrderFlowSettings = {
  serveBeveragesImmediately: false,
  notifyPartialReady: true,
  maxWaitForKitchen: 0,

  notifyWaiterOnNewOrder: true,
  notifyWaiterOnBeveragesReady: true,
  notifyWaiterOnFoodReady: true,
  notifyWaiterOnAllReady: true,
  notifyManagerOnDelay: true,
  delayThresholdMinutes: 20,

  autoSplitOrders: true,
  beverageCategories: ['coffee', 'tea', 'beverage', 'beer', 'wine', 'cocktail', 'drink'],

  kitchenSoundEnabled: true,
  barSoundEnabled: true,
  waiterSoundEnabled: true,
};

export default function OrderFlowSettingsPage() {
  const [settings, setSettings] = useState<OrderFlowSettings>(DEFAULT_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateSetting = <K extends keyof OrderFlowSettings>(
    key: K,
    value: OrderFlowSettings[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Save to database
    await new Promise((resolve) => setTimeout(resolve, 500));
    setIsSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Order Flow Settings
            </h1>
            <InfoTooltip contentKey="settings.orderFlow" kbPageId="order-flow" />
          </div>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Configure how orders are processed between Kitchen, Bar, and Waiters
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className={`rounded-lg px-4 py-2 font-medium text-white transition-colors ${
            saved
              ? 'bg-green-600'
              : isSaving
                ? 'bg-gray-400'
                : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {saved ? '✓ Saved' : isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      {/* Service Mode */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Service Mode
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Choose how beverages and food are served to customers
        </p>

        <div className="space-y-6">
          {/* Serve beverages immediately */}
          <div className="flex items-start justify-between">
            <div>
              <label className="font-medium text-gray-900 dark:text-white">
                Serve beverages immediately
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                When enabled, waiters will serve drinks as soon as they&apos;re ready,
                without waiting for food
              </p>
            </div>
            <button
              onClick={() =>
                updateSetting('serveBeveragesImmediately', !settings.serveBeveragesImmediately)
              }
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.serveBeveragesImmediately ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.serveBeveragesImmediately ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {/* Max wait for kitchen */}
          {settings.serveBeveragesImmediately && (
            <div className="ml-4 border-l-2 border-blue-200 pl-4 dark:border-blue-800">
              <label className="block font-medium text-gray-900 dark:text-white">
                Max wait for kitchen (minutes)
              </label>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                If kitchen takes longer than this, serve beverages anyway. Set to 0 to always serve immediately.
              </p>
              <input
                type="number"
                min="0"
                max="60"
                value={settings.maxWaitForKitchen}
                onChange={(e) => updateSetting('maxWaitForKitchen', parseInt(e.target.value) || 0)}
                className="w-24 rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
          )}
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Waiter Notifications
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Configure when waiters receive notifications about orders
        </p>

        <div className="space-y-4">
          {[
            {
              key: 'notifyWaiterOnNewOrder' as const,
              label: 'New order placed',
              description: 'When a customer submits a new order',
            },
            {
              key: 'notifyWaiterOnBeveragesReady' as const,
              label: 'Beverages ready',
              description: 'When bar marks drinks as ready',
            },
            {
              key: 'notifyWaiterOnFoodReady' as const,
              label: 'Food ready',
              description: 'When kitchen marks food as ready',
            },
            {
              key: 'notifyWaiterOnAllReady' as const,
              label: 'Complete order ready',
              description: 'When all items in an order are ready',
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between">
              <div>
                <label className="font-medium text-gray-900 dark:text-white">{item.label}</label>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
              <button
                onClick={() => updateSetting(item.key, !settings[item.key])}
                className={`relative h-6 w-11 rounded-full transition-colors ${
                  settings[item.key] ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <span
                  className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                    settings[item.key] ? 'translate-x-5' : ''
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Manager Alerts */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Manager Alerts
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Alert managers when orders are taking too long
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900 dark:text-white">
                Alert on delayed orders
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Notify manager when an order exceeds the threshold
              </p>
            </div>
            <button
              onClick={() => updateSetting('notifyManagerOnDelay', !settings.notifyManagerOnDelay)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.notifyManagerOnDelay ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.notifyManagerOnDelay ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {settings.notifyManagerOnDelay && (
            <div className="ml-4 border-l-2 border-orange-200 pl-4 dark:border-orange-800">
              <label className="block font-medium text-gray-900 dark:text-white">
                Delay threshold (minutes)
              </label>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                Alert when order preparation exceeds this time
              </p>
              <input
                type="number"
                min="5"
                max="60"
                value={settings.delayThresholdMinutes}
                onChange={(e) =>
                  updateSetting('delayThresholdMinutes', parseInt(e.target.value) || 20)
                }
                className="w-24 rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
              />
            </div>
          )}
        </div>
      </section>

      {/* Kitchen/Bar Split */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Kitchen / Bar Split
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Configure how orders are automatically split between stations
        </p>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-gray-900 dark:text-white">
                Auto-split orders
              </label>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Automatically route beverages to Bar and food to Kitchen
              </p>
            </div>
            <button
              onClick={() => updateSetting('autoSplitOrders', !settings.autoSplitOrders)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                settings.autoSplitOrders ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
              }`}
            >
              <span
                className={`absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white transition-transform ${
                  settings.autoSplitOrders ? 'translate-x-5' : ''
                }`}
              />
            </button>
          </div>

          {settings.autoSplitOrders && (
            <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-700/50">
              <label className="mb-2 block font-medium text-gray-900 dark:text-white">
                Beverage categories
              </label>
              <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
                Items in these categories will be routed to the Bar
              </p>
              <div className="flex flex-wrap gap-2">
                {settings.beverageCategories.map((cat) => (
                  <span
                    key={cat}
                    className="inline-flex items-center gap-1 rounded-full bg-purple-100 px-3 py-1 text-sm text-purple-800 dark:bg-purple-900/50 dark:text-purple-200"
                  >
                    {cat}
                    <button
                      onClick={() =>
                        updateSetting(
                          'beverageCategories',
                          settings.beverageCategories.filter((c) => c !== cat)
                        )
                      }
                      className="ml-1 hover:text-purple-600"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <input
                type="text"
                placeholder="Add category and press Enter"
                className="mt-3 w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    const value = (e.target as HTMLInputElement).value.trim().toLowerCase();
                    if (value && !settings.beverageCategories.includes(value)) {
                      updateSetting('beverageCategories', [...settings.beverageCategories, value]);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
            </div>
          )}
        </div>
      </section>

      {/* Sound Settings */}
      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          Sound Alerts
        </h2>
        <p className="mb-6 text-sm text-gray-500 dark:text-gray-400">
          Enable or disable sound alerts for each station
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { key: 'kitchenSoundEnabled' as const, label: 'Kitchen Display', icon: '🍳' },
            { key: 'barSoundEnabled' as const, label: 'Bar Display', icon: '🍹' },
            { key: 'waiterSoundEnabled' as const, label: 'Waiter PWA', icon: '👔' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => updateSetting(item.key, !settings[item.key])}
              className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-colors ${
                settings[item.key]
                  ? 'border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-900/20'
                  : 'border-gray-200 hover:border-gray-300 dark:border-gray-700 dark:hover:border-gray-600'
              }`}
            >
              <span className="text-3xl">{item.icon}</span>
              <span
                className={`font-medium ${
                  settings[item.key]
                    ? 'text-blue-700 dark:text-blue-300'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {item.label}
              </span>
              <span
                className={`text-sm ${
                  settings[item.key]
                    ? 'text-blue-600 dark:text-blue-400'
                    : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {settings[item.key] ? '🔊 Sound ON' : '🔇 Sound OFF'}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Info Box */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 dark:border-blue-800 dark:bg-blue-900/20">
        <h3 className="font-medium text-blue-800 dark:text-blue-200">How it works</h3>
        <ul className="mt-2 space-y-1 text-sm text-blue-700 dark:text-blue-300">
          <li>• Orders with mixed items are automatically split between Kitchen and Bar</li>
          <li>• Each station only sees items relevant to them</li>
          <li>• Waiters receive notifications based on your preferences above</li>
          <li>• The waiter&apos;s table view shows aggregated status from all stations</li>
        </ul>
      </div>
    </div>
  );
}
