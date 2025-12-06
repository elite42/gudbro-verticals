'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { DishItem, Extra } from '../../components/DishCard';
import { coffeeshopConfig } from '../../config/coffeeshop.config';
import { MenuHeader } from '../../components/MenuHeader';
import { BottomNavLocal } from '../../components/BottomNavLocal';
import { PreferencesModal } from '../../components/PreferencesModal';
import { favoritesStore } from '../../lib/favorites-store';
import { selectionsStore } from '../../lib/selections-store';
import { ProductBottomSheet } from '../../components/ProductBottomSheet';
import { AccountSidebar } from '../../components/AccountSidebar';
import { SelectionsSidebar } from '../../components/SelectionsSidebar';
import { CustomerNameModal } from '../../components/CustomerNameModal';
import { tableContextStore } from '../../lib/table-context-store';
import { MenuTypeTabs } from '../../components/MenuTypeTabs';
import { PromotionalBanner } from '../../components/PromotionalBanner';
import { PopularSection } from '../../components/PopularSection';
import { CategorySection } from '../../components/CategorySection';
import { SearchOverlay } from '../../components/SearchOverlay';
import { useTranslation } from '@/lib/use-translation';
import { MultilingualText } from '@/types/dish';
import { validateProducts } from '@/lib/category-system';

// Custom hooks for state management
import { useMenuFilters, useMenuStores, useMenuUI } from '@/lib/hooks';

// Helper: Get localized text from multilingual object
function getLocalizedText(multi: MultilingualText | undefined, fallback: string, lang: string): string {
  if (!multi) return fallback;
  return multi[lang as keyof MultilingualText] || multi.en || fallback;
}

interface MenuClientProps {
  initialMenuItems: DishItem[];
}

export default function MenuClient({ initialMenuItems }: MenuClientProps) {
  const { t, language } = useTranslation();
  const router = useRouter();

  // Custom hooks for modular state management
  const filters = useMenuFilters({ initialMenuType: 'drinks', initialCategory: 'all' });
  const stores = useMenuStores();
  const ui = useMenuUI();

  // Destructure for cleaner access
  const {
    selectedCategory,
    setSelectedCategory,
    selectedMenuType,
    setSelectedMenuType,
    showOnlyCompatible,
    hasPreferences,
    filterItems
  } = filters;

  const {
    isClient,
    favoritesCount,
    selectionsCount,
    tableContext,
    checkQRCodeScan,
    isTableNameRequired
  } = stores;

  const {
    showPreferencesModal,
    showAccountSidebar,
    showSelectionsSidebar,
    showSearchOverlay,
    showCustomerNameModal,
    selectedProduct,
    openPreferencesModal,
    closePreferencesModal,
    openAccountSidebar,
    closeAccountSidebar,
    openSelectionsSidebar,
    closeSelectionsSidebar,
    openSearchOverlay,
    closeSearchOverlay,
    openCustomerNameModal,
    closeCustomerNameModal,
    selectProduct,
    clearSelectedProduct,
    openPreferencesFromAccount,
    editProductFromSelections
  } = ui;

  // Localize menu items based on current language
  const menuItems: DishItem[] = useMemo(() => {
    return initialMenuItems.map(item => ({
      ...item,
      name: getLocalizedText(item.nameMulti, item.name, language),
      description: getLocalizedText(item.descriptionMulti, item.description, language),
    }));
  }, [initialMenuItems, language]);

  // Check for QR code scan on mount
  useEffect(() => {
    checkQRCodeScan();
  }, [checkQRCodeScan]);

  // Validate products on load (development only) - catches category issues early
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && initialMenuItems.length > 0) {
      const validation = validateProducts(initialMenuItems, { logWarnings: true });
      if (!validation.isValid) {
        console.error('🚨 Product validation failed! Some products may not appear correctly.');
      }
    }
  }, [initialMenuItems]);

  // Check if customer name is required when table context changes
  useEffect(() => {
    if (isTableNameRequired()) {
      openCustomerNameModal();
    }
  }, [tableContext, isTableNameRequired, openCustomerNameModal]);

  // Filter items using the hook (preferences + menu type + category)
  const itemsToDisplay = filterItems(menuItems);

  // Helper function to check if an item is new
  const isItemNew = (item: DishItem): boolean => {
    if (!item.isNew || !item.newUntil) return false;
    const newUntilDate = new Date(item.newUntil);
    const now = new Date();
    return now <= newUntilDate;
  };

  // Count new items
  const newItemsCount = itemsToDisplay.filter(isItemNew).length;

  // Build dynamic categories array
  const baseCategories = [
    {
      id: 'all',
      name: 'All',
      color: 'bg-theme-brand-accent',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    // Professional Restaurant Categories (Portate) - PRIORITÀ PRIMA
    {
      id: 'antipasti',
      name: 'Antipasti',
      color: 'bg-yellow-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      id: 'primi',
      name: 'Primi',
      color: 'bg-blue-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8.1 13.34l2.83-2.83L3.91 3.5c-1.56 1.56-1.56 4.09 0 5.66l4.19 4.18zm6.78-1.81c1.53.71 3.68.21 5.27-1.38 1.91-1.91 2.28-4.65.81-6.12-1.46-1.46-4.2-1.1-6.12.81-1.59 1.59-2.09 3.74-1.38 5.27L3.7 19.87l1.41 1.41L12 14.41l6.88 6.88 1.41-1.41L13.41 13l1.47-1.47z" />
        </svg>
      )
    },
    {
      id: 'secondi',
      name: 'Secondi',
      color: 'bg-red-600',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h18v18H3V3zm3 3v12h12V6H6z" />
        </svg>
      )
    },
    {
      id: 'piatti-unici',
      name: 'Piatti Unici',
      color: 'bg-indigo-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2m18 0a9 9 0 10-18 0" />
        </svg>
      )
    },
    {
      id: 'pizza',
      name: 'Pizza',
      color: 'bg-theme-brand-primary-hover',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C8.43 2 5.23 3.54 3.01 6L12 22l8.99-16C18.77 3.54 15.57 2 12 2zm0 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z" />
        </svg>
      )
    },
    {
      id: 'dessert',
      name: 'Dessert',
      color: 'bg-purple-500',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z" />
        </svg>
      )
    },
    {
      id: 'bevande',
      name: 'Bevande',
      color: 'bg-cyan-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h4l3 3 3-3h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-7 3.5c1.93 0 3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5S8.5 10.93 8.5 9 10.07 5.5 12 5.5z" />
        </svg>
      )
    },
    // ROOTS Original Categories
    {
      id: 'coffee',
      name: 'Coffee',
      color: 'bg-theme-brand-primary-hover',
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2 21h18v-2H2v2zm2-8h10V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v8zm13.33-1H17V5h-.67c-.82 0-1.56.41-2 1.03V13h3.67a2.5 2.5 0 000-5z" />
        </svg>
      )
    },
    {
      id: 'smoothie',
      name: 'Smoothies',
      color: 'bg-pink-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3h14l-2 8H7L5 3zm0 0c0 1.5 1 2.5 2.5 2.5S10 4.5 10 3M7 11l-1 10h12l-1-10" />
        </svg>
      )
    },
    {
      id: 'bowl',
      name: 'Bowls',
      color: 'bg-green-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2m18 0a9 9 0 10-18 0" />
        </svg>
      )
    },
    {
      id: 'wellness',
      name: 'Wellness',
      color: 'bg-teal-500',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    }
  ];

  // Helper to get count for each category
  const getCategoryCount = (categoryId: string): number => {
    if (categoryId === 'all') return itemsToDisplay.length;
    if (categoryId === 'new') return newItemsCount;
    if (categoryId === 'favorites') return favoritesCount;
    return itemsToDisplay.filter(item => item.category === categoryId).length;
  };

  // Build dynamic categories (to insert after "All")
  const dynamicCategories = [];

  // Add "New" category if there are new items
  if (newItemsCount > 0) {
    dynamicCategories.push({
      id: 'new',
      name: 'New',
      color: 'bg-yellow-500',
      count: newItemsCount,
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    });
  }

  // Add "Favorites" category if user has favorites
  if (favoritesCount > 0) {
    dynamicCategories.push({
      id: 'favorites',
      name: 'Favorites',
      color: 'bg-red-500',
      count: favoritesCount,
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      )
    });
  }

  // Combine: ALL first, then dynamic categories, then base categories
  // Extract "All" from baseCategories
  const allCategory = baseCategories[0]; // First item is "All"
  const otherCategories = baseCategories.slice(1); // Rest of categories

  const categories = [
    { ...allCategory, count: getCategoryCount('all') },
    ...dynamicCategories,
    ...otherCategories
      .map(cat => ({ ...cat, count: getCategoryCount(cat.id) }))
      .filter(cat => cat.count > 0) // Hide categories with 0 items
  ];

  // Apply menu type filter first (already applied above, use itemsToDisplay)
  const menuTypeFilteredItems = itemsToDisplay;

  // Apply category filter on top of menu type and preferences filters
  const filteredItems = selectedCategory === 'all'
    ? menuTypeFilteredItems
    : selectedCategory === 'new'
      ? menuTypeFilteredItems.filter(isItemNew)
      : selectedCategory === 'favorites'
        ? menuTypeFilteredItems.filter(item => favoritesStore.isFavorite(item.id))
        : menuTypeFilteredItems.filter(item => item.category === selectedCategory);

  // Add to selections (works for both TIER 1 notepad and TIER 2+ ordering)
  const handleAddToCart = (dish: DishItem, quantity: number, extras: Extra[], saveAsPreference?: boolean) => {
    selectionsStore.add(dish, quantity, extras);
    console.log('✅ Added to selections:', { dish: dish.name, quantity, extras, saveAsPreference });
  };

  return (
    <div className="min-h-screen bg-theme-bg-secondary pb-28">
      {/* Header */}
      <MenuHeader
        selectionsCount={selectionsCount}
        onSelectionsClick={openSelectionsSidebar}
      />

      {/* Table Context Bar (when QR scanned) */}
      {isClient && tableContext.table_number && (
        <div className="bg-gradient-to-r from-theme-brand-primary to-theme-brand-primary text-white px-4 py-3 shadow-md">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Table Icon */}
              <div className="bg-white/20 p-2 rounded-lg">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>

              {/* Table Info */}
              <div>
                <div className="font-bold text-lg">
                  {t.menu.tableContext.table} {tableContext.table_number}
                </div>
                {tableContext.customer_name && (
                  <div className="text-sm opacity-90">
                    {tableContext.customer_name}
                  </div>
                )}
              </div>
            </div>

            {/* Service Type Badge */}
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-medium">
              {tableContext.consumption_type === 'dine-in' ? `🏠 ${t.menu.tableContext.dineIn}` : `📦 ${t.menu.tableContext.takeaway}`}
            </div>
          </div>
        </div>
      )}

      {/* Promotional Banner */}
      <PromotionalBanner
        title={t.menu.promo.happyHour}
        description={t.menu.promo.happyHourDesc}
        emoji="🎉"
        bgColor="bg-gradient-to-r from-green-500 to-emerald-600"
        dismissible={true}
        storageKey="happy-hour-banner-dismissed"
      />

      {/* Menu Type Tabs with Search Icon */}
      <MenuTypeTabs
        selectedMenuType={selectedMenuType}
        onMenuTypeChange={setSelectedMenuType}
        onSearchClick={openSearchOverlay}
      />

      {/* Popular Section */}
      {isClient && (
        <PopularSection
          items={menuItems.slice(0, 12)}
          totalCount={12}
          onItemClick={selectProduct}
          onSeeAllClick={() => router.push('/menu/popular')}
        />
      )}

      {/* Category Sections - Horizontal scrollable cards for each category */}
      {isClient && (() => {
        // Category mapping with translated names and icons
        const categoryMetadata: Record<string, { name: string; icon: string }> = {
          'coffee': { name: t.menu.categories.coffee, icon: '☕' },
          'hot-coffee': { name: t.menu.categories.hotCoffee, icon: '☕' },
          'iced-coffee': { name: t.menu.categories.icedCoffee, icon: '🧊' },
          'tea': { name: t.menu.categories.tea, icon: '🍵' },
          'smoothie': { name: t.menu.categories.smoothies, icon: '🥤' },
          'matcha': { name: t.menu.categories.matcha, icon: '🍵' },
          'milkshake': { name: t.menu.categories.milkshake, icon: '🥛' },
          'bowl': { name: t.menu.categories.bowls, icon: '🥗' },
          'food': { name: t.menu.categories.food, icon: '🍽️' },
          'lunch': { name: t.menu.categories.lunch, icon: '🍽️' },
          'dessert': { name: t.menu.categories.desserts, icon: '🍰' },
          'wellness': { name: t.menu.categories.wellness, icon: '💚' },
          'breakfast': { name: t.menu.categories.breakfast, icon: '🍳' },
          'beverage': { name: t.menu.categories.beverages, icon: '🧃' },
          'antipasti': { name: 'Antipasti', icon: '🥙' },
          'primi': { name: 'Primi', icon: '🍝' },
          'secondi': { name: 'Secondi', icon: '🥩' },
          'piatti-unici': { name: 'Piatti Unici', icon: '🍽️' },
          'pizza': { name: 'Pizza', icon: '🍕' },
          'merchandise': { name: 'Merchandise', icon: '🎁' },
          'merch': { name: 'Merch', icon: '🎁' },
          'gadget': { name: 'Gadget', icon: '🎁' },
          'gift': { name: 'Gift', icon: '🎁' },
          'retail': { name: 'Retail', icon: '🛍️' }
        };

        // Group items by category
        const grouped = itemsToDisplay.reduce((acc, item) => {
          if (!acc[item.category]) {
            acc[item.category] = [];
          }
          acc[item.category].push(item);
          return acc;
        }, {} as Record<string, DishItem[]>);

        // Render category sections
        return (
          <div className="pb-8">
            {Object.entries(grouped).map(([categoryId, items]) => {
              // Skip "bevande" category - it's only a macro filter, not a display category
              if (categoryId.toLowerCase() === 'bevande') {
                return null;
              }

              const metadata = categoryMetadata[categoryId.toLowerCase()] || {
                name: categoryId,
                icon: '📦'
              };

              return (
                <CategorySection
                  key={categoryId}
                  categoryId={categoryId}
                  categoryName={metadata.name}
                  categoryIcon={metadata.icon}
                  items={items}
                  onItemClick={selectProduct}
                  onSeeAllClick={() => router.push(`/menu/category/${categoryId.toLowerCase()}`)}
                />
              );
            })}

            {/* Empty state */}
            {Object.keys(grouped).length === 0 && (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h2 className="text-2xl font-bold text-theme-text-primary mb-2">
                  {t.emptyState.noProducts}
                </h2>
                <p className="text-theme-text-secondary">
                  {t.emptyState.tryDifferentMenuType}
                </p>
              </div>
            )}
          </div>
        );
      })()}

      {/* Bottom Navigation - Hidden when bottom sheet is open */}
      {!selectedProduct && <BottomNavLocal />}

      {/* Selections Sidebar */}
      {isClient && (
        <SelectionsSidebar
          isOpen={showSelectionsSidebar}
          onClose={closeSelectionsSidebar}
          onEditProduct={editProductFromSelections}
        />
      )}

      {/* Account Sidebar */}
      {isClient && (
        <AccountSidebar
          isOpen={showAccountSidebar}
          onClose={closeAccountSidebar}
          onOpenPreferences={openPreferencesFromAccount}
          onOpenSettings={() => {
            closeAccountSidebar();
            console.log('Settings clicked');
          }}
        />
      )}

      {/* Preferences Modal */}
      {showPreferencesModal && (
        <PreferencesModal
          onClose={closePreferencesModal}
          onSave={() => {
            // Refresh will happen automatically via preferences-updated event
          }}
        />
      )}

      {/* Product Bottom Sheet */}
      {selectedProduct && (
        <ProductBottomSheet
          dish={selectedProduct}
          onClose={clearSelectedProduct}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Search Overlay */}
      {isClient && (
        <SearchOverlay
          isOpen={showSearchOverlay}
          onClose={closeSearchOverlay}
          items={menuItems}
          onItemClick={(item) => {
            selectProduct(item);
            closeSearchOverlay();
          }}
        />
      )}
    </div>
  );
}
