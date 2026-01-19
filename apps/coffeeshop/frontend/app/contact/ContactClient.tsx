'use client';

import { useState } from 'react';
import { BottomNavLocal } from '@/components/BottomNavLocal';
import { coffeeshopConfig } from '@/config/coffeeshop.config';

const contactInfo = [
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: 'Address',
    details: ['123 Nguyen Van Linh', 'Hai Chau District', 'Da Nang, Vietnam'],
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
    title: 'Phone',
    details: ['+84 236 123 4567'],
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: 'Email',
    details: ['hello@rootscafe.vn'],
  },
  {
    icon: (
      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    title: 'Hours',
    details: ['Mon - Fri: 7:00 AM - 9:00 PM', 'Sat - Sun: 8:00 AM - 10:00 PM'],
  },
];

export function ContactClient() {
  const { business } = coffeeshopConfig;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="bg-theme-bg-secondary min-h-screen pb-28 lg:pb-8">
      {/* Hero Section */}
      <div className="relative h-48 md:h-64 lg:h-80">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1200&h=400&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <h1 className="mb-2 text-3xl font-bold text-white md:text-4xl lg:text-5xl">Contact Us</h1>
          <p className="text-lg text-white/90">We would love to hear from you</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-screen-xl px-4 py-12 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact Information */}
          <div>
            <h2 className="text-theme-text-primary mb-8 text-2xl font-bold lg:text-3xl">
              Get In Touch
            </h2>

            <div className="mb-12 space-y-6">
              {contactInfo.map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="bg-theme-brand-primary/10 text-theme-brand-primary flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-theme-text-primary mb-1 font-semibold">{item.title}</h3>
                    {item.details.map((detail, i) => (
                      <p key={i} className="text-theme-text-secondary">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Map Embed */}
            <div className="bg-theme-bg-tertiary h-64 overflow-hidden rounded-xl lg:h-80">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.0847068692377!2d108.22099441538697!3d16.047079043892567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0xfc14e3a044436487!2zxJDDoCBO4bq1bmcsIFZpZXRuYW0!5e0!3m2!1sen!2s!4v1620000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-theme-text-primary mb-8 text-2xl font-bold lg:text-3xl">
              Send Us a Message
            </h2>

            {submitted ? (
              <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center dark:border-green-800 dark:bg-green-900/20">
                <div className="mb-4 text-4xl">✅</div>
                <h3 className="mb-2 text-xl font-bold text-green-700 dark:text-green-400">
                  Message Sent!
                </h3>
                <p className="text-green-600 dark:text-green-500">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-theme-brand-primary mt-4 hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-theme-text-primary mb-2 block text-sm font-medium"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-theme-border-medium bg-theme-bg-elevated text-theme-text-primary focus:ring-theme-brand-primary w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-theme-text-primary mb-2 block text-sm font-medium"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-theme-border-medium bg-theme-bg-elevated text-theme-text-primary focus:ring-theme-brand-primary w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="text-theme-text-primary mb-2 block text-sm font-medium"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="border-theme-border-medium bg-theme-bg-elevated text-theme-text-primary focus:ring-theme-brand-primary w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2"
                  >
                    <option value="">Select a topic</option>
                    <option value="general">General Inquiry</option>
                    <option value="reservation">Reservation</option>
                    <option value="catering">Catering Request</option>
                    <option value="feedback">Feedback</option>
                    <option value="partnership">Partnership</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-theme-text-primary mb-2 block text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="border-theme-border-medium bg-theme-bg-elevated text-theme-text-primary focus:ring-theme-brand-primary w-full resize-none rounded-xl border px-4 py-3 focus:outline-none focus:ring-2"
                    placeholder="How can we help you?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-theme-brand-primary hover:bg-theme-brand-primary-hover w-full rounded-xl px-6 py-3 font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Mobile only */}
      <BottomNavLocal />
    </div>
  );
}
