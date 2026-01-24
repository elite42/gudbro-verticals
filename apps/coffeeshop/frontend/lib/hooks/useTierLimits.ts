/**
 * useTierLimits Hook
 *
 * Hook per verificare i limiti di utilizzo in base al tier attivo.
 * Gestisce maxProducts, maxLanguages, maxQRCodes, etc.
 *
 * @example
 * const { isWithinLimit, remaining } = useTierLimit('maxLanguages', currentCount);
 */

import { useMemo } from 'react';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { TierConfig, TierLevel, getTierConfig, isLimitReached } from '@/lib/tier-system';

/**
 * Limit keys available in the tier system
 */
export type LimitKey = keyof TierConfig['limits'];

/**
 * Result of useTierLimit hook
 */
export interface TierLimitResult {
  /** Maximum allowed value (-1 = unlimited) */
  maxValue: number;

  /** Whether the limit is unlimited */
  isUnlimited: boolean;

  /** Whether current usage is within the limit */
  isWithinLimit: boolean;

  /** Whether the limit has been reached */
  isLimitReached: boolean;

  /** Remaining capacity (Infinity if unlimited, 0 if reached) */
  remaining: number;

  /** Percentage of limit used (0-100, 0 if unlimited) */
  usagePercentage: number;

  /** Current tier level */
  currentTier: TierLevel;
}

/**
 * Hook to check a specific limit against current usage
 *
 * @param limitKey - The limit key to check (e.g., 'maxLanguages')
 * @param currentValue - Current usage value
 * @returns TierLimitResult with limit status and remaining capacity
 *
 * @example
 * ```tsx
 * function LanguageSelector({ languages }: { languages: string[] }) {
 *   const { isWithinLimit, remaining, maxValue } = useTierLimit('maxLanguages', languages.length);
 *
 *   return (
 *     <div>
 *       <select disabled={!isWithinLimit}>
 *         {languages.slice(0, maxValue === -1 ? undefined : maxValue).map(lang => (
 *           <option key={lang}>{lang}</option>
 *         ))}
 *       </select>
 *       {remaining > 0 && <span>{remaining} lingue disponibili</span>}
 *     </div>
 *   );
 * }
 * ```
 */
export function useTierLimit(limitKey: LimitKey, currentValue: number): TierLimitResult {
  const currentTier = coffeeshopConfig.activeTier;
  const tierConfig = getTierConfig(currentTier);

  return useMemo(() => {
    const maxValue = tierConfig.limits[limitKey];
    const isUnlimited = maxValue === -1;
    const limitReached = isLimitReached(currentTier, limitKey, currentValue);

    let remaining: number;
    let usagePercentage: number;

    if (isUnlimited) {
      remaining = Infinity;
      usagePercentage = 0;
    } else {
      remaining = Math.max(0, maxValue - currentValue);
      usagePercentage = maxValue > 0 ? Math.min(100, (currentValue / maxValue) * 100) : 0;
    }

    return {
      maxValue,
      isUnlimited,
      isWithinLimit: !limitReached,
      isLimitReached: limitReached,
      remaining,
      usagePercentage,
      currentTier,
    };
  }, [currentTier, tierConfig, limitKey, currentValue]);
}

/**
 * Hook to get all limits for the current tier
 *
 * @returns Object with all limit configurations
 *
 * @example
 * ```tsx
 * const limits = useTierLimits();
 * console.log(limits.maxProducts); // 200
 * console.log(limits.maxLanguages); // 4
 * ```
 */
export function useTierLimits(): TierConfig['limits'] {
  const currentTier = coffeeshopConfig.activeTier;
  const tierConfig = getTierConfig(currentTier);

  return useMemo(() => tierConfig.limits, [tierConfig]);
}

/**
 * Hook to check if adding one more item would exceed a limit
 *
 * @param limitKey - The limit key to check
 * @param currentValue - Current count
 * @returns Whether adding one more is allowed
 *
 * @example
 * ```tsx
 * const canAddLanguage = useCanAdd('maxLanguages', currentLanguages.length);
 * if (!canAddLanguage) return <UpgradePrompt />;
 * ```
 */
export function useCanAdd(limitKey: LimitKey, currentValue: number): boolean {
  const { isWithinLimit, isUnlimited } = useTierLimit(limitKey, currentValue + 1);
  return isUnlimited || isWithinLimit;
}

/**
 * Format limit value for display
 * Converts -1 to "Unlimited" and numbers to formatted strings
 *
 * @param value - The limit value
 * @returns Formatted string
 */
export function formatLimitValue(value: number): string {
  if (value === -1) return 'Unlimited';
  if (value === 0) return 'Not available';
  return value.toLocaleString();
}

/**
 * Get limit display info with icon
 */
export function getLimitDisplayInfo(limitKey: LimitKey): {
  label: string;
  description: string;
  icon: string;
} {
  const limitInfo: Record<LimitKey, { label: string; description: string; icon: string }> = {
    maxProducts: {
      label: 'Menu Items',
      description: 'Maximum number of products in your menu',
      icon: '🍽️',
    },
    maxLanguages: {
      label: 'Languages',
      description: 'Supported menu languages',
      icon: '🌐',
    },
    maxQRCodes: {
      label: 'QR Codes',
      description: 'Number of tables/zones with unique QR',
      icon: '📱',
    },
    maxOrders: {
      label: 'Monthly Orders',
      description: 'Maximum orders per month',
      icon: '📦',
    },
    maxStaff: {
      label: 'Staff Accounts',
      description: 'Team members with access',
      icon: '👥',
    },
    maxVenues: {
      label: 'Venues',
      description: 'Number of locations/branches',
      icon: '🏪',
    },
  };

  return limitInfo[limitKey];
}
