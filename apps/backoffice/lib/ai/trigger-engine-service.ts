// AI Trigger Engine Service
// Part of AI-ZONE-INTEL feature
// Manages automated CRM triggers for customer engagement

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';
import {
  getCustomerIntelligence,
  getCustomersAtRisk,
  type CustomerSegment,
  type ChurnRiskLevel,
} from './customer-intelligence-service';

// =============================================================================
// TYPES
// =============================================================================

export type TriggerType =
  | 'churn_risk'
  | 'inactivity'
  | 'milestone'
  | 'birthday'
  | 'anniversary'
  | 'location'
  | 'segment_change'
  | 'feedback'
  | 'loyalty_tier'
  | 'custom';

export type ActionType =
  | 'notification'
  | 'promo'
  | 'loyalty_reward'
  | 'alert_manager'
  | 'workflow'
  | 'tag'
  | 'custom';

export type ExecutionStatus =
  | 'pending'
  | 'sent'
  | 'delivered'
  | 'opened'
  | 'converted'
  | 'expired'
  | 'failed'
  | 'cancelled';

export interface CustomerTrigger {
  id: string;
  merchantId: string;
  name: string;
  description: string | null;
  triggerType: TriggerType;
  conditions: TriggerConditions;
  actionType: ActionType;
  actionConfig: ActionConfig;
  cooldownDays: number;
  maxTriggersPerCustomer: number | null;
  targetSegments: CustomerSegment[];
  excludeSegments: CustomerSegment[];
  minClv: number | null;
  maxClv: number | null;
  isActive: boolean;
  priority: number;
  totalTriggered: number;
  totalConverted: number;
  lastTriggeredAt: string | null;
  createdByAccountId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TriggerConditions {
  // Churn risk trigger
  riskLevels?: ChurnRiskLevel[];

  // Inactivity trigger
  daysInactive?: number;

  // Milestone trigger
  milestoneType?: 'visit_count' | 'total_spent' | 'loyalty_points';
  milestoneValue?: number;

  // Birthday/Anniversary
  daysBefore?: number;

  // Location trigger
  nearbyRadius?: number;
  locationId?: string;

  // Segment change
  fromSegments?: CustomerSegment[];
  toSegments?: CustomerSegment[];

  // Custom conditions (JSON)
  custom?: Record<string, any>;
}

export interface ActionConfig {
  // Notification
  channel?: 'push' | 'email' | 'sms' | 'whatsapp';
  template?: string;
  message?: string;

  // Promo
  promoType?: 'discount' | 'freebie' | 'bundle';
  discountPercent?: number;
  discountAmount?: number;
  promoCode?: string;
  expiryDays?: number;

  // Loyalty reward
  pointsAmount?: number;
  bonusMultiplier?: number;

  // Workflow
  workflowId?: string;

  // Tag
  tags?: string[];

  // Custom config
  custom?: Record<string, any>;
}

export interface TriggerExecution {
  id: string;
  triggerId: string;
  accountId: string;
  merchantId: string;
  triggeredAt: string;
  triggeredReason: string | null;
  actionType: ActionType;
  actionDetails: Record<string, any>;
  status: ExecutionStatus;
  convertedAt: string | null;
  conversionValue: number | null;
  conversionOrderId: string | null;
  nextEligibleAt: string | null;
  errorMessage: string | null;
  retryCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface TriggerPerformance {
  triggerId: string;
  merchantId: string;
  name: string;
  triggerType: TriggerType;
  actionType: ActionType;
  isActive: boolean;
  totalTriggered: number;
  totalConverted: number;
  conversionRatePct: number;
  lastTriggeredAt: string | null;
  totalRevenue: number | null;
}

export interface TriggerEvaluationResult {
  shouldTrigger: boolean;
  reason: string;
  matchedConditions: string[];
}

// =============================================================================
// TRIGGER CRUD FUNCTIONS
// =============================================================================

/**
 * Create a new customer trigger
 */
export async function createTrigger(
  merchantId: string,
  trigger: Omit<
    CustomerTrigger,
    | 'id'
    | 'merchantId'
    | 'totalTriggered'
    | 'totalConverted'
    | 'lastTriggeredAt'
    | 'createdAt'
    | 'updatedAt'
  >
): Promise<CustomerTrigger | null> {
  const { data, error } = await supabase
    .from('ai_customer_triggers')
    .insert({
      merchant_id: merchantId,
      name: trigger.name,
      description: trigger.description,
      trigger_type: trigger.triggerType,
      conditions: trigger.conditions,
      action_type: trigger.actionType,
      action_config: trigger.actionConfig,
      cooldown_days: trigger.cooldownDays,
      max_triggers_per_customer: trigger.maxTriggersPerCustomer,
      target_segments: trigger.targetSegments,
      exclude_segments: trigger.excludeSegments,
      min_clv: trigger.minClv,
      max_clv: trigger.maxClv,
      is_active: trigger.isActive,
      priority: trigger.priority,
      created_by_account_id: trigger.createdByAccountId,
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating trigger:', error);
    return null;
  }

  return mapDbToTrigger(data);
}

/**
 * Get a trigger by ID
 */
export async function getTrigger(triggerId: string): Promise<CustomerTrigger | null> {
  const { data, error } = await supabase
    .from('ai_customer_triggers')
    .select('*')
    .eq('id', triggerId)
    .single();

  if (error || !data) return null;
  return mapDbToTrigger(data);
}

/**
 * Get all triggers for a merchant
 */
export async function getMerchantTriggers(
  merchantId: string,
  options: {
    isActive?: boolean;
    triggerType?: TriggerType;
    limit?: number;
  } = {}
): Promise<CustomerTrigger[]> {
  let query = supabase
    .from('ai_customer_triggers')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('priority', { ascending: false });

  if (options.isActive !== undefined) {
    query = query.eq('is_active', options.isActive);
  }

  if (options.triggerType) {
    query = query.eq('trigger_type', options.triggerType);
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching triggers:', error);
    return [];
  }

  return (data || []).map(mapDbToTrigger);
}

/**
 * Update a trigger
 */
export async function updateTrigger(
  triggerId: string,
  updates: Partial<Omit<CustomerTrigger, 'id' | 'merchantId' | 'createdAt' | 'updatedAt'>>
): Promise<CustomerTrigger | null> {
  const updateData: any = {};

  if (updates.name !== undefined) updateData.name = updates.name;
  if (updates.description !== undefined) updateData.description = updates.description;
  if (updates.triggerType !== undefined) updateData.trigger_type = updates.triggerType;
  if (updates.conditions !== undefined) updateData.conditions = updates.conditions;
  if (updates.actionType !== undefined) updateData.action_type = updates.actionType;
  if (updates.actionConfig !== undefined) updateData.action_config = updates.actionConfig;
  if (updates.cooldownDays !== undefined) updateData.cooldown_days = updates.cooldownDays;
  if (updates.maxTriggersPerCustomer !== undefined)
    updateData.max_triggers_per_customer = updates.maxTriggersPerCustomer;
  if (updates.targetSegments !== undefined) updateData.target_segments = updates.targetSegments;
  if (updates.excludeSegments !== undefined) updateData.exclude_segments = updates.excludeSegments;
  if (updates.minClv !== undefined) updateData.min_clv = updates.minClv;
  if (updates.maxClv !== undefined) updateData.max_clv = updates.maxClv;
  if (updates.isActive !== undefined) updateData.is_active = updates.isActive;
  if (updates.priority !== undefined) updateData.priority = updates.priority;

  const { data, error } = await supabase
    .from('ai_customer_triggers')
    .update(updateData)
    .eq('id', triggerId)
    .select()
    .single();

  if (error) {
    console.error('Error updating trigger:', error);
    return null;
  }

  return mapDbToTrigger(data);
}

/**
 * Delete a trigger
 */
export async function deleteTrigger(triggerId: string): Promise<boolean> {
  const { error } = await supabase.from('ai_customer_triggers').delete().eq('id', triggerId);

  if (error) {
    console.error('Error deleting trigger:', error);
    return false;
  }

  return true;
}

// =============================================================================
// TRIGGER EVALUATION FUNCTIONS
// =============================================================================

/**
 * Check if a customer is eligible for a trigger
 */
export async function isCustomerEligible(triggerId: string, accountId: string): Promise<boolean> {
  const { data, error } = await supabase.rpc('is_customer_trigger_eligible', {
    p_trigger_id: triggerId,
    p_account_id: accountId,
  });

  if (error) {
    console.error('Error checking eligibility:', error);
    return false;
  }

  return data === true;
}

/**
 * Evaluate if a trigger should fire for a customer
 */
export async function evaluateTrigger(
  trigger: CustomerTrigger,
  accountId: string,
  merchantId: string
): Promise<TriggerEvaluationResult> {
  const matchedConditions: string[] = [];

  // Check eligibility (cooldown, max triggers)
  const isEligible = await isCustomerEligible(trigger.id, accountId);
  if (!isEligible) {
    return {
      shouldTrigger: false,
      reason: 'Customer not eligible (cooldown or max triggers reached)',
      matchedConditions: [],
    };
  }

  // Get customer intelligence
  const intelligence = await getCustomerIntelligence(merchantId, accountId);
  if (!intelligence) {
    return {
      shouldTrigger: false,
      reason: 'No customer intelligence data available',
      matchedConditions: [],
    };
  }

  // Check segment targeting
  if (trigger.targetSegments.length > 0 && intelligence.segment) {
    if (!trigger.targetSegments.includes(intelligence.segment)) {
      return {
        shouldTrigger: false,
        reason: `Customer segment ${intelligence.segment} not in target segments`,
        matchedConditions: [],
      };
    }
    matchedConditions.push(`Segment: ${intelligence.segment}`);
  }

  // Check segment exclusion
  if (trigger.excludeSegments.length > 0 && intelligence.segment) {
    if (trigger.excludeSegments.includes(intelligence.segment)) {
      return {
        shouldTrigger: false,
        reason: `Customer segment ${intelligence.segment} is excluded`,
        matchedConditions: [],
      };
    }
  }

  // Check CLV bounds
  if (trigger.minClv !== null && intelligence.clvEstimated !== null) {
    if (intelligence.clvEstimated < trigger.minClv) {
      return {
        shouldTrigger: false,
        reason: `CLV ${intelligence.clvEstimated} below minimum ${trigger.minClv}`,
        matchedConditions: [],
      };
    }
    matchedConditions.push(`CLV >= ${trigger.minClv}`);
  }

  if (trigger.maxClv !== null && intelligence.clvEstimated !== null) {
    if (intelligence.clvEstimated > trigger.maxClv) {
      return {
        shouldTrigger: false,
        reason: `CLV ${intelligence.clvEstimated} above maximum ${trigger.maxClv}`,
        matchedConditions: [],
      };
    }
    matchedConditions.push(`CLV <= ${trigger.maxClv}`);
  }

  // Evaluate trigger-specific conditions
  const conditions = trigger.conditions;

  switch (trigger.triggerType) {
    case 'churn_risk':
      if (conditions.riskLevels && intelligence.churnRiskLevel) {
        if (conditions.riskLevels.includes(intelligence.churnRiskLevel)) {
          matchedConditions.push(`Churn risk: ${intelligence.churnRiskLevel}`);
        } else {
          return {
            shouldTrigger: false,
            reason: `Churn risk ${intelligence.churnRiskLevel} not in target levels`,
            matchedConditions: [],
          };
        }
      }
      break;

    case 'inactivity':
      if (conditions.daysInactive && intelligence.daysSinceLastVisit !== null) {
        if (intelligence.daysSinceLastVisit >= conditions.daysInactive) {
          matchedConditions.push(`Inactive for ${intelligence.daysSinceLastVisit} days`);
        } else {
          return {
            shouldTrigger: false,
            reason: `Only ${intelligence.daysSinceLastVisit} days inactive (threshold: ${conditions.daysInactive})`,
            matchedConditions: [],
          };
        }
      }
      break;

    // Add more trigger type evaluations as needed
  }

  return {
    shouldTrigger: matchedConditions.length > 0,
    reason: matchedConditions.length > 0 ? 'All conditions matched' : 'No conditions matched',
    matchedConditions,
  };
}

// =============================================================================
// TRIGGER EXECUTION FUNCTIONS
// =============================================================================

/**
 * Execute a trigger for a customer
 */
export async function executeTrigger(
  trigger: CustomerTrigger,
  accountId: string,
  reason: string
): Promise<TriggerExecution | null> {
  // Prepare action details based on action type
  const actionDetails = await prepareActionDetails(trigger);

  // Calculate next eligible date
  const nextEligibleAt = new Date();
  nextEligibleAt.setDate(nextEligibleAt.getDate() + trigger.cooldownDays);

  // Create execution record
  const { data, error } = await supabase
    .from('ai_customer_trigger_executions')
    .insert({
      trigger_id: trigger.id,
      account_id: accountId,
      merchant_id: trigger.merchantId,
      triggered_reason: reason,
      action_type: trigger.actionType,
      action_details: actionDetails,
      status: 'pending',
      next_eligible_at: nextEligibleAt.toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error('Error creating trigger execution:', error);
    return null;
  }

  // Execute the action
  const execution = mapDbToExecution(data);
  await performAction(execution, trigger);

  return execution;
}

/**
 * Prepare action details based on trigger config
 */
async function prepareActionDetails(trigger: CustomerTrigger): Promise<Record<string, any>> {
  const config = trigger.actionConfig;
  const details: Record<string, any> = {};

  switch (trigger.actionType) {
    case 'promo':
      details.promoCode = config.promoCode || generatePromoCode();
      details.discountPercent = config.discountPercent;
      details.discountAmount = config.discountAmount;
      details.expiryDate = config.expiryDays
        ? new Date(Date.now() + config.expiryDays * 24 * 60 * 60 * 1000).toISOString()
        : null;
      break;

    case 'loyalty_reward':
      details.pointsAmount = config.pointsAmount;
      details.bonusMultiplier = config.bonusMultiplier;
      break;

    case 'notification':
      details.channel = config.channel;
      details.template = config.template;
      details.message = config.message;
      break;

    case 'workflow':
      details.workflowId = config.workflowId;
      break;

    case 'tag':
      details.tags = config.tags;
      break;
  }

  return details;
}

/**
 * Perform the actual action (send notification, create promo, etc.)
 */
async function performAction(execution: TriggerExecution, trigger: CustomerTrigger): Promise<void> {
  try {
    switch (trigger.actionType) {
      case 'notification':
        // TODO: Integrate with notification service
        console.log(`[Trigger] Sending notification to ${execution.accountId}`);
        await updateExecutionStatus(execution.id, 'sent');
        break;

      case 'promo':
        // TODO: Create promo in promotions table
        console.log(
          `[Trigger] Creating promo for ${execution.accountId}: ${execution.actionDetails.promoCode}`
        );
        await updateExecutionStatus(execution.id, 'sent');
        break;

      case 'loyalty_reward':
        // TODO: Add points to loyalty account
        console.log(
          `[Trigger] Awarding ${execution.actionDetails.pointsAmount} points to ${execution.accountId}`
        );
        await updateExecutionStatus(execution.id, 'sent');
        break;

      case 'alert_manager':
        // Create internal alert for manager
        await supabase.from('internal_notifications').insert({
          id: crypto.randomUUID(),
          type: 'customer_trigger_alert',
          priority: trigger.priority > 50 ? 3 : trigger.priority > 25 ? 2 : 1,
          subject: `Customer Trigger: ${trigger.name}`,
          body: `Trigger fired for customer. Reason: ${execution.triggeredReason}`,
          reference_type: 'trigger_execution',
          reference_id: execution.id,
          is_read: false,
          created_at: new Date().toISOString(),
        });
        await updateExecutionStatus(execution.id, 'delivered');
        break;

      case 'workflow':
        // TODO: Start workflow execution
        console.log(
          `[Trigger] Starting workflow ${execution.actionDetails.workflowId} for ${execution.accountId}`
        );
        await updateExecutionStatus(execution.id, 'sent');
        break;

      case 'tag':
        // TODO: Add tags to customer
        console.log(
          `[Trigger] Adding tags to ${execution.accountId}: ${execution.actionDetails.tags?.join(', ')}`
        );
        await updateExecutionStatus(execution.id, 'delivered');
        break;

      default:
        console.log(`[Trigger] Custom action for ${execution.accountId}`);
        await updateExecutionStatus(execution.id, 'sent');
    }
  } catch (error) {
    console.error('Error performing action:', error);
    await supabase
      .from('ai_customer_trigger_executions')
      .update({
        status: 'failed',
        error_message: error instanceof Error ? error.message : 'Unknown error',
        retry_count: execution.retryCount + 1,
      })
      .eq('id', execution.id);
  }
}

/**
 * Update execution status
 */
export async function updateExecutionStatus(
  executionId: string,
  status: ExecutionStatus,
  conversionData?: { value?: number; orderId?: string }
): Promise<void> {
  const updateData: any = { status };

  if (status === 'converted' && conversionData) {
    updateData.converted_at = new Date().toISOString();
    if (conversionData.value) updateData.conversion_value = conversionData.value;
    if (conversionData.orderId) updateData.conversion_order_id = conversionData.orderId;
  }

  await supabase.from('ai_customer_trigger_executions').update(updateData).eq('id', executionId);
}

// =============================================================================
// BATCH PROCESSING FUNCTIONS
// =============================================================================

/**
 * Run all active triggers for a merchant
 */
export async function runMerchantTriggers(
  merchantId: string
): Promise<{ processed: number; triggered: number; errors: number }> {
  const triggers = await getMerchantTriggers(merchantId, { isActive: true });

  let processed = 0;
  let triggered = 0;
  let errors = 0;

  for (const trigger of triggers) {
    try {
      const result = await runTriggerForAllCustomers(trigger);
      processed += result.processed;
      triggered += result.triggered;
      errors += result.errors;
    } catch (error) {
      console.error(`Error running trigger ${trigger.id}:`, error);
      errors++;
    }
  }

  return { processed, triggered, errors };
}

/**
 * Run a specific trigger for all eligible customers
 */
export async function runTriggerForAllCustomers(
  trigger: CustomerTrigger
): Promise<{ processed: number; triggered: number; errors: number }> {
  let processed = 0;
  let triggered = 0;
  let errors = 0;

  // Get customers based on trigger type
  let customers: { accountId: string }[] = [];

  switch (trigger.triggerType) {
    case 'churn_risk':
      const atRisk = await getCustomersAtRisk(
        trigger.merchantId,
        trigger.conditions.riskLevels || ['high', 'critical']
      );
      customers = atRisk.map((c) => ({ accountId: c.accountId }));
      break;

    case 'inactivity':
      // Get customers who haven't visited in X days
      const { data } = await supabase
        .from('ai_customer_intelligence')
        .select('account_id')
        .eq('merchant_id', trigger.merchantId)
        .gte('days_since_last_visit', trigger.conditions.daysInactive || 30);
      customers = (data || []).map((c) => ({ accountId: c.account_id }));
      break;

    default:
      // Get all customers with intelligence data
      const { data: allCustomers } = await supabase
        .from('ai_customer_intelligence')
        .select('account_id')
        .eq('merchant_id', trigger.merchantId);
      customers = (allCustomers || []).map((c) => ({ accountId: c.account_id }));
  }

  // Evaluate and execute for each customer
  for (const customer of customers) {
    processed++;

    try {
      const evaluation = await evaluateTrigger(trigger, customer.accountId, trigger.merchantId);

      if (evaluation.shouldTrigger) {
        await executeTrigger(trigger, customer.accountId, evaluation.matchedConditions.join(', '));
        triggered++;
      }
    } catch (error) {
      console.error(`Error processing customer ${customer.accountId}:`, error);
      errors++;
    }
  }

  return { processed, triggered, errors };
}

// =============================================================================
// PERFORMANCE & ANALYTICS
// =============================================================================

/**
 * Get trigger performance metrics
 */
export async function getTriggerPerformance(merchantId: string): Promise<TriggerPerformance[]> {
  const { data, error } = await supabase
    .from('v_trigger_performance')
    .select('*')
    .eq('merchant_id', merchantId);

  if (error) {
    console.error('Error fetching trigger performance:', error);
    return [];
  }

  return (data || []).map((row) => ({
    triggerId: row.trigger_id,
    merchantId: row.merchant_id,
    name: row.name,
    triggerType: row.trigger_type,
    actionType: row.action_type,
    isActive: row.is_active,
    totalTriggered: row.total_triggered || 0,
    totalConverted: row.total_converted || 0,
    conversionRatePct: parseFloat(row.conversion_rate_pct) || 0,
    lastTriggeredAt: row.last_triggered_at,
    totalRevenue: row.total_revenue ? parseFloat(row.total_revenue) : null,
  }));
}

/**
 * Get execution history for a trigger
 */
export async function getTriggerExecutions(
  triggerId: string,
  options: {
    status?: ExecutionStatus;
    limit?: number;
    offset?: number;
  } = {}
): Promise<{ executions: TriggerExecution[]; total: number }> {
  let query = supabase
    .from('ai_customer_trigger_executions')
    .select('*', { count: 'exact' })
    .eq('trigger_id', triggerId)
    .order('triggered_at', { ascending: false });

  if (options.status) {
    query = query.eq('status', options.status);
  }

  const limit = options.limit || 50;
  const offset = options.offset || 0;
  query = query.range(offset, offset + limit - 1);

  const { data, count, error } = await query;

  if (error) {
    console.error('Error fetching executions:', error);
    return { executions: [], total: 0 };
  }

  return {
    executions: (data || []).map(mapDbToExecution),
    total: count || 0,
  };
}

// =============================================================================
// AI-POWERED FUNCTIONS
// =============================================================================

/**
 * Use AI to suggest optimal triggers for a merchant
 */
export async function suggestTriggers(merchantId: string): Promise<Partial<CustomerTrigger>[]> {
  const openai = getOpenAIClient();

  // Get merchant data
  const { data: merchant } = await supabase
    .from('merchants')
    .select('name, business_type')
    .eq('id', merchantId)
    .single();

  // Get existing triggers
  const existingTriggers = await getMerchantTriggers(merchantId);

  // Get customer intelligence summary
  const { data: summary } = await supabase
    .from('v_customer_intelligence_summary')
    .select('*')
    .eq('merchant_id', merchantId)
    .single();

  const prompt = `Suggest 3 automated customer triggers for ${merchant?.name || 'a restaurant'}.

Business Type: ${merchant?.business_type || 'restaurant'}
Existing Triggers: ${existingTriggers.map((t) => t.name).join(', ') || 'None'}

Customer Summary:
- Total Customers: ${summary?.total_customers || 0}
- At Risk: ${summary?.at_risk || 0}
- Dormant: ${summary?.dormant || 0}
- Champions: ${summary?.champions || 0}

Suggest triggers that would improve retention and revenue. Respond with JSON array:
[{
  "name": "Trigger name",
  "description": "What it does",
  "triggerType": "churn_risk" | "inactivity" | "milestone" | "birthday" | "loyalty_tier",
  "conditions": { appropriate conditions },
  "actionType": "notification" | "promo" | "loyalty_reward" | "alert_manager",
  "actionConfig": { appropriate config },
  "cooldownDays": number,
  "priority": 1-100,
  "expectedImpact": "Description of expected impact"
}]`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a CRM automation expert. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 1500,
    });

    const responseText = completion.choices[0]?.message?.content || '[]';
    const cleanJson = responseText
      .replace(/```json?\n?/g, '')
      .replace(/```\n?/g, '')
      .trim();

    return JSON.parse(cleanJson);
  } catch (error) {
    console.error('Error suggesting triggers:', error);
    return [];
  }
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function generatePromoCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'WIN';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function mapDbToTrigger(data: any): CustomerTrigger {
  return {
    id: data.id,
    merchantId: data.merchant_id,
    name: data.name,
    description: data.description,
    triggerType: data.trigger_type,
    conditions: data.conditions || {},
    actionType: data.action_type,
    actionConfig: data.action_config || {},
    cooldownDays: data.cooldown_days || 30,
    maxTriggersPerCustomer: data.max_triggers_per_customer,
    targetSegments: data.target_segments || [],
    excludeSegments: data.exclude_segments || [],
    minClv: data.min_clv,
    maxClv: data.max_clv,
    isActive: data.is_active,
    priority: data.priority || 50,
    totalTriggered: data.total_triggered || 0,
    totalConverted: data.total_converted || 0,
    lastTriggeredAt: data.last_triggered_at,
    createdByAccountId: data.created_by_account_id,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}

function mapDbToExecution(data: any): TriggerExecution {
  return {
    id: data.id,
    triggerId: data.trigger_id,
    accountId: data.account_id,
    merchantId: data.merchant_id,
    triggeredAt: data.triggered_at,
    triggeredReason: data.triggered_reason,
    actionType: data.action_type,
    actionDetails: data.action_details || {},
    status: data.status,
    convertedAt: data.converted_at,
    conversionValue: data.conversion_value,
    conversionOrderId: data.conversion_order_id,
    nextEligibleAt: data.next_eligible_at,
    errorMessage: data.error_message,
    retryCount: data.retry_count || 0,
    createdAt: data.created_at,
    updatedAt: data.updated_at,
  };
}
