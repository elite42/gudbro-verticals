import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service - GUDBRO',
  description: 'Read the terms and conditions for using GUDBRO services.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600 mb-8">Last updated: December 12, 2025</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-600 mb-4">
                By accessing or using GUDBRO's services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Services</h2>
              <p className="text-gray-600 mb-4">
                GUDBRO provides a QR-powered digital platform for hospitality businesses, including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Digital menu creation and management</li>
                <li>QR code generation and analytics</li>
                <li>Multi-language and multi-currency support</li>
                <li>Order management and customer engagement tools</li>
                <li>Integration with payment providers</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Account Registration</h2>
              <p className="text-gray-600 mb-4">
                To use our services, you must:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Be at least 18 years old</li>
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Subscription and Payment</h2>
              <p className="text-gray-600 mb-4">
                Some features require a paid subscription. By subscribing:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>You authorize us to charge your payment method</li>
                <li>Subscriptions auto-renew unless cancelled</li>
                <li>Prices may change with 30 days notice</li>
                <li>Refunds are provided according to our refund policy</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. User Content</h2>
              <p className="text-gray-600 mb-4">
                You retain ownership of content you create. By uploading content, you grant us a license to use, display, and distribute it as necessary to provide our services.
              </p>
              <p className="text-gray-600 mb-4">
                You are responsible for ensuring your content:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Does not violate any laws or regulations</li>
                <li>Does not infringe on intellectual property rights</li>
                <li>Is accurate and not misleading</li>
                <li>Does not contain harmful or malicious content</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Prohibited Uses</h2>
              <p className="text-gray-600 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Use the service for illegal purposes</li>
                <li>Attempt to gain unauthorized access</li>
                <li>Interfere with the service's operation</li>
                <li>Transmit viruses or malicious code</li>
                <li>Scrape or harvest data without permission</li>
                <li>Impersonate others or misrepresent affiliation</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property</h2>
              <p className="text-gray-600 mb-4">
                GUDBRO and its licensors retain all rights to the platform, including trademarks, logos, and proprietary technology. You may not copy, modify, or distribute our intellectual property without permission.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              <p className="text-gray-600 mb-4">
                To the maximum extent permitted by law, GUDBRO shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Disclaimer of Warranties</h2>
              <p className="text-gray-600 mb-4">
                Our services are provided "as is" and "as available" without warranties of any kind, either express or implied.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-600 mb-4">
                We may terminate or suspend your account at any time for violations of these terms. You may cancel your account at any time through your account settings.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Governing Law</h2>
              <p className="text-gray-600 mb-4">
                These terms shall be governed by and construed in accordance with the laws of Vietnam, without regard to conflict of law principles.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes to Terms</h2>
              <p className="text-gray-600 mb-4">
                We reserve the right to modify these terms at any time. We will notify you of significant changes via email or through our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                For questions about these Terms of Service:
              </p>
              <ul className="list-none text-gray-600 space-y-1">
                <li>Email: legal@gudbro.com</li>
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
