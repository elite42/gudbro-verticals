'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { useTenant } from '@/lib/contexts/TenantContext';
import { useIsMobile } from '@/lib/hooks/useIsMobile';
import {
  OnboardingChecklist,
  useOnboardingSteps,
} from '@/components/onboarding/OnboardingChecklist';
import { AIPrioritiesHero, MobileCommandCenter } from '@/components/ai';
import { OpportunityBannerWrapper } from '@/components/ai/OpportunityBanner';
import { FoodCostProgress } from '@/components/food-cost';

export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface DashboardStats {
  menuItems: number;
  categories: number;
  ingredients: number;
  activeItems: number;
}

const recentScans = [
  { id: 1, location: 'Table 5', time: '2 min ago', device: 'iPhone', language: 'Korean' },
  { id: 2, location: 'Table 3', time: '5 min ago', device: 'Android', language: 'English' },
  { id: 3, location: 'Table 8', time: '12 min ago', device: 'iPhone', language: 'Vietnamese' },
  { id: 4, location: 'Table 1', time: '18 min ago', device: 'Android', language: 'English' },
  { id: 5, location: 'Table 6', time: '25 min ago', device: 'iPhone', language: 'Japanese' },
];

const quickActions = [
  { name: 'Add Menu Item', href: '/content/menu/new', icon: '🍽️' },
  { name: 'Manage Categories', href: '/content/categories', icon: '📂' },
  { name: 'Translate Content', href: '/translations', icon: '🌍' },
  { name: 'View Analytics', href: '/analytics', icon: '📊' },
];

// Default onboarding steps
const defaultOnboardingSteps = [
  {
    id: 'restaurant-details',
    title: 'Restaurant Details',
    description: 'Add your restaurant name, logo, and contact information',
    href: '/settings',
    icon: '🏪',
  },
  {
    id: 'create-menu',
    title: 'Create Menu',
    description: 'Set up your menu categories and structure',
    href: '/content/categories',
    icon: '📋',
  },
  {
    id: 'add-items',
    title: 'Add Menu Items',
    description: 'Add dishes with prices, descriptions, and allergen info',
    href: '/content/menu',
    icon: '🍽️',
  },
  {
    id: 'customize-qr',
    title: 'Customize QR Code',
    description: 'Generate and customize your QR codes for tables',
    href: '/qr-codes',
    icon: '📱',
  },
];

export default function DashboardPage() {
  const {
    organization,
    brand,
    location,
    brands,
    locations,
    isLoading: tenantLoading,
  } = useTenant();
  const { steps: onboardingSteps, completeStep } = useOnboardingSteps(defaultOnboardingSteps);
  const isMobile = useIsMobile();

  const [stats, setStats] = useState<DashboardStats>({
    menuItems: 0,
    categories: 0,
    ingredients: 0,
    activeItems: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentItems, setRecentItems] = useState<
    { name: string; price: number; created: string }[]
  >([]);

  useEffect(() => {
    async function fetchStats() {
      try {
        // Fetch menu items count
        const { count: itemCount } = await supabase
          .from('menu_items')
          .select('*', { count: 'exact', head: true });

        // Fetch active items count
        const { count: activeCount } = await supabase
          .from('menu_items')
          .select('*', { count: 'exact', head: true })
          .eq('is_available', true);

        // Fetch categories count
        const { count: catCount } = await supabase
          .from('menu_categories')
          .select('*', { count: 'exact', head: true });

        // Fetch ingredients count
        const { count: ingCount } = await supabase
          .from('ingredients')
          .select('*', { count: 'exact', head: true });

        // Fetch recent items
        const { data: recent } = await supabase
          .from('menu_items')
          .select('name_multilang, price, created_at')
          .order('created_at', { ascending: false })
          .limit(5);

        setStats({
          menuItems: itemCount || 0,
          categories: catCount || 0,
          ingredients: ingCount || 0,
          activeItems: activeCount || 0,
        });

        if (recent) {
          setRecentItems(
            recent.map((item) => ({
              name: item.name_multilang?.en || 'Unnamed',
              price: item.price,
              created: new Date(item.created_at).toLocaleDateString(),
            }))
          );
        }
      } catch (err) {
        console.error('Error fetching stats:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statsDisplay = [
    { name: 'Menu Items', value: stats.menuItems.toString(), icon: '🍽️', color: 'blue' },
    { name: 'Active Items', value: stats.activeItems.toString(), icon: '✅', color: 'green' },
    { name: 'Categories', value: stats.categories.toString(), icon: '📂', color: 'purple' },
    { name: 'Ingredients', value: stats.ingredients.toString(), icon: '🥕', color: 'orange' },
  ];

  // Mobile Command Mode - Show simplified decision interface on mobile
  if (isMobile) {
    return <MobileCommandCenter />;
  }

  return (
    <div className="space-y-8">
      {/* Page header with tenant info */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        {tenantLoading ? (
          <div className="mt-1 h-5 w-64 animate-pulse rounded bg-gray-200" />
        ) : organization ? (
          <p className="mt-1 text-gray-500">
            Welcome back! Managing{' '}
            <span className="font-medium text-gray-700">{brand?.name || organization.name}</span>
            {location && (
              <>
                {' '}
                &middot; <span className="text-gray-600">{location.name}</span>
                {location.city && <span className="text-gray-500"> ({location.city})</span>}
              </>
            )}
          </p>
        ) : (
          <p className="mt-1 text-gray-500">
            Get started by{' '}
            <Link href="/onboarding" className="text-blue-600 hover:underline">
              creating your first organization
            </Link>
          </p>
        )}
      </div>

      {/* AI Priorities Hero - Main decision center */}
      <AIPrioritiesHero />

      {/* Opportunity Banner - Top opportunity highlight */}
      <OpportunityBannerWrapper />

      {/* Onboarding Checklist */}
      <OnboardingChecklist steps={onboardingSteps} onStepComplete={completeStep} />

      {/* Tenant Overview Cards */}
      {organization && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Organization Card */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                <span className="text-xl">🏢</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Organization</p>
                <p className="font-semibold text-gray-900">{organization.name}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 text-sm">
              <span className="capitalize text-gray-500">{organization.type}</span>
              <span className="capitalize text-gray-500">
                {organization.subscription_plan || 'Free'} plan
              </span>
            </div>
          </div>

          {/* Brands Card */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg font-semibold text-white"
                style={{ backgroundColor: brand?.primary_color || '#6B7280' }}
              >
                {brand?.name?.charAt(0) || 'B'}
              </div>
              <div>
                <p className="text-sm text-gray-500">Brand</p>
                <p className="font-semibold text-gray-900">{brand?.name || 'No brand selected'}</p>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 text-sm">
              <span className="capitalize text-gray-500">{brand?.business_type || '-'}</span>
              <span className="text-gray-500">
                {brands.length} brand{brands.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>

          {/* Locations Card */}
          <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <span className="text-xl">📍</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-semibold text-gray-900">
                  {location?.name || 'No location selected'}
                </p>
              </div>
            </div>
            <div className="mt-3 flex justify-between border-t border-gray-100 pt-3 text-sm">
              <span className="text-gray-500">
                {location?.city || location?.country_code || '-'}
              </span>
              <span className="text-gray-500">
                {locations.length} location{locations.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsDisplay.map((stat) => (
          <div key={stat.name} className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-500">{stat.name}</p>
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="mt-2">
              {loading ? (
                <div className="h-9 w-16 animate-pulse rounded bg-gray-200"></div>
              ) : (
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Recent Scans */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm lg:col-span-2">
          <div className="border-b border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
              <Link
                href="/analytics"
                className="text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {recentItems.length > 0
              ? recentItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                        <span className="text-lg">🍽️</span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          {new Intl.NumberFormat('vi-VN').format(item.price)} VND
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{item.created}</p>
                  </div>
                ))
              : recentScans.map((scan) => (
                  <div key={scan.id} className="flex items-center justify-between px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                        <svg
                          className="h-5 w-5 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{scan.location}</p>
                        <p className="text-sm text-gray-500">
                          {scan.device} - {scan.language}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{scan.time}</p>
                  </div>
                ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm">
          <div className="border-b border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          </div>
          <div className="space-y-2 p-4">
            {quickActions.map((action) => (
              <Link
                key={action.name}
                href={action.href}
                className="flex items-center gap-4 rounded-lg p-4 transition-colors hover:bg-gray-50"
              >
                <span className="text-2xl">{action.icon}</span>
                <span className="font-medium text-gray-900">{action.name}</span>
                <svg
                  className="ml-auto h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Food Cost Tracker Widget */}
      <FoodCostProgress />

      {/* Location Info (if available) */}
      {location && (
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="mb-4 font-semibold text-gray-900">Current Location Details</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div>
              <p className="text-sm text-gray-500">Currency</p>
              <p className="font-medium text-gray-900">{location.currency_code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Primary Language</p>
              <p className="font-medium text-gray-900">
                {location.primary_language?.toUpperCase()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Country</p>
              <p className="font-medium text-gray-900">{location.country_code}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Languages Enabled</p>
              <p className="font-medium text-gray-900">{location.enabled_languages?.length || 1}</p>
            </div>
          </div>
        </div>
      )}

      {/* Sistema 5 Dimensioni Info */}
      <div className="rounded-xl bg-gradient-to-r from-green-600 to-teal-600 p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="text-3xl">🛡️</div>
          <div>
            <h3 className="text-lg font-semibold">Sistema 5 Dimensioni Active</h3>
            <p className="mt-1 text-green-100">
              Your menu items are protected with comprehensive food safety data: 30 allergens (EU 14
              + Korea 7 + Japan 7 + GUDBRO 2), 10 intolerances, 11 dietary restrictions, and 5 spice
              levels.
            </p>
            <Link
              href="/content/ingredients"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-medium transition-colors hover:bg-white/30"
            >
              Manage Ingredients
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-start gap-4">
          <div className="text-3xl">💡</div>
          <div>
            <h3 className="text-lg font-semibold">Pro Tip: AI Translation</h3>
            <p className="mt-1 text-blue-100">
              Translate your menu into multiple languages with one click using our AI-powered
              translation engine. Support for Vietnamese, Korean, Japanese, Chinese, and more.
            </p>
            <Link
              href="/translations"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-white/20 px-4 py-2 font-medium transition-colors hover:bg-white/30"
            >
              Translate Now
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
