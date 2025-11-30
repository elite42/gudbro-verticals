'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { safetyFilters } from '@/database/safety-filters';

type Language = 'en' | 'it' | 'vi';

export default function CreateProductPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Language>('en');
  const [saving, setSaving] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: { en: '', it: '', vi: '' },
    description: { en: '', it: '', vi: '' },
    category: 'beverage',
    price: '',
    imageUrl: '',
    allergens: [] as string[],
    dietary: [] as string[],
  });

  const categories = [
    { id: 'beverage', name: 'Beverage', icon: '☕' },
    { id: 'food', name: 'Food', icon: '🍽️' },
    { id: 'dessert', name: 'Dessert', icon: '🍰' },
    { id: 'snack', name: 'Snack', icon: '🍿' },
  ];

  const languages = [
    { code: 'en' as Language, name: 'English', flag: '🇬🇧' },
    { code: 'it' as Language, name: 'Italiano', flag: '🇮🇹' },
    { code: 'vi' as Language, name: 'Tiếng Việt', flag: '🇻🇳' },
  ];

  // Get allergen and diet filters
  const allergenFilters = safetyFilters.filter(f => f.type === 'allergen');
  const dietFilters = safetyFilters.filter(f => f.type === 'diet');

  const handleToggleFilter = (filterId: string, type: 'allergens' | 'dietary') => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(filterId)
        ? prev[type].filter(id => id !== filterId)
        : [...prev[type], filterId]
    }));
  };

  const handleSave = async () => {
    setSaving(true);

    // Validation
    if (!formData.name.en || !formData.price) {
      alert('Please fill in at least English name and price');
      setSaving(false);
      return;
    }

    // Create product object
    const newProduct = {
      id: `product-${Date.now()}`,
      ...formData,
      price: parseFloat(formData.price),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // In a real app, this would save to backend/database
    // For now, we'll just show success and redirect
    console.log('Saving product:', newProduct);

    // Save to localStorage for now (temporary solution)
    const existingProducts = JSON.parse(localStorage.getItem('product-library') || '[]');
    existingProducts.push(newProduct);
    localStorage.setItem('product-library', JSON.stringify(existingProducts));

    setTimeout(() => {
      setSaving(false);
      router.push('/design-system/products');
    }, 500);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
            <p className="text-gray-600 mt-2">
              Create a new menu item with photos, descriptions, and safety information
            </p>
          </div>
          <Button
            variant="ghost"
            onClick={() => router.back()}
          >
            ← Back
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Form - 2 columns */}
        <div className="col-span-2 space-y-6">
          {/* Language Tabs */}
          <Card padding="lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Product Information</h3>

            {/* Language Selector */}
            <div className="flex gap-2 mb-6 border-b border-gray-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setActiveTab(lang.code)}
                  className={`px-4 py-2 font-medium transition-colors ${
                    activeTab === lang.code
                      ? 'text-[#cd0931] border-b-2 border-[#cd0931] -mb-px'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span className="mr-2">{lang.flag}</span>
                  {lang.name}
                </button>
              ))}
            </div>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Name ({languages.find(l => l.code === activeTab)?.name})
              </label>
              <Input
                placeholder={`Enter product name in ${languages.find(l => l.code === activeTab)?.name}`}
                value={formData.name[activeTab]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  name: { ...prev.name, [activeTab]: e.target.value }
                }))}
                inputSize="lg"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description ({languages.find(l => l.code === activeTab)?.name})
              </label>
              <textarea
                placeholder={`Enter product description in ${languages.find(l => l.code === activeTab)?.name}`}
                value={formData.description[activeTab]}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  description: { ...prev.description, [activeTab]: e.target.value }
                }))}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                Tip: Write a compelling description that highlights key features
              </p>
            </div>
          </Card>

          {/* Category & Price */}
          <Card padding="lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Category & Pricing</h3>

            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setFormData(prev => ({ ...prev, category: cat.id }))}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.category === cat.id
                          ? 'border-[#cd0931] bg-[#cd0931]/10 text-[#cd0931]'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="text-2xl mb-1">{cat.icon}</div>
                      <div className="text-sm font-medium">{cat.name}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price (VND)
                </label>
                <Input
                  type="number"
                  placeholder="35000"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                  inputSize="lg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter price in Vietnamese Dong
                </p>
              </div>
            </div>
          </Card>

          {/* Photo Upload */}
          <Card padding="lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Product Photo</h3>

            <div className="space-y-4">
              <Input
                placeholder="https://example.com/image.jpg"
                value={formData.imageUrl}
                onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                inputSize="md"
              />

              {formData.imageUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <img
                    src={formData.imageUrl}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Invalid+URL';
                    }}
                  />
                </div>
              )}

              <p className="text-xs text-gray-500">
                💡 Tip: For MVP, paste an image URL. File upload coming in Phase 2.
              </p>
            </div>
          </Card>
        </div>

        {/* Safety Filters Sidebar - 1 column */}
        <div className="space-y-6">
          {/* Dietary Filters */}
          <Card padding="lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              🌱 Dietary Compatibility
            </h3>
            <div className="space-y-2">
              {dietFilters.slice(0, 8).map((filter) => (
                <label
                  key={filter.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.dietary.includes(filter.id)}
                    onChange={() => handleToggleFilter(filter.id, 'dietary')}
                    className="w-4 h-4 text-[#f8ad16] rounded accent-[#f8ad16]"
                  />
                  <span className="text-sm">{filter.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {filter.label.en}
                  </span>
                </label>
              ))}
            </div>
          </Card>

          {/* Allergen Filters */}
          <Card padding="lg">
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              ⚠️ Contains Allergens
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {allergenFilters.slice(0, 14).map((filter) => (
                <label
                  key={filter.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.allergens.includes(filter.id)}
                    onChange={() => handleToggleFilter(filter.id, 'allergens')}
                    className="w-4 h-4 text-[#cd0931] rounded accent-[#cd0931]"
                  />
                  <span className="text-sm">{filter.icon}</span>
                  <span className="text-sm font-medium text-gray-700">
                    {filter.label.en}
                  </span>
                </label>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 sticky top-4">
            <Button
              variant="primary"
              size="lg"
              onClick={handleSave}
              disabled={saving}
              className="w-full"
            >
              {saving ? 'Saving...' : '✓ Save Product'}
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => router.back()}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
