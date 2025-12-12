import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - GUDBRO',
  description: 'Learn how GUDBRO collects, uses, and protects your personal information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: December 12, 2025</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-600 mb-4">
                GUDBRO ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our QR-powered digital menu and hospitality platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Information You Provide</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Account information (name, email address, password)</li>
                <li>Business information (business name, type, location)</li>
                <li>Payment information (processed securely by our payment providers)</li>
                <li>Content you create (menus, product descriptions, images)</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Information Collected Automatically</h3>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Device information (browser type, operating system)</li>
                <li>Usage data (pages visited, features used, time spent)</li>
                <li>Location data (with your consent)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To process transactions and send related information</li>
                <li>To send promotional communications (with your consent)</li>
                <li>To improve our services and develop new features</li>
                <li>To detect, prevent, and address technical issues</li>
                <li>To comply with legal obligations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing</h2>
              <p className="text-gray-600 mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Business partners with your consent</li>
                <li>Law enforcement when required by law</li>
                <li>Other parties in connection with a merger or acquisition</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security</h2>
              <p className="text-gray-600 mb-4">
                We implement appropriate technical and organizational measures to protect your personal information, including encryption, secure servers, and regular security assessments.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Your Rights</h2>
              <p className="text-gray-600 mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Delete your data</li>
                <li>Object to or restrict processing</li>
                <li>Data portability</li>
                <li>Withdraw consent</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Cookies</h2>
              <p className="text-gray-600 mb-4">
                We use cookies and similar technologies to enhance your experience. For more information, please see our{' '}
                <Link href="/cookies" className="text-gray-900 underline hover:no-underline">Cookie Policy</Link>.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Transfers</h2>
              <p className="text-gray-600 mb-4">
                Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-600 mb-4">
                Our services are not intended for children under 16. We do not knowingly collect information from children under 16.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Changes to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <ul className="list-none text-gray-600 space-y-1">
                <li>Email: privacy@gudbro.com</li>
                <li>Address: Da Nang, Vietnam</li>
              </ul>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              &larr; Back to home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
