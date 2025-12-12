import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy - GUDBRO',
  description: 'Learn how GUDBRO uses cookies and similar technologies.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: December 12, 2025</p>

          <div className="prose prose-gray max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="text-gray-600 mb-4">
                Cookies are small text files that are stored on your device when you visit a website. They help the website remember your preferences and improve your browsing experience.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. How We Use Cookies</h2>
              <p className="text-gray-600 mb-4">
                GUDBRO uses cookies for the following purposes:
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.1 Essential Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies are necessary for the website to function properly. They enable core features like authentication, security, and accessibility.
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Session management</li>
                <li>Authentication tokens</li>
                <li>Security features</li>
                <li>Load balancing</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.2 Analytics Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Page visit statistics</li>
                <li>Traffic sources</li>
                <li>User journey tracking</li>
                <li>Performance metrics</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.3 Functional Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies enable enhanced functionality and personalization:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Language preferences</li>
                <li>Currency settings</li>
                <li>User interface customization</li>
                <li>Recently viewed items</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">2.4 Marketing Cookies</h3>
              <p className="text-gray-600 mb-4">
                These cookies may be set by our advertising partners to build a profile of your interests:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Targeted advertising</li>
                <li>Social media integration</li>
                <li>Conversion tracking</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies We Use</h2>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Cookie Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Purpose</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">session_id</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Session management</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Session</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">auth_token</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Authentication</td>
                      <td className="px-4 py-3 text-sm text-gray-600">7 days</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">language</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Language preference</td>
                      <td className="px-4 py-3 text-sm text-gray-600">1 year</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">currency</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Currency preference</td>
                      <td className="px-4 py-3 text-sm text-gray-600">1 year</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-sm text-gray-600">_ga</td>
                      <td className="px-4 py-3 text-sm text-gray-600">Google Analytics</td>
                      <td className="px-4 py-3 text-sm text-gray-600">2 years</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Managing Cookies</h2>
              <p className="text-gray-600 mb-4">
                You can control and manage cookies in several ways:
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Browser Settings</h3>
              <p className="text-gray-600 mb-4">
                Most browsers allow you to refuse or delete cookies. The method varies by browser:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Chrome: Settings &gt; Privacy and security &gt; Cookies</li>
                <li>Firefox: Options &gt; Privacy & Security &gt; Cookies</li>
                <li>Safari: Preferences &gt; Privacy &gt; Cookies</li>
                <li>Edge: Settings &gt; Cookies and site permissions</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">Opt-Out Links</h3>
              <p className="text-gray-600 mb-4">
                You can opt out of specific cookies:
              </p>
              <ul className="list-disc pl-6 text-gray-600 mb-4 space-y-2">
                <li>Google Analytics: <a href="https://tools.google.com/dlpage/gaoptout" className="text-gray-900 underline hover:no-underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out</a></li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Third-Party Cookies</h2>
              <p className="text-gray-600 mb-4">
                Some cookies are placed by third-party services that appear on our pages. We do not control these cookies and recommend reviewing the privacy policies of these third parties.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Updates to This Policy</h2>
              <p className="text-gray-600 mb-4">
                We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Contact Us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about our use of cookies:
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
