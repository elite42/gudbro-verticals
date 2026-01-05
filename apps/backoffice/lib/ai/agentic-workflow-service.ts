// AI Agentic Workflow Service
// Phase 11: Chain multiple AI actions into intelligent workflows
// Autonomous multi-step operations triggered by events or scheduled

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';
import { generateDelegatedTasks, createTask } from './task-delegation-service';
import { generatePost } from './social-media-service';
import { collectFeedback } from './feedback-loop-service';

// Types
export type WorkflowStatus = 'pending' | 'running' | 'completed' | 'failed' | 'paused';
export type WorkflowTrigger = 'manual' | 'scheduled' | 'event' | 'condition';

export interface WorkflowStep {
  id: string;
  name: string;
  action: string; // Function to execute
  params: Record<string, any>;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  result?: any;
  error?: string;
  startedAt?: string;
  completedAt?: string;
  dependsOn?: string[]; // IDs of steps this depends on
}

export interface WorkflowDefinition {
  id: string;
  merchantId: string;
  name: string;
  description: string;
  trigger: WorkflowTrigger;
  triggerConfig?: {
    schedule?: string; // Cron expression
    eventType?: string; // Event that triggers
    condition?: string; // Condition expression
  };
  steps: WorkflowStep[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface WorkflowExecution {
  id: string;
  workflowId: string;
  merchantId: string;
  status: WorkflowStatus;
  steps: WorkflowStep[];
  startedAt: string;
  completedAt?: string;
  error?: string;
  triggeredBy: WorkflowTrigger;
  context?: Record<string, any>;
}

// Available workflow actions
const WORKFLOW_ACTIONS: Record<
  string,
  (merchantId: string, params: any, context: any) => Promise<any>
> = {
  // Task delegation
  generate_tasks: async (merchantId, _params, _context) => {
    return await generateDelegatedTasks(merchantId);
  },

  create_task: async (merchantId, params, _context) => {
    return await createTask(merchantId, params);
  },

  // Social media
  generate_social_post: async (merchantId, params, _context) => {
    return await generatePost(merchantId, params);
  },

  // Data analysis
  analyze_sales: async (merchantId, params, _context) => {
    const days = params.days || 7;
    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - days);

    const { data } = await supabase
      .from('analytics_daily_aggregates')
      .select('*')
      .eq('merchant_id', merchantId)
      .gte('date', fromDate.toISOString().split('T')[0]);

    const totalRevenue = (data || []).reduce((sum, d) => sum + (d.total_revenue || 0), 0);
    const totalOrders = (data || []).reduce((sum, d) => sum + (d.order_count || 0), 0);

    return {
      period: `${days} days`,
      totalRevenue,
      totalOrders,
      avgOrderValue: totalOrders > 0 ? totalRevenue / totalOrders : 0,
      dataPoints: data?.length || 0,
    };
  },

  // Notifications
  send_notification: async (merchantId, params, _context) => {
    const { title, message, type } = params;

    await supabase.from('internal_notifications').insert({
      merchant_id: merchantId,
      title,
      message,
      type: type || 'info',
      is_read: false,
      created_at: new Date().toISOString(),
    });

    return { sent: true, title };
  },

  // AI decisions
  ai_decision: async (merchantId, params, context) => {
    const openai = getOpenAIClient();
    const { question, options } = params;

    const prompt = `Based on this context for merchant ${merchantId}:
${JSON.stringify(context, null, 2)}

Question: ${question}

Options:
${options.map((o: string, i: number) => `${i + 1}. ${o}`).join('\n')}

Which option should be chosen? Respond with ONLY the number (1, 2, etc.) and a brief reason.`;

    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a business decision assistant. Give clear, actionable recommendations.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.3,
      max_tokens: 100,
    });

    const response = completion.choices[0]?.message?.content || '1';
    const choiceMatch = response.match(/^(\d+)/);
    const choice = choiceMatch ? parseInt(choiceMatch[1]) - 1 : 0;

    return {
      choice: options[choice] || options[0],
      choiceIndex: choice,
      reasoning: response,
    };
  },

  // Conditional checks
  check_condition: async (merchantId, params, context) => {
    const { condition, trueValue, falseValue } = params;

    // Simple condition evaluation
    let result = false;
    try {
      // Safe evaluation of simple conditions
      if (condition.includes('>')) {
        const [left, right] = condition.split('>').map((s) => s.trim());
        const leftVal = context[left] ?? parseFloat(left);
        const rightVal = parseFloat(right);
        result = leftVal > rightVal;
      } else if (condition.includes('<')) {
        const [left, right] = condition.split('<').map((s) => s.trim());
        const leftVal = context[left] ?? parseFloat(left);
        const rightVal = parseFloat(right);
        result = leftVal < rightVal;
      } else if (condition.includes('==')) {
        const [left, right] = condition.split('==').map((s) => s.trim());
        const leftVal = context[left] ?? left;
        result = leftVal == right;
      } else {
        result = !!context[condition];
      }
    } catch (e) {
      result = false;
    }

    return {
      condition,
      result,
      value: result ? trueValue : falseValue,
    };
  },

  // Submit feedback
  submit_feedback: async (merchantId, params, _context) => {
    return await collectFeedback(merchantId, params);
  },

  // Wait/delay (simulated - actual delay in executor)
  wait: async (_merchantId, params, _context) => {
    return { waitSeconds: params.seconds || 0 };
  },
};

// Create a workflow definition
export async function createWorkflow(
  merchantId: string,
  workflow: Omit<WorkflowDefinition, 'id' | 'createdAt' | 'updatedAt'>
): Promise<WorkflowDefinition> {
  const newWorkflow: WorkflowDefinition = {
    ...workflow,
    id: crypto.randomUUID(),
    merchantId,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const { error } = await supabase.from('ai_workflow_definitions').insert({
    id: newWorkflow.id,
    merchant_id: newWorkflow.merchantId,
    name: newWorkflow.name,
    description: newWorkflow.description,
    trigger: newWorkflow.trigger,
    trigger_config: newWorkflow.triggerConfig,
    steps: newWorkflow.steps,
    is_active: newWorkflow.isActive,
    created_at: newWorkflow.createdAt,
    updated_at: newWorkflow.updatedAt,
  });

  if (error) throw error;
  return newWorkflow;
}

// Execute a workflow
export async function executeWorkflow(
  workflowId: string,
  merchantId: string,
  triggeredBy: WorkflowTrigger = 'manual',
  initialContext: Record<string, any> = {}
): Promise<WorkflowExecution> {
  // Get workflow definition
  const { data: workflowData, error: fetchError } = await supabase
    .from('ai_workflow_definitions')
    .select('*')
    .eq('id', workflowId)
    .single();

  if (fetchError || !workflowData) {
    throw new Error('Workflow not found');
  }

  // Create execution record
  const execution: WorkflowExecution = {
    id: crypto.randomUUID(),
    workflowId,
    merchantId,
    status: 'running',
    steps: (workflowData.steps as WorkflowStep[]).map((s) => ({
      ...s,
      status: 'pending' as const,
    })),
    startedAt: new Date().toISOString(),
    triggeredBy,
    context: initialContext,
  };

  // Save initial execution state
  await supabase.from('ai_workflow_executions').insert({
    id: execution.id,
    workflow_id: execution.workflowId,
    merchant_id: execution.merchantId,
    status: execution.status,
    steps: execution.steps,
    started_at: execution.startedAt,
    triggered_by: execution.triggeredBy,
    context: execution.context,
  });

  // Execute steps
  const context = { ...initialContext };

  for (const step of execution.steps) {
    // Check dependencies
    if (step.dependsOn && step.dependsOn.length > 0) {
      const dependenciesMet = step.dependsOn.every((depId) => {
        const depStep = execution.steps.find((s) => s.id === depId);
        return depStep?.status === 'completed';
      });

      if (!dependenciesMet) {
        step.status = 'skipped';
        continue;
      }
    }

    step.status = 'running';
    step.startedAt = new Date().toISOString();

    try {
      const actionFn = WORKFLOW_ACTIONS[step.action];
      if (!actionFn) {
        throw new Error(`Unknown action: ${step.action}`);
      }

      // Execute action
      const result = await actionFn(merchantId, step.params, context);
      step.result = result;
      step.status = 'completed';
      step.completedAt = new Date().toISOString();

      // Add result to context for next steps
      context[`step_${step.id}`] = result;
      context[step.name] = result;

      // Handle wait action
      if (step.action === 'wait' && result.waitSeconds > 0) {
        await new Promise((resolve) => setTimeout(resolve, result.waitSeconds * 1000));
      }
    } catch (error) {
      step.status = 'failed';
      step.error = error instanceof Error ? error.message : 'Unknown error';
      step.completedAt = new Date().toISOString();

      // Mark workflow as failed
      execution.status = 'failed';
      execution.error = `Step "${step.name}" failed: ${step.error}`;
      break;
    }
  }

  // Complete execution
  if (execution.status !== 'failed') {
    execution.status = 'completed';
  }
  execution.completedAt = new Date().toISOString();
  execution.context = context;

  // Update execution record
  await supabase
    .from('ai_workflow_executions')
    .update({
      status: execution.status,
      steps: execution.steps,
      completed_at: execution.completedAt,
      context: execution.context,
      error: execution.error,
    })
    .eq('id', execution.id);

  return execution;
}

// Get workflow definitions for merchant
export async function getWorkflows(
  merchantId: string,
  options: { isActive?: boolean } = {}
): Promise<WorkflowDefinition[]> {
  let query = supabase
    .from('ai_workflow_definitions')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false });

  if (options.isActive !== undefined) {
    query = query.eq('is_active', options.isActive);
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data || []).map((w) => ({
    id: w.id,
    merchantId: w.merchant_id,
    name: w.name,
    description: w.description,
    trigger: w.trigger,
    triggerConfig: w.trigger_config,
    steps: w.steps,
    isActive: w.is_active,
    createdAt: w.created_at,
    updatedAt: w.updated_at,
  }));
}

// Get workflow executions
export async function getExecutions(
  merchantId: string,
  options: { workflowId?: string; status?: WorkflowStatus; limit?: number } = {}
): Promise<WorkflowExecution[]> {
  let query = supabase
    .from('ai_workflow_executions')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('started_at', { ascending: false });

  if (options.workflowId) {
    query = query.eq('workflow_id', options.workflowId);
  }

  if (options.status) {
    query = query.eq('status', options.status);
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data || []).map((e) => ({
    id: e.id,
    workflowId: e.workflow_id,
    merchantId: e.merchant_id,
    status: e.status,
    steps: e.steps,
    startedAt: e.started_at,
    completedAt: e.completed_at,
    error: e.error,
    triggeredBy: e.triggered_by,
    context: e.context,
  }));
}

// Toggle workflow active status
export async function toggleWorkflow(workflowId: string, isActive: boolean): Promise<void> {
  const { error } = await supabase
    .from('ai_workflow_definitions')
    .update({
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq('id', workflowId);

  if (error) throw error;
}

// Create pre-built workflow templates
export async function createDefaultWorkflows(merchantId: string): Promise<WorkflowDefinition[]> {
  const templates: Omit<WorkflowDefinition, 'id' | 'createdAt' | 'updatedAt'>[] = [
    {
      merchantId,
      name: 'Morning Prep Workflow',
      description: 'Daily morning preparation: analyze yesterday, generate tasks, post on social',
      trigger: 'scheduled',
      triggerConfig: { schedule: '0 8 * * *' }, // 8 AM daily
      steps: [
        {
          id: 'analyze',
          name: 'Analyze Yesterday',
          action: 'analyze_sales',
          params: { days: 1 },
          status: 'pending',
        },
        {
          id: 'tasks',
          name: 'Generate Daily Tasks',
          action: 'generate_tasks',
          params: {},
          status: 'pending',
          dependsOn: ['analyze'],
        },
        {
          id: 'notify',
          name: 'Send Morning Brief',
          action: 'send_notification',
          params: {
            title: 'Good Morning!',
            message: 'Your daily tasks have been generated. Check them out!',
            type: 'info',
          },
          status: 'pending',
          dependsOn: ['tasks'],
        },
      ],
      isActive: false,
    },
    {
      merchantId,
      name: 'Low Sales Alert',
      description: 'When sales drop, create marketing task and social post',
      trigger: 'condition',
      triggerConfig: { condition: 'dailyRevenue < avgRevenue * 0.7' },
      steps: [
        {
          id: 'task',
          name: 'Create Marketing Task',
          action: 'create_task',
          params: {
            title: 'Run a promotion - sales are down',
            description: 'Consider offering a special deal or discount to boost sales',
            category: 'marketing',
            priority: 'high',
          },
          status: 'pending',
        },
        {
          id: 'post',
          name: 'Generate Promo Post',
          action: 'generate_social_post',
          params: {
            platform: 'instagram',
            contentType: 'promotional',
            topic: 'Special offer for our valued customers',
          },
          status: 'pending',
        },
      ],
      isActive: false,
    },
  ];

  const workflows: WorkflowDefinition[] = [];
  for (const template of templates) {
    const workflow = await createWorkflow(merchantId, template);
    workflows.push(workflow);
  }

  return workflows;
}
