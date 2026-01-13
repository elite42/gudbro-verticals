// AI Learning Progress Service
// Tracks AI Co-Manager knowledge accumulation and autonomy governance
// Progress is based on REAL DATA, not arbitrary percentages

import { supabase } from '@/lib/supabase';

// =============================================================================
// TYPES
// =============================================================================

export type AutonomyLevel = 1 | 2 | 3 | 4;

export const AUTONOMY_LEVEL_NAMES: Record<AutonomyLevel, string> = {
  1: 'Observer',
  2: 'Assistant',
  3: 'Partner',
  4: 'Co-Manager',
};

export const AUTONOMY_LEVEL_DESCRIPTIONS: Record<AutonomyLevel, string> = {
  1: 'AI only suggests, always asks for approval',
  2: 'AI handles routine tasks with notifications',
  3: 'AI makes autonomous decisions within limits',
  4: 'Full co-manager autonomy for operations',
};

export interface KnowledgeAreaProgress {
  name: string;
  key: string;
  progress: number; // 0-100
  status: 'not_started' | 'in_progress' | 'completed';
  description: string;
  requirement: string;
  currentValue: string;
}

export interface LearningProgress {
  locationId: string;

  // Individual area progress
  zoneAnalysis: number;
  menuKnowledge: number;
  competitorIntel: number;
  customerPatterns: number;
  seasonalTrends: number;
  managerPreferences: number;
  weatherCorrelations: number;

  // Overall
  overallProgress: number;
  autonomyLevel: AutonomyLevel;
  autonomyLevelName: string;

  // Raw data points (for display)
  dataPoints: {
    zoneAnalysisCompleted: boolean;
    menuItemsImported: number;
    competitorsAnalyzed: number;
    totalOrdersProcessed: number;
    monthsOfData: number;
    suggestionsResponded: number;
    weatherDataDays: number;
  };

  // Settings
  autonomyOverride: AutonomyLevel | null;
  maxAutoSpendLimit: number | null;

  // Timestamps
  lastCalculation: string;
  createdAt: string;
}

export interface LearningMilestone {
  id: string;
  type: string;
  name: string;
  value: number;
  unlockedCapability: string;
  reachedAt: string;
  notifiedAt: string | null;
  acknowledgedAt: string | null;
}

export interface AutonomyCheckResult {
  canAct: boolean;
  currentLevel: AutonomyLevel;
  requiredLevel: AutonomyLevel;
  reason: string;
}

// =============================================================================
// KNOWLEDGE AREA DEFINITIONS
// =============================================================================

export const KNOWLEDGE_AREAS = [
  {
    key: 'zoneAnalysis',
    name: 'Zone Analysis',
    weight: 0.1,
    getDescription: (p: LearningProgress) =>
      p.dataPoints.zoneAnalysisCompleted ? 'Zone analysis completed' : 'Waiting for zone analysis',
    getRequirement: () => 'Complete zone analysis',
    getCurrentValue: (p: LearningProgress) =>
      p.dataPoints.zoneAnalysisCompleted ? 'Completed' : 'Not started',
  },
  {
    key: 'menuKnowledge',
    name: 'Menu Knowledge',
    weight: 0.15,
    getDescription: (p: LearningProgress) =>
      `${p.dataPoints.menuItemsImported} menu items imported`,
    getRequirement: () => 'Import menu with descriptions and ingredients',
    getCurrentValue: (p: LearningProgress) => `${p.dataPoints.menuItemsImported} items`,
  },
  {
    key: 'competitorIntel',
    name: 'Competitor Intelligence',
    weight: 0.1,
    getDescription: (p: LearningProgress) =>
      `${p.dataPoints.competitorsAnalyzed} competitors analyzed`,
    getRequirement: () => 'Analyze at least 5 competitors',
    getCurrentValue: (p: LearningProgress) => `${p.dataPoints.competitorsAnalyzed} competitors`,
  },
  {
    key: 'customerPatterns',
    name: 'Customer Patterns',
    weight: 0.25,
    getDescription: (p: LearningProgress) =>
      `${p.dataPoints.totalOrdersProcessed} orders processed`,
    getRequirement: () => '2,000+ orders for full understanding',
    getCurrentValue: (p: LearningProgress) => `${p.dataPoints.totalOrdersProcessed} orders`,
  },
  {
    key: 'seasonalTrends',
    name: 'Seasonal Trends',
    weight: 0.15,
    getDescription: (p: LearningProgress) => `${p.dataPoints.monthsOfData} months of data`,
    getRequirement: () => '12 months for complete seasonal understanding',
    getCurrentValue: (p: LearningProgress) => `${p.dataPoints.monthsOfData} months`,
  },
  {
    key: 'managerPreferences',
    name: 'Manager Preferences',
    weight: 0.15,
    getDescription: (p: LearningProgress) =>
      `${p.dataPoints.suggestionsResponded} suggestions responded`,
    getRequirement: () => 'Respond to 100+ AI suggestions',
    getCurrentValue: (p: LearningProgress) => `${p.dataPoints.suggestionsResponded} responses`,
  },
  {
    key: 'weatherCorrelations',
    name: 'Weather Correlations',
    weight: 0.1,
    getDescription: (p: LearningProgress) => `${p.dataPoints.weatherDataDays} days of weather data`,
    getRequirement: () => '180 days for accurate predictions',
    getCurrentValue: (p: LearningProgress) => `${p.dataPoints.weatherDataDays} days`,
  },
];

// =============================================================================
// API FUNCTIONS
// =============================================================================

/**
 * Get learning progress for a location
 */
export async function getLearningProgress(locationId: string): Promise<LearningProgress | null> {
  const { data, error } = await supabase
    .from('ai_learning_progress')
    .select('*')
    .eq('location_id', locationId)
    .single();

  if (error || !data) {
    return null;
  }

  const autonomyLevel = (data.autonomy_override || data.autonomy_level) as AutonomyLevel;

  return {
    locationId: data.location_id,
    zoneAnalysis: data.progress_zone_analysis || 0,
    menuKnowledge: data.progress_menu_knowledge || 0,
    competitorIntel: data.progress_competitor_intel || 0,
    customerPatterns: data.progress_customer_patterns || 0,
    seasonalTrends: data.progress_seasonal_trends || 0,
    managerPreferences: data.progress_manager_preferences || 0,
    weatherCorrelations: data.progress_weather_correlations || 0,
    overallProgress: data.overall_progress || 0,
    autonomyLevel: autonomyLevel,
    autonomyLevelName: AUTONOMY_LEVEL_NAMES[autonomyLevel],
    dataPoints: {
      zoneAnalysisCompleted: data.zone_analysis_completed || false,
      menuItemsImported: data.menu_items_imported || 0,
      competitorsAnalyzed: data.competitors_analyzed || 0,
      totalOrdersProcessed: data.total_orders_processed || 0,
      monthsOfData: data.months_of_data || 0,
      suggestionsResponded: (data.suggestions_accepted || 0) + (data.suggestions_rejected || 0),
      weatherDataDays: data.weather_data_days || 0,
    },
    autonomyOverride: data.autonomy_override as AutonomyLevel | null,
    maxAutoSpendLimit: data.max_auto_spend_limit,
    lastCalculation: data.last_progress_calculation,
    createdAt: data.created_at,
  };
}

/**
 * Initialize learning progress for a new location
 */
export async function initializeLearningProgress(locationId: string): Promise<LearningProgress> {
  const { data, error } = await supabase
    .from('ai_learning_progress')
    .insert({
      location_id: locationId,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to initialize learning progress: ${error.message}`);
  }

  return getLearningProgress(locationId) as Promise<LearningProgress>;
}

/**
 * Recalculate learning progress based on actual data
 */
export async function recalculateLearningProgress(locationId: string): Promise<LearningProgress> {
  const { data, error } = await supabase.rpc('calculate_ai_learning_progress', {
    p_location_id: locationId,
  });

  if (error) {
    throw new Error(`Failed to recalculate progress: ${error.message}`);
  }

  const progress = await getLearningProgress(locationId);
  if (!progress) {
    throw new Error('Failed to get updated progress');
  }

  return progress;
}

/**
 * Check if AI can perform an action autonomously
 */
export async function checkAutonomy(
  locationId: string,
  actionType: string,
  requiredLevel: AutonomyLevel = 3
): Promise<AutonomyCheckResult> {
  const { data, error } = await supabase.rpc('can_ai_act_autonomously', {
    p_location_id: locationId,
    p_action_type: actionType,
    p_required_level: requiredLevel,
  });

  if (error || !data || data.length === 0) {
    return {
      canAct: false,
      currentLevel: 1,
      requiredLevel: requiredLevel,
      reason: 'Unable to check autonomy level',
    };
  }

  const row = data[0];
  return {
    canAct: row.can_act,
    currentLevel: row.current_level as AutonomyLevel,
    requiredLevel: row.required_level as AutonomyLevel,
    reason: row.reason,
  };
}

/**
 * Override autonomy level (manager setting)
 */
export async function setAutonomyOverride(
  locationId: string,
  level: AutonomyLevel | null
): Promise<void> {
  const { error } = await supabase
    .from('ai_learning_progress')
    .update({
      autonomy_override: level,
      updated_at: new Date().toISOString(),
    })
    .eq('location_id', locationId);

  if (error) {
    throw new Error(`Failed to set autonomy override: ${error.message}`);
  }
}

/**
 * Set maximum auto-spend limit for AI actions
 */
export async function setMaxAutoSpendLimit(
  locationId: string,
  limit: number | null
): Promise<void> {
  const { error } = await supabase
    .from('ai_learning_progress')
    .update({
      max_auto_spend_limit: limit,
      updated_at: new Date().toISOString(),
    })
    .eq('location_id', locationId);

  if (error) {
    throw new Error(`Failed to set spend limit: ${error.message}`);
  }
}

/**
 * Get recent milestones for a location
 */
export async function getMilestones(locationId: string, limit = 10): Promise<LearningMilestone[]> {
  const { data, error } = await supabase
    .from('ai_learning_milestones')
    .select('*')
    .eq('location_id', locationId)
    .order('reached_at', { ascending: false })
    .limit(limit);

  if (error || !data) {
    return [];
  }

  return data.map((m) => ({
    id: m.id,
    type: m.milestone_type,
    name: m.milestone_name,
    value: m.milestone_value,
    unlockedCapability: m.unlocked_capability,
    reachedAt: m.reached_at,
    notifiedAt: m.notified_at,
    acknowledgedAt: m.acknowledged_at,
  }));
}

/**
 * Acknowledge a milestone
 */
export async function acknowledgeMilestone(milestoneId: string, accountId: string): Promise<void> {
  const { error } = await supabase
    .from('ai_learning_milestones')
    .update({
      acknowledged_at: new Date().toISOString(),
      acknowledged_by: accountId,
    })
    .eq('id', milestoneId);

  if (error) {
    throw new Error(`Failed to acknowledge milestone: ${error.message}`);
  }
}

/**
 * Get unacknowledged milestones (for notifications)
 */
export async function getUnacknowledgedMilestones(
  locationId: string
): Promise<LearningMilestone[]> {
  const { data, error } = await supabase
    .from('ai_learning_milestones')
    .select('*')
    .eq('location_id', locationId)
    .is('acknowledged_at', null)
    .order('reached_at', { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map((m) => ({
    id: m.id,
    type: m.milestone_type,
    name: m.milestone_name,
    value: m.milestone_value,
    unlockedCapability: m.unlocked_capability,
    reachedAt: m.reached_at,
    notifiedAt: m.notified_at,
    acknowledgedAt: m.acknowledged_at,
  }));
}

/**
 * Update data point and trigger progress recalculation
 * This is called by other services when data changes
 */
export async function updateDataPoint(
  locationId: string,
  field: string,
  value: number | boolean
): Promise<void> {
  const updateData: Record<string, unknown> = {
    [field]: value,
    updated_at: new Date().toISOString(),
  };

  const { error } = await supabase
    .from('ai_learning_progress')
    .update(updateData)
    .eq('location_id', locationId);

  if (error) {
    throw new Error(`Failed to update data point: ${error.message}`);
  }

  // Recalculate progress
  await recalculateLearningProgress(locationId);
}

/**
 * Log an autonomous action for audit trail
 */
export async function logAutonomousAction(
  locationId: string,
  actionType: string,
  actionDescription: string,
  actionData: Record<string, unknown>,
  autonomyLevel: AutonomyLevel,
  requiredLevel: AutonomyLevel,
  wasAutoApproved: boolean
): Promise<string> {
  const { data, error } = await supabase
    .from('ai_autonomy_audit_log')
    .insert({
      location_id: locationId,
      action_type: actionType,
      action_description: actionDescription,
      action_data: actionData,
      autonomy_level_at_action: autonomyLevel,
      required_level: requiredLevel,
      was_auto_approved: wasAutoApproved,
      execution_status: wasAutoApproved ? 'executed' : 'pending',
      executed_at: wasAutoApproved ? new Date().toISOString() : null,
    })
    .select('id')
    .single();

  if (error) {
    throw new Error(`Failed to log action: ${error.message}`);
  }

  return data.id;
}

/**
 * Get learning progress summary for AI context
 */
export async function getLearningProgressSummary(locationId: string): Promise<string> {
  const progress = await getLearningProgress(locationId);

  if (!progress) {
    return 'AI learning progress not initialized for this location.';
  }

  const levelName = AUTONOMY_LEVEL_NAMES[progress.autonomyLevel];
  const levelDesc = AUTONOMY_LEVEL_DESCRIPTIONS[progress.autonomyLevel];

  let summary = `AI Learning Progress: ${progress.overallProgress}% complete. `;
  summary += `Autonomy Level: ${progress.autonomyLevel} (${levelName}) - ${levelDesc}. `;

  // Highlight lowest areas
  const areas = [
    { name: 'Customer Patterns', progress: progress.customerPatterns },
    { name: 'Seasonal Trends', progress: progress.seasonalTrends },
    { name: 'Manager Preferences', progress: progress.managerPreferences },
    { name: 'Weather Correlations', progress: progress.weatherCorrelations },
  ].sort((a, b) => a.progress - b.progress);

  if (areas[0].progress < 50) {
    summary += `Need more data on: ${areas[0].name} (${areas[0].progress}%).`;
  }

  return summary;
}

/**
 * Get knowledge areas with detailed progress
 */
export function getKnowledgeAreasProgress(progress: LearningProgress): KnowledgeAreaProgress[] {
  return KNOWLEDGE_AREAS.map((area) => {
    const progressValue = progress[area.key as keyof LearningProgress] as number;
    return {
      name: area.name,
      key: area.key,
      progress: progressValue,
      status:
        progressValue === 0 ? 'not_started' : progressValue >= 100 ? 'completed' : 'in_progress',
      description: area.getDescription(progress),
      requirement: area.getRequirement(),
      currentValue: area.getCurrentValue(progress),
    };
  });
}
