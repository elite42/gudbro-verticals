/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class', // Enable dark mode with class strategy
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
        // Legacy colors (kept for backward compatibility during migration)
        primary: '#f6bc26',
        secondary: '#0170B9',
        accent: '#3a3a3a',
      },
      animation: {
        'bounce-once': 'bounce 0.5s ease-in-out 1',
        'toast-slide-up': 'toast-slide 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'fade-in': 'fade-in 0.2s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
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
        'slide-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
