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
        primary: '#2D9F83',
        secondary: '#5BB5A2',
        accent: '#E8A838',
      },
    },
  },
  plugins: [],
};
