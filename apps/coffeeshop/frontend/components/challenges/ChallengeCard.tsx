'use client';

import { useState } from 'react';
import {
  FoodChallenge,
  DIFFICULTY_CONFIG,
  WIN_REWARD_CONFIG,
  formatTime,
  getSuccessRate,
  isAvailableNow,
  getAvailabilityText,
} from '@/lib/challenges-service';

interface ChallengeCardProps {
  challenge: FoodChallenge;
  variant?: 'full' | 'compact' | 'mini';
  onDetailsClick?: (challenge: FoodChallenge) => void;
  onBookClick?: (challenge: FoodChallenge) => void;
}

export function ChallengeCard({
  challenge,
  variant = 'full',
  onDetailsClick,
  onBookClick,
}: ChallengeCardProps) {
  const [imageError, setImageError] = useState(false);
  const difficultyConfig = DIFFICULTY_CONFIG[challenge.difficulty];
  const rewardConfig = WIN_REWARD_CONFIG[challenge.winRewardType];
  const successRate = getSuccessRate(challenge);
  const available = isAvailableNow(challenge);
  const neverWon = challenge.totalWins === 0 && challenge.totalAttempts > 0;

  if (variant === 'mini') {
    return (
      <button
        onClick={() => onDetailsClick?.(challenge)}
        className="flex w-full items-center gap-3 rounded-xl bg-white p-3 text-left transition-colors hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-red-500 text-lg">
          🏆
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
            {challenge.name}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {challenge.timeLimitMinutes} min | {challenge.priceIfLose}€
          </p>
        </div>
        <span
          className={`px-2 py-0.5 ${difficultyConfig.bgColor} ${difficultyConfig.color} rounded-full text-xs font-medium`}
        >
          {difficultyConfig.labelIt}
        </span>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={() => onDetailsClick?.(challenge)}
        className="flex w-full gap-4 rounded-2xl bg-white p-4 text-left transition-all hover:shadow-md dark:bg-gray-800"
      >
        {/* Image or Icon */}
        <div className="flex-shrink-0">
          {challenge.imageUrl && !imageError ? (
            <img
              src={challenge.imageUrl}
              alt={challenge.name}
              className="h-20 w-20 rounded-xl object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-red-500 text-3xl">
              🍔
            </div>
          )}
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <span
              className={`px-2 py-0.5 ${difficultyConfig.bgColor} ${difficultyConfig.color} rounded-full text-xs font-medium`}
            >
              {difficultyConfig.labelIt}
            </span>
            {!available && (
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-700">
                Non disponibile
              </span>
            )}
          </div>
          <h3 className="truncate font-bold text-gray-900 dark:text-white">{challenge.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {challenge.timeLimitMinutes} min | {challenge.priceIfLose}€ se perdi
          </p>
          <div className="mt-1 flex items-center gap-2">
            {neverWon ? (
              <span className="text-xs font-medium text-red-600 dark:text-red-400">
                Nessuno ha mai vinto!
              </span>
            ) : challenge.recordTimeMinutes ? (
              <span className="text-xs text-yellow-600 dark:text-yellow-400">
                Record: {formatTime(challenge.recordTimeMinutes)}
              </span>
            ) : null}
          </div>
        </div>

        <svg
          className="h-5 w-5 flex-shrink-0 self-center text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    );
  }

  // Full variant
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg dark:bg-gray-800">
      {/* Image Header */}
      <div className="relative">
        {challenge.imageUrl && !imageError ? (
          <img
            src={challenge.imageUrl}
            alt={challenge.name}
            className="h-48 w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
            <span className="text-6xl">🏆</span>
          </div>
        )}

        {/* Overlay badges */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 ${difficultyConfig.bgColor} ${difficultyConfig.color} rounded-full text-sm font-bold shadow-lg`}
          >
            {difficultyConfig.labelIt}
          </span>
          {!available && (
            <span className="rounded-full bg-gray-800/80 px-3 py-1 text-sm font-medium text-white shadow-lg">
              Non disponibile ora
            </span>
          )}
        </div>

        {/* Prize badge */}
        <div className="absolute right-3 top-3 rounded-lg bg-white px-3 py-2 text-center shadow-lg dark:bg-gray-900">
          <p className="text-lg">{rewardConfig.icon}</p>
          <p className="text-xs font-bold text-gray-900 dark:text-white">{rewardConfig.labelIt}</p>
        </div>

        {/* "Never won" or Record banner */}
        {neverWon ? (
          <div className="absolute bottom-0 left-0 right-0 bg-red-600 px-4 py-2 text-center text-white">
            <p className="text-sm font-bold">NESSUNO HA MAI VINTO!</p>
            <p className="text-xs opacity-90">Sarai tu il primo?</p>
          </div>
        ) : (
          challenge.recordTimeMinutes && (
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-2 bg-yellow-500 px-4 py-2 text-yellow-900">
              <span className="text-lg">🥇</span>
              <div>
                <p className="text-sm font-bold">
                  Record: {formatTime(challenge.recordTimeMinutes)}
                </p>
                <p className="text-xs">di {challenge.recordHolderName}</p>
              </div>
            </div>
          )
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">{challenge.name}</h3>

        {/* Description */}
        {challenge.description && (
          <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {challenge.description}
          </p>
        )}

        {/* Challenge details */}
        <div className="mb-4 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50">
            <p className="text-xs text-gray-500 dark:text-gray-400">Tempo limite</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {challenge.timeLimitMinutes} min
            </p>
          </div>
          <div className="rounded-xl bg-gray-50 p-3 dark:bg-gray-700/50">
            <p className="text-xs text-gray-500 dark:text-gray-400">Se perdi</p>
            <p className="text-lg font-bold text-gray-900 dark:text-white">
              {challenge.priceIfLose}€
            </p>
          </div>
        </div>

        {/* What to eat */}
        <div className="mb-4">
          <p className="mb-2 text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
            Da finire:
          </p>
          <div className="flex flex-wrap gap-2">
            {challenge.items.slice(0, 4).map((item, idx) => (
              <span
                key={idx}
                className="rounded-full bg-orange-100 px-3 py-1 text-sm text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
              >
                {item.quantity} {item.name}
              </span>
            ))}
            {challenge.items.length > 4 && (
              <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                +{challenge.items.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mb-4 flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <span>👥</span>
            <span>{challenge.totalAttempts} tentativi</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <span>🏆</span>
            <span>{challenge.totalWins} vincitori</span>
          </div>
          {successRate > 0 && (
            <div
              className={`flex items-center gap-1 ${successRate < 20 ? 'text-red-600' : successRate < 50 ? 'text-orange-600' : 'text-green-600'}`}
            >
              <span>{successRate}%</span>
            </div>
          )}
        </div>

        {/* Record breaker bonus */}
        {challenge.recordBonusEnabled && (
          <div className="mb-4 rounded-xl border border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50 p-3 dark:border-yellow-800 dark:from-yellow-900/20 dark:to-amber-900/20">
            <div className="flex items-center gap-2">
              <span className="text-xl">⚡</span>
              <div>
                <p className="text-sm font-bold text-yellow-800 dark:text-yellow-300">
                  Bonus Record Breaker!
                </p>
                <p className="text-xs text-yellow-700 dark:text-yellow-400">
                  {challenge.recordBonusCash && `+${challenge.recordBonusCash}€`}
                  {challenge.recordBonusCash && challenge.recordBonusPrize && ' + '}
                  {challenge.recordBonusPrize}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Team challenge badge */}
        {challenge.isTeamChallenge && (
          <div className="mb-4 flex items-center gap-2 text-sm text-purple-600 dark:text-purple-400">
            <span>👥</span>
            <span>Sfida di squadra ({challenge.teamSize} persone)</span>
          </div>
        )}

        {/* Availability */}
        <p className="mb-4 text-xs text-gray-500 dark:text-gray-400">
          📅 {getAvailabilityText(challenge)}
        </p>

        {/* Action buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onDetailsClick?.(challenge)}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Dettagli
          </button>
          {challenge.requiresBooking && available && (
            <button
              onClick={() => onBookClick?.(challenge)}
              className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 font-medium text-white transition-opacity hover:opacity-90"
            >
              Prenota
            </button>
          )}
          {!challenge.requiresBooking && available && (
            <button
              onClick={() => onDetailsClick?.(challenge)}
              className="flex-1 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-4 py-3 font-medium text-white transition-opacity hover:opacity-90"
            >
              Accetta la Sfida!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
