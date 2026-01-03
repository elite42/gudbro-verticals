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
    const [contribs, statsData] = await Promise.all([
      getMyContributions(),
      getContributionStats(),
    ]);
    setContributions(contribs);
    setStats(statsData);
    setIsLoading(false);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('it-IT', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div className="p-6 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto" />
        <p className="mt-3 text-theme-text-secondary">Caricamento...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      {stats && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{stats.approvedCount}</p>
            <p className="text-xs text-green-600">Approvati</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-yellow-700">{stats.pendingCount}</p>
            <p className="text-xs text-yellow-600">In Attesa</p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-purple-700">{stats.totalPointsEarned}</p>
            <p className="text-xs text-purple-600">Punti Guadagnati</p>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-blue-700">{stats.totalSubmissions}</p>
            <p className="text-xs text-blue-600">Totale Invii</p>
          </div>
        </div>
      )}

      {/* Add New Button */}
      <button
        onClick={onAddNew}
        className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:from-green-700 hover:to-green-800 transition-all shadow-lg"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Contribuisci un Ingrediente
      </button>

      {/* Contributions List */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-theme-text-tertiary uppercase tracking-wide">
          I Miei Contributi
        </h3>

        {contributions.length === 0 ? (
          <div className="text-center py-8 bg-theme-bg-secondary rounded-xl">
            <div className="w-16 h-16 bg-theme-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="text-3xl">🥬</span>
            </div>
            <p className="text-theme-text-secondary">Nessun contributo ancora</p>
            <p className="text-sm text-theme-text-tertiary mt-1">
              Inizia a contribuire per guadagnare punti!
            </p>
          </div>
        ) : (
          contributions.map((contribution) => (
            <div
              key={contribution.id}
              className="bg-theme-bg-secondary rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(expandedId === contribution.id ? null : contribution.id)}
                className="w-full p-4 flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-theme-bg-tertiary rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">🥬</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-theme-text-primary truncate">
                      {contribution.ingredientName}
                    </p>
                    <p className="text-xs text-theme-text-tertiary">
                      {formatDate(contribution.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution.status)}`}>
                    {getStatusText(contribution.status)}
                  </span>
                  <svg
                    className={`w-5 h-5 text-theme-text-tertiary transition-transform ${
                      expandedId === contribution.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Expanded Details */}
              {expandedId === contribution.id && (
                <div className="px-4 pb-4 border-t border-theme-bg-tertiary pt-3 space-y-3">
                  {contribution.category && (
                    <div className="flex justify-between text-sm">
                      <span className="text-theme-text-tertiary">Categoria</span>
                      <span className="text-theme-text-primary font-medium">{contribution.category}</span>
                    </div>
                  )}

                  {contribution.submittedJson.allergens && contribution.submittedJson.allergens.length > 0 && (
                    <div>
                      <span className="text-sm text-theme-text-tertiary">Allergeni</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {contribution.submittedJson.allergens.map((a) => (
                          <span key={a} className="px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs">
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {contribution.submittedJson.dietary && contribution.submittedJson.dietary.length > 0 && (
                    <div>
                      <span className="text-sm text-theme-text-tertiary">Dietetico</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {contribution.submittedJson.dietary.map((d) => (
                          <span key={d} className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs">
                            {d}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {contribution.pointsAwarded > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-theme-text-tertiary">Punti Guadagnati</span>
                      <span className="text-purple-600 font-bold">+{contribution.pointsAwarded}</span>
                    </div>
                  )}

                  {contribution.status === 'rejected' && contribution.rejectionReason && (
                    <div className="bg-red-50 rounded-lg p-3">
                      <p className="text-xs text-red-600 font-medium mb-1">Motivo Rifiuto</p>
                      <p className="text-sm text-red-700">{contribution.rejectionReason}</p>
                    </div>
                  )}

                  {contribution.reviewerNotes && (
                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-blue-600 font-medium mb-1">Note Revisore</p>
                      <p className="text-sm text-blue-700">{contribution.reviewerNotes}</p>
                    </div>
                  )}

                  {contribution.reviewedAt && (
                    <div className="flex justify-between text-sm pt-2 border-t border-theme-bg-tertiary">
                      <span className="text-theme-text-tertiary">Revisionato</span>
                      <span className="text-theme-text-secondary">{formatDate(contribution.reviewedAt)}</span>
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
