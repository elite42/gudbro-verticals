'use client'

import { Badge } from '@/components/ui/badge'
import { SpicyLevel } from '@/components/ui/spicy-level'
import { SafetyBadge, SafetyBadgeList } from '@/components/ui/safety-badge'
import { safetyFilters } from '../../../../../shared/database/safety-filters'
import { useState } from 'react'

export default function DesignPreviewPage() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Organize filters by type
  const allergens = safetyFilters.filter(f => f.type === 'allergen')
  const intolerances = safetyFilters.filter(f => f.type === 'intolerance')
  const diets = safetyFilters.filter(f => f.type === 'diet')

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <div className="container mx-auto px-4 py-12 max-w-7xl">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              GUDBRO Safety Badge Design System
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
              Complete preview of 46 safety filters with glassmorphism effects from Antigravity
            </p>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              Toggle {theme === 'light' ? 'Dark' : 'Light'} Theme
            </button>
          </div>

          {/* NEW AI-GENERATED ICONS SHOWCASE */}
          <section className="mb-16 p-8 bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900 dark:to-blue-900 rounded-2xl border-4 border-green-500 dark:border-green-400 shadow-2xl">
            <div className="mb-6 text-center">
              <div className="inline-block px-6 py-3 bg-green-500 dark:bg-green-600 text-white font-bold rounded-lg mb-4 shadow-lg">
                🤖 NEW: AI-GENERATED ICONS (NanoBanana Pro)
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                6 New Professional SVG Icons Created by AI
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                Shellfish, Squid, Shrimp, Crab, Soy, Sulphites - Generated 2025-11-23
              </p>
              <p className="text-sm text-green-700 dark:text-green-300 font-semibold">
                Style-matched to Erudus Icons | Automatic Red coloring (allergen category)
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border-2 border-green-200 dark:border-green-700">
                <SafetyBadge filterId="shellfish" iconType="svg" showText={false} size="lg" />
                <p className="mt-4 font-semibold text-gray-900 dark:text-white">Shellfish</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">circle-shellfish.svg</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border-2 border-green-200 dark:border-green-700">
                <SafetyBadge filterId="squid" iconType="svg" showText={false} size="lg" />
                <p className="mt-4 font-semibold text-gray-900 dark:text-white">Squid</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">circle-squid.svg</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border-2 border-green-200 dark:border-green-700">
                <SafetyBadge filterId="shrimp" iconType="svg" showText={false} size="lg" />
                <p className="mt-4 font-semibold text-gray-900 dark:text-white">Shrimp</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">circle-shrimp.svg</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border-2 border-green-200 dark:border-green-700">
                <SafetyBadge filterId="crab" iconType="svg" showText={false} size="lg" />
                <p className="mt-4 font-semibold text-gray-900 dark:text-white">Crab</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">circle-crab.svg</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border-2 border-green-200 dark:border-green-700">
                <SafetyBadge filterId="soy" iconType="svg" showText={false} size="lg" />
                <p className="mt-4 font-semibold text-gray-900 dark:text-white">Soy</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">circle-soy.svg</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center border-2 border-green-200 dark:border-green-700">
                <SafetyBadge filterId="sulphites" iconType="svg" showText={false} size="lg" />
                <p className="mt-4 font-semibold text-gray-900 dark:text-white">Sulphites</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">circle-sulphites.svg</p>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                How They Look in Real Usage (with text labels):
              </h3>
              <div className="flex flex-wrap gap-3">
                <SafetyBadge filterId="shellfish" iconType="svg" showText variant="glassmorphism" />
                <SafetyBadge filterId="squid" iconType="svg" showText variant="glassmorphism" />
                <SafetyBadge filterId="shrimp" iconType="svg" showText variant="glassmorphism" />
                <SafetyBadge filterId="crab" iconType="svg" showText variant="glassmorphism" />
                <SafetyBadge filterId="soy" iconType="svg" showText variant="glassmorphism" />
                <SafetyBadge filterId="sulphites" iconType="svg" showText variant="glassmorphism" />
              </div>
            </div>
          </section>

          {/* MANUALLY CREATED ICON SHOWCASE */}
          <section className="mb-16 p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:to-pink-900 rounded-2xl border-4 border-purple-500 dark:border-purple-400 shadow-2xl">
            <div className="mb-6 text-center">
              <div className="inline-block px-6 py-3 bg-purple-500 dark:bg-purple-600 text-white font-bold rounded-lg mb-4 shadow-lg">
                ✏️ MANUALLY CREATED ICON
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Low-Carb Diet Icon - Handcrafted SVG
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                Avocado design matching Erudus style - Created 2025-11-23
              </p>
              <p className="text-sm text-purple-700 dark:text-purple-300 font-semibold">
                Style-matched to Erudus Icons | Automatic Green coloring (diet category)
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center border-2 border-purple-200 dark:border-purple-700">
                <SafetyBadge filterId="low-carb" iconType="svg" showText={false} size="lg" />
                <p className="mt-4 font-semibold text-gray-900 dark:text-white text-xl">Low Carb</p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">circle-low-carb.svg</p>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 italic">
                  Avocado symbol represents healthy fats in low-carb diets
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                  Real Usage Example:
                </h3>
                <div className="flex flex-wrap gap-3 mb-4">
                  <SafetyBadge filterId="low-carb" iconType="svg" showText variant="glassmorphism" />
                </div>
                <div className="mt-4 p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Why this matters:</strong> Completes 46/46 filter coverage with professional SVG icons.
                    The avocado represents healthy fats commonly consumed in low-carb/keto diets.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-purple-200 dark:border-purple-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                📊 Icon Coverage Status: COMPLETE
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">39</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Erudus Icons (MIT)</p>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">6</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">NanoBanana AI Icons</p>
                </div>
                <div className="p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">1</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Manually Created</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-gradient-to-r from-green-100 to-purple-100 dark:from-green-900/30 dark:to-purple-900/30 rounded-lg">
                <p className="text-center font-bold text-xl text-gray-900 dark:text-white">
                  ✅ Total: 46/46 Filters with Professional SVG Icons
                </p>
              </div>
            </div>
          </section>

          {/* Icon Type Comparison - VISUAL TEST */}
          <section className="mb-16 p-8 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-4 border-yellow-400 dark:border-yellow-600">
            <div className="mb-6 text-center">
              <div className="inline-block px-4 py-2 bg-yellow-400 dark:bg-yellow-600 text-gray-900 dark:text-white font-bold rounded-lg mb-4">
                🧪 VISUAL COMPARISON TEST
              </div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                Icon Type Comparison: Emoji vs SVG vs Text-Only
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Choose which icon style looks best for your menu
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Emoji Icons */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    😀 Emoji Icons
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Pros: Colorful, familiar, no downloads needed
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cons: Inconsistent across devices, varying sizes
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Sample Allergens</p>
                    <SafetyBadgeList
                      filterIds={['gluten', 'peanuts', 'milk', 'eggs']}
                      iconType="emoji"
                      showText={true}
                      size="md"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Sample Diets</p>
                    <SafetyBadgeList
                      filterIds={['vegan', 'vegetarian', 'halal']}
                      iconType="emoji"
                      showText={true}
                      size="md"
                    />
                  </div>
                </div>
              </div>

              {/* SVG Icons COLORED */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-4 border-green-400 dark:border-green-600 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-green-400 dark:bg-green-600 text-gray-900 dark:text-white text-sm font-bold rounded-full">
                  ⭐ RECOMMENDED ⭐
                </div>
                <div className="mb-4 mt-2">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    🎨 Professional Colored SVG Icons
                  </h3>
                  <p className="text-sm text-green-600 dark:text-green-400 mb-2 font-semibold">
                    Pros: Colorful, consistent, professional, instant recognition
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Source: Erudus Icons (MIT Licensed) + CSS Coloring
                  </p>
                  <div className="flex gap-2 text-xs mt-2">
                    <span className="px-2 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded">🔴 Red = Allergens</span>
                    <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900 text-amber-700 dark:text-amber-300 rounded">🟡 Amber = Intolerances</span>
                    <span className="px-2 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 rounded">🟢 Green = Diets</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Sample Allergens (Red)</p>
                    <SafetyBadgeList
                      filterIds={['gluten', 'peanuts', 'milk', 'eggs']}
                      iconType="svg"
                      showText={true}
                      size="md"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Sample Diets (Green)</p>
                    <SafetyBadgeList
                      filterIds={['vegan', 'vegetarian', 'halal']}
                      iconType="svg"
                      showText={true}
                      size="md"
                    />
                  </div>
                </div>
              </div>

              {/* Text-Only */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700">
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    📝 Text-Only
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Pros: Maximum accessibility, always readable
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Cons: Less visual, more text-heavy
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Sample Allergens</p>
                    <SafetyBadgeList
                      filterIds={['gluten', 'peanuts', 'milk', 'eggs']}
                      iconType="none"
                      showText={true}
                      size="md"
                    />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">Sample Diets</p>
                    <SafetyBadgeList
                      filterIds={['vegan', 'vegetarian', 'halal']}
                      iconType="none"
                      showText={true}
                      size="md"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Real-World Example Comparison */}
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                Real-World Menu Item Comparison
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Emoji Example */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Emoji Style</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Pad Thai</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Traditional Thai stir-fried noodles with peanuts and lime
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Contains:</p>
                    <SafetyBadgeList
                      filterIds={['peanuts', 'eggs', 'fish', 'soy']}
                      iconType="emoji"
                      showText={true}
                      size="sm"
                    />
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Spice Level:</p>
                      <SpicyLevel level={2} variant="chili" size="sm" />
                    </div>
                  </div>
                </div>

                {/* SVG Colored Example */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border-2 border-green-400 dark:border-green-600">
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-green-600 dark:text-green-400">⭐ Colored SVG Style ⭐</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Pad Thai</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Traditional Thai stir-fried noodles with peanuts and lime
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Contains (allergens in red):</p>
                    <SafetyBadgeList
                      filterIds={['peanuts', 'eggs', 'fish', 'soy']}
                      iconType="svg"
                      showText={true}
                      size="sm"
                    />
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Spice Level:</p>
                      <SpicyLevel level={2} variant="chili" size="sm" />
                    </div>
                  </div>
                </div>

                {/* Text-Only Example */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-gray-500 dark:text-gray-400">Text-Only Style</span>
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Pad Thai</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    Traditional Thai stir-fried noodles with peanuts and lime
                  </p>
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400">Contains:</p>
                    <SafetyBadgeList
                      filterIds={['peanuts', 'eggs', 'fish', 'soy']}
                      iconType="none"
                      showText={true}
                      size="sm"
                    />
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">Spice Level:</p>
                      <SpicyLevel level={2} variant="chili" size="sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Badge Variants Showcase */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-4">
              Badge Variants
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Glassmorphism (Featured) */}
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Glassmorphism ⭐
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="glassmorphism" size="sm">🌾 Gluten</Badge>
                  <Badge variant="glassmorphism" size="md">🥛 Lactose</Badge>
                  <Badge variant="glassmorphism" size="lg">🌱 Vegan</Badge>
                </div>
              </div>

              {/* Success */}
              <div className="bg-green-50 dark:bg-gray-800 p-6 rounded-xl border border-green-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Success
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="success" size="sm">Available</Badge>
                  <Badge variant="success" size="md">🥗 Safe</Badge>
                  <Badge variant="success" size="lg">✅ Approved</Badge>
                </div>
              </div>

              {/* Warning */}
              <div className="bg-yellow-50 dark:bg-gray-800 p-6 rounded-xl border border-yellow-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Warning
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="warning" size="sm">Attention</Badge>
                  <Badge variant="warning" size="md">🌶️ Spicy</Badge>
                  <Badge variant="warning" size="lg">⚠️ Caution</Badge>
                </div>
              </div>

              {/* Error */}
              <div className="bg-red-50 dark:bg-gray-800 p-6 rounded-xl border border-red-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Error
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="error" size="sm">Unavailable</Badge>
                  <Badge variant="error" size="md">🚫 Allergen</Badge>
                  <Badge variant="error" size="lg">❌ Contains</Badge>
                </div>
              </div>

              {/* Info */}
              <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Info
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="info" size="sm">New</Badge>
                  <Badge variant="info" size="md">🔥 340 kcal</Badge>
                  <Badge variant="info" size="lg">ℹ️ Info</Badge>
                </div>
              </div>

              {/* Primary */}
              <div className="bg-purple-50 dark:bg-gray-800 p-6 rounded-xl border border-purple-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Primary
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="primary" size="sm">Featured</Badge>
                  <Badge variant="primary" size="md">⭐ Premium</Badge>
                  <Badge variant="primary" size="lg">🎯 Highlight</Badge>
                </div>
              </div>

              {/* Outline */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Outline
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" size="sm">Outlined</Badge>
                  <Badge variant="outline" size="md">🍃 Light</Badge>
                  <Badge variant="outline" size="lg">📝 Border</Badge>
                </div>
              </div>

              {/* Default */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                  Default
                </h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default" size="sm">Default</Badge>
                  <Badge variant="default" size="md">🏷️ Tag</Badge>
                  <Badge variant="default" size="lg">📌 Label</Badge>
                </div>
              </div>
            </div>
          </section>

          {/* Spicy Level Indicator */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-4">
              Spicy Level Indicator
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Chili Variant */}
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border-2 border-red-200 dark:border-red-900">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  🌶️ Chili Peppers (Default)
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Not Spicy:</span>
                    <SpicyLevel level={0} variant="chili" size="md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Level 1:</span>
                    <SpicyLevel level={1} variant="chili" size="md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Level 2:</span>
                    <SpicyLevel level={2} variant="chili" size="md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Level 3:</span>
                    <SpicyLevel level={3} variant="chili" size="md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Level 4:</span>
                    <SpicyLevel level={4} variant="chili" size="md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Level 5:</span>
                    <SpicyLevel level={5} variant="chili" size="md" />
                  </div>
                </div>

                {/* Size Examples */}
                <div className="mt-8 pt-6 border-t border-red-200 dark:border-red-900">
                  <h4 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">Sizes</h4>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <SpicyLevel level={3} variant="chili" size="sm" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Small</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <SpicyLevel level={3} variant="chili" size="md" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Medium</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <SpicyLevel level={3} variant="chili" size="lg" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Large</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flame Variant */}
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border-2 border-orange-200 dark:border-orange-900">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  🔥 Flames
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Not Spicy:</span>
                    <SpicyLevel level={0} variant="flame" size="md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Level 1:</span>
                    <SpicyLevel level={1} variant="flame" size="md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Level 2:</span>
                    <SpicyLevel level={2} variant="flame" size="md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Level 3:</span>
                    <SpicyLevel level={3} variant="flame" size="md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Level 4:</span>
                    <SpicyLevel level={4} variant="flame" size="md" />
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 w-24">Level 5:</span>
                    <SpicyLevel level={5} variant="flame" size="md" />
                  </div>
                </div>

                {/* Size Examples */}
                <div className="mt-8 pt-6 border-t border-orange-200 dark:border-orange-900">
                  <h4 className="text-sm font-semibold mb-4 text-gray-700 dark:text-gray-300">Sizes</h4>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                      <SpicyLevel level={3} variant="flame" size="sm" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Small</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <SpicyLevel level={3} variant="flame" size="md" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Medium</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <SpicyLevel level={3} variant="flame" size="lg" />
                      <span className="text-xs text-gray-600 dark:text-gray-400">Large</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Example */}
            <div className="mt-8 bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-200 dark:border-gray-700">
              <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
                💡 Usage Example: On Menu Item
              </h3>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Thai Green Curry</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">Aromatic curry with vegetables and coconut milk</p>
                <div className="flex items-center gap-2">
                  <SpicyLevel level={4} variant="chili" size="md" />
                  <span className="text-xs text-gray-500 dark:text-gray-400">(Very Spicy)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Safety Badge Components */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white border-b-2 border-gray-200 dark:border-gray-700 pb-4">
              Safety Badge Components
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* SafetyBadge Individual */}
              <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border-2 border-green-200 dark:border-green-900">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Individual Safety Badges
                </h3>
                <div className="space-y-6">
                  {/* Icon + Text (Default) */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Icon + Text (Default)</h4>
                    <div className="flex flex-wrap gap-2">
                      <SafetyBadge filterId="gluten" showIcon showText />
                      <SafetyBadge filterId="lactose" showIcon showText />
                      <SafetyBadge filterId="vegan" showIcon showText />
                    </div>
                  </div>

                  {/* Icon Only */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Icon Only (Compact)</h4>
                    <div className="flex flex-wrap gap-2">
                      <SafetyBadge filterId="gluten" showIcon showText={false} />
                      <SafetyBadge filterId="lactose" showIcon showText={false} />
                      <SafetyBadge filterId="vegan" showIcon showText={false} />
                      <SafetyBadge filterId="halal" showIcon showText={false} />
                      <SafetyBadge filterId="peanuts" showIcon showText={false} />
                    </div>
                  </div>

                  {/* Text Only (Accessibility) */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Text Only (Accessibility)</h4>
                    <div className="flex flex-wrap gap-2">
                      <SafetyBadge filterId="gluten" showIcon={false} showText />
                      <SafetyBadge filterId="lactose" showIcon={false} showText />
                      <SafetyBadge filterId="vegan" showIcon={false} showText />
                    </div>
                  </div>

                  {/* Multi-Language */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Multi-Language Support</h4>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-20">English:</span>
                        <SafetyBadge filterId="gluten" language="en" showIcon showText />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-20">Italian:</span>
                        <SafetyBadge filterId="gluten" language="it" showIcon showText />
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs text-gray-600 dark:text-gray-400 w-20">Vietnamese:</span>
                        <SafetyBadge filterId="gluten" language="vi" showIcon showText />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SafetyBadgeList */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border-2 border-purple-200 dark:border-purple-900">
                <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">
                  Badge Lists
                </h3>
                <div className="space-y-6">
                  {/* Common Allergens */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Common Allergens</h4>
                    <SafetyBadgeList
                      filterIds={['gluten', 'milk', 'eggs', 'nuts', 'peanuts']}
                      showIcon
                      showText
                    />
                  </div>

                  {/* Dietary Preferences */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Dietary Preferences</h4>
                    <SafetyBadgeList
                      filterIds={['vegan', 'vegetarian', 'halal', 'low-carb']}
                      showIcon
                      showText
                    />
                  </div>

                  {/* Compact (Icon Only) */}
                  <div>
                    <h4 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">Compact List (Icon Only)</h4>
                    <SafetyBadgeList
                      filterIds={['gluten', 'lactose', 'vegan', 'halal', 'peanuts', 'soy', 'fish']}
                      showIcon
                      showText={false}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Real-World Example */}
            <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl border-2 border-blue-200 dark:border-blue-900">
              <h3 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                🍝 Real-World Example: Menu Item Card
              </h3>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl border border-gray-200 dark:border-gray-700 max-w-md">
                <h4 className="font-bold text-xl mb-2 text-gray-900 dark:text-white">Pad Thai</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  Traditional Thai stir-fried rice noodles with peanuts, bean sprouts, and lime
                </p>

                {/* Dietary Info */}
                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Contains:</p>
                    <SafetyBadgeList
                      filterIds={['peanuts', 'eggs', 'fish', 'soy']}
                      showIcon
                      showText
                      size="sm"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Suitable for:</p>
                    <SafetyBadgeList
                      filterIds={['halal']}
                      showIcon
                      showText
                      size="sm"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">Spice Level:</p>
                    <SpicyLevel level={2} variant="chili" size="md" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Safety Filters - Allergens */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Level 1: Allergens ({allergens.length})
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 border-b-2 border-red-200 dark:border-red-900 pb-4">
              Life or Death (Legal Compliance) - 90+ Countries Coverage
            </p>

            <div className="bg-red-50 dark:bg-gray-800 p-8 rounded-2xl border-2 border-red-200 dark:border-red-900">
              <div className="flex flex-wrap gap-3">
                {allergens.map((filter) => (
                  <Badge key={filter.id} variant="glassmorphism" size="md">
                    {filter.icon} {filter.label.en}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          {/* Safety Filters - Intolerances */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Level 2: Intolerances ({intolerances.length})
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 border-b-2 border-orange-200 dark:border-orange-900 pb-4">
              Comfort & Wellness (Health) - Unique in Market
            </p>

            <div className="bg-orange-50 dark:bg-gray-800 p-8 rounded-2xl border-2 border-orange-200 dark:border-orange-900">
              <div className="flex flex-wrap gap-3">
                {intolerances.map((filter) => (
                  <Badge key={filter.id} variant="glassmorphism" size="md">
                    {filter.icon} {filter.label.en}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          {/* Safety Filters - Diets */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              Level 3: Diets ({diets.length})
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6 border-b-2 border-green-200 dark:border-green-900 pb-4">
              Culture & Lifestyle (Inclusivity) - Buddhist Diet Unique Feature
            </p>

            <div className="bg-green-50 dark:bg-gray-800 p-8 rounded-2xl border-2 border-green-200 dark:border-green-900">
              <div className="flex flex-wrap gap-3">
                {diets.map((filter) => (
                  <Badge key={filter.id} variant="glassmorphism" size="md">
                    {filter.icon} {filter.label.en}
                  </Badge>
                ))}
              </div>
            </div>
          </section>

          {/* Summary */}
          <section className="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-900 dark:to-purple-900 p-12 rounded-2xl text-white text-center">
            <h2 className="text-4xl font-bold mb-6">
              46 Safety Filters
            </h2>
            <p className="text-xl mb-8 opacity-90">
              3x Coverage vs Competitors | 99% Global Compliance
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-5xl font-bold mb-2">{allergens.length}</div>
                <div className="text-lg opacity-90">Allergens</div>
                <div className="text-sm opacity-75 mt-2">90+ Countries</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-5xl font-bold mb-2">{intolerances.length}</div>
                <div className="text-lg opacity-90">Intolerances</div>
                <div className="text-sm opacity-75 mt-2">Market Unique</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="text-5xl font-bold mb-2">{diets.length}</div>
                <div className="text-lg opacity-90">Diets</div>
                <div className="text-sm opacity-75 mt-2">Cultural Inclusivity</div>
              </div>
            </div>
          </section>

          {/* ========================================
              ALL 46 PROFESSIONAL SVG ICONS SHOWCASE
              ======================================== */}
          <section className="mb-16 p-8 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950 dark:to-purple-950 rounded-2xl border-4 border-indigo-500 dark:border-indigo-400 shadow-2xl">
            <div className="mb-8 text-center">
              <div className="inline-block px-6 py-3 bg-indigo-600 dark:bg-indigo-700 text-white font-bold rounded-lg mb-4 shadow-lg text-lg">
                ✨ ALL 46 PROFESSIONAL SVG ICONS ✨
              </div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
                Complete Safety Filter Icons Library
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
                Every icon rendered with professional SVG graphics + intelligent color coding
              </p>
              <div className="flex justify-center gap-3 flex-wrap mt-4">
                <span className="px-4 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 rounded-lg font-semibold">
                  🔴 30 Allergens (Red)
                </span>
                <span className="px-4 py-2 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 rounded-lg font-semibold">
                  🟡 10 Intolerances (Amber)
                </span>
                <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 rounded-lg font-semibold">
                  🟢 6 Diets (Green)
                </span>
              </div>
            </div>

            {/* ALLERGENS (30) - RED */}
            <div className="mb-10">
              <div className="bg-red-50 dark:bg-red-950/30 p-6 rounded-xl border-2 border-red-300 dark:border-red-800">
                <h3 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-4 flex items-center gap-2">
                  <span className="text-3xl">🔴</span> Allergens (30) - Life-Threatening
                </h3>
                <SafetyBadgeList
                  filterIds={[
                    'gluten', 'crustaceans', 'eggs', 'fish', 'peanuts', 'soy', 'milk', 'nuts',
                    'celery', 'mustard', 'sesame', 'sulphites', 'lupin', 'molluscs', 'shellfish',
                    'squid', 'shrimp', 'shrimp-paste', 'sesame-oil', 'peanut-oil', 'msg-allergen',
                    'buckwheat', 'wheat', 'mackerel', 'crab', 'pork-allergen', 'peach', 'tomato',
                    'chicken', 'beef'
                  ]}
                  iconType="svg"
                  showText
                  variant="glassmorphism"
                  size="md"
                />
              </div>
            </div>

            {/* INTOLERANCES (10) - AMBER */}
            <div className="mb-10">
              <div className="bg-amber-50 dark:bg-amber-950/30 p-6 rounded-xl border-2 border-amber-300 dark:border-amber-800">
                <h3 className="text-2xl font-bold text-amber-900 dark:text-amber-100 mb-4 flex items-center gap-2">
                  <span className="text-3xl">🟡</span> Intolerances (10) - Discomfort / Sensitivity
                </h3>
                <SafetyBadgeList
                  filterIds={[
                    'lactose', 'gluten-sensitivity', 'fodmap', 'histamine', 'fructose',
                    'caffeine', 'alcohol', 'msg-intolerance', 'sulphites-sensitivity', 'spiciness'
                  ]}
                  iconType="svg"
                  showText
                  variant="glassmorphism"
                  size="md"
                />
              </div>
            </div>

            {/* DIETS (6) - GREEN */}
            <div className="mb-6">
              <div className="bg-emerald-50 dark:bg-emerald-950/30 p-6 rounded-xl border-2 border-emerald-300 dark:border-emerald-800">
                <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-4 flex items-center gap-2">
                  <span className="text-3xl">🟢</span> Dietary Preferences (6) - Lifestyle Choice
                </h3>
                <SafetyBadgeList
                  filterIds={['vegan', 'vegetarian', 'halal', 'pork-free', 'buddhist', 'low-carb']}
                  iconType="svg"
                  showText
                  variant="glassmorphism"
                  size="md"
                />
              </div>
            </div>

            {/* STATS & INFO */}
            <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-indigo-200 dark:border-indigo-800 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                📊 Icon Library Statistics
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">46</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Total SVG Icons</div>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400">39</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Erudus Icons (MIT)</div>
                </div>
                <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/30 rounded-lg">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">6</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">AI Generated</div>
                </div>
                <div className="text-center p-4 bg-pink-50 dark:bg-pink-900/30 rounded-lg">
                  <div className="text-3xl font-bold text-pink-600 dark:text-pink-400">1</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Hand-Crafted</div>
                </div>
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-lg text-center">
                <p className="font-bold text-lg text-gray-900 dark:text-white">
                  ✅ 100% Coverage - All 46 Safety Filters Have Professional SVG Icons
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                  Intelligent color coding: Red (Danger) • Amber (Caution) • Green (Preference)
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
            <p className="text-sm">
              Enhanced with glassmorphism effects from Antigravity Google | GUDBRO Safety & Cultural Dining Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
