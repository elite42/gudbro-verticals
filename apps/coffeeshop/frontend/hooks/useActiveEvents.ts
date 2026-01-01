'use client';

import { useMemo } from 'react';
import { Event, EventPromotion, PROMO_MECHANIC_CONFIG } from '@/types/event';

/**
 * Hook to get active events and their impact on the menu.
 * This hook determines which events are currently running
 * and provides information about menu modifications.
 */

interface ActiveEventContext {
  // Currently active events (happening now)
  activeEvents: Event[];

  // Upcoming events today
  upcomingToday: Event[];

  // Menu impact from active events
  menuImpact: {
    // Products that should be disabled (not available)
    disabledProductIds: string[];

    // Categories that should be disabled
    disabledCategoryIds: string[];

    // Products that should be featured/highlighted
    featuredProductIds: string[];

    // Categories that should be featured
    featuredCategoryIds: string[];

    // Products with limited stock
    limitedStock: Map<string, { quantity: number; remaining?: number }>;

    // Active promotions that apply to products
    activePromotions: EventPromotion[];

    // Should use a special menu?
    specialMenuId: string | null;
  };

  // Helper to check if a product has an active promo
  getProductPromo: (productId: string, categoryId?: string) => EventPromotion | null;

  // Helper to format promo badge for display
  getPromoBadge: (promo: EventPromotion) => string;

  // Helper to check if product is disabled
  isProductDisabled: (productId: string, categoryId?: string) => boolean;

  // Helper to check if product is featured
  isProductFeatured: (productId: string, categoryId?: string) => boolean;

  // Get remaining stock for a product
  getRemainingStock: (productId: string) => number | null;
}

export function useActiveEvents(events: Event[]): ActiveEventContext {
  const now = useMemo(() => new Date(), []);
  const today = useMemo(() => now.toISOString().split('T')[0], [now]);

  // Filter active events (happening right now)
  const activeEvents = useMemo(() => {
    return events.filter(event => {
      if (event.status !== 'published') return false;

      const startDateTime = new Date(`${event.startDate}T${event.startTime}`);
      const endDateTime = new Date(`${event.endDate}T${event.endTime}`);

      return now >= startDateTime && now <= endDateTime;
    });
  }, [events, now]);

  // Filter events happening later today
  const upcomingToday = useMemo(() => {
    return events.filter(event => {
      if (event.status !== 'published') return false;
      if (event.startDate !== today) return false;

      const startDateTime = new Date(`${event.startDate}T${event.startTime}`);
      return now < startDateTime;
    });
  }, [events, now, today]);

  // Aggregate menu impact from all active events
  const menuImpact = useMemo(() => {
    const disabledProductIds = new Set<string>();
    const disabledCategoryIds = new Set<string>();
    const featuredProductIds = new Set<string>();
    const featuredCategoryIds = new Set<string>();
    const limitedStock = new Map<string, { quantity: number; remaining?: number }>();
    const activePromotions: EventPromotion[] = [];
    let specialMenuId: string | null = null;

    for (const event of activeEvents) {
      const impact = event.menuImpact;

      if (impact) {
        // Disabled items
        impact.disabledProducts?.forEach(id => disabledProductIds.add(id));
        impact.disabledCategories?.forEach(id => disabledCategoryIds.add(id));

        // Featured items
        impact.featuredProducts?.forEach(id => featuredProductIds.add(id));
        impact.featuredCategories?.forEach(id => featuredCategoryIds.add(id));

        // Limited stock
        impact.limitedStock?.forEach(item => {
          limitedStock.set(item.productId, {
            quantity: item.quantity,
            remaining: item.remaining,
          });
        });

        // Special menu (first one wins)
        if (impact.useSpecialMenu && impact.specialMenuId && !specialMenuId) {
          specialMenuId = impact.specialMenuId;
        }
      }

      // Active promotions
      if (event.promotions) {
        activePromotions.push(...event.promotions);
      }
    }

    return {
      disabledProductIds: Array.from(disabledProductIds),
      disabledCategoryIds: Array.from(disabledCategoryIds),
      featuredProductIds: Array.from(featuredProductIds),
      featuredCategoryIds: Array.from(featuredCategoryIds),
      limitedStock,
      activePromotions,
      specialMenuId,
    };
  }, [activeEvents]);

  // Helper to find promo for a product
  const getProductPromo = useMemo(() => {
    return (productId: string, categoryId?: string): EventPromotion | null => {
      for (const promo of menuImpact.activePromotions) {
        // Check if promo applies to all
        if (promo.applicableTo === 'all') {
          // Check if product is not excluded
          if (!promo.excludedProductIds?.includes(productId)) {
            return promo;
          }
        }

        // Check if promo applies to specific products
        if (promo.applicableTo === 'products') {
          if (promo.productIds?.includes(productId)) {
            return promo;
          }
        }

        // Check if promo applies to categories
        if (promo.applicableTo === 'categories' && categoryId) {
          if (promo.categoryIds?.includes(categoryId)) {
            // Check if product is not excluded
            if (!promo.excludedProductIds?.includes(productId)) {
              return promo;
            }
          }
        }
      }

      return null;
    };
  }, [menuImpact.activePromotions]);

  // Helper to format promo badge
  const getPromoBadge = (promo: EventPromotion): string => {
    if (promo.badge) return promo.badge;

    const config = PROMO_MECHANIC_CONFIG[promo.mechanic];
    if (!config) return '';

    if (promo.mechanic === 'percent_off' && promo.value) {
      return `-${promo.value}%`;
    }
    if (promo.mechanic === 'fixed_discount' && promo.value) {
      return `-€${promo.value}`;
    }
    if (promo.mechanic === 'fixed_price' && promo.value) {
      return `€${promo.value}`;
    }
    if (promo.mechanic === 'buy_x_get_y' && promo.value && promo.secondaryValue) {
      return `${promo.value}x${promo.secondaryValue}`;
    }

    return config.example;
  };

  // Helper to check if product is disabled
  const isProductDisabled = (productId: string, categoryId?: string): boolean => {
    if (menuImpact.disabledProductIds.includes(productId)) return true;
    if (categoryId && menuImpact.disabledCategoryIds.includes(categoryId)) return true;
    return false;
  };

  // Helper to check if product is featured
  const isProductFeatured = (productId: string, categoryId?: string): boolean => {
    if (menuImpact.featuredProductIds.includes(productId)) return true;
    if (categoryId && menuImpact.featuredCategoryIds.includes(categoryId)) return true;
    return false;
  };

  // Get remaining stock for a product
  const getRemainingStock = (productId: string): number | null => {
    const stock = menuImpact.limitedStock.get(productId);
    if (!stock) return null;
    return stock.remaining ?? stock.quantity;
  };

  return {
    activeEvents,
    upcomingToday,
    menuImpact,
    getProductPromo,
    getPromoBadge,
    isProductDisabled,
    isProductFeatured,
    getRemainingStock,
  };
}

/**
 * Calculate discounted price based on promo mechanic
 */
export function calculatePromoPrice(
  originalPrice: number,
  promo: EventPromotion
): number | null {
  switch (promo.mechanic) {
    case 'percent_off':
      if (promo.value) {
        return originalPrice * (1 - promo.value / 100);
      }
      break;
    case 'fixed_discount':
      if (promo.value) {
        return Math.max(0, originalPrice - promo.value);
      }
      break;
    case 'fixed_price':
      if (promo.value) {
        return promo.value;
      }
      break;
    // BOGO, bundles, etc. don't change the displayed price
    default:
      break;
  }
  return null;
}
