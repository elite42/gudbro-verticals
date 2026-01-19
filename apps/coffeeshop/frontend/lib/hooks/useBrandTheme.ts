/**
 * useBrandTheme Hook
 *
 * Applies brand colors as CSS custom properties for white-label theming.
 * Uses the branding data from MerchantConfigContext.
 *
 * CSS Variables injected:
 * - Full palette: --color-brand-50 through --color-brand-950
 * - Semantic: --color-brand-primary, --color-brand-primary-hover, etc.
 * - Legacy: --brand-primary, --brand-secondary, --brand-accent
 * - RGB values: --brand-primary-rgb for opacity variants
 *
 * Usage:
 * // In root layout or provider
 * useBrandTheme();
 *
 * // In CSS/Tailwind
 * bg-[var(--brand-primary)]
 * bg-[rgba(var(--brand-primary-rgb),0.1)]
 * bg-theme-brand-primary (from tailwind config)
 */

import { useEffect } from 'react';
import { MerchantBranding } from '../merchant-config';
import { generatePalette, paletteToCSSVariables } from '../theme/color-generator';

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
 * Generates a full color palette from the primary brand color
 */
export function useBrandTheme(branding: MerchantBranding | null): void {
  useEffect(() => {
    if (!branding) return;

    const root = document.documentElement;
    const appliedVariables: string[] = [];

    // Primary color - generate full palette
    if (branding.primaryColor) {
      // Generate full palette from primary color
      const palette = generatePalette(branding.primaryColor);
      const paletteVars = paletteToCSSVariables(palette, '--color-brand');

      // Apply palette variables
      Object.entries(paletteVars).forEach(([name, value]) => {
        root.style.setProperty(name, value);
        appliedVariables.push(name);
      });

      // Legacy variables for backward compatibility
      root.style.setProperty('--brand-primary', branding.primaryColor);
      root.style.setProperty('--brand-primary-rgb', hexToRgb(branding.primaryColor));
      root.style.setProperty('--brand-primary-contrast', getContrastColor(branding.primaryColor));
      appliedVariables.push('--brand-primary', '--brand-primary-rgb', '--brand-primary-contrast');
    }

    // Secondary color (fallback to palette 100)
    if (branding.secondaryColor) {
      root.style.setProperty('--brand-secondary', branding.secondaryColor);
      root.style.setProperty('--brand-secondary-rgb', hexToRgb(branding.secondaryColor));
      appliedVariables.push('--brand-secondary', '--brand-secondary-rgb');
    } else if (branding.primaryColor) {
      const palette = generatePalette(branding.primaryColor);
      root.style.setProperty('--brand-secondary', palette[100]);
      root.style.setProperty('--brand-secondary-rgb', hexToRgb(palette[100]));
      appliedVariables.push('--brand-secondary', '--brand-secondary-rgb');
    }

    // Accent color (fallback to palette 400)
    if (branding.accentColor) {
      root.style.setProperty('--brand-accent', branding.accentColor);
      root.style.setProperty('--brand-accent-rgb', hexToRgb(branding.accentColor));
      appliedVariables.push('--brand-accent', '--brand-accent-rgb');
    } else if (branding.primaryColor) {
      const palette = generatePalette(branding.primaryColor);
      root.style.setProperty('--brand-accent', palette[400]);
      root.style.setProperty('--brand-accent-rgb', hexToRgb(palette[400]));
      appliedVariables.push('--brand-accent', '--brand-accent-rgb');
    }

    // Cleanup on unmount (reset to defaults)
    return () => {
      appliedVariables.forEach((name) => {
        root.style.removeProperty(name);
      });
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
