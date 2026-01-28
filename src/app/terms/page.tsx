import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms of use for Miam Certificate Quest. Read our terms and conditions for using our MIAM preparation services.",
  alternates: {
    canonical: "https://miam.quest/terms",
  },
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">Terms of Use</h1>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-8">
            Last updated: January 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              By accessing and using Miam Certificate Quest (miam.quest), you
              accept and agree to be bound by these Terms of Use. If you do not agree to these
              terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">2. Description of Services</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Our website provides AI-powered MIAM (Mediation Information Assessment Meeting)
              preparation services for UK family disputes. We help separating couples prepare
              for their legally-required MIAM through voice and chat conversations with our
              AI assistant, Miam.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">3. Disclaimer - Not Legal or Professional Advice</h2>
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 mb-4">
              <p className="text-amber-700 dark:text-amber-300 font-semibold mb-2">Important Notice</p>
              <p className="text-zinc-600 dark:text-zinc-400">
                Miam Certificate Quest is an AI preparation tool, not a mediation service.
                We cannot provide legal advice, issue MIAM certificates, or replace the
                services of FMC-accredited mediators or family solicitors. Only qualified,
                FMC-accredited mediators can issue valid MIAM certificates.
              </p>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              You should always consult with an FMC-accredited mediator or qualified family
              solicitor for legal advice and to obtain your MIAM certificate. We accept no
              liability for decisions made based on information provided by our AI assistant.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">4. AI Assistant Limitations</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Our AI assistant Miam is designed to help you prepare for mediation and
              understand your options. While Miam strives to be accurate and helpful:
            </p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2 mt-4">
              <li>Miam may occasionally provide incorrect or outdated information</li>
              <li>Miam cannot access your personal circumstances beyond what you share</li>
              <li>Miam cannot provide personalized legal advice</li>
              <li>Miam cannot issue MIAM certificates or legally binding documents</li>
              <li>Complex situations may require specialist professional guidance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">5. User Responsibilities</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">When using our services, you agree to:</p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2">
              <li>Use our services for their intended purpose of MIAM preparation</li>
              <li>Seek professional advice from qualified mediators or solicitors</li>
              <li>Not use our services for any unlawful purpose</li>
              <li>Not attempt to interfere with or disrupt our services</li>
              <li>Respect the confidentiality of any other parties involved in your situation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">6. Sensitive Topics</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              If you are experiencing domestic abuse or have concerns about child safety,
              please contact appropriate support services immediately. Our AI assistant
              will provide information about exemptions and support resources, but cannot
              replace emergency services or professional support.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">7. Intellectual Property</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              All content on this website, including text, graphics, logos, and software,
              is the property of Miam Certificate Quest or its licensors and is protected
              by copyright and other intellectual property laws. You may not reproduce,
              distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">8. External Links</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Our website contains links to external websites, including government resources
              (GOV.UK, Family Mediation Council, Cafcass). We are not responsible for
              the content or accuracy of these external sites. These links are provided for
              convenience and do not signify endorsement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">9. Limitation of Liability</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              To the fullest extent permitted by law, Miam Certificate Quest shall not be
              liable for any direct, indirect, incidental, special, consequential, or punitive
              damages arising from your use of our services or reliance on information provided.
              This includes any errors or omissions in our AI assistant&apos;s responses.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">10. Indemnification</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              You agree to indemnify and hold harmless Miam Certificate Quest from any
              claims, losses, or damages arising from your use of our services or violation
              of these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">11. Changes to Terms</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              We reserve the right to modify these Terms of Use at any time. Changes will be
              effective immediately upon posting. Your continued use of our services after
              changes are posted constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">12. Governing Law</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              These Terms of Use are governed by the laws of England and Wales. Any disputes
              shall be subject to the exclusive jurisdiction of the courts of England and Wales.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">13. Contact</h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              For questions about these Terms of Use, please visit our{" "}
              <Link href="/contact" className="text-rose-600 hover:text-rose-500">
                contact page
              </Link>.
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
