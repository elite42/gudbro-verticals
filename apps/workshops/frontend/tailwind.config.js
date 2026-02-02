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
        primary: '#C2703E',
        secondary: '#D4A04A',
        accent: '#7A8B6F',
      },
    },
  },
  plugins: [],
};
