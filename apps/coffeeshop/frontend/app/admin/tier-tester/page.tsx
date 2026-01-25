'use client';

import { useState } from 'react';
import {
  getAllTiers,
  getUpgradeFeatures,
  calculateUpgradeSavings,
  TierLevel,
} from '@/lib/tier-system';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';
import { ShoppingCart, Rocket, ChartBar, Truck, Star, Heart } from '@phosphor-icons/react';
import { TierGate, TierGateInline } from '@/components/v2/TierGate';
import { UpgradePrompt, UpgradeBadge } from '@/components/v2/UpgradePrompt';

/**
 * Tier Tester Page
 *
 * Internal admin tool for testing SaaS tier functionality.
 * Allows simulating different subscription levels to validate:
 * - Feature toggling
 * - Limits enforcement
 * - Upgrade/downgrade flows
 * - UI graceful degradation
 *
 * @route /admin/tier-tester
 * @access Internal only (should add auth in production)
 */
export default function TierTesterPage() {
  const allTiers = getAllTiers();
  const [selectedTier, setSelectedTier] = useState<TierLevel>(coffeeshopConfig.activeTier);
  const currentTier = allTiers.find((t) => t.id === selectedTier)!;

  // Simulate usage stats for limit testing
  const [usageStats] = useState({
    products: 13, // Current ROOTS products
    languages: 3, // EN, VI, IT
    qrCodes: 1,
    orders: 0,
    staff: 1,
    venues: 1,
  });

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">SaaS Tier Tester</h1>
          <p className="text-gray-600">
            Test different subscription tiers to validate feature toggling and limits. Current
            active tier in config: <Badge variant="primary">{coffeeshopConfig.activeTier}</Badge>
          </p>
        </div>

        {/* Alert */}
        <Alert variant="warning" className="mb-8">
          <strong>Testing Mode:</strong> Changes here only affect this preview. To permanently
          change the tier, edit <code>ACTIVE_TIER</code> in <code>config/coffeeshop.config.ts</code>
        </Alert>

        {/* Tier Selection Cards */}
        <div className="mb-12 grid gap-6 md:grid-cols-3">
          {allTiers.map((tier) => {
            const isSelected = selectedTier === tier.id;
            const isUpgrade = tier.price > currentTier.price;
            const upgradeFeatures = isUpgrade ? getUpgradeFeatures(currentTier.id, tier.id) : [];
            const savings = isUpgrade ? calculateUpgradeSavings(currentTier.id, tier.id) : null;

            return (
              <Card
                key={tier.id}
                variant="default"
                padding="lg"
                className={`cursor-pointer bg-white transition-all hover:shadow-lg ${
                  isSelected ? 'shadow-xl ring-4 ring-blue-500' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {/* Header */}
                <div className="mb-6 text-center">
                  <div className="mb-2 text-4xl">{tier.branding.icon}</div>
                  <h3 className="mb-1 text-2xl font-bold text-gray-900">{tier.name}</h3>
                  <Badge variant={isSelected ? 'success' : 'default'} className="mb-3">
                    {tier.branding.badge}
                  </Badge>
                  <div className="mb-1 text-3xl font-bold text-gray-900">
                    ${tier.price}
                    <span className="text-base text-gray-600">/mo</span>
                  </div>
                  <p className="text-sm text-gray-700">{tier.tagline}</p>
                </div>

                {/* Upgrade Info */}
                {isUpgrade && savings && (
                  <Alert variant="info" className="mb-4 text-xs">
                    +${savings.monthlyDifference}/mo ({savings.percentageIncrease}% increase)
                    <br />
                    Unlocks {upgradeFeatures.length} new features
                  </Alert>
                )}

                {/* Select Button */}
                <Button
                  variant={isSelected ? 'primary' : 'outline'}
                  size="lg"
                  className="mb-4 w-full"
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {isSelected ? 'Current Selection' : 'Test This Tier'}
                </Button>

                {/* Features Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">Ordering System</span>
                    <span
                      className={`font-semibold ${tier.features.enableCart ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {tier.features.enableCart ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">Engagement</span>
                    <span
                      className={`font-semibold ${tier.features.enableEngagementSystem ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {tier.features.enableEngagementSystem ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">Delivery</span>
                    <span
                      className={`font-semibold ${tier.features.enableDelivery ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {tier.features.enableDelivery ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800">Analytics</span>
                    <span
                      className={`font-semibold ${tier.features.enableAnalytics ? 'text-green-600' : 'text-red-600'}`}
                    >
                      {tier.features.enableAnalytics ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detailed Tier Information */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Features */}
          <Card variant="elevated" padding="lg" className="bg-white">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Features for {currentTier.name}
            </h3>
            <div className="space-y-3">
              {Object.entries(currentTier.features).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="font-medium text-gray-800">{formatFeatureName(key)}</span>
                  <Badge variant={value ? 'success' : 'error'}>
                    {value ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Limits */}
          <Card variant="elevated" padding="lg" className="bg-white">
            <h3 className="mb-4 text-xl font-bold text-gray-900">
              Usage Limits for {currentTier.name}
            </h3>
            <div className="space-y-4">
              {Object.entries(currentTier.limits).map(([key, limit]) => {
                const usage = usageStats[key as keyof typeof usageStats] || 0;
                const isUnlimited = limit === -1;
                const percentage = isUnlimited ? 0 : (usage / limit) * 100;
                const isNearLimit = percentage > 80;
                const isOverLimit = percentage >= 100;

                return (
                  <div key={key}>
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-medium text-gray-800">{formatLimitName(key)}</span>
                      <span className="text-sm font-bold text-gray-900">
                        {usage} / {isUnlimited ? '∞' : limit}
                      </span>
                    </div>
                    {!isUnlimited && (
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isOverLimit
                              ? 'bg-red-600'
                              : isNearLimit
                                ? 'bg-yellow-500'
                                : 'bg-green-600'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    )}
                    {isUnlimited && <Badge variant="primary">Unlimited</Badge>}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Instructions */}
        <Card variant="default" padding="lg" className="mt-8 bg-white">
          <h3 className="mb-3 text-lg font-bold text-gray-900">How to Use This Tester</h3>
          <ol className="list-inside list-decimal space-y-2 text-gray-800">
            <li className="font-medium">
              Click on different tier cards above to see feature differences
            </li>
            <li className="font-medium">
              Check the Features and Limits panels to understand each tier
            </li>
            <li className="font-medium">
              To permanently change the tier, edit{' '}
              <code className="rounded bg-gray-100 px-2 py-1 text-sm">ACTIVE_TIER</code> in{' '}
              <code className="rounded bg-gray-100 px-2 py-1 text-sm">
                config/coffeeshop.config.ts
              </code>
            </li>
            <li className="font-medium">
              Navigate to the main app to see how features are enabled/disabled
            </li>
            <li className="font-medium">Test upgrade/downgrade flows to ensure data integrity</li>
          </ol>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4">
          <Button variant="primary" size="lg" onClick={() => (window.location.href = '/')}>
            View Main App
          </Button>
          <Button variant="secondary" size="lg" onClick={() => (window.location.href = '/menu')}>
            View Menu (Test Ordering)
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => (window.location.href = '/design-system')}
          >
            Design System
          </Button>
        </div>

        {/* V2 Component Testing Section */}
        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-bold text-gray-900">
            V2 Component Testing - TierGate & UpgradePrompt
          </h2>
          <p className="mb-6 text-gray-600">
            Live examples of tier-gated components with different fallback modes. Based on the
            current tier: <Badge variant="primary">{coffeeshopConfig.activeTier}</Badge>
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* TierGate Examples */}
            <Card variant="elevated" padding="lg" className="bg-white">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <ShoppingCart size={24} weight="duotone" />
                TierGate Component
              </h3>

              <div className="space-y-6">
                {/* Hide fallback (Cart - PRO feature) */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    <code>fallback="hide"</code> - Cart (PRO)
                  </p>
                  <TierGate feature="enableCart" fallback="hide">
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
                      <ShoppingCart size={20} weight="fill" className="text-green-600" />
                      <span className="font-medium text-green-800">
                        Cart is visible (PRO enabled)
                      </span>
                    </div>
                  </TierGate>
                  <p className="mt-1 text-xs text-gray-500">
                    If not visible, Cart requires PRO tier or higher
                  </p>
                </div>

                {/* Upgrade fallback (Analytics - ENTERPRISE) */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    <code>fallback="upgrade"</code> - Analytics (ENTERPRISE)
                  </p>
                  <TierGate feature="enableAnalytics" fallback="upgrade" upgradeVariant="inline">
                    <div className="flex items-center gap-2 rounded-lg border border-purple-200 bg-purple-50 p-3">
                      <ChartBar size={20} weight="fill" className="text-purple-600" />
                      <span className="font-medium text-purple-800">Analytics Dashboard</span>
                    </div>
                  </TierGate>
                </div>

                {/* Disable fallback (Delivery - ENTERPRISE) */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    <code>fallback="disable"</code> - Delivery (ENTERPRISE)
                  </p>
                  <TierGate feature="enableDelivery" fallback="disable">
                    <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-3">
                      <Truck size={20} weight="fill" className="text-blue-600" />
                      <span className="font-medium text-blue-800">Delivery Options</span>
                    </div>
                  </TierGate>
                </div>

                {/* Custom fallback */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    <code>fallback={'{<Custom />}'}</code> - Multi-Venue (ENTERPRISE)
                  </p>
                  <TierGate
                    feature="enableMultiVenue"
                    fallback={
                      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-center">
                        <Rocket
                          size={24}
                          weight="duotone"
                          className="mx-auto mb-1 text-amber-600"
                        />
                        <p className="text-sm font-medium text-amber-800">
                          Multi-venue coming soon!
                        </p>
                        <p className="text-xs text-amber-600">Upgrade to Enterprise</p>
                      </div>
                    }
                  >
                    <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 p-3">
                      <Star size={20} weight="fill" className="text-green-600" />
                      <span className="font-medium text-green-800">Multi-Venue Manager</span>
                    </div>
                  </TierGate>
                </div>
              </div>
            </Card>

            {/* TierGateInline & UpgradePrompt */}
            <Card variant="elevated" padding="lg" className="bg-white">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-gray-900">
                <Star size={24} weight="duotone" />
                TierGateInline & UpgradePrompt
              </h3>

              <div className="space-y-6">
                {/* TierGateInline */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    TierGateInline - Inline lock badge
                  </p>
                  <div className="flex items-center gap-4">
                    <TierGateInline feature="enableCart">
                      <button className="flex items-center gap-2 rounded-lg bg-stone-100 px-4 py-2">
                        <ShoppingCart size={18} />
                        <span>Add to Cart</span>
                      </button>
                    </TierGateInline>

                    <TierGateInline feature="enableDelivery">
                      <button className="flex items-center gap-2 rounded-lg bg-stone-100 px-4 py-2">
                        <Truck size={18} />
                        <span>Delivery</span>
                      </button>
                    </TierGateInline>
                  </div>
                </div>

                {/* UpgradeBadge */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    UpgradeBadge - Compact tier indicators
                  </p>
                  <div className="flex items-center gap-2">
                    <UpgradeBadge tier="pre-ordering" />
                    <UpgradeBadge tier="full-suite" />
                  </div>
                </div>

                {/* UpgradePrompt variants */}
                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    UpgradePrompt - Badge variant
                  </p>
                  <UpgradePrompt feature="enableAnalytics" variant="badge" />
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    UpgradePrompt - Button variant
                  </p>
                  <UpgradePrompt feature="enableAnalytics" variant="button" />
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    UpgradePrompt - Inline variant
                  </p>
                  <UpgradePrompt feature="enableDelivery" variant="inline" />
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-gray-600">
                    UpgradePrompt - Banner variant
                  </p>
                  <UpgradePrompt
                    feature="enableInventoryManagement"
                    variant="banner"
                    message="Manage inventory in real-time"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Card variant (full width) */}
          <div className="mt-6">
            <p className="mb-2 text-sm font-medium text-gray-600">
              UpgradePrompt - Card variant (detailed upgrade CTA)
            </p>
            <div className="max-w-lg">
              <UpgradePrompt
                feature="enableWhiteLabel"
                variant="card"
                onUpgrade={() => alert('Upgrade clicked! In production, this opens pricing page.')}
              />
            </div>
          </div>

          {/* Feature Comparison Matrix */}
          <Card variant="elevated" padding="lg" className="mt-8 bg-white">
            <h3 className="mb-4 text-xl font-bold text-gray-900">Feature Availability by Tier</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">Feature</th>
                    {allTiers.map((tier) => (
                      <th
                        key={tier.id}
                        className="px-4 py-3 text-center font-semibold"
                        style={{
                          color: tier.id === coffeeshopConfig.activeTier ? '#2563eb' : '#374151',
                        }}
                      >
                        {tier.branding.icon} {tier.branding.badge}
                        {tier.id === coffeeshopConfig.activeTier && ' (active)'}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(allTiers[0].features).map((featureKey) => (
                    <tr key={featureKey} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-800">{formatFeatureName(featureKey)}</td>
                      {allTiers.map((tier) => (
                        <td key={tier.id} className="px-4 py-3 text-center">
                          {tier.features[featureKey as keyof typeof tier.features] ? (
                            <span className="font-bold text-green-600">✓</span>
                          ) : (
                            <span className="text-red-400">✗</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/**
 * Format feature key to human-readable name
 */
function formatFeatureName(key: string): string {
  const nameMap: Record<string, string> = {
    enableLanguageSelector: 'Language Selector',
    enableCurrencyConverter: 'Currency Converter',
    enableSearch: 'Search',
    enablePackages: 'Combo Packages',
    enablePromotions: 'Promotions & Offers',
    enableCart: 'Shopping Cart',
    enableTableOrdering: 'Table Ordering',
    enableTakeaway: 'Takeaway Orders',
    enableDelivery: 'Delivery Service',
    enableEngagementSystem: 'Customer Engagement',
    enableInventoryManagement: 'Inventory Management',
    enableAnalytics: 'Advanced Analytics',
    enableStaffManagement: 'Staff Management',
    enableMultiVenue: 'Multi-Venue Support',
    enableWhiteLabel: 'White-Label Branding',
  };

  return (
    nameMap[key] ||
    key
      .replace('enable', '')
      .replace(/([A-Z])/g, ' $1')
      .trim()
  );
}

/**
 * Format limit key to human-readable name
 */
function formatLimitName(key: string): string {
  const nameMap: Record<string, string> = {
    maxProducts: 'Menu Items',
    maxLanguages: 'Languages',
    maxQRCodes: 'QR Codes',
    maxOrders: 'Monthly Orders',
    maxStaff: 'Staff Accounts',
    maxVenues: 'Venues',
  };

  return (
    nameMap[key] ||
    key
      .replace('max', '')
      .replace(/([A-Z])/g, ' $1')
      .trim()
  );
}
