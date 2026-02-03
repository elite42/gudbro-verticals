'use client';

import { useState, useEffect } from 'react';
import { DishCard, DishItem, Extra } from '../../../components/DishCard';
import { getROOTSMenuItemsSync } from '../../../lib/roots-menu';
import { ProductBottomSheet } from '../../../components/ProductBottomSheet';
import { BottomNavLocal } from '../../../components/BottomNavLocal';
import Link from 'next/link';

export default function PopularPage() {
  const [selectedProduct, setSelectedProduct] = useState<DishItem | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Load popular items (first 12 products)
  const allMenuItems: DishItem[] = getROOTSMenuItemsSync();
  const menuItems = allMenuItems.slice(0, 12);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // TIER 2 only - currently disabled for TIER 1
  const handleAddToCart = (
    dish: DishItem,
    quantity: number,
    extras: Extra[],
    saveAsPreference?: boolean
  ) => {};

  return (
    <div className="bg-theme-bg-secondary min-h-screen pb-28">
      {/* Header with Back Button */}
      <div className="from-theme-brand-primary to-theme-brand-primary sticky top-0 z-20 bg-gradient-to-r px-4 py-6 text-white shadow-md">
        <div className="container mx-auto flex items-center gap-4">
          {/* Back Button */}
          <Link href="/menu" className="rounded-full p-2 transition-colors hover:bg-white/20">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </Link>

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold">Popolari</h1>
            <p className="text-sm opacity-90">{menuItems.length} prodotti</p>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="container mx-auto px-4 py-6">
        <div className="space-y-2">
          {menuItems.map((dish) => (
            <div key={dish.id}>
              <DishCard
                dish={dish}
                variant="compact"
                onAddToCart={handleAddToCart}
                onCardClick={(dish) => {
                  setSelectedProduct(dish);
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation - Hidden when bottom sheet is open */}
      {!selectedProduct && <BottomNavLocal />}

      {/* Product Bottom Sheet */}
      {selectedProduct && (
        <ProductBottomSheet
          dish={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}
