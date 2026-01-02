import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full blur-3xl opacity-30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-1.5 text-sm text-gray-600 dark:text-gray-300 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Now available in Vietnam, coming soon to Southeast Asia
          </div>

          {/* Headline */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl lg:text-6xl">
            QR-Powered Experiences
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
              for Hospitality
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Transform your restaurant, hotel, or rental property with digital menus,
            room info, and guest services. Multi-language, multi-currency, AI-powered.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Link
              href="/sign-up"
              className="rounded-full bg-gray-900 dark:bg-white px-6 py-3 text-base font-semibold text-white dark:text-gray-900 shadow-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-all hover:scale-105"
            >
              Get Started Free
            </Link>
            <Link
              href="/demo"
              className="rounded-full border border-gray-300 dark:border-gray-600 px-6 py-3 text-base font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </Link>
          </div>

          {/* Social proof */}
          <div className="mt-12 flex flex-col items-center gap-4">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 border-2 border-white dark:border-gray-800 flex items-center justify-center text-sm"
                >
                  {['🍽️', '☕', '🏨', '🏠', '🚚'][i - 1]}
                </div>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Trusted by <span className="font-semibold text-gray-900 dark:text-white">100+</span> businesses in Vietnam
            </p>
          </div>
        </div>

        {/* Hero Image/Mockup */}
        <div className="mt-16 relative">
          <div className="mx-auto max-w-5xl">
            {/* Browser mockup */}
            <div className="bg-gray-900 rounded-t-xl p-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 bg-gray-800 rounded-md px-4 py-1 text-sm text-gray-400 text-center">
                go.gudbro.com/roots-cafe
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-xl shadow-2xl aspect-video flex items-center justify-center">
              <div className="text-center text-gray-400 dark:text-gray-500">
                <div className="text-6xl mb-4">📱</div>
                <p className="text-lg">Interactive Demo Preview</p>
                <p className="text-sm mt-2">Scan QR to experience live menu</p>
              </div>
            </div>
          </div>

          {/* Floating elements */}
          <div className="absolute -left-4 top-1/4 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-4 hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center text-xl">🌍</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">16+ Languages</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">AI-powered translation</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-4 top-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-4 hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-xl">💳</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">Multi-Currency</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">VND, USD, KRW, more</p>
              </div>
            </div>
          </div>

          <div className="absolute -right-8 bottom-1/4 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900/50 p-4 hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center text-xl">⚡</div>
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">5 min Setup</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">No coding required</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
