/**
 * useBrandTheme Hook
 *
 * Applies brand colors as CSS custom properties for white-label theming.
 * Uses the branding data from MerchantConfigContext.
 *
 * CSS Variables injected:
 * --brand-primary: Primary brand color
 * --brand-secondary: Secondary brand color
 * --brand-accent: Accent color
 * --brand-primary-rgb: RGB values for opacity variants
 *
 * Usage:
 * // In root layout or provider
 * useBrandTheme();
 *
 * // In CSS/Tailwind
 * bg-[var(--brand-primary)]
 * bg-[rgba(var(--brand-primary-rgb),0.1)]
 */

import { useEffect } from 'react';
import { MerchantBranding } from '../merchant-config';

/**
 * Convert hex color to RGB values
 */
function hexToRgb(hex: string): string {
  // Remove # if present
  const cleanHex = hex.replace('#', '');

  // Parse hex values
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

/**
 * Calculate contrasting text color (white or black) for a given background
 */
function getContrastColor(hex: string): string {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16);
  const g = parseInt(cleanHex.substring(2, 4), 16);
  const b = parseInt(cleanHex.substring(4, 6), 16);

  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

  return luminance > 0.5 ? '#000000' : '#ffffff';
}

/**
 * Apply brand theme CSS variables
 */
export function useBrandTheme(branding: MerchantBranding | null): void {
  useEffect(() => {
    if (!branding) return;

    const root = document.documentElement;

    // Primary color
    if (branding.primaryColor) {
      root.style.setProperty('--brand-primary', branding.primaryColor);
      root.style.setProperty('--brand-primary-rgb', hexToRgb(branding.primaryColor));
      root.style.setProperty('--brand-primary-contrast', getContrastColor(branding.primaryColor));
    }

    // Secondary color (fallback to primary with opacity)
    if (branding.secondaryColor) {
      root.style.setProperty('--brand-secondary', branding.secondaryColor);
      root.style.setProperty('--brand-secondary-rgb', hexToRgb(branding.secondaryColor));
    } else if (branding.primaryColor) {
      root.style.setProperty('--brand-secondary', branding.primaryColor);
      root.style.setProperty('--brand-secondary-rgb', hexToRgb(branding.primaryColor));
    }

    // Accent color (fallback to primary)
    if (branding.accentColor) {
      root.style.setProperty('--brand-accent', branding.accentColor);
      root.style.setProperty('--brand-accent-rgb', hexToRgb(branding.accentColor));
    } else if (branding.primaryColor) {
      root.style.setProperty('--brand-accent', branding.primaryColor);
      root.style.setProperty('--brand-accent-rgb', hexToRgb(branding.primaryColor));
    }

    // Cleanup on unmount (reset to defaults)
    return () => {
      root.style.removeProperty('--brand-primary');
      root.style.removeProperty('--brand-primary-rgb');
      root.style.removeProperty('--brand-primary-contrast');
      root.style.removeProperty('--brand-secondary');
      root.style.removeProperty('--brand-secondary-rgb');
      root.style.removeProperty('--brand-accent');
      root.style.removeProperty('--brand-accent-rgb');
    };
  }, [branding]);
}

/**
 * Get brand-aware Tailwind classes
 * Useful for components that need brand colors
 */
export function getBrandClasses(branding: MerchantBranding | null) {
  if (!branding || !branding.primaryColor || branding.primaryColor === '#000000') {
    // Default styling (no custom branding)
    return {
      primaryBg: 'bg-black',
      primaryText: 'text-black',
      primaryBorder: 'border-black',
      primaryHover: 'hover:bg-gray-800',
      accentBg: 'bg-amber-500',
      accentText: 'text-amber-500',
    };
  }

  // Custom branding - use CSS variables
  return {
    primaryBg: 'bg-[var(--brand-primary)]',
    primaryText: 'text-[var(--brand-primary)]',
    primaryBorder: 'border-[var(--brand-primary)]',
    primaryHover: 'hover:bg-[var(--brand-secondary)]',
    accentBg: 'bg-[var(--brand-accent)]',
    accentText: 'text-[var(--brand-accent)]',
  };
}
