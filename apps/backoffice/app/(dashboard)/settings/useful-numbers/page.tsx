'use client';

import { useTenant } from '@/lib/contexts/TenantContext';
import { UsefulNumbersManager } from '@/components/settings/UsefulNumbersManager';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import { Loader2 } from 'lucide-react';

export default function UsefulNumbersPage() {
  const { brand, location, isLoading } = useTenant();

  // Get merchant info - country_code and city are only available on Location, not Brand
  const merchantId = location?.id || brand?.id;
  const countryCode = location?.country_code || 'IT';
  const cityName = location?.city || undefined;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!merchantId) {
    return (
      <div className="max-w-4xl">
        <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-6">
          <h2 className="font-semibold text-yellow-900">Seleziona un locale</h2>
          <p className="mt-1 text-sm text-yellow-700">
            Per gestire i numeri utili, seleziona prima un locale dal menu in alto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-gray-900">Numeri Utili</h1>
          <InfoTooltip contentKey="pages.usefulNumbers" kbPageId="settings-useful-numbers" />
        </div>
        <p className="mt-1 text-sm text-gray-500">
          Numeri di emergenza e servizi utili per i tuoi clienti. Vengono mostrati nella PWA.
        </p>
      </div>

      {/* Manager Component */}
      <UsefulNumbersManager
        merchantId={merchantId}
        countryCode={countryCode}
        cityName={cityName}
      />
    </div>
  );
}
