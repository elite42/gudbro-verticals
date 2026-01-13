'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Users,
  Utensils,
  CloudRain,
  Sun,
  DollarSign,
  Clock,
  CheckCircle,
  X,
  HelpCircle,
  Loader2,
} from 'lucide-react';

export type PriorityLevel = 'critical' | 'warning' | 'opportunity';
export type PriorityCategory = 'staffing' | 'weather' | 'promo' | 'food_cost' | 'general';

export interface AIPriority {
  id: string;
  level: PriorityLevel;
  category: PriorityCategory;
  title: string;
  description: string;
  impact?: string; // e.g., "+12%", "-€120", "-8% margin"
  timeframe?: string; // e.g., "16:00-18:00", "Today", "This week"
  confidence?: number; // 0-100
  actions: {
    primary: {
      label: string;
      action: () => Promise<void> | void;
    };
    secondary?: {
      label: string;
      action: () => Promise<void> | void;
    };
  };
  onDismiss?: () => void;
  onExplain?: () => void;
}

interface AIPriorityCardProps {
  priority: AIPriority;
  compact?: boolean;
}

const levelConfig = {
  critical: {
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    badgeColor: 'bg-red-100 text-red-700',
    badgeText: 'URGENTE',
    primaryBtn: 'bg-red-600 hover:bg-red-700 text-white',
  },
  warning: {
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
    badgeColor: 'bg-amber-100 text-amber-700',
    badgeText: 'ATTENZIONE',
    primaryBtn: 'bg-amber-600 hover:bg-amber-700 text-white',
  },
  opportunity: {
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    badgeColor: 'bg-green-100 text-green-700',
    badgeText: 'OPPORTUNITÀ',
    primaryBtn: 'bg-green-600 hover:bg-green-700 text-white',
  },
};

const categoryIcons = {
  staffing: Users,
  weather: Sun,
  promo: TrendingUp,
  food_cost: DollarSign,
  general: AlertTriangle,
};

export function AIPriorityCard({ priority, compact = false }: AIPriorityCardProps) {
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const config = levelConfig[priority.level];
  const Icon = categoryIcons[priority.category];

  const handlePrimaryAction = async () => {
    setLoading(true);
    try {
      await priority.actions.primary.action();
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setDismissed(true);
    priority.onDismiss?.();
  };

  if (dismissed) return null;

  if (compact) {
    return (
      <div
        className={`flex items-center justify-between rounded-lg border p-3 ${config.bgColor} ${config.borderColor}`}
      >
        <div className="flex items-center gap-3">
          <div className={`rounded-lg p-1.5 ${config.iconBg}`}>
            <Icon className={`h-4 w-4 ${config.iconColor}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">{priority.title}</p>
            {priority.impact && (
              <span className="text-xs font-semibold text-gray-600">{priority.impact}</span>
            )}
          </div>
        </div>
        <button
          onClick={handlePrimaryAction}
          disabled={loading}
          className={`rounded-lg px-3 py-1.5 text-xs font-medium ${config.primaryBtn} disabled:opacity-50`}
        >
          {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : priority.actions.primary.label}
        </button>
      </div>
    );
  }

  return (
    <div
      className={`relative flex flex-col rounded-xl border-2 p-4 transition-shadow hover:shadow-md ${config.bgColor} ${config.borderColor}`}
    >
      {/* Dismiss button */}
      <button
        onClick={handleDismiss}
        className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:bg-white/50 hover:text-gray-600"
        title="Ignora"
      >
        <X className="h-4 w-4" />
      </button>

      {/* Header */}
      <div className="mb-3 flex items-start gap-3">
        <div className={`rounded-lg p-2 ${config.iconBg}`}>
          <Icon className={`h-5 w-5 ${config.iconColor}`} />
        </div>
        <div className="flex-1 pr-6">
          <div className="mb-1 flex items-center gap-2">
            <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${config.badgeColor}`}>
              {config.badgeText}
            </span>
            {priority.timeframe && (
              <span className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="h-3 w-3" />
                {priority.timeframe}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-gray-900">{priority.title}</h3>
        </div>
      </div>

      {/* Description */}
      <p className="mb-3 text-sm text-gray-600">{priority.description}</p>

      {/* Impact */}
      {priority.impact && (
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs font-medium text-gray-500">Impatto stimato:</span>
          <span className="text-sm font-bold text-gray-900">{priority.impact}</span>
        </div>
      )}

      {/* Confidence (if available) */}
      {priority.confidence !== undefined && (
        <div className="mb-3 flex items-center gap-2">
          <span className="text-xs text-gray-500">Confidenza AI:</span>
          <div className="flex items-center gap-1">
            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full ${
                  priority.confidence >= 70
                    ? 'bg-green-500'
                    : priority.confidence >= 40
                      ? 'bg-amber-500'
                      : 'bg-red-500'
                }`}
                style={{ width: `${priority.confidence}%` }}
              />
            </div>
            <span className="text-xs font-medium text-gray-600">{priority.confidence}%</span>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="mt-auto flex items-center gap-2 pt-2">
        <button
          onClick={handlePrimaryAction}
          disabled={loading}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${config.primaryBtn} disabled:opacity-50`}
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <CheckCircle className="h-4 w-4" />
              {priority.actions.primary.label}
            </>
          )}
        </button>

        {priority.actions.secondary && (
          <button
            onClick={() => priority.actions.secondary?.action()}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            {priority.actions.secondary.label}
          </button>
        )}

        {priority.onExplain && (
          <button
            onClick={priority.onExplain}
            className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/50 hover:text-gray-600"
            title="Perché me lo consigli?"
          >
            <HelpCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
