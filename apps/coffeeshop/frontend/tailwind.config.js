/* global require, module */
/* eslint-disable @typescript-eslint/no-require-imports */
const sharedPreset = require('../../../shared/config/tailwind.preset');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedPreset],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    '../../../shared/ui/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Coffeeshop uses nested 'theme' namespace (theme.bg, theme.text, etc.)
        // while the shared preset uses 'theme-bg', 'theme-text' flat namespace.
        // Keep coffeeshop's nested structure for backward compatibility.
        theme: {
          bg: {
            primary: 'var(--color-bg-primary)',
            secondary: 'var(--color-bg-secondary)',
            tertiary: 'var(--color-bg-tertiary)',
            elevated: 'var(--color-bg-elevated)',
          },
          text: {
            primary: 'var(--color-text-primary)',
            secondary: 'var(--color-text-secondary)',
            tertiary: 'var(--color-text-tertiary)',
            inverse: 'var(--color-text-inverse)',
          },
          border: {
            light: 'var(--color-border-light)',
            medium: 'var(--color-border-medium)',
            heavy: 'var(--color-border-heavy)',
          },
          interactive: {
            primary: 'var(--color-interactive-primary)',
            'primary-hover': 'var(--color-interactive-primary-hover)',
            secondary: 'var(--color-interactive-secondary)',
            'secondary-hover': 'var(--color-interactive-secondary-hover)',
            danger: 'var(--color-interactive-danger)',
            'danger-hover': 'var(--color-interactive-danger-hover)',
            success: 'var(--color-interactive-success)',
            warning: 'var(--color-interactive-warning)',
          },
          status: {
            favorite: 'var(--color-status-favorite)',
            badge: 'var(--color-status-badge)',
            highlight: 'var(--color-status-highlight)',
          },
          brand: {
            primary: 'var(--color-brand-primary)',
            'primary-hover': 'var(--color-brand-primary-hover)',
            secondary: 'var(--color-brand-secondary)',
            accent: 'var(--color-brand-accent)',
          },
        },
        // Legacy colors (kept for backward compatibility during migration)
        primary: '#f6bc26',
        secondary: '#0170B9',
        accent: '#3a3a3a',
      },
      animation: {
        // Coffeeshop-specific animations not in the shared preset
        'toast-slide-up': 'toast-slide 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
      },
      keyframes: {
        'toast-slide': {
          '0%': { transform: 'translate(-50%, 20px)', opacity: '0' },
          '100%': { transform: 'translate(-50%, 0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '800px', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
