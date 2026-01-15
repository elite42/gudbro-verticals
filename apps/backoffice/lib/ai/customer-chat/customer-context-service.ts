// Customer Context Service
// Fetches location info, menu, hours for customer-facing AI

import { supabaseAdmin } from '@/lib/supabase-admin';

export interface CustomerContext {
  // Location info
  locationId: string;
  locationName: string;
  brandName: string;
  address?: string;
  phone?: string;
  email?: string;
  timezone: string;

  // Business info
  businessType: string;
  cuisineType?: string;
  priceRange?: string;

  // Operating hours
  operatingHours: {
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
  }[];
  isCurrentlyOpen: boolean;

  // Menu summary
  menuCategories: {
    name: string;
    itemCount: number;
  }[];
  popularItems: {
    name: string;
    price: number;
    description?: string;
  }[];
  dietaryOptions: string[];
  allergenInfo: string[];

  // Reservation info
  acceptsReservations: boolean;
  reservationSettings?: {
    minPartySize: number;
    maxPartySize: number;
    advanceBookingDays: number;
    slotDurationMinutes: number;
  };

  // Features
  hasDelivery: boolean;
  hasTakeaway: boolean;
  hasWallet: boolean;

  // Language
  language: string;
}

export async function fetchCustomerContext(
  locationId: string,
  language: string = 'en'
): Promise<CustomerContext> {
  // Fetch location with brand
  const { data: location } = await supabaseAdmin
    .from('locations')
    .select(
      `
      id,
      name,
      address,
      phone,
      email,
      timezone,
      venue_type,
      cuisine_type,
      price_range,
      brand:brands(name)
    `
    )
    .eq('id', locationId)
    .single();

  if (!location) {
    throw new Error(`Location not found: ${locationId}`);
  }

  // Fetch operating hours
  const { data: hours } = await supabaseAdmin
    .from('location_operating_hours')
    .select('day_of_week, open_time, close_time')
    .eq('location_id', locationId)
    .eq('is_closed', false)
    .order('day_of_week');

  // Check if currently open
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.toTimeString().slice(0, 5);
  const todayHours = hours?.find(
    (h: { day_of_week: number; open_time: string; close_time: string }) =>
      h.day_of_week === currentDay
  );
  const isCurrentlyOpen = todayHours
    ? currentTime >= todayHours.open_time && currentTime <= todayHours.close_time
    : false;

  // Fetch menu categories with item counts
  const { data: categories } = await supabaseAdmin
    .from('menu_categories')
    .select('name, menu_items(count)')
    .eq('location_id', locationId)
    .eq('is_active', true);

  const menuCategories = (categories || []).map((c: { name: string; menu_items: unknown[] }) => ({
    name: c.name,
    itemCount: Array.isArray(c.menu_items) ? c.menu_items.length : 0,
  }));

  // Fetch popular items
  const { data: popularItems } = await supabaseAdmin
    .from('menu_items')
    .select('name, price, description')
    .eq('location_id', locationId)
    .eq('is_available', true)
    .eq('is_featured', true)
    .limit(5);

  // Get dietary options and allergens from menu
  const { data: menuMeta } = await supabaseAdmin
    .from('menu_items')
    .select('dietary_tags, allergens')
    .eq('location_id', locationId)
    .eq('is_available', true);

  const dietaryOptions: string[] = [
    ...new Set(
      (menuMeta || []).flatMap((m: { dietary_tags: string[] | null }) => m.dietary_tags || [])
    ),
  ];
  const allergenInfo: string[] = [
    ...new Set((menuMeta || []).flatMap((m: { allergens: string[] | null }) => m.allergens || [])),
  ];

  // Fetch reservation settings
  const { data: resvSettings } = await supabaseAdmin
    .from('reservation_settings')
    .select('min_party_size, max_party_size, advance_booking_days, slot_duration_minutes')
    .eq('location_id', locationId)
    .single();

  // Fetch location features
  const { data: features } = await supabaseAdmin
    .from('location_features')
    .select('feature_key, is_enabled')
    .eq('location_id', locationId);

  const featureMap = new Map<string, boolean>(
    (features || []).map((f: { feature_key: string; is_enabled: boolean }) => [
      f.feature_key,
      f.is_enabled,
    ])
  );

  return {
    locationId,
    locationName: location.name,
    brandName: (location.brand as { name: string }[] | null)?.[0]?.name || location.name,
    address: location.address,
    phone: location.phone,
    email: location.email,
    timezone: location.timezone || 'UTC',
    businessType: location.venue_type || 'restaurant',
    cuisineType: location.cuisine_type,
    priceRange: location.price_range,
    operatingHours: (hours || []).map(
      (h: { day_of_week: number; open_time: string; close_time: string }) => ({
        dayOfWeek: h.day_of_week,
        openTime: h.open_time,
        closeTime: h.close_time,
      })
    ),
    isCurrentlyOpen,
    menuCategories,
    popularItems: (popularItems || []).map(
      (p: { name: string; price: number; description: string | null }) => ({
        name: p.name,
        price: p.price,
        description: p.description ?? undefined,
      })
    ),
    dietaryOptions,
    allergenInfo,
    acceptsReservations: !!resvSettings,
    reservationSettings: resvSettings
      ? {
          minPartySize: resvSettings.min_party_size,
          maxPartySize: resvSettings.max_party_size,
          advanceBookingDays: resvSettings.advance_booking_days,
          slotDurationMinutes: resvSettings.slot_duration_minutes,
        }
      : undefined,
    hasDelivery: featureMap.get('delivery') ?? false,
    hasTakeaway: featureMap.get('takeaway') ?? true,
    hasWallet: featureMap.get('wallet') ?? false,
    language,
  };
}

export function formatCustomerKnowledge(context: CustomerContext): string {
  const sections: string[] = [];

  // Location info
  sections.push(`## About ${context.brandName}`);
  sections.push(`- Location: ${context.locationName}`);
  if (context.address) sections.push(`- Address: ${context.address}`);
  if (context.phone) sections.push(`- Phone: ${context.phone}`);
  if (context.cuisineType) sections.push(`- Cuisine: ${context.cuisineType}`);
  if (context.priceRange) sections.push(`- Price Range: ${context.priceRange}`);

  // Opening status
  sections.push('');
  sections.push(`## Current Status`);
  sections.push(context.isCurrentlyOpen ? '- We are currently OPEN' : '- We are currently CLOSED');

  // Operating hours
  if (context.operatingHours.length > 0) {
    sections.push('');
    sections.push('## Operating Hours');
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    for (const h of context.operatingHours) {
      sections.push(`- ${days[h.dayOfWeek]}: ${h.openTime} - ${h.closeTime}`);
    }
  }

  // Menu summary
  if (context.menuCategories.length > 0) {
    sections.push('');
    sections.push('## Menu Categories');
    for (const cat of context.menuCategories) {
      sections.push(`- ${cat.name} (${cat.itemCount} items)`);
    }
  }

  // Popular items
  if (context.popularItems.length > 0) {
    sections.push('');
    sections.push('## Popular Items');
    for (const item of context.popularItems) {
      const desc = item.description ? ` - ${item.description}` : '';
      sections.push(`- ${item.name}: $${item.price.toFixed(2)}${desc}`);
    }
  }

  // Dietary info
  if (context.dietaryOptions.length > 0) {
    sections.push('');
    sections.push('## Dietary Options Available');
    sections.push(`- ${context.dietaryOptions.join(', ')}`);
  }

  if (context.allergenInfo.length > 0) {
    sections.push('');
    sections.push('## Allergens to Note');
    sections.push(`- Common allergens in our dishes: ${context.allergenInfo.join(', ')}`);
  }

  // Reservation info
  if (context.acceptsReservations && context.reservationSettings) {
    sections.push('');
    sections.push('## Reservations');
    sections.push(
      `- We accept reservations for ${context.reservationSettings.minPartySize}-${context.reservationSettings.maxPartySize} guests`
    );
    sections.push(`- Book up to ${context.reservationSettings.advanceBookingDays} days in advance`);
  }

  // Services
  const services: string[] = [];
  if (context.hasTakeaway) services.push('Takeaway');
  if (context.hasDelivery) services.push('Delivery');
  if (context.hasWallet) services.push('Digital Wallet');
  if (services.length > 0) {
    sections.push('');
    sections.push('## Services');
    sections.push(`- Available: ${services.join(', ')}`);
  }

  return sections.join('\n');
}
