import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Tools for Restaurants & Hospitality | GUDBRO',
  description: 'Free tools to help your restaurant save money and improve operations. QR Code Generator, Savings Calculator, Allergen Checker and more.',
};

const tools = [
  {
    name: 'QR Code Generator',
    description: 'Create beautiful QR codes for your menus, WiFi, payments and more. 19 types supported including VietQR, WeChat Pay, and AI Artistic QR.',
    icon: '📱',
    href: '/tools/qr-generator',
    features: ['19 QR Types', 'AI Artistic QR', 'Dynamic URLs', 'Analytics'],
    badge: 'Most Popular',
    badgeColor: 'bg-orange-100 text-orange-800',
  },
  {
    name: 'Savings Calculator',
    description: 'Calculate how much your restaurant can save by switching to digital menus. See ROI in real-time with our interactive calculator.',
    icon: '💰',
    href: '/tools/savings-calculator',
    features: ['ROI Calculator', 'Multi-Currency', 'Print Cost Analysis', 'Staff Time Savings'],
    badge: 'New',
    badgeColor: 'bg-green-100 text-green-800',
  },
  {
    name: 'Allergen Checker',
    description: 'Check your menu items against 30 allergens and ensure compliance with EU, USA, Japan, Korea and 50+ country regulations.',
    icon: '🔍',
    href: '/tools/allergen-checker',
    features: ['30 Allergens', '50+ Countries', 'EU Compliant', 'Instant Results'],
    badge: 'Coming Soon',
    badgeColor: 'bg-gray-100 text-gray-600',
  },
  {
    name: 'Menu Cost Calculator',
    description: 'Calculate the true cost of your menu items including ingredients, labor, and overhead. Optimize pricing for maximum profit.',
    icon: '📊',
    href: '/tools/menu-cost-calculator',
    features: ['Ingredient Costs', 'Labor Analysis', 'Profit Margins', 'Price Suggestions'],
    badge: 'Coming Soon',
    badgeColor: 'bg-gray-100 text-gray-600',
  },
];

const stats = [
  { value: '70%', label: 'of customers prefer digital menus', source: 'Tableo 2025' },
  { value: '+22%', label: 'increase in average order value', source: 'ComQI 2023' },
  { value: '<30 days', label: 'payback period for digital menus', source: 'Industry Average' },
  { value: '50+', label: 'countries with allergen compliance', source: 'GUDBRO Database' },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block bg-orange-500/20 text-orange-300 text-sm font-medium px-4 py-1 rounded-full mb-6">
                100% Free Tools
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Free Tools for Smarter
                <span className="text-orange-400"> Restaurant Operations</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Save money, improve compliance, and make data-driven decisions with our free suite of tools designed specifically for restaurants and hospitality businesses.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/tools/savings-calculator"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  Calculate Your Savings
                </Link>
                <Link
                  href="/tools/qr-generator"
                  className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-colors"
                >
                  Try QR Generator
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.source}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tools Grid */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Free Tools</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                No sign-up required. No credit card. Just powerful tools to help your business thrive.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {tools.map((tool) => (
                <Link
                  key={tool.name}
                  href={tool.href}
                  className="group bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-orange-200 transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{tool.icon}</span>
                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${tool.badgeColor}`}>
                      {tool.badge}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{tool.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature) => (
                      <span
                        key={feature}
                        className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="mt-4 flex items-center text-orange-600 font-medium text-sm">
                    {tool.badge === 'Coming Soon' ? (
                      <span className="text-gray-400">Coming Soon</span>
                    ) : (
                      <>
                        Try it free
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-br from-orange-500 to-red-600 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Start with our free tools, then upgrade to GUDBRO Pro for the complete digital menu experience with allergen compliance, nutrition data, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/sign-up"
                className="bg-white text-orange-600 px-8 py-3 rounded-full font-medium hover:bg-orange-50 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/demo"
                className="bg-white/20 text-white px-8 py-3 rounded-full font-medium hover:bg-white/30 transition-colors"
              >
                See Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
