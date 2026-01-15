'use client';

import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export type DecisionLevel = 'critical' | 'warning';

export interface MobileDecision {
  id: string;
  level: DecisionLevel;
  title: string;
  timeframe?: string;
  impact: string;
  suggestion: string;
  actions: {
    primary: {
      label: string;
      icon?: string;
      action: () => Promise<void> | void;
    };
    secondary: {
      label: string;
      icon?: string;
      action: () => Promise<void> | void;
    };
  };
}

interface MobileDecisionCardProps {
  decision: MobileDecision;
  number: number;
}

const levelConfig = {
  critical: {
    badge: '🔴',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    primaryBtn: 'bg-red-600 hover:bg-red-700 active:bg-red-800',
  },
  warning: {
    badge: '🟠',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    primaryBtn: 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800',
  },
};

export function MobileDecisionCard({ decision, number }: MobileDecisionCardProps) {
  const [loading, setLoading] = useState<'primary' | 'secondary' | null>(null);
  const [dismissed, setDismissed] = useState(false);

  const config = levelConfig[decision.level];

  const handleAction = async (type: 'primary' | 'secondary') => {
    setLoading(type);
    try {
      await decision.actions[type].action();
      if (type === 'secondary') {
        setDismissed(true);
      }
    } finally {
      setLoading(null);
    }
  };

  if (dismissed) return null;

  return (
    <div className={`rounded-2xl border-2 p-4 ${config.bgColor} ${config.borderColor}`}>
      {/* Header */}
      <div className="mb-3 flex items-center gap-2">
        <span className="text-lg">{config.badge}</span>
        <span className="text-sm font-bold text-gray-700">DECISIONE #{number}</span>
        <span className="text-sm text-gray-500">—</span>
        <span className="flex-1 truncate text-sm font-medium text-gray-900">{decision.title}</span>
      </div>

      {/* Info Row */}
      <div className="mb-3 flex items-center gap-3 text-sm">
        {decision.timeframe && (
          <span className="rounded-full bg-white/60 px-2 py-0.5 text-gray-600">
            ⏰ {decision.timeframe}
          </span>
        )}
        <span className="rounded-full bg-white/60 px-2 py-0.5 font-medium text-gray-900">
          💰 {decision.impact}
        </span>
      </div>

      {/* Suggestion */}
      <p className="mb-4 text-sm leading-relaxed text-gray-700">"{decision.suggestion}"</p>

      {/* Action Buttons - Large for mobile */}
      <div className="flex gap-3">
        <button
          onClick={() => handleAction('primary')}
          disabled={loading !== null}
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-base font-bold text-white shadow-sm transition-all disabled:opacity-50 ${config.primaryBtn}`}
        >
          {loading === 'primary' ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <span>{decision.actions.primary.icon || '✔️'}</span>
              <span>{decision.actions.primary.label}</span>
            </>
          )}
        </button>
        <button
          onClick={() => handleAction('secondary')}
          disabled={loading !== null}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white px-4 py-3.5 text-base font-bold text-gray-700 shadow-sm transition-all hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50"
        >
          {loading === 'secondary' ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <span>{decision.actions.secondary.icon || '❌'}</span>
              <span>{decision.actions.secondary.label}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
