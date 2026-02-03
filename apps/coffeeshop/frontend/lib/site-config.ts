/**
 * Site Configuration Service
 *
 * Fetches customizable site sections from database.
 * Falls back to static default config when database unavailable.
 *
 * Pattern from merchant-config.ts: cache + fallback
 */

import { supabase, isSupabaseConfigured } from './supabase';

// ============================================================================
// Types
// ============================================================================

export type SiteSectionType =
  | 'hero'
  | 'about'
  | 'gallery'
  | 'hours'
  | 'contact'
  | 'social'
  | 'reviews';

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
  section_type: SiteSectionType;
  is_enabled: boolean;
  display_order: number;
  content: SiteSectionContent;
  style_overrides?: Record<string, unknown>;
}

export interface SiteConfig {
  sections: SiteSection[];
  isLoading: boolean;
  error: string | null;
}

// ============================================================================
// Cache
// ============================================================================

let cachedConfig: SiteConfig | null = null;
let cacheTimestamp: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// ============================================================================
// Default Content
// ============================================================================

const DEFAULT_SECTIONS: SiteSection[] = [
  {
    id: 'default-hero',
    section_type: 'hero',
    is_enabled: true,
    display_order: 0,
    content: {
      title: 'Welcome',
      subtitle: 'Experience the finest dining',
      image_url: '',
      cta_text: 'View Menu',
      cta_link: '/menu',
      overlay_opacity: 0.4,
    } as HeroContent,
  },
  {
    id: 'default-about',
    section_type: 'about',
    is_enabled: true,
    display_order: 1,
    content: {
      title: 'About Us',
      description: '',
      team: [],
      values: [],
    } as AboutContent,
  },
  {
    id: 'default-gallery',
    section_type: 'gallery',
    is_enabled: false, // Disabled by default
    display_order: 2,
    content: {
      title: 'Gallery',
      images: [],
    } as GalleryContent,
  },
  {
    id: 'default-hours',
    section_type: 'hours',
    is_enabled: true,
    display_order: 3,
    content: {
      title: 'Opening Hours',
      show_status_badge: true,
    } as HoursContent,
  },
  {
    id: 'default-contact',
    section_type: 'contact',
    is_enabled: true,
    display_order: 4,
    content: {
      title: 'Contact Us',
      show_phone: true,
      show_email: true,
      show_map: true,
      map_embed_url: '',
    } as ContactContent,
  },
  {
    id: 'default-social',
    section_type: 'social',
    is_enabled: true,
    display_order: 5,
    content: {
      title: 'Follow Us',
      display_style: 'buttons',
    } as SocialContent,
  },
  {
    id: 'default-reviews',
    section_type: 'reviews',
    is_enabled: false, // Disabled by default
    display_order: 6,
    content: {
      title: 'Reviews',
      google_place_id: '',
      tripadvisor_url: '',
      testimonials: [],
    } as ReviewsContent,
  },
];

// ============================================================================
// Static Fallback
// ============================================================================

function getStaticFallback(): SiteConfig {
  return {
    sections: DEFAULT_SECTIONS,
    isLoading: false,
    error: null,
  };
}

// ============================================================================
// Fetch Function
// ============================================================================

/**
 * Fetch site configuration from database
 *
 * @param locationId - Optional location ID. Uses first active location if not provided.
 * @returns SiteConfig with sections sorted by display_order
 */
export async function fetchSiteConfig(locationId?: string): Promise<SiteConfig> {
  // Check cache
  if (cachedConfig && Date.now() - cacheTimestamp < CACHE_TTL) {
    return cachedConfig;
  }

  // Return static fallback if Supabase not configured
  if (!isSupabaseConfigured || !supabase) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[SiteConfig] Supabase not configured');
    }
    const fallback = getStaticFallback();
    cachedConfig = fallback;
    cacheTimestamp = Date.now();
    return fallback;
  }

  try {
    // Build query for published, enabled sections
    let query = supabase
      .from('site_sections')
      .select('id, section_type, is_enabled, display_order, content, style_overrides')
      .eq('is_enabled', true)
      .not('published_at', 'is', null)
      .order('display_order', { ascending: true });

    if (locationId) {
      query = query.eq('location_id', locationId);
    }

    const { data, error } = await query;

    if (error) {
      console.error('[SiteConfig] Error fetching sections:', error.message);
      const fallback = getStaticFallback();
      fallback.error = error.message;
      return fallback;
    }

    // If no sections found, return defaults
    if (!data || data.length === 0) {
      if (process.env.NODE_ENV === 'development') {
        // Silently ignore
      }
      return getStaticFallback();
    }

    const config: SiteConfig = {
      sections: data as SiteSection[],
      isLoading: false,
      error: null,
    };

    // Cache the result
    cachedConfig = config;
    cacheTimestamp = Date.now();

    if (process.env.NODE_ENV === 'development') {
      console.log('[SiteConfig] Loaded from Supabase:', {
        count: data.length,
        types: data.map((s) => s.section_type),
      });
    }

    return config;
  } catch (err) {
    console.error('[SiteConfig] Unexpected error:', err);
    const fallback = getStaticFallback();
    fallback.error = 'Failed to load site config';
    return fallback;
  }
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Clear the cached config (useful for testing or when config changes)
 */
export function clearSiteConfigCache(): void {
  cachedConfig = null;
  cacheTimestamp = 0;
}

/**
 * Get static config synchronously (for SSR or initial render)
 */
export function getStaticSiteConfig(): SiteConfig {
  return getStaticFallback();
}

/**
 * Get a specific section by type
 */
export function getSectionByType(
  config: SiteConfig,
  type: SiteSectionType
): SiteSection | undefined {
  return config.sections.find((s) => s.section_type === type);
}

/**
 * Check if a section type is enabled
 */
export function isSectionEnabled(config: SiteConfig, type: SiteSectionType): boolean {
  const section = getSectionByType(config, type);
  return section?.is_enabled ?? false;
}
