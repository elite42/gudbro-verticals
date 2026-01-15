'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, CheckCircle2, ExternalLink } from 'lucide-react';
import type { OperationalScenario, ScenarioAction } from '@/lib/ai/scenario-detection';

interface ScenarioBannerProps {
  scenario: OperationalScenario;
  compact?: boolean;
}

export function ScenarioBanner({ scenario, compact = false }: ScenarioBannerProps) {
  const [expanded, setExpanded] = useState(false);

  // For "all_clear" scenario, show a minimal success banner
  if (scenario.type === 'all_clear') {
    return (
      <div
        className={`flex items-center gap-3 rounded-xl border-2 p-4 ${scenario.bgColor} ${scenario.borderColor}`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
          <CheckCircle2 className="h-5 w-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-lg">{scenario.emoji}</span>
            <span className={`font-semibold ${scenario.color}`}>{scenario.label}</span>
          </div>
          <p className="text-sm text-gray-600">{scenario.description}</p>
        </div>
        <div className="text-right">
          <span className="text-xs text-gray-500">Confidenza</span>
          <p className="font-bold text-purple-600">{scenario.confidence}%</p>
        </div>
      </div>
    );
  }

  if (compact) {
    return (
      <div
        className={`flex items-center justify-between rounded-xl border-2 p-3 ${scenario.bgColor} ${scenario.borderColor}`}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{scenario.emoji}</span>
          <span className={`font-bold ${scenario.color}`}>{scenario.shortLabel}</span>
        </div>
        {scenario.actions[0] && (
          <Link
            href={scenario.actions[0].href || '#'}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium text-white ${getActionButtonColor(scenario.type)}`}
          >
            {scenario.actions[0].icon} {scenario.actions[0].label}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border-2 ${scenario.bgColor} ${scenario.borderColor} overflow-hidden`}
    >
      {/* Header - Always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between p-4 text-left transition-colors hover:bg-white/30"
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl">{scenario.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className={`font-bold ${scenario.color}`}>{scenario.label}</h3>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-medium ${scenario.bgColor} ${scenario.color}`}
              >
                {scenario.confidence}% confidenza
              </span>
            </div>
            <p className="text-sm text-gray-600">{scenario.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!expanded && scenario.actions.length > 0 && (
            <span className="text-xs text-gray-500">
              {scenario.actions.length} azioni suggerite
            </span>
          )}
          {expanded ? (
            <ChevronUp className="h-5 w-5 text-gray-400" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </button>

      {/* Expanded Content */}
      {expanded && (
        <div className="border-t border-white/50 bg-white/30 p-4">
          {/* Data Points */}
          {scenario.dataPoints.length > 0 && (
            <div className="mb-4">
              <p className="mb-2 text-xs font-medium text-gray-500">Perché questo scenario:</p>
              <ul className="space-y-1">
                {scenario.dataPoints.map((point, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Actions */}
          <div>
            <p className="mb-2 text-xs font-medium text-gray-500">Azioni suggerite:</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {scenario.actions.map((action) => (
                <ActionButton key={action.id} action={action} scenarioType={scenario.type} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface ActionButtonProps {
  action: ScenarioAction;
  scenarioType: string;
}

function ActionButton({ action, scenarioType }: ActionButtonProps) {
  const priorityStyles = {
    high: 'border-2 font-semibold',
    medium: 'border',
    low: 'border border-dashed',
  };

  if (action.href) {
    return (
      <Link
        href={action.href}
        className={`flex items-center justify-between rounded-lg bg-white p-3 transition-all hover:shadow-md ${priorityStyles[action.priority]}`}
      >
        <div className="flex items-center gap-2">
          <span>{action.icon}</span>
          <span className="text-sm text-gray-900">{action.label}</span>
        </div>
        <ExternalLink className="h-4 w-4 text-gray-400" />
      </Link>
    );
  }

  return (
    <button
      onClick={action.action}
      className={`flex items-center gap-2 rounded-lg bg-white p-3 text-left transition-all hover:shadow-md ${priorityStyles[action.priority]}`}
    >
      <span>{action.icon}</span>
      <span className="text-sm text-gray-900">{action.label}</span>
    </button>
  );
}

function getActionButtonColor(type: string): string {
  switch (type) {
    case 'slow_day':
      return 'bg-blue-600 hover:bg-blue-700';
    case 'rush_hour':
      return 'bg-red-600 hover:bg-red-700';
    case 'margin_risk':
      return 'bg-orange-600 hover:bg-orange-700';
    case 'opportunity':
      return 'bg-green-600 hover:bg-green-700';
    default:
      return 'bg-gray-600 hover:bg-gray-700';
  }
}

/**
 * Compact inline version for mobile
 */
export function ScenarioChip({ scenario }: { scenario: OperationalScenario }) {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${scenario.bgColor} ${scenario.borderColor} border`}
    >
      <span className="text-sm">{scenario.emoji}</span>
      <span className={`text-xs font-medium ${scenario.color}`}>{scenario.shortLabel}</span>
    </div>
  );
}
