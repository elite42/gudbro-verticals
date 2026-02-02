'use client';

/**
 * V2 Contact Client Component
 *
 * Pagina contatti con form di contatto e Google Maps embed.
 */

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Phone,
  EnvelopeSimple,
  MapPin,
  PaperPlaneTilt,
  Check,
  FacebookLogo,
  InstagramLogo,
} from '@phosphor-icons/react';
import { Header } from '@/components/v2/Header';
import { BottomNav } from '@/components/v2/BottomNav';
import { coffeeshopConfig } from '@/config/coffeeshop.config';
import { cartStore } from '@/lib/cart-store';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function V2ContactClient() {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDark(prefersDark);

    const updateCartCount = () => setCartCount(cartStore.count());
    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);
    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  const handleThemeToggle = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  const handleNavigate = (pageId: string) => {
    switch (pageId) {
      case 'home': router.push('/v2'); break;
      case 'menu': router.push('/v2/menu'); break;
      case 'cart': router.push('/v2/cart'); break;
      case 'favorites': router.push('/v2/favorites'); break;
      case 'orders': router.push('/v2/orders'); break;
      case 'account': router.push('/v2/account'); break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });

    // Reset success message after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactMethods = [
    {
      icon: Phone,
      label: 'Phone',
      value: coffeeshopConfig.contact.phone,
      href: `tel:${coffeeshopConfig.contact.phone}`,
    },
    {
      icon: EnvelopeSimple,
      label: 'Email',
      value: coffeeshopConfig.contact.email,
      href: `mailto:${coffeeshopConfig.contact.email}`,
    },
    {
      icon: MapPin,
      label: 'Address',
      value: coffeeshopConfig.location.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(coffeeshopConfig.location.address)}`,
    },
  ];

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="animate-pulse text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div data-theme={isDark ? 'dark' : 'light'} className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <Header
        merchantName={coffeeshopConfig.business.name}
        merchantLogo={coffeeshopConfig.business.logo}
        showSearch={false}
        onThemeToggle={handleThemeToggle}
        isDark={isDark}
      />

      <main className="container-app safe-area-bottom pb-24 pt-4">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-4 flex items-center gap-2 text-sm font-medium"
          style={{ color: 'var(--text-secondary)' }}
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1
            className="font-display text-2xl font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Contact Us
          </h1>
          <p className="mt-1" style={{ color: 'var(--text-secondary)' }}>
            We'd love to hear from you
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <div className="grid gap-3">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl p-4 transition-colors"
                  style={{ background: 'var(--bg-secondary)' }}
                >
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ background: 'var(--bg-tertiary)', color: 'var(--interactive-primary)' }}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
                      {method.label}
                    </p>
                    <p
                      className="truncate font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {method.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </motion.section>

        {/* Map */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2
            className="font-display mb-3 text-lg font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Find Us
          </h2>
          <div
            className="overflow-hidden rounded-xl"
            style={{ border: '1px solid var(--border-light)' }}
          >
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3833.8675!2d${coffeeshopConfig.location.coordinates.lng}!3d${coffeeshopConfig.location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s${encodeURIComponent(coffeeshopConfig.location.address)}!5e0!3m2!1sen!2s!4v1234567890`}
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Restaurant location"
            />
          </div>
        </motion.section>

        {/* Contact Form */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2
            className="font-display mb-3 text-lg font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            Send us a message
          </h2>

          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center rounded-xl p-8 text-center"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full"
                style={{ background: 'var(--status-success)', color: 'white' }}
              >
                <Check size={32} weight="bold" />
              </div>
              <h3
                className="font-display text-lg font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Message Sent!
              </h3>
              <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                We'll get back to you as soon as possible.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="mb-1 block text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-4 py-3"
                  style={{
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-medium)',
                  }}
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-4 py-3"
                  style={{
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-medium)',
                  }}
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="mb-1 block text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl px-4 py-3"
                  style={{
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-medium)',
                  }}
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="feedback">Feedback</option>
                  <option value="reservation">Reservation</option>
                  <option value="catering">Catering</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-1 block text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full resize-none rounded-xl px-4 py-3"
                  style={{
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    border: '1px solid var(--border-medium)',
                  }}
                  placeholder="How can we help you?"
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="flex w-full items-center justify-center gap-2 rounded-xl py-4 font-medium"
                style={{
                  background: 'var(--interactive-primary)',
                  color: 'white',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isSubmitting ? (
                  <motion.div
                    className="h-5 w-5 rounded-full border-2 border-white/30 border-t-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                ) : (
                  <>
                    <PaperPlaneTilt size={20} weight="fill" />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.section>

        {/* Social Links */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <p className="mb-3 text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Follow us on social media
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
            >
              <FacebookLogo size={24} weight="fill" />
            </a>
            <a
              href="#"
              className="flex h-12 w-12 items-center justify-center rounded-full"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
            >
              <InstagramLogo size={24} weight="fill" />
            </a>
          </div>
        </motion.section>
      </main>

      <BottomNav cartCount={cartCount} activePage="account" onNavigate={handleNavigate} />
    </div>
  );
}
