// Food Challenges Service for PWA
// Fetches challenges and wall of fame data for customers

import { supabase, isSupabaseConfigured } from '@/lib/supabase';

// ============================================
// TYPES
// ============================================

export type ChallengeDifficulty = 'easy' | 'medium' | 'hard' | 'extreme';
export type WinRewardType = 'free' | 'free_plus_cash' | 'free_plus_prize';

export interface ChallengeItem {
  name: string;
  quantity: string;
  description?: string;
}

export interface FoodChallenge {
  id: string;
  merchantId: string;

  // Basic info
  name: string;
  description: string | null;
  imageUrl: string | null;

  // Challenge details
  items: ChallengeItem[];
  timeLimitMinutes: number;
  priceIfLose: number;
  rules: string[];
  difficulty: ChallengeDifficulty;

  // Win reward
  winRewardType: WinRewardType;
  winCashPrize: number | null;
  winPrizeName: string | null;
  winPrizeDescription: string | null;

  // Record breaker bonus
  recordBonusEnabled: boolean;
  recordBonusCash: number | null;
  recordBonusPrize: string | null;
  recordBonusDescription: string | null;

  // Current record
  recordTimeMinutes: number | null;
  recordHolderName: string | null;
  recordDate: string | null;

  // Stats
  totalAttempts: number;
  totalWins: number;

  // Team challenge
  isTeamChallenge: boolean;
  teamSize: number | null;

  // Availability
  requiresBooking: boolean;
  availableDays: number[] | null;
  availableTimeStart: string | null;
  availableTimeEnd: string | null;

  // Status
  isActive: boolean;
}

export interface WallOfFameEntry {
  rank: number;
  participantName: string;
  completionTimeMinutes: number;
  attemptDate: string;
  photoUrl: string | null;
  videoUrl: string | null;
  isCurrentRecord: boolean;
}

export interface ChallengeStats {
  totalAttempts: number;
  totalWins: number;
  successRate: number;
  recordTimeMinutes: number | null;
  recordHolderName: string | null;
  recordDate: string | null;
  hasEverBeenWon: boolean;
}

// ============================================
// CONFIG
// ============================================

export const DIFFICULTY_CONFIG: Record<
  ChallengeDifficulty,
  { label: string; labelIt: string; color: string; bgColor: string }
> = {
  easy: { label: 'Easy', labelIt: 'Facile', color: 'text-green-700', bgColor: 'bg-green-100' },
  medium: { label: 'Medium', labelIt: 'Media', color: 'text-yellow-700', bgColor: 'bg-yellow-100' },
  hard: { label: 'Hard', labelIt: 'Difficile', color: 'text-orange-700', bgColor: 'bg-orange-100' },
  extreme: { label: 'Extreme', labelIt: 'Estrema', color: 'text-red-700', bgColor: 'bg-red-100' },
};

export const WIN_REWARD_CONFIG: Record<
  WinRewardType,
  { label: string; labelIt: string; icon: string }
> = {
  free: { label: 'Free Meal', labelIt: 'Pasto Gratis', icon: '🎉' },
  free_plus_cash: { label: 'Free + Cash', labelIt: 'Gratis + Cash', icon: '💰' },
  free_plus_prize: { label: 'Free + Prize', labelIt: 'Gratis + Premio', icon: '🏆' },
};

// ============================================
// API FUNCTIONS
// ============================================

// Transform snake_case DB response to camelCase
function transformChallenge(data: any): FoodChallenge {
  return {
    id: data.id,
    merchantId: data.merchant_id,
    name: data.name,
    description: data.description,
    imageUrl: data.image_url,
    items: data.items || [],
    timeLimitMinutes: data.time_limit_minutes,
    priceIfLose: parseFloat(data.price_if_lose),
    rules: data.rules || [],
    difficulty: data.difficulty,
    winRewardType: data.win_reward_type,
    winCashPrize: data.win_cash_prize ? parseFloat(data.win_cash_prize) : null,
    winPrizeName: data.win_prize_name,
    winPrizeDescription: data.win_prize_description,
    recordBonusEnabled: data.record_bonus_enabled,
    recordBonusCash: data.record_bonus_cash ? parseFloat(data.record_bonus_cash) : null,
    recordBonusPrize: data.record_bonus_prize,
    recordBonusDescription: data.record_bonus_description,
    recordTimeMinutes: data.record_time_minutes ? parseFloat(data.record_time_minutes) : null,
    recordHolderName: data.record_holder_name,
    recordDate: data.record_date,
    totalAttempts: data.total_attempts || 0,
    totalWins: data.total_wins || 0,
    isTeamChallenge: data.is_team_challenge,
    teamSize: data.team_size,
    requiresBooking: data.requires_booking,
    availableDays: data.available_days,
    availableTimeStart: data.available_time_start,
    availableTimeEnd: data.available_time_end,
    isActive: data.is_active,
  };
}

export async function getActiveChallenges(merchantId: string): Promise<FoodChallenge[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('food_challenges')
    .select('*')
    .eq('merchant_id', merchantId)
    .eq('is_active', true)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching challenges:', error);
    return [];
  }

  return (data || []).map(transformChallenge);
}

export async function getChallenge(challengeId: string): Promise<FoodChallenge | null> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  const { data, error } = await supabase
    .from('food_challenges')
    .select('*')
    .eq('id', challengeId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('Error fetching challenge:', error);
    return null;
  }

  return transformChallenge(data);
}

export async function getWallOfFame(
  challengeId: string,
  limit: number = 10
): Promise<WallOfFameEntry[]> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  // Try RPC function first
  const { data: rpcData, error: rpcError } = await supabase.rpc('get_challenge_wall_of_fame', {
    p_challenge_id: challengeId,
    p_limit: limit,
  });

  if (!rpcError && rpcData) {
    return rpcData.map((entry: any) => ({
      rank: entry.rank,
      participantName: entry.participant_name,
      completionTimeMinutes: parseFloat(entry.completion_time_minutes),
      attemptDate: entry.attempt_date,
      photoUrl: entry.photo_url,
      videoUrl: entry.video_url,
      isCurrentRecord: entry.is_current_record,
    }));
  }

  // Fallback to manual query
  const { data, error } = await supabase
    .from('challenge_attempts')
    .select('*')
    .eq('challenge_id', challengeId)
    .eq('succeeded', true)
    .not('completion_time_minutes', 'is', null)
    .order('completion_time_minutes', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching wall of fame:', error);
    return [];
  }

  return (data || []).map((attempt: any, index: number) => ({
    rank: index + 1,
    participantName: attempt.participant_name,
    completionTimeMinutes: parseFloat(attempt.completion_time_minutes),
    attemptDate: attempt.attempt_date,
    photoUrl: attempt.photo_url,
    videoUrl: attempt.video_url,
    isCurrentRecord: attempt.is_current_record,
  }));
}

export async function getChallengeStats(challengeId: string): Promise<ChallengeStats | null> {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase not configured');
    return null;
  }

  // Try RPC function first
  const { data: rpcData, error: rpcError } = await supabase.rpc('get_challenge_stats', {
    p_challenge_id: challengeId,
  });

  if (!rpcError && rpcData && rpcData.length > 0) {
    const stats = rpcData[0];
    return {
      totalAttempts: stats.total_attempts,
      totalWins: stats.total_wins,
      successRate: parseFloat(stats.success_rate),
      recordTimeMinutes: stats.record_time_minutes ? parseFloat(stats.record_time_minutes) : null,
      recordHolderName: stats.record_holder_name,
      recordDate: stats.record_date,
      hasEverBeenWon: stats.has_ever_been_won,
    };
  }

  // Fallback
  const { data, error } = await supabase
    .from('food_challenges')
    .select('total_attempts, total_wins, record_time_minutes, record_holder_name, record_date')
    .eq('id', challengeId)
    .single();

  if (error) {
    console.error('Error fetching challenge stats:', error);
    return null;
  }

  const successRate =
    data.total_attempts > 0
      ? Math.round((data.total_wins / data.total_attempts) * 100 * 100) / 100
      : 0;

  return {
    totalAttempts: data.total_attempts,
    totalWins: data.total_wins,
    successRate,
    recordTimeMinutes: data.record_time_minutes ? parseFloat(data.record_time_minutes) : null,
    recordHolderName: data.record_holder_name,
    recordDate: data.record_date,
    hasEverBeenWon: data.total_wins > 0,
  };
}

// ============================================
// HELPERS
// ============================================

export function formatTime(minutes: number): string {
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export function formatTimeVerbose(minutes: number): string {
  const mins = Math.floor(minutes);
  const secs = Math.round((minutes - mins) * 60);
  if (secs === 0) {
    return `${mins} min`;
  }
  return `${mins} min ${secs} sec`;
}

export function getSuccessRate(challenge: FoodChallenge): number {
  if (challenge.totalAttempts === 0) return 0;
  return Math.round((challenge.totalWins / challenge.totalAttempts) * 100);
}

export function isAvailableNow(challenge: FoodChallenge): boolean {
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.toTimeString().slice(0, 5);

  // Check day availability
  if (challenge.availableDays && challenge.availableDays.length > 0) {
    if (!challenge.availableDays.includes(currentDay)) {
      return false;
    }
  }

  // Check time availability
  if (challenge.availableTimeStart && challenge.availableTimeEnd) {
    if (currentTime < challenge.availableTimeStart || currentTime > challenge.availableTimeEnd) {
      return false;
    }
  }

  return true;
}

export function getAvailabilityText(challenge: FoodChallenge): string {
  const parts: string[] = [];

  if (
    challenge.availableDays &&
    challenge.availableDays.length > 0 &&
    challenge.availableDays.length < 7
  ) {
    const dayNames = ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab'];
    const days = challenge.availableDays.map((d) => dayNames[d]).join(', ');
    parts.push(days);
  }

  if (challenge.availableTimeStart && challenge.availableTimeEnd) {
    parts.push(`${challenge.availableTimeStart} - ${challenge.availableTimeEnd}`);
  }

  if (parts.length === 0) {
    return 'Sempre disponibile';
  }

  return parts.join(' | ');
}
