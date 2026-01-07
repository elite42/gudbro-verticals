// AI Staff Performance Service
// Phase 14: Weekly performance reports and recognition

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';

// Types
export interface StaffProfile {
  id: string;
  accountId: string;
  locationId: string;
  displayName: string;
  photoUrl?: string;
  bio?: string;
  jobTitle: string;
  specialties: string[];
  languages: string[];
  employmentType: 'owner' | 'full_time' | 'part_time' | 'seasonal' | 'contractor';
  hireDate?: string;
  isPublic: boolean;
  status: 'active' | 'on_leave' | 'terminated';
  totalReviews: number;
  averageRating: number;
  positiveReviewRate: number;
}

export interface StaffReview {
  id: string;
  staffId: string;
  reviewerAccountId?: string;
  isAnonymous: boolean;
  rating: number;
  categories: string[];
  comment?: string;
  source: 'qr_code' | 'app' | 'order' | 'manual' | 'kiosk';
  isVerified: boolean;
  pointsAwarded: number;
  createdAt: string;
}

export interface PerformanceMetrics {
  staffId: string;
  periodType: 'weekly' | 'monthly';
  periodStart: string;
  periodEnd: string;
  reviewsCount: number;
  averageRating: number;
  positiveRate: number;
  categoryCounts: Record<string, number>;
  rankInLocation?: number;
  vsPreviousPeriod?: number;
  aiSummary?: string;
  aiStrengths?: string[];
  aiImprovements?: string[];
}

export interface TopPerformer {
  staffId: string;
  displayName: string;
  photoUrl?: string;
  jobTitle: string;
  averageRating: number;
  reviewsCount: number;
  rankInLocation: number;
  topCategories: string[];
}

export interface WeeklyReport {
  locationId: string;
  periodStart: string;
  periodEnd: string;
  topPerformers: {
    byRating: TopPerformer | null;
    byReviews: TopPerformer | null;
    mostImproved: TopPerformer | null;
  };
  teamStats: {
    totalReviews: number;
    averageRating: number;
    positiveRate: number;
    topCategories: { category: string; count: number }[];
  };
  alerts: {
    type: 'warning' | 'info' | 'success';
    staffName?: string;
    message: string;
  }[];
  aiSuggestion?: string;
  generatedAt: string;
}

export interface TeamSettings {
  locationId: string;
  showTeamOnMenu: boolean;
  teamDisplayStyle: 'cards' | 'list' | 'minimal';
  allowStaffReviews: boolean;
  reviewRequiresOrder: boolean;
  allowAnonymousReviews: boolean;
  enableWeeklyRecognition: boolean;
  recognitionRewardType: 'badge' | 'bonus' | 'time_off' | 'meal' | 'custom';
}

// Standard review categories
export const REVIEW_CATEGORIES = [
  { id: 'friendly', label: 'Cordiale', emoji: '😊' },
  { id: 'fast', label: 'Veloce', emoji: '⚡' },
  { id: 'helpful', label: 'Disponibile', emoji: '🤝' },
  { id: 'knowledgeable', label: 'Preparato', emoji: '🎓' },
  { id: 'attentive', label: 'Attento', emoji: '👀' },
  { id: 'professional', label: 'Professionale', emoji: '💼' },
  { id: 'patient', label: 'Paziente', emoji: '🙏' },
  { id: 'welcoming', label: 'Accogliente', emoji: '🏠' },
];

// ============================================
// TEAM SETTINGS
// ============================================

/**
 * Get team settings for a location
 */
export async function getTeamSettings(locationId: string): Promise<TeamSettings | null> {
  const { data, error } = await supabase
    .from('location_team_settings')
    .select('*')
    .eq('location_id', locationId)
    .single();

  if (error || !data) return null;

  return {
    locationId: data.location_id,
    showTeamOnMenu: data.show_team_on_menu,
    teamDisplayStyle: data.team_display_style,
    allowStaffReviews: data.allow_staff_reviews,
    reviewRequiresOrder: data.review_requires_order,
    allowAnonymousReviews: data.allow_anonymous_reviews,
    enableWeeklyRecognition: data.enable_weekly_recognition,
    recognitionRewardType: data.recognition_reward_type,
  };
}

/**
 * Update team settings
 */
export async function updateTeamSettings(
  locationId: string,
  settings: Partial<TeamSettings>
): Promise<void> {
  await supabase.from('location_team_settings').upsert(
    {
      location_id: locationId,
      show_team_on_menu: settings.showTeamOnMenu,
      team_display_style: settings.teamDisplayStyle,
      allow_staff_reviews: settings.allowStaffReviews,
      review_requires_order: settings.reviewRequiresOrder,
      allow_anonymous_reviews: settings.allowAnonymousReviews,
      enable_weekly_recognition: settings.enableWeeklyRecognition,
      recognition_reward_type: settings.recognitionRewardType,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'location_id' }
  );
}

/**
 * Get tooltip benefits for manager (pros/cons of enabling team features)
 */
export function getTeamFeatureBenefits(): {
  pros: string[];
  cons: string[];
  tips: string[];
} {
  return {
    pros: [
      '📈 Staff motivato a fornire servizio migliore',
      '💬 Feedback diretto dai clienti',
      '🏆 Sistema di riconoscimento aumenta la retention',
      '📱 Clienti usano di più il menu digitale',
      '🗣️ Passaparola: clienti soddisfatti condividono',
      '📊 Dati per decisioni su bonus e promozioni',
    ],
    cons: [
      '⏰ Richiede tempo iniziale per setup profili',
      '📝 Review negative possono demotivare (ma puoi moderarle)',
      '🔒 Privacy staff: consenso richiesto per foto pubbliche',
    ],
    tips: [
      '💡 Inizia con bonus settimanali piccoli (es. caffè gratis)',
      '💡 Mostra le review positive nel break room',
      '💡 Usa le categorie più votate per training',
    ],
  };
}

// ============================================
// STAFF PROFILES
// ============================================

/**
 * Get all staff profiles for a location
 */
export async function getStaffProfiles(
  locationId: string,
  options?: { onlyPublic?: boolean; onlyActive?: boolean }
): Promise<StaffProfile[]> {
  let query = supabase.from('staff_profiles').select('*').eq('location_id', locationId);

  if (options?.onlyPublic) {
    query = query.eq('is_public', true);
  }

  if (options?.onlyActive) {
    query = query.eq('status', 'active');
  }

  const { data, error } = await query.order('display_name');

  if (error || !data) return [];

  return data.map((s) => ({
    id: s.id,
    accountId: s.account_id,
    locationId: s.location_id,
    displayName: s.display_name,
    photoUrl: s.photo_url,
    bio: s.bio,
    jobTitle: s.job_title,
    specialties: s.specialties || [],
    languages: s.languages || [],
    employmentType: s.employment_type,
    hireDate: s.hire_date,
    isPublic: s.is_public,
    status: s.status,
    totalReviews: s.total_reviews || 0,
    averageRating: Number(s.average_rating) || 0,
    positiveReviewRate: Number(s.positive_review_rate) || 0,
  }));
}

/**
 * Create or update staff profile
 */
export async function upsertStaffProfile(
  profile: Partial<StaffProfile> & { accountId: string; locationId: string }
): Promise<string> {
  const { data, error } = await supabase
    .from('staff_profiles')
    .upsert(
      {
        account_id: profile.accountId,
        location_id: profile.locationId,
        display_name: profile.displayName || 'Staff',
        photo_url: profile.photoUrl,
        bio: profile.bio,
        job_title: profile.jobTitle || 'Staff',
        specialties: profile.specialties || [],
        languages: profile.languages || [],
        employment_type: profile.employmentType || 'full_time',
        hire_date: profile.hireDate,
        is_public: profile.isPublic ?? false,
        status: profile.status || 'active',
      },
      { onConflict: 'account_id,location_id' }
    )
    .select('id')
    .single();

  if (error) throw error;
  return data?.id;
}

// ============================================
// STAFF REVIEWS
// ============================================

/**
 * Submit a staff review
 */
export async function submitStaffReview(review: {
  staffId: string;
  locationId: string;
  reviewerAccountId?: string;
  isAnonymous?: boolean;
  rating: number;
  categories?: string[];
  comment?: string;
  source?: 'qr_code' | 'app' | 'order' | 'manual' | 'kiosk';
  orderId?: string;
  isVerified?: boolean;
}): Promise<string> {
  const { data, error } = await supabase
    .from('staff_reviews')
    .insert({
      staff_id: review.staffId,
      location_id: review.locationId,
      reviewer_account_id: review.isAnonymous ? null : review.reviewerAccountId,
      is_anonymous: review.isAnonymous ?? !review.reviewerAccountId,
      rating: review.rating,
      categories: review.categories || [],
      comment: review.comment,
      source: review.source || 'qr_code',
      order_id: review.orderId,
      is_verified: review.isVerified ?? !!review.orderId,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data?.id;
}

/**
 * Get reviews for a staff member
 */
export async function getStaffReviews(
  staffId: string,
  options?: { limit?: number; offset?: number }
): Promise<StaffReview[]> {
  const { data, error } = await supabase
    .from('staff_reviews')
    .select('*')
    .eq('staff_id', staffId)
    .eq('is_visible', true)
    .order('created_at', { ascending: false })
    .range(options?.offset || 0, (options?.offset || 0) + (options?.limit || 20) - 1);

  if (error || !data) return [];

  return data.map((r) => ({
    id: r.id,
    staffId: r.staff_id,
    reviewerAccountId: r.reviewer_account_id,
    isAnonymous: r.is_anonymous,
    rating: r.rating,
    categories: r.categories || [],
    comment: r.comment,
    source: r.source,
    isVerified: r.is_verified,
    pointsAwarded: r.points_awarded || 0,
    createdAt: r.created_at,
  }));
}

// ============================================
// PERFORMANCE METRICS & REPORTS
// ============================================

/**
 * Get top performers for a location
 */
export async function getTopPerformers(
  locationId: string,
  periodType: 'weekly' | 'monthly' = 'weekly',
  limit: number = 5
): Promise<TopPerformer[]> {
  const { data, error } = await supabase.rpc('get_top_performers', {
    p_location_id: locationId,
    p_period_type: periodType,
    p_limit: limit,
  });

  if (error || !data) return [];

  return data.map((p: any) => ({
    staffId: p.staff_id,
    displayName: p.display_name,
    photoUrl: p.photo_url,
    jobTitle: p.job_title,
    averageRating: Number(p.average_rating) || 0,
    reviewsCount: p.reviews_count || 0,
    rankInLocation: p.rank_in_location || 0,
    topCategories: p.top_categories || [],
  }));
}

/**
 * Generate weekly performance metrics for all staff in a location
 */
export async function generateWeeklyMetrics(locationId: string): Promise<number> {
  const { data, error } = await supabase.rpc('generate_weekly_performance_metrics', {
    p_location_id: locationId,
  });

  if (error) throw error;
  return data || 0;
}

/**
 * Generate comprehensive weekly report with AI insights
 */
export async function generateWeeklyReport(locationId: string): Promise<WeeklyReport> {
  const openai = getOpenAIClient();

  // Get current week dates
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(now.getDate() - now.getDay()); // Start of week (Sunday)
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  // First, generate metrics
  await generateWeeklyMetrics(locationId);

  // Get top performers
  const topPerformers = await getTopPerformers(locationId, 'weekly', 10);

  // Get all reviews for the week
  const { data: weekReviews } = await supabase
    .from('staff_reviews')
    .select('rating, categories')
    .eq('location_id', locationId)
    .gte('created_at', weekStart.toISOString())
    .lt('created_at', weekEnd.toISOString());

  // Calculate team stats
  const totalReviews = weekReviews?.length || 0;
  const averageRating =
    totalReviews > 0 ? weekReviews!.reduce((sum, r) => sum + r.rating, 0) / totalReviews : 0;
  const positiveRate =
    totalReviews > 0 ? (weekReviews!.filter((r) => r.rating >= 4).length / totalReviews) * 100 : 0;

  // Count categories
  const categoryCounts: Record<string, number> = {};
  weekReviews?.forEach((r) => {
    (r.categories || []).forEach((cat: string) => {
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });
  });

  const topCategories = Object.entries(categoryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([category, count]) => ({ category, count }));

  // Find most improved (compare with previous week)
  const { data: prevMetrics } = await supabase
    .from('staff_performance_metrics')
    .select('staff_id, average_rating')
    .eq('location_id', locationId)
    .eq('period_type', 'weekly')
    .lt('period_start', weekStart.toISOString())
    .order('period_start', { ascending: false })
    .limit(20);

  let mostImproved: TopPerformer | null = null;
  let maxImprovement = 0;

  if (prevMetrics && prevMetrics.length > 0) {
    const prevRatings = new Map(prevMetrics.map((m) => [m.staff_id, Number(m.average_rating)]));

    for (const performer of topPerformers) {
      const prevRating = prevRatings.get(performer.staffId);
      if (prevRating && performer.averageRating - prevRating > maxImprovement) {
        maxImprovement = performer.averageRating - prevRating;
        mostImproved = performer;
      }
    }
  }

  // Generate alerts
  const alerts: WeeklyReport['alerts'] = [];

  // Alert for low ratings
  const { data: lowRatingStaff } = await supabase
    .from('staff_profiles')
    .select('display_name, average_rating')
    .eq('location_id', locationId)
    .lt('average_rating', 3.5)
    .gt('total_reviews', 3);

  lowRatingStaff?.forEach((staff) => {
    alerts.push({
      type: 'warning',
      staffName: staff.display_name,
      message: `${staff.display_name} ha un rating sotto 3.5 (${Number(staff.average_rating).toFixed(1)}/5). Considera un feedback costruttivo.`,
    });
  });

  // Success alert for high performers
  if (topPerformers[0] && topPerformers[0].averageRating >= 4.5) {
    alerts.push({
      type: 'success',
      staffName: topPerformers[0].displayName,
      message: `🏆 ${topPerformers[0].displayName} è il top performer con ${topPerformers[0].averageRating.toFixed(1)}/5!`,
    });
  }

  // Info alert for low review volume
  if (totalReviews < 5) {
    alerts.push({
      type: 'info',
      message:
        'Poche review questa settimana. Considera di promuovere il QR code feedback ai clienti.',
    });
  }

  // Generate AI suggestion
  let aiSuggestion: string | undefined;

  if (topCategories.length > 0) {
    try {
      const completion = await openai.chat.completions.create({
        model: DEFAULT_MODEL,
        messages: [
          {
            role: 'system',
            content:
              'Sei un consulente HR per ristoranti. Fornisci suggerimenti pratici e concisi in italiano.',
          },
          {
            role: 'user',
            content: `Basandoti su questi dati settimanali del team:
- ${totalReviews} review totali, rating medio ${averageRating.toFixed(1)}/5
- Categorie più votate: ${topCategories.map((c) => c.category).join(', ')}
- Top performer: ${topPerformers[0]?.displayName || 'N/A'} (${topPerformers[0]?.averageRating.toFixed(1) || 'N/A'}/5)
${mostImproved ? `- Most improved: ${mostImproved.displayName} (+${maxImprovement.toFixed(1)} punti)` : ''}

Fornisci UN suggerimento pratico (max 2 frasi) per migliorare le performance del team.`,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      });

      aiSuggestion = completion.choices[0]?.message?.content?.trim();
    } catch {
      // Fallback if AI fails
      aiSuggestion =
        topCategories[0]?.category === 'friendly'
          ? 'Il team eccelle nella cordialità! Considera di organizzare un piccolo training sulla velocità del servizio.'
          : undefined;
    }
  }

  // Find performers by different metrics
  const byRating = topPerformers[0] || null;
  const byReviews = [...topPerformers].sort((a, b) => b.reviewsCount - a.reviewsCount)[0] || null;

  return {
    locationId,
    periodStart: weekStart.toISOString().split('T')[0],
    periodEnd: weekEnd.toISOString().split('T')[0],
    topPerformers: {
      byRating,
      byReviews: byReviews !== byRating ? byReviews : null,
      mostImproved,
    },
    teamStats: {
      totalReviews,
      averageRating,
      positiveRate,
      topCategories,
    },
    alerts,
    aiSuggestion,
    generatedAt: new Date().toISOString(),
  };
}

// ============================================
// ACHIEVEMENTS
// ============================================

/**
 * Award achievement to a staff member
 */
export async function awardAchievement(achievement: {
  staffId: string;
  locationId: string;
  achievementType:
    | 'employee_of_week'
    | 'employee_of_month'
    | 'most_reviews'
    | 'top_rated'
    | 'most_improved'
    | 'punctuality_star'
    | 'customer_favorite'
    | 'team_player'
    | 'custom';
  periodStart: string;
  periodEnd: string;
  title: string;
  description?: string;
  metricValue?: number;
  rewardType?: 'badge' | 'bonus' | 'time_off' | 'meal' | 'custom';
  rewardValue?: string;
  awardedBy?: string;
  awardedByAi?: boolean;
}): Promise<string> {
  const { data, error } = await supabase
    .from('staff_achievements')
    .insert({
      staff_id: achievement.staffId,
      location_id: achievement.locationId,
      achievement_type: achievement.achievementType,
      period_start: achievement.periodStart,
      period_end: achievement.periodEnd,
      title: achievement.title,
      description: achievement.description,
      metric_value: achievement.metricValue,
      reward_type: achievement.rewardType,
      reward_value: achievement.rewardValue,
      awarded_by: achievement.awardedBy,
      awarded_by_ai: achievement.awardedByAi ?? false,
    })
    .select('id')
    .single();

  if (error) throw error;
  return data?.id;
}

/**
 * Auto-award weekly achievements based on performance
 */
export async function autoAwardWeeklyAchievements(locationId: string): Promise<string[]> {
  const awardedIds: string[] = [];
  const report = await generateWeeklyReport(locationId);

  // Award Employee of the Week
  if (report.topPerformers.byRating && report.topPerformers.byRating.reviewsCount >= 3) {
    const id = await awardAchievement({
      staffId: report.topPerformers.byRating.staffId,
      locationId,
      achievementType: 'employee_of_week',
      periodStart: report.periodStart,
      periodEnd: report.periodEnd,
      title: '🏆 Employee of the Week',
      description: `Rating più alto della settimana: ${report.topPerformers.byRating.averageRating.toFixed(1)}/5`,
      metricValue: report.topPerformers.byRating.averageRating,
      rewardType: 'badge',
      awardedByAi: true,
    });
    awardedIds.push(id);
  }

  // Award Most Reviews
  if (report.topPerformers.byReviews && report.topPerformers.byReviews.reviewsCount >= 5) {
    const id = await awardAchievement({
      staffId: report.topPerformers.byReviews.staffId,
      locationId,
      achievementType: 'most_reviews',
      periodStart: report.periodStart,
      periodEnd: report.periodEnd,
      title: '📊 Più Feedback Ricevuti',
      description: `${report.topPerformers.byReviews.reviewsCount} feedback questa settimana`,
      metricValue: report.topPerformers.byReviews.reviewsCount,
      rewardType: 'badge',
      awardedByAi: true,
    });
    awardedIds.push(id);
  }

  // Award Most Improved
  if (report.topPerformers.mostImproved) {
    const id = await awardAchievement({
      staffId: report.topPerformers.mostImproved.staffId,
      locationId,
      achievementType: 'most_improved',
      periodStart: report.periodStart,
      periodEnd: report.periodEnd,
      title: '📈 Most Improved',
      description: 'Maggior miglioramento rispetto alla settimana precedente',
      rewardType: 'badge',
      awardedByAi: true,
    });
    awardedIds.push(id);
  }

  return awardedIds;
}

/**
 * Get achievements for a staff member
 */
export async function getStaffAchievements(
  staffId: string,
  limit: number = 10
): Promise<
  {
    id: string;
    achievementType: string;
    title: string;
    description?: string;
    rewardType?: string;
    rewardValue?: string;
    createdAt: string;
  }[]
> {
  const { data, error } = await supabase
    .from('staff_achievements')
    .select('*')
    .eq('staff_id', staffId)
    .eq('is_public', true)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error || !data) return [];

  return data.map((a) => ({
    id: a.id,
    achievementType: a.achievement_type,
    title: a.title,
    description: a.description,
    rewardType: a.reward_type,
    rewardValue: a.reward_value,
    createdAt: a.created_at,
  }));
}

// ============================================
// MANAGER NOTIFICATIONS
// ============================================

/**
 * Format weekly report as notification message for manager
 */
export function formatWeeklyReportNotification(report: WeeklyReport): string {
  const lines: string[] = ['🏆 Performance Report Settimanale', ''];

  // Top performers section
  lines.push('TOP PERFORMERS:');
  if (report.topPerformers.byRating) {
    lines.push(
      `├── 🎯 Rating: ${report.topPerformers.byRating.displayName} (${report.topPerformers.byRating.averageRating.toFixed(1)}/5)`
    );
  }
  if (report.topPerformers.byReviews) {
    lines.push(
      `├── 📊 Review: ${report.topPerformers.byReviews.displayName} (${report.topPerformers.byReviews.reviewsCount} feedback)`
    );
  }
  if (report.topPerformers.mostImproved) {
    lines.push(`└── 📈 Improved: ${report.topPerformers.mostImproved.displayName}`);
  }

  // Team stats
  lines.push('');
  lines.push('TEAM STATS:');
  lines.push(`├── ${report.teamStats.totalReviews} review totali`);
  lines.push(`├── ${report.teamStats.averageRating.toFixed(1)}/5 rating medio`);
  lines.push(`└── ${report.teamStats.positiveRate.toFixed(0)}% positive`);

  // Alerts
  if (report.alerts.length > 0) {
    lines.push('');
    lines.push('⚠️ ATTENZIONE:');
    report.alerts.forEach((alert) => {
      const icon = alert.type === 'warning' ? '⚠️' : alert.type === 'success' ? '✅' : 'ℹ️';
      lines.push(`└── ${icon} ${alert.message}`);
    });
  }

  // AI suggestion
  if (report.aiSuggestion) {
    lines.push('');
    lines.push('💡 SUGGERIMENTO AI:');
    lines.push(`"${report.aiSuggestion}"`);
  }

  return lines.join('\n');
}
