'use client';

import Link from 'next/link';
import { useState } from 'react';

const productTemplates = [
  {
    id: 'gelato-tour',
    name: 'Gelato Tour Experience',
    description: 'Guided gelato making demonstration for groups',
    venueType: 'gelateria',
    category: 'experience',
    suggestedPrice: 25,
    duration: 60,
  },
  {
    id: 'wine-tasting',
    name: 'Wine Tasting Menu',
    description: 'Curated wine selection with food pairing',
    venueType: 'ristorante',
    category: 'menu',
    suggestedPrice: 45,
    duration: 90,
  },
  {
    id: 'cooking-class',
    name: 'Italian Cooking Class',
    description: 'Hands-on pasta making experience',
    venueType: 'ristorante',
    category: 'experience',
    suggestedPrice: 65,
    duration: 120,
  },
];

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState<'my-products' | 'templates'>('my-products');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/partnerships" className="hover:text-gray-700">
              Partnerships
            </Link>
            <span>/</span>
            <span>Tourism Products</span>
          </div>
          <h1 className="mt-1 text-2xl font-bold text-gray-900">Tourism Products</h1>
          <p className="mt-1 text-gray-600">
            Create special products and experiences for tour groups.
          </p>
        </div>
        <button className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
          Create Product
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex gap-6">
          <button
            onClick={() => setActiveTab('my-products')}
            className={`border-b-2 px-1 py-3 text-sm font-medium ${
              activeTab === 'my-products'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            My Products (0)
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`border-b-2 px-1 py-3 text-sm font-medium ${
              activeTab === 'templates'
                ? 'border-red-600 text-red-600'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            Templates
          </button>
        </nav>
      </div>

      {activeTab === 'my-products' ? (
        /* Empty State - My Products */
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
          </svg>
          <h3 className="mt-4 text-lg font-medium text-gray-900">No tourism products yet</h3>
          <p className="mt-2 text-sm text-gray-500">
            Create special products for tour groups or customize from templates.
          </p>
          <button
            onClick={() => setActiveTab('templates')}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Browse Templates
          </button>
        </div>
      ) : (
        /* Templates Grid */
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {productTemplates.map((template) => (
            <div
              key={template.id}
              className="rounded-xl border border-gray-200 bg-white p-5 hover:border-gray-300"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                      template.category === 'experience'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {template.category === 'experience' ? 'Experience' : 'Menu'}
                  </span>
                  <h3 className="mt-2 font-semibold text-gray-900">{template.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{template.description}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{template.suggestedPrice}€/person</span>
                </div>
                <div className="flex items-center gap-1">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span>{template.duration} min</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Preview
                </button>
                <button className="flex-1 rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700">
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tips Section */}
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
        <div className="flex gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100">
            <svg
              className="h-4 w-4 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-blue-900">Tourism Product Tips</h4>
            <p className="mt-1 text-sm text-blue-700">
              Create products specifically for tour groups with group pricing, minimum headcount,
              and pre-set menus to streamline bookings and maximize margins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
