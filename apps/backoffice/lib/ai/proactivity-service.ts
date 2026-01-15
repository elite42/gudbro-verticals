// AI Proactivity Service
// Phase 4: Daily briefings, alerts, and suggestions

import { supabase } from '@/lib/supabase';
import { getOpenAIClient, DEFAULT_MODEL } from './openai';
import { fetchMerchantKnowledge, formatKnowledgeForAI } from './knowledge-service';
import { getMerchantQRStats, getMerchantSourcePerformance } from '@/lib/qr/qr-service';

// Types
export interface DailyBriefing {
  id: string;
  merchantId: string;
  date: string;
  summary: string;
  highlights: BriefingHighlight[];
  alerts: Alert[];
  suggestions: Suggestion[];
  generatedAt: string;
}

export interface BriefingHighlight {
  type: 'positive' | 'neutral' | 'negative';
  title: string;
  description: string;
  metric?: string;
  change?: number;
}

export interface Alert {
  id: string;
  type: 'warning' | 'info' | 'success' | 'urgent';
  category: 'inventory' | 'sales' | 'feedback' | 'events' | 'operations' | 'qr';
  title: string;
  message: string;
  actionable: boolean;
  suggestedAction?: string;
  priority: number; // 1-5, 1 is highest
  createdAt: string;
  dismissedAt?: string;
}

export interface Suggestion {
  id: string;
  type: 'menu' | 'pricing' | 'marketing' | 'operations' | 'events';
  title: string;
  description: string;
  expectedImpact?: string;
  effort: 'low' | 'medium' | 'high';
  priority: number;
}

// Generate daily briefing for a merchant
export async function generateDailyBriefing(
  merchantId: string,
  locationId?: string
): Promise<DailyBriefing> {
  const openai = getOpenAIClient();
  const today = new Date().toISOString().split('T')[0];

  // Fetch merchant knowledge for context
  const knowledge = await fetchMerchantKnowledge(merchantId, locationId, {
    includeMenu: true,
    includeAnalytics: true,
    includeEvents: true,
    includeFeedback: true,
    analyticsPeriodDays: 7, // Last week for briefing
  });

  const knowledgeContext = formatKnowledgeForAI(knowledge);

  // Get merchant info
  const { data: merchant } = await supabase
    .from('merchants')
    .select('name, business_type, timezone')
    .eq('id', merchantId)
    .single();

  const prompt = `You are an AI business analyst for ${merchant?.name || 'a restaurant'}.
Based on the following business data, generate a daily briefing.

${knowledgeContext}

Generate a JSON response with:
1. "summary": A 2-3 sentence executive summary of how the business is doing
2. "highlights": Array of 3-5 key metrics/events (type: positive/neutral/negative, title, description, metric if applicable, change percentage if applicable)
3. "alerts": Array of any urgent items needing attention (type: warning/info/success/urgent, category, title, message, suggestedAction if actionable)
4. "suggestions": Array of 2-3 actionable recommendations (type: menu/pricing/marketing/operations/events, title, description, expectedImpact, effort: low/medium/high)

Focus on actionable insights. Be specific with numbers when available.
Respond ONLY with valid JSON, no markdown or explanation.`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a business analytics AI. Always respond with valid JSON only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.5,
      max_tokens: 1500,
    });

    const responseText = completion.choices[0]?.message?.content || '{}';

    // Parse the AI response
    let parsed;
    try {
      // Remove any potential markdown code blocks
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      // Fallback if parsing fails
      parsed = {
        summary: 'Unable to generate briefing at this time.',
        highlights: [],
        alerts: [],
        suggestions: [],
      };
    }

    const briefing: DailyBriefing = {
      id: crypto.randomUUID(),
      merchantId,
      date: today,
      summary: parsed.summary || '',
      highlights: (parsed.highlights || []).map((h: any) => ({
        type: h.type || 'neutral',
        title: h.title || '',
        description: h.description || '',
        metric: h.metric,
        change: h.change,
      })),
      alerts: (parsed.alerts || []).map((a: any, index: number) => ({
        id: crypto.randomUUID(),
        type: a.type || 'info',
        category: a.category || 'operations',
        title: a.title || '',
        message: a.message || '',
        actionable: !!a.suggestedAction,
        suggestedAction: a.suggestedAction,
        priority: a.priority || index + 1,
        createdAt: new Date().toISOString(),
      })),
      suggestions: (parsed.suggestions || []).map((s: any, index: number) => ({
        id: crypto.randomUUID(),
        type: s.type || 'operations',
        title: s.title || '',
        description: s.description || '',
        expectedImpact: s.expectedImpact,
        effort: s.effort || 'medium',
        priority: s.priority || index + 1,
      })),
      generatedAt: new Date().toISOString(),
    };

    // Save briefing to database
    await saveBriefing(briefing);

    return briefing;
  } catch (error) {
    console.error('Failed to generate daily briefing:', error);
    throw error;
  }
}

// Save briefing to database
async function saveBriefing(briefing: DailyBriefing): Promise<void> {
  await supabase.from('ai_daily_briefings').insert({
    id: briefing.id,
    merchant_id: briefing.merchantId,
    date: briefing.date,
    summary: briefing.summary,
    highlights: briefing.highlights,
    alerts: briefing.alerts,
    suggestions: briefing.suggestions,
    generated_at: briefing.generatedAt,
  });
}

// Get latest briefing for a merchant (from cache or generate new)
export async function getLatestBriefing(
  merchantId: string,
  forceRefresh: boolean = false
): Promise<DailyBriefing | null> {
  const today = new Date().toISOString().split('T')[0];

  if (!forceRefresh) {
    // Check if we have today's briefing
    const { data: existing } = await supabase
      .from('ai_daily_briefings')
      .select('*')
      .eq('merchant_id', merchantId)
      .eq('date', today)
      .single();

    if (existing) {
      return {
        id: existing.id,
        merchantId: existing.merchant_id,
        date: existing.date,
        summary: existing.summary,
        highlights: existing.highlights || [],
        alerts: existing.alerts || [],
        suggestions: existing.suggestions || [],
        generatedAt: existing.generated_at,
      };
    }
  }

  // Generate new briefing
  return generateDailyBriefing(merchantId);
}

// Check for alerts based on data patterns
export async function checkAlerts(merchantId: string, locationId?: string): Promise<Alert[]> {
  const alerts: Alert[] = [];

  // Check for upcoming events without preparation
  const { data: upcomingEvents } = await supabase
    .from('events')
    .select('*')
    .eq('merchant_id', merchantId)
    .gte('start_date', new Date().toISOString())
    .lte('start_date', new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString())
    .eq('status', 'published');

  if (upcomingEvents && upcomingEvents.length > 0) {
    for (const event of upcomingEvents) {
      const hoursUntil = Math.round(
        (new Date(event.start_date).getTime() - Date.now()) / (1000 * 60 * 60)
      );

      alerts.push({
        id: crypto.randomUUID(),
        type: hoursUntil < 12 ? 'urgent' : 'info',
        category: 'events',
        title: `Upcoming Event: ${event.title}`,
        message: `Event starts in ${hoursUntil} hours. Make sure everything is prepared.`,
        actionable: true,
        suggestedAction: 'Review event details and confirm staff availability',
        priority: hoursUntil < 12 ? 1 : 2,
        createdAt: new Date().toISOString(),
      });
    }
  }

  // Check for negative feedback patterns
  const { data: recentFeedback } = await supabase
    .from('feedback')
    .select('rating, comment, created_at')
    .eq('merchant_id', merchantId)
    .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .order('created_at', { ascending: false });

  if (recentFeedback && recentFeedback.length >= 3) {
    const avgRating =
      recentFeedback.reduce((sum, f) => sum + (f.rating || 0), 0) / recentFeedback.length;

    if (avgRating < 3.5) {
      alerts.push({
        id: crypto.randomUUID(),
        type: 'warning',
        category: 'feedback',
        title: 'Customer Satisfaction Alert',
        message: `Average rating this week is ${avgRating.toFixed(1)}/5. Consider reviewing recent feedback.`,
        actionable: true,
        suggestedAction: 'Review feedback comments and identify improvement areas',
        priority: 2,
        createdAt: new Date().toISOString(),
      });
    }
  }

  // Check for menu items with low availability
  const { data: menuItems } = await supabase
    .from('menu_items')
    .select('id, name, is_available')
    .eq('merchant_id', merchantId)
    .eq('is_available', false);

  if (menuItems && menuItems.length > 3) {
    alerts.push({
      id: crypto.randomUUID(),
      type: 'info',
      category: 'inventory',
      title: 'Multiple Items Unavailable',
      message: `${menuItems.length} menu items are currently marked as unavailable.`,
      actionable: true,
      suggestedAction: 'Review inventory and update item availability',
      priority: 3,
      createdAt: new Date().toISOString(),
    });
  }

  // ============================================
  // QR CODE ALERTS
  // ============================================

  // Check for underperforming QR codes (less than 5 scans in last 7 days)
  const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const { data: underperformingQRs } = await supabase
    .from('qr_codes')
    .select('id, title, total_scans, last_scanned_at, context, table_number')
    .eq('merchant_id', merchantId)
    .eq('is_active', true)
    .lt('total_scans', 5)
    .or(`last_scanned_at.is.null,last_scanned_at.lt.${oneWeekAgo}`);

  if (underperformingQRs && underperformingQRs.length > 0) {
    // Group by type for smarter alerts
    const tableQRs = underperformingQRs.filter((qr) => qr.context === 'table');
    const marketingQRs = underperformingQRs.filter((qr) => qr.context === 'external');

    if (tableQRs.length > 0) {
      const tableNames = tableQRs
        .slice(0, 3)
        .map((qr) => (qr.table_number ? `Table ${qr.table_number}` : qr.title))
        .join(', ');
      const moreCount = tableQRs.length > 3 ? ` and ${tableQRs.length - 3} more` : '';

      alerts.push({
        id: crypto.randomUUID(),
        type: 'warning',
        category: 'qr',
        title: 'Low Scan Activity on Table QRs',
        message: `${tableNames}${moreCount} QR codes have less than 5 scans. Check their placement and visibility.`,
        actionable: true,
        suggestedAction: 'Ensure QR codes are visible, well-lit, and include a call-to-action',
        priority: 3,
        createdAt: new Date().toISOString(),
      });
    }

    if (marketingQRs.length > 0) {
      const sources = marketingQRs
        .slice(0, 3)
        .map((qr) => qr.title || 'Marketing QR')
        .join(', ');

      alerts.push({
        id: crypto.randomUUID(),
        type: 'info',
        category: 'qr',
        title: 'Marketing QR Codes Need Attention',
        message: `${sources} QR codes are not getting scans. Consider repositioning or promoting them.`,
        actionable: true,
        suggestedAction: 'Review marketing material placement or create new promotional materials',
        priority: 4,
        createdAt: new Date().toISOString(),
      });
    }
  }

  // Check for high-performing QR codes (success alert)
  try {
    const qrStats = await getMerchantQRStats(merchantId);
    const { bySource } = await getMerchantSourcePerformance(merchantId);

    // Convert bySource record to array for analysis
    const sourceArray = Object.entries(bySource).map(([source, data]) => ({
      source,
      totalScans: data.totalScans,
      qrCount: data.qrCount,
    }));

    if (sourceArray.length >= 2) {
      // Compare top source with others
      const sorted = sourceArray.sort((a, b) => b.totalScans - a.totalScans);
      const topSource = sorted[0];
      const avgOthers =
        sorted.slice(1).reduce((sum, s) => sum + s.totalScans, 0) / (sorted.length - 1);

      // If top source has 50%+ more scans than average of others
      if (topSource.totalScans > avgOthers * 1.5 && topSource.totalScans > 10) {
        alerts.push({
          id: crypto.randomUUID(),
          type: 'success',
          category: 'qr',
          title: 'Top Performing Traffic Source',
          message: `${topSource.source.replace('_', ' ')} is bringing ${topSource.totalScans} visitors, outperforming other channels by ${Math.round((topSource.totalScans / avgOthers - 1) * 100)}%.`,
          actionable: true,
          suggestedAction:
            'Consider investing more in this channel or creating a dedicated promotion',
          priority: 4,
          createdAt: new Date().toISOString(),
        });
      }

      // Check if one source significantly underperforms
      const lowestSource = sorted[sorted.length - 1];
      if (lowestSource.totalScans < avgOthers * 0.3 && avgOthers > 5 && lowestSource.qrCount > 0) {
        alerts.push({
          id: crypto.randomUUID(),
          type: 'info',
          category: 'qr',
          title: 'Traffic Source Comparison',
          message: `${lowestSource.source.replace('_', ' ')} is bringing ${lowestSource.totalScans} visitors while ${topSource.source.replace('_', ' ')} brings ${topSource.totalScans}.`,
          actionable: true,
          suggestedAction: 'Consider repositioning or promoting the underperforming QR code',
          priority: 4,
          createdAt: new Date().toISOString(),
        });
      }
    }

    // Alert if no QR codes created yet
    if (qrStats.totalQRCodes === 0) {
      alerts.push({
        id: crypto.randomUUID(),
        type: 'info',
        category: 'qr',
        title: 'Get Started with QR Codes',
        message:
          "You haven't created any QR codes yet. QR codes help customers access your menu and track traffic sources.",
        actionable: true,
        suggestedAction: 'Create QR codes for your tables and marketing channels',
        priority: 5,
        createdAt: new Date().toISOString(),
      });
    }
  } catch (qrError) {
    // QR stats not critical, continue without failing
    console.error('Failed to fetch QR stats for alerts:', qrError);
  }

  // Save alerts to database
  if (alerts.length > 0) {
    await supabase.from('ai_alerts').insert(
      alerts.map((a) => ({
        id: a.id,
        merchant_id: merchantId,
        location_id: locationId,
        type: a.type,
        category: a.category,
        title: a.title,
        message: a.message,
        actionable: a.actionable,
        suggested_action: a.suggestedAction,
        priority: a.priority,
        created_at: a.createdAt,
      }))
    );
  }

  return alerts;
}

// Get active (non-dismissed) alerts
export async function getActiveAlerts(merchantId: string, limit: number = 10): Promise<Alert[]> {
  const { data } = await supabase
    .from('ai_alerts')
    .select('*')
    .eq('merchant_id', merchantId)
    .is('dismissed_at', null)
    .order('priority', { ascending: true })
    .order('created_at', { ascending: false })
    .limit(limit);

  return (data || []).map((a) => ({
    id: a.id,
    type: a.type,
    category: a.category,
    title: a.title,
    message: a.message,
    actionable: a.actionable,
    suggestedAction: a.suggested_action,
    priority: a.priority,
    createdAt: a.created_at,
    dismissedAt: a.dismissed_at,
  }));
}

// Dismiss an alert
export async function dismissAlert(alertId: string): Promise<void> {
  await supabase
    .from('ai_alerts')
    .update({ dismissed_at: new Date().toISOString() })
    .eq('id', alertId);
}

// Generate smart suggestions based on patterns
export async function generateSuggestions(
  merchantId: string,
  locationId?: string
): Promise<Suggestion[]> {
  const openai = getOpenAIClient();

  // Fetch knowledge
  const knowledge = await fetchMerchantKnowledge(merchantId, locationId, {
    includeMenu: true,
    includeAnalytics: true,
    includeFeedback: true,
    analyticsPeriodDays: 30,
  });

  const knowledgeContext = formatKnowledgeForAI(knowledge);

  const prompt = `Based on the following business data, generate 3-5 actionable suggestions to improve the business.

${knowledgeContext}

For each suggestion, provide:
- type: menu/pricing/marketing/operations/events
- title: Short title
- description: What to do and why
- expectedImpact: What improvement to expect
- effort: low/medium/high

Focus on quick wins (low effort, high impact) first.
Respond with a JSON array of suggestions.`;

  try {
    const completion = await openai.chat.completions.create({
      model: DEFAULT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a business consultant AI. Respond with valid JSON array only.',
        },
        { role: 'user', content: prompt },
      ],
      temperature: 0.6,
      max_tokens: 1000,
    });

    const responseText = completion.choices[0]?.message?.content || '[]';

    let parsed;
    try {
      const cleanJson = responseText
        .replace(/```json?\n?/g, '')
        .replace(/```\n?/g, '')
        .trim();
      parsed = JSON.parse(cleanJson);
    } catch {
      parsed = [];
    }

    return (Array.isArray(parsed) ? parsed : []).map((s: any, index: number) => ({
      id: crypto.randomUUID(),
      type: s.type || 'operations',
      title: s.title || '',
      description: s.description || '',
      expectedImpact: s.expectedImpact,
      effort: s.effort || 'medium',
      priority: index + 1,
    }));
  } catch (error) {
    console.error('Failed to generate suggestions:', error);
    return [];
  }
}

// Get notification preferences for a merchant
export async function getNotificationPreferences(merchantId: string): Promise<{
  dailyBriefingEnabled: boolean;
  briefingTime: string;
  alertTypes: string[];
  emailNotifications: boolean;
  pushNotifications: boolean;
}> {
  const { data } = await supabase
    .from('ai_preferences')
    .select(
      'daily_briefing_enabled, briefing_time, alert_types, email_notifications, push_notifications'
    )
    .eq('merchant_id', merchantId)
    .single();

  return {
    dailyBriefingEnabled: data?.daily_briefing_enabled ?? true,
    briefingTime: data?.briefing_time || '08:00',
    alertTypes: data?.alert_types || ['urgent', 'warning'],
    emailNotifications: data?.email_notifications ?? false,
    pushNotifications: data?.push_notifications ?? false,
  };
}

// Update notification preferences
export async function updateNotificationPreferences(
  merchantId: string,
  preferences: Partial<{
    dailyBriefingEnabled: boolean;
    briefingTime: string;
    alertTypes: string[];
    emailNotifications: boolean;
    pushNotifications: boolean;
  }>
): Promise<void> {
  await supabase
    .from('ai_preferences')
    .update({
      daily_briefing_enabled: preferences.dailyBriefingEnabled,
      briefing_time: preferences.briefingTime,
      alert_types: preferences.alertTypes,
      email_notifications: preferences.emailNotifications,
      push_notifications: preferences.pushNotifications,
      updated_at: new Date().toISOString(),
    })
    .eq('merchant_id', merchantId);
}
