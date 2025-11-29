'use client';

import { useState } from 'react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  category: string;
  image: string | null;
  isAvailable: boolean;
  translations: {
    vi?: { name: string; description: string };
    ko?: { name: string; description: string };
  };
}

interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount: number;
}

const categories: Category[] = [
  { id: 'all', name: 'All Items', icon: '📋', itemCount: 24 },
  { id: 'coffee', name: 'Coffee', icon: '☕', itemCount: 8 },
  { id: 'tea', name: 'Tea', icon: '🍵', itemCount: 4 },
  { id: 'smoothies', name: 'Smoothies', icon: '🥤', itemCount: 5 },
  { id: 'food', name: 'Food', icon: '🍽️', itemCount: 4 },
  { id: 'desserts', name: 'Desserts', icon: '🍰', itemCount: 3 },
];

const menuItems: MenuItem[] = [
  {
    id: '1',
    name: 'Vietnamese Egg Coffee',
    description: 'Traditional Hanoi-style egg coffee with rich, creamy foam',
    price: 55000,
    currency: 'VND',
    category: 'coffee',
    image: null,
    isAvailable: true,
    translations: {
      vi: { name: 'Cà Phê Trứng', description: 'Cà phê trứng truyền thống Hà Nội với bọt kem béo ngậy' },
      ko: { name: '베트남 에그 커피', description: '풍부하고 크리미한 거품의 전통 하노이식 에그 커피' },
    },
  },
  {
    id: '2',
    name: 'Coconut Cold Brew',
    description: 'Cold brew coffee with fresh coconut milk',
    price: 65000,
    currency: 'VND',
    category: 'coffee',
    image: null,
    isAvailable: true,
    translations: {
      vi: { name: 'Cold Brew Dừa', description: 'Cà phê cold brew với sữa dừa tươi' },
    },
  },
  {
    id: '3',
    name: 'Matcha Latte',
    description: 'Premium Japanese matcha with oat milk',
    price: 70000,
    currency: 'VND',
    category: 'tea',
    image: null,
    isAvailable: true,
    translations: {},
  },
  {
    id: '4',
    name: 'Tropical Smoothie Bowl',
    description: 'Mango, pineapple, and banana with granola topping',
    price: 85000,
    currency: 'VND',
    category: 'smoothies',
    image: null,
    isAvailable: false,
    translations: {},
  },
];

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const formatPrice = (price: number, currency: string) => {
    if (currency === 'VND') {
      return new Intl.NumberFormat('vi-VN').format(price) + ' ₫';
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <a href="/content" className="hover:text-gray-700">Content</a>
            <span>/</span>
            <span className="text-gray-900">Menu</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Menu & Products</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            Import CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700"
          >
            + Add Item
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>{category.icon}</span>
            <span>{category.name}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-xs ${
                selectedCategory === category.id ? 'bg-blue-500' : 'bg-gray-100'
              }`}
            >
              {category.itemCount}
            </span>
          </button>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          <input
            type="text"
            placeholder="Search menu items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
          <option>All Status</option>
          <option>Available</option>
          <option>Unavailable</option>
        </select>
        <select className="px-4 py-2 border border-gray-300 rounded-lg text-sm">
          <option>Sort by Name</option>
          <option>Sort by Price</option>
          <option>Sort by Date</option>
        </select>
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-4 bg-white rounded-xl border ${
              item.isAvailable ? 'border-gray-200' : 'border-red-200 bg-red-50'
            }`}
          >
            {/* Image placeholder */}
            <div className="h-32 bg-gray-100 rounded-lg flex items-center justify-center text-4xl">
              {item.category === 'coffee' && '☕'}
              {item.category === 'tea' && '🍵'}
              {item.category === 'smoothies' && '🥤'}
              {item.category === 'food' && '🍽️'}
              {item.category === 'desserts' && '🍰'}
            </div>

            <div className="mt-4">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <span className="font-bold text-blue-600">{formatPrice(item.price, item.currency)}</span>
              </div>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.description}</p>

              {/* Translation Status */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs text-gray-500">Translations:</span>
                <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">EN</span>
                {item.translations.vi && (
                  <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">VI</span>
                )}
                {item.translations.ko && (
                  <span className="px-1.5 py-0.5 bg-green-100 text-green-700 rounded text-xs">KO</span>
                )}
                {!item.translations.vi && (
                  <span className="px-1.5 py-0.5 bg-yellow-100 text-yellow-700 rounded text-xs">VI ⚠️</span>
                )}
              </div>

              {/* Actions */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                    ✏️
                  </button>
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded">
                    📋
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded">
                    🗑️
                  </button>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.isAvailable}
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500"></div>
                </label>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Item Card */}
        <button
          onClick={() => setShowAddModal(true)}
          className="p-4 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300 hover:border-blue-400 hover:bg-blue-50 transition-colors flex flex-col items-center justify-center min-h-[280px]"
        >
          <span className="text-4xl text-gray-400">+</span>
          <span className="mt-2 text-sm font-medium text-gray-600">Add New Item</span>
        </button>
      </div>

      {/* Bulk Actions Bar */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t border-gray-200 px-6 py-4 hidden">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">3 items selected</span>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Translate Selected
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              Set Unavailable
            </button>
            <button className="px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-700 hover:bg-red-50">
              Delete Selected
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
