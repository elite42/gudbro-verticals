import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Lazy singleton — client is created on first use, NOT at import-time.
// This prevents "supabaseUrl is required" errors during Next.js build
// when env vars are not available (static page collection phase).
let _supabase: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!_supabase) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY env vars');
    }
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

// Proxy so existing `import { supabase }` usage works unchanged.
// Every property access is forwarded to the lazy-initialized client.
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop, receiver) {
    const client = getSupabaseClient();
    const value = Reflect.get(client, prop, receiver);
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

// Types for locale tables
export interface Country {
  code: string;
  name_en: string;
  name_native: string | null;
  currency_code: string;
  currency_symbol: string;
  currency_name: string;
  primary_language: string;
  common_languages: string[];
  timezone: string | null;
  phone_code: string | null;
  continent: string | null;
  is_active: boolean;
  is_supported: boolean;
}

export interface Language {
  code: string;
  name_en: string;
  name_native: string;
  direction: 'ltr' | 'rtl';
  is_active: boolean;
}

export interface ExchangeRate {
  id: string;
  base_currency: string;
  rates: Record<string, number>;
  currency_count: number;
  source: string;
  fetched_at: string;
}

// ===========================================
// Multi-Tenant Types (ADR-003)
// ===========================================

export type PartnerTerritoryType = 'country' | 'region' | 'city';
export type PartnerStatus = 'active' | 'suspended' | 'terminated';
export type OrganizationType = 'standard' | 'enterprise';
export type OrganizationStatus = 'active' | 'suspended' | 'closed';
export type SubscriptionPlan = 'free' | 'menu_only' | 'starter' | 'pro';
export type SubscriptionStatus = 'active' | 'past_due' | 'cancelled' | 'trialing';
export type BusinessType = 'fnb' | 'hotel' | 'rental' | 'wellness' | 'other';
export type LeadStatus =
  | 'new'
  | 'contacted'
  | 'qualified'
  | 'proposal'
  | 'negotiating'
  | 'won'
  | 'lost';

export interface Partner {
  id: string;
  name: string;
  slug: string;
  territory_type: PartnerTerritoryType;
  territory_codes: string[];
  is_exclusive: boolean;
  royalty_pct: number;
  contact_name: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  billing_email: string | null;
  billing_address: string | null;
  tax_id: string | null;
  status: PartnerStatus;
  created_at: string;
  updated_at: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  type: OrganizationType;
  partner_id: string | null;
  subscription_plan: SubscriptionPlan | null;
  subscription_status: SubscriptionStatus | null;
  billing_email: string | null;
  billing_address: string | null;
  tax_id: string | null;
  stripe_customer_id: string | null;
  status: OrganizationStatus;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  organization_id: string;
  name: string;
  slug: string;
  description: string | null;
  business_type: BusinessType;
  logo_url: string | null;
  primary_color: string;
  secondary_color: string | null;
  default_menu_id: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Location {
  id: string;
  brand_id: string;
  name: string;
  slug: string;
  description: string | null;
  address: string | null;
  city: string | null;
  postal_code: string | null;
  country_code: string;
  latitude: number | null;
  longitude: number | null;
  currency_code: string;
  primary_language: string;
  enabled_languages: string[];
  timezone: string | null;
  phone: string | null;
  email: string | null;
  menu_id: string | null;
  operating_hours: Record<string, { open: string; close: string }> | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EnterpriseLead {
  id: string;
  company_name: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  estimated_locations: number | null;
  countries: string[] | null;
  current_solution: string | null;
  message: string | null;
  status: LeadStatus;
  assigned_to: string | null;
  notes: string | null;
  converted_organization_id: string | null;
  created_at: string;
  updated_at: string;
}

// Expanded types with relations
export interface OrganizationWithBrands extends Organization {
  brands?: Brand[];
  partner?: Partner;
}

export interface BrandWithLocations extends Brand {
  locations?: Location[];
  organization?: Organization;
}

export interface LocationWithBrand extends Location {
  brand?: Brand;
  country?: Country;
}

// ===========================================
// Site Sections Types (068)
// ===========================================

export type SiteSectionType =
  | 'hero'
  | 'about'
  | 'gallery'
  | 'hours'
  | 'contact'
  | 'social'
  | 'reviews';

// Content type definitions per section
export interface HeroContent {
  title: string;
  subtitle: string;
  image_url: string;
  cta_text: string;
  cta_link: string;
  overlay_opacity: number;
}

export interface AboutContent {
  title: string;
  description: string;
  team: Array<{ name: string; role: string; image_url?: string }>;
  values: Array<{ title: string; description: string; icon?: string }>;
}

export interface GalleryContent {
  title: string;
  images: Array<{ url: string; alt?: string; caption?: string }>;
}

export interface HoursContent {
  title: string;
  show_status_badge: boolean;
}

export interface ContactContent {
  title: string;
  show_phone: boolean;
  show_email: boolean;
  show_map: boolean;
  map_embed_url: string;
}

export interface SocialContent {
  title: string;
  display_style: 'buttons' | 'icons' | 'list';
}

export interface ReviewsContent {
  title: string;
  google_place_id: string;
  tripadvisor_url: string;
  testimonials: Array<{
    name: string;
    rating: number;
    text: string;
    date?: string;
    avatar_url?: string;
  }>;
}

export type SiteSectionContent =
  | HeroContent
  | AboutContent
  | GalleryContent
  | HoursContent
  | ContactContent
  | SocialContent
  | ReviewsContent;

export interface SiteSection {
  id: string;
  location_id: string;
  section_type: SiteSectionType;
  is_enabled: boolean;
  display_order: number;
  content: SiteSectionContent;
  style_overrides: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  published_at: string | null;
}
