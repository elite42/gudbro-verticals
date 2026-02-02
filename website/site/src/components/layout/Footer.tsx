import Link from 'next/link';
import {
  FacebookLogo,
  InstagramLogo,
  LinkedinLogo,
  TwitterLogo
} from '@phosphor-icons/react/dist/ssr';

const footerLinks = {
  verticals: [
    { name: 'Coffeeshop', href: '/coffeeshop' },
    { name: 'Tours', href: '/tours' },
    { name: 'Stays', href: '/stays' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'Rentals', href: '/rentals' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'Partnership Network', href: '/partnership-network' },
    { name: 'Contact', href: '/contact' },
  ],
  resources: [
    { name: 'Blog', href: '/blog' },
    { name: 'Help Center', href: '/help' },
    { name: 'API Docs', href: '/docs' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

const socialLinks = [
  { name: 'Facebook', href: '#', icon: FacebookLogo },
  { name: 'Instagram', href: '#', icon: InstagramLogo },
  { name: 'Twitter', href: '#', icon: TwitterLogo },
  { name: 'LinkedIn', href: '#', icon: LinkedinLogo },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--neutral-200)] bg-[var(--neutral-50)]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--primary)]">
                <span className="text-xl font-bold text-white">G</span>
              </div>
              <span className="text-xl font-bold text-[var(--neutral-900)]">GUDBRO</span>
            </Link>
            <p className="mt-4 text-sm text-[var(--neutral-600)]">
              Zero commission PWAs for cafes, tours, hotels & more in Southeast Asia.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-[var(--neutral-400)] transition-colors hover:text-[var(--primary)]"
                  aria-label={item.name}
                >
                  <item.icon size={24} />
                </a>
              ))}
            </div>
          </div>

          {/* Verticals */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--neutral-900)]">Verticals</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.verticals.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--neutral-600)] transition-colors hover:text-[var(--primary)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--neutral-900)]">Company</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--neutral-600)] transition-colors hover:text-[var(--primary)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-[var(--neutral-900)]">Resources</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--neutral-600)] transition-colors hover:text-[var(--primary)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="mt-8 text-sm font-semibold text-[var(--neutral-900)]">Legal</h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--neutral-600)] transition-colors hover:text-[var(--primary)]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-[var(--neutral-200)] pt-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-[var(--neutral-500)]">
              © {new Date().getFullYear()} GUDBRO. All rights reserved.
            </p>
            <p className="text-sm text-[var(--neutral-500)]">
              Made with ❤️ in Vietnam 🇻🇳
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
