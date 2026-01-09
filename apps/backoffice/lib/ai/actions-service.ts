// AI Actions Service
// Enables AI to perform actions (Phase 3)
// Uses OpenAI Function Calling

import { supabase } from '@/lib/supabase';
import {
  createQRCode,
  bulkCreateQRCodes,
  getQRAnalytics,
  getMerchantSourcePerformance,
  getMerchantQRStats,
} from '@/lib/qr/qr-service';
import {
  QRContext,
  QRSource,
  MaterialPreset,
  ExportFormat,
  CreateQRCodeInput,
} from '@/lib/qr/qr-types';
import { exportQRCode, buildQRContent } from '@/lib/qr/qr-generator';

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
  // QR Code Actions
  {
    type: 'function' as const,
    function: {
      name: 'create_qr_code',
      description:
        'Create a QR code for the merchant (table ordering, WiFi access, marketing campaigns, etc.)',
      parameters: {
        type: 'object',
        properties: {
          type: {
            type: 'string',
            enum: ['url', 'wifi'],
            description: 'Type of QR code: url for links, wifi for network access',
          },
          context: {
            type: 'string',
            enum: ['table', 'external', 'takeaway', 'delivery'],
            description: 'Context for URL QR codes',
          },
          source: {
            type: 'string',
            enum: [
              'google_maps',
              'instagram',
              'facebook',
              'flyer',
              'event',
              'newspaper',
              'poster',
              'business_card',
              'partnership',
              'other',
            ],
            description: 'Traffic source for external/marketing QR codes',
          },
          table_number: {
            type: 'number',
            description: 'Table number (only for table context)',
          },
          title: {
            type: 'string',
            description: 'Title/name for the QR code',
          },
          wifi_ssid: {
            type: 'string',
            description: 'WiFi network name (only for wifi type)',
          },
          wifi_password: {
            type: 'string',
            description: 'WiFi password (only for wifi type)',
          },
          wifi_security: {
            type: 'string',
            enum: ['WPA', 'WEP', 'nopass'],
            description: 'WiFi security type (only for wifi type)',
          },
        },
        required: ['type'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'create_qr_batch',
      description:
        'Create multiple QR codes at once, typically for tables or multiple marketing channels',
      parameters: {
        type: 'object',
        properties: {
          context: {
            type: 'string',
            enum: ['table', 'external'],
            description: 'Context for the QR codes',
          },
          count: {
            type: 'number',
            description: 'Number of QR codes to create (for tables: creates table 1 to N)',
          },
          start_number: {
            type: 'number',
            description: 'Starting table number (default: 1)',
          },
          sources: {
            type: 'array',
            items: { type: 'string' },
            description: 'Array of sources for external QR codes (creates one per source)',
          },
        },
        required: ['context'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'suggest_qr_format',
      description:
        'Suggest the best export format and settings for a QR code based on where it will be used',
      parameters: {
        type: 'object',
        properties: {
          use_case: {
            type: 'string',
            description:
              'Where the QR code will be used (e.g., "tent cards", "t-shirts", "newspaper ad", "instagram")',
          },
        },
        required: ['use_case'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'analyze_qr_performance',
      description:
        'Analyze QR code performance, compare traffic sources, or identify underperforming QR codes',
      parameters: {
        type: 'object',
        properties: {
          analysis_type: {
            type: 'string',
            enum: ['overview', 'source_comparison', 'underperforming', 'trending'],
            description: 'Type of analysis to perform',
          },
          qr_id: {
            type: 'string',
            description: 'Specific QR code ID to analyze (optional)',
          },
          period: {
            type: 'string',
            enum: ['today', 'this_week', 'last_week', 'this_month', 'last_month'],
            description: 'Time period for analysis',
          },
        },
        required: ['analysis_type'],
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

// ============================================
// QR CODE ACTIONS
// ============================================

// Execute create_qr_code action
async function executeCreateQRCode(
  merchantId: string,
  params: {
    type: 'url' | 'wifi';
    context?: QRContext;
    source?: QRSource;
    table_number?: number;
    title?: string;
    wifi_ssid?: string;
    wifi_password?: string;
    wifi_security?: 'WPA' | 'WEP' | 'nopass';
  }
): Promise<ActionResult> {
  try {
    // Build the input for QR creation
    const input: CreateQRCodeInput = {
      type: params.type,
    };

    if (params.type === 'wifi') {
      // WiFi QR code
      if (!params.wifi_ssid) {
        return {
          success: false,
          action: 'create_qr_code',
          message: 'WiFi SSID is required for WiFi QR codes.',
        };
      }
      input.wifi_ssid = params.wifi_ssid;
      input.wifi_password = params.wifi_password;
      input.wifi_security = params.wifi_security || 'WPA';
      input.title = params.title || `WiFi: ${params.wifi_ssid}`;
    } else {
      // URL QR code
      input.context = params.context || 'external';
      input.source = params.source;
      input.table_number = params.table_number;
      input.use_short_url = true;

      // Set destination URL based on context
      const merchantSlug = 'demo'; // TODO: Get actual merchant slug
      if (params.context === 'table' && params.table_number) {
        input.destination_url = `https://menu.gudbro.com/${merchantSlug}/menu?table=${params.table_number}`;
        input.title = params.title || `Table ${params.table_number}`;
      } else {
        input.destination_url = `https://menu.gudbro.com/${merchantSlug}`;
        input.title = params.title || `Marketing: ${params.source || 'General'}`;
      }
    }

    const qrCode = await createQRCode(merchantId, input);

    return {
      success: true,
      action: 'create_qr_code',
      message: `QR code "${qrCode.title}" created successfully! ${
        qrCode.short_code ? `Short URL: go.gudbro.com/${qrCode.short_code}` : ''
      }`,
      data: qrCode,
    };
  } catch (error) {
    return {
      success: false,
      action: 'create_qr_code',
      message: `Failed to create QR code: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// Execute create_qr_batch action
async function executeCreateQRBatch(
  merchantId: string,
  params: {
    context: 'table' | 'external';
    count?: number;
    start_number?: number;
    sources?: string[];
  }
): Promise<ActionResult> {
  try {
    const merchantSlug = 'demo'; // TODO: Get actual merchant slug
    const baseUrl = `https://menu.gudbro.com/${merchantSlug}`;

    if (params.context === 'table') {
      // Create table QR codes using BulkCreateQRInput
      const count = params.count || 10;
      const startNum = params.start_number || 1;

      const input = {
        type: 'tables' as const,
        table_count: count,
        table_start: startNum,
        destination_base_url: `${baseUrl}/menu`,
        use_short_url: true,
      };

      const qrCodes = await bulkCreateQRCodes(merchantId, input);

      return {
        success: true,
        action: 'create_qr_batch',
        message: `Created ${qrCodes.length} table QR codes (Tables ${startNum} to ${startNum + count - 1})! You can download them from the QR Codes page.`,
        data: { count: qrCodes.length, qrCodes },
      };
    } else if (params.context === 'external' && params.sources) {
      // Create marketing QR codes for each source
      const items = params.sources.map((source) => ({
        title: `Marketing: ${source.replace('_', ' ')}`,
        source: source as QRSource,
        context: 'external' as QRContext,
      }));

      const input = {
        type: 'custom' as const,
        items,
        destination_base_url: baseUrl,
        use_short_url: true,
      };

      const qrCodes = await bulkCreateQRCodes(merchantId, input);

      return {
        success: true,
        action: 'create_qr_batch',
        message: `Created ${qrCodes.length} marketing QR codes for: ${params.sources.join(', ')}! You can download them from the QR Codes page.`,
        data: { count: qrCodes.length, qrCodes },
      };
    } else {
      return {
        success: false,
        action: 'create_qr_batch',
        message:
          'Invalid parameters. For tables, provide count. For external, provide sources array.',
      };
    }
  } catch (error) {
    return {
      success: false,
      action: 'create_qr_batch',
      message: `Failed to create QR codes: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

// Execute suggest_qr_format action
async function executeSuggestQRFormat(params: { use_case: string }): Promise<ActionResult> {
  // Map use cases to recommended formats
  const formatSuggestions: Record<
    string,
    { format: ExportFormat; preset: MaterialPreset; tips: string[] }
  > = {
    'tent card': {
      format: 'pdf',
      preset: 'tent-card',
      tips: [
        'Use PDF with bleed for professional printing',
        'Recommended size: 10x10 cm minimum',
        'Include quiet zone (white border) for reliable scanning',
      ],
    },
    'tent cards': {
      format: 'pdf',
      preset: 'tent-card',
      tips: [
        'Use PDF with bleed for professional printing',
        'Recommended size: 10x10 cm minimum',
        'Include quiet zone (white border) for reliable scanning',
      ],
    },
    tshirt: {
      format: 'svg',
      preset: 'tshirt',
      tips: [
        'SVG format allows infinite scaling without quality loss',
        'Use transparent background',
        'Ensure high contrast colors for scanning through fabric texture',
      ],
    },
    't-shirt': {
      format: 'svg',
      preset: 'tshirt',
      tips: [
        'SVG format allows infinite scaling without quality loss',
        'Use transparent background',
        'Ensure high contrast colors for scanning through fabric texture',
      ],
    },
    sticker: {
      format: 'svg',
      preset: 'sticker',
      tips: [
        'SVG includes cut lines for die-cutting',
        'Minimum 5x5 cm for reliable scanning',
        'Consider rounded corners for better adhesion',
      ],
    },
    newspaper: {
      format: 'pdf',
      preset: 'newspaper',
      tips: [
        'Use grayscale for newsprint',
        '150 DPI is sufficient for newspaper printing',
        'Minimum 4x4 cm size due to paper quality',
      ],
    },
    banner: {
      format: 'svg',
      preset: 'banner',
      tips: [
        'Vector SVG scales to any size',
        'Minimum 15x15 cm for large format',
        'High contrast essential for outdoor visibility',
      ],
    },
    poster: {
      format: 'svg',
      preset: 'banner',
      tips: [
        'SVG scales perfectly for large prints',
        'Consider viewing distance when sizing',
        '300 DPI PNG-HD also works for smaller posters',
      ],
    },
    'business card': {
      format: 'png-hd',
      preset: 'business-card',
      tips: [
        'PNG-HD at 2048px provides crisp printing',
        'Keep QR at least 2x2 cm',
        'Test scanning before bulk printing',
      ],
    },
    menu: {
      format: 'pdf',
      preset: 'menu',
      tips: [
        'PDF with high quality for laminated menus',
        '5x5 cm recommended size',
        'High contrast for various lighting conditions',
      ],
    },
    instagram: {
      format: 'png',
      preset: 'paper',
      tips: [
        'Standard PNG at 512px for social media',
        'Add brand colors to make it recognizable',
        'Include call-to-action text around the QR',
      ],
    },
    flyer: {
      format: 'pdf',
      preset: 'paper',
      tips: [
        'PDF at 300 DPI for professional printing',
        '3x3 cm minimum size',
        'CMYK color mode for offset printing',
      ],
    },
  };

  // Find best match
  const useCase = params.use_case.toLowerCase();
  let suggestion = formatSuggestions[useCase];

  // Fuzzy match if exact match not found
  if (!suggestion) {
    for (const [key, value] of Object.entries(formatSuggestions)) {
      if (useCase.includes(key) || key.includes(useCase)) {
        suggestion = value;
        break;
      }
    }
  }

  // Default suggestion
  if (!suggestion) {
    suggestion = {
      format: 'png-hd',
      preset: 'paper',
      tips: [
        'PNG-HD (2048px) works for most print applications',
        'Ensure minimum 2x2 cm size for scanning',
        'Test before mass production',
      ],
    };
  }

  return {
    success: true,
    action: 'suggest_qr_format',
    message: `For ${params.use_case}, I recommend:\n\n**Format:** ${suggestion.format.toUpperCase()}\n**Preset:** ${suggestion.preset}\n\n**Tips:**\n${suggestion.tips.map((t) => `- ${t}`).join('\n')}`,
    data: suggestion,
  };
}

// Execute analyze_qr_performance action
async function executeAnalyzeQRPerformance(
  merchantId: string,
  params: {
    analysis_type: 'overview' | 'source_comparison' | 'underperforming' | 'trending';
    qr_id?: string;
    period?: string;
  }
): Promise<ActionResult> {
  try {
    // Calculate date range
    const now = new Date();
    let startDate: Date;

    switch (params.period) {
      case 'today':
        startDate = new Date(now);
        startDate.setHours(0, 0, 0, 0);
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
        break;
      case 'this_month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'last_month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        break;
      default:
        // Default to last 7 days
        startDate = new Date(now);
        startDate.setDate(startDate.getDate() - 7);
    }

    let analysisResult: any = {};
    let message = '';

    switch (params.analysis_type) {
      case 'overview': {
        const stats = await getMerchantQRStats(merchantId);
        analysisResult = stats;
        message =
          `**QR Code Overview**\n\n` +
          `- Total QR Codes: ${stats.total_qr_codes}\n` +
          `- Active: ${stats.active_qr_codes}\n` +
          `- Total Scans: ${stats.total_scans.toLocaleString()}\n` +
          `- Scans Today: ${stats.scans_today}`;
        break;
      }

      case 'source_comparison': {
        const sourcePerformance = await getMerchantSourcePerformance(merchantId);
        analysisResult = sourcePerformance;

        if (sourcePerformance.length === 0) {
          message =
            'No traffic source data available yet. Create some marketing QR codes to start tracking!';
        } else {
          const sorted = [...sourcePerformance].sort((a, b) => b.total_scans - a.total_scans);
          message =
            `**Traffic Source Comparison**\n\n` +
            sorted
              .map(
                (s, i) =>
                  `${i + 1}. **${s.source?.replace('_', ' ') || 'Unknown'}**: ${s.total_scans} scans (${s.qr_count} QR codes)`
              )
              .join('\n');

          if (sorted.length >= 2) {
            const top = sorted[0];
            const second = sorted[1];
            const diff = top.total_scans - second.total_scans;
            message += `\n\n${top.source?.replace('_', ' ')} is leading by ${diff} scans!`;
          }
        }
        break;
      }

      case 'underperforming': {
        // Get QR codes with low scan counts
        const { data: lowPerformers } = await supabase
          .from('qr_codes')
          .select('id, title, total_scans, last_scanned_at, context, source')
          .eq('merchant_id', merchantId)
          .eq('is_active', true)
          .lt('total_scans', 5)
          .order('total_scans', { ascending: true })
          .limit(10);

        analysisResult = lowPerformers || [];

        if (!lowPerformers || lowPerformers.length === 0) {
          message = 'All your QR codes are performing well! No underperformers detected.';
        } else {
          message =
            `**Underperforming QR Codes** (< 5 scans)\n\n` +
            lowPerformers
              .map(
                (qr) =>
                  `- **${qr.title || qr.id.slice(0, 8)}**: ${qr.total_scans} scans${
                    qr.last_scanned_at
                      ? ` (last: ${new Date(qr.last_scanned_at).toLocaleDateString()})`
                      : ' (never scanned)'
                  }`
              )
              .join('\n');
          message +=
            '\n\n**Suggestions:**\n- Check QR code placement and visibility\n- Ensure adequate lighting for scanning\n- Add call-to-action text near the QR code';
        }
        break;
      }

      case 'trending': {
        // Get QR codes with highest recent activity
        const { data: trending } = await supabase
          .from('qr_codes')
          .select('id, title, total_scans, context, source')
          .eq('merchant_id', merchantId)
          .eq('is_active', true)
          .order('total_scans', { ascending: false })
          .limit(5);

        analysisResult = trending || [];

        if (!trending || trending.length === 0) {
          message = 'No scan data yet. Start promoting your QR codes!';
        } else {
          message =
            `**Top Performing QR Codes**\n\n` +
            trending
              .map(
                (qr, i) =>
                  `${i + 1}. **${qr.title || qr.id.slice(0, 8)}**: ${qr.total_scans.toLocaleString()} scans (${qr.context || qr.source || 'general'})`
              )
              .join('\n');
        }
        break;
      }
    }

    return {
      success: true,
      action: 'analyze_qr_performance',
      message,
      data: analysisResult,
    };
  } catch (error) {
    return {
      success: false,
      action: 'analyze_qr_performance',
      message: `Failed to analyze QR performance: ${error instanceof Error ? error.message : 'Unknown error'}`,
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

    // QR Code Actions
    case 'create_qr_code':
      return executeCreateQRCode(merchantId, params);

    case 'create_qr_batch':
      return executeCreateQRBatch(merchantId, params);

    case 'suggest_qr_format':
      return executeSuggestQRFormat(params);

    case 'analyze_qr_performance':
      return executeAnalyzeQRPerformance(merchantId, params);

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
