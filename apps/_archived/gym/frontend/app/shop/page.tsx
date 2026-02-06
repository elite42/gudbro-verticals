'use client';

import Link from 'next/link';
import { useState } from 'react';
import { products } from '@/config/gym.config';
import { formatVNDPrice } from '@/lib/currency';

const categories = ['All', 'Apparel', 'Gear', 'Supplements'];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filtered = products.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <main className="mx-auto max-w-lg pb-24">
      {/* Header */}
      <div
        className="glass animate-slide-down sticky top-0 z-40 border-b px-4 py-3"
        style={{ borderColor: 'var(--cloud-dark)' }}
      >
        <div className="flex items-center gap-3">
          <Link href="/" className="rounded-full p-1.5 hover:bg-gray-100">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </Link>
          <h1 className="font-display text-lg font-bold" style={{ color: 'var(--navy)' }}>
            Shop
          </h1>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="animate-fade-in-up mt-3 px-4">
        <div className="flex gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="flex-1 rounded-xl py-2 text-sm font-medium transition-all"
              style={{
                background: selectedCategory === cat ? 'var(--orange)' : 'white',
                color: selectedCategory === cat ? 'white' : 'var(--charcoal-light)',
                border: selectedCategory === cat ? 'none' : '1px solid var(--cloud-dark)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="mt-4 grid grid-cols-2 gap-3 px-4">
        {filtered.map((product, i) => (
          <Link
            key={product.id}
            href={`/shop/${product.slug}`}
            className="shadow-soft hover-lift animate-fade-in-up overflow-hidden rounded-2xl bg-white"
            style={{ animationDelay: `${(i + 1) * 75}ms` }}
          >
            <div
              className="relative h-36 bg-cover bg-center"
              style={{ backgroundImage: `url(${product.image})` }}
            >
              {!product.inStock && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                    OUT OF STOCK
                  </span>
                </div>
              )}
              <span
                className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold"
                style={{ color: 'var(--charcoal-light)' }}
              >
                {product.category}
              </span>
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold leading-tight">{product.name}</h3>
              <div className="mt-1.5 flex items-center justify-between">
                <span
                  className="font-display text-base font-bold"
                  style={{ color: 'var(--orange)' }}
                >
                  {formatVNDPrice(product.price)}
                </span>
                {product.sizes && (
                  <span className="text-[10px]" style={{ color: 'var(--charcoal-muted)' }}>
                    {product.sizes.join(' / ')}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Order Info */}
      <div className="animate-fade-in-up mt-6 px-4 delay-300">
        <div className="rounded-2xl p-4" style={{ background: 'var(--navy-light)' }}>
          <p className="text-sm font-semibold" style={{ color: 'var(--navy)' }}>
            How to Order
          </p>
          <p className="mt-1 text-xs" style={{ color: 'var(--charcoal-light)' }}>
            Tap a product, then use the WhatsApp button to place your order. Pay at the gym
            reception. Items can also be purchased in person.
          </p>
        </div>
      </div>
    </main>
  );
}
