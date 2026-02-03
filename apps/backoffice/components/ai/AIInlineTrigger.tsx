'use client';

import { useState, useEffect } from 'react';
import { X, CaretRight, Brain, SpinnerGap } from '@phosphor-icons/react';
import { useTenant } from '@/lib/contexts/TenantContext';
import type { AIPriority, PriorityCategory } from './AIPriorityCard';

interface AIInlineTriggerProps {
  /** Filter by specific category */
  category: PriorityCategory;
  /** Max triggers to show */
  maxTriggers?: number;
  /** Compact mode for tighter layouts */
  compact?: boolean;
  /** Custom fetch endpoint (default: /api/ai/triggers) */
  endpoint?: string;
}

interface TriggerData {
  id: string;
  level: 'critical' | 'warning' | 'opportunity';
  category: PriorityCategory;
  title: string;
  situation?: string;
  reason?: string;
  impact?: string;
  aiSuggestion?: string;
  confidence?: number;
  actionLabel: string;
  actionUrl: string;
}

const levelConfig = {
  critical: {
    bg: 'bg-red-50',
    border: 'border-red-200',
    icon: 'text-red-600',
    badge: 'bg-red-100 text-red-700',
    button: 'bg-red-600 hover:bg-red-700 text-white',
  },
  warning: {
    bg: 'bg-amber-50',
    border: 'border-amber-200',
    icon: 'text-amber-600',
    badge: 'bg-amber-100 text-amber-700',
    button: 'bg-amber-600 hover:bg-amber-700 text-white',
  },
  opportunity: {
    bg: 'bg-green-50',
    border: 'border-green-200',
    icon: 'text-green-600',
    badge: 'bg-green-100 text-green-700',
    button: 'bg-green-600 hover:bg-green-700 text-white',
  },
};

/**
 * AIInlineTrigger - Contextual AI trigger banner for specific pages
 *
 * Use this component to show relevant AI suggestions inline on pages
 * like Food Cost, Menu, Orders, etc.
 *
 * Example:
 * ```tsx
 * <AIInlineTrigger category="food_cost" maxTriggers={1} />
 * ```
 */
export function AIInlineTrigger({
  category,
  maxTriggers = 1,
  compact = false,
  endpoint,
}: AIInlineTriggerProps) {
  const { location } = useTenant();
  const [triggers, setTriggers] = useState<TriggerData[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!location?.id) {
      setLoading(false);
      return;
    }

    const fetchTriggers = async () => {
      setLoading(true);
      try {
        // For now, we'll generate triggers client-side based on category
        // In production, this would fetch from an API
        const generatedTriggers = await generateCategoryTriggers(category, location.id);
        setTriggers(generatedTriggers.slice(0, maxTriggers));
      } catch (err) {
        console.error('Error fetching inline triggers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTriggers();
  }, [location?.id, category, maxTriggers, endpoint]);

  const handleDismiss = (id: string) => {
    setDismissedIds((prev) => new Set([...prev, id]));
  };

  const visibleTriggers = triggers.filter((t) => !dismissedIds.has(t.id));

  if (loading) {
    return null; // Don't show loading state for inline triggers
  }

  if (visibleTriggers.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {visibleTriggers.map((trigger) => {
        const config = levelConfig[trigger.level];

        if (compact) {
          return (
            <div
              key={trigger.id}
              className={`flex items-center justify-between rounded-lg border p-3 ${config.bg} ${config.border}`}
            >
              <div className="flex items-center gap-3">
                <Brain className={`h-4 w-4 ${config.icon}`} />
                <div>
                  <p className="text-sm font-medium text-gray-900">{trigger.title}</p>
                  {trigger.impact && (
                    <span className="text-xs text-gray-600">{trigger.impact}</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={trigger.actionUrl}
                  className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium ${config.button}`}
                >
                  {trigger.actionLabel}
                  <CaretRight className="h-3 w-3" />
                </a>
                <button
                  onClick={() => handleDismiss(trigger.id)}
                  className="rounded p-1 text-gray-400 hover:bg-white/50 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        }

        // Full inline trigger with 5 questions template
        return (
          <div
            key={trigger.id}
            className={`relative rounded-xl border-2 p-4 ${config.bg} ${config.border}`}
          >
            <button
              onClick={() => handleDismiss(trigger.id)}
              className="absolute right-2 top-2 rounded-full p-1 text-gray-400 hover:bg-white/50 hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-3 flex items-center gap-2">
              <Brain className={`h-5 w-5 ${config.icon}`} />
              <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${config.badge}`}>
                AI SUGGERISCE
              </span>
              {trigger.confidence && (
                <span className="text-xs text-gray-500">{trigger.confidence}% sicuro</span>
              )}
            </div>

            <h3 className="mb-2 pr-8 font-semibold text-gray-900">{trigger.title}</h3>

            {/* Template fields */}
            <div className="mb-3 space-y-2">
              {trigger.situation && (
                <div className="rounded-lg bg-white/50 p-2">
                  <span className="text-xs font-medium text-gray-500">❓ Situazione: </span>
                  <span className="text-sm text-gray-700">{trigger.situation}</span>
                </div>
              )}
              {trigger.reason && (
                <div className="rounded-lg bg-white/50 p-2">
                  <span className="text-xs font-medium text-gray-500">
                    {trigger.level === 'opportunity' ? '📈' : '📉'} Motivo:{' '}
                  </span>
                  <span className="text-sm text-gray-700">{trigger.reason}</span>
                </div>
              )}
              {trigger.impact && (
                <div className="flex items-center gap-2 rounded-lg bg-white/50 p-2">
                  <span className="text-xs font-medium text-gray-500">💰 Impatto:</span>
                  <span className="text-sm font-bold text-gray-900">{trigger.impact}</span>
                </div>
              )}
              {trigger.aiSuggestion && (
                <div className="rounded-lg bg-white/50 p-2">
                  <span className="text-xs font-medium text-gray-500">🧠 Consiglio: </span>
                  <span className="text-sm font-medium text-gray-900">{trigger.aiSuggestion}</span>
                </div>
              )}
            </div>

            <a
              href={trigger.actionUrl}
              className={`flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium ${config.button}`}
            >
              {trigger.actionLabel}
              <CaretRight className="h-4 w-4" />
            </a>
          </div>
        );
      })}
    </div>
  );
}

/**
 * Generate triggers for a specific category
 * In production, this would fetch from an API
 */
async function generateCategoryTriggers(
  category: PriorityCategory,
  locationId: string
): Promise<TriggerData[]> {
  const triggers: TriggerData[] = [];

  if (category === 'food_cost') {
    // Fetch food cost data
    try {
      const res = await fetch(`/api/food-cost/dishes?locationId=${locationId}`);
      if (res.ok) {
        const data = await res.json();
        const dishes = data.dishes || [];

        // High food cost dishes
        const highCostDishes = dishes.filter(
          (d: { food_cost_percent: number | null }) =>
            d.food_cost_percent !== null && d.food_cost_percent > 35
        );

        if (highCostDishes.length > 0) {
          const sorted = [...highCostDishes].sort(
            (a: { food_cost_percent: number }, b: { food_cost_percent: number }) =>
              b.food_cost_percent - a.food_cost_percent
          );
          const worst = sorted[0];
          const isCritical = worst.food_cost_percent > 45;

          triggers.push({
            id: 'food-cost-inline',
            level: isCritical ? 'critical' : 'warning',
            category: 'food_cost',
            title:
              highCostDishes.length === 1
                ? `Food cost alto: ${worst.name}`
                : `${highCostDishes.length} piatti con food cost elevato`,
            situation: `"${worst.name}" ha food cost del ${worst.food_cost_percent?.toFixed(0)}%`,
            reason: isCritical
              ? 'Stai vendendo quasi a costo. Margini a rischio.'
              : 'Sopra il 35%, i margini si riducono significativamente.',
            impact: isCritical ? '-8-12% margine' : '-3-5% margine',
            aiSuggestion: `Rivedi prezzo o porzioni di "${worst.name}"`,
            confidence: 95,
            actionLabel: 'Analizza dettagli',
            actionUrl: `/food-cost/dishes/${worst.id}/ingredients`,
          });
        }
      }
    } catch {
      // Silent fail for inline triggers
    }
  }

  // Add more category-specific triggers as needed
  // customer, staffing, promo, weather, etc.

  return triggers;
}

export default AIInlineTrigger;
