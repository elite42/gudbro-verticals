'use client';

import { useState } from 'react';
import {
  Warning,
  TrendUp,
  TrendDown,
  Users,
  ForkKnife,
  CloudRain,
  Sun,
  CurrencyDollar,
  Clock,
  CheckCircle,
  X,
  Question,
  SpinnerGap,
  ChatCircle,
  WarningCircle,
  ThumbsUp,
  ThumbsDown,
} from '@phosphor-icons/react';

export type PriorityLevel = 'critical' | 'warning' | 'opportunity';
export type PriorityCategory =
  | 'staffing'
  | 'weather'
  | 'promo'
  | 'food_cost'
  | 'customer'
  | 'general';

/**
 * AI Priority - Template 5 Domande Obbligatorie
 *
 * Ogni trigger AI deve rispondere a:
 * 1. ❓ Cosa sta succedendo (situation)
 * 2. 📉📈 Perché è problema/opportunità (reason)
 * 3. 💰 Impatto stimato (impact)
 * 4. 🧠 Cosa consiglia l'AI (aiSuggestion)
 * 5. 👉 Cosa fai ORA (actions.primary)
 */
export interface AIPriority {
  id: string;
  level: PriorityLevel;
  category: PriorityCategory;

  // Legacy fields (backward compatible)
  title: string;
  description: string;

  // === 5 DOMANDE TEMPLATE ===
  // 1. ❓ Cosa sta succedendo
  situation?: string;

  // 2. 📉📈 Perché è problema/opportunità
  reason?: string;

  // 3. 💰 Impatto stimato (e.g., "+12%", "-€120", "-8% margin")
  impact?: string;

  // 4. 🧠 Cosa consiglia l'AI
  aiSuggestion?: string;

  // 5. 👉 Cosa fai ORA (in actions.primary)

  // === METADATA ===
  timeframe?: string; // e.g., "16:00-18:00", "Today", "This week"
  confidence?: number; // 0-100, determines confidence level label
  dataPoints?: string[]; // Dati che supportano la decisione (max 3 shown)

  // === TRUST & FEEDBACK (Sprint 3) ===
  /** If true, AI won't recommend action due to low confidence */
  lowConfidenceMessage?: string; // e.g., "Non ho abbastanza dati per consigliarti"
  /** Previous error/learning feedback */
  previousError?: {
    message: string; // e.g., "La promo di ieri non ha performato (-3%)"
    learningNote?: string; // e.g., "Sto aggiornando il modello"
  };

  // === AZIONI ===
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
  promo: TrendUp,
  food_cost: CurrencyDollar,
  customer: Users, // Same as staffing but different category
  general: Warning,
};

// Confidence level configuration
const confidenceConfig = {
  high: {
    label: 'Alta',
    emoji: '🟢',
    color: 'text-green-600',
    bg: 'bg-green-100',
    barColor: 'bg-green-500',
  },
  medium: {
    label: 'Media',
    emoji: '🟡',
    color: 'text-amber-600',
    bg: 'bg-amber-100',
    barColor: 'bg-amber-500',
  },
  low: {
    label: 'Bassa',
    emoji: '🔴',
    color: 'text-red-600',
    bg: 'bg-red-100',
    barColor: 'bg-red-500',
  },
};

function getConfidenceLevel(confidence: number): 'high' | 'medium' | 'low' {
  if (confidence >= 70) return 'high';
  if (confidence >= 40) return 'medium';
  return 'low';
}

export function AIPriorityCard({ priority, compact = false }: AIPriorityCardProps) {
  const [loading, setLoading] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [feedback, setFeedback] = useState<'helpful' | 'not_helpful' | null>(null);

  const config = levelConfig[priority.level];
  const Icon = categoryIcons[priority.category];
  const confidenceLevel =
    priority.confidence !== undefined ? getConfidenceLevel(priority.confidence) : null;
  const confConfig = confidenceLevel ? confidenceConfig[confidenceLevel] : null;

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
          {loading ? (
            <SpinnerGap className="h-3 w-3 animate-spin" />
          ) : (
            priority.actions.primary.label
          )}
        </button>
      </div>
    );
  }

  // Check if we have the new 5-question template fields
  const hasTemplateFields = priority.situation || priority.reason || priority.aiSuggestion;

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

      {/* === 5 DOMANDE TEMPLATE === */}
      {hasTemplateFields ? (
        <div className="mb-3 space-y-2">
          {/* 1. ❓ Cosa sta succedendo */}
          {priority.situation && (
            <div className="rounded-lg bg-white/50 p-2">
              <div className="mb-0.5 flex items-center gap-1.5">
                <span className="text-xs">❓</span>
                <span className="text-xs font-medium text-gray-500">Cosa sta succedendo</span>
              </div>
              <p className="text-sm text-gray-700">{priority.situation}</p>
            </div>
          )}

          {/* 2. 📉📈 Perché è problema/opportunità */}
          {priority.reason && (
            <div className="rounded-lg bg-white/50 p-2">
              <div className="mb-0.5 flex items-center gap-1.5">
                <span className="text-xs">{priority.level === 'opportunity' ? '📈' : '📉'}</span>
                <span className="text-xs font-medium text-gray-500">
                  {priority.level === 'opportunity'
                    ? "Perché è un'opportunità"
                    : 'Perché è un problema'}
                </span>
              </div>
              <p className="text-sm text-gray-700">{priority.reason}</p>
            </div>
          )}

          {/* 3. 💰 Impatto stimato */}
          {priority.impact && (
            <div className="flex items-center gap-2 rounded-lg bg-white/50 p-2">
              <span className="text-xs">💰</span>
              <span className="text-xs font-medium text-gray-500">Impatto:</span>
              <span className="text-sm font-bold text-gray-900">{priority.impact}</span>
            </div>
          )}

          {/* 4. 🧠 Cosa consiglia l'AI */}
          {priority.aiSuggestion && (
            <div className="rounded-lg bg-white/50 p-2">
              <div className="mb-0.5 flex items-center gap-1.5">
                <span className="text-xs">🧠</span>
                <span className="text-xs font-medium text-gray-500">Ti consiglio</span>
              </div>
              <p className="text-sm font-medium text-gray-900">{priority.aiSuggestion}</p>
            </div>
          )}
        </div>
      ) : (
        /* Legacy view for backward compatibility */
        <>
          {/* Description */}
          <p className="mb-3 text-sm text-gray-600">{priority.description}</p>

          {/* Impact */}
          {priority.impact && (
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">Impatto stimato:</span>
              <span className="text-sm font-bold text-gray-900">{priority.impact}</span>
            </div>
          )}
        </>
      )}

      {/* Previous Error Feedback (if any) */}
      {priority.previousError && (
        <div className="mb-3 rounded-lg border border-amber-200 bg-amber-50 p-2">
          <div className="flex items-start gap-2">
            <WarningCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" />
            <div>
              <p className="text-xs font-medium text-amber-800">{priority.previousError.message}</p>
              {priority.previousError.learningNote && (
                <p className="mt-0.5 text-xs text-amber-600">
                  {priority.previousError.learningNote}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Low Confidence Warning */}
      {priority.lowConfidenceMessage && (
        <div className="mb-3 rounded-lg border border-gray-200 bg-gray-50 p-2">
          <div className="flex items-start gap-2">
            <Question className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
            <p className="text-xs text-gray-600">{priority.lowConfidenceMessage}</p>
          </div>
        </div>
      )}

      {/* Confidence Score (Enhanced) */}
      {priority.confidence !== undefined && confConfig && (
        <div className="mb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500">Confidenza AI:</span>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${confConfig.bg} ${confConfig.color}`}
              >
                {confConfig.emoji} {confConfig.label} ({priority.confidence}%)
              </span>
            </div>
            {/* Explanation Toggle */}
            {priority.dataPoints && priority.dataPoints.length > 0 && (
              <button
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center gap-1 rounded px-2 py-1 text-xs text-gray-500 hover:bg-gray-100"
              >
                <ChatCircle className="h-3 w-3" />
                {showExplanation ? 'Nascondi' : 'Perché?'}
              </button>
            )}
          </div>
          {/* Confidence Bar */}
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className={`h-full rounded-full transition-all ${confConfig.barColor}`}
              style={{ width: `${priority.confidence}%` }}
            />
          </div>
        </div>
      )}

      {/* Explanation Popover (On-Demand) */}
      {showExplanation && priority.dataPoints && priority.dataPoints.length > 0 && (
        <div className="mb-3 rounded-lg border border-blue-200 bg-blue-50 p-3">
          <p className="mb-2 text-xs font-medium text-blue-800">🤔 Perché te lo consiglio?</p>
          <ul className="space-y-1">
            {priority.dataPoints.slice(0, 3).map((point, i) => (
              <li key={i} className="flex items-start gap-2 text-xs text-blue-700">
                <span className="mt-1">•</span>
                {point}
              </li>
            ))}
          </ul>
          {/* Feedback Buttons */}
          <div className="mt-3 flex items-center gap-2 border-t border-blue-200 pt-2">
            <span className="text-xs text-blue-600">Utile?</span>
            <button
              onClick={() => setFeedback('helpful')}
              className={`rounded p-1 transition-colors ${
                feedback === 'helpful'
                  ? 'bg-green-100 text-green-600'
                  : 'text-gray-400 hover:bg-green-50 hover:text-green-600'
              }`}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setFeedback('not_helpful')}
              className={`rounded p-1 transition-colors ${
                feedback === 'not_helpful'
                  ? 'bg-red-100 text-red-600'
                  : 'text-gray-400 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>
            {feedback && (
              <span className="ml-1 text-xs text-gray-500">
                {feedback === 'helpful' ? 'Grazie! Migliorerò.' : 'Capito, aggiusto.'}
              </span>
            )}
          </div>
        </div>
      )}

      {/* 5. 👉 Cosa fai ORA - Actions */}
      <div className="mt-auto flex items-center gap-2 pt-2">
        <button
          onClick={handlePrimaryAction}
          disabled={loading}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${config.primaryBtn} disabled:opacity-50`}
        >
          {loading ? (
            <SpinnerGap className="h-4 w-4 animate-spin" />
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
            <Question className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
