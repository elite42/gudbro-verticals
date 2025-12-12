import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - GUDBRO',
  description: 'Learn about GUDBRO, our mission to transform hospitality through technology, and the team behind the platform.',
};

export default function AboutPage() {
  const values = [
    {
      icon: '🎯',
      title: 'Customer First',
      description: 'Every feature we build starts with a real problem faced by hospitality businesses. We listen, learn, and deliver solutions that matter.',
    },
    {
      icon: '🌍',
      title: 'Global by Design',
      description: 'Built for international hospitality from day one. Multi-language, multi-currency, and culturally aware.',
    },
    {
      icon: '⚡',
      title: 'Simplicity',
      description: 'Powerful features don\'t have to be complicated. We obsess over making technology accessible to everyone.',
    },
    {
      icon: '🤝',
      title: 'Partnership',
      description: 'We succeed when our customers succeed. We\'re not just a software vendor - we\'re your technology partner.',
    },
  ];

  const stats = [
    { number: '500+', label: 'Businesses Served' },
    { number: '100+', label: 'Languages Supported' },
    { number: '1M+', label: 'QR Scans' },
    { number: '50+', label: 'Dietary Filters' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforming Hospitality,<br />One QR Code at a Time
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              GUDBRO is on a mission to help hospitality businesses deliver exceptional guest experiences through simple, powerful technology.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none text-gray-600">
              <p className="mb-6">
                GUDBRO was born in Da Nang, Vietnam - a city where world-class hospitality meets rapid digital transformation. We saw restaurants struggling with paper menus that couldn't keep up with changing inventory, hotels missing opportunities to connect with international guests, and vacation rentals drowning in repetitive guest questions.
              </p>
              <p className="mb-6">
                We believed there had to be a better way. A way that didn't require expensive custom development or technical expertise. A solution that could work for a street food vendor and a five-star hotel alike.
              </p>
              <p className="mb-6">
                Today, GUDBRO powers digital experiences for hundreds of hospitality businesses across Southeast Asia and beyond. From a single coffee shop in Da Nang, we've grown to serve restaurants, hotels, vacation rentals, and food trucks in multiple countries.
              </p>
              <p>
                But we're just getting started. Our vision is to make world-class digital hospitality tools accessible to every business, regardless of size or technical capability.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center">
                  <span className="text-5xl mb-4 block">{value.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Based in Da Nang, Vietnam</h2>
            <p className="text-xl text-gray-600 mb-8">
              We're proud to call one of Southeast Asia's most dynamic cities our home. Da Nang's thriving tourism and hospitality industry gives us daily inspiration and keeps us connected to the real challenges businesses face.
            </p>
            <div className="bg-white rounded-2xl shadow-lg p-8 inline-block">
              <div className="text-6xl mb-4">🇻🇳</div>
              <p className="text-gray-900 font-medium">Da Nang, Vietnam</p>
              <p className="text-gray-500">Serving customers worldwide</p>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-20 px-4 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join the GUDBRO Family</h2>
            <p className="text-xl text-gray-300 mb-8">
              Whether you're a business looking to transform your guest experience or someone passionate about hospitality technology, we'd love to hear from you.
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
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
