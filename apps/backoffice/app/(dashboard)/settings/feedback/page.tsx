'use client';

import { useTenant } from '@/lib/contexts/TenantContext';
import { FeedbackSubmissionManager } from '@/components/settings/FeedbackSubmissionManager';
import { Loader2 } from 'lucide-react';

export default function FeedbackPage() {
  const { brand, location, isLoading } = useTenant();

  const merchantId = location?.id || brand?.id;

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
            Per inviare feedback, seleziona prima un locale dal menu in alto.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Segnalazioni e Feedback</h1>
        <p className="mt-1 text-sm text-gray-500">
          Invia segnalazioni di bug, richieste di funzionalita o feedback. Scrivi in qualsiasi
          lingua.
        </p>
      </div>

      {/* Manager Component */}
      <FeedbackSubmissionManager merchantId={merchantId} />
    </div>
  );
}
