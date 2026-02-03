'use client';

import type { MenuItem } from './types';

interface SeoTagsTabProps {
  item: MenuItem;
  updateItem: <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => void;
}

export function SeoTagsTab({ item, updateItem }: SeoTagsTabProps) {
  return (
    <div className="space-y-6">
      {/* Slug */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">URL Slug</h3>
        <div className="flex items-center gap-2">
          <span className="text-gray-500">/menu/</span>
          <input
            type="text"
            value={item.slug}
            onChange={(e) => updateItem('slug', e.target.value.toLowerCase().replace(/\s+/g, '-'))}
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Full URL: https://demo-cafe.gudbro.com/menu/{item.slug}
        </p>
      </div>

      {/* Tags */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Tags</h3>
        <div className="mb-4 flex flex-wrap gap-2">
          {item.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
            >
              {tag}
              <button
                onClick={() =>
                  updateItem(
                    'tags',
                    item.tags.filter((_, i) => i !== index)
                  )
                }
                className="text-gray-400 hover:text-red-500"
              >
                {'\u{00D7}'}
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add a tag..."
            className="flex-1 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                const input = e.target as HTMLInputElement;
                const tag = input.value.trim().toLowerCase();
                if (tag && !item.tags.includes(tag)) {
                  updateItem('tags', [...item.tags, tag]);
                  input.value = '';
                }
              }
            }}
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">Press Enter to add a tag</p>
      </div>

      {/* Display Order */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">Display Order</h3>
        <input
          type="number"
          value={item.displayOrder}
          onChange={(e) => updateItem('displayOrder', Number(e.target.value))}
          className="w-32 rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="mt-2 text-sm text-gray-500">Lower numbers appear first in the category</p>
      </div>
    </div>
  );
}
