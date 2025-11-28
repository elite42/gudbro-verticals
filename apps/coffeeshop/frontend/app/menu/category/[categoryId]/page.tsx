'use client';

import { useState, useEffect } from 'react';
import { DishCard, DishItem, Extra } from '../../../../components/DishCard';
import { getROOTSMenuItemsSync } from '../../../../lib/roots-menu';
import { ProductBottomSheet } from '../../../../components/ProductBottomSheet';
import { BottomNavLocal } from '../../../../components/BottomNavLocal';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/lib/use-translation';

// Category metadata mapping
const categoryMetadata: Record<string, { name: string; icon: string }> = {
  'coffee': { name: 'Coffee', icon: '☕' },
  'tea': { name: 'Tea', icon: '🍵' },
  'smoothie': { name: 'Smoothies', icon: '🥤' },
  'bowl': { name: 'Bowls', icon: '🥗' },
  'lunch': { name: 'Food', icon: '🍽️' },
  'dessert': { name: 'Desserts', icon: '🍰' },
  'wellness': { name: 'Wellness', icon: '💚' },
  'breakfast': { name: 'Breakfast', icon: '🍳' },
  'beverage': { name: 'Beverages', icon: '🧃' },
  'antipasti': { name: 'Antipasti', icon: '🥙' },
  'primi': { name: 'Primi', icon: '🍝' },
  'secondi': { name: 'Secondi', icon: '🥩' },
  'piatti-unici': { name: 'Piatti Unici', icon: '🍽️' },
  'pizza': { name: 'Pizza', icon: '🍕' }
};

export default function CategoryPage() {
  const { t } = useTranslation();
  const params = useParams();
  const categoryId = params.categoryId as string;
  const [selectedProduct, setSelectedProduct] = useState<DishItem | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Load all menu items and filter by category
  const allMenuItems: DishItem[] = getROOTSMenuItemsSync();
  const menuItems = allMenuItems.filter(item => item.category.toLowerCase() === categoryId.toLowerCase());

  // Get category metadata
  const metadata = categoryMetadata[categoryId.toLowerCase()] || {
    name: categoryId,
    icon: '📦'
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  // TIER 2 only - currently disabled for TIER 1
  const handleAddToCart = (dish: DishItem, quantity: number, extras: Extra[], saveAsPreference?: boolean) => {
    console.log('⚠️ Cart is disabled for TIER 1');
  };

  return (
    <div className="min-h-screen bg-theme-bg-secondary pb-28">
      {/* Header with Back Button */}
      <div className="bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white px-4 py-6 shadow-md sticky top-0 z-20">
        <div className="container mx-auto flex items-center gap-4">
          {/* Back Button */}
          <Link
            href="/menu"
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>

          {/* Title with Icon */}
          <div className="flex items-center gap-3">
            <span className="text-3xl">{metadata.icon}</span>
            <div>
              <h1 className="text-2xl font-bold">{metadata.name}</h1>
              <p className="text-sm opacity-90">{menuItems.length} prodotti</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products List */}
      <div className="container mx-auto px-4 py-6">
        {menuItems.length > 0 ? (
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
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h2 className="text-2xl font-bold text-theme-text-primary mb-2">{t.emptyState.noProducts}</h2>
            <p className="text-theme-text-secondary">{t.emptyState.noProductsInCategory}</p>
          </div>
        )}
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
