'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  title: string;
  icon: string;
  items: FAQItem[];
};

const faqCategories: FAQCategory[] = [
  {
    title: 'Getting Started',
    icon: '🚀',
    items: [
      {
        question: 'How do I create my first digital menu?',
        answer: 'Sign up for a free account, and you\'ll be guided through our simple setup wizard. You can have your menu live in under 10 minutes. Just add your items, upload photos, set prices, and generate your QR code.',
      },
      {
        question: 'Do I need technical skills to use GUDBRO?',
        answer: 'Not at all! GUDBRO is designed to be user-friendly for anyone. If you can use a smartphone, you can create and manage your digital menu. Our drag-and-drop interface makes it easy.',
      },
      {
        question: 'How do customers access my menu?',
        answer: 'Customers simply scan your QR code with their smartphone camera. No app download required. The menu opens instantly in their browser and works on any device.',
      },
      {
        question: 'Can I try GUDBRO before committing?',
        answer: 'Yes! We offer a free plan that lets you create a basic digital menu with up to 20 items. You can upgrade anytime to access more features.',
      },
    ],
  },
  {
    title: 'Features & Functionality',
    icon: '⚡',
    items: [
      {
        question: 'How many languages does GUDBRO support?',
        answer: 'GUDBRO supports 100+ languages with AI-powered translations. You can add translations manually or use our automatic translation feature to reach international customers.',
      },
      {
        question: 'Can customers place orders through the menu?',
        answer: 'Yes! With our Professional plan and above, customers can add items to cart and submit orders directly to your kitchen. You\'ll receive orders in real-time on your dashboard or kitchen display.',
      },
      {
        question: 'How do dietary filters work?',
        answer: 'We have 50+ dietary and allergen filters including vegan, vegetarian, gluten-free, halal, kosher, and all major allergens. Customers can filter the menu to see only items that match their requirements.',
      },
      {
        question: 'Can I update my menu in real-time?',
        answer: 'Absolutely! Changes you make in the dashboard are reflected instantly on the customer-facing menu. Mark items as sold out, change prices, or add specials at any time.',
      },
    ],
  },
  {
    title: 'Pricing & Plans',
    icon: '💰',
    items: [
      {
        question: 'How much does GUDBRO cost?',
        answer: 'We offer plans starting from free for basic menus, $29/month for the Starter plan, $79/month for Professional, and custom pricing for Enterprise. All paid plans include a 14-day free trial.',
      },
      {
        question: 'Are there any transaction fees?',
        answer: 'GUDBRO doesn\'t charge transaction fees. However, if you use integrated payment processors, their standard fees apply. We believe in transparent, predictable pricing.',
      },
      {
        question: 'Can I change plans at any time?',
        answer: 'Yes, you can upgrade or downgrade your plan at any time. If you upgrade, you\'ll be charged the prorated difference. If you downgrade, you\'ll keep your current features until the end of your billing cycle.',
      },
      {
        question: 'Do you offer discounts for annual billing?',
        answer: 'Yes! Save 20% when you choose annual billing. That\'s like getting 2+ months free compared to monthly billing.',
      },
    ],
  },
  {
    title: 'Technical Questions',
    icon: '🔧',
    items: [
      {
        question: 'Does GUDBRO work offline?',
        answer: 'Yes! Our PWA technology allows the menu to work even with poor internet connection. Basic viewing is available offline, though ordering features require connectivity.',
      },
      {
        question: 'Is my data secure?',
        answer: 'We take security seriously. All data is encrypted in transit and at rest. We use industry-standard security practices and are GDPR compliant. Your customer data is never sold to third parties.',
      },
      {
        question: 'Can I integrate with my POS system?',
        answer: 'We offer integrations with popular POS systems on our Professional and Enterprise plans. Contact our team for specific integration requirements.',
      },
      {
        question: 'What browsers are supported?',
        answer: 'GUDBRO works on all modern browsers including Chrome, Safari, Firefox, and Edge. We support iOS 12+ and Android 8+.',
      },
    ],
  },
  {
    title: 'Support',
    icon: '💬',
    items: [
      {
        question: 'How can I get help if I have issues?',
        answer: 'We offer email support for all plans, live chat for Starter and above, and priority phone support for Professional and Enterprise customers. Our help center also has detailed guides and tutorials.',
      },
      {
        question: 'Do you offer onboarding assistance?',
        answer: 'Yes! All paid plans include a guided onboarding session. Enterprise customers get dedicated account management and custom training for their team.',
      },
      {
        question: 'What are your support hours?',
        answer: 'Our support team is available Monday-Friday, 9 AM - 6 PM (ICT). Enterprise customers have access to 24/7 emergency support.',
      },
    ],
  },
];

function FAQAccordion({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left hover:text-gray-900 transition-colors"
      >
        <span className="font-medium text-gray-900 pr-4">{item.question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600">
          {item.answer}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to common questions about GUDBRO. Can't find what you're looking for?{' '}
              <Link href="/contact" className="text-gray-900 underline hover:no-underline">
                Contact us
              </Link>
            </p>
          </div>
        </section>

        {/* FAQ Categories */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {faqCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{category.icon}</span>
                    <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                  </div>
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6">
                    {category.items.map((item, i) => (
                      <FAQAccordion key={i} item={item} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-16 px-4 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Our team is here to help. Get in touch and we'll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="px-8 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/demo"
                className="px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white/10 transition-colors"
              >
                Try the Demo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
