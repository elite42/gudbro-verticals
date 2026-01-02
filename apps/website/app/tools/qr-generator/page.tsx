import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free QR Code Generator - 19 Types Including AI Artistic QR | GUDBRO',
  description: 'Create free QR codes for menus, WiFi, payments, and more. 19 types including VietQR, WeChat Pay, Zalo, KakaoTalk. AI Artistic QR for beautiful branded codes.',
};

const qrTypes = [
  {
    category: 'Standard',
    types: [
      { name: 'URL', icon: '🔗', description: 'Link to any website or webpage' },
      { name: 'WiFi', icon: '📶', description: 'Auto-connect guests to your network' },
      { name: 'vCard', icon: '👤', description: 'Share contact information instantly' },
      { name: 'Email', icon: '📧', description: 'Pre-filled email with subject and body' },
      { name: 'SMS', icon: '💬', description: 'Pre-filled text message' },
      { name: 'Event', icon: '📅', description: 'Calendar event with all details' },
      { name: 'Social', icon: '📱', description: 'Link to social media profiles' },
    ],
  },
  {
    category: 'Asia Payments',
    types: [
      { name: 'VietQR', icon: '🇻🇳', description: 'Vietnamese bank payment QR' },
      { name: 'WeChat Pay', icon: '💚', description: 'Chinese payment integration' },
      { name: 'Zalo', icon: '🔵', description: 'Vietnamese messaging app' },
      { name: 'KakaoTalk', icon: '🟡', description: 'Korean messaging platform' },
      { name: 'LINE', icon: '🟢', description: 'Japanese messaging app' },
    ],
  },
  {
    category: 'Media & Apps',
    types: [
      { name: 'PDF', icon: '📄', description: 'Link to PDF documents' },
      { name: 'Video', icon: '🎬', description: 'YouTube, Vimeo, or any video' },
      { name: 'Audio', icon: '🎵', description: 'Spotify, SoundCloud, podcasts' },
      { name: 'App Store', icon: '📲', description: 'iOS and Android app links' },
    ],
  },
  {
    category: 'Business',
    types: [
      { name: 'Multi-URL', icon: '🔀', description: 'Multiple links in one QR' },
      { name: 'Business Page', icon: '🏢', description: 'Mini landing page' },
      { name: 'Coupon', icon: '🎟️', description: 'Discount codes and offers' },
      { name: 'Feedback Form', icon: '⭐', description: 'Collect customer reviews' },
    ],
  },
];

const features = [
  {
    icon: '🎨',
    title: 'AI Artistic QR',
    description: 'Generate beautiful, branded QR codes with AI. Stand out with unique designs that match your brand.',
    badge: 'Premium',
  },
  {
    icon: '🔄',
    title: 'Dynamic QR Codes',
    description: 'Change the destination URL anytime without reprinting. Perfect for menus that change frequently.',
    badge: null,
  },
  {
    icon: '📊',
    title: 'Scan Analytics',
    description: 'Track every scan with detailed analytics. See when, where, and how often your QR codes are scanned.',
    badge: null,
  },
  {
    icon: '🌏',
    title: 'Asia-First',
    description: 'The only QR platform with native VietQR, WeChat Pay, Zalo, KakaoTalk, and LINE integration.',
    badge: 'Unique',
  },
];

export default function QRGeneratorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-4">
              <Link href="/tools" className="text-blue-200 hover:text-white text-sm">
                Tools
              </Link>
              <span className="text-blue-300">/</span>
              <span className="text-sm">QR Code Generator</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-6">
                  19 QR Code Types
                </span>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  The Most Powerful
                  <span className="text-blue-200"> QR Code Generator</span>
                </h1>
                <p className="text-xl text-blue-100 mb-8">
                  Create QR codes for menus, WiFi, payments, social media, and more. Including exclusive Asia payment integrations and AI-generated artistic QR codes.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://gudbro-qr-platform.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-indigo-600 px-6 py-3 rounded-full font-medium hover:bg-blue-50 transition-colors"
                  >
                    Launch QR Generator
                  </a>
                  <Link
                    href="#qr-types"
                    className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-full font-medium transition-colors"
                  >
                    See All 19 Types
                  </Link>
                </div>
              </div>
              <div className="hidden lg:flex justify-center">
                <div className="relative">
                  {/* Mock QR Code Display */}
                  <div className="bg-white rounded-3xl p-8 shadow-2xl">
                    <div className="w-48 h-48 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                      <span className="text-8xl">📱</span>
                    </div>
                    <p className="text-center text-gray-600 mt-4 font-medium">Scan to Preview</p>
                  </div>
                  {/* Floating badges */}
                  <div className="absolute -top-4 -right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    AI Artistic
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Dynamic URLs
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="bg-gray-50 rounded-2xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-3xl">{feature.icon}</span>
                    {feature.badge && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        feature.badge === 'Premium'
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-orange-100 text-orange-700'
                      }`}>
                        {feature.badge}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QR Types Section */}
        <section id="qr-types" className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">19 QR Code Types</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From simple URL codes to complex payment integrations, we support every type of QR code your business needs.
              </p>
            </div>

            <div className="space-y-12">
              {qrTypes.map((category) => (
                <div key={category.category}>
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    {category.category}
                    {category.category === 'Asia Payments' && (
                      <span className="bg-orange-100 text-orange-700 text-xs font-medium px-2 py-1 rounded-full">
                        Exclusive
                      </span>
                    )}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {category.types.map((type) => (
                      <div
                        key={type.name}
                        className="bg-white rounded-xl p-4 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all"
                      >
                        <span className="text-2xl block mb-2">{type.icon}</span>
                        <h4 className="font-medium text-gray-900 mb-1">{type.name}</h4>
                        <p className="text-xs text-gray-500">{type.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Artistic QR Section */}
        <section className="py-16 bg-gradient-to-br from-purple-600 to-pink-600 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-6">
                  Premium Feature
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  AI Artistic QR Codes
                </h2>
                <p className="text-xl text-purple-100 mb-6">
                  Generate stunning, branded QR codes that are works of art. Our AI creates unique designs that maintain perfect scannability while matching your brand aesthetic.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>3-tier device testing for readability</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Custom brand colors and styles</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Perfect for marketing materials</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Auto-retry if quality score below 70%</span>
                  </li>
                </ul>
                <a
                  href="https://gudbro-qr-platform.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
                >
                  Try AI Artistic QR
                </a>
              </div>
              <div className="hidden lg:flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur">
                    <div className="w-32 h-32 bg-gradient-to-br from-pink-200 to-purple-200 rounded-xl flex items-center justify-center">
                      <span className="text-5xl">🎨</span>
                    </div>
                    <p className="text-center text-sm mt-2">Artistic Style</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur">
                    <div className="w-32 h-32 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-xl flex items-center justify-center">
                      <span className="text-5xl">🏢</span>
                    </div>
                    <p className="text-center text-sm mt-2">Corporate Style</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur">
                    <div className="w-32 h-32 bg-gradient-to-br from-green-200 to-emerald-200 rounded-xl flex items-center justify-center">
                      <span className="text-5xl">🍃</span>
                    </div>
                    <p className="text-center text-sm mt-2">Nature Style</p>
                  </div>
                  <div className="bg-white/10 rounded-2xl p-4 backdrop-blur">
                    <div className="w-32 h-32 bg-gradient-to-br from-orange-200 to-red-200 rounded-xl flex items-center justify-center">
                      <span className="text-5xl">🍕</span>
                    </div>
                    <p className="text-center text-sm mt-2">Food Style</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Create Your QR Codes?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Start free with unlimited basic QR codes. Upgrade for dynamic URLs, analytics, and AI artistic generation.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://gudbro-qr-platform.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                Launch QR Generator
              </a>
              <Link
                href="/pricing"
                className="bg-white/10 hover:bg-white/20 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
