import { getDifficultyColor, getDifficultyLabel, formatTime } from '@/lib/challenges-service';
import { ChallengeCardProps } from './types';

export function ChallengeCard({
  challenge,
  t,
  onEdit,
  onAddAttempt,
  onWallOfFame,
  onToggleActive,
  onDelete,
}: ChallengeCardProps) {
  return (
    <div
      className={`overflow-hidden rounded-xl border bg-white ${
        challenge.is_active ? 'border-gray-200' : 'border-gray-300 opacity-60'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">{challenge.name}</h3>
            <p className="text-sm text-orange-100">
              {challenge.time_limit_minutes} min | {challenge.price_if_lose} EUR se perdi
            </p>
          </div>
          <span
            className={`rounded px-2 py-1 text-xs font-bold ${getDifficultyColor(challenge.difficulty)}`}
          >
            {getDifficultyLabel(challenge.difficulty)}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Items */}
        <div className="mb-4">
          <p className="mb-1 text-xs font-medium uppercase text-gray-500">{t('card.toFinish')}</p>
          <ul className="space-y-1">
            {challenge.items.slice(0, 3).map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                <span className="text-orange-500">•</span>
                {item.quantity} {item.name}
              </li>
            ))}
            {challenge.items.length > 3 && (
              <li className="text-sm text-gray-500">
                {t('card.moreItems', { count: challenge.items.length - 3 })}
              </li>
            )}
          </ul>
        </div>

        {/* Stats */}
        <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg bg-gray-50 p-3">
          <div>
            <p className="text-xs text-gray-500">{t('card.attempts')}</p>
            <p className="text-lg font-bold text-gray-900">{challenge.total_attempts}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">{t('card.winners')}</p>
            <p className="text-lg font-bold text-green-600">{challenge.total_wins}</p>
          </div>
        </div>

        {/* Record */}
        {challenge.record_time_minutes ? (
          <div className="mb-4 rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <p className="text-xs font-medium text-yellow-800">{t('card.record')}</p>
            <p className="text-lg font-bold text-yellow-900">
              {formatTime(challenge.record_time_minutes)}
            </p>
            <p className="text-xs text-yellow-700">
              {t('card.recordBy', { name: challenge.record_holder_name ?? '' })}
            </p>
          </div>
        ) : (
          <div className="mb-4 rounded-lg border border-gray-200 bg-gray-50 p-3">
            <p className="text-center text-sm font-medium text-gray-600">{t('card.noWinnerYet')}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onAddAttempt(challenge)}
            className="flex-1 rounded-lg bg-orange-600 px-3 py-2 text-sm font-medium text-white hover:bg-orange-700"
          >
            {t('card.addAttempt')}
          </button>
          <button
            onClick={() => onWallOfFame(challenge)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {t('card.wallOfFame')}
          </button>
          <button
            onClick={() => onEdit(challenge)}
            className="rounded-lg border border-gray-300 p-2 text-gray-500 hover:bg-gray-50"
            title="Modifica"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onToggleActive(challenge.id, !challenge.is_active)}
            className={`rounded-lg border p-2 ${
              challenge.is_active
                ? 'border-gray-300 text-gray-500 hover:bg-gray-50'
                : 'border-green-300 text-green-600 hover:bg-green-50'
            }`}
            title={challenge.is_active ? 'Disattiva' : 'Attiva'}
          >
            {challenge.is_active ? (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            )}
          </button>
          <button
            onClick={() => onDelete(challenge.id)}
            className="rounded-lg border border-red-200 p-2 text-red-500 hover:bg-red-50"
            title="Elimina"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
