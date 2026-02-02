'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// =============================================================================
// MOCK DATA - All Laundry Services
// =============================================================================

const categories = [
  { id: 'all', label: 'All', icon: '✨' },
  { id: 'wash', label: 'Wash & Fold', icon: '🧺', color: '#4A90D9' },
  { id: 'iron', label: 'Wash & Iron', icon: '👔', color: '#38B2AC' },
  { id: 'dry_clean', label: 'Dry Clean', icon: '🧥', color: '#9F7AEA' },
  { id: 'iron_only', label: 'Iron Only', icon: '♨️', color: '#ED8936' },
  { id: 'shoes', label: 'Shoes', icon: '👟', color: '#E53E3E' },
  { id: 'express', label: 'Express', icon: '⚡', color: '#D69E2E' },
];

const services = [
  {
    id: '1', slug: 'wash-and-fold', name: 'Wash & Fold', category: 'wash',
    price: 25000, unit: 'kg', turnaround: '24h',
    description: 'Machine wash with premium detergent, tumble dry, neatly folded.',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?w=400&h=300&fit=crop',
  },
  {
    id: '2', slug: 'wash-and-iron', name: 'Wash & Iron', category: 'iron',
    price: 35000, unit: 'kg', turnaround: '24-36h',
    description: 'Full wash, dry, and professional steam ironing for everyday clothes.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop',
  },
  {
    id: '3', slug: 'shirt-wash-iron', name: 'Shirt (Wash & Iron)', category: 'iron',
    price: 20000, unit: 'item', turnaround: '24h',
    description: 'Individual shirt wash and press with crisp collar and cuff finishing.',
    image: 'https://images.unsplash.com/photo-1598032895455-1abb86a4530e?w=400&h=300&fit=crop',
  },
  {
    id: '4', slug: 'pants-wash-iron', name: 'Pants (Wash & Iron)', category: 'iron',
    price: 25000, unit: 'item', turnaround: '24h',
    description: 'Wash and press for trousers, chinos, and dress pants with sharp crease.',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=300&fit=crop',
  },
  {
    id: '5', slug: 'dress-wash-iron', name: 'Dress (Wash & Iron)', category: 'iron',
    price: 35000, unit: 'item', turnaround: '24-36h',
    description: 'Gentle wash and careful ironing for dresses and delicate garments.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=300&fit=crop',
  },
  {
    id: '6', slug: 'suit-dry-clean', name: 'Suit (2-piece)', category: 'dry_clean',
    price: 80000, unit: 'item', turnaround: '48-72h',
    description: 'Professional dry cleaning for suits with expert pressing and finishing.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73b1160fdc7?w=400&h=300&fit=crop',
  },
  {
    id: '7', slug: 'jacket-dry-clean', name: 'Jacket', category: 'dry_clean',
    price: 60000, unit: 'item', turnaround: '48-72h',
    description: 'Dry cleaning for jackets and blazers with stain treatment.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=300&fit=crop',
  },
  {
    id: '8', slug: 'dress-dry-clean', name: 'Dress (Dry Clean)', category: 'dry_clean',
    price: 50000, unit: 'item', turnaround: '48-72h',
    description: 'Specialist dry cleaning for formal dresses and evening wear.',
    image: 'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=400&h=300&fit=crop',
  },
  {
    id: '9', slug: 'iron-only', name: 'Iron Only', category: 'iron_only',
    price: 10000, unit: 'item', turnaround: '12-24h',
    description: 'Steam press service for clean garments that just need ironing.',
    image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?w=400&h=300&fit=crop',
  },
  {
    id: '10', slug: 'shoe-cleaning', name: 'Shoe Cleaning', category: 'shoes',
    price: 60000, unit: 'pair', turnaround: '24-48h',
    description: 'Professional shoe cleaning, conditioning, and polishing service.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
  },
  {
    id: '11', slug: 'sneaker-cleaning', name: 'Sneaker Deep Clean', category: 'shoes',
    price: 80000, unit: 'pair', turnaround: '48h',
    description: 'Deep cleaning for sneakers including sole whitening and deodorizing.',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop',
  },
  {
    id: '12', slug: 'bedsheet-set', name: 'Bedsheet Set', category: 'wash',
    price: 30000, unit: 'set', turnaround: '24h',
    description: 'Complete bedsheet set wash, dry and fold. Includes fitted sheet, flat sheet, pillowcases.',
    image: 'https://images.unsplash.com/photo-1629140727571-9b5c6f6267b4?w=400&h=300&fit=crop',
  },
  {
    id: '13', slug: 'express-wash-fold', name: 'Express Wash & Fold', category: 'express',
    price: 37500, unit: 'kg', turnaround: '4-8h',
    description: 'Same-day express service. Drop off in the morning, pick up by evening.',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=400&h=300&fit=crop',
  },
  {
    id: '14', slug: 'towel-wash', name: 'Towel', category: 'wash',
    price: 15000, unit: 'item', turnaround: '24h',
    description: 'Individual towel wash with fabric softener for maximum fluffiness.',
    image: 'https://images.unsplash.com/photo-1583845112239-97ef1341b271?w=400&h=300&fit=crop',
  },
  {
    id: '15', slug: 'delicate-hand-wash', name: 'Delicate Hand Wash', category: 'wash',
    price: 45000, unit: 'item', turnaround: '36-48h',
    description: 'Hand wash for silk, cashmere, lace, and other delicate fabrics.',
    image: 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=300&fit=crop',
  },
];

type SortOption = 'popular' | 'price-asc' | 'price-desc';

function formatPrice(price: number): string {
  const inThousands = Math.round(price / 1000);
  return `${inThousands}k₫`;
}

const categoryLabels: Record<string, string> = {
  wash: 'Wash & Fold',
  iron: 'Wash & Iron',
  dry_clean: 'Dry Clean',
  iron_only: 'Iron Only',
  shoes: 'Shoes',
  express: 'Express',
};

const categoryColors: Record<string, string> = {
  wash: '#4A90D9',
  iron: '#38B2AC',
  dry_clean: '#9F7AEA',
  iron_only: '#ED8936',
  shoes: '#E53E3E',
  express: '#D69E2E',
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const filtered = useMemo(() => {
    let result = activeCategory === 'all'
      ? [...services]
      : services.filter(s => s.category === activeCategory);

    if (sortBy === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-desc') result.sort((a, b) => b.price - a.price);

    return result;
  }, [activeCategory, sortBy]);

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: 'var(--cloud)' }}>
      {/* Header */}
      <div
        className="sticky top-0 z-30 px-4 pt-3 pb-2"
        style={{ backgroundColor: 'var(--cloud)', borderBottom: '1px solid rgba(74,144,217,0.08)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Link href="/" className="p-1.5 rounded-lg" style={{ color: 'var(--charcoal)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            <h1 className="text-lg font-bold font-display" style={{ color: 'var(--charcoal)' }}>
              All Services
            </h1>
          </div>
          <Link href="/search" className="p-2 rounded-xl" style={{ color: 'var(--charcoal-muted)' }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
          </Link>
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all"
              style={{
                backgroundColor: activeCategory === cat.id
                  ? (cat.color || 'var(--blue-hex)')
                  : 'white',
                color: activeCategory === cat.id
                  ? 'white'
                  : 'var(--charcoal-muted)',
                boxShadow: activeCategory === cat.id
                  ? `0 2px 8px ${cat.color || 'var(--blue-hex)'}40`
                  : '0 1px 3px rgba(0,0,0,0.06)',
              }}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Sort & count */}
      <div className="flex items-center justify-between px-4 py-3">
        <span className="text-xs font-medium" style={{ color: 'var(--charcoal-muted)' }}>
          {filtered.length} service{filtered.length !== 1 ? 's' : ''}
        </span>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value as SortOption)}
          className="text-xs font-medium rounded-lg px-2 py-1 border-none bg-white"
          style={{ color: 'var(--charcoal)' }}
        >
          <option value="popular">Popular</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
        </select>
      </div>

      {/* Services grid */}
      <div className="px-4 space-y-3">
        {filtered.map((service, idx) => (
          <Link
            key={service.id}
            href={`/services/${service.slug}`}
            className="flex bg-white rounded-xl overflow-hidden shadow-soft hover-lift transition-all animate-fade-in-up"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            {/* Image */}
            <div className="relative w-28 h-32 flex-shrink-0">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover"
                sizes="112px"
              />
              <span
                className="absolute top-1.5 left-1.5 text-[10px] font-semibold px-1.5 py-0.5 rounded-full"
                style={{
                  backgroundColor: `${categoryColors[service.category]}18`,
                  color: categoryColors[service.category],
                }}
              >
                {categoryLabels[service.category]}
              </span>
            </div>

            {/* Content */}
            <div className="flex-1 p-3 flex flex-col justify-between min-w-0">
              <div>
                <h3 className="font-bold font-display text-sm truncate" style={{ color: 'var(--charcoal)' }}>
                  {service.name}
                </h3>
                <p className="text-xs mt-1 line-clamp-2 leading-relaxed" style={{ color: 'var(--charcoal-muted)' }}>
                  {service.description}
                </p>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-sm font-bold" style={{ color: 'var(--blue-hex)' }}>
                  {formatPrice(service.price)}
                  <span className="text-xs font-normal ml-0.5" style={{ color: 'var(--charcoal-muted)' }}>
                    /{service.unit}
                  </span>
                </span>
                <span className="text-[10px] font-medium flex items-center gap-1" style={{ color: 'var(--charcoal-muted)' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 6v6l4 2" />
                  </svg>
                  {service.turnaround}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Bottom padding for nav */}
      <div className="h-8" />
    </div>
  );
}
