'use client';

import { useState, useEffect } from 'react';
import { FoodChallenge, getActiveChallenges } from '@/lib/challenges-service';
import { ChallengeCard } from './ChallengeCard';
import { ChallengeDetailsModal } from './ChallengeDetailsModal';

interface ChallengesListProps {
  merchantId: string;
  variant?: 'full' | 'compact' | 'mini';
  maxItems?: number;
  showTitle?: boolean;
  onAcceptChallenge?: (challenge: FoodChallenge) => void;
}

export function ChallengesList({
  merchantId,
  variant = 'compact',
  maxItems,
  showTitle = true,
  onAcceptChallenge,
}: ChallengesListProps) {
  const [challenges, setChallenges] = useState<FoodChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState<FoodChallenge | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getActiveChallenges(merchantId);
        setChallenges(maxItems ? data.slice(0, maxItems) : data);
      } catch (error) {
        console.error('Error loading challenges:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [merchantId, maxItems]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-orange-600"></div>
      </div>
    );
  }

  if (challenges.length === 0) {
    return null; // Don't show section if no challenges
  }

  return (
    <div>
      {showTitle && (
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏆</span>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Food Challenges</h2>
          </div>
          {maxItems && challenges.length >= maxItems && (
            <button className="text-sm font-medium text-orange-600 hover:underline">
              Vedi tutte
            </button>
          )}
        </div>
      )}

      {variant === 'mini' ? (
        <div className="space-y-2">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              variant="mini"
              onDetailsClick={setSelectedChallenge}
            />
          ))}
        </div>
      ) : variant === 'compact' ? (
        <div className="space-y-3">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              variant="compact"
              onDetailsClick={setSelectedChallenge}
            />
          ))}
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {challenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              variant="full"
              onDetailsClick={setSelectedChallenge}
            />
          ))}
        </div>
      )}

      {/* Details Modal */}
      {selectedChallenge && (
        <ChallengeDetailsModal
          challenge={selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
          onAcceptChallenge={(c) => {
            setSelectedChallenge(null);
            onAcceptChallenge?.(c);
          }}
        />
      )}
    </div>
  );
}

// Horizontal scrolling variant for homepage
export function ChallengesCarousel({ merchantId }: { merchantId: string }) {
  const [challenges, setChallenges] = useState<FoodChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedChallenge, setSelectedChallenge] = useState<FoodChallenge | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await getActiveChallenges(merchantId);
        setChallenges(data);
      } catch (error) {
        console.error('Error loading challenges:', error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [merchantId]);

  if (loading || challenges.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🏆</span>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">Sfide Alimentari</h2>
        </div>
      </div>

      <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4">
        {challenges.map((challenge) => (
          <div key={challenge.id} className="w-72 flex-shrink-0 snap-start">
            <ChallengeCard
              challenge={challenge}
              variant="full"
              onDetailsClick={setSelectedChallenge}
            />
          </div>
        ))}
      </div>

      {selectedChallenge && (
        <ChallengeDetailsModal
          challenge={selectedChallenge}
          onClose={() => setSelectedChallenge(null)}
        />
      )}
    </div>
  );
}
