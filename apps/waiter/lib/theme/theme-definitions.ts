/**
 * Theme System for Waiter PWA
 *
 * Professional color palette optimized for staff use:
 * - High contrast for quick scanning
 * - Clear status indicators
 * - Works in various lighting conditions
 */

export type ThemeMode = 'light' | 'dark';

export interface Theme {
  mode: ThemeMode;
  colors: {
    background: {
      primary: string;
      secondary: string;
      tertiary: string;
      elevated: string;
    };
    text: {
      primary: string;
      secondary: string;
      tertiary: string;
      inverse: string;
    };
    border: {
      light: string;
      medium: string;
      heavy: string;
    };
    interactive: {
      primary: string;
      primaryHover: string;
      secondary: string;
      secondaryHover: string;
      danger: string;
      dangerHover: string;
      success: string;
      warning: string;
    };
    status: {
      favorite: string;
      badge: string;
      highlight: string;
    };
    brand: {
      primary: string;
      primaryHover: string;
      secondary: string;
      accent: string;
    };
  };
}

/**
 * Light Theme - Clean for daytime use
 */
export const lightTheme: Theme = {
  mode: 'light',
  colors: {
    background: {
      primary: '#FFFFFF',
      secondary: '#F8FAFC',
      tertiary: '#F1F5F9',
      elevated: '#FFFFFF',
    },
    text: {
      primary: '#0F172A',
      secondary: '#475569',
      tertiary: '#94A3B8',
      inverse: '#FFFFFF',
    },
    border: {
      light: '#F1F5F9',
      medium: '#E2E8F0',
      heavy: '#CBD5E1',
    },
    interactive: {
      primary: '#3B82F6',
      primaryHover: '#2563EB',
      secondary: '#64748B',
      secondaryHover: '#475569',
      danger: '#EF4444',
      dangerHover: '#DC2626',
      success: '#22C55E',
      warning: '#F59E0B',
    },
    status: {
      favorite: '#EF4444',
      badge: '#EF4444',
      highlight: '#FEF3C7',
    },
    brand: {
      primary: '#3B82F6', // Blue - professional
      primaryHover: '#2563EB',
      secondary: '#DBEAFE',
      accent: '#60A5FA',
    },
  },
};

/**
 * Dark Theme - Comfortable for evening shifts
 */
export const darkTheme: Theme = {
  mode: 'dark',
  colors: {
    background: {
      primary: '#0F172A',
      secondary: '#1E293B',
      tertiary: '#334155',
      elevated: '#1E293B',
    },
    text: {
      primary: '#F8FAFC',
      secondary: '#CBD5E1',
      tertiary: '#64748B',
      inverse: '#0F172A',
    },
    border: {
      light: '#1E293B',
      medium: '#334155',
      heavy: '#475569',
    },
    interactive: {
      primary: '#60A5FA',
      primaryHover: '#3B82F6',
      secondary: '#64748B',
      secondaryHover: '#475569',
      danger: '#F87171',
      dangerHover: '#EF4444',
      success: '#4ADE80',
      warning: '#FBBF24',
    },
    status: {
      favorite: '#F87171',
      badge: '#F87171',
      highlight: '#FDE047',
    },
    brand: {
      primary: '#60A5FA',
      primaryHover: '#3B82F6',
      secondary: '#1E40AF',
      accent: '#93C5FD',
    },
  },
};

export function getTheme(mode: ThemeMode): Theme {
  return mode === 'dark' ? darkTheme : lightTheme;
}

export function themeToCSSVariables(theme: Theme): Record<string, string> {
  return {
    '--color-bg-primary': theme.colors.background.primary,
    '--color-bg-secondary': theme.colors.background.secondary,
    '--color-bg-tertiary': theme.colors.background.tertiary,
    '--color-bg-elevated': theme.colors.background.elevated,
    '--color-text-primary': theme.colors.text.primary,
    '--color-text-secondary': theme.colors.text.secondary,
    '--color-text-tertiary': theme.colors.text.tertiary,
    '--color-text-inverse': theme.colors.text.inverse,
    '--color-border-light': theme.colors.border.light,
    '--color-border-medium': theme.colors.border.medium,
    '--color-border-heavy': theme.colors.border.heavy,
    '--color-interactive-primary': theme.colors.interactive.primary,
    '--color-interactive-primary-hover': theme.colors.interactive.primaryHover,
    '--color-interactive-secondary': theme.colors.interactive.secondary,
    '--color-interactive-secondary-hover': theme.colors.interactive.secondaryHover,
    '--color-interactive-danger': theme.colors.interactive.danger,
    '--color-interactive-danger-hover': theme.colors.interactive.dangerHover,
    '--color-interactive-success': theme.colors.interactive.success,
    '--color-interactive-warning': theme.colors.interactive.warning,
    '--color-status-favorite': theme.colors.status.favorite,
    '--color-status-badge': theme.colors.status.badge,
    '--color-status-highlight': theme.colors.status.highlight,
    '--color-brand-primary': theme.colors.brand.primary,
    '--color-brand-primary-hover': theme.colors.brand.primaryHover,
    '--color-brand-secondary': theme.colors.brand.secondary,
    '--color-brand-accent': theme.colors.brand.accent,
  };
}
