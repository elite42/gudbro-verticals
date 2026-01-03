'use client';

import { useState, useEffect } from 'react';

interface Stats {
  total: number;
  pending: number;
  inReview: number;
  approved: number;
  merged: number;
  rejected: number;
  duplicate: number;
  totalPointsEarned: number;
  contributorPoints: number;
  approvalRate: number;
  successCount: number;
}

interface ContributionStatsProps {
  accountId?: string;
  onContributeClick?: () => void;
}

export function ContributionStats({ onContributeClick }: ContributionStatsProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/ingredients/contributions/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('auth_token') || ''}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch stats');
      }

      const data = await response.json();
      setStats(data.stats);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load stats');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-200 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <p className="text-red-500">{error}</p>
        <button
          onClick={fetchStats}
          className="mt-2 text-green-500 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const hasContributions = stats.total > 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Your Contributions</h2>
          <p className="text-sm text-gray-500">
            Help grow the ingredient database
          </p>
        </div>
        {onContributeClick && (
          <button
            onClick={onContributeClick}
            className="bg-green-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Ingredient
          </button>
        )}
      </div>

      {!hasContributions ? (
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="font-medium text-gray-900 mb-2">No contributions yet</h3>
          <p className="text-sm text-gray-500 mb-4">
            Start contributing ingredients and earn 50 points for each approved submission!
          </p>
          {onContributeClick && (
            <button
              onClick={onContributeClick}
              className="bg-green-500 text-white px-6 py-2 rounded-xl font-medium hover:bg-green-600 transition-colors"
            >
              Submit Your First Ingredient
            </button>
          )}
        </div>
      ) : (
        <>
          {/* Points Summary */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Contributor Points</p>
                <p className="text-3xl font-bold">{stats.contributorPoints}</p>
              </div>
              <div className="text-right">
                <p className="text-green-100 text-sm">Points from Contributions</p>
                <p className="text-2xl font-bold">{stats.totalPointsEarned}</p>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <p className="text-sm text-gray-500">Total</p>
            </div>
            <div className="bg-yellow-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{stats.pending + stats.inReview}</p>
              <p className="text-sm text-yellow-600">Pending</p>
            </div>
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{stats.successCount}</p>
              <p className="text-sm text-green-600">Approved</p>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{stats.approvalRate}%</p>
              <p className="text-sm text-blue-600">Approval Rate</p>
            </div>
          </div>

          {/* Breakdown */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">Status Breakdown</h3>
            <div className="space-y-2">
              {stats.pending > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                    Pending Review
                  </span>
                  <span className="font-medium">{stats.pending}</span>
                </div>
              )}
              {stats.inReview > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full" />
                    In Review
                  </span>
                  <span className="font-medium">{stats.inReview}</span>
                </div>
              )}
              {stats.approved > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Approved
                  </span>
                  <span className="font-medium">{stats.approved}</span>
                </div>
              )}
              {stats.merged > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-400 rounded-full" />
                    Merged
                  </span>
                  <span className="font-medium">{stats.merged}</span>
                </div>
              )}
              {stats.rejected > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full" />
                    Rejected
                  </span>
                  <span className="font-medium">{stats.rejected}</span>
                </div>
              )}
              {stats.duplicate > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-gray-400 rounded-full" />
                    Duplicate
                  </span>
                  <span className="font-medium">{stats.duplicate}</span>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
