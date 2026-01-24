'use client';

/**
 * TierGate Component
 *
 * Wrapper condizionale che mostra/nasconde contenuto in base al tier attivo.
 * Supporta tre modalità: hide (nasconde), upgrade (mostra prompt), disable (disabilita).
 *
 * @example
 * // Nasconde completamente se feature non disponibile
 * <TierGate feature="enableCart">
 *   <CartButton />
 * </TierGate>
 *
 * @example
 * // Mostra upgrade prompt se feature non disponibile
 * <TierGate feature="enableCart" fallback="upgrade">
 *   <CartButton />
 * </TierGate>
 *
 * @example
 * // Custom fallback
 * <TierGate feature="enableCart" fallback={<MyCustomFallback />}>
 *   <CartButton />
 * </TierGate>
 */

import React, { ReactNode } from 'react';
import { useTierFeature, FeatureKey } from '@/lib/hooks/useTierFeature';
import { UpgradePrompt, UpgradePromptVariant } from './UpgradePrompt';

/**
 * TierGate props
 */
export interface TierGateProps {
  /** Feature key to check */
  feature: FeatureKey;

  /** Content to show when feature is available */
  children: ReactNode;

  /**
   * What to show when feature is NOT available:
   * - 'hide': Render nothing (default)
   * - 'upgrade': Show UpgradePrompt component
   * - 'disable': Render children with disabled styling
   * - ReactNode: Custom fallback component
   */
  fallback?: 'hide' | 'upgrade' | 'disable' | ReactNode;

  /** Variant for UpgradePrompt (when fallback='upgrade') */
  upgradeVariant?: UpgradePromptVariant;

  /** Custom message for upgrade prompt */
  upgradeMessage?: string;

  /** CSS class for the wrapper */
  className?: string;
}

/**
 * TierGate - Conditional wrapper for tier-gated features
 *
 * Usage patterns:
 *
 * 1. Hide completely (default):
 * ```tsx
 * <TierGate feature="enableCart">
 *   <CartIcon />  // Only visible on PRO+ tiers
 * </TierGate>
 * ```
 *
 * 2. Show upgrade prompt:
 * ```tsx
 * <TierGate feature="enableCart" fallback="upgrade">
 *   <AddToCartButton />
 * </TierGate>
 * ```
 *
 * 3. Disable with visual feedback:
 * ```tsx
 * <TierGate feature="enableAnalytics" fallback="disable">
 *   <AnalyticsSection />
 * </TierGate>
 * ```
 *
 * 4. Custom fallback:
 * ```tsx
 * <TierGate feature="enableDelivery" fallback={<ComingSoon />}>
 *   <DeliveryOptions />
 * </TierGate>
 * ```
 */
export function TierGate({
  feature,
  children,
  fallback = 'hide',
  upgradeVariant = 'inline',
  upgradeMessage,
  className,
}: TierGateProps) {
  const { isEnabled, tierRequired, tierConfig, nextTier } = useTierFeature(feature);

  // Feature is enabled - render children normally
  if (isEnabled) {
    return <>{children}</>;
  }

  // Feature is NOT enabled - handle fallback

  // Hide completely
  if (fallback === 'hide') {
    return null;
  }

  // Show upgrade prompt
  if (fallback === 'upgrade') {
    return (
      <UpgradePrompt
        feature={feature}
        variant={upgradeVariant}
        message={upgradeMessage}
        className={className}
      />
    );
  }

  // Disable with visual feedback
  if (fallback === 'disable') {
    return (
      <div
        className={`tier-gate-disabled pointer-events-none relative opacity-50 ${className || ''}`}
        aria-disabled="true"
      >
        {children}
        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-stone-900/20 dark:bg-stone-100/10">
          <span className="rounded bg-stone-100 px-2 py-1 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-400">
            {tierRequired ? `${tierConfig.branding.badge} required` : 'PRO'}
          </span>
        </div>
      </div>
    );
  }

  // Custom fallback ReactNode
  return <>{fallback}</>;
}

/**
 * TierGateInline - Inline version for buttons/icons
 *
 * Renders a locked badge inline with the content
 *
 * @example
 * <TierGateInline feature="enableCart">
 *   <button>Add to Cart</button>
 * </TierGateInline>
 */
export function TierGateInline({
  feature,
  children,
  lockedLabel = 'PRO',
  className,
}: {
  feature: FeatureKey;
  children: ReactNode;
  lockedLabel?: string;
  className?: string;
}) {
  const { isEnabled, tierConfig } = useTierFeature(feature);

  if (isEnabled) {
    return <>{children}</>;
  }

  // Get the badge from next tier or use provided label
  const badge = tierConfig.branding?.badge || lockedLabel;

  return (
    <div className={`tier-gate-inline relative inline-flex items-center ${className || ''}`}>
      <div className="pointer-events-none opacity-40">{children}</div>
      <span className="absolute -right-1 -top-1 rounded-full bg-amber-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
        {badge}
      </span>
    </div>
  );
}

/**
 * useTierGate - Hook version for programmatic checks
 *
 * @example
 * const { gated, render } = useTierGate('enableCart', <CartButton />);
 * if (gated) return render; // Returns UpgradePrompt or null
 * return render; // Returns CartButton
 */
export function useTierGate(
  feature: FeatureKey,
  children: ReactNode,
  options?: {
    fallback?: 'hide' | 'upgrade' | ReactNode;
    upgradeVariant?: UpgradePromptVariant;
  }
): { gated: boolean; render: ReactNode } {
  const { isEnabled, tierRequired } = useTierFeature(feature);
  const fallback = options?.fallback ?? 'hide';

  if (isEnabled) {
    return { gated: false, render: children };
  }

  let fallbackRender: ReactNode = null;

  if (fallback === 'upgrade') {
    fallbackRender = (
      <UpgradePrompt feature={feature} variant={options?.upgradeVariant || 'inline'} />
    );
  } else if (fallback !== 'hide') {
    fallbackRender = fallback;
  }

  return { gated: true, render: fallbackRender };
}

export default TierGate;
