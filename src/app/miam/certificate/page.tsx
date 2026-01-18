import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "MIAM Certificate | How to Get Your Certificate for Family Court",
  description: "Learn about MIAM certificates - what they are, how to get one, who can issue them, and what to do if your ex won't attend. Complete guide for England & Wales.",
  keywords: ["miam certificate", "miam form", "fm1 form", "family mediation certificate", "miam certificate cost"],
  alternates: {
    canonical: "https://miam.quest/miam/certificate",
  },
  openGraph: {
    title: "MIAM Certificate | Complete Guide",
    description: "Everything you need to know about getting your MIAM certificate for family court applications.",
    url: "https://miam.quest/miam/certificate",
  },
};

export default function MiamCertificatePage() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Hero */}
      <section className="bg-gradient-to-b from-rose-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <nav className="text-sm text-zinc-500 mb-6">
            <Link href="/" className="hover:text-rose-600">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/miam/what-is-a-miam" className="hover:text-rose-600">MIAM</Link>
            <span className="mx-2">/</span>
            <span className="text-zinc-900 dark:text-white">Certificate</span>
          </nav>

          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
            MIAM <span className="text-rose-600">Certificate</span>
          </h1>

          <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
            Your MIAM certificate proves you&apos;ve attended a Mediation Information Assessment Meeting.
            It&apos;s required before the court will process your family court application.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Key Facts */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
            <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Form Name</h3>
            <p className="text-2xl font-bold text-rose-600">FM1</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Official certificate form</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
            <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Valid For</h3>
            <p className="text-2xl font-bold text-rose-600">4 Months</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">From date of issue</p>
          </div>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
            <h3 className="font-bold text-zinc-900 dark:text-white mb-2">Issued By</h3>
            <p className="text-2xl font-bold text-rose-600">FMC Mediators</p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Accredited only</p>
          </div>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">What is a MIAM Certificate?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            A MIAM certificate (officially known as <strong>Form FM1</strong>) is the official document
            that proves you&apos;ve attended a Mediation Information Assessment Meeting. You need to
            include this certificate when you submit your <Link href="/forms/c100" className="text-rose-600 hover:underline">C100 form</Link> to
            family court.
          </p>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            The certificate confirms one of the following outcomes:
          </p>
          <ul className="space-y-3 mb-4">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Mediation is suitable</span>
                <span className="text-zinc-600 dark:text-zinc-400"> - You can proceed with full mediation sessions</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Mediation not suitable</span>
                <span className="text-zinc-600 dark:text-zinc-400"> - You can proceed to court with the certificate</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 bg-zinc-100 dark:bg-zinc-700 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-zinc-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <span className="font-medium text-zinc-900 dark:text-white">Other party didn&apos;t attend</span>
                <span className="text-zinc-600 dark:text-zinc-400"> - Confirms you attended but the other party refused or didn&apos;t respond</span>
              </div>
            </li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Who Can Issue a MIAM Certificate?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Only mediators who are accredited by the <strong>Family Mediation Council (FMC)</strong> can
            issue valid MIAM certificates. This is a legal requirement.
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-4">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-1">Important</h3>
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  AI assistants like Miam <strong>cannot</strong> issue MIAM certificates. We help you
                  prepare for your MIAM, but you must attend a meeting with an FMC-accredited human
                  mediator to receive a valid certificate.
                </p>
              </div>
            </div>
          </div>
          <p className="text-zinc-600 dark:text-zinc-400">
            You can find accredited mediators through the{" "}
            <a href="https://www.familymediationcouncil.org.uk/find-local-mediator/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">
              Family Mediation Council website
            </a>{" "}
            or through our <Link href="/mediators" className="text-rose-600 hover:underline">mediator directory</Link>.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">How to Get Your Certificate</h2>
          <div className="space-y-4">
            {[
              { step: 1, title: "Find an FMC-accredited mediator", desc: "Search by location or choose a mediator who offers remote sessions." },
              { step: 2, title: "Book your MIAM appointment", desc: "Most mediators offer appointments within 1-2 weeks." },
              { step: 3, title: "Attend the meeting", desc: "The meeting typically lasts 45-60 minutes. It can be in-person or via video call." },
              { step: 4, title: "Receive your certificate", desc: "The mediator will provide your FM1 certificate, usually the same day or within a few days." },
              { step: 5, title: "Include with your court application", desc: "Attach the certificate to your C100 form when you submit it to court." },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="w-10 h-10 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                  {item.step}
                </div>
                <div className="pt-1">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">What if My Ex Won&apos;t Attend?</h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            This is a common concern. Here&apos;s what happens:
          </p>
          <ul className="space-y-3 text-zinc-600 dark:text-zinc-400">
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>You can still attend your own MIAM and get your certificate</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>The mediator will attempt to contact the other party</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>If they refuse or don&apos;t respond, your certificate will note this</span>
            </li>
            <li className="flex items-start gap-2">
              <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>This satisfies the court&apos;s MIAM requirement for your application</span>
            </li>
          </ul>
          <p className="text-zinc-600 dark:text-zinc-400 mt-4">
            The court may direct the other party to attend a MIAM later in the process.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Certificate Validity</h2>
          <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-zinc-900 dark:text-white">4 Months</p>
                <p className="text-zinc-600 dark:text-zinc-400">Your certificate is valid for 4 months from the date of issue</p>
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">
              If your certificate expires before you submit your court application, you&apos;ll need to
              attend another MIAM. Make sure to submit your application while your certificate is still valid.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 mb-4">
            Prepare Before Your MIAM
          </h2>
          <p className="text-rose-800 dark:text-rose-200 mb-6">
            Being prepared helps you get the most from your MIAM meeting. Chat with our AI assistant
            Miam to organize your thoughts and priorities - it&apos;s free.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors"
          >
            Start Preparing (Free)
          </Link>
        </section>

        {/* Related Links */}
        <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-12">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Related Guides</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link href="/miam/what-is-a-miam" className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
              <h3 className="font-medium text-zinc-900 dark:text-white">What is a MIAM?</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Complete guide to MIAMs</p>
            </Link>
            <Link href="/forms/c100" className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
              <h3 className="font-medium text-zinc-900 dark:text-white">C100 Form Guide</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Court application explained</p>
            </Link>
            <Link href="/mediators" className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
              <h3 className="font-medium text-zinc-900 dark:text-white">Find a Mediator</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">FMC-accredited mediators</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
