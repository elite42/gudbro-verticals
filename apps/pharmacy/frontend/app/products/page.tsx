'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

/* =============================================================================
   MOCK DATA
   ============================================================================= */

const CATEGORIES = [
  { key: 'all', label: 'All' },
  { key: 'pain_relief', label: 'Pain Relief' },
  { key: 'stomach', label: 'Stomach' },
  { key: 'allergy', label: 'Allergy' },
  { key: 'cold_flu', label: 'Cold & Flu' },
  { key: 'skincare', label: 'Skincare' },
  { key: 'first_aid', label: 'First Aid' },
  { key: 'vitamins', label: 'Vitamins' },
  { key: 'insect', label: 'Insect Protection' },
];

const TYPE_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'otc', label: 'OTC Only' },
  { key: 'prescription', label: 'Prescription' },
];

interface Product {
  id: number;
  nameEn: string;
  nameBrand: string;
  nameVi: string;
  generic: string;
  price: number;
  type: 'otc' | 'prescription' | 'controlled';
  category: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    nameEn: 'Paracetamol 500mg',
    nameBrand: 'Panadol',
    nameVi: 'Thuoc giam dau',
    generic: 'Acetaminophen',
    price: 25000,
    type: 'otc',
    category: 'pain_relief',
  },
  {
    id: 2,
    nameEn: 'Ibuprofen 400mg',
    nameBrand: 'Advil',
    nameVi: 'Thuoc khang viem',
    generic: 'Ibuprofen',
    price: 35000,
    type: 'otc',
    category: 'pain_relief',
  },
  {
    id: 3,
    nameEn: 'Loperamide 2mg',
    nameBrand: 'Imodium',
    nameVi: 'Thuoc tri tieu chay',
    generic: 'Loperamide',
    price: 30000,
    type: 'otc',
    category: 'stomach',
  },
  {
    id: 4,
    nameEn: 'ORS Electrolytes',
    nameBrand: 'Oresol',
    nameVi: 'Bu dien giai',
    generic: 'Oral Rehydration Salts',
    price: 8000,
    type: 'otc',
    category: 'stomach',
  },
  {
    id: 5,
    nameEn: 'Cetirizine 10mg',
    nameBrand: 'Zyrtec',
    nameVi: 'Thuoc di ung',
    generic: 'Cetirizine HCl',
    price: 20000,
    type: 'otc',
    category: 'allergy',
  },
  {
    id: 6,
    nameEn: 'Amoxicillin 500mg',
    nameBrand: 'Amoxil',
    nameVi: 'Khang sinh',
    generic: 'Amoxicillin',
    price: 45000,
    type: 'prescription',
    category: 'antibiotics',
  },
  {
    id: 7,
    nameEn: 'Sunscreen SPF50+',
    nameBrand: 'Biore UV',
    nameVi: 'Kem chong nang',
    generic: 'UV Protection',
    price: 120000,
    type: 'otc',
    category: 'skincare',
  },
  {
    id: 8,
    nameEn: 'Tiger Balm',
    nameBrand: 'Tiger Balm',
    nameVi: 'Dau con ho',
    generic: 'Camphor + Menthol',
    price: 40000,
    type: 'otc',
    category: 'pain_relief',
  },
  {
    id: 9,
    nameEn: 'Omeprazole 20mg',
    nameBrand: 'Losec',
    nameVi: 'Thuoc da day',
    generic: 'Omeprazole',
    price: 35000,
    type: 'otc',
    category: 'stomach',
  },
  {
    id: 10,
    nameEn: 'Loratadine 10mg',
    nameBrand: 'Claritin',
    nameVi: 'Thuoc di ung',
    generic: 'Loratadine',
    price: 18000,
    type: 'otc',
    category: 'allergy',
  },
  {
    id: 11,
    nameEn: 'Azithromycin 250mg',
    nameBrand: 'Zithromax',
    nameVi: 'Khang sinh',
    generic: 'Azithromycin',
    price: 65000,
    type: 'prescription',
    category: 'antibiotics',
  },
  {
    id: 12,
    nameEn: 'Betadine Solution',
    nameBrand: 'Betadine',
    nameVi: 'Thuoc sat trung',
    generic: 'Povidone-Iodine',
    price: 50000,
    type: 'otc',
    category: 'first_aid',
  },
  {
    id: 13,
    nameEn: 'Vitamin C 1000mg',
    nameBrand: 'Redoxon',
    nameVi: 'Vitamin C',
    generic: 'Ascorbic Acid',
    price: 55000,
    type: 'otc',
    category: 'vitamins',
  },
  {
    id: 14,
    nameEn: 'DEET Repellent',
    nameBrand: 'OFF!',
    nameVi: 'Thuoc chong muoi',
    generic: 'DEET 30%',
    price: 35000,
    type: 'otc',
    category: 'insect',
  },
  {
    id: 15,
    nameEn: 'Dimenhydrinate 50mg',
    nameBrand: 'Dramamine',
    nameVi: 'Thuoc say xe',
    generic: 'Dimenhydrinate',
    price: 15000,
    type: 'otc',
    category: 'cold_flu',
  },
  {
    id: 16,
    nameEn: 'Diclofenac Gel',
    nameBrand: 'Voltaren',
    nameVi: 'Gel giam dau',
    generic: 'Diclofenac Sodium',
    price: 60000,
    type: 'otc',
    category: 'pain_relief',
  },
];

/* =============================================================================
   HELPERS
   ============================================================================= */

function formatPrice(vnd: number): string {
  return `${Math.round(vnd / 1000)}k\u20AB`;
}

function getBadgeStyle(type: string): { background: string; color: string } {
  if (type === 'prescription') return { background: 'var(--amber)', color: 'white' };
  if (type === 'controlled') return { background: 'var(--red)', color: 'white' };
  return { background: 'var(--green)', color: 'white' };
}

function getBadgeLabel(type: string): string {
  if (type === 'prescription') return 'Rx';
  if (type === 'controlled') return 'Controlled';
  return 'OTC';
}

/* =============================================================================
   MAIN COMPONENT
   ============================================================================= */

export default function ProductsPage() {
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) return false;

      // Type filter
      if (activeType !== 'all' && product.type !== activeType) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const match =
          product.nameEn.toLowerCase().includes(q) ||
          product.nameVi.toLowerCase().includes(q) ||
          product.nameBrand.toLowerCase().includes(q) ||
          product.generic.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    });
  }, [searchQuery, activeCategory, activeType]);

  return (
    <div
      className="min-h-screen pb-24"
      style={{ background: 'var(--cloud)' }}
    >
      <main className="max-w-lg mx-auto px-4">

        {/* ================================================================
            BACK NAVIGATION
            ================================================================ */}
        <section
          className={`pt-5 mb-4 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}
        >
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors"
              style={{ background: 'var(--green-light)' }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--green-dark)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
            </Link>
            <h1
              className="font-display text-xl font-bold"
              style={{ color: 'var(--charcoal)', letterSpacing: '-0.02em' }}
            >
              Products
            </h1>
          </div>
        </section>

        {/* ================================================================
            SEARCH BAR
            ================================================================ */}
        <section
          className={`mb-4 ${mounted ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}
        >
          <div className="relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--charcoal-muted)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, symptom, or brand..."
              className="w-full pl-11 pr-4 py-3 rounded-xl text-sm border-0 focus:ring-2 focus:ring-[var(--green)] transition-shadow"
              style={{
                background: 'white',
                color: 'var(--charcoal)',
                boxShadow:
                  '0 1px 4px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(45, 159, 131, 0.15)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full flex items-center justify-center"
                style={{ background: 'var(--cloud-dark)' }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--charcoal-muted)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </section>

        {/* ================================================================
            CATEGORY FILTER — Horizontal scrollable pills
            ================================================================ */}
        <section
          className={`mb-3 ${mounted ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}
        >
          <div className="flex gap-2 overflow-x-auto hide-scrollbar snap-x pb-1 -mx-1 px-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className="flex-shrink-0 px-3.5 py-2 rounded-full text-xs font-semibold transition-all snap-start"
                style={{
                  background:
                    activeCategory === cat.key ? 'var(--green)' : 'white',
                  color:
                    activeCategory === cat.key ? 'white' : 'var(--charcoal)',
                  boxShadow:
                    activeCategory === cat.key
                      ? '0 2px 8px rgba(45, 159, 131, 0.35)'
                      : '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* ================================================================
            TYPE FILTER — Toggle: All / OTC Only / Prescription
            ================================================================ */}
        <section
          className={`mb-5 ${mounted ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}
        >
          <div
            className="flex rounded-xl p-1"
            style={{ background: 'var(--cloud-dark)' }}
          >
            {TYPE_FILTERS.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveType(filter.key)}
                className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all"
                style={{
                  background:
                    activeType === filter.key ? 'white' : 'transparent',
                  color:
                    activeType === filter.key
                      ? 'var(--green-dark)'
                      : 'var(--charcoal-muted)',
                  boxShadow:
                    activeType === filter.key
                      ? '0 1px 3px rgba(0,0,0,0.1)'
                      : 'none',
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </section>

        {/* ================================================================
            RESULTS COUNT
            ================================================================ */}
        <div
          className={`mb-3 ${mounted ? 'animate-fade-in-up delay-300' : 'opacity-0'}`}
        >
          <p
            className="text-xs font-medium"
            style={{ color: 'var(--charcoal-muted)' }}
          >
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* ================================================================
            PRODUCT GRID — 2 columns
            ================================================================ */}
        <section
          className={`${mounted ? 'animate-fade-in-up delay-400' : 'opacity-0'}`}
        >
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredProducts.map((product) => {
                const badge = getBadgeStyle(product.type);
                return (
                  <div
                    key={product.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-soft hover-lift"
                  >
                    {/* Image placeholder with green gradient */}
                    <div
                      className="h-28 relative flex items-center justify-center"
                      style={{
                        background:
                          'linear-gradient(135deg, var(--green-light) 0%, #d1ede4 50%, var(--cloud-dark) 100%)',
                      }}
                    >
                      {/* Pill icon placeholder */}
                      <svg
                        width="36"
                        height="36"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="var(--green)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{ opacity: 0.35 }}
                      >
                        <path d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                      </svg>

                      {/* Type badge */}
                      <span
                        className="absolute top-2 left-2 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider"
                        style={{
                          background: badge.background,
                          color: badge.color,
                        }}
                      >
                        {getBadgeLabel(product.type)}
                      </span>
                    </div>

                    {/* Details */}
                    <div className="p-3">
                      <p
                        className="text-[13px] font-semibold leading-tight mb-0.5"
                        style={{ color: 'var(--charcoal)' }}
                      >
                        {product.nameEn}
                      </p>
                      <p
                        className="text-[10px] mb-0.5"
                        style={{ color: 'var(--charcoal-muted)' }}
                      >
                        {product.nameVi}
                      </p>
                      <p
                        className="text-[10px] mb-0.5"
                        style={{ color: 'var(--charcoal-light)' }}
                      >
                        ({product.nameBrand})
                      </p>
                      <p
                        className="text-[10px] italic mb-2"
                        style={{
                          color: 'var(--charcoal-muted)',
                          opacity: 0.7,
                        }}
                      >
                        {product.generic}
                      </p>

                      {/* Price + Contact */}
                      <div className="flex items-center justify-between">
                        <p
                          className="text-sm font-bold"
                          style={{ color: 'var(--green-dark)' }}
                        >
                          {formatPrice(product.price)}
                        </p>
                        <a
                          href={`https://wa.me/+84905456789?text=${encodeURIComponent(`Hi MediViet! I'd like to order: ${product.nameEn} (${product.nameBrand})`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[10px] font-semibold text-white transition-transform hover:scale-105"
                          style={{ background: '#25D366' }}
                        >
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Contact
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* Empty state */
            <div
              className="flex flex-col items-center justify-center py-16 rounded-2xl"
              style={{ background: 'white' }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style={{ background: 'var(--green-light)' }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--green)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </div>
              <p
                className="font-display text-sm font-semibold mb-1"
                style={{ color: 'var(--charcoal)' }}
              >
                No products found
              </p>
              <p
                className="text-xs text-center max-w-[220px]"
                style={{ color: 'var(--charcoal-muted)' }}
              >
                Try adjusting your search or filters to find what you need
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('all');
                  setActiveType('all');
                }}
                className="mt-4 px-4 py-2 rounded-xl text-xs font-semibold transition-colors"
                style={{
                  background: 'var(--green-light)',
                  color: 'var(--green-dark)',
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
