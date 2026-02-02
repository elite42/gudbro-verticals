import { Metadata } from 'next';
import Link from 'next/link';
import {
  EnvelopeSimple,
  WhatsappLogo,
  MapPin,
  Clock,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Contact GUDBRO - Get in Touch',
  description: 'Questions about GUDBRO? Want to become a partner? Reach out via email, WhatsApp, or our contact form. We\'re here to help.',
};

const contactMethods = [
  {
    title: 'Email',
    description: 'For general inquiries and support',
    value: 'hello@gudbro.com',
    href: 'mailto:hello@gudbro.com',
    icon: EnvelopeSimple,
  },
  {
    title: 'WhatsApp',
    description: 'Quick questions? Chat with us',
    value: '+84 xxx xxx xxx',
    href: 'https://wa.me/84xxxxxxxxx',
    icon: WhatsappLogo,
  },
  {
    title: 'Location',
    description: 'Where we\'re based',
    value: 'Da Nang, Vietnam',
    href: '#',
    icon: MapPin,
  },
  {
    title: 'Response Time',
    description: 'We typically reply within',
    value: '24 hours',
    href: '#',
    icon: Clock,
  },
];

const faqs = [
  {
    question: 'I\'m not tech-savvy. Can I still use GUDBRO?',
    answer: 'Absolutely! We designed GUDBRO for business owners, not developers. If you can use WhatsApp, you can use GUDBRO. Most businesses are set up in under 10 minutes.',
  },
  {
    question: 'Do you offer demos?',
    answer: 'Yes! You can explore our live demos anytime, or book a personal walkthrough with our team. Just fill out the form and select "Request Demo".',
  },
  {
    question: 'Can I try before I pay?',
    answer: 'Our Free plan is free forever with up to 20 products. You can also try Pro features with a 14-day free trial.',
  },
  {
    question: 'Do you support businesses outside Vietnam?',
    answer: 'Yes! We currently support businesses in Vietnam, Thailand, and Indonesia (Bali). We\'re expanding to more Southeast Asian countries soon.',
  },
];

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--neutral-50)] to-white pt-24 md:pt-32">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-[var(--neutral-900)] sm:text-5xl">
              Let&apos;s Talk
            </h1>
            <p className="mt-4 text-xl text-[var(--neutral-600)]">
              Questions, feedback, partnership inquiries—we&apos;re here to help your business succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="relative -mt-8 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactMethods.map((method) => (
              <a
                key={method.title}
                href={method.href}
                className="rounded-xl bg-white p-6 shadow-lg transition-all hover:shadow-xl hover:-translate-y-1"
              >
                <method.icon size={24} className="text-[var(--primary)]" weight="duotone" />
                <h3 className="mt-4 font-semibold text-[var(--neutral-900)]">{method.title}</h3>
                <p className="mt-1 text-sm text-[var(--neutral-500)]">{method.description}</p>
                <p className="mt-2 text-sm font-medium text-[var(--primary)]">{method.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="section bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--neutral-900)]">Send us a message</h2>
              <p className="mt-2 text-[var(--neutral-600)]">
                Fill out the form and we&apos;ll get back to you within 24 hours.
              </p>

              <form className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-[var(--neutral-700)]">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="mt-2 w-full rounded-lg border border-[var(--neutral-200)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                      placeholder="Nguyen Van A"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-[var(--neutral-700)]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="mt-2 w-full rounded-lg border border-[var(--neutral-200)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="business" className="block text-sm font-medium text-[var(--neutral-700)]">
                    Business Name (optional)
                  </label>
                  <input
                    type="text"
                    id="business"
                    name="business"
                    className="mt-2 w-full rounded-lg border border-[var(--neutral-200)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                    placeholder="Sunrise Cafe"
                  />
                </div>

                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-[var(--neutral-700)]">
                    How can we help?
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    className="mt-2 w-full rounded-lg border border-[var(--neutral-200)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                  >
                    <option value="">Select a topic</option>
                    <option value="demo">Request a Demo</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership Inquiry</option>
                    <option value="feedback">Product Feedback</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[var(--neutral-700)]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="mt-2 w-full rounded-lg border border-[var(--neutral-200)] px-4 py-3 text-sm focus:border-[var(--primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
                    placeholder="Tell us more about your business and how we can help..."
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-full sm:w-auto"
                >
                  Send Message
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>

            {/* FAQs */}
            <div>
              <h2 className="text-2xl font-bold text-[var(--neutral-900)]">Common Questions</h2>
              <p className="mt-2 text-[var(--neutral-600)]">
                Quick answers to questions we hear often.
              </p>

              <div className="mt-8 space-y-6">
                {faqs.map((faq) => (
                  <div key={faq.question} className="rounded-xl bg-[var(--neutral-50)] p-6">
                    <h3 className="font-semibold text-[var(--neutral-900)]">{faq.question}</h3>
                    <p className="mt-2 text-sm text-[var(--neutral-600)]">{faq.answer}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-xl bg-[var(--primary)]/5 p-6">
                <h3 className="font-semibold text-[var(--neutral-900)]">Need help faster?</h3>
                <p className="mt-2 text-sm text-[var(--neutral-600)]">
                  Message us on WhatsApp for quick responses during business hours (9am-6pm ICT).
                </p>
                <a
                  href="https://wa.me/84xxxxxxxxx"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)]"
                >
                  <WhatsappLogo size={20} weight="fill" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--neutral-50)] py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight text-[var(--neutral-900)] sm:text-3xl">
              Ready to Get Started?
            </h2>
            <p className="mt-4 text-[var(--neutral-600)]">
              Skip the contact form and start building your digital presence today.
            </p>
            <Link
              href="/signup"
              className="btn btn-primary btn-lg mt-6"
            >
              Create Free Account
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
