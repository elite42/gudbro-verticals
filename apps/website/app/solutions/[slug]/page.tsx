import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Solution data
const solutions: Record<string, {
  title: string;
  description: string;
  hero: string;
  icon: string;
  features: { title: string; description: string; icon: string }[];
  benefits: string[];
  cta: string;
}> = {
  restaurants: {
    title: 'Digital Menus for Restaurants',
    description: 'Transform your restaurant with QR-powered digital menus. Multi-language support, real-time updates, and seamless ordering.',
    hero: 'Elevate your restaurant experience with smart digital menus',
    icon: '🍽️',
    features: [
      {
        title: 'Instant Menu Updates',
        description: 'Change prices, add dishes, or mark items as sold out in real-time. No reprinting needed.',
        icon: '⚡',
      },
      {
        title: 'Multi-Language Support',
        description: 'Serve international guests with menus in 100+ languages. AI-powered translations included.',
        icon: '🌍',
      },
      {
        title: 'Rich Media',
        description: 'Showcase your dishes with beautiful photos, videos, and detailed descriptions.',
        icon: '📸',
      },
      {
        title: 'Dietary Filters',
        description: '50+ dietary and allergen filters help guests find suitable dishes instantly.',
        icon: '🥗',
      },
      {
        title: 'Order Management',
        description: 'Receive orders directly to your kitchen display. Reduce wait times and errors.',
        icon: '📋',
      },
      {
        title: 'Analytics Dashboard',
        description: 'Track popular items, peak hours, and customer preferences to optimize your menu.',
        icon: '📊',
      },
    ],
    benefits: [
      'Reduce printing costs by 90%',
      'Increase average order value by 15-25%',
      'Serve more customers with faster ordering',
      'Improve guest satisfaction with visual menus',
      'Reduce order errors significantly',
    ],
    cta: 'Start Your Free Trial',
  },
  hotels: {
    title: 'Digital Guest Services for Hotels',
    description: 'Enhance your hotel guest experience with QR-powered room service, amenities info, and concierge services.',
    hero: 'Deliver exceptional guest experiences with digital room services',
    icon: '🏨',
    features: [
      {
        title: 'Digital Room Directory',
        description: 'Replace paper directories with interactive digital guides. Always up-to-date.',
        icon: '📖',
      },
      {
        title: 'Room Service Ordering',
        description: 'Guests order directly from their phone. No phone calls, no language barriers.',
        icon: '🛎️',
      },
      {
        title: 'Amenities & Services',
        description: 'Showcase spa, gym, pool, and other amenities with booking capabilities.',
        icon: '🏊',
      },
      {
        title: 'Local Recommendations',
        description: 'Share curated local attractions, restaurants, and experiences.',
        icon: '🗺️',
      },
      {
        title: 'Multi-Language',
        description: 'Serve international guests in their native language automatically.',
        icon: '🌐',
      },
      {
        title: 'Feedback Collection',
        description: 'Gather real-time feedback to improve services before checkout.',
        icon: '⭐',
      },
    ],
    benefits: [
      'Reduce front desk calls by 40%',
      'Increase room service orders by 30%',
      'Improve guest satisfaction scores',
      'Reduce paper waste and printing costs',
      'Provide 24/7 digital concierge service',
    ],
    cta: 'Transform Your Hotel',
  },
  airbnb: {
    title: 'Digital Guides for Vacation Rentals',
    description: 'Create beautiful digital guidebooks for your Airbnb, VRBO, or vacation rental properties.',
    hero: 'Impress guests with professional digital property guides',
    icon: '🏡',
    features: [
      {
        title: 'Property Guide',
        description: 'WiFi passwords, appliance instructions, house rules - all in one place.',
        icon: '📱',
      },
      {
        title: 'Check-in Instructions',
        description: 'Step-by-step arrival guide with photos, codes, and directions.',
        icon: '🔑',
      },
      {
        title: 'Local Recommendations',
        description: 'Share your favorite restaurants, beaches, and hidden gems.',
        icon: '📍',
      },
      {
        title: 'Emergency Contacts',
        description: 'Important numbers and contacts readily available.',
        icon: '🆘',
      },
      {
        title: 'Multi-Property Support',
        description: 'Manage multiple properties from one dashboard.',
        icon: '🏘️',
      },
      {
        title: 'Guest Messaging',
        description: 'Communicate with guests directly through the platform.',
        icon: '💬',
      },
    ],
    benefits: [
      'Reduce repetitive guest questions by 70%',
      'Improve review scores with better communication',
      'Save hours on guest communication',
      'Professional presentation for all properties',
      'Easy updates from anywhere',
    ],
    cta: 'Create Your First Guide',
  },
  'food-trucks': {
    title: 'Mobile Menus for Food Trucks',
    description: 'Perfect for food trucks, pop-ups, and mobile vendors. Fast setup, easy updates, instant payments.',
    hero: 'Run your food truck smarter with digital menus',
    icon: '🚚',
    features: [
      {
        title: 'Quick Setup',
        description: 'Get your digital menu running in minutes. No technical skills needed.',
        icon: '🚀',
      },
      {
        title: 'Location Updates',
        description: 'Let customers know where you are today with real-time location sharing.',
        icon: '📍',
      },
      {
        title: 'Menu Flexibility',
        description: 'Easily update menu based on available ingredients or daily specials.',
        icon: '📝',
      },
      {
        title: 'Fast Ordering',
        description: 'Reduce wait times with pre-orders and quick mobile ordering.',
        icon: '⚡',
      },
      {
        title: 'Social Integration',
        description: 'Connect with Instagram and Facebook to grow your following.',
        icon: '📱',
      },
      {
        title: 'Offline Mode',
        description: 'Works even with spotty internet at festivals and events.',
        icon: '📶',
      },
    ],
    benefits: [
      'Serve more customers in less time',
      'Reduce order errors and miscommunication',
      'Build customer loyalty with easy reordering',
      'Professional presentation on any budget',
      'Track sales and popular items',
    ],
    cta: 'Get Started Free',
  },
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return Object.keys(solutions).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutions[slug];

  if (!solution) {
    return { title: 'Solution Not Found - GUDBRO' };
  }

  return {
    title: `${solution.title} - GUDBRO`,
    description: solution.description,
  };
}

export default async function SolutionPage({ params }: Props) {
  const { slug } = await params;
  const solution = solutions[slug];

  if (!solution) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <span className="text-6xl mb-6 block">{solution.icon}</span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {solution.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              {solution.hero}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                {solution.cta}
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                See Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Features Built for You
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {solution.features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
                >
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 px-4 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Why Choose GUDBRO?
            </h2>
            <div className="space-y-4">
              {solution.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-sm"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of businesses already using GUDBRO to serve their customers better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="px-8 py-4 border-2 border-gray-900 text-gray-900 font-semibold rounded-full hover:bg-gray-50 transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
