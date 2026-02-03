'use client';

import type { MenuItem } from './types';

interface AvailabilityTabProps {
  item: MenuItem;
  updateItem: <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => void;
}

export function AvailabilityTab({ item, updateItem }: AvailabilityTabProps) {
  return (
    <div className="space-y-6">
      {/* Status */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Status</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-900">Active</p>
              <p className="text-sm text-gray-500">Show this item in the menu</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={item.isActive}
                onChange={(e) => updateItem('isActive', e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-900">Available</p>
              <p className="text-sm text-gray-500">Currently in stock and can be ordered</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={item.isAvailable}
                onChange={(e) => updateItem('isAvailable', e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-900">Featured {'\u{2B50}'}</p>
              <p className="text-sm text-gray-500">Show in featured section</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={item.isFeatured}
                onChange={(e) => updateItem('isFeatured', e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-yellow-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-gray-50 p-4">
            <div>
              <p className="font-medium text-gray-900">New Item {'\u{1F195}'}</p>
              <p className="text-sm text-gray-500">Display &quot;New&quot; badge</p>
            </div>
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={item.isNew}
                onChange={(e) => updateItem('isNew', e.target.checked)}
                className="peer sr-only"
              />
              <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Time-based Availability */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Time-based Availability</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Available From</label>
            <input
              type="time"
              value={item.availableFrom || ''}
              onChange={(e) => updateItem('availableFrom', e.target.value || undefined)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">Available To</label>
            <input
              type="time"
              value={item.availableTo || ''}
              onChange={(e) => updateItem('availableTo', e.target.value || undefined)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-500">Leave empty for all-day availability</p>
      </div>

      {/* Inventory */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Inventory</h3>
        <div className="mb-4 flex items-center justify-between rounded-lg bg-gray-50 p-4">
          <div>
            <p className="font-medium text-gray-900">Track Inventory</p>
            <p className="text-sm text-gray-500">Enable stock tracking for this item</p>
          </div>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={item.trackInventory}
              onChange={(e) => updateItem('trackInventory', e.target.checked)}
              className="peer sr-only"
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-500 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none"></div>
          </label>
        </div>
        {item.trackInventory && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Current Stock</label>
              <input
                type="number"
                value={item.inventoryCount || 0}
                onChange={(e) => updateItem('inventoryCount', Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Low Stock Alert
              </label>
              <input
                type="number"
                value={item.lowStockThreshold}
                onChange={(e) => updateItem('lowStockThreshold', Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
