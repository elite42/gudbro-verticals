'use client';

import React from 'react';
import { EmptyState } from '@/components/ui/empty-state';
import type { WeeklyReport, TopPerformer } from './types';
import { CATEGORY_LABELS } from './types';

// ============================================
// Stat Card
// ============================================
function StatCard({
  label,
  value,
  icon,
  color,
  suffix,
}: {
  label: string;
  value: string;
  icon: string;
  color: 'blue' | 'yellow' | 'green' | 'purple';
  suffix?: string;
}) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    yellow: 'from-yellow-400 to-orange-500',
    green: 'from-green-500 to-emerald-600',
    purple: 'from-purple-500 to-indigo-600',
  };

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className={`bg-gradient-to-r ${colors[color]} p-3`}>
        <span className="text-2xl">{icon}</span>
      </div>
      <div className="p-4">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="mt-1 text-2xl font-bold text-gray-900">
          {value}
          {suffix && <span className="text-base font-normal text-gray-500">{suffix}</span>}
        </p>
      </div>
    </div>
  );
}

// ============================================
// Performer Card
// ============================================
function PerformerCard({
  title,
  performer,
  metric,
  icon,
}: {
  title: string;
  performer: TopPerformer | null;
  metric: string;
  icon: string;
}) {
  return (
    <div className="p-4 text-center">
      <p className="text-xs text-gray-500">{title}</p>
      {performer ? (
        <>
          <div className="my-3 flex justify-center">
            {performer.photoUrl ? (
              <img
                src={performer.photoUrl}
                alt={performer.displayName}
                className="h-16 w-16 rounded-full border-2 border-blue-100 object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white">
                {performer.displayName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <p className="font-semibold text-gray-900">{performer.displayName}</p>
          <p className="text-sm text-gray-500">{performer.jobTitle}</p>
          <p className="mt-2 text-lg font-bold text-blue-600">
            {icon} {metric}
          </p>
        </>
      ) : (
        <div className="py-8 text-gray-400">
          <span className="text-4xl opacity-30">{icon}</span>
          <p className="mt-2 text-sm">Nessun dato</p>
        </div>
      )}
    </div>
  );
}

// ============================================
// Performance Tab
// ============================================
interface PerformanceTabProps {
  report: WeeklyReport | null;
  topPerformers: TopPerformer[];
  onGenerateReport: () => void;
  onAutoAward: () => void;
  isSaving: boolean;
  renderStars: (rating: number) => React.ReactNode;
}

function PerformanceTab({
  report,
  topPerformers,
  onGenerateReport,
  onAutoAward,
  isSaving,
  renderStars,
}: PerformanceTabProps) {
  if (!report) {
    return (
      <EmptyState
        icon={<span className="text-5xl">📊</span>}
        title="Nessun report disponibile"
        description="Genera il primo report settimanale per vedere le performance del team."
        action={{ label: 'Genera Report', onClick: onGenerateReport }}
        variant="default"
        size="default"
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={onAutoAward}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          🏆 Assegna Premi
        </button>
        <button
          onClick={onGenerateReport}
          disabled={isSaving}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          🔄 Aggiorna Report
        </button>
      </div>

      {/* Period */}
      <div className="text-sm text-gray-500">
        Periodo: {new Date(report.periodStart).toLocaleDateString('it-IT')} -{' '}
        {new Date(report.periodEnd).toLocaleDateString('it-IT')}
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard
          label="Review Totali"
          value={report.teamStats.totalReviews.toString()}
          icon="📝"
          color="blue"
        />
        <StatCard
          label="Rating Medio"
          value={report.teamStats.averageRating.toFixed(1)}
          icon="⭐"
          color="yellow"
          suffix="/5"
        />
        <StatCard
          label="Positive Rate"
          value={report.teamStats.positiveRate.toFixed(0)}
          icon="👍"
          color="green"
          suffix="%"
        />
        <StatCard
          label="Top Performer"
          value={report.topPerformers.byRating?.displayName || '-'}
          icon="🏆"
          color="purple"
        />
      </div>

      {/* Top Performers */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900">🏆 Top Performers della Settimana</h3>
        </div>
        <div className="grid grid-cols-1 divide-y divide-gray-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {/* By Rating */}
          <PerformerCard
            title="Miglior Rating"
            performer={report.topPerformers.byRating}
            metric={
              report.topPerformers.byRating
                ? `${report.topPerformers.byRating.averageRating.toFixed(1)}/5`
                : '-'
            }
            icon="⭐"
          />
          {/* By Reviews */}
          <PerformerCard
            title="Più Feedback"
            performer={report.topPerformers.byReviews}
            metric={
              report.topPerformers.byReviews
                ? `${report.topPerformers.byReviews.reviewsCount} review`
                : '-'
            }
            icon="📊"
          />
          {/* Most Improved */}
          <PerformerCard
            title="Most Improved"
            performer={report.topPerformers.mostImproved}
            metric="Miglioramento"
            icon="📈"
          />
        </div>
      </div>

      {/* Top Categories */}
      {report.teamStats.topCategories.length > 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <h3 className="mb-4 font-semibold text-gray-900">🏷️ Categorie più votate</h3>
          <div className="flex flex-wrap gap-2">
            {report.teamStats.topCategories.map(({ category, count }) => (
              <span
                key={category}
                className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-sm"
              >
                <span>{CATEGORY_LABELS[category]?.emoji || '📌'}</span>
                <span className="font-medium text-blue-700">
                  {CATEGORY_LABELS[category]?.label || category}
                </span>
                <span className="text-blue-500">({count})</span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Alerts */}
      {report.alerts.length > 0 && (
        <div className="space-y-2">
          {report.alerts.map((alert, i) => (
            <div
              key={i}
              className={`rounded-lg p-3 ${
                alert.type === 'warning'
                  ? 'border border-amber-200 bg-amber-50 text-amber-700'
                  : alert.type === 'success'
                    ? 'border border-green-200 bg-green-50 text-green-700'
                    : 'border border-blue-200 bg-blue-50 text-blue-700'
              }`}
            >
              {alert.message}
            </div>
          ))}
        </div>
      )}

      {/* AI Suggestion */}
      {report.aiSuggestion && (
        <div className="rounded-xl border border-purple-200 bg-gradient-to-r from-purple-50 to-indigo-50 p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h4 className="font-semibold text-purple-900">Suggerimento AI</h4>
              <p className="mt-1 text-sm text-purple-700">{report.aiSuggestion}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export { PerformanceTab };
