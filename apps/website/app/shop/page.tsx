import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop - Good Food, Good Vibes Merchandise | GUDBRO',
  description: 'Shop GUDBRO merchandise. Quality apparel, kitchen accessories, and more for food lovers. Good Food, Good Vibes.',
};

const products = [
  {
    category: 'Apparel',
    id: 'apparel',
    description: 'Wear your love for good food',
    items: [
      {
        name: 'Classic GUDBRO Tee',
        price: 29,
        image: '👕',
        description: 'Premium cotton t-shirt with GUDBRO logo',
        colors: ['Black', 'White', 'Navy'],
      },
      {
        name: 'Chef Vibes Hoodie',
        price: 59,
        image: '🧥',
        description: 'Cozy hoodie for kitchen adventures',
        colors: ['Charcoal', 'Forest Green'],
      },
      {
        name: 'Good Food Cap',
        price: 24,
        image: '🧢',
        description: 'Embroidered dad cap for foodies',
        colors: ['Black', 'Khaki'],
      },
    ],
  },
  {
    category: 'Kitchen & Dining',
    id: 'kitchen',
    description: 'Upgrade your kitchen game',
    items: [
      {
        name: 'GUDBRO Coffee Mug',
        price: 18,
        image: '☕',
        description: 'Ceramic mug for your morning brew',
        colors: ['White', 'Black'],
      },
      {
        name: 'Chef\'s Apron',
        price: 35,
        image: '👨‍🍳',
        description: 'Professional apron with adjustable straps',
        colors: ['Black', 'Denim Blue'],
      },
      {
        name: 'Market Tote Bag',
        price: 22,
        image: '👜',
        description: 'Organic cotton tote for grocery runs',
        colors: ['Natural', 'Black'],
      },
    ],
  },
  {
    category: 'Tech & Accessories',
    id: 'accessories',
    description: 'Foodie gear for everyday',
    items: [
      {
        name: 'Laptop Sticker Pack',
        price: 12,
        image: '🎨',
        description: '10 high-quality vinyl stickers',
        colors: [],
      },
      {
        name: 'Recipe Mousepad',
        price: 15,
        image: '🖱️',
        description: 'Large mousepad with food illustrations',
        colors: [],
      },
      {
        name: 'Phone Case',
        price: 25,
        image: '📱',
        description: 'Slim protective case for iPhone & Android',
        colors: ['Clear', 'Matte Black'],
      },
    ],
  },
];

const features = [
  {
    icon: '🌿',
    title: 'Sustainable Materials',
    description: 'Organic cotton, recycled packaging, and eco-friendly inks.',
  },
  {
    icon: '✨',
    title: 'Premium Quality',
    description: 'Designed to last. Every product is tested for durability.',
  },
  {
    icon: '🚚',
    title: 'Free Shipping',
    description: 'Free worldwide shipping on orders over $50.',
  },
  {
    icon: '💚',
    title: 'Supports Our Mission',
    description: '10% of profits go to food sustainability initiatives.',
  },
];

export default function ShopPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-block bg-white/20 text-white text-sm font-medium px-4 py-1 rounded-full mb-6">
                Good Food, Good Vibes
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                GUDBRO Shop
              </h1>
              <p className="text-xl text-orange-100 mb-8">
                Wear your love for food. Quality merchandise for restaurants, chefs, and food enthusiasts.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="#apparel"
                  className="bg-white text-orange-600 px-6 py-3 rounded-full font-medium hover:bg-orange-50 transition-colors"
                >
                  Shop Apparel
                </a>
                <a
                  href="#kitchen"
                  className="bg-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/30 transition-colors"
                >
                  Kitchen & Dining
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-12 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="text-center">
                  <span className="text-3xl block mb-2">{feature.icon}</span>
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        {products.map((category) => (
          <section key={category.category} id={category.id} className="py-16">
            <div className="max-w-7xl mx-auto px-4">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{category.category}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg transition-shadow group"
                  >
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center">
                      <span className="text-7xl group-hover:scale-110 transition-transform">{item.image}</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold text-gray-900">{item.name}</h3>
                        <span className="text-lg font-bold text-orange-600">${item.price}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{item.description}</p>
                      {item.colors.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {item.colors.map((color) => (
                            <span
                              key={color}
                              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      )}
                      <button
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-2 rounded-full text-sm font-medium transition-colors cursor-not-allowed opacity-50"
                        disabled
                      >
                        Coming Soon
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Coming Soon Banner */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <span className="text-5xl block mb-6">🚀</span>
            <h2 className="text-3xl font-bold mb-4">Shop Coming Soon!</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We&apos;re putting the finishing touches on our merchandise store. Sign up to be notified when we launch!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full font-medium transition-colors">
                Notify Me
              </button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Looking for Digital Menu Solutions?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Check out our QR code generator and digital menu platform. Help your restaurant save money and improve operations.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/tools"
                className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition-colors"
              >
                Explore Free Tools
              </Link>
              <Link
                href="/"
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-full font-medium transition-colors"
              >
                Learn About GUDBRO
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
