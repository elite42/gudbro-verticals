'use client';

import { useState, useEffect } from 'react';

interface Contributor {
  rank: number;
  accountId: string;
  displayName: string;
  avatarUrl: string | null;
  approvedCount: number;
  pointsEarned: number;
}

interface ContributorLeaderboardProps {
  limit?: number;
  showTitle?: boolean;
}

export function ContributorLeaderboard({
  limit = 10,
  showTitle = true,
}: ContributorLeaderboardProps) {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLeaderboard();
  }, [limit]);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`/api/ingredients/contributions/leaderboard?limit=${limit}`);

      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }

      const data = await response.json();
      setContributors(data.leaderboard);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load leaderboard');
    } finally {
      setLoading(false);
    }
  };

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return { emoji: '🥇', color: 'bg-yellow-100 text-yellow-800' };
      case 2:
        return { emoji: '🥈', color: 'bg-gray-100 text-gray-800' };
      case 3:
        return { emoji: '🥉', color: 'bg-orange-100 text-orange-800' };
      default:
        return { emoji: `#${rank}`, color: 'bg-gray-50 text-gray-600' };
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
        {showTitle && <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />}
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="flex-1 h-4 bg-gray-200 rounded" />
              <div className="w-16 h-4 bg-gray-200 rounded" />
            </div>
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
          onClick={fetchLeaderboard}
          className="mt-2 text-green-500 hover:underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (contributors.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {showTitle && (
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Contributors</h2>
        )}
        <div className="text-center py-8 text-gray-500">
          <p>No contributors yet. Be the first!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {showTitle && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">Top Contributors</h2>
          <span className="text-sm text-gray-500">Ingredient Database</span>
        </div>
      )}

      <div className="space-y-3">
        {contributors.map((contributor) => {
          const badge = getRankBadge(contributor.rank);

          return (
            <div
              key={contributor.accountId}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                contributor.rank <= 3 ? 'bg-gradient-to-r from-gray-50 to-white' : ''
              }`}
            >
              {/* Rank */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${badge.color}`}>
                {contributor.rank <= 3 ? badge.emoji : badge.emoji}
              </div>

              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {contributor.avatarUrl ? (
                  <img
                    src={contributor.avatarUrl}
                    alt={contributor.displayName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500 font-medium">
                    {contributor.displayName.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Name & Stats */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {contributor.displayName}
                </p>
                <p className="text-sm text-gray-500">
                  {contributor.approvedCount} ingredient{contributor.approvedCount !== 1 ? 's' : ''} approved
                </p>
              </div>

              {/* Points */}
              <div className="text-right">
                <p className="font-bold text-green-600">+{contributor.pointsEarned}</p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Call to Action */}
      <div className="mt-6 pt-4 border-t text-center">
        <p className="text-sm text-gray-600 mb-2">
          Contribute ingredients to earn points and climb the leaderboard!
        </p>
        <p className="text-xs text-gray-500">
          50 points per approved ingredient
        </p>
      </div>
    </div>
  );
}
