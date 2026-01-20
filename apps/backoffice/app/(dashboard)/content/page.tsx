'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { InfoTooltip } from '@/components/ui/info-tooltip';

type ContentType = 'menu' | 'services' | 'wifi' | 'attractions' | 'contacts';

export default function ContentPage() {
  const t = useTranslations('content');
  const [searchQuery, setSearchQuery] = useState('');

  const contentTypes = [
    {
      id: 'menu' as ContentType,
      icon: '🍽️',
      title: t('menuProducts'),
      description: t('menuProductsDesc'),
      count: 81,
      link: '/content/menu',
    },
    {
      id: 'wines' as ContentType,
      icon: '🍷',
      title: t('wines'),
      description: t('winesDesc'),
      count: 144,
      link: '/content/wines',
    },
    {
      id: 'recipes' as ContentType,
      icon: '📖',
      title: t('recipes'),
      description: t('recipesDesc'),
      count: 22,
      link: '/content/recipes',
    },
    {
      id: 'ingredients' as ContentType,
      icon: '🥕',
      title: t('ingredients'),
      description: t('ingredientsDesc'),
      count: 7,
      link: '/content/ingredients',
    },
    {
      id: 'categories' as ContentType,
      icon: '📂',
      title: t('categories'),
      description: t('categoriesDesc'),
      count: 4,
      link: '/content/categories',
    },
    {
      id: 'services' as ContentType,
      icon: '🛎️',
      title: t('services'),
      description: t('servicesDesc'),
      count: 8,
      link: '/content/services',
    },
    {
      id: 'wifi' as ContentType,
      icon: '📶',
      title: t('wifiSettings'),
      description: t('wifiSettingsDesc'),
      count: 3,
      link: '/content/wifi',
    },
    {
      id: 'attractions' as ContentType,
      icon: '🗺️',
      title: t('localAttractions'),
      description: t('localAttractionsDesc'),
      count: 12,
      link: '/content/attractions',
    },
    {
      id: 'contacts' as ContentType,
      icon: '📞',
      title: t('contacts'),
      description: t('contactsDesc'),
      count: 5,
      link: '/content/contacts',
    },
  ];

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
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <InfoTooltip contentKey="nav.content" kbPageId="content-overview" />
          </div>
          <p className="mt-1 text-sm text-gray-500">{t('description')}</p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          + {t('addContent')}
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          placeholder={t('searchPlaceholder')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredContent.map((type) => (
          <Link
            key={type.id}
            href={type.link}
            className="block rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <span className="text-3xl">{type.icon}</span>
              <span className="rounded bg-gray-100 px-2 py-1 text-sm text-gray-600">
                {type.count} {t('items')}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">{type.title}</h3>
            <p className="mt-1 text-sm text-gray-500">{type.description}</p>
          </Link>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <div className="rounded-lg bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-600">{t('totalItems')}</p>
          <p className="text-2xl font-bold text-blue-900">52</p>
        </div>
        <div className="rounded-lg bg-green-50 p-4">
          <p className="text-sm font-medium text-green-600">{t('published')}</p>
          <p className="text-2xl font-bold text-green-900">48</p>
        </div>
        <div className="rounded-lg bg-yellow-50 p-4">
          <p className="text-sm font-medium text-yellow-600">{t('drafts')}</p>
          <p className="text-2xl font-bold text-yellow-900">4</p>
        </div>
        <div className="rounded-lg bg-purple-50 p-4">
          <p className="text-sm font-medium text-purple-600">{t('languages')}</p>
          <p className="text-2xl font-bold text-purple-900">3</p>
        </div>
      </div>
    </div>
  );
}
