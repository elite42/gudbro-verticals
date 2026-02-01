'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Buildings,
  Bed,
  CalendarBlank,
  Gear,
  ArrowRight,
  Storefront,
  ChartBar,
  Tray,
} from '@phosphor-icons/react';
import { Loader2 } from 'lucide-react';

const PROPERTY_ID = process.env.NEXT_PUBLIC_ACCOM_PROPERTY_ID || '';
const ADMIN_API_KEY = process.env.NEXT_PUBLIC_ADMIN_API_KEY || '';

function authHeaders(): HeadersInit {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${ADMIN_API_KEY}`,
  };
}

interface OnboardingProgress {
  completed_steps: string[];
  current_step: string | null;
  started_at: string | null;
  completed_at: string | null;
}

interface DashboardProperty {
  id: string;
  name: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  onboarding_progress: OnboardingProgress | null;
}

function shouldShowWizard(property: DashboardProperty): boolean {
  // If onboarding was explicitly completed, never show
  if (property.onboarding_progress?.completed_at) return false;

  // Check if property is already configured (pre-existing properties)
  const hasName = !!property.name && property.name !== 'My Property';
  const hasContact = !!property.contact_phone || !!property.contact_email;

  // If property already has basic config, skip wizard
  return !(hasName && hasContact);
}

const DASHBOARD_LINKS = [
  {
    href: '/accommodations/rooms',
    label: 'Rooms',
    description: 'Manage rooms, pricing, and availability',
    Icon: Bed,
    color: 'text-blue-600 bg-blue-50',
  },
  {
    href: '/accommodations/bookings',
    label: 'Bookings',
    description: 'View and manage guest reservations',
    Icon: CalendarBlank,
    color: 'text-purple-600 bg-purple-50',
  },
  {
    href: '/accommodations/services',
    label: 'Services',
    description: 'Airport transfers, tours, and extras',
    Icon: Tray,
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    href: '/accommodations/analytics',
    label: 'Analytics',
    description: 'Occupancy rates, revenue, and trends',
    Icon: ChartBar,
    color: 'text-amber-600 bg-amber-50',
  },
  {
    href: '/accommodations/deals',
    label: 'Local Deals',
    description: 'Partner deals for your guests',
    Icon: Storefront,
    color: 'text-pink-600 bg-pink-50',
  },
  {
    href: '/accommodations/settings',
    label: 'Settings',
    description: 'Property info, policies, and WiFi',
    Icon: Gear,
    color: 'text-gray-600 bg-gray-100',
  },
];

export default function AccommodationsDashboardPage() {
  const [property, setProperty] = useState<DashboardProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    if (!PROPERTY_ID) {
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const res = await fetch(`/api/accommodations/property?propertyId=${PROPERTY_ID}`, {
          headers: authHeaders(),
        });
        const data = await res.json();
        if (data.property) {
          setProperty(data.property);
        }
      } catch (err) {
        console.error('Error loading property:', err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (!PROPERTY_ID) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <h1 className="text-2xl font-bold text-gray-900">Accommodations</h1>
        <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
          <p className="font-medium text-amber-800">No property configured</p>
          <p className="mt-1 text-sm text-amber-600">
            Set the{' '}
            <code className="rounded bg-amber-100 px-1 py-0.5">NEXT_PUBLIC_ACCOM_PROPERTY_ID</code>{' '}
            environment variable to get started.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const showBanner = property && shouldShowWizard(property) && !bannerDismissed;
  const completedCount = property?.onboarding_progress?.completed_steps?.length || 0;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Accommodations</h1>
        {property?.name && <p className="text-sm text-gray-500">{property.name}</p>}
      </div>

      {/* Onboarding Banner */}
      {showBanner && (
        <div className="mb-6 rounded-xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                <Buildings className="h-6 w-6 text-indigo-600" weight="duotone" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Complete your property setup</h3>
                <p className="text-sm text-gray-600">
                  {completedCount} of 6 steps done — finish setup so guests can find and book your
                  property
                </p>
                {/* Progress bar */}
                <div className="mt-2 h-1.5 w-48 rounded-full bg-indigo-100">
                  <div
                    className="h-1.5 rounded-full bg-indigo-500 transition-all"
                    style={{ width: `${(completedCount / 6) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setBannerDismissed(true)}
                className="text-xs text-gray-400 hover:text-gray-600"
              >
                Dismiss
              </button>
              <Link
                href="/accommodations/onboarding"
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
              >
                Continue Setup
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {DASHBOARD_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className={`rounded-lg p-2.5 ${link.color}`}>
                <link.Icon className="h-5 w-5" weight="duotone" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">
                  {link.label}
                </h3>
                <p className="mt-0.5 text-sm text-gray-500">{link.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-gray-300 transition-colors group-hover:text-blue-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
