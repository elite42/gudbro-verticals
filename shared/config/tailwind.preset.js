/* global module */
/**
 * @gudbro/config - Shared Tailwind CSS Preset
 *
 * Provides shared design tokens (colors, animations, keyframes) for all PWA apps.
 * Each app uses this as a preset and defines its own content paths and CSS variables.
 *
 * Usage in app tailwind.config:
 *   presets: [require('../../shared/config/tailwind.preset.js')]
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        // Semantic background tokens -- each app defines these CSS variables
        'theme-bg': {
          primary: 'var(--color-bg-primary)',
          secondary: 'var(--color-bg-secondary)',
          tertiary: 'var(--color-bg-tertiary)',
          elevated: 'var(--color-bg-elevated)',
        },
        // Semantic text tokens
        'theme-text': {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          tertiary: 'var(--color-text-tertiary)',
          inverse: 'var(--color-text-inverse)',
        },
        // Semantic border tokens
        'theme-border': {
          light: 'var(--color-border-light)',
          medium: 'var(--color-border-medium)',
          heavy: 'var(--color-border-heavy)',
        },
        // Interactive element tokens
        'theme-interactive': {
          primary: 'var(--color-interactive-primary)',
          'primary-hover': 'var(--color-interactive-primary-hover)',
          secondary: 'var(--color-interactive-secondary)',
          'secondary-hover': 'var(--color-interactive-secondary-hover)',
          danger: 'var(--color-interactive-danger)',
          success: 'var(--color-interactive-success)',
          warning: 'var(--color-interactive-warning)',
        },
      },
      animation: {
        'bounce-once': 'bounce 0.5s ease-in-out 1',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
};
