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
        primary: '#4A90D9',
        secondary: '#38B2AC',
        accent: '#D69E2E',
      },
    },
  },
  plugins: [],
};
