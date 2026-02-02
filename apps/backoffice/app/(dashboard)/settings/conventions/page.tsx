'use client';

import { useState, useEffect } from 'react';
import { Handshake } from '@phosphor-icons/react';
import { useTenant } from '@/lib/contexts/TenantContext';

interface ConventionItem {
  id: string;
  partnerName: string;
  conventionName: string;
  benefitType: string;
  benefitValue: number;
  benefitScope: string;
  benefitDescription: string | null;
  validFrom: string;
  validUntil: string | null;
  isActive: boolean;
  totalRedemptions: number;
}

function formatBenefit(type: string, value: number, scope: string): string {
  let label = '';
  switch (type) {
    case 'percentage_discount':
      label = `${value}% off`;
      break;
    case 'fixed_discount':
      label = `$${value} off`;
      break;
    case 'free_item':
      label = 'Free item';
      break;
    case 'special_price':
      label = `$${value} special price`;
      break;
    case 'points_multiplier':
      label = `${value}x points`;
      break;
    default:
      label = 'Discount';
  }

  if (scope === 'per_night') return `${label} per night`;
  if (scope === 'per_stay') return `${label} per stay`;
  return label;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export default function ConventionsSettingsPage() {
  const { location, isLoading: tenantLoading } = useTenant();
  const [conventions, setConventions] = useState<ConventionItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const merchantId = location?.id;

  useEffect(() => {
    if (tenantLoading || !merchantId) {
      setLoading(false);
      return;
    }

    async function fetchData() {
      try {
        const res = await fetch(`/api/settings/conventions?merchantId=${merchantId}`);
        if (!res.ok) {
          setError('Failed to load conventions');
          return;
        }
        const json = await res.json();
        setConventions(json.data?.conventions || []);
      } catch {
        setError('Failed to load conventions');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [merchantId, tenantLoading]);

  if (tenantLoading || loading) {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Handshake size={24} weight="duotone" className="text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Convention Partnerships</h2>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            Active conventions from partner merchants offering deals to your guests.
          </p>
        </div>
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
              <div className="h-5 w-1/3 rounded bg-gray-200" />
              <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-2">
            <Handshake size={24} weight="duotone" className="text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Convention Partnerships</h2>
          </div>
        </div>
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <Handshake size={24} weight="duotone" className="text-purple-600" />
          <h2 className="text-lg font-semibold text-gray-900">Convention Partnerships</h2>
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Active conventions from partner merchants offering deals to your guests.
        </p>
      </div>

      {/* Convention Cards */}
      {conventions.length > 0 ? (
        <div className="space-y-4">
          {conventions.map((conv) => (
            <div key={conv.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{conv.conventionName}</h3>
                  <p className="mt-0.5 text-sm text-gray-500">{conv.partnerName}</p>
                </div>
                <span className="rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700">
                  Active
                </span>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-lg bg-purple-50 px-2.5 py-1 font-medium text-purple-700">
                  {formatBenefit(conv.benefitType, conv.benefitValue, conv.benefitScope)}
                </span>
                <span className="text-gray-500">
                  {formatDate(conv.validFrom)} &mdash;{' '}
                  {conv.validUntil ? formatDate(conv.validUntil) : 'No expiry'}
                </span>
                <span className="text-gray-500">
                  {conv.totalRedemptions} redemption{conv.totalRedemptions !== 1 ? 's' : ''}
                </span>
              </div>

              {conv.benefitDescription && (
                <p className="mt-2 text-sm text-gray-600">{conv.benefitDescription}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <Handshake size={40} weight="duotone" className="mx-auto text-gray-400" />
          <h3 className="mt-3 font-medium text-gray-900">No active conventions</h3>
          <p className="mt-1 text-sm text-gray-500">
            Partner merchants can create conventions linked to your property.
          </p>
        </div>
      )}
    </div>
  );
}
