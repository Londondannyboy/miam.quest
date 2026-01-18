import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "What is a MIAM? | Complete Guide to Mediation Information Assessment Meetings",
  description: "Learn what a MIAM is, why it's required before family court in England & Wales, what happens during the meeting, and how to prepare. Free comprehensive guide.",
  keywords: ["what is a miam", "miam meaning", "miam mediation", "mediation information assessment meeting", "family mediation uk"],
  alternates: {
    canonical: "https://miam.quest/miam/what-is-a-miam",
  },
  openGraph: {
    title: "What is a MIAM? | Complete Guide",
    description: "Everything you need to know about MIAMs - the mandatory meeting before family court applications in England & Wales.",
    url: "https://miam.quest/miam/what-is-a-miam",
  },
};

// FAQ Schema for SEO
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What does MIAM stand for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "MIAM stands for Mediation Information Assessment Meeting. It's a mandatory meeting with a family mediator that you must attend before applying to family court in England and Wales."
      }
    },
    {
      "@type": "Question",
      name: "How long does a MIAM take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A MIAM typically takes 45-60 minutes. It's usually a one-off meeting where the mediator explains the mediation process and assesses whether your case is suitable for mediation."
      }
    },
    {
      "@type": "Question",
      name: "How much does a MIAM cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A MIAM typically costs between £90-150 per person. However, if you qualify for legal aid, the MIAM is free. The Family Mediation Voucher Scheme also provides £500 towards mediation costs."
      }
    },
    {
      "@type": "Question",
      name: "Do both parents need to attend a MIAM?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Each parent attends their own MIAM separately - you don't attend together. If the other parent refuses to attend, you can still get your certificate confirming you attended."
      }
    }
  ]
};

export default function WhatIsAMiamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-white dark:bg-zinc-950">
        {/* Hero */}
        <section className="bg-gradient-to-b from-rose-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-sm text-zinc-500 mb-6">
              <Link href="/" className="hover:text-rose-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-zinc-900 dark:text-white">What is a MIAM?</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              What is a <span className="text-rose-600">MIAM</span>?
            </h1>

            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              A comprehensive guide to Mediation Information Assessment Meetings -
              the mandatory first step before family court applications in England and Wales.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors"
              >
                Prepare with Miam (Free)
              </Link>
              <Link
                href="/miam/certificate"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg font-medium transition-colors hover:border-rose-300"
              >
                About MIAM Certificates
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Quick Answer Box */}
          <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-6 mb-12">
            <h2 className="text-lg font-bold text-rose-900 dark:text-rose-100 mb-2">Quick Answer</h2>
            <p className="text-rose-800 dark:text-rose-200">
              A <strong>MIAM</strong> (Mediation Information Assessment Meeting) is a mandatory meeting
              with a family mediator that you must attend before making most applications to family court
              in England and Wales. It typically lasts 45-60 minutes and costs £90-150 (or free with legal aid).
            </p>
          </div>

          {/* Table of Contents */}
          <nav className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 mb-12">
            <h2 className="font-bold text-zinc-900 dark:text-white mb-4">In This Guide</h2>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li><a href="#what-is-miam" className="hover:text-rose-600">What is a MIAM?</a></li>
              <li><a href="#why-required" className="hover:text-rose-600">Why is a MIAM Required?</a></li>
              <li><a href="#what-happens" className="hover:text-rose-600">What Happens at a MIAM?</a></li>
              <li><a href="#cost" className="hover:text-rose-600">How Much Does a MIAM Cost?</a></li>
              <li><a href="#exemptions" className="hover:text-rose-600">MIAM Exemptions</a></li>
              <li><a href="#prepare" className="hover:text-rose-600">How to Prepare</a></li>
              <li><a href="#faq" className="hover:text-rose-600">Frequently Asked Questions</a></li>
            </ul>
          </nav>

          {/* Content Sections */}
          <section id="what-is-miam" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">What is a MIAM?</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              MIAM stands for <strong>Mediation Information Assessment Meeting</strong>. It&apos;s a
              meeting with a qualified family mediator where they explain how mediation works and
              assess whether it&apos;s suitable for your situation.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              The MIAM was introduced by the <em>Children and Families Act 2014</em> to encourage
              families to resolve disputes outside of court wherever possible. Court proceedings
              can be lengthy, expensive, and stressful - mediation offers a more collaborative alternative.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-rose-600 mb-1">45-60</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Minutes Duration</div>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-rose-600 mb-1">£90-150</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Typical Cost</div>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-rose-600 mb-1">4</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">Months Certificate Valid</div>
              </div>
            </div>
          </section>

          <section id="why-required" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Why is a MIAM Required?</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Before you can submit a <Link href="/forms/c100" className="text-rose-600 hover:underline">C100 form</Link> (the
              application for a Child Arrangements Order) to family court, you must either:
            </p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2 mb-4">
              <li>Have attended a MIAM and received a certificate, OR</li>
              <li>Qualify for an exemption (such as domestic abuse or urgency)</li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400">
              The court will not process your application without proof that you&apos;ve met this requirement.
              This applies to most family court applications involving children or finances after separation.
            </p>
          </section>

          <section id="what-happens" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">What Happens at a MIAM?</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Introduction</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">The mediator introduces themselves and explains the purpose of the meeting. They&apos;ll outline confidentiality.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Your Situation</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">You&apos;ll be asked about your circumstances - children, current arrangements, and what you&apos;re hoping to achieve.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Mediation Explained</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">The mediator explains how mediation works, its benefits, and what to expect if you proceed.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Suitability Assessment</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">The mediator assesses whether mediation is appropriate for your case, including any safety concerns.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">5</div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">Certificate Issued</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">You receive your MIAM certificate - either to proceed with mediation, or confirming that mediation isn&apos;t suitable.</p>
                </div>
              </div>
            </div>
          </section>

          <section id="cost" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">How Much Does a MIAM Cost?</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-zinc-100 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Option</th>
                    <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Cost</th>
                    <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Standard MIAM</td>
                    <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">£90-150</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Per person</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">With Legal Aid</td>
                    <td className="px-4 py-3 text-green-600 font-medium">Free</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">If you qualify financially</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Voucher Scheme</td>
                    <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">£500 contribution</td>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">Government scheme for full mediation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mt-4">
              <Link href="/mediation/cost" className="text-rose-600 hover:underline">Learn more about mediation costs</Link>
            </p>
          </section>

          <section id="exemptions" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">MIAM Exemptions</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              You may be exempt from attending a MIAM if:
            </p>
            <ul className="space-y-3">
              {[
                { title: "Domestic Abuse", desc: "Evidence of domestic abuse (police, court orders, medical evidence)" },
                { title: "Child Protection", desc: "Local authority involvement in child protection" },
                { title: "Urgency", desc: "Risk of harm or child abduction requiring immediate action" },
                { title: "Previous MIAM", desc: "You attended a MIAM for the same dispute in the last 4 months" },
                { title: "Other Party Overseas", desc: "The other party lives outside England & Wales" },
                { title: "Other Party in Prison", desc: "The other party is in prison or a secure hospital" },
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <span className="font-medium text-zinc-900 dark:text-white">{item.title}</span>
                    <span className="text-zinc-600 dark:text-zinc-400"> - {item.desc}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mt-6">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                <strong>Important:</strong> If you claim an exemption, you must tick the relevant box on the C100 form
                and may need to provide evidence. If you&apos;re unsure whether you qualify, speak to a solicitor or mediator.
              </p>
            </div>
          </section>

          <section id="prepare" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">How to Prepare for Your MIAM</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Being prepared helps you get the most from your MIAM. Here&apos;s what to think about:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Think About</h3>
                <ul className="text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                  <li>What outcomes do you want?</li>
                  <li>What&apos;s most important to you?</li>
                  <li>What are your red lines?</li>
                  <li>What might you be flexible on?</li>
                </ul>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-4">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Bring With You</h3>
                <ul className="text-zinc-600 dark:text-zinc-400 text-sm space-y-1">
                  <li>Children&apos;s details and ages</li>
                  <li>Current arrangements info</li>
                  <li>Any relevant court orders</li>
                  <li>Questions you want to ask</li>
                </ul>
              </div>
            </div>
            <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg p-6 mt-6">
              <h3 className="font-bold text-rose-900 dark:text-rose-100 mb-2">Prepare with Miam (Free)</h3>
              <p className="text-rose-800 dark:text-rose-200 mb-4">
                Our AI assistant Miam can help you organize your thoughts and priorities before your MIAM meeting.
                It&apos;s free and confidential.
              </p>
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                Start Preparing Now
              </Link>
            </div>
          </section>

          <section id="faq" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Do both parents need to attend a MIAM?", a: "Each parent attends their own MIAM separately - you don't attend together initially. If the other parent refuses to attend or doesn't respond, you can still get your certificate." },
                { q: "What if my ex won't attend?", a: "You can still proceed. The mediator will attempt to contact the other party. If they don't respond or refuse, your certificate will note this, and you can proceed to court." },
                { q: "Can I do a MIAM online?", a: "Yes, many mediators offer remote MIAMs via video call. This became more common during COVID-19 and remains a convenient option." },
                { q: "How long is a MIAM certificate valid?", a: "A MIAM certificate is valid for 4 months from the date it's issued. After that, you'd need to attend another MIAM." },
                { q: "Is a MIAM the same as mediation?", a: "No. A MIAM is just an initial assessment meeting (one session). Full mediation involves multiple sessions where you work with your ex to reach agreements." },
              ].map((faq, i) => (
                <details key={i} className="group bg-zinc-50 dark:bg-zinc-800 rounded-xl">
                  <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                    <h3 className="font-medium text-zinc-900 dark:text-white pr-4">{faq.q}</h3>
                    <svg className="w-5 h-5 text-zinc-500 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-4 pb-4">
                    <p className="text-zinc-600 dark:text-zinc-400">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </section>

          {/* Related Links */}
          <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/miam/certificate" className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                <h3 className="font-medium text-zinc-900 dark:text-white">MIAM Certificate</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">How to get your certificate</p>
              </Link>
              <Link href="/forms/c100" className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                <h3 className="font-medium text-zinc-900 dark:text-white">C100 Form Guide</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Court application explained</p>
              </Link>
              <Link href="/mediation/cost" className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                <h3 className="font-medium text-zinc-900 dark:text-white">Mediation Costs</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">What to expect to pay</p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
