'use client';

/**
 * UpgradePrompt Component
 *
 * Mostra un prompt per l'upgrade al tier superiore quando una feature non è disponibile.
 * Supporta diverse varianti: inline, card, banner, button.
 *
 * @example
 * <UpgradePrompt feature="enableCart" variant="inline" />
 * <UpgradePrompt feature="enableAnalytics" variant="card" />
 */

import React from 'react';
import { Lock, ArrowRight, Sparkle, Crown, Rocket } from '@phosphor-icons/react';
import { motion } from 'framer-motion';
import { FeatureKey, useTierFeature } from '@/lib/hooks/useTierFeature';
import { TierLevel, getNextTier, getUpgradeFeatures, TIER_CONFIGS } from '@/lib/tier-system';

/**
 * Variant types for UpgradePrompt
 */
export type UpgradePromptVariant = 'inline' | 'card' | 'banner' | 'button' | 'badge';

/**
 * UpgradePrompt props
 */
export interface UpgradePromptProps {
  /** The feature that requires upgrade */
  feature: FeatureKey;

  /** Visual variant */
  variant?: UpgradePromptVariant;

  /** Custom message (overrides default) */
  message?: string;

  /** Show upgrade button */
  showButton?: boolean;

  /** Custom CTA text */
  ctaText?: string;

  /** Callback when upgrade is clicked */
  onUpgrade?: () => void;

  /** CSS class */
  className?: string;
}

/**
 * Feature to human-readable name mapping
 */
const FEATURE_LABELS: Record<FeatureKey, string> = {
  enableLanguageSelector: 'Language Selection',
  enableCurrencyConverter: 'Currency Converter',
  enableSearch: 'Search',
  enablePackages: 'Combo Packages',
  enablePromotions: 'Promotions',
  enableCart: 'Shopping Cart',
  enableTableOrdering: 'Table Ordering',
  enableTakeaway: 'Takeaway',
  enableDelivery: 'Delivery',
  enableEngagementSystem: 'Customer Engagement',
  enableInventoryManagement: 'Inventory Management',
  enableAnalytics: 'Analytics',
  enableStaffManagement: 'Staff Management',
  enableMultiVenue: 'Multi-Venue',
  enableWhiteLabel: 'White Label',
};

/**
 * Get tier icon component
 */
function TierIcon({ tier, size = 16 }: { tier: TierLevel; size?: number }) {
  switch (tier) {
    case 'digital-menu':
      return <Lock size={size} weight="duotone" />;
    case 'pre-ordering':
      return <Rocket size={size} weight="duotone" />;
    case 'full-suite':
      return <Crown size={size} weight="duotone" />;
  }
}

/**
 * UpgradePrompt - Shows upgrade call-to-action when feature is locked
 */
export function UpgradePrompt({
  feature,
  variant = 'inline',
  message,
  showButton = true,
  ctaText,
  onUpgrade,
  className,
}: UpgradePromptProps) {
  const { currentTier, tierRequired, nextTier } = useTierFeature(feature);

  // If no upgrade available, don't render
  if (!nextTier && !tierRequired) {
    return null;
  }

  const targetTier = tierRequired ? TIER_CONFIGS[tierRequired] : nextTier;
  if (!targetTier) return null;

  const featureLabel = FEATURE_LABELS[feature] || feature;
  const defaultMessage = `${featureLabel} requires ${targetTier.branding.badge}`;
  const displayMessage = message || defaultMessage;
  const buttonText = ctaText || `Upgrade to ${targetTier.name}`;

  const handleUpgrade = () => {
    if (onUpgrade) {
      onUpgrade();
    } else {
      // Default: could open a modal or redirect to pricing page
      console.log(`Upgrade requested: ${currentTier} → ${targetTier.id}`);
      // In production: window.location.href = '/pricing' or open modal
    }
  };

  // Badge variant - minimal
  if (variant === 'badge') {
    return (
      <span
        className={`inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 ${className || ''}`}
      >
        <Lock size={10} weight="bold" />
        {targetTier.branding.badge}
      </span>
    );
  }

  // Button variant - compact locked button
  if (variant === 'button') {
    return (
      <button
        onClick={handleUpgrade}
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-1.5 text-sm font-medium text-stone-400 transition-colors hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-500 dark:hover:bg-stone-700 ${className || ''}`}
      >
        <Lock size={14} weight="duotone" />
        <span>{targetTier.branding.badge}</span>
      </button>
    );
  }

  // Inline variant - small, inline message
  if (variant === 'inline') {
    return (
      <div
        className={`inline-flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 ${className || ''}`}
      >
        <Lock size={14} weight="duotone" className="text-amber-500" />
        <span>{displayMessage}</span>
        {showButton && (
          <button
            onClick={handleUpgrade}
            className="font-medium text-amber-600 hover:underline dark:text-amber-400"
          >
            Upgrade
          </button>
        )}
      </div>
    );
  }

  // Banner variant - full-width banner
  if (variant === 'banner') {
    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full rounded-lg border border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 p-4 dark:border-amber-800 dark:from-amber-900/20 dark:to-orange-900/20 ${className || ''}`}
      >
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/50">
              <TierIcon tier={targetTier.id} size={20} />
            </div>
            <div>
              <p className="font-medium text-stone-800 dark:text-stone-200">{displayMessage}</p>
              <p className="text-sm text-stone-500 dark:text-stone-400">{targetTier.tagline}</p>
            </div>
          </div>
          {showButton && (
            <button
              onClick={handleUpgrade}
              className="flex items-center gap-2 rounded-lg bg-amber-500 px-4 py-2 font-medium text-white transition-colors hover:bg-amber-600"
            >
              <span>{buttonText}</span>
              <ArrowRight size={16} weight="bold" />
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  // Card variant - detailed upgrade card
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`rounded-xl border border-stone-200 bg-white p-5 shadow-sm dark:border-stone-700 dark:bg-stone-900 ${className || ''}`}
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">
          <Sparkle size={24} weight="fill" className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="mb-1 font-semibold text-stone-800 dark:text-stone-200">
            Unlock {featureLabel}
          </h3>
          <p className="mb-3 text-sm text-stone-500 dark:text-stone-400">
            {displayMessage}. Upgrade to {targetTier.name} for ${targetTier.price}/month.
          </p>

          {/* Feature highlights */}
          <div className="mb-4 flex flex-wrap gap-2">
            {getUpgradeFeatures(currentTier, targetTier.id)
              .slice(0, 3)
              .map((feat) => (
                <span
                  key={feat}
                  className="rounded bg-stone-100 px-2 py-1 text-xs text-stone-600 dark:bg-stone-800 dark:text-stone-400"
                >
                  + {feat}
                </span>
              ))}
          </div>

          {showButton && (
            <button
              onClick={handleUpgrade}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 font-medium text-white shadow-md transition-all hover:from-amber-600 hover:to-orange-600 hover:shadow-lg"
            >
              <TierIcon tier={targetTier.id} size={18} />
              <span>{buttonText}</span>
              <ArrowRight size={16} weight="bold" />
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * UpgradeBadge - Compact badge for locked features
 *
 * @example
 * <button>
 *   Add to Cart <UpgradeBadge tier="pre-ordering" />
 * </button>
 */
export function UpgradeBadge({ tier, className }: { tier?: TierLevel; className?: string }) {
  const targetTier = tier ? TIER_CONFIGS[tier] : null;
  const badge = targetTier?.branding.badge || 'PRO';

  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white ${className || ''}`}
    >
      <Lock size={8} weight="bold" />
      {badge}
    </span>
  );
}

export default UpgradePrompt;
