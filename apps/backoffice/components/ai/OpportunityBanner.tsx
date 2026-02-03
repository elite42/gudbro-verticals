'use client';

import { useState } from 'react';
import { Sparkle, X, ArrowRight, SpinnerGap } from '@phosphor-icons/react';

export interface Opportunity {
  id: string;
  message: string;
  impact: string;
  actionLabel: string;
  onAction: () => Promise<void> | void;
  onDismiss?: () => void;
}

interface OpportunityBannerProps {
  opportunity: Opportunity;
}

export function OpportunityBanner({ opportunity }: OpportunityBannerProps) {
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const handleAction = async () => {
    setLoading(true);
    try {
      await opportunity.onAction();
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    opportunity.onDismiss?.();
  };

  if (dismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-4 text-white shadow-lg">
      {/* Background decoration */}
      <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-white/10" />

      <div className="relative flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-white/20 p-2">
            <Sparkle className="h-5 w-5" />
          </div>
          <div>
            <p className="font-medium">{opportunity.message}</p>
            <p className="text-sm text-white/80">
              Impatto stimato: <span className="font-bold text-white">{opportunity.impact}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAction}
            disabled={loading}
            className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-purple-600 transition-all hover:bg-white/90 disabled:opacity-50"
          >
            {loading ? (
              <SpinnerGap className="h-4 w-4 animate-spin" />
            ) : (
              <>
                {opportunity.actionLabel}
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
          <button
            onClick={handleDismiss}
            className="rounded-lg p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
            title="Ignora"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Wrapper component that fetches opportunity data
export function OpportunityBannerWrapper() {
  const [opportunity, setOpportunity] = useState<Opportunity | null>({
    id: 'weather-promo',
    message: 'Con il meteo di oggi, puoi aumentare le vendite di bevande fredde',
    impact: '+12-15%',
    actionLabel: 'Crea Promo',
    onAction: () => {
      window.location.href = '/marketing/promotions';
    },
    onDismiss: () => {
      setOpportunity(null);
    },
  });

  if (!opportunity) return null;

  return <OpportunityBanner opportunity={opportunity} />;
}
