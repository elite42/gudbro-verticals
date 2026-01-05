// AI Task Delegation Service
// Phase 10: AI delegates physical tasks to merchant/staff
// Tasks that require human action (clean tables, check inventory, call supplier, etc.)

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';

// Types
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'overdue';
export type TaskCategory =
  | 'inventory' // Check stock, reorder supplies
  | 'maintenance' // Clean, repair, equipment check
  | 'staff' // Schedule, training, communication
  | 'customer' // Follow up, resolve complaint
  | 'marketing' // Post on social, update menu photos
  | 'financial' // Pay invoice, reconcile cash
  | 'compliance' // Health check, license renewal
  | 'other';

export interface DelegatedTask {
  id: string;
  merchantId: string;

  // Task details
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;

  // Assignment
  assignedTo?: string; // User ID or name
  assignedRole?: string; // e.g., "manager", "staff"

  // Timing
  dueDate?: string;
  estimatedMinutes?: number;
  completedAt?: string;

  // Context from AI
  aiReason: string; // Why AI created this task
  aiSuggestions?: string[]; // Tips for completing
  relatedData?: any; // e.g., low stock items, event details

  // Tracking
  createdAt: string;
  updatedAt: string;
  createdBy: 'ai' | 'manual';

  // Completion
  completionNotes?: string;
  wasHelpful?: boolean; // Feedback from user
}

export interface TaskAnalysis {
  upcomingTasks: DelegatedTask[];
  overdueTasks: DelegatedTask[];
  completionRate: number;
  averageCompletionTime: number;
  tasksByCategory: Record<TaskCategory, number>;
  suggestions: string[];
}

// Generate tasks based on current business state
export async function generateDelegatedTasks(merchantId: string): Promise<DelegatedTask[]> {
  const openai = getOpenAIClient();

  // Gather context
  const [merchantData, eventsData, inventoryData, ordersData] = await Promise.all([
    supabase.from('merchants').select('name, business_type').eq('id', merchantId).single(),
    supabase
      .from('events')
      .select('*')
      .eq('merchant_id', merchantId)
      .gte('start_time', new Date().toISOString())
      .limit(10),
    supabase
      .from('ai_bootstrap_results')
      .select('zone_analysis, competitors')
      .eq('merchant_id', merchantId)
      .single(),
    supabase
      .from('analytics_daily_aggregates')
      .select('*')
      .eq('merchant_id', merchantId)
      .order('date', { ascending: false })
      .limit(7),
  ]);

  const merchant = merchantData.data;
  const upcomingEvents = eventsData.data || [];
  const analytics = ordersData.data || [];

  const context = {
    businessType: merchant?.business_type || 'restaurant',
    businessName: merchant?.name || 'Business',
    hasUpcomingEvents: upcomingEvents.length > 0,
    upcomingEvents: upcomingEvents.slice(0, 3).map((e) => ({ title: e.title, date: e.start_time })),
    recentPerformance: analytics.length > 0 ? 'has_data' : 'no_data',
  };

  const prompt = `Based on this business context, suggest 3-5 practical tasks that the ${context.businessType} owner/staff should do today or this week.

Business: ${context.businessName}
Type: ${context.businessType}
Upcoming events: ${JSON.stringify(context.upcomingEvents)}
Has recent sales data: ${context.recentPerformance}

Generate practical, actionable tasks. Focus on:
- Preparation for upcoming events
- Regular maintenance
- Marketing opportunities
- Inventory checks
- Staff coordination

Respond with JSON array:
[
  {
    "title": "Brief task title",
    "description": "What to do and why",
    "category": "inventory|maintenance|staff|customer|marketing|financial|compliance|other",
    "priority": "low|medium|high|urgent",
    "aiReason": "Why AI suggests this",
    "estimatedMinutes": 30,
    "suggestions": ["Tip 1", "Tip 2"]
  }
]`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a restaurant operations advisor. Generate practical daily tasks. Respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 800,
    });

    const responseText = completion.choices[0]?.message?.content || '[]';
    let parsed: any[];
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = [];
    }

    const tasks: DelegatedTask[] = parsed.map((t: any) => ({
      id: crypto.randomUUID(),
      merchantId,
      title: t.title || 'Task',
      description: t.description || '',
      category: t.category || 'other',
      priority: t.priority || 'medium',
      status: 'pending' as TaskStatus,
      aiReason: t.aiReason || 'AI suggested task',
      aiSuggestions: t.suggestions || [],
      estimatedMinutes: t.estimatedMinutes || 30,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: 'ai' as const,
    }));

    // Save tasks to database
    if (tasks.length > 0) {
      const { error } = await supabase.from('ai_delegated_tasks').insert(
        tasks.map((t) => ({
          id: t.id,
          merchant_id: t.merchantId,
          title: t.title,
          description: t.description,
          category: t.category,
          priority: t.priority,
          status: t.status,
          ai_reason: t.aiReason,
          ai_suggestions: t.aiSuggestions,
          estimated_minutes: t.estimatedMinutes,
          created_at: t.createdAt,
          updated_at: t.updatedAt,
          created_by: t.createdBy,
        }))
      );

      if (error) {
        console.error('Failed to save delegated tasks:', error);
      }
    }

    return tasks;
  } catch (error) {
    console.error('Task generation failed:', error);
    throw error;
  }
}

// Create a specific task manually or from AI
export async function createTask(
  merchantId: string,
  task: Partial<DelegatedTask>
): Promise<DelegatedTask> {
  const newTask: DelegatedTask = {
    id: crypto.randomUUID(),
    merchantId,
    title: task.title || 'New Task',
    description: task.description || '',
    category: task.category || 'other',
    priority: task.priority || 'medium',
    status: 'pending',
    assignedTo: task.assignedTo,
    assignedRole: task.assignedRole,
    dueDate: task.dueDate,
    estimatedMinutes: task.estimatedMinutes,
    aiReason: task.aiReason || 'Manually created',
    aiSuggestions: task.aiSuggestions,
    relatedData: task.relatedData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    createdBy: task.createdBy || 'manual',
  };

  const { error } = await supabase.from('ai_delegated_tasks').insert({
    id: newTask.id,
    merchant_id: newTask.merchantId,
    title: newTask.title,
    description: newTask.description,
    category: newTask.category,
    priority: newTask.priority,
    status: newTask.status,
    assigned_to: newTask.assignedTo,
    assigned_role: newTask.assignedRole,
    due_date: newTask.dueDate,
    estimated_minutes: newTask.estimatedMinutes,
    ai_reason: newTask.aiReason,
    ai_suggestions: newTask.aiSuggestions,
    related_data: newTask.relatedData,
    created_at: newTask.createdAt,
    updated_at: newTask.updatedAt,
    created_by: newTask.createdBy,
  });

  if (error) throw error;
  return newTask;
}

// Update task status
export async function updateTaskStatus(
  taskId: string,
  status: TaskStatus,
  completionNotes?: string
): Promise<void> {
  const updates: any = {
    status,
    updated_at: new Date().toISOString(),
  };

  if (status === 'completed') {
    updates.completed_at = new Date().toISOString();
    if (completionNotes) {
      updates.completion_notes = completionNotes;
    }
  }

  const { error } = await supabase.from('ai_delegated_tasks').update(updates).eq('id', taskId);

  if (error) throw error;
}

// Provide feedback on task helpfulness
export async function provideTaskFeedback(taskId: string, wasHelpful: boolean): Promise<void> {
  const { error } = await supabase
    .from('ai_delegated_tasks')
    .update({
      was_helpful: wasHelpful,
      updated_at: new Date().toISOString(),
    })
    .eq('id', taskId);

  if (error) throw error;
}

// Get tasks for merchant
export async function getTasks(
  merchantId: string,
  options: {
    status?: TaskStatus;
    category?: TaskCategory;
    priority?: TaskPriority;
    includeCompleted?: boolean;
    limit?: number;
  } = {}
): Promise<DelegatedTask[]> {
  let query = supabase
    .from('ai_delegated_tasks')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false });

  if (options.status) {
    query = query.eq('status', options.status);
  } else if (!options.includeCompleted) {
    query = query.neq('status', 'completed').neq('status', 'cancelled');
  }

  if (options.category) {
    query = query.eq('category', options.category);
  }

  if (options.priority) {
    query = query.eq('priority', options.priority);
  }

  if (options.limit) {
    query = query.limit(options.limit);
  }

  const { data, error } = await query;
  if (error) throw error;

  return (data || []).map((t) => ({
    id: t.id,
    merchantId: t.merchant_id,
    title: t.title,
    description: t.description,
    category: t.category,
    priority: t.priority,
    status: t.status,
    assignedTo: t.assigned_to,
    assignedRole: t.assigned_role,
    dueDate: t.due_date,
    estimatedMinutes: t.estimated_minutes,
    completedAt: t.completed_at,
    aiReason: t.ai_reason,
    aiSuggestions: t.ai_suggestions,
    relatedData: t.related_data,
    createdAt: t.created_at,
    updatedAt: t.updated_at,
    createdBy: t.created_by,
    completionNotes: t.completion_notes,
    wasHelpful: t.was_helpful,
  }));
}

// Get task analysis for merchant
export async function analyzeTaskPerformance(merchantId: string): Promise<TaskAnalysis> {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const { data: allTasks } = await supabase
    .from('ai_delegated_tasks')
    .select('*')
    .eq('merchant_id', merchantId)
    .gte('created_at', thirtyDaysAgo.toISOString());

  const tasks = allTasks || [];
  const now = new Date();

  // Categorize tasks
  const upcomingTasks = tasks.filter((t) => t.status === 'pending' || t.status === 'in_progress');

  const overdueTasks = tasks.filter(
    (t) =>
      t.due_date &&
      new Date(t.due_date) < now &&
      t.status !== 'completed' &&
      t.status !== 'cancelled'
  );

  const completedTasks = tasks.filter((t) => t.status === 'completed');
  const completionRate = tasks.length > 0 ? (completedTasks.length / tasks.length) * 100 : 0;

  // Calculate average completion time
  let totalMinutes = 0;
  let countWithTime = 0;
  for (const task of completedTasks) {
    if (task.created_at && task.completed_at) {
      const created = new Date(task.created_at);
      const completed = new Date(task.completed_at);
      const minutes = (completed.getTime() - created.getTime()) / (1000 * 60);
      totalMinutes += minutes;
      countWithTime++;
    }
  }
  const averageCompletionTime = countWithTime > 0 ? totalMinutes / countWithTime : 0;

  // Count by category
  const tasksByCategory: Record<TaskCategory, number> = {
    inventory: 0,
    maintenance: 0,
    staff: 0,
    customer: 0,
    marketing: 0,
    financial: 0,
    compliance: 0,
    other: 0,
  };
  for (const task of tasks) {
    const cat = task.category as TaskCategory;
    if (tasksByCategory[cat] !== undefined) {
      tasksByCategory[cat]++;
    }
  }

  // Generate suggestions
  const suggestions: string[] = [];
  if (overdueTasks.length > 3) {
    suggestions.push('You have several overdue tasks. Consider prioritizing or reassigning them.');
  }
  if (completionRate < 50) {
    suggestions.push('Task completion rate is low. Try breaking tasks into smaller steps.');
  }
  if (tasksByCategory.inventory === 0 && tasks.length > 5) {
    suggestions.push('Consider adding regular inventory check tasks.');
  }

  return {
    upcomingTasks: upcomingTasks.map((t) => ({
      id: t.id,
      merchantId: t.merchant_id,
      title: t.title,
      description: t.description,
      category: t.category,
      priority: t.priority,
      status: t.status,
      dueDate: t.due_date,
      estimatedMinutes: t.estimated_minutes,
      aiReason: t.ai_reason,
      aiSuggestions: t.ai_suggestions,
      createdAt: t.created_at,
      updatedAt: t.updated_at,
      createdBy: t.created_by,
    })),
    overdueTasks: overdueTasks.map((t) => ({
      id: t.id,
      merchantId: t.merchant_id,
      title: t.title,
      description: t.description,
      category: t.category,
      priority: t.priority,
      status: t.status,
      dueDate: t.due_date,
      estimatedMinutes: t.estimated_minutes,
      aiReason: t.ai_reason,
      aiSuggestions: t.ai_suggestions,
      createdAt: t.created_at,
      updatedAt: t.updated_at,
      createdBy: t.created_by,
    })),
    completionRate,
    averageCompletionTime,
    tasksByCategory,
    suggestions,
  };
}
