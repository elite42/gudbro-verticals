// AI Feedback Loop Service
// Phase 5: Collect merchant feedback and route to GudBro Team

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';

// Types
export interface AIFeedback {
  id: string;
  merchantId: string;
  accountId: string;
  sessionId?: string;

  // Feedback classification
  type: 'bug' | 'feature_request' | 'improvement' | 'complaint' | 'praise' | 'question';
  category:
    | 'ai_chat'
    | 'ai_actions'
    | 'ai_suggestions'
    | 'ui_ux'
    | 'data_accuracy'
    | 'performance'
    | 'other';

  // Content
  subject: string;
  description: string;
  aiSummary?: string; // AI-generated summary
  aiSentiment?: 'positive' | 'neutral' | 'negative';
  aiPriority?: number; // AI-suggested priority 1-5

  // Context
  conversationContext?: string; // Relevant chat history
  screenshotUrl?: string;
  metadata?: Record<string, any>;

  // Status
  status: 'new' | 'reviewed' | 'in_progress' | 'resolved' | 'wont_fix';
  assignedTo?: string;
  resolution?: string;

  // Timestamps
  createdAt: string;
  reviewedAt?: string;
  resolvedAt?: string;
}

export interface FeedbackStats {
  total: number;
  byType: Record<string, number>;
  byCategory: Record<string, number>;
  byStatus: Record<string, number>;
  avgSentiment: number;
  recentTrends: {
    period: string;
    count: number;
    sentiment: number;
  }[];
}

// Collect feedback from merchant
export async function collectFeedback(
  merchantId: string,
  accountId: string,
  feedback: {
    type: AIFeedback['type'];
    category: AIFeedback['category'];
    subject: string;
    description: string;
    sessionId?: string;
    screenshotUrl?: string;
    metadata?: Record<string, any>;
  }
): Promise<AIFeedback> {
  const openai = getOpenAIClient();

  // Get conversation context if sessionId provided
  let conversationContext = '';
  if (feedback.sessionId) {
    const { data: messages } = await supabase
      .from('ai_conversations')
      .select('role, content')
      .eq('session_id', feedback.sessionId)
      .order('created_at', { ascending: false })
      .limit(10);

    if (messages && messages.length > 0) {
      conversationContext = messages
        .reverse()
        .map((m) => `${m.role}: ${m.content.slice(0, 200)}`)
        .join('\n');
    }
  }

  // Use AI to analyze and summarize the feedback
  let aiSummary = '';
  let aiSentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
  let aiPriority = 3;

  try {
    const analysisPrompt = `Analyze this merchant feedback about our AI Co-Manager system:

Type: ${feedback.type}
Category: ${feedback.category}
Subject: ${feedback.subject}
Description: ${feedback.description}
${conversationContext ? `\nConversation Context:\n${conversationContext}` : ''}

Respond with JSON:
{
  "summary": "Brief 1-2 sentence summary of the core issue/request",
  "sentiment": "positive" | "neutral" | "negative",
  "priority": 1-5 (1=critical, 5=nice-to-have),
  "actionableInsights": ["List of specific actionable points"],
  "suggestedResponse": "Brief suggested response to merchant"
}`;

    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a product feedback analyst. Respond with valid JSON only.',
        },
        { role: 'user', content: analysisPrompt },
      ],
      temperature: 0.3,
      max_tokens: 500,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      const parsed = JSON.parse(cleanJson);
      aiSummary = parsed.summary || '';
      aiSentiment = parsed.sentiment || 'neutral';
      aiPriority = parsed.priority || 3;
    } catch {
      // Keep defaults if parsing fails
    }
  } catch (error) {
    console.error('Failed to analyze feedback:', error);
  }

  const feedbackRecord: AIFeedback = {
    id: crypto.randomUUID(),
    merchantId,
    accountId,
    sessionId: feedback.sessionId,
    type: feedback.type,
    category: feedback.category,
    subject: feedback.subject,
    description: feedback.description,
    aiSummary,
    aiSentiment,
    aiPriority,
    conversationContext: conversationContext || undefined,
    screenshotUrl: feedback.screenshotUrl,
    metadata: feedback.metadata,
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  // Save to database
  await supabase.from('ai_feedback').insert({
    id: feedbackRecord.id,
    merchant_id: feedbackRecord.merchantId,
    account_id: feedbackRecord.accountId,
    session_id: feedbackRecord.sessionId,
    type: feedbackRecord.type,
    category: feedbackRecord.category,
    subject: feedbackRecord.subject,
    description: feedbackRecord.description,
    ai_summary: feedbackRecord.aiSummary,
    ai_sentiment: feedbackRecord.aiSentiment,
    ai_priority: feedbackRecord.aiPriority,
    conversation_context: feedbackRecord.conversationContext,
    screenshot_url: feedbackRecord.screenshotUrl,
    metadata: feedbackRecord.metadata,
    status: feedbackRecord.status,
    created_at: feedbackRecord.createdAt,
  });

  // Notify GudBro team (in production, this would send email/Slack)
  await notifyTeam(feedbackRecord);

  return feedbackRecord;
}

// Notify GudBro team about new feedback
async function notifyTeam(feedback: AIFeedback): Promise<void> {
  // Log for now - in production would integrate with:
  // - Email (SendGrid, Resend)
  // - Slack webhook
  // - Internal dashboard notification

  const notification = {
    type: 'ai_feedback',
    priority: feedback.aiPriority,
    subject: `[AI Feedback] ${feedback.type}: ${feedback.subject}`,
    body: `
Merchant: ${feedback.merchantId}
Type: ${feedback.type}
Category: ${feedback.category}
Sentiment: ${feedback.aiSentiment}
Priority: ${feedback.aiPriority}/5

Summary: ${feedback.aiSummary}

Description: ${feedback.description}
    `.trim(),
    feedbackId: feedback.id,
    createdAt: new Date().toISOString(),
  };

  // Save notification for internal dashboard
  await supabase.from('internal_notifications').insert({
    id: crypto.randomUUID(),
    type: notification.type,
    priority: notification.priority,
    subject: notification.subject,
    body: notification.body,
    reference_type: 'ai_feedback',
    reference_id: feedback.id,
    is_read: false,
    created_at: notification.createdAt,
  });

  console.log('[AI Feedback] New feedback submitted:', notification.subject);
}

// Get feedback for a merchant (for their own history)
export async function getMerchantFeedback(
  merchantId: string,
  options: {
    status?: AIFeedback['status'];
    limit?: number;
  } = {}
): Promise<AIFeedback[]> {
  let query = supabase
    .from('ai_feedback')
    .select('*')
    .eq('merchant_id', merchantId)
    .order('created_at', { ascending: false })
    .limit(options.limit || 20);

  if (options.status) {
    query = query.eq('status', options.status);
  }

  const { data } = await query;

  return (data || []).map((f) => ({
    id: f.id,
    merchantId: f.merchant_id,
    accountId: f.account_id,
    sessionId: f.session_id,
    type: f.type,
    category: f.category,
    subject: f.subject,
    description: f.description,
    aiSummary: f.ai_summary,
    aiSentiment: f.ai_sentiment,
    aiPriority: f.ai_priority,
    conversationContext: f.conversation_context,
    screenshotUrl: f.screenshot_url,
    metadata: f.metadata,
    status: f.status,
    assignedTo: f.assigned_to,
    resolution: f.resolution,
    createdAt: f.created_at,
    reviewedAt: f.reviewed_at,
    resolvedAt: f.resolved_at,
  }));
}

// Get all feedback for GudBro team (admin only)
export async function getAllFeedback(
  options: {
    status?: AIFeedback['status'];
    type?: AIFeedback['type'];
    category?: AIFeedback['category'];
    priority?: number;
    limit?: number;
    offset?: number;
  } = {}
): Promise<{ feedback: AIFeedback[]; total: number }> {
  let query = supabase
    .from('ai_feedback')
    .select('*', { count: 'exact' })
    .order('ai_priority', { ascending: true })
    .order('created_at', { ascending: false });

  if (options.status) query = query.eq('status', options.status);
  if (options.type) query = query.eq('type', options.type);
  if (options.category) query = query.eq('category', options.category);
  if (options.priority) query = query.eq('ai_priority', options.priority);

  query = query.range(options.offset || 0, (options.offset || 0) + (options.limit || 50) - 1);

  const { data, count } = await query;

  const feedback = (data || []).map((f) => ({
    id: f.id,
    merchantId: f.merchant_id,
    accountId: f.account_id,
    sessionId: f.session_id,
    type: f.type,
    category: f.category,
    subject: f.subject,
    description: f.description,
    aiSummary: f.ai_summary,
    aiSentiment: f.ai_sentiment,
    aiPriority: f.ai_priority,
    conversationContext: f.conversation_context,
    screenshotUrl: f.screenshot_url,
    metadata: f.metadata,
    status: f.status,
    assignedTo: f.assigned_to,
    resolution: f.resolution,
    createdAt: f.created_at,
    reviewedAt: f.reviewed_at,
    resolvedAt: f.resolved_at,
  }));

  return { feedback, total: count || 0 };
}

// Update feedback status (GudBro team action)
export async function updateFeedbackStatus(
  feedbackId: string,
  update: {
    status: AIFeedback['status'];
    assignedTo?: string;
    resolution?: string;
  }
): Promise<void> {
  const updateData: any = {
    status: update.status,
  };

  if (update.assignedTo) {
    updateData.assigned_to = update.assignedTo;
  }

  if (update.status === 'reviewed') {
    updateData.reviewed_at = new Date().toISOString();
  }

  if (update.status === 'resolved' || update.status === 'wont_fix') {
    updateData.resolved_at = new Date().toISOString();
    if (update.resolution) {
      updateData.resolution = update.resolution;
    }
  }

  await supabase.from('ai_feedback').update(updateData).eq('id', feedbackId);
}

// Get feedback statistics for dashboard
export async function getFeedbackStats(): Promise<FeedbackStats> {
  // Get all feedback for stats
  const { data: feedback } = await supabase
    .from('ai_feedback')
    .select('type, category, status, ai_sentiment, ai_priority, created_at');

  if (!feedback || feedback.length === 0) {
    return {
      total: 0,
      byType: {},
      byCategory: {},
      byStatus: {},
      avgSentiment: 0,
      recentTrends: [],
    };
  }

  // Calculate stats
  const byType: Record<string, number> = {};
  const byCategory: Record<string, number> = {};
  const byStatus: Record<string, number> = {};
  let sentimentSum = 0;
  const sentimentMap = { positive: 1, neutral: 0, negative: -1 };

  for (const f of feedback) {
    byType[f.type] = (byType[f.type] || 0) + 1;
    byCategory[f.category] = (byCategory[f.category] || 0) + 1;
    byStatus[f.status] = (byStatus[f.status] || 0) + 1;
    sentimentSum += sentimentMap[f.ai_sentiment as keyof typeof sentimentMap] || 0;
  }

  // Calculate weekly trends (last 4 weeks)
  const now = new Date();
  const recentTrends: FeedbackStats['recentTrends'] = [];

  for (let i = 0; i < 4; i++) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
    const weekEnd = new Date(now);
    weekEnd.setDate(weekEnd.getDate() - i * 7);

    const weekFeedback = feedback.filter((f) => {
      const created = new Date(f.created_at);
      return created >= weekStart && created < weekEnd;
    });

    const weekSentiment =
      weekFeedback.reduce(
        (sum, f) => sum + (sentimentMap[f.ai_sentiment as keyof typeof sentimentMap] || 0),
        0
      ) / (weekFeedback.length || 1);

    recentTrends.push({
      period: `Week -${i + 1}`,
      count: weekFeedback.length,
      sentiment: weekSentiment,
    });
  }

  return {
    total: feedback.length,
    byType,
    byCategory,
    byStatus,
    avgSentiment: sentimentSum / feedback.length,
    recentTrends: recentTrends.reverse(),
  };
}

// Respond to merchant feedback
export async function respondToFeedback(
  feedbackId: string,
  response: string,
  responderId: string
): Promise<void> {
  // Get the feedback
  const { data: feedback } = await supabase
    .from('ai_feedback')
    .select('merchant_id, account_id, subject')
    .eq('id', feedbackId)
    .single();

  if (!feedback) return;

  // Save response
  await supabase.from('ai_feedback_responses').insert({
    id: crypto.randomUUID(),
    feedback_id: feedbackId,
    responder_id: responderId,
    response,
    created_at: new Date().toISOString(),
  });

  // Update feedback status to reviewed if still new
  await supabase
    .from('ai_feedback')
    .update({
      status: 'reviewed',
      reviewed_at: new Date().toISOString(),
    })
    .eq('id', feedbackId)
    .eq('status', 'new');

  // TODO: Send notification to merchant about the response
  console.log(`[AI Feedback] Response sent for feedback ${feedbackId}`);
}
