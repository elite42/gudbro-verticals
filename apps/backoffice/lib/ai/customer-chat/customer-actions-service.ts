// Customer Actions Service
// Handles AI function calls for customer chat

import { supabaseAdmin } from '@/lib/supabase-admin';
import {
  getAvailableSlots,
  createReservation,
  TimeSlot,
} from '@/lib/reservations/reservations-service';
import type { ChatCompletionTool } from 'openai/resources/chat/completions';

export interface CustomerActionResult {
  success: boolean;
  action: string;
  message: string;
  data?: Record<string, unknown>;
  requiresHumanFollowup?: boolean;
}

interface CustomerActionContext {
  conversationId: string;
  accountId?: string;
  customerPhone?: string;
  customerEmail?: string;
  customerName?: string;
}

// OpenAI function definitions for customer chat
export const CUSTOMER_CHAT_TOOLS: ChatCompletionTool[] = [
  {
    type: 'function',
    function: {
      name: 'make_reservation',
      description: 'Make a table reservation for the customer',
      parameters: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            description: 'Reservation date in YYYY-MM-DD format',
          },
          time: {
            type: 'string',
            description: 'Reservation time in HH:MM format (24-hour)',
          },
          party_size: {
            type: 'number',
            description: 'Number of guests',
          },
          guest_name: {
            type: 'string',
            description: 'Name for the reservation',
          },
          guest_phone: {
            type: 'string',
            description: 'Contact phone number',
          },
          guest_email: {
            type: 'string',
            description: 'Contact email address (optional)',
          },
          special_requests: {
            type: 'string',
            description: 'Any special requests or notes',
          },
          occasion: {
            type: 'string',
            enum: ['birthday', 'anniversary', 'business', 'date', 'other'],
            description: 'Occasion for the reservation',
          },
        },
        required: ['date', 'time', 'party_size', 'guest_name'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'check_availability',
      description: 'Check available time slots for a reservation',
      parameters: {
        type: 'object',
        properties: {
          date: {
            type: 'string',
            description: 'Date to check in YYYY-MM-DD format',
          },
          party_size: {
            type: 'number',
            description: 'Number of guests',
          },
          preferred_time: {
            type: 'string',
            description: 'Preferred time in HH:MM format (optional)',
          },
        },
        required: ['date', 'party_size'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_menu_item',
      description:
        'Get details about a specific menu item including price, description, and allergens',
      parameters: {
        type: 'object',
        properties: {
          item_name: {
            type: 'string',
            description: 'Name or partial name of the menu item',
          },
        },
        required: ['item_name'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'search_menu',
      description: 'Search menu items by keyword, category, or dietary preference',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'Search keyword (dish name, ingredient, category)',
          },
          dietary_filter: {
            type: 'string',
            enum: ['vegetarian', 'vegan', 'gluten_free', 'dairy_free', 'halal', 'kosher'],
            description: 'Filter by dietary preference',
          },
          max_price: {
            type: 'number',
            description: 'Maximum price filter',
          },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_business_hours',
      description: 'Get the operating hours for a specific day or the whole week',
      parameters: {
        type: 'object',
        properties: {
          day: {
            type: 'string',
            enum: [
              'monday',
              'tuesday',
              'wednesday',
              'thursday',
              'friday',
              'saturday',
              'sunday',
              'today',
              'all',
            ],
            description: 'Day to get hours for',
          },
        },
        required: ['day'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'get_location_info',
      description: 'Get location details like address, phone, and directions',
      parameters: {
        type: 'object',
        properties: {},
        required: [],
      },
    },
  },
];

// Action handlers
async function handleMakeReservation(
  locationId: string,
  args: {
    date: string;
    time: string;
    party_size: number;
    guest_name: string;
    guest_phone?: string;
    guest_email?: string;
    special_requests?: string;
    occasion?: string;
  },
  context: CustomerActionContext
): Promise<CustomerActionResult> {
  try {
    // First check availability
    const slots = await getAvailableSlots(locationId, args.date, args.party_size);

    // Find the requested time slot
    const requestedSlot = slots.find((s) => s.time === args.time);

    if (!requestedSlot || !requestedSlot.available) {
      // Find alternative times
      const alternatives = slots
        .filter((s) => s.available)
        .slice(0, 3)
        .map((s) => s.time);

      return {
        success: false,
        action: 'make_reservation',
        message: `The time ${args.time} is not available.`,
        data: { alternativeTimes: alternatives },
      };
    }

    // Create the reservation
    const reservation = await createReservation({
      location_id: locationId,
      reservation_date: args.date,
      reservation_time: args.time,
      party_size: args.party_size,
      guest_name: args.guest_name,
      guest_phone: args.guest_phone || context.customerPhone || '',
      guest_email: args.guest_email || context.customerEmail,
      occasion:
        (args.occasion as
          | 'birthday'
          | 'anniversary'
          | 'business'
          | 'date'
          | 'celebration'
          | 'other'
          | undefined) || null,
      special_requests: args.special_requests,
      source: 'website', // AI chat uses website source
      account_id: context.accountId,
    });

    // Link reservation to conversation
    await supabaseAdmin
      .from('customer_conversations')
      .update({ reservation_id: reservation.id })
      .eq('id', context.conversationId);

    return {
      success: true,
      action: 'make_reservation',
      message: `Reservation confirmed for ${args.party_size} guests on ${args.date} at ${args.time}.`,
      data: {
        reservationId: reservation.id,
        confirmationNumber: reservation.id.slice(0, 8).toUpperCase(),
        date: args.date,
        time: args.time,
        partySize: args.party_size,
        guestName: args.guest_name,
      },
    };
  } catch (error) {
    return {
      success: false,
      action: 'make_reservation',
      message: `Failed to create reservation: ${error instanceof Error ? error.message : 'Unknown error'}`,
      requiresHumanFollowup: true,
    };
  }
}

async function handleCheckAvailability(
  locationId: string,
  args: { date: string; party_size: number; preferred_time?: string }
): Promise<CustomerActionResult> {
  try {
    const slots = await getAvailableSlots(locationId, args.date, args.party_size);

    const availableSlots = slots.filter((s) => s.available);

    if (availableSlots.length === 0) {
      return {
        success: true,
        action: 'check_availability',
        message: `No availability on ${args.date} for ${args.party_size} guests.`,
        data: { available: false, slots: [] },
      };
    }

    // If preferred time given, sort by proximity
    let sortedSlots = availableSlots;
    if (args.preferred_time) {
      sortedSlots = availableSlots.sort((a, b) => {
        const aDiff = Math.abs(
          parseInt(a.time.replace(':', '')) - parseInt(args.preferred_time!.replace(':', ''))
        );
        const bDiff = Math.abs(
          parseInt(b.time.replace(':', '')) - parseInt(args.preferred_time!.replace(':', ''))
        );
        return aDiff - bDiff;
      });
    }

    const topSlots = sortedSlots.slice(0, 5).map((s) => s.time);

    return {
      success: true,
      action: 'check_availability',
      message: `Available times on ${args.date}: ${topSlots.join(', ')}`,
      data: {
        available: true,
        date: args.date,
        partySize: args.party_size,
        slots: topSlots,
      },
    };
  } catch (error) {
    return {
      success: false,
      action: 'check_availability',
      message: `Failed to check availability: ${error instanceof Error ? error.message : 'Unknown error'}`,
    };
  }
}

async function handleGetMenuItem(
  locationId: string,
  args: { item_name: string }
): Promise<CustomerActionResult> {
  const { data: items } = await supabaseAdmin
    .from('menu_items')
    .select('name, description, price, allergens, dietary_tags, is_available')
    .eq('location_id', locationId)
    .ilike('name', `%${args.item_name}%`)
    .limit(3);

  if (!items || items.length === 0) {
    return {
      success: false,
      action: 'get_menu_item',
      message: `No menu item found matching "${args.item_name}".`,
    };
  }

  const item = items[0];
  return {
    success: true,
    action: 'get_menu_item',
    message: `${item.name} - $${item.price.toFixed(2)}`,
    data: {
      name: item.name,
      price: item.price,
      description: item.description,
      allergens: item.allergens || [],
      dietaryTags: item.dietary_tags || [],
      available: item.is_available,
      otherMatches: items.length > 1 ? items.slice(1).map((i) => i.name) : [],
    },
  };
}

async function handleSearchMenu(
  locationId: string,
  args: { query: string; dietary_filter?: string; max_price?: number }
): Promise<CustomerActionResult> {
  let query = supabaseAdmin
    .from('menu_items')
    .select('name, description, price, dietary_tags, category')
    .eq('location_id', locationId)
    .eq('is_available', true)
    .or(
      `name.ilike.%${args.query}%,description.ilike.%${args.query}%,category.ilike.%${args.query}%`
    );

  if (args.max_price) {
    query = query.lte('price', args.max_price);
  }

  const { data: items } = await query.limit(10);

  // Filter by dietary if specified
  let filteredItems = items || [];
  if (args.dietary_filter) {
    filteredItems = filteredItems.filter((item) =>
      (item.dietary_tags || []).includes(args.dietary_filter)
    );
  }

  if (filteredItems.length === 0) {
    return {
      success: true,
      action: 'search_menu',
      message: `No items found matching your criteria.`,
      data: { items: [] },
    };
  }

  return {
    success: true,
    action: 'search_menu',
    message: `Found ${filteredItems.length} items`,
    data: {
      items: filteredItems.map((i) => ({
        name: i.name,
        price: i.price,
        description: i.description?.slice(0, 100),
        category: i.category,
      })),
    },
  };
}

async function handleGetBusinessHours(
  locationId: string,
  args: { day: string }
): Promise<CustomerActionResult> {
  const dayMap: Record<string, number> = {
    sunday: 0,
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
  };

  let query = supabaseAdmin
    .from('location_operating_hours')
    .select('day_of_week, open_time, close_time, is_closed')
    .eq('location_id', locationId);

  if (args.day !== 'all') {
    const dayNum = args.day === 'today' ? new Date().getDay() : dayMap[args.day];
    query = query.eq('day_of_week', dayNum);
  }

  const { data: hours } = await query.order('day_of_week');

  if (!hours || hours.length === 0) {
    return {
      success: false,
      action: 'get_business_hours',
      message: 'Operating hours not available.',
    };
  }

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const formatted = hours.map((h) => ({
    day: days[h.day_of_week],
    hours: h.is_closed ? 'Closed' : `${h.open_time} - ${h.close_time}`,
  }));

  return {
    success: true,
    action: 'get_business_hours',
    message: formatted.map((f) => `${f.day}: ${f.hours}`).join(', '),
    data: { hours: formatted },
  };
}

async function handleGetLocationInfo(locationId: string): Promise<CustomerActionResult> {
  const { data: location } = await supabaseAdmin
    .from('locations')
    .select('name, address, phone, email, latitude, longitude')
    .eq('id', locationId)
    .single();

  if (!location) {
    return {
      success: false,
      action: 'get_location_info',
      message: 'Location information not available.',
    };
  }

  const mapsUrl =
    location.latitude && location.longitude
      ? `https://maps.google.com/?q=${location.latitude},${location.longitude}`
      : null;

  return {
    success: true,
    action: 'get_location_info',
    message: `${location.name} - ${location.address}`,
    data: {
      name: location.name,
      address: location.address,
      phone: location.phone,
      email: location.email,
      mapsUrl,
    },
  };
}

// Main action executor
export async function executeCustomerAction(
  locationId: string,
  functionName: string,
  args: Record<string, unknown>,
  context: CustomerActionContext
): Promise<CustomerActionResult> {
  switch (functionName) {
    case 'make_reservation':
      return handleMakeReservation(
        locationId,
        args as {
          date: string;
          time: string;
          party_size: number;
          guest_name: string;
          guest_phone?: string;
          guest_email?: string;
          special_requests?: string;
          occasion?: string;
        },
        context
      );

    case 'check_availability':
      return handleCheckAvailability(
        locationId,
        args as {
          date: string;
          party_size: number;
          preferred_time?: string;
        }
      );

    case 'get_menu_item':
      return handleGetMenuItem(locationId, args as { item_name: string });

    case 'search_menu':
      return handleSearchMenu(
        locationId,
        args as {
          query: string;
          dietary_filter?: string;
          max_price?: number;
        }
      );

    case 'get_business_hours':
      return handleGetBusinessHours(locationId, args as { day: string });

    case 'get_location_info':
      return handleGetLocationInfo(locationId);

    default:
      return {
        success: false,
        action: functionName,
        message: `Unknown action: ${functionName}`,
      };
  }
}
