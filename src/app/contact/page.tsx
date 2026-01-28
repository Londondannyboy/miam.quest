import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact Miam Certificate Quest for questions about MIAM preparation, family mediation, or our AI assistant.",
  alternates: {
    canonical: "https://miam.quest/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">Contact Us</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg mb-12">
          Have questions about MIAM preparation or feedback about our service? We&apos;re here to help.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* AI Assistant Card */}
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
            <div className="w-14 h-14 bg-rose-500/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-rose-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Ask Miam</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">
              For MIAM and mediation questions, try our AI-powered assistant Miam. Available 24/7
              on the homepage - just use the chat sidebar.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-xl font-medium transition-colors"
            >
              Talk to Miam
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Official Resources Card */}
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8">
            <div className="w-14 h-14 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">Find a Mediator</h2>
            <p className="text-zinc-500 dark:text-zinc-400 mb-6">
              For your actual MIAM certificate, you need an FMC-accredited mediator.
              Use the official Family Mediation Council directory.
            </p>
            <a
              href="https://www.familymediationcouncil.org.uk/find-local-mediator/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium transition-colors"
            >
              Find Mediators
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Common Questions</h2>
          <div className="space-y-4">
            <details className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl group">
              <summary className="flex justify-between items-center cursor-pointer p-5 font-medium text-zinc-900 dark:text-white">
                Can Miam issue my MIAM certificate?
                <span className="ml-2 transition-transform group-open:rotate-180 text-zinc-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                No, Miam is an AI preparation tool and cannot issue MIAM certificates. Only FMC-accredited
                human mediators can issue valid MIAM certificates required for family court applications.
                We help you prepare for your MIAM meeting.
              </div>
            </details>

            <details className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl group">
              <summary className="flex justify-between items-center cursor-pointer p-5 font-medium text-zinc-900 dark:text-white">
                Is this service free?
                <span className="ml-2 transition-transform group-open:rotate-180 text-zinc-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                Yes! Miam Certificate Quest is free to use. Our AI assistant helps you understand
                the MIAM process, prepare for mediation, and know what to expect - all at no cost.
              </div>
            </details>

            <details className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl group">
              <summary className="flex justify-between items-center cursor-pointer p-5 font-medium text-zinc-900 dark:text-white">
                Is my conversation with Miam confidential?
                <span className="ml-2 transition-transform group-open:rotate-180 text-zinc-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                We treat all conversations as confidential. See our{" "}
                <Link href="/privacy" className="text-rose-600 hover:text-rose-500">privacy policy</Link> for
                details on how we handle your data. Note that conversations with AI are not legally privileged
                in the same way as conversations with a solicitor.
              </div>
            </details>

            <details className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl group">
              <summary className="flex justify-between items-center cursor-pointer p-5 font-medium text-zinc-900 dark:text-white">
                Found a bug or have feedback?
                <span className="ml-2 transition-transform group-open:rotate-180 text-zinc-400">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </summary>
              <div className="px-5 pb-5 text-zinc-500 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-4">
                We appreciate your feedback! We&apos;re currently in beta and actively improving.
                If you&apos;ve found an issue or have suggestions, please let Miam know during your
                conversation - we review all feedback to improve the service.
              </div>
            </details>
          </div>
        </section>

        {/* Important Notice */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 mb-12">
          <h3 className="text-lg font-bold text-amber-700 dark:text-amber-400 mb-3">Important Notice</h3>
          <p className="text-zinc-600 dark:text-zinc-400">
            Miam Certificate Quest cannot provide legal advice. For questions about your specific
            circumstances, please consult an FMC-accredited mediator or qualified family solicitor.
            If you are experiencing domestic abuse, please contact the{" "}
            <a href="https://www.nationaldahelpline.org.uk/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-500">
              National Domestic Abuse Helpline
            </a>{" "}
            (0808 2000 247).
          </p>
        </div>

        {/* Official Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Official Resources</h2>
          <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl divide-y divide-zinc-200 dark:divide-zinc-800">
            {[
              {
                href: "https://www.familymediationcouncil.org.uk/",
                label: "Family Mediation Council",
                desc: "Find FMC-accredited mediators and learn about MIAM",
              },
              {
                href: "https://www.gov.uk/looking-after-children-divorce",
                label: "GOV.UK - Children and Divorce",
                desc: "Official government guidance on child arrangements",
              },
              {
                href: "https://www.cafcass.gov.uk/",
                label: "Cafcass",
                desc: "Children and Family Court Advisory and Support Service",
              },
              {
                href: "https://www.nfm.org.uk/",
                label: "National Family Mediation",
                desc: "Charity providing family mediation services across England and Wales",
              },
            ].map((link, index) => (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-5 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors group"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-zinc-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                    {link.label}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400">{link.desc}</p>
                </div>
              </a>
            ))}
          </div>
        </section>

        <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800">
          <Link href="/" className="text-rose-600 hover:text-rose-500">
            &larr; Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
