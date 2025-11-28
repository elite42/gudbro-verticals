/**
 * Standardized Theme System for Digital Menu SaaS
 *
 * This theme system provides professional color palettes optimized
 * for F&B businesses using color psychology principles.
 *
 * Design Philosophy:
 * - Clean and minimal
 * - WCAG AA compliant
 * - Optimized for food/beverage presentation
 * - Universal appeal across all F&B types
 * - Red primary color: Scientifically proven to stimulate appetite
 *   (increases heart rate and food cravings - research 2024)
 * - Most customers will use default colors without customization
 *
 * Color Psychology Source:
 * - Red/warm colors increase appetite and food cravings
 * - Used by major F&B brands: McDonald's, KFC, Pizza Hut, Coca-Cola
 */

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    // Background colors
    background: {
      primary: string;      // Main background
      secondary: string;    // Cards, panels
      tertiary: string;     // Subtle backgrounds
      elevated: string;     // Elevated elements (modals, popovers)
    };
    // Text colors
    text: {
      primary: string;      // Main text
      secondary: string;    // Supporting text
      tertiary: string;     // Disabled, placeholder
      inverse: string;      // Text on dark backgrounds
    };
    // Border colors
    border: {
      light: string;        // Subtle borders
      medium: string;       // Default borders
      heavy: string;        // Emphasized borders
    };
    // Interactive colors
    interactive: {
      primary: string;      // Main CTA buttons
      primaryHover: string; // Hover state
      secondary: string;    // Secondary actions
      secondaryHover: string;
      danger: string;       // Delete, remove actions
      dangerHover: string;
      success: string;      // Success states
      warning: string;      // Warning states
    };
    // Status colors
    status: {
      favorite: string;     // Favorite/liked items
      badge: string;        // Notification badges
      highlight: string;    // Highlighted content
    };
    // Brand colors - Configurable per business
    brand: {
      primary: string;      // Main brand color (tabs, active states)
      primaryHover: string; // Hover state
      secondary: string;    // Lighter brand color
      accent: string;       // Brand accent highlights
    };
  };
}

/**
 * Light Theme - Clean and bright for daytime use
 * Inspired by: Uber Eats, Deliveroo, modern food apps
 */
export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: {
      primary: '#FFFFFF',     // Pure white
      secondary: '#F8F9FA',   // Very light gray
      tertiary: '#F1F3F5',    // Light gray
      elevated: '#FFFFFF',    // White for modals
    },
    text: {
      primary: '#1A1A1A',     // Near black
      secondary: '#4B5563',   // Medium gray
      tertiary: '#9CA3AF',    // Light gray
      inverse: '#FFFFFF',     // White
    },
    border: {
      light: '#F1F3F5',       // Very subtle
      medium: '#E5E7EB',      // Default
      heavy: '#D1D5DB',       // Emphasized
    },
    interactive: {
      primary: '#2563EB',     // Clean blue
      primaryHover: '#1D4ED8',
      secondary: '#6B7280',   // Neutral gray
      secondaryHover: '#4B5563',
      danger: '#DC2626',      // Red
      dangerHover: '#B91C1C',
      success: '#16A34A',     // Green
      warning: '#F59E0B',     // Amber
    },
    status: {
      favorite: '#EF4444',    // Red heart
      badge: '#EF4444',       // Red badge
      highlight: '#FEF3C7',   // Light yellow
    },
    brand: {
      primary: '#DC2626',     // Red-600 (appetite stimulating)
      primaryHover: '#B91C1C', // Red-700
      secondary: '#FEE2E2',   // Red-50 (light background)
      accent: '#EF4444',      // Red-500
    },
  },
};

/**
 * Dark Theme - Elegant and comfortable for evening use
 * Inspired by: Modern dark modes, Apple Design, Material Design
 */
export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: {
      primary: '#0F172A',     // Dark blue-gray
      secondary: '#1E293B',   // Medium dark
      tertiary: '#334155',    // Lighter dark
      elevated: '#1E293B',    // Elevated surfaces
    },
    text: {
      primary: '#F8FAFC',     // Near white
      secondary: '#CBD5E1',   // Light gray
      tertiary: '#64748B',    // Medium gray
      inverse: '#0F172A',     // Dark
    },
    border: {
      light: '#1E293B',       // Very subtle
      medium: '#334155',      // Default
      heavy: '#475569',       // Emphasized
    },
    interactive: {
      primary: '#3B82F6',     // Bright blue
      primaryHover: '#2563EB',
      secondary: '#64748B',   // Neutral gray
      secondaryHover: '#475569',
      danger: '#F87171',      // Lighter red for dark bg
      dangerHover: '#EF4444',
      success: '#34D399',     // Lighter green
      warning: '#FBBF24',     // Lighter amber
    },
    status: {
      favorite: '#F87171',    // Lighter red
      badge: '#F87171',       // Lighter red
      highlight: '#FDE047',   // Bright yellow
    },
    brand: {
      primary: '#EF4444',     // Red-500 (brighter for dark mode)
      primaryHover: '#DC2626', // Red-600
      secondary: '#FCA5A5',   // Red-300 (lighter)
      accent: '#F87171',      // Red-400 (accent)
    },
  },
};

/**
 * Get theme by mode
 */
export function getTheme(mode: ThemeMode): Theme {
  return mode === 'dark' ? darkTheme : lightTheme;
}

/**
 * Convert theme colors to CSS variables
 */
export function themeToCSSVariables(theme: Theme): Record<string, string> {
  return {
    // Background
    '--color-bg-primary': theme.colors.background.primary,
    '--color-bg-secondary': theme.colors.background.secondary,
    '--color-bg-tertiary': theme.colors.background.tertiary,
    '--color-bg-elevated': theme.colors.background.elevated,

    // Text
    '--color-text-primary': theme.colors.text.primary,
    '--color-text-secondary': theme.colors.text.secondary,
    '--color-text-tertiary': theme.colors.text.tertiary,
    '--color-text-inverse': theme.colors.text.inverse,

    // Border
    '--color-border-light': theme.colors.border.light,
    '--color-border-medium': theme.colors.border.medium,
    '--color-border-heavy': theme.colors.border.heavy,

    // Interactive
    '--color-interactive-primary': theme.colors.interactive.primary,
    '--color-interactive-primary-hover': theme.colors.interactive.primaryHover,
    '--color-interactive-secondary': theme.colors.interactive.secondary,
    '--color-interactive-secondary-hover': theme.colors.interactive.secondaryHover,
    '--color-interactive-danger': theme.colors.interactive.danger,
    '--color-interactive-danger-hover': theme.colors.interactive.dangerHover,
    '--color-interactive-success': theme.colors.interactive.success,
    '--color-interactive-warning': theme.colors.interactive.warning,

    // Status
    '--color-status-favorite': theme.colors.status.favorite,
    '--color-status-badge': theme.colors.status.badge,
    '--color-status-highlight': theme.colors.status.highlight,

    // Brand
    '--color-brand-primary': theme.colors.brand.primary,
    '--color-brand-primary-hover': theme.colors.brand.primaryHover,
    '--color-brand-secondary': theme.colors.brand.secondary,
    '--color-brand-accent': theme.colors.brand.accent,
  };
}
