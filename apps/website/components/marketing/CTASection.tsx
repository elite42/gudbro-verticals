import Link from 'next/link';

export function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-16 lg:px-16 lg:py-24 overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          </div>

          <div className="relative text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-2xl mb-8">
              <span className="text-4xl">🚀</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Ready to transform your business?
            </h2>

            {/* Subheadline */}
            <p className="mt-6 text-lg text-blue-100 max-w-2xl mx-auto">
              Join 100+ hospitality businesses already using GUDBRO.
              Start free, no credit card required.
            </p>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/sign-up"
                className="w-full sm:w-auto rounded-full bg-white px-8 py-4 text-base font-semibold text-gray-900 shadow-lg hover:bg-gray-100 transition-all hover:scale-105"
              >
                Get Started Free
              </Link>
              <Link
                href="/demo"
                className="w-full sm:w-auto rounded-full border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Talk to Sales
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free forever plan
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                5 minute setup
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
