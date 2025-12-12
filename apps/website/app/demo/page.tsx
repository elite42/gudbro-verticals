import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Live Demo - GUDBRO',
  description: 'See GUDBRO in action. Try our digital menu demo and experience the future of hospitality.',
};

export default function DemoPage() {
  const demoLinks = [
    {
      title: 'Restaurant Menu',
      description: 'Experience our flagship digital menu for ROOTS Coffee & Kitchen in Da Nang.',
      url: 'https://gudbro-coffeeshop-pwa.vercel.app',
      icon: '☕',
      features: ['Multi-language', 'Dietary filters', 'Real-time ordering'],
    },
    {
      title: 'Backoffice Dashboard',
      description: 'Explore the merchant dashboard where businesses manage their digital presence.',
      url: 'https://gudbro-backoffice.vercel.app',
      icon: '📊',
      features: ['Menu management', 'Analytics', 'Multi-tenant'],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              See GUDBRO in Action
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience our digital menu platform firsthand. Try the live demos below to see how GUDBRO can transform your business.
            </p>
          </div>
        </section>

        {/* Demo Cards */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {demoLinks.map((demo, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-shadow"
                >
                  <div className="p-8">
                    <span className="text-5xl mb-4 block">{demo.icon}</span>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {demo.title}
                    </h2>
                    <p className="text-gray-600 mb-6">{demo.description}</p>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {demo.features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    <a
                      href={demo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
                    >
                      Open Demo
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Use Demo */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              How to Explore the Demo
            </h2>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Open on Mobile</h3>
                    <p className="text-gray-600">
                      For the best experience, open the Restaurant Menu demo on your phone. It's designed as a Progressive Web App (PWA) for mobile-first use.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Try the Features</h3>
                    <p className="text-gray-600">
                      Browse the menu, switch languages, filter by dietary requirements, add items to cart, and explore all the features.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Install as App</h3>
                    <p className="text-gray-600">
                      On mobile, you can install the demo as an app. Look for "Add to Home Screen" in your browser menu.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* QR Code Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Scan to Try on Mobile
            </h2>
            <p className="text-gray-600 mb-8">
              Scan this QR code with your phone to open the restaurant menu demo
            </p>

            <div className="inline-block bg-white p-6 rounded-2xl shadow-lg">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://gudbro-coffeeshop-pwa.vercel.app')}`}
                alt="QR Code for Demo"
                className="w-48 h-48"
              />
              <p className="mt-4 text-sm text-gray-500">ROOTS Coffee & Kitchen</p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Create Your Own?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start your free trial today and have your digital menu live in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Talk to Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
