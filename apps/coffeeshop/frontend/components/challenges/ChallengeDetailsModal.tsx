'use client';

import { useState, useEffect } from 'react';
import {
  FoodChallenge,
  WallOfFameEntry,
  DIFFICULTY_CONFIG,
  WIN_REWARD_CONFIG,
  formatTime,
  formatTimeVerbose,
  getSuccessRate,
  isAvailableNow,
  getAvailabilityText,
  getWallOfFame,
} from '@/lib/challenges-service';

interface ChallengeDetailsModalProps {
  challenge: FoodChallenge;
  onClose: () => void;
  onAcceptChallenge?: (challenge: FoodChallenge) => void;
}

export function ChallengeDetailsModal({
  challenge,
  onClose,
  onAcceptChallenge,
}: ChallengeDetailsModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'walloffame' | 'rules'>('details');
  const [wallOfFame, setWallOfFame] = useState<WallOfFameEntry[]>([]);
  const [loadingWallOfFame, setLoadingWallOfFame] = useState(false);

  const difficultyConfig = DIFFICULTY_CONFIG[challenge.difficulty];
  const rewardConfig = WIN_REWARD_CONFIG[challenge.winRewardType];
  const successRate = getSuccessRate(challenge);
  const available = isAvailableNow(challenge);
  const neverWon = challenge.totalWins === 0;

  // Load wall of fame when tab is selected
  useEffect(() => {
    if (activeTab === 'walloffame' && wallOfFame.length === 0) {
      setLoadingWallOfFame(true);
      getWallOfFame(challenge.id, 20)
        .then(setWallOfFame)
        .finally(() => setLoadingWallOfFame(false));
    }
  }, [activeTab, challenge.id, wallOfFame.length]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-hidden rounded-t-3xl bg-white dark:bg-gray-900 sm:rounded-2xl">
        {/* Header with image */}
        <div className="relative h-56">
          {challenge.imageUrl ? (
            <img
              src={challenge.imageUrl}
              alt={challenge.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-orange-500 via-red-500 to-pink-500">
              <span className="text-8xl">🏆</span>
            </div>
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Difficulty badge */}
          <div className="absolute left-4 top-4">
            <span
              className={`px-3 py-1 ${difficultyConfig.bgColor} ${difficultyConfig.color} rounded-full text-sm font-bold`}
            >
              {difficultyConfig.labelIt}
            </span>
          </div>

          {/* Title and stats */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="mb-2 text-2xl font-bold text-white">{challenge.name}</h2>
            <div className="flex items-center gap-3 text-sm text-white/80">
              <span>⏱️ {challenge.timeLimitMinutes} min</span>
              <span>💰 {challenge.priceIfLose}€ se perdi</span>
              {challenge.isTeamChallenge && <span>👥 {challenge.teamSize} persone</span>}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          {[
            { id: 'details', label: 'Dettagli', icon: '📋' },
            { id: 'walloffame', label: 'Wall of Fame', icon: '🏆' },
            { id: 'rules', label: 'Regole', icon: '📜' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-orange-600 text-orange-600'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="max-h-[40vh] overflow-y-auto p-4">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-4">
              {/* Description */}
              {challenge.description && (
                <p className="text-gray-600 dark:text-gray-400">{challenge.description}</p>
              )}

              {/* What to eat */}
              <div>
                <h4 className="mb-2 font-bold text-gray-900 dark:text-white">Da completare:</h4>
                <div className="space-y-2">
                  {challenge.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 p-3 dark:bg-gray-800"
                    >
                      <span className="text-xl">🍽️</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="rounded-xl bg-gray-50 p-3 text-center dark:bg-gray-800">
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {challenge.totalAttempts}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Tentativi</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 text-center dark:bg-gray-800">
                  <p className="text-2xl font-bold text-green-600">{challenge.totalWins}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Vincitori</p>
                </div>
                <div className="rounded-xl bg-gray-50 p-3 text-center dark:bg-gray-800">
                  <p
                    className={`text-2xl font-bold ${successRate < 20 ? 'text-red-600' : successRate < 50 ? 'text-orange-600' : 'text-green-600'}`}
                  >
                    {successRate}%
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Successo</p>
                </div>
              </div>

              {/* Never won banner */}
              {neverWon && challenge.totalAttempts > 0 && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center dark:border-red-800 dark:bg-red-900/20">
                  <p className="text-lg font-bold text-red-700 dark:text-red-400">
                    NESSUNO HA MAI VINTO!
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-500">
                    {challenge.totalAttempts} sfidanti hanno provato e fallito
                  </p>
                </div>
              )}

              {/* Record */}
              {challenge.recordTimeMinutes && (
                <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🥇</span>
                    <div>
                      <p className="font-bold text-yellow-800 dark:text-yellow-300">
                        Record: {formatTimeVerbose(challenge.recordTimeMinutes)}
                      </p>
                      <p className="text-sm text-yellow-700 dark:text-yellow-400">
                        di {challenge.recordHolderName} ({challenge.recordDate})
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Prize info */}
              <div className="rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 p-4 dark:from-green-900/20 dark:to-emerald-900/20">
                <h4 className="mb-2 font-bold text-green-800 dark:text-green-300">Se Vinci:</h4>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{rewardConfig.icon}</span>
                  <div>
                    <p className="font-medium text-green-700 dark:text-green-400">
                      {rewardConfig.labelIt}
                    </p>
                    {challenge.winCashPrize && (
                      <p className="text-sm text-green-600 dark:text-green-500">
                        +{challenge.winCashPrize}€ in contanti
                      </p>
                    )}
                    {challenge.winPrizeName && (
                      <p className="text-sm text-green-600 dark:text-green-500">
                        {challenge.winPrizeName}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Record breaker bonus */}
              {challenge.recordBonusEnabled && (
                <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50 to-yellow-50 p-4 dark:border-amber-800 dark:from-amber-900/20 dark:to-yellow-900/20">
                  <h4 className="mb-2 flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
                    <span>⚡</span> Bonus Record Breaker!
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-400">
                    Batti il record e ottieni:
                    {challenge.recordBonusCash && (
                      <span className="font-bold"> +{challenge.recordBonusCash}€</span>
                    )}
                    {challenge.recordBonusCash && challenge.recordBonusPrize && ' + '}
                    {challenge.recordBonusPrize && (
                      <span className="font-bold">{challenge.recordBonusPrize}</span>
                    )}
                  </p>
                  {challenge.recordBonusDescription && (
                    <p className="mt-1 text-xs text-amber-600 dark:text-amber-500">
                      {challenge.recordBonusDescription}
                    </p>
                  )}
                </div>
              )}

              {/* Availability */}
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <span>📅</span>
                <span>{getAvailabilityText(challenge)}</span>
              </div>
            </div>
          )}

          {/* Wall of Fame Tab */}
          {activeTab === 'walloffame' && (
            <div>
              {loadingWallOfFame ? (
                <div className="flex items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-orange-600"></div>
                </div>
              ) : wallOfFame.length === 0 ? (
                <div className="py-12 text-center">
                  <span className="mb-4 block text-5xl">🏆</span>
                  <p className="text-lg font-medium text-gray-900 dark:text-white">
                    Nessun vincitore ancora!
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Sarai tu il primo a entrare nel Wall of Fame?
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {wallOfFame.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center gap-4 rounded-xl p-4 ${
                        entry.isCurrentRecord
                          ? 'border-2 border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                          : 'bg-gray-50 dark:bg-gray-800'
                      }`}
                    >
                      {/* Rank */}
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold ${
                          entry.rank === 1
                            ? 'bg-yellow-400 text-yellow-900'
                            : entry.rank === 2
                              ? 'bg-gray-300 text-gray-700'
                              : entry.rank === 3
                                ? 'bg-amber-600 text-white'
                                : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                        }`}
                      >
                        {entry.rank <= 3 ? ['🥇', '🥈', '🥉'][entry.rank - 1] : entry.rank}
                      </div>

                      {/* Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-gray-900 dark:text-white">
                            {entry.participantName}
                          </p>
                          {entry.isCurrentRecord && (
                            <span className="rounded-full bg-yellow-400 px-2 py-0.5 text-xs font-bold text-yellow-900">
                              RECORD
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {entry.attemptDate}
                        </p>
                      </div>

                      {/* Time */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-orange-600">
                          {formatTime(entry.completionTimeMinutes)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">min</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Rules Tab */}
          {activeTab === 'rules' && (
            <div className="space-y-4">
              <div className="rounded-xl bg-red-50 p-4 dark:bg-red-900/20">
                <h4 className="mb-3 font-bold text-red-800 dark:text-red-300">
                  Regole della Sfida:
                </h4>
                {challenge.rules.length > 0 ? (
                  <ul className="space-y-2">
                    {challenge.rules.map((rule, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-red-700 dark:text-red-400"
                      >
                        <span className="text-red-500">❌</span>
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-red-600 dark:text-red-500">Nessuna regola specifica</p>
                )}
              </div>

              <div className="rounded-xl bg-blue-50 p-4 dark:bg-blue-900/20">
                <h4 className="mb-3 font-bold text-blue-800 dark:text-blue-300">Come Funziona:</h4>
                <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-400">
                  <li className="flex items-start gap-2">
                    <span>1️⃣</span>
                    <span>Ordina la sfida e preparati</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>2️⃣</span>
                    <span>Il timer parte quando inizia il personale</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>3️⃣</span>
                    <span>Completa tutto entro {challenge.timeLimitMinutes} minuti</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span>4️⃣</span>
                    <span>
                      Vinci = {rewardConfig.labelIt}! Perdi = Paghi {challenge.priceIfLose}€
                    </span>
                  </li>
                </ul>
              </div>

              {challenge.requiresBooking && (
                <div className="rounded-xl bg-purple-50 p-4 dark:bg-purple-900/20">
                  <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300">
                    <span>📅</span>
                    <span className="font-medium">Questa sfida richiede prenotazione</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer action */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-700">
          {available ? (
            <button
              onClick={() => onAcceptChallenge?.(challenge)}
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-red-500 py-4 text-lg font-bold text-white transition-opacity hover:opacity-90"
            >
              {challenge.requiresBooking ? 'Prenota la Sfida' : 'ACCETTO LA SFIDA!'}
            </button>
          ) : (
            <div className="py-3 text-center text-gray-500 dark:text-gray-400">
              <p className="font-medium">Non disponibile in questo momento</p>
              <p className="text-sm">{getAvailabilityText(challenge)}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
