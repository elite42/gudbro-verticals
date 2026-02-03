'use client';

import { useState, useEffect } from 'react';
import { getWallOfFame, formatTime, WallOfFameEntry } from '@/lib/challenges-service';
import { WallOfFameModalProps } from './types';

export function WallOfFameModal({ challenge, onClose }: WallOfFameModalProps) {
  const [entries, setEntries] = useState<WallOfFameEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getWallOfFame(challenge.id, 20);
        setEntries(data);
      } catch (error) {
        console.error('Error loading wall of fame:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [challenge.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="m-4 max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Wall of Fame</h2>
              <p className="text-sm text-gray-500">{challenge.name}</p>
            </div>
            <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-gray-100">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-orange-600"></div>
            </div>
          ) : entries.length === 0 ? (
            <div className="py-12 text-center">
              <span className="mb-4 block text-5xl">🏆</span>
              <p className="text-lg font-medium text-gray-900">Nessuno ha ancora vinto!</p>
              <p className="text-sm text-gray-500">Sarai tu il primo?</p>
            </div>
          ) : (
            <div className="space-y-3">
              {entries.map((entry, idx) => (
                <div
                  key={idx}
                  className={`flex items-center gap-4 rounded-xl p-4 ${
                    entry.is_current_record
                      ? 'border-2 border-yellow-400 bg-yellow-50'
                      : 'border border-gray-200 bg-gray-50'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                      entry.rank === 1
                        ? 'bg-yellow-400 text-yellow-900'
                        : entry.rank === 2
                          ? 'bg-gray-300 text-gray-700'
                          : entry.rank === 3
                            ? 'bg-amber-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {entry.rank}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-gray-900">{entry.participant_name}</p>
                      {entry.is_current_record && (
                        <span className="rounded bg-yellow-400 px-1.5 py-0.5 text-[10px] font-bold text-yellow-900">
                          RECORD
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{entry.attempt_date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-orange-600">
                      {formatTime(entry.completion_time_minutes)}
                    </p>
                    <p className="text-xs text-gray-500">minuti</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
