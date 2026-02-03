'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { useTenant } from '@/lib/contexts/TenantContext';
import { InfoTooltip } from '@/components/ui/info-tooltip';
import {
  FoodChallenge,
  ChallengeFormData,
  AttemptFormData,
  getChallenges,
  createChallenge,
  updateChallenge,
  deleteChallenge,
  toggleChallengeActive,
  createAttempt,
} from '@/lib/challenges-service';
import { ChallengeFilter } from './components/types';
import { ChallengeFormModal } from './components/ChallengeFormModal';
import { AttemptModal } from './components/AttemptModal';
import { WallOfFameModal } from './components/WallOfFameModal';
import { ChallengeStatsBar } from './components/ChallengeStatsBar';
import { ChallengeFilters } from './components/ChallengeFilters';
import { ChallengeCard } from './components/ChallengeCard';
import { ChallengeTips } from './components/ChallengeTips';

export default function ChallengesPage() {
  const t = useTranslations('challenges');
  const { organization } = useTenant();
  const [challenges, setChallenges] = useState<FoodChallenge[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedChallenge, setSelectedChallenge] = useState<FoodChallenge | null>(null);
  const [attemptChallenge, setAttemptChallenge] = useState<FoodChallenge | null>(null);
  const [wallOfFameChallenge, setWallOfFameChallenge] = useState<FoodChallenge | null>(null);
  const [filter, setFilter] = useState<ChallengeFilter>('all');

  // Use organization ID as merchant ID (they map 1:1 in our schema)
  const merchantId = organization?.id || 'demo-merchant-id';

  const loadChallenges = useCallback(async () => {
    if (!merchantId) return;
    setLoading(true);
    try {
      const data = await getChallenges(merchantId);
      setChallenges(data);
    } catch (error) {
      console.error('Error loading challenges:', error);
    } finally {
      setLoading(false);
    }
  }, [merchantId]);

  useEffect(() => {
    loadChallenges();
  }, [loadChallenges]);

  const filteredChallenges =
    filter === 'all'
      ? challenges
      : filter === 'active'
        ? challenges.filter((c) => c.is_active)
        : challenges.filter((c) => !c.is_active);

  const stats = {
    total: challenges.length,
    active: challenges.filter((c) => c.is_active).length,
    totalAttempts: challenges.reduce((sum, c) => sum + c.total_attempts, 0),
    totalWins: challenges.reduce((sum, c) => sum + c.total_wins, 0),
  };

  const handleSaveChallenge = async (data: ChallengeFormData) => {
    if (selectedChallenge) {
      await updateChallenge(selectedChallenge.id, data);
    } else {
      await createChallenge(merchantId, data);
    }
    await loadChallenges();
    setShowCreateModal(false);
    setSelectedChallenge(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm(t('actions.confirmDelete'))) {
      await deleteChallenge(id);
      await loadChallenges();
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    await toggleChallengeActive(id, isActive);
    await loadChallenges();
  };

  const handleSaveAttempt = async (data: AttemptFormData) => {
    if (!attemptChallenge) return;
    await createAttempt(attemptChallenge.id, merchantId, data);
    await loadChallenges();
    setAttemptChallenge(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-orange-600"></div>
          <p className="text-sm text-gray-500">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
            <InfoTooltip contentKey="pages.challenges" kbPageId="food-challenges" />
          </div>
          <p className="mt-1 text-sm text-gray-500">{t('description')}</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white transition-colors hover:bg-orange-700"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('newChallenge')}
        </button>
      </div>

      {/* Stats */}
      <ChallengeStatsBar stats={stats} t={t} />

      {/* Filters */}
      <ChallengeFilters filter={filter} onFilterChange={setFilter} t={t} />

      {/* Challenges Grid */}
      {filteredChallenges.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center">
          <span className="mb-4 block text-5xl">🍔</span>
          <h3 className="mb-2 text-lg font-medium text-gray-900">{t('empty.title')}</h3>
          <p className="mb-4 text-gray-500">{t('empty.description')}</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            {t('empty.action')}
          </button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredChallenges.map((challenge) => (
            <ChallengeCard
              key={challenge.id}
              challenge={challenge}
              t={t}
              onEdit={setSelectedChallenge}
              onAddAttempt={setAttemptChallenge}
              onWallOfFame={setWallOfFameChallenge}
              onToggleActive={handleToggleActive}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Tips */}
      <ChallengeTips />

      {/* Modals */}
      {(showCreateModal || selectedChallenge) && (
        <ChallengeFormModal
          challenge={selectedChallenge}
          merchantId={merchantId}
          onClose={() => {
            setShowCreateModal(false);
            setSelectedChallenge(null);
          }}
          onSave={handleSaveChallenge}
        />
      )}

      {attemptChallenge && (
        <AttemptModal
          challenge={attemptChallenge}
          onClose={() => setAttemptChallenge(null)}
          onSave={handleSaveAttempt}
        />
      )}

      {wallOfFameChallenge && (
        <WallOfFameModal
          challenge={wallOfFameChallenge}
          onClose={() => setWallOfFameChallenge(null)}
        />
      )}
    </div>
  );
}
