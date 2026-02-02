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
  theme: {
    extend: {
      colors: {
        primary: '#E85D04',
        secondary: '#1B2A4A',
        accent: '#FFB800',
      },
    },
  },
  plugins: [],
};
