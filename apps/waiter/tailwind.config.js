/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Theme system colors using CSS variables
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
        // Waiter-specific colors
        waiter: {
          primary: '#3B82F6', // Blue - professional, trust
          secondary: '#10B981', // Green - success, completion
          urgent: '#EF4444', // Red - urgent requests
          warning: '#F59E0B', // Amber - attention needed
        },
      },
      animation: {
        'bounce-once': 'bounce 0.5s ease-in-out 1',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
      },
      keyframes: {
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { maxHeight: '0', opacity: '0' },
          '100%': { maxHeight: '800px', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      // Thumb-friendly touch targets
      spacing: {
        'touch': '44px', // WCAG minimum touch target
        'touch-lg': '56px', // Comfortable touch target
      },
    },
  },
  plugins: [],
}
