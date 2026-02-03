'use client';

import { useState, useEffect } from 'react';
import {
  Brain,
  CaretDown,
  CaretUp,
  Sparkle,
  TrendUp,
  Lock,
  LockOpen,
  GearSix,
} from '@phosphor-icons/react';
import { useTenant } from '@/lib/contexts/TenantContext';

// Types
interface KnowledgeArea {
  name: string;
  key: string;
  progress: number;
  status: 'not_started' | 'in_progress' | 'completed';
  description: string;
  requirement: string;
  currentValue: string;
}

interface LearningProgress {
  locationId: string;
  overallProgress: number;
  autonomyLevel: 1 | 2 | 3 | 4;
  autonomyLevelName: string;
  zoneAnalysis: number;
  menuKnowledge: number;
  competitorIntel: number;
  customerPatterns: number;
  seasonalTrends: number;
  managerPreferences: number;
  weatherCorrelations: number;
  dataPoints: {
    zoneAnalysisCompleted: boolean;
    menuItemsImported: number;
    competitorsAnalyzed: number;
    totalOrdersProcessed: number;
    monthsOfData: number;
    suggestionsResponded: number;
    weatherDataDays: number;
  };
  autonomyOverride: number | null;
}

interface LearningMilestone {
  id: string;
  name: string;
  unlockedCapability: string;
  reachedAt: string;
  acknowledgedAt: string | null;
}

const AUTONOMY_COLORS: Record<number, string> = {
  1: 'from-gray-400 to-gray-500',
  2: 'from-blue-400 to-blue-500',
  3: 'from-indigo-400 to-indigo-500',
  4: 'from-purple-400 to-purple-500',
};

const AUTONOMY_BG_COLORS: Record<number, string> = {
  1: 'bg-gray-50 border-gray-200',
  2: 'bg-blue-50 border-blue-200',
  3: 'bg-indigo-50 border-indigo-200',
  4: 'bg-purple-50 border-purple-200',
};

const AUTONOMY_DESCRIPTIONS: Record<number, string> = {
  1: 'AI only suggests, always asks for approval',
  2: 'AI handles routine tasks with notifications',
  3: 'AI makes autonomous decisions within limits',
  4: 'Full co-manager autonomy for operations',
};

function ProgressBar({ progress, color = 'bg-blue-500' }: { progress: number; color?: string }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
      />
    </div>
  );
}

function KnowledgeAreaItem({ area }: { area: KnowledgeArea }) {
  const statusColors = {
    not_started: 'text-gray-400',
    in_progress: 'text-blue-500',
    completed: 'text-green-500',
  };

  const progressColors = {
    not_started: 'bg-gray-300',
    in_progress: 'bg-blue-500',
    completed: 'bg-green-500',
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">{area.name}</span>
        <span className={`text-sm font-medium ${statusColors[area.status]}`}>{area.progress}%</span>
      </div>
      <ProgressBar progress={area.progress} color={progressColors[area.status]} />
      <p className="text-xs text-gray-500">{area.description}</p>
    </div>
  );
}

export function LearningProgressWidget({ compact = false }: { compact?: boolean }) {
  const { location } = useTenant();
  const [progress, setProgress] = useState<LearningProgress | null>(null);
  const [milestones, setMilestones] = useState<LearningMilestone[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(!compact);
  const [showSettings, setShowSettings] = useState(false);

  // Fetch learning progress
  const fetchProgress = async () => {
    if (!location?.id) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/ai/learning-progress?locationId=${location.id}`);
      if (response.ok) {
        const data = await response.json();
        setProgress(data.progress);
        setMilestones(data.milestones || []);
      }
    } catch (err) {
      console.error('Failed to fetch learning progress:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, [location?.id]);

  if (!location?.id || loading) {
    return null;
  }

  if (!progress) {
    return (
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div className="flex items-center gap-2 text-gray-500">
          <Brain className="h-5 w-5" />
          <span className="text-sm">AI learning not initialized</span>
        </div>
      </div>
    );
  }

  const knowledgeAreas: KnowledgeArea[] = [
    {
      key: 'zoneAnalysis',
      name: 'Zone Analysis',
      progress: progress.zoneAnalysis,
      status:
        progress.zoneAnalysis >= 100
          ? 'completed'
          : progress.zoneAnalysis > 0
            ? 'in_progress'
            : 'not_started',
      description: progress.dataPoints.zoneAnalysisCompleted
        ? 'Zone analysis completed'
        : 'Waiting for zone analysis',
      requirement: 'Complete zone analysis',
      currentValue: progress.dataPoints.zoneAnalysisCompleted ? 'Completed' : 'Not started',
    },
    {
      key: 'menuKnowledge',
      name: 'Menu Knowledge',
      progress: progress.menuKnowledge,
      status:
        progress.menuKnowledge >= 100
          ? 'completed'
          : progress.menuKnowledge > 0
            ? 'in_progress'
            : 'not_started',
      description: `${progress.dataPoints.menuItemsImported} menu items imported`,
      requirement: 'Import menu with descriptions',
      currentValue: `${progress.dataPoints.menuItemsImported} items`,
    },
    {
      key: 'customerPatterns',
      name: 'Customer Patterns',
      progress: progress.customerPatterns,
      status:
        progress.customerPatterns >= 100
          ? 'completed'
          : progress.customerPatterns > 0
            ? 'in_progress'
            : 'not_started',
      description: `${progress.dataPoints.totalOrdersProcessed} orders processed`,
      requirement: '2,000+ orders for full understanding',
      currentValue: `${progress.dataPoints.totalOrdersProcessed} orders`,
    },
    {
      key: 'seasonalTrends',
      name: 'Seasonal Trends',
      progress: progress.seasonalTrends,
      status:
        progress.seasonalTrends >= 100
          ? 'completed'
          : progress.seasonalTrends > 0
            ? 'in_progress'
            : 'not_started',
      description: `${progress.dataPoints.monthsOfData} months of data`,
      requirement: '12 months for full seasonality',
      currentValue: `${progress.dataPoints.monthsOfData} months`,
    },
    {
      key: 'managerPreferences',
      name: 'Manager Preferences',
      progress: progress.managerPreferences,
      status:
        progress.managerPreferences >= 100
          ? 'completed'
          : progress.managerPreferences > 0
            ? 'in_progress'
            : 'not_started',
      description: `${progress.dataPoints.suggestionsResponded} suggestions responded`,
      requirement: 'Respond to 100+ AI suggestions',
      currentValue: `${progress.dataPoints.suggestionsResponded} responses`,
    },
    {
      key: 'weatherCorrelations',
      name: 'Weather Correlations',
      progress: progress.weatherCorrelations,
      status:
        progress.weatherCorrelations >= 100
          ? 'completed'
          : progress.weatherCorrelations > 0
            ? 'in_progress'
            : 'not_started',
      description: `${progress.dataPoints.weatherDataDays} days of weather data`,
      requirement: '180 days for accurate predictions',
      currentValue: `${progress.dataPoints.weatherDataDays} days`,
    },
  ];

  // Compact version for sidebar
  if (compact && !expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        className={`w-full rounded-lg border p-3 text-left transition-colors hover:shadow-sm ${AUTONOMY_BG_COLORS[progress.autonomyLevel]}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${AUTONOMY_COLORS[progress.autonomyLevel]} text-white`}
            >
              <Brain className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">
                Level {progress.autonomyLevel}: {progress.autonomyLevelName}
              </p>
              <p className="text-xs text-gray-500">{progress.overallProgress}% learned</p>
            </div>
          </div>
          <CaretDown className="h-4 w-4 text-gray-400" />
        </div>
      </button>
    );
  }

  return (
    <div
      className={`rounded-xl border ${AUTONOMY_BG_COLORS[progress.autonomyLevel]} overflow-hidden`}
    >
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${AUTONOMY_COLORS[progress.autonomyLevel]} text-white shadow-lg`}
            >
              <Brain className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Co-Manager</h3>
              <p className="text-sm text-gray-600">
                Level {progress.autonomyLevel}: {progress.autonomyLevelName}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="rounded-lg p-1.5 text-gray-400 hover:bg-white/50 hover:text-gray-600"
              title="Settings"
            >
              <GearSix className="h-4 w-4" />
            </button>
            {compact && (
              <button
                onClick={() => setExpanded(false)}
                className="rounded-lg p-1.5 text-gray-400 hover:bg-white/50 hover:text-gray-600"
              >
                <CaretUp className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-gray-700">Overall Learning Progress</span>
            <span className="font-bold text-gray-900">{progress.overallProgress}%</span>
          </div>
          <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-white/50">
            <div
              className={`h-full rounded-full bg-gradient-to-r ${AUTONOMY_COLORS[progress.autonomyLevel]} transition-all duration-500`}
              style={{ width: `${progress.overallProgress}%` }}
            />
          </div>
        </div>

        {/* Autonomy Level Description */}
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-white/50 px-3 py-2">
          {progress.autonomyLevel >= 3 ? (
            <LockOpen className="h-4 w-4 text-green-600" />
          ) : (
            <Lock className="h-4 w-4 text-gray-400" />
          )}
          <p className="text-xs text-gray-600">{AUTONOMY_DESCRIPTIONS[progress.autonomyLevel]}</p>
        </div>
      </div>

      {/* Knowledge Areas */}
      <div className="border-t border-gray-200/50 bg-white/30 p-4">
        <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
          <TrendUp className="h-4 w-4" />
          Knowledge Areas
        </h4>
        <div className="space-y-4">
          {knowledgeAreas.map((area) => (
            <KnowledgeAreaItem key={area.key} area={area} />
          ))}
        </div>
      </div>

      {/* Recent Milestones */}
      {milestones.length > 0 && (
        <div className="border-t border-gray-200/50 bg-white/30 p-4">
          <h4 className="mb-3 flex items-center gap-2 text-sm font-medium text-gray-700">
            <Sparkle className="h-4 w-4" />
            Recent Milestones
          </h4>
          <div className="space-y-2">
            {milestones.slice(0, 3).map((milestone) => (
              <div
                key={milestone.id}
                className="flex items-center gap-2 rounded-lg bg-white/50 px-3 py-2"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                  <Sparkle className="h-3 w-3 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-700">{milestone.name}</p>
                  <p className="truncate text-xs text-gray-500">{milestone.unlockedCapability}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Settings Panel */}
      {showSettings && (
        <div className="border-t border-gray-200/50 bg-white p-4">
          <h4 className="mb-3 text-sm font-medium text-gray-700">Autonomy Settings</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs text-gray-500">Override Autonomy Level</label>
              <p className="text-sm text-gray-600">
                {progress.autonomyOverride
                  ? `Manually set to Level ${progress.autonomyOverride}`
                  : 'Using calculated level based on learning'}
              </p>
            </div>
            <p className="text-xs text-gray-400">
              Configure detailed autonomy settings in AI Settings page.
            </p>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200/50 bg-white/50 px-4 py-2">
        <p className="text-center text-xs text-gray-400">
          AI learns from your business data over time
        </p>
      </div>
    </div>
  );
}

// Small inline version for AI chat panel
export function LearningProgressBadge() {
  const { location } = useTenant();
  const [progress, setProgress] = useState<LearningProgress | null>(null);

  useEffect(() => {
    const fetchProgress = async () => {
      if (!location?.id) return;
      try {
        const response = await fetch(`/api/ai/learning-progress?locationId=${location.id}`);
        if (response.ok) {
          const data = await response.json();
          setProgress(data.progress);
        }
      } catch (err) {
        console.error('Failed to fetch learning progress:', err);
      }
    };
    fetchProgress();
  }, [location?.id]);

  if (!progress) return null;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${AUTONOMY_BG_COLORS[progress.autonomyLevel]}`}
    >
      <Brain className="h-3 w-3" />
      <span>Lv.{progress.autonomyLevel}</span>
      <span className="text-gray-400">•</span>
      <span>{progress.overallProgress}%</span>
    </div>
  );
}
