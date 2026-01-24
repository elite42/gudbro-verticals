/**
 * useTierFeature Hook
 *
 * Hook per verificare la disponibilità di una feature in base al tier attivo.
 * Usato dai componenti v2 per il feature gating tier-aware.
 *
 * @example
 * const { isEnabled, tierRequired } = useTierFeature('enableCart');
 * if (!isEnabled) return <UpgradePrompt tier={tierRequired} />;
 */

import { useMemo } from 'react';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { TierConfig, TierLevel, getTierConfig, getNextTier, TIER_CONFIGS } from '@/lib/tier-system';

/**
 * Feature keys available in the tier system
 */
export type FeatureKey = keyof TierConfig['features'];

/**
 * Result of useTierFeature hook
 */
export interface TierFeatureResult {
  /** Whether the feature is enabled for the current tier */
  isEnabled: boolean;

  /** Current active tier level */
  currentTier: TierLevel;

  /** Current tier configuration */
  tierConfig: TierConfig;

  /** The minimum tier required to use this feature (null if always available) */
  tierRequired: TierLevel | null;

  /** The next tier for upgrade (null if on highest tier) */
  nextTier: TierConfig | null;

  /** Whether an upgrade is available */
  canUpgrade: boolean;
}

/**
 * Find the minimum tier that enables a specific feature
 */
function findMinimumTierForFeature(feature: FeatureKey): TierLevel | null {
  const tiers: TierLevel[] = ['digital-menu', 'pre-ordering', 'full-suite'];

  for (const tier of tiers) {
    const config = getTierConfig(tier);
    if (config.features[feature]) {
      return tier;
    }
  }

  return null; // Feature not available in any tier
}

/**
 * Hook to check if a feature is available for the current tier
 *
 * @param feature - The feature key to check
 * @returns TierFeatureResult with feature availability and upgrade info
 *
 * @example
 * ```tsx
 * function CartButton() {
 *   const { isEnabled, tierRequired } = useTierFeature('enableCart');
 *
 *   if (!isEnabled) {
 *     return <UpgradePrompt feature="enableCart" tier={tierRequired} />;
 *   }
 *
 *   return <button>Add to Cart</button>;
 * }
 * ```
 */
export function useTierFeature(feature: FeatureKey): TierFeatureResult {
  const currentTier = coffeeshopConfig.activeTier;
  const tierConfig = getTierConfig(currentTier);

  return useMemo(() => {
    const isEnabled = tierConfig.features[feature];
    const tierRequired = isEnabled ? null : findMinimumTierForFeature(feature);
    const nextTier = getNextTier(currentTier);

    return {
      isEnabled,
      currentTier,
      tierConfig,
      tierRequired,
      nextTier,
      canUpgrade: nextTier !== null,
    };
  }, [currentTier, tierConfig, feature]);
}

/**
 * Hook to check multiple features at once
 *
 * @param features - Array of feature keys to check
 * @returns Record of feature keys to their enabled status
 *
 * @example
 * ```tsx
 * const features = useTierFeatures(['enableCart', 'enableEngagementSystem']);
 * // { enableCart: true, enableEngagementSystem: false }
 * ```
 */
export function useTierFeatures(features: FeatureKey[]): Record<FeatureKey, boolean> {
  const currentTier = coffeeshopConfig.activeTier;
  const tierConfig = getTierConfig(currentTier);

  return useMemo(() => {
    const result: Record<string, boolean> = {};
    for (const feature of features) {
      result[feature] = tierConfig.features[feature];
    }
    return result as Record<FeatureKey, boolean>;
  }, [currentTier, tierConfig, features]);
}

/**
 * Hook to get the current tier configuration
 *
 * @returns Current tier configuration object
 *
 * @example
 * ```tsx
 * const tier = useTierConfig();
 * console.log(tier.name); // "Pre-ordering"
 * console.log(tier.branding.badge); // "PRO"
 * ```
 */
export function useTierConfig(): TierConfig {
  const currentTier = coffeeshopConfig.activeTier;
  return useMemo(() => getTierConfig(currentTier), [currentTier]);
}

/**
 * Get all features with their tier requirements
 * Useful for feature comparison tables
 */
export function getAllFeaturesWithTiers(): Record<
  FeatureKey,
  { enabled: boolean; requiredTier: TierLevel | null }
> {
  const currentTier = coffeeshopConfig.activeTier;
  const tierConfig = getTierConfig(currentTier);

  const result: Record<string, { enabled: boolean; requiredTier: TierLevel | null }> = {};

  const allFeatures = Object.keys(tierConfig.features) as FeatureKey[];

  for (const feature of allFeatures) {
    result[feature] = {
      enabled: tierConfig.features[feature],
      requiredTier: tierConfig.features[feature] ? null : findMinimumTierForFeature(feature),
    };
  }

  return result as Record<FeatureKey, { enabled: boolean; requiredTier: TierLevel | null }>;
}
