import { ChallengeStatsBarProps } from './types';

export function ChallengeStatsBar({ stats, t }: ChallengeStatsBarProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">{t('stats.total')}</p>
        <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">{t('stats.active')}</p>
        <p className="text-2xl font-bold text-green-600">{stats.active}</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">{t('stats.attempts')}</p>
        <p className="text-2xl font-bold text-orange-600">{stats.totalAttempts}</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-500">{t('stats.winners')}</p>
        <p className="text-2xl font-bold text-purple-600">{stats.totalWins}</p>
      </div>
    </div>
  );
}
