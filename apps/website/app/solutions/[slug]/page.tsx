import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

// Solution data
const solutions: Record<
  string,
  {
    title: string;
    description: string;
    hero: string;
    icon: string;
    features: { title: string; description: string; icon: string }[];
    benefits: string[];
    cta: string;
  }
> = {
  restaurants: {
    title: 'Digital Menus for Restaurants',
    description:
      'Transform your restaurant with QR-powered digital menus. Multi-language support, real-time updates, and seamless ordering.',
    hero: 'Elevate your restaurant experience with smart digital menus',
    icon: '🍽️',
    features: [
      {
        title: 'Instant Menu Updates',
        description:
          'Change prices, add dishes, or mark items as sold out in real-time. No reprinting needed.',
        icon: '⚡',
      },
      {
        title: 'Multi-Language Support',
        description:
          'Serve international guests with menus in 100+ languages. AI-powered translations included.',
        icon: '🌍',
      },
      {
        title: 'Rich Media',
        description:
          'Showcase your dishes with beautiful photos, videos, and detailed descriptions.',
        icon: '📸',
      },
      {
        title: 'Dietary Filters',
        description: '50+ dietary and allergen filters help guests find suitable dishes instantly.',
        icon: '🥗',
      },
      {
        title: 'Order Management',
        description:
          'Receive orders directly to your kitchen display. Reduce wait times and errors.',
        icon: '📋',
      },
      {
        title: 'Analytics Dashboard',
        description:
          'Track popular items, peak hours, and customer preferences to optimize your menu.',
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
    description:
      'Enhance your hotel guest experience with QR-powered room service, amenities info, and concierge services.',
    hero: 'Deliver exceptional guest experiences with digital room services',
    icon: '🏨',
    features: [
      {
        title: 'Digital Room Directory',
        description:
          'Replace paper directories with interactive digital guides. Always up-to-date.',
        icon: '📖',
      },
      {
        title: 'Room Service Ordering',
        description:
          'Guests order directly from their phone. No phone calls, no language barriers.',
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
    description:
      'Create beautiful digital guidebooks for your Airbnb, VRBO, or vacation rental properties.',
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
    description:
      'Perfect for food trucks, pop-ups, and mobile vendors. Fast setup, easy updates, instant payments.',
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
  'crypto-payments': {
    title: 'Accept Cryptocurrency Payments',
    description:
      'Tired of losing 2-3% on every card transaction? Accept crypto like digital cash - zero fees, instant settlement, no chargebacks.',
    hero: 'Digital cash for the modern merchant. Zero fees. Instant settlement.',
    icon: '₿',
    features: [
      {
        title: 'Zero Transaction Fees',
        description:
          'Cards take 2-3% of every sale. Crypto goes directly to your wallet. On a €10,000/month business, save €200-300 monthly.',
        icon: '💰',
      },
      {
        title: 'Like Cash, But Better',
        description:
          'Same benefits as cash (no fees, instant, no chargebacks) but digital, traceable, and works with tourists worldwide.',
        icon: '💵',
      },
      {
        title: '7 Cryptocurrencies',
        description:
          'Accept Bitcoin, Ethereum, USDC, USDT, Solana, TON, and BNB. Stablecoins for no volatility risk.',
        icon: '🪙',
      },
      {
        title: 'QR Code Payments',
        description:
          'Customers scan a QR code and pay from any wallet app. Works with Binance, Coinbase, MetaMask, Phantom.',
        icon: '📱',
      },
      {
        title: 'Instant Settlement',
        description:
          'No waiting 2-3 days for card settlements. Crypto hits your wallet in minutes. Your money, immediately.',
        icon: '⚡',
      },
      {
        title: 'No Chargebacks Ever',
        description:
          'Crypto transactions are irreversible. No fraudulent disputes, no payment reversals, no lost revenue.',
        icon: '🛡️',
      },
      {
        title: 'Become The Local Crypto Spot',
        description:
          'Crypto holders actively seek places to spend without converting. Be the go-to spot in your area and win loyal customers your competitors miss.',
        icon: '🧲',
      },
    ],
    benefits: [
      'Save €2,000-3,000/year on a €100k revenue business',
      'Same benefits as cash: no fees, instant, final',
      'Attract crypto tourists and digital nomads',
      'No chargebacks or payment disputes - ever',
      'Instant settlement vs 2-3 days for cards',
      'Use stablecoins (USDC/USDT) to avoid volatility',
      'Works globally without currency conversion fees',
      'Stand out in Vietnam, Thailand, Bali, Dubai markets',
      'Be THE crypto-friendly spot in your area - win loyal customers',
      'Crypto holders prefer you over competitors (no conversion needed)',
    ],
    cta: 'Start Accepting Crypto',
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
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-20 text-white">
          <div className="mx-auto max-w-7xl text-center">
            <span className="mb-6 block text-6xl">{solution.icon}</span>
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">{solution.title}</h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-gray-300">{solution.hero}</p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/sign-up"
                className="rounded-full bg-white px-8 py-4 font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                {solution.cta}
              </Link>
              <Link
                href="/demo"
                className="rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-colors hover:bg-white/10"
              >
                See Demo
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Features Built for You
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {solution.features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg transition-shadow hover:shadow-xl"
                >
                  <span className="mb-4 block text-4xl">{feature.icon}</span>
                  <h3 className="mb-2 text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="bg-gray-50 px-4 py-20">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              Why Choose GUDBRO?
            </h2>
            <div className="space-y-4">
              {solution.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm"
                >
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                    <svg
                      className="h-5 w-5 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900">Ready to Get Started?</h2>
            <p className="mb-8 text-xl text-gray-600">
              Join thousands of businesses already using GUDBRO to serve their customers better.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href="/sign-up"
                className="rounded-full bg-gray-900 px-8 py-4 font-semibold text-white transition-colors hover:bg-gray-800"
              >
                Start Free Trial
              </Link>
              <Link
                href="/contact"
                className="rounded-full border-2 border-gray-900 px-8 py-4 font-semibold text-gray-900 transition-colors hover:bg-gray-50"
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
