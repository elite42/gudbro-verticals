'use client';

import { useState, useEffect } from 'react';
import {
  getMyContributions,
  getContributionStats,
  getStatusColor,
  getStatusText,
  type IngredientContribution,
  type ContributionStats,
} from '../lib/contribution-service';
import { formatDate } from '@gudbro/utils';

interface MyContributionsProps {
  onAddNew?: () => void;
}

export function MyContributions({ onAddNew }: MyContributionsProps) {
  const [contributions, setContributions] = useState<IngredientContribution[]>([]);
  const [stats, setStats] = useState<ContributionStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    const [contribs, statsData] = await Promise.all([getMyContributions(), getContributionStats()]);
    setContributions(contribs);
    setStats(statsData);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent" />
        <p className="text-theme-text-secondary mt-3">Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      {stats && (
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gradient-to-br from-green-50 to-green-100 p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{stats.approvedCount}</p>
            <p className="text-xs text-green-600">Approvati</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 text-center">
            <p className="text-2xl font-bold text-yellow-700">{stats.pendingCount}</p>
            <p className="text-xs text-yellow-600">In Attesa</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-purple-50 to-purple-100 p-4 text-center">
            <p className="text-2xl font-bold text-purple-700">{stats.totalPointsEarned}</p>
            <p className="text-xs text-purple-600">Punti Guadagnati</p>
          </div>
          <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{stats.totalSubmissions}</p>
            <p className="text-xs text-blue-600">Totale Invii</p>
          </div>
        </div>
      )}

      {/* Add New Button */}
      <button
        onClick={onAddNew}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-green-700 py-4 font-bold text-white shadow-lg transition-all hover:from-green-700 hover:to-green-800"
      >
        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Contribuisci un Ingrediente
      </button>

      {/* Contributions List */}
      <div className="space-y-3">
        <h3 className="text-theme-text-tertiary text-sm font-semibold uppercase tracking-wide">
          I Miei Contributi
        </h3>

        {contributions.length === 0 ? (
          <div className="bg-theme-bg-secondary rounded-xl py-8 text-center">
            <div className="bg-theme-bg-tertiary mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full">
              <span className="text-3xl">🥬</span>
            </div>
            <p className="text-theme-text-secondary">Nessun contributo ancora</p>
            <p className="text-theme-text-tertiary mt-1 text-sm">
              Inizia a contribuire per guadagnare punti!
            </p>
          </div>
        ) : (
          contributions.map((contribution) => (
            <div key={contribution.id} className="bg-theme-bg-secondary overflow-hidden rounded-xl">
              <button
                onClick={() =>
                  setExpandedId(expandedId === contribution.id ? null : contribution.id)
                }
                className="flex w-full items-center justify-between p-4 text-left"
              >
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="bg-theme-bg-tertiary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg">
                    <span className="text-xl">🥬</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-theme-text-primary truncate font-semibold">
                      {contribution.ingredientName}
                    </p>
                    <p className="text-theme-text-tertiary text-xs">
                      {formatDate(contribution.createdAt, { locale: 'it-IT' })}
                    </p>
                  </div>
                </div>
                <div className="flex flex-shrink-0 items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(contribution.status)}`}
                  >
                    {getStatusText(contribution.status)}
                  </span>
                  <svg
                    className={`text-theme-text-tertiary h-5 w-5 transition-transform ${
                      expandedId === contribution.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>

              {/* Expanded Details */}
              {expandedId === contribution.id && (
                <div className="border-theme-bg-tertiary space-y-3 border-t px-4 pb-4 pt-3">
                  {contribution.category && (
                    <div className="flex justify-between text-sm">
                      <span className="text-theme-text-tertiary">Categoria</span>
                      <span className="text-theme-text-primary font-medium">
                        {contribution.category}
                      </span>
                    </div>
                  )}

                  {contribution.submittedJson.allergens &&
                    contribution.submittedJson.allergens.length > 0 && (
                      <div>
                        <span className="text-theme-text-tertiary text-sm">Allergeni</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {contribution.submittedJson.allergens.map((a) => (
                            <span
                              key={a}
                              className="rounded-full bg-red-100 px-2 py-0.5 text-xs text-red-700"
                            >
                              {a}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {contribution.submittedJson.dietary &&
                    contribution.submittedJson.dietary.length > 0 && (
                      <div>
                        <span className="text-theme-text-tertiary text-sm">Dietetico</span>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {contribution.submittedJson.dietary.map((d) => (
                            <span
                              key={d}
                              className="rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-700"
                            >
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                  {contribution.pointsAwarded > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-theme-text-tertiary">Punti Guadagnati</span>
                      <span className="font-bold text-purple-600">
                        +{contribution.pointsAwarded}
                      </span>
                    </div>
                  )}

                  {contribution.status === 'rejected' && contribution.rejectionReason && (
                    <div className="rounded-lg bg-red-50 p-3">
                      <p className="mb-1 text-xs font-medium text-red-600">Motivo Rifiuto</p>
                      <p className="text-sm text-red-700">{contribution.rejectionReason}</p>
                    </div>
                  )}

                  {contribution.reviewerNotes && (
                    <div className="rounded-lg bg-blue-50 p-3">
                      <p className="mb-1 text-xs font-medium text-blue-600">Note Revisore</p>
                      <p className="text-sm text-blue-700">{contribution.reviewerNotes}</p>
                    </div>
                  )}

                  {contribution.reviewedAt && (
                    <div className="border-theme-bg-tertiary flex justify-between border-t pt-2 text-sm">
                      <span className="text-theme-text-tertiary">Revisionato</span>
                      <span className="text-theme-text-secondary">
                        {formatDate(contribution.reviewedAt, { locale: 'it-IT' })}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
