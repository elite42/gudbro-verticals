'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';

/* =============================================================================
   TYPES
   ============================================================================= */

interface Product {
  id: number;
  nameEn: string;
  nameVi: string;
  nameBrand: string;
  generic: string;
  price: number;
  type: 'otc' | 'prescription';
}

interface Symptom {
  key: string;
  label: string;
  emoji: string;
}

/* =============================================================================
   MOCK DATA — Symptoms
   ============================================================================= */

const SYMPTOMS: Symptom[] = [
  { key: 'headache', label: 'Headache', emoji: '\u{1F915}' },
  { key: 'stomach', label: 'Stomach', emoji: '\u{1F922}' },
  { key: 'diarrhea', label: 'Diarrhea', emoji: '\u{1F4A7}' },
  { key: 'allergy', label: 'Allergy', emoji: '\u{1F927}' },
  { key: 'cold', label: 'Cold', emoji: '\u{1F912}' },
  { key: 'sunburn', label: 'Sunburn', emoji: '\u2600\uFE0F' },
  { key: 'insect_bite', label: 'Insect Bite', emoji: '\u{1F99F}' },
  { key: 'muscle_pain', label: 'Muscle Pain', emoji: '\u{1F4AA}' },
  { key: 'fever', label: 'Fever', emoji: '\u{1F321}\uFE0F' },
  { key: 'wound', label: 'Wound', emoji: '\u{1FA79}' },
  { key: 'motion', label: 'Motion Sick', emoji: '\u{1F697}' },
  { key: 'dehydration', label: 'Dehydrated', emoji: '\u{1F4A6}' },
];

/* =============================================================================
   MOCK DATA — Products
   ============================================================================= */

const PRODUCTS: Record<string, Product> = {
  paracetamol: {
    id: 1,
    nameEn: 'Paracetamol 500mg',
    nameVi: 'Thu\u1ED1c gi\u1EA3m \u0111au',
    nameBrand: 'Panadol',
    generic: 'Acetaminophen',
    price: 25000,
    type: 'otc',
  },
  ibuprofen: {
    id: 2,
    nameEn: 'Ibuprofen 400mg',
    nameVi: 'Thu\u1ED1c kh\u00E1ng vi\u00EAm',
    nameBrand: 'Advil',
    generic: 'Ibuprofen',
    price: 35000,
    type: 'otc',
  },
  tiger_balm: {
    id: 3,
    nameEn: 'Tiger Balm',
    nameVi: 'D\u1EA7u con h\u1ED5',
    nameBrand: 'Tiger Balm',
    generic: 'Camphor + Menthol',
    price: 40000,
    type: 'otc',
  },
  omeprazole: {
    id: 4,
    nameEn: 'Omeprazole 20mg',
    nameVi: 'Thu\u1ED1c d\u1EA1 d\u00E0y',
    nameBrand: 'Losec',
    generic: 'Omeprazole',
    price: 35000,
    type: 'otc',
  },
  ors: {
    id: 5,
    nameEn: 'ORS Electrolytes',
    nameVi: 'B\u00F9 \u0111i\u1EC7n gi\u1EA3i',
    nameBrand: 'Oresol',
    generic: 'Oral Rehydration Salts',
    price: 8000,
    type: 'otc',
  },
  loperamide: {
    id: 6,
    nameEn: 'Loperamide 2mg',
    nameVi: 'Thu\u1ED1c tr\u1ECB ti\u00EAu ch\u1EA3y',
    nameBrand: 'Imodium',
    generic: 'Loperamide HCl',
    price: 30000,
    type: 'otc',
  },
  cetirizine: {
    id: 7,
    nameEn: 'Cetirizine 10mg',
    nameVi: 'Thu\u1ED1c d\u1ECB \u1EE9ng',
    nameBrand: 'Zyrtec',
    generic: 'Cetirizine HCl',
    price: 20000,
    type: 'otc',
  },
  loratadine: {
    id: 8,
    nameEn: 'Loratadine 10mg',
    nameVi: 'Thu\u1ED1c ch\u1ED1ng d\u1ECB \u1EE9ng',
    nameBrand: 'Claritin',
    generic: 'Loratadine',
    price: 18000,
    type: 'otc',
  },
  vitamin_c: {
    id: 9,
    nameEn: 'Vitamin C 1000mg',
    nameVi: 'Vitamin C',
    nameBrand: 'Redoxon',
    generic: 'Ascorbic Acid',
    price: 55000,
    type: 'otc',
  },
  sunscreen: {
    id: 10,
    nameEn: 'Sunscreen SPF50+',
    nameVi: 'Kem ch\u1ED1ng n\u1EAFng',
    nameBrand: 'Bior\u00E9 UV',
    generic: 'UV Protection',
    price: 120000,
    type: 'otc',
  },
  aloe_vera: {
    id: 11,
    nameEn: 'Aloe Vera Gel',
    nameVi: 'Gel nha \u0111am',
    nameBrand: 'Nature Republic',
    generic: 'Aloe Barbadensis',
    price: 45000,
    type: 'otc',
  },
  antihistamine_cream: {
    id: 12,
    nameEn: 'Antihistamine Cream',
    nameVi: 'Kem ch\u1ED1ng d\u1ECB \u1EE9ng',
    nameBrand: 'Phenergan',
    generic: 'Promethazine Topical',
    price: 25000,
    type: 'otc',
  },
  deet: {
    id: 13,
    nameEn: 'DEET Repellent',
    nameVi: 'Thu\u1ED1c ch\u1ED1ng c\u00F4n tr\u00F9ng',
    nameBrand: 'OFF!',
    generic: 'N,N-Diethyl-meta-toluamide',
    price: 35000,
    type: 'otc',
  },
  diclofenac: {
    id: 14,
    nameEn: 'Diclofenac Gel',
    nameVi: 'Gel gi\u1EA3m \u0111au',
    nameBrand: 'Voltaren',
    generic: 'Diclofenac Sodium',
    price: 60000,
    type: 'otc',
  },
  betadine: {
    id: 15,
    nameEn: 'Betadine Solution',
    nameVi: 'Thu\u1ED1c s\u00E1t tr\u00F9ng',
    nameBrand: 'Betadine',
    generic: 'Povidone-Iodine 10%',
    price: 50000,
    type: 'otc',
  },
  bandages: {
    id: 16,
    nameEn: 'Adhesive Bandages',
    nameVi: 'B\u0103ng d\u00EDnh c\u00E1 nh\u00E2n',
    nameBrand: 'Band-Aid',
    generic: 'Adhesive Bandages',
    price: 15000,
    type: 'otc',
  },
  dimenhydrinate: {
    id: 17,
    nameEn: 'Dimenhydrinate 50mg',
    nameVi: 'Thu\u1ED1c ch\u1ED1ng say xe',
    nameBrand: 'Dramamine',
    generic: 'Dimenhydrinate',
    price: 15000,
    type: 'otc',
  },
  coconut_water: {
    id: 18,
    nameEn: 'Coconut Water Powder',
    nameVi: 'B\u1ED9t n\u01B0\u1EDBc d\u1EEBa',
    nameBrand: 'CocoVita',
    generic: 'Coconut Water Extract',
    price: 20000,
    type: 'otc',
  },
};

/* =============================================================================
   MOCK DATA — Symptom-to-Product Mapping
   ============================================================================= */

const SYMPTOM_MAP: Record<string, string[]> = {
  headache: ['paracetamol', 'ibuprofen', 'tiger_balm'],
  stomach: ['omeprazole', 'ors'],
  diarrhea: ['loperamide', 'ors'],
  allergy: ['cetirizine', 'loratadine'],
  cold: ['paracetamol', 'vitamin_c'],
  sunburn: ['sunscreen', 'aloe_vera'],
  insect_bite: ['antihistamine_cream', 'deet'],
  muscle_pain: ['diclofenac', 'tiger_balm', 'ibuprofen'],
  fever: ['paracetamol', 'ibuprofen'],
  wound: ['betadine', 'bandages'],
  motion: ['dimenhydrinate'],
  dehydration: ['ors', 'coconut_water'],
};

/* =============================================================================
   HELPERS
   ============================================================================= */

import { formatPriceCompact } from '@gudbro/utils';
function formatPrice(vnd: number): string {
  return formatPriceCompact(vnd, 'VND');
}

function buildWhatsAppLink(productName: string): string {
  const message = encodeURIComponent(
    `Hi MediViet! I'd like to order: ${productName}. Please confirm availability and delivery.`
  );
  return `https://wa.me/+84905456789?text=${message}`;
}

/* =============================================================================
   MAIN COMPONENT
   ============================================================================= */

export default function SymptomSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSymptom, setActiveSymptom] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter symptoms based on search query
  const filteredSymptoms = useMemo(() => {
    if (!searchQuery.trim()) return SYMPTOMS;
    const q = searchQuery.toLowerCase();
    return SYMPTOMS.filter(
      (s) => s.label.toLowerCase().includes(q) || s.key.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  // Get recommended products for active symptom
  const recommendedProducts = useMemo(() => {
    if (!activeSymptom) return [];
    const productKeys = SYMPTOM_MAP[activeSymptom] || [];
    return productKeys.map((key) => PRODUCTS[key]).filter(Boolean);
  }, [activeSymptom]);

  const activeSymptomData = SYMPTOMS.find((s) => s.key === activeSymptom);

  return (
    <div className="min-h-screen pb-24" style={{ background: 'var(--cloud)' }}>
      {/* ================================================================
          HEADER
          ================================================================ */}
      <header
        className="glass sticky top-0 z-40 border-b"
        style={{ borderColor: 'rgba(45, 159, 131, 0.12)' }}
      >
        <div className="mx-auto max-w-lg px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors"
              style={{ background: 'var(--green-light)' }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--green)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5" />
                <path d="M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <h1
                className="font-display text-[17px] font-bold leading-tight"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.02em' }}
              >
                Symptom Search
              </h1>
              <p className="text-[10px] font-medium" style={{ color: 'var(--charcoal-muted)' }}>
                Find the right medicine for how you feel
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4">
        {/* ================================================================
            SEARCH INPUT
            ================================================================ */}
        <section className={`mt-5 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
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
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.trim()) {
                  setActiveSymptom(null);
                }
              }}
              placeholder="What's bothering you?"
              className="w-full rounded-2xl border-0 py-3.5 pl-11 pr-4 text-sm transition-shadow focus:outline-none focus:ring-2"
              style={{
                background: 'white',
                color: 'var(--charcoal)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06), inset 0 0 0 1px rgba(45, 159, 131, 0.15)',
                // @ts-expect-error CSS custom property for focus ring
                '--tw-ring-color': 'var(--green)',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full transition-colors"
                style={{ background: 'var(--cloud-dark)', color: 'var(--charcoal-muted)' }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18" />
                  <path d="M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </section>

        {/* ================================================================
            SYMPTOM GRID
            ================================================================ */}
        <section className={`mt-5 ${mounted ? 'animate-fade-in-up delay-100' : 'opacity-0'}`}>
          <p
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: 'var(--charcoal-muted)' }}
          >
            Common Symptoms
          </p>

          <div className="grid grid-cols-4 gap-2.5">
            {filteredSymptoms.map((symptom) => {
              const isActive = activeSymptom === symptom.key;
              return (
                <button
                  key={symptom.key}
                  onClick={() => {
                    setActiveSymptom(isActive ? null : symptom.key);
                    setSearchQuery('');
                  }}
                  className="flex flex-col items-center justify-center gap-1.5 rounded-2xl px-1 py-3.5 transition-all"
                  style={{
                    background: isActive ? 'var(--green)' : 'white',
                    color: isActive ? 'white' : 'var(--charcoal)',
                    boxShadow: isActive
                      ? '0 4px 12px rgba(45, 159, 131, 0.35)'
                      : '0 1px 4px rgba(0,0,0,0.06)',
                    transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  }}
                >
                  <span className="text-2xl leading-none">{symptom.emoji}</span>
                  <span
                    className="text-center text-[10px] font-semibold leading-tight"
                    style={{
                      color: isActive ? 'white' : 'var(--charcoal)',
                    }}
                  >
                    {symptom.label}
                  </span>
                </button>
              );
            })}
          </div>

          {filteredSymptoms.length === 0 && searchQuery && (
            <div className="py-8 text-center">
              <p className="mb-2 text-3xl">🔍</p>
              <p className="text-sm font-medium" style={{ color: 'var(--charcoal-muted)' }}>
                No symptoms match &ldquo;{searchQuery}&rdquo;
              </p>
              <p className="mt-1 text-xs" style={{ color: 'var(--charcoal-muted)', opacity: 0.7 }}>
                Try different keywords or browse the grid above
              </p>
            </div>
          )}
        </section>

        {/* ================================================================
            RESULTS — Shown when symptom selected
            ================================================================ */}
        {activeSymptom && activeSymptomData && recommendedProducts.length > 0 && (
          <section className={`mt-6 ${mounted ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="mb-3 flex items-center gap-2">
              <span className="text-lg">{activeSymptomData.emoji}</span>
              <h2
                className="font-display text-[15px] font-bold"
                style={{ color: 'var(--charcoal)', letterSpacing: '-0.01em' }}
              >
                Recommended for {activeSymptomData.label}
              </h2>
            </div>

            <div className="space-y-3">
              {recommendedProducts.map((product) => (
                <div
                  key={product.id}
                  className="shadow-soft relative overflow-hidden rounded-2xl bg-white p-4"
                >
                  {/* Subtle green accent line */}
                  <div
                    className="absolute left-0 right-0 top-0 h-[2px]"
                    style={{
                      background:
                        'linear-gradient(90deg, var(--green) 0%, var(--green-light) 100%)',
                    }}
                  />

                  <div className="flex items-start justify-between gap-3">
                    {/* Product info */}
                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3
                          className="text-[14px] font-semibold leading-tight"
                          style={{ color: 'var(--charcoal)' }}
                        >
                          {product.nameEn}
                        </h3>
                        <span
                          className="flex-shrink-0 rounded-md px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider"
                          style={{
                            background:
                              product.type === 'otc' ? 'var(--green-light)' : 'var(--amber-light)',
                            color: product.type === 'otc' ? 'var(--green)' : 'var(--amber)',
                          }}
                        >
                          {product.type === 'otc' ? 'OTC' : 'Rx'}
                        </span>
                      </div>

                      <p className="mb-0.5 text-[11px]" style={{ color: 'var(--charcoal-muted)' }}>
                        {product.nameVi} &middot; {product.nameBrand}
                      </p>
                      <p
                        className="text-[10px] italic"
                        style={{ color: 'var(--charcoal-muted)', opacity: 0.7 }}
                      >
                        {product.generic}
                      </p>
                    </div>

                    {/* Price + Order */}
                    <div className="flex flex-shrink-0 flex-col items-end gap-2">
                      <p className="text-[15px] font-bold" style={{ color: 'var(--green-dark)' }}>
                        {formatPrice(product.price)}
                      </p>
                      <a
                        href={buildWhatsAppLink(product.nameEn)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 rounded-xl px-3 py-2 text-[11px] font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.97]"
                        style={{ background: '#25D366' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Order
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================
            DISCLAIMER BANNER — Always visible
            ================================================================ */}
        <section className={`mb-4 mt-6 ${mounted ? 'animate-fade-in-up delay-200' : 'opacity-0'}`}>
          <div
            className="flex items-start gap-3 rounded-2xl p-4"
            style={{
              background: 'var(--amber-light)',
              border: '1px solid rgba(232, 168, 56, 0.3)',
            }}
          >
            <span className="mt-0.5 flex-shrink-0 text-lg">&#9888;&#65039;</span>
            <div>
              <p className="mb-0.5 text-xs font-semibold" style={{ color: 'var(--charcoal)' }}>
                Medical Disclaimer
              </p>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--charcoal-light)' }}>
                This is for informational purposes only. Always consult a pharmacist before taking
                any medication. Dosage, interactions, and suitability may vary.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
