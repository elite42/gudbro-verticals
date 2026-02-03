import { FoodChallenge, ChallengeFormData, AttemptFormData } from '@/lib/challenges-service';

// ============================================
// SHARED TYPES FOR CHALLENGES PAGE
// ============================================

export type ChallengeFilter = 'all' | 'active' | 'inactive';

export interface ChallengeStats {
  total: number;
  active: number;
  totalAttempts: number;
  totalWins: number;
}

export interface ChallengeFormModalProps {
  challenge: FoodChallenge | null;
  merchantId: string;
  onClose: () => void;
  onSave: (data: ChallengeFormData) => Promise<void>;
}

export interface AttemptModalProps {
  challenge: FoodChallenge;
  onClose: () => void;
  onSave: (data: AttemptFormData) => Promise<void>;
}

export interface WallOfFameModalProps {
  challenge: FoodChallenge;
  onClose: () => void;
}

export interface ChallengeCardProps {
  challenge: FoodChallenge;
  t: (key: string, params?: Record<string, string | number>) => string;
  onEdit: (challenge: FoodChallenge) => void;
  onAddAttempt: (challenge: FoodChallenge) => void;
  onWallOfFame: (challenge: FoodChallenge) => void;
  onToggleActive: (id: string, isActive: boolean) => void;
  onDelete: (id: string) => void;
}

export interface ChallengeStatsBarProps {
  stats: ChallengeStats;
  t: (key: string) => string;
}

export interface ChallengeFiltersProps {
  filter: ChallengeFilter;
  onFilterChange: (filter: ChallengeFilter) => void;
  t: (key: string) => string;
}

export type FormStep = 'basics' | 'reward' | 'record' | 'availability';
