import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Miam Certificate Quest. Learn how we collect, use, and protect your personal information.",
  alternates: {
    canonical: "https://miam.quest/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">Privacy Policy</h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8">
            Last updated: January 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">1. Introduction</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Miam Certificate Quest (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates the website
              miam.quest. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website and use our
              AI-powered MIAM preparation services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">2. Information We Collect</h2>
            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Information You Provide</h3>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2 mb-4">
              <li>Account information (email address, name) if you create an account</li>
              <li>Conversation data when interacting with our AI assistant Miam</li>
              <li>Information shared during MIAM preparation sessions</li>
              <li>Communication data if you contact us</li>
            </ul>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">Automatically Collected Information</h3>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Device and browser information</li>
              <li>IP address and location data</li>
              <li>Usage patterns and page visits</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">We use collected information to:</p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Provide our AI-powered MIAM preparation services</li>
              <li>Improve and personalize your experience with Miam</li>
              <li>Respond to your inquiries and support requests</li>
              <li>Send administrative information and updates</li>
              <li>Analyze usage to improve our services</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">4. AI Conversation Data</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Conversations with our AI assistant Miam are processed to provide helpful responses
              and may be stored to improve our services. We treat all conversation data as
              confidential. We do not share your personal mediation preparation details with
              third parties except as required to provide our services or as required by law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">5. Cookies</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              We use cookies and similar technologies to enhance your experience. These include:
            </p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
              <li><strong>Essential cookies:</strong> Required for the website to function</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 mt-4">
              You can control cookie settings through your browser preferences.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">6. Third-Party Services</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">We may use third-party services including:</p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Vercel (hosting and analytics)</li>
              <li>Neon (database and authentication)</li>
              <li>AI providers (for our assistant features)</li>
              <li>Hume AI (for voice interaction features)</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400 mt-4">
              These services may collect information as described in their respective privacy policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">7. Data Security</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              We implement appropriate technical and organizational measures to protect your
              personal information. However, no method of transmission over the Internet is
              100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">8. Your Rights</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">Under UK GDPR, you have the right to:</p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Access your personal data</li>
              <li>Rectify inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">9. Contact Us</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              If you have questions about this Privacy Policy or wish to exercise your rights,
              please contact us at:{" "}
              <Link href="/contact" className="text-rose-600 hover:text-rose-500">
                our contact page
              </Link>.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">10. Changes to This Policy</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new Privacy Policy on this page and updating the
              &quot;Last updated&quot; date.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <Link href="/" className="text-rose-600 hover:text-rose-500">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
