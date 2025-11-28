import Link from 'next/link';
import { Card } from '@/components/ui/card';

export default function DesignSystemPage() {
  const sections = [
    {
      title: '🎨 Brand Foundations',
      description: 'Colors, typography, spacing scale, and core brand assets',
      href: '/design-system/brand',
      stats: '12 color tokens · 6 font sizes · 8 spacing values',
      status: 'Coming Soon',
    },
    {
      title: '🧩 Components',
      description: 'Complete UI component library with variants and examples',
      href: '/design-system/components',
      stats: '5 components · 25+ variants · Type-safe',
      status: 'Coming Soon',
    },
    {
      title: '🛡️ Safety System',
      description: 'Allergen, intolerance, and dietary restriction filters',
      href: '/design-system/safety',
      stats: '46 SVG icons · 11 diets · 30 allergens',
      status: 'Ready',
    },
    {
      title: '🍽️ Product Library',
      description: 'Centralized database of menu items with photos and recipes',
      href: '/design-system/products',
      stats: '0 products · Multi-language · Auto-compute safety',
      status: 'In Progress',
    },
  ];

  return (
    <div>
      {/* Hero */}
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          GUDBRO Design System Hub
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl">
          Your single source of truth for brand guidelines, UI components, and product data.
          Built for designers, developers, and product teams.
        </p>
      </div>

      {/* Stats - GUDBRO Brand Colors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
        <Card padding="lg" className="text-center bg-gradient-to-br from-[#cd0931] to-[#a00727]">
          <div className="text-3xl font-bold text-white mb-1">46</div>
          <div className="text-sm text-white/90">SVG Icons</div>
        </Card>
        <Card padding="lg" className="text-center bg-gradient-to-br from-[#f8ad16] to-[#f88d16]">
          <div className="text-3xl font-bold text-black mb-1">5</div>
          <div className="text-sm text-black/90">Components</div>
        </Card>
        <Card padding="lg" className="text-center bg-gradient-to-br from-[#0931cd] to-[#072399]">
          <div className="text-3xl font-bold text-white mb-1">0</div>
          <div className="text-sm text-white/90">Products</div>
        </Card>
        <Card padding="lg" className="text-center bg-gradient-to-br from-[#333333] to-[#000000]">
          <div className="text-3xl font-bold text-white mb-1">3</div>
          <div className="text-sm text-white/90">Languages</div>
        </Card>
      </div>

      {/* Sections Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Explore Sections</h2>

        {sections.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card
              variant="interactive"
              padding="lg"
              className="bg-white border border-gray-200 transition-all hover:shadow-lg border-l-4 hover:border-l-[#cd0931]"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900">
                      {section.title}
                    </h3>
                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                      section.status === 'Ready'
                        ? 'bg-[#f8ad16] text-black'
                        : section.status === 'In Progress'
                        ? 'bg-[#0931cd] text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {section.status}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3 text-base">{section.description}</p>
                  <p className="text-sm text-gray-500 font-medium">{section.stats}</p>
                </div>
                <div className="text-[#cd0931] opacity-50 hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions - GUDBRO Brand Colors */}
      <div className="mt-12 p-4 md:p-6 bg-gradient-to-r from-[#f2f2f2] to-white border-2 border-[#cd0931]/20 rounded-xl">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <Link
            href="/design-system/products/create"
            className="px-6 py-3 bg-gradient-to-r from-[#cd0931] to-[#a00727] text-white rounded-lg hover:shadow-lg transition-all font-semibold text-center"
          >
            + Add Product
          </Link>
          <Link
            href="/design-system/safety"
            className="px-6 py-3 bg-gradient-to-r from-[#f8ad16] to-[#f88d16] text-black rounded-lg hover:shadow-lg transition-all font-semibold text-center"
          >
            View Safety Icons
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          💡 <strong>Tip:</strong> This is an internal tool. All data is stored locally and not exposed to end users.
        </p>
      </div>
    </div>
  );
}
