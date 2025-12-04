'use client';

import { useState } from 'react';
import Link from 'next/link';

type ContentType = 'menu' | 'services' | 'wifi' | 'attractions' | 'contacts';

const contentTypes = [
  {
    id: 'menu' as ContentType,
    icon: '🍽️',
    title: 'Menu & Products',
    description: 'Manage your menu items, categories, and prices',
    count: 81,
    link: '/content/menu',
  },
  {
    id: 'recipes' as ContentType,
    icon: '📖',
    title: 'Recipes',
    description: 'Professional barista recipes with methods and tips',
    count: 22,
    link: '/content/recipes',
  },
  {
    id: 'ingredients' as ContentType,
    icon: '🥕',
    title: 'Ingredients',
    description: 'Master ingredient database with allergens and nutrition',
    count: 7,
    link: '/content/ingredients',
  },
  {
    id: 'categories' as ContentType,
    icon: '📂',
    title: 'Categories',
    description: 'Organize your menu with categories',
    count: 4,
    link: '/content/categories',
  },
  {
    id: 'services' as ContentType,
    icon: '🛎️',
    title: 'Services',
    description: 'Room service, laundry, spa, and other offerings',
    count: 8,
    link: '/content/services',
  },
  {
    id: 'wifi' as ContentType,
    icon: '📶',
    title: 'WiFi Settings',
    description: 'Network credentials and connection instructions',
    count: 3,
    link: '/content/wifi',
  },
  {
    id: 'attractions' as ContentType,
    icon: '🗺️',
    title: 'Local Attractions',
    description: 'Nearby places, tours, and recommendations',
    count: 12,
    link: '/content/attractions',
  },
  {
    id: 'contacts' as ContentType,
    icon: '📞',
    title: 'Contacts',
    description: 'Business contacts and emergency numbers',
    count: 5,
    link: '/content/contacts',
  },
];

export default function ContentPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContent = contentTypes.filter(
    (type) =>
      type.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      type.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all your business content in one place
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">
          + Add Content
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder="Search content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredContent.map((type) => (
          <Link
            key={type.id}
            href={type.link}
            className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{type.icon}</span>
              <span className="px-2 py-1 bg-gray-100 rounded text-sm text-gray-600">
                {type.count} items
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{type.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{type.description}</p>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-600 font-medium">Total Items</p>
          <p className="text-2xl font-bold text-blue-900">52</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <p className="text-sm text-green-600 font-medium">Published</p>
          <p className="text-2xl font-bold text-green-900">48</p>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <p className="text-sm text-yellow-600 font-medium">Drafts</p>
          <p className="text-2xl font-bold text-yellow-900">4</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-purple-600 font-medium">Languages</p>
          <p className="text-2xl font-bold text-purple-900">3</p>
        </div>
      </div>
    </div>
  );
}
