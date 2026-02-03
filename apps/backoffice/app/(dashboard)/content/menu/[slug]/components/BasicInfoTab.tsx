'use client';

import { ImageUpload } from '@/components/ui/image-upload';
import type { MenuItem, MultiLangText, Category } from './types';

interface BasicInfoTabProps {
  item: MenuItem;
  categories: Category[];
  updateItem: <K extends keyof MenuItem>(key: K, value: MenuItem[K]) => void;
  updateName: (lang: keyof MultiLangText, value: string) => void;
  updateDescription: (lang: keyof MultiLangText, value: string) => void;
  formatPrice: (price: number) => string;
}

export function BasicInfoTab({
  item,
  categories,
  updateItem,
  updateName,
  updateDescription,
  formatPrice,
}: BasicInfoTabProps) {
  return (
    <div className="space-y-6">
      {/* Two Column Layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Left Column - Main Info */}
        <div className="col-span-2 space-y-6">
          {/* Names */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Product Name</h3>
            <div className="space-y-4">
              {(['en', 'vi', 'it'] as const).map((lang) => (
                <div key={lang}>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {lang === 'en'
                      ? '\u{1F1EC}\u{1F1E7} English'
                      : lang === 'vi'
                        ? '\u{1F1FB}\u{1F1F3} Vietnamese'
                        : '\u{1F1EE}\u{1F1F9} Italian'}
                    {lang === 'en' && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="text"
                    value={item.name[lang] || ''}
                    onChange={(e) => updateName(lang, e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Name in ${lang.toUpperCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Descriptions */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Description</h3>
            <div className="space-y-4">
              {(['en', 'vi', 'it'] as const).map((lang) => (
                <div key={lang}>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    {lang === 'en'
                      ? '\u{1F1EC}\u{1F1E7} English'
                      : lang === 'vi'
                        ? '\u{1F1FB}\u{1F1F3} Vietnamese'
                        : '\u{1F1EE}\u{1F1F9} Italian'}
                  </label>
                  <textarea
                    value={item.description?.[lang] || ''}
                    onChange={(e) => updateDescription(lang, e.target.value)}
                    rows={3}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Description in ${lang.toUpperCase()}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Category */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Category</h3>
            <div className="grid grid-cols-3 gap-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => updateItem('categoryId', cat.id)}
                  className={`rounded-lg border p-3 text-left transition-colors ${
                    item.categoryId === cat.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <p className="mt-1 text-sm font-medium">{cat.name_multilang?.en || cat.slug}</p>
                  <p className="text-xs text-gray-500">{cat.name_multilang?.vi}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Image & Pricing */}
        <div className="space-y-6">
          {/* Image */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Image</h3>
            <ImageUpload
              value={item.imageUrl || ''}
              onChange={(url) => updateItem('imageUrl', url || undefined)}
              folder="menu-items"
              entityId={item.id || 'new'}
              maxSizeMB={5}
              aspectRatio="square"
              previewSize="lg"
              helpText="Recommended: 800x800px square image"
            />
          </div>

          {/* Pricing */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Pricing</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => updateItem('price', Number(e.target.value))}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-16 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    {item.currency}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{formatPrice(item.price)}</p>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Compare at Price
                </label>
                <input
                  type="number"
                  value={item.compareAtPrice || ''}
                  onChange={(e) =>
                    updateItem(
                      'compareAtPrice',
                      e.target.value ? Number(e.target.value) : undefined
                    )
                  }
                  placeholder="Original price for discounts"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-900">Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Total Orders</span>
                <span className="font-semibold">{item.totalOrders.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Created</span>
                <span className="text-sm">{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500">Last Updated</span>
                <span className="text-sm">{new Date(item.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
