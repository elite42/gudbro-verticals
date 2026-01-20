'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPartnerDashboard, PartnerDashboard } from '@/lib/partner-service';
import { InfoTooltip } from '@/components/ui/info-tooltip';

export default function PartnerPortalPage() {
  const [dashboard, setDashboard] = useState<PartnerDashboard | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboard() {
      try {
        // In production, get partnerId from session
        const partnerId = 'demo-partner-id';
        const data = await getPartnerDashboard(partnerId);
        setDashboard(data);
      } catch {
        setError('Failed to load dashboard');
      } finally {
        setIsLoading(false);
      }
    }

    fetchDashboard();
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (error || !dashboard) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-red-800">{error || 'Failed to load partner dashboard'}</p>
      </div>
    );
  }

  const { partner, metrics, recentOrganizations } = dashboard;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">Partner Portal</h1>
            <InfoTooltip contentKey="pages.partnerPortal" kbPageId="partner-portal" />
          </div>
          <p className="mt-1 text-sm text-gray-500">Welcome back, {partner.name}</p>
        </div>
        <Link
          href="/partner/organizations/new"
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add Organization
        </Link>
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Organizations"
          value={metrics.totalOrganizations}
          icon="🏢"
          trend={
            metrics.thisMonthSignups > 0 ? `+${metrics.thisMonthSignups} this month` : undefined
          }
        />
        <MetricCard title="Active" value={metrics.activeOrganizations} icon="✓" color="green" />
        <MetricCard title="Locations" value={metrics.totalLocations} icon="📍" />
        <MetricCard
          title="This Month Revenue"
          value={`$${metrics.thisMonthRevenue.toLocaleString()}`}
          icon="💰"
          color="amber"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 sm:grid-cols-3">
        <QuickActionCard
          title="Organizations"
          description="View and manage your client organizations"
          href="/partner/organizations"
          icon="🏢"
        />
        <QuickActionCard
          title="Billing"
          description="View royalties and payout history"
          href="/partner/billing"
          icon="💳"
        />
        <QuickActionCard
          title="Settings"
          description="Update your branding and domain"
          href="/partner/settings"
          icon="⚙️"
        />
      </div>

      {/* Recent Organizations */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-semibold text-gray-900">Recent Organizations</h2>
          <Link href="/partner/organizations" className="text-sm text-blue-600 hover:underline">
            View all
          </Link>
        </div>

        {recentOrganizations.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500">No organizations yet</p>
            <Link
              href="/partner/organizations/new"
              className="mt-2 inline-block text-sm text-blue-600 hover:underline"
            >
              Add your first organization
            </Link>
          </div>
        ) : (
          <div className="divide-y">
            {recentOrganizations.map((org) => (
              <Link
                key={org.id}
                href={`/partner/organizations/${org.id}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div>
                  <p className="font-medium text-gray-900">{org.name}</p>
                  <p className="text-sm text-gray-500">
                    {org.brandCount} brand{org.brandCount !== 1 ? 's' : ''} &bull;{' '}
                    {org.locationCount} location{org.locationCount !== 1 ? 's' : ''}
                  </p>
                </div>
                <div className="text-right">
                  <StatusBadge status={org.isActive ? 'active' : 'inactive'} />
                  <p className="mt-1 text-xs text-gray-500">{org.subscriptionPlan} plan</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Territory Info */}
      {partner.territoryCodes.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="font-semibold text-gray-900">Your Territory</h2>
          <p className="mt-1 text-sm text-gray-500">You have exclusive rights to these regions</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {partner.territoryCodes.map((code) => (
              <span
                key={code}
                className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800"
              >
                {code}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Metric Card Component
function MetricCard({
  title,
  value,
  icon,
  trend,
  color = 'blue',
}: {
  title: string;
  value: number | string;
  icon: string;
  trend?: string;
  color?: 'blue' | 'green' | 'amber' | 'red';
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    amber: 'bg-amber-100 text-amber-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      <div className="flex items-center gap-3">
        <span className={`rounded-lg p-2 text-xl ${colorClasses[color]}`}>{icon}</span>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && <p className="text-xs text-green-600">{trend}</p>}
        </div>
      </div>
    </div>
  );
}

// Quick Action Card Component
function QuickActionCard({
  title,
  description,
  href,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-md"
    >
      <span className="text-3xl">{icon}</span>
      <h3 className="mt-3 font-semibold text-gray-900 group-hover:text-blue-600">{title}</h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </Link>
  );
}

// Status Badge Component
function StatusBadge({ status }: { status: 'active' | 'inactive' | 'pending' }) {
  const styles = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span className={`rounded-full px-2 py-1 text-xs font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
