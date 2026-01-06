// AI Actions Service
// Enables AI to perform actions (Phase 3)
// Uses OpenAI Function Calling

import { supabase } from '@/lib/supabase';

// Define available AI actions as OpenAI tools
export const AI_TOOLS = [
  {
    type: 'function' as const,
    function: {
      name: 'create_event',
      description:
        'Create a new event for the merchant (sports match, live music, special night, etc.)',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'Event title (e.g., "Liverpool vs Roma - Champions League")',
          },
          description: {
            type: 'string',
            description: 'Event description',
          },
          start_date: {
            type: 'string',
            description: 'Event start date and time in ISO format (e.g., "2026-01-10T20:00:00")',
          },
          end_date: {
            type: 'string',
            description: 'Event end date and time in ISO format (optional)',
          },
          event_type: {
            type: 'string',
            enum: ['sports', 'live_music', 'dj', 'special', 'holiday', 'promotion', 'other'],
            description: 'Type of event',
          },
          sports_info: {
            type: 'object',
            description: 'Sports-specific info (only for sports events)',
            properties: {
              sport: { type: 'string' },
              home_team: { type: 'string' },
              away_team: { type: 'string' },
              competition: { type: 'string' },
            },
          },
        },
        required: ['title', 'start_date', 'event_type'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'translate_content',
      description: 'Translate text content to specified languages',
      parameters: {
        type: 'object',
        properties: {
          text: {
            type: 'string',
            description: 'The text to translate',
          },
          source_language: {
            type: 'string',
            description: 'Source language code (e.g., "en", "it")',
          },
          target_languages: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of target language codes (e.g., ["it", "vi", "ko"])',
          },
          context: {
            type: 'string',
            description:
              'Context for better translation (e.g., "restaurant menu item", "event description")',
          },
        },
        required: ['text', 'target_languages'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'generate_description',
      description: 'Generate a marketing description for a menu item or event',
      parameters: {
        type: 'object',
        properties: {
          item_name: {
            type: 'string',
            description: 'Name of the item to describe',
          },
          item_type: {
            type: 'string',
            enum: ['menu_item', 'event', 'promotion'],
            description: 'Type of item',
          },
          style: {
            type: 'string',
            enum: ['elegant', 'casual', 'fun', 'professional', 'appetizing'],
            description: 'Writing style',
          },
          language: {
            type: 'string',
            description: 'Language for the description (e.g., "en", "it")',
          },
          additional_info: {
            type: 'string',
            description: 'Additional info about the item (ingredients, occasion, etc.)',
          },
        },
        required: ['item_name', 'item_type'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'update_menu_item',
      description:
        'Update a menu item (price, description, availability). Requires user confirmation.',
      parameters: {
        type: 'object',
        properties: {
          item_id: {
            type: 'string',
            description: 'ID of the menu item to update',
          },
          item_name: {
            type: 'string',
            description: 'Name of the item (for confirmation)',
          },
          updates: {
            type: 'object',
            description: 'Fields to update',
            properties: {
              price: { type: 'number', description: 'New price' },
              description: { type: 'string', description: 'New description' },
              is_available: { type: 'boolean', description: 'Availability status' },
              is_featured: { type: 'boolean', description: 'Featured status' },
            },
          },
        },
        required: ['item_id', 'item_name', 'updates'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'get_analytics_insight',
      description: 'Get specific analytics insight or comparison',
      parameters: {
        type: 'object',
        properties: {
          metric: {
            type: 'string',
            enum: ['sales', 'views', 'orders', 'popular_items', 'peak_hours', 'trends'],
            description: 'Type of metric to analyze',
          },
          period: {
            type: 'string',
            enum: ['today', 'yesterday', 'this_week', 'last_week', 'this_month', 'last_month'],
            description: 'Time period for analysis',
          },
          compare_to: {
            type: 'string',
            enum: ['previous_period', 'same_period_last_year'],
            description: 'Comparison period (optional)',
          },
        },
        required: ['metric', 'period'],
      },
    },
  },
];

// Action execution results
export interface ActionResult {
  success: boolean;
  action: string;
  message: string;
  data?: any;
  requiresConfirmation?: boolean;
  confirmationMessage?: string;
}

// Execute create_event action
async function executeCreateEvent(
  merchantId: string,
  locationId: string | undefined,
  params: {
    title: string;
    description?: string;
    start_date: string; // ISO datetime string
    end_date?: string;
    event_type: string;
    event_category?: string;
    sports_info?: any;
  }
): Promise<ActionResult> {
  try {
    // Need locationId to create event
    if (!locationId) {
      // Try to find a location for this merchant
      const { data: location } = await supabase.from('locations').select('id').limit(1).single();

      if (!location) {
        return {
          success: false,
          action: 'create_event',
          message: 'Cannot create event: No location found. Please complete business setup first.',
        };
      }
      locationId = location.id;
    }

    // Parse datetime - handle both ISO and date-only formats
    const startDateTime = new Date(params.start_date);
    const startDate = startDateTime.toISOString().split('T')[0];
    const startTime = startDateTime.toTimeString().slice(0, 5) || '18:00';

    // End time defaults to 2 hours after start
    const endDateTime = params.end_date
      ? new Date(params.end_date)
      : new Date(startDateTime.getTime() + 2 * 60 * 60 * 1000);
    const endDate = endDateTime.toISOString().split('T')[0];
    const endTime = endDateTime.toTimeString().slice(0, 5) || '20:00';

    // Map event_type to event_category if not provided
    const categoryMap: Record<string, string> = {
      live_music: 'entertainment',
      dj_set: 'entertainment',
      karaoke: 'entertainment',
      comedy_night: 'entertainment',
      open_mic: 'entertainment',
      trivia_night: 'entertainment',
      game_night: 'entertainment',
      theme_night: 'entertainment',
      tasting: 'food',
      pairing: 'food',
      chefs_table: 'food',
      cooking_class: 'food',
      menu_launch: 'food',
      food_tour: 'food',
      brunch: 'food',
      lunch_special: 'food',
      happy_hour: 'promo',
      late_night: 'promo',
      special_menu: 'promo',
      sports_viewing: 'sports',
      networking: 'community',
      charity: 'community',
      book_club: 'community',
      wine_club: 'community',
      private_party: 'private',
      corporate: 'private',
      birthday: 'private',
      anniversary: 'private',
      holiday: 'special',
      closure: 'special',
      other: 'special',
      singles_night: 'community',
    };

    const eventCategory = params.event_category || categoryMap[params.event_type] || 'special';

    const eventData: any = {
      location_id: locationId,
      title: params.title,
      description: params.description || '',
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime,
      event_type: params.event_type,
      event_category: eventCategory,
      status: 'draft',
    };

    if (params.sports_info) {
      eventData.sports_info = params.sports_info;
    }

    const { data, error } = await supabase.from('events').insert(eventData).select().single();

    if (error) throw error;

    return {
      success: true,
      action: 'create_event',
      message: `Event "${params.title}" created successfully as draft for ${startDate} at ${startTime}. You can review and publish it in the Events section.`,
      data: data,
    };
  } catch (error) {
    return {
      success: false,
      action: 'create_event',
      message: `Failed to create event: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// Execute translate_content action
async function executeTranslateContent(params: {
  text: string;
  source_language?: string;
  target_languages: string[];
  context?: string;
}): Promise<ActionResult> {
  // Note: This would typically call a translation API
  // For now, we return a placeholder that the AI will fill in
  return {
    success: true,
    action: 'translate_content',
    message: `Translation requested for ${params.target_languages.length} languages. The AI will provide the translations in the response.`,
    data: {
      original: params.text,
      source_language: params.source_language || 'auto',
      target_languages: params.target_languages,
      context: params.context,
      // AI will fill in translations in the chat response
    },
  };
}

// Execute generate_description action
async function executeGenerateDescription(params: {
  item_name: string;
  item_type: string;
  style?: string;
  language?: string;
  additional_info?: string;
}): Promise<ActionResult> {
  // The AI will generate the description in its response
  return {
    success: true,
    action: 'generate_description',
    message: `Generating ${params.style || 'professional'} description for "${params.item_name}"...`,
    data: {
      item_name: params.item_name,
      item_type: params.item_type,
      style: params.style || 'professional',
      language: params.language || 'en',
      additional_info: params.additional_info,
    },
  };
}

// Execute update_menu_item action (requires confirmation)
async function executeUpdateMenuItem(
  merchantId: string,
  params: {
    item_id: string;
    item_name: string;
    updates: {
      price?: number;
      description?: string;
      is_available?: boolean;
      is_featured?: boolean;
    };
  },
  confirmed: boolean = false
): Promise<ActionResult> {
  if (!confirmed) {
    // Return confirmation request
    const updatesList = Object.entries(params.updates)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    return {
      success: true,
      action: 'update_menu_item',
      message: `I'd like to update "${params.item_name}" with: ${updatesList}`,
      requiresConfirmation: true,
      confirmationMessage: `Do you want me to update "${params.item_name}" with these changes: ${updatesList}?`,
      data: params,
    };
  }

  try {
    const { error } = await supabase
      .from('menu_items')
      .update({
        ...params.updates,
        updated_at: new Date().toISOString(),
        updated_by_ai: true,
      })
      .eq('id', params.item_id)
      .eq('merchant_id', merchantId);

    if (error) throw error;

    return {
      success: true,
      action: 'update_menu_item',
      message: `Successfully updated "${params.item_name}".`,
      data: params,
    };
  } catch (error) {
    return {
      success: false,
      action: 'update_menu_item',
      message: `Failed to update menu item: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// Execute get_analytics_insight action
async function executeGetAnalyticsInsight(
  merchantId: string,
  locationId: string | undefined,
  params: {
    metric: string;
    period: string;
    compare_to?: string;
  }
): Promise<ActionResult> {
  try {
    // Calculate date range based on period
    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;

    switch (params.period) {
      case 'today':
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case 'yesterday':
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 1);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'this_week':
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - startDate.getDay());
        startDate.setHours(0, 0, 0, 0);
        break;
      case 'last_week':
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - startDate.getDay() - 7);
        startDate.setHours(0, 0, 0, 0);
        endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 6);
        endDate.setHours(23, 59, 59, 999);
        break;
      case 'this_month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'last_month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      default:
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
    }

    // Fetch relevant data based on metric
    const { data: aggregates } = await supabase
      .from('analytics_daily_aggregates')
      .select('*')
      .eq('location_id', locationId || merchantId)
      .gte('date', startDate.toISOString().split('T')[0])
      .lte('date', endDate.toISOString().split('T')[0]);

    const analyticsData = {
      period: params.period,
      metric: params.metric,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      aggregates: aggregates || [],
    };

    return {
      success: true,
      action: 'get_analytics_insight',
      message: `Analytics data retrieved for ${params.metric} (${params.period}).`,
      data: analyticsData,
    };
  } catch (error) {
    return {
      success: false,
      action: 'get_analytics_insight',
      message: `Failed to get analytics: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// Main function to execute an action
export async function executeAction(
  merchantId: string,
  locationId: string | undefined,
  actionName: string,
  params: any,
  confirmed: boolean = false
): Promise<ActionResult> {
  switch (actionName) {
    case 'create_event':
      return executeCreateEvent(merchantId, locationId, params);

    case 'translate_content':
      return executeTranslateContent(params);

    case 'generate_description':
      return executeGenerateDescription(params);

    case 'update_menu_item':
      return executeUpdateMenuItem(merchantId, params, confirmed);

    case 'get_analytics_insight':
      return executeGetAnalyticsInsight(merchantId, locationId, params);

    default:
      return {
        success: false,
        action: actionName,
        message: `Unknown action: ${actionName}`,
      };
  }
}

// Log action execution
export async function logActionExecution(
  merchantId: string,
  accountId: string,
  sessionId: string,
  action: string,
  params: any,
  result: ActionResult
): Promise<void> {
  try {
    await supabase.from('ai_usage_logs').insert({
      merchant_id: merchantId,
      account_id: accountId,
      session_id: sessionId,
      action_type: 'action',
      prompt_summary: `Action: ${action}`,
      response_summary: result.message,
      status: result.success ? 'success' : 'error',
      model: 'function_call',
    });
  } catch (error) {
    console.error('Failed to log action:', error);
  }
}
