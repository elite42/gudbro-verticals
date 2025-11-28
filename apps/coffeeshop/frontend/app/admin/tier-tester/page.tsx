'use client';

import { useState } from 'react';
import { getAllTiers, getUpgradeFeatures, calculateUpgradeSavings, TierLevel } from '@/lib/tier-system';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert } from '@/components/ui/alert';

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
  const currentTier = allTiers.find(t => t.id === selectedTier)!;

  // Simulate usage stats for limit testing
  const [usageStats] = useState({
    products: 13, // Current ROOTS products
    languages: 3,  // EN, VI, IT
    qrCodes: 1,
    orders: 0,
    staff: 1,
    venues: 1,
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            SaaS Tier Tester
          </h1>
          <p className="text-gray-600">
            Test different subscription tiers to validate feature toggling and limits.
            Current active tier in config: <Badge variant="primary">{coffeeshopConfig.activeTier}</Badge>
          </p>
        </div>

        {/* Alert */}
        <Alert variant="warning" className="mb-8">
          <strong>Testing Mode:</strong> Changes here only affect this preview.
          To permanently change the tier, edit <code>ACTIVE_TIER</code> in <code>config/coffeeshop.config.ts</code>
        </Alert>

        {/* Tier Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
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
                className={`cursor-pointer transition-all hover:shadow-lg bg-white ${
                  isSelected ? 'ring-4 ring-blue-500 shadow-xl' : 'hover:shadow-md'
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="text-4xl mb-2">{tier.branding.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">
                    {tier.name}
                  </h3>
                  <Badge variant={isSelected ? 'success' : 'default'} className="mb-3">
                    {tier.branding.badge}
                  </Badge>
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    ${tier.price}<span className="text-base text-gray-600">/mo</span>
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
                  className="w-full mb-4"
                  onClick={() => setSelectedTier(tier.id)}
                >
                  {isSelected ? 'Current Selection' : 'Test This Tier'}
                </Button>

                {/* Features Summary */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">Ordering System</span>
                    <span className={`font-semibold ${tier.features.enableCart ? 'text-green-600' : 'text-red-600'}`}>
                      {tier.features.enableCart ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">Engagement</span>
                    <span className={`font-semibold ${tier.features.enableEngagementSystem ? 'text-green-600' : 'text-red-600'}`}>
                      {tier.features.enableEngagementSystem ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">Delivery</span>
                    <span className={`font-semibold ${tier.features.enableDelivery ? 'text-green-600' : 'text-red-600'}`}>
                      {tier.features.enableDelivery ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-800 font-medium">Analytics</span>
                    <span className={`font-semibold ${tier.features.enableAnalytics ? 'text-green-600' : 'text-red-600'}`}>
                      {tier.features.enableAnalytics ? '✓ Enabled' : '✗ Disabled'}
                    </span>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Detailed Tier Information */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Features */}
          <Card variant="elevated" padding="lg" className="bg-white">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Features for {currentTier.name}
            </h3>
            <div className="space-y-3">
              {Object.entries(currentTier.features).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-gray-800 font-medium">
                    {formatFeatureName(key)}
                  </span>
                  <Badge variant={value ? 'success' : 'error'}>
                    {value ? 'Enabled' : 'Disabled'}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>

          {/* Limits */}
          <Card variant="elevated" padding="lg" className="bg-white">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
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
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-800 font-medium">{formatLimitName(key)}</span>
                      <span className="text-sm font-bold text-gray-900">
                        {usage} / {isUnlimited ? '∞' : limit}
                      </span>
                    </div>
                    {!isUnlimited && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isOverLimit ? 'bg-red-600' :
                            isNearLimit ? 'bg-yellow-500' :
                            'bg-green-600'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                    )}
                    {isUnlimited && (
                      <Badge variant="primary">Unlimited</Badge>
                    )}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Instructions */}
        <Card variant="default" padding="lg" className="mt-8 bg-white">
          <h3 className="text-lg font-bold text-gray-900 mb-3">
            How to Use This Tester
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-800">
            <li className="font-medium">Click on different tier cards above to see feature differences</li>
            <li className="font-medium">Check the Features and Limits panels to understand each tier</li>
            <li className="font-medium">To permanently change the tier, edit <code className="bg-gray-100 px-2 py-1 rounded text-sm">ACTIVE_TIER</code> in <code className="bg-gray-100 px-2 py-1 rounded text-sm">config/coffeeshop.config.ts</code></li>
            <li className="font-medium">Navigate to the main app to see how features are enabled/disabled</li>
            <li className="font-medium">Test upgrade/downgrade flows to ensure data integrity</li>
          </ol>
        </Card>

        {/* Quick Actions */}
        <div className="mt-8 flex gap-4">
          <Button
            variant="primary"
            size="lg"
            onClick={() => window.location.href = '/'}
          >
            View Main App
          </Button>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => window.location.href = '/menu'}
          >
            View Menu (Test Ordering)
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.location.href = '/design-system'}
          >
            Design System
          </Button>
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

  return nameMap[key] || key.replace('enable', '').replace(/([A-Z])/g, ' $1').trim();
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

  return nameMap[key] || key.replace('max', '').replace(/([A-Z])/g, ' $1').trim();
}
