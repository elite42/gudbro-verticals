import Link from 'next/link';

const stats = [
  { label: 'Recipes', value: '4,600+', href: '/recipes' },
  { label: 'Ingredients', value: '2,500+', href: '/ingredients' },
  { label: 'World Cuisines', value: '75', href: '/recipes/cuisines' },
  { label: 'Countries Compliant', value: '50+', href: '#compliance' },
];

const features = [
  {
    icon: '🔒',
    title: '30 Allergens Tracked',
    description: 'More than any regulation worldwide requires. EU, USA, Japan, Australia - all covered.',
  },
  {
    icon: '🥗',
    title: '11 Dietary Filters',
    description: 'Vegan, halal, kosher, keto, gluten-free and more. Filter instantly.',
  },
  {
    icon: '📊',
    title: 'Full Nutrition Data',
    description: 'Calories, macros, vitamins, minerals. 100% coverage on all ingredients.',
  },
  {
    icon: '🌶️',
    title: 'Spice Level Indicator',
    description: 'Help customers choose dishes that match their heat tolerance.',
  },
];

const cuisines = [
  { name: 'Italian', icon: '🇮🇹', count: 102 },
  { name: 'Japanese', icon: '🇯🇵', count: 173 },
  { name: 'Mexican', icon: '🇲🇽', count: 66 },
  { name: 'Thai', icon: '🇹🇭', count: 69 },
  { name: 'Indian', icon: '🇮🇳', count: 65 },
  { name: 'French', icon: '🇫🇷', count: 58 },
];

export function DatabaseSection() {
  return (
    <section id="database" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300 text-sm font-medium px-4 py-1 rounded-full mb-4">
            World&apos;s Largest Food Database
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Powered by Real Food Data
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our digital menus are backed by a comprehensive database of recipes, ingredients,
            allergens, and nutrition facts - compliant in 50+ countries.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat) => (
            <Link
              key={stat.label}
              href={stat.href}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-sm hover:shadow-md dark:hover:shadow-gray-900/50 transition-all hover:-translate-y-1"
            >
              <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
              <p className="text-gray-500 dark:text-gray-400 mt-1">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-700"
            >
              <span className="text-4xl block mb-4">{feature.icon}</span>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Cuisines Preview */}
        <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-8 md:p-12 text-white">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                75 World Cuisines
              </h3>
              <p className="text-orange-100 mb-6">
                From Italian pasta to Japanese sushi, Thai curries to Mexican tacos.
                Authentic recipes with complete allergen and nutrition data.
              </p>
              <Link
                href="/recipes"
                className="inline-block bg-white text-orange-600 px-6 py-3 rounded-full font-medium hover:bg-orange-50 transition-colors"
              >
                Explore Recipes
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {cuisines.map((cuisine) => (
                <Link
                  key={cuisine.name}
                  href={`/recipes/cuisine/${cuisine.name.toLowerCase()}`}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-colors"
                >
                  <span className="text-3xl block mb-1">{cuisine.icon}</span>
                  <p className="text-sm font-medium">{cuisine.name}</p>
                  <p className="text-xs text-orange-200">{cuisine.count} dishes</p>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance Banner */}
        <div id="compliance" className="mt-12 bg-gray-900 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-4xl">🛡️</span>
              <div>
                <h4 className="font-semibold text-white">Global Allergen Compliance</h4>
                <p className="text-gray-400 text-sm">
                  EU 1169/2011 • UK Natasha's Law • USA FALCPA • Australia PEAL • Japan • Korea • China
                </p>
              </div>
            </div>
            <Link
              href="/compliance"
              className="whitespace-nowrap bg-white text-gray-900 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
