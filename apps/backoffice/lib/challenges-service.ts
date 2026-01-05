// Food Challenges Service
// Manages food/drink challenges for viral marketing
// Includes Wall of Fame, stats, attempts tracking

import { createClient } from '@/lib/supabase-browser';

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
  merchant_id: string;

  // Basic info
  name: string;
  description: string | null;
  image_url: string | null;

  // Challenge details
  items: ChallengeItem[];
  time_limit_minutes: number;
  price_if_lose: number;
  rules: string[];
  difficulty: ChallengeDifficulty;

  // Win reward
  win_reward_type: WinRewardType;
  win_cash_prize: number | null;
  win_prize_name: string | null;
  win_prize_description: string | null;

  // Record breaker bonus
  record_bonus_enabled: boolean;
  record_bonus_cash: number | null;
  record_bonus_prize: string | null;
  record_bonus_description: string | null;

  // Current record
  record_time_minutes: number | null;
  record_holder_name: string | null;
  record_holder_id: string | null;
  record_date: string | null;

  // Stats
  total_attempts: number;
  total_wins: number;

  // Team challenge
  is_team_challenge: boolean;
  team_size: number | null;

  // Availability
  requires_booking: boolean;
  available_days: number[] | null;
  available_time_start: string | null;
  available_time_end: string | null;

  // Status
  is_active: boolean;

  created_at: string;
  updated_at: string;
}

export interface ChallengeAttempt {
  id: string;
  challenge_id: string;
  merchant_id: string;

  // Participant
  participant_name: string;
  participant_id: string | null;
  team_members: { name: string }[] | null;

  // Result
  succeeded: boolean;
  completion_time_minutes: number | null;
  is_current_record: boolean;

  // Media
  photo_url: string | null;
  video_url: string | null;

  // Staff
  recorded_by: string | null;

  // Bonus
  record_bonus_awarded: boolean;

  attempt_date: string;
  created_at: string;
}

export interface ChallengeFormData {
  name: string;
  description?: string;
  image_url?: string;
  items: ChallengeItem[];
  time_limit_minutes: number;
  price_if_lose: number;
  rules: string[];
  difficulty: ChallengeDifficulty;
  win_reward_type: WinRewardType;
  win_cash_prize?: number;
  win_prize_name?: string;
  win_prize_description?: string;
  record_bonus_enabled: boolean;
  record_bonus_cash?: number;
  record_bonus_prize?: string;
  record_bonus_description?: string;
  is_team_challenge: boolean;
  team_size?: number;
  requires_booking: boolean;
  available_days?: number[];
  available_time_start?: string;
  available_time_end?: string;
  is_active: boolean;
}

export interface AttemptFormData {
  participant_name: string;
  participant_id?: string;
  team_members?: { name: string }[];
  succeeded: boolean;
  completion_time_minutes?: number;
  photo_url?: string;
  video_url?: string;
  attempt_date: string;
}

export interface WallOfFameEntry {
  rank: number;
  participant_name: string;
  completion_time_minutes: number;
  attempt_date: string;
  photo_url: string | null;
  video_url: string | null;
  is_current_record: boolean;
}

export interface ChallengeStats {
  total_attempts: number;
  total_wins: number;
  success_rate: number;
  record_time_minutes: number | null;
  record_holder_name: string | null;
  record_date: string | null;
  has_ever_been_won: boolean;
}

// ============================================
// CHALLENGE CRUD
// ============================================

export async function getChallenges(merchantId: string): Promise<FoodChallenge[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('food_challenges')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching challenges:', error);
    throw error;
  }

  return data || [];
}

export async function getChallenge(challengeId: string): Promise<FoodChallenge | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('food_challenges')
    .select('*')
    .eq('id', challengeId)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    console.error('Error fetching challenge:', error);
    throw error;
  }

  return data;
}

export async function createChallenge(
  merchantId: string,
  formData: ChallengeFormData
): Promise<FoodChallenge> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('food_challenges')
    .insert({
      merchant_id: merchantId,
      ...formData,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating challenge:', error);
    throw error;
  }

  return data;
}

export async function updateChallenge(
  challengeId: string,
  formData: Partial<ChallengeFormData>
): Promise<FoodChallenge> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('food_challenges')
    .update(formData)
    .eq('id', challengeId)
    .select()
    .single();

  if (error) {
    console.error('Error updating challenge:', error);
    throw error;
  }

  return data;
}

export async function deleteChallenge(challengeId: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from('food_challenges').delete().eq('id', challengeId);

  if (error) {
    console.error('Error deleting challenge:', error);
    throw error;
  }
}

export async function toggleChallengeActive(challengeId: string, isActive: boolean): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase
    .from('food_challenges')
    .update({ is_active: isActive })
    .eq('id', challengeId);

  if (error) {
    console.error('Error toggling challenge:', error);
    throw error;
  }
}

// ============================================
// ATTEMPTS CRUD
// ============================================

export async function getAttempts(challengeId: string): Promise<ChallengeAttempt[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('challenge_attempts')
    .select('*')
    .eq('challenge_id', challengeId)
    .order('attempt_date', { ascending: false });

  if (error) {
    console.error('Error fetching attempts:', error);
    throw error;
  }

  return data || [];
}

export async function createAttempt(
  challengeId: string,
  merchantId: string,
  formData: AttemptFormData,
  recordedBy?: string
): Promise<ChallengeAttempt> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('challenge_attempts')
    .insert({
      challenge_id: challengeId,
      merchant_id: merchantId,
      recorded_by: recordedBy,
      ...formData,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating attempt:', error);
    throw error;
  }

  return data;
}

export async function updateAttempt(
  attemptId: string,
  formData: Partial<AttemptFormData>
): Promise<ChallengeAttempt> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('challenge_attempts')
    .update(formData)
    .eq('id', attemptId)
    .select()
    .single();

  if (error) {
    console.error('Error updating attempt:', error);
    throw error;
  }

  return data;
}

export async function deleteAttempt(attemptId: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from('challenge_attempts').delete().eq('id', attemptId);

  if (error) {
    console.error('Error deleting attempt:', error);
    throw error;
  }
}

// ============================================
// WALL OF FAME & STATS
// ============================================

export async function getWallOfFame(
  challengeId: string,
  limit: number = 10
): Promise<WallOfFameEntry[]> {
  const supabase = createClient();

  // Try to use the database function first
  const { data: rpcData, error: rpcError } = await supabase.rpc('get_challenge_wall_of_fame', {
    p_challenge_id: challengeId,
    p_limit: limit,
  });

  if (!rpcError && rpcData) {
    return rpcData;
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
    throw error;
  }

  return (data || []).map((attempt, index) => ({
    rank: index + 1,
    participant_name: attempt.participant_name,
    completion_time_minutes: attempt.completion_time_minutes,
    attempt_date: attempt.attempt_date,
    photo_url: attempt.photo_url,
    video_url: attempt.video_url,
    is_current_record: attempt.is_current_record,
  }));
}

export async function getChallengeStats(challengeId: string): Promise<ChallengeStats> {
  const supabase = createClient();

  // Try to use the database function first
  const { data: rpcData, error: rpcError } = await supabase.rpc('get_challenge_stats', {
    p_challenge_id: challengeId,
  });

  if (!rpcError && rpcData && rpcData.length > 0) {
    return rpcData[0];
  }

  // Fallback to manual query
  const { data, error } = await supabase
    .from('food_challenges')
    .select('total_attempts, total_wins, record_time_minutes, record_holder_name, record_date')
    .eq('id', challengeId)
    .single();

  if (error) {
    console.error('Error fetching challenge stats:', error);
    throw error;
  }

  const successRate =
    data.total_attempts > 0
      ? Math.round((data.total_wins / data.total_attempts) * 100 * 100) / 100
      : 0;

  return {
    total_attempts: data.total_attempts,
    total_wins: data.total_wins,
    success_rate: successRate,
    record_time_minutes: data.record_time_minutes,
    record_holder_name: data.record_holder_name,
    record_date: data.record_date,
    has_ever_been_won: data.total_wins > 0,
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

export function parseTime(timeString: string): number {
  const [mins, secs] = timeString.split(':').map(Number);
  return mins + (secs || 0) / 60;
}

export function getDifficultyColor(difficulty: ChallengeDifficulty): string {
  switch (difficulty) {
    case 'easy':
      return 'bg-green-100 text-green-700';
    case 'medium':
      return 'bg-yellow-100 text-yellow-700';
    case 'hard':
      return 'bg-orange-100 text-orange-700';
    case 'extreme':
      return 'bg-red-100 text-red-700';
    default:
      return 'bg-gray-100 text-gray-700';
  }
}

export function getDifficultyLabel(difficulty: ChallengeDifficulty): string {
  switch (difficulty) {
    case 'easy':
      return 'Facile';
    case 'medium':
      return 'Media';
    case 'hard':
      return 'Difficile';
    case 'extreme':
      return 'Estrema';
    default:
      return difficulty;
  }
}

export const DIFFICULTY_OPTIONS: { value: ChallengeDifficulty; label: string }[] = [
  { value: 'easy', label: 'Facile' },
  { value: 'medium', label: 'Media' },
  { value: 'hard', label: 'Difficile' },
  { value: 'extreme', label: 'Estrema' },
];

export const WIN_REWARD_OPTIONS: { value: WinRewardType; label: string; description: string }[] = [
  { value: 'free', label: 'Pasto Gratis', description: 'Il pasto della sfida è gratuito' },
  {
    value: 'free_plus_cash',
    label: 'Gratis + Cash',
    description: 'Pasto gratis + premio in denaro',
  },
  {
    value: 'free_plus_prize',
    label: 'Gratis + Premio',
    description: 'Pasto gratis + premio fisico (t-shirt, etc.)',
  },
];

export const DAYS_OPTIONS = [
  { value: 0, label: 'Dom' },
  { value: 1, label: 'Lun' },
  { value: 2, label: 'Mar' },
  { value: 3, label: 'Mer' },
  { value: 4, label: 'Gio' },
  { value: 5, label: 'Ven' },
  { value: 6, label: 'Sab' },
];
