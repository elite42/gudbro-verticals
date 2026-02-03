'use client';

import type { MenuItem } from './types';

interface CustomizationsTabProps {
  item: MenuItem;
  formatPrice: (price: number) => string;
}

export function CustomizationsTab({ item, formatPrice }: CustomizationsTabProps) {
  return (
    <div className="space-y-6">
      {item.customizations.map((customization) => (
        <div key={customization.id} className="rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{customization.name.en}</h3>
              <p className="text-sm text-gray-500">
                {customization.type === 'radio' ? 'Single choice' : 'Multiple choice'} •{' '}
                {customization.required ? 'Required' : 'Optional'}
              </p>
            </div>
            <div className="flex gap-2">
              <button className="rounded p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                {'\u{270F}\u{FE0F}'}
              </button>
              <button className="rounded p-2 text-gray-400 hover:bg-red-50 hover:text-red-600">
                {'\u{1F5D1}\u{FE0F}'}
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {customization.options.map((option) => (
              <div
                key={option.id}
                className={`flex items-center justify-between rounded-lg p-3 ${
                  option.is_default ? 'border border-blue-200 bg-blue-50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  {option.is_default && (
                    <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
                      Default
                    </span>
                  )}
                  <span className="font-medium">{option.name.en}</span>
                  <span className="text-sm text-gray-400">{option.name.vi}</span>
                </div>
                <span className={option.price_modifier > 0 ? 'text-green-600' : 'text-gray-500'}>
                  {option.price_modifier > 0 && '+'}
                  {formatPrice(option.price_modifier)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <button className="w-full rounded-xl border-2 border-dashed border-gray-300 p-4 text-gray-500 transition-colors hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600">
        + Add Customization Group
      </button>
    </div>
  );
}
