import type { Metadata } from "next";
import Link from "next/link";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Mediation Costs UK 2025 | How Much Does Mediation Cost? | MIAM.quest",
  description: "Complete guide to mediation costs in the UK. Learn how much MIAM and family mediation cost, who pays, and how to get free mediation through legal aid or the voucher scheme.",
  keywords: [
    "mediation costs uk",
    "how much does mediation cost",
    "miam cost",
    "family mediation cost",
    "who pays for mediation",
    "free mediation",
    "mediation legal aid",
  ],
  alternates: {
    canonical: "https://miam.quest/mediation/cost",
  },
};

const faqs = [
  {
    question: "How much does mediation cost in the UK?",
    answer: "MIAM appointments typically cost £90-£150. Full family mediation sessions cost £100-£200 per person per session. A complete mediation process usually costs £500-£2,000 total, compared to £5,000-£50,000+ for court proceedings.",
  },
  {
    question: "Who pays for mediation?",
    answer: "Usually, each party pays their own mediation costs. However, you may qualify for legal aid or the Family Mediation Voucher Scheme which can cover all or part of the costs.",
  },
  {
    question: "Can I get free mediation?",
    answer: "Yes. You may qualify for legal aid if you receive certain benefits or have low income. The Family Mediation Voucher Scheme provides up to £500 towards mediation costs for eligible families.",
  },
  {
    question: "Is mediation cheaper than going to court?",
    answer: "Yes, significantly. Mediation typically costs £500-£2,000 total, while contested court proceedings can cost £5,000-£50,000+ in legal fees, plus court fees, and take much longer.",
  },
  {
    question: "How much is a MIAM?",
    answer: "A MIAM (Mediation Information Assessment Meeting) typically costs between £90 and £150. This is a one-off fee for the initial assessment meeting, which lasts about 45-60 minutes.",
  },
];

const costBreakdown = [
  { type: "MIAM (initial meeting)", cost: "£90 - £150", notes: "One-off fee, required before court" },
  { type: "Family mediation (per session)", cost: "£100 - £200 pp", notes: "Per person, per session" },
  { type: "Full mediation (typical total)", cost: "£500 - £2,000", notes: "3-5 sessions average" },
  { type: "Complex cases", cost: "£2,000 - £5,000", notes: "Financial disputes, many issues" },
  { type: "Workplace mediation (per day)", cost: "£1,000 - £3,000", notes: "Usually employer pays" },
  { type: "Legal aid (if eligible)", cost: "FREE", notes: "Means-tested" },
  { type: "Voucher scheme contribution", cost: "Up to £500", notes: "Government funded" },
];

export default function MediationCostPage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://miam.quest" },
    { name: "Mediation", url: "https://miam.quest/mediation/what-is-mediation" },
    { name: "Costs", url: "https://miam.quest/mediation/cost" },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen bg-gradient-to-b from-zinc-900 via-zinc-900 to-zinc-950">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-sm text-zinc-400 mb-6">
              <Link href="/" className="hover:text-white">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/mediation/what-is-mediation" className="hover:text-white">Mediation</Link>
              <span className="mx-2">/</span>
              <Link href="/mediation/cost" className="text-emerald-400">Costs</Link>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mediation Costs UK: How Much Does Mediation Cost in 2025?
            </h1>

            <p className="text-xl text-zinc-300 mb-8">
              Understanding <strong className="text-white">mediation costs</strong> helps you plan
              your budget. This guide breaks down UK mediation prices, who pays, and how to access
              free or subsidised mediation.
            </p>

            <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-6 mb-8">
              <h2 className="text-emerald-400 font-semibold mb-2">Quick Summary</h2>
              <p className="text-zinc-300 m-0">
                MIAM: £90-£150 | Full Mediation: £500-£2,000 | Court Alternative: £5,000-£50,000+
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-12">
          <div className="max-w-4xl mx-auto px-4">

            {/* Cost Breakdown Table */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Mediation Costs Breakdown
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="py-3 px-4 text-white">Service Type</th>
                      <th className="py-3 px-4 text-white">Typical Cost</th>
                      <th className="py-3 px-4 text-white">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-400">
                    {costBreakdown.map((item, index) => (
                      <tr key={index} className="border-b border-zinc-800">
                        <td className="py-3 px-4 font-medium text-zinc-300">{item.type}</td>
                        <td className="py-3 px-4 text-emerald-400 font-semibold">{item.cost}</td>
                        <td className="py-3 px-4 text-sm">{item.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* MIAM Cost */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                How Much Does a MIAM Cost?
              </h2>

              <p className="text-zinc-300 mb-4">
                A{" "}
                <Link href="/miam/what-is-a-miam" className="text-emerald-400 hover:text-emerald-300">
                  MIAM (Mediation Information Assessment Meeting)
                </Link>
                {" "}typically costs between <strong className="text-white">£90 and £150</strong>.
              </p>

              <p className="text-zinc-300 mb-4">
                This is a one-off fee for the initial 45-60 minute meeting where a mediator explains
                the process and assesses whether mediation is suitable for your situation.
              </p>

              <div className="bg-zinc-800 rounded-lg p-6 mb-6">
                <h3 className="text-white font-semibold mb-3">What&apos;s Included in the MIAM Cost?</h3>
                <ul className="text-zinc-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Explanation of the mediation process
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Assessment of suitability for mediation
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <Link href="/miam/certificate" className="text-emerald-400 hover:text-emerald-300">
                      MIAM certificate
                    </Link>
                    {" "}(if required for court)
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Information about{" "}
                    <Link href="/miam/exemptions" className="text-emerald-400 hover:text-emerald-300">
                      exemptions
                    </Link>
                    {" "}if applicable
                  </li>
                </ul>
              </div>
            </section>

            {/* Who Pays */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Who Pays for Mediation?
              </h2>

              <p className="text-zinc-300 mb-4">
                Usually, <strong className="text-white">each party pays their own mediation costs</strong>.
                For a MIAM, only the person attending pays. For joint mediation sessions, costs are
                typically split equally.
              </p>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-emerald-400 font-semibold mb-3">Family Mediation</h3>
                  <p className="text-zinc-400 text-sm">
                    Each party pays their own share. Costs can be claimed as part of a financial
                    settlement, or one party may agree to pay more.
                  </p>
                </div>
                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-emerald-400 font-semibold mb-3">Workplace Mediation</h3>
                  <p className="text-zinc-400 text-sm">
                    Usually paid by the employer as part of their dispute resolution process.
                    Sometimes costs are shared with employees.
                  </p>
                </div>
              </div>
            </section>

            {/* Free Mediation */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Free Mediation: Legal Aid & Voucher Scheme
              </h2>

              <div className="space-y-6">
                <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-6">
                  <h3 className="text-emerald-400 font-semibold mb-3">Legal Aid</h3>
                  <p className="text-zinc-300 mb-4">
                    If you qualify for legal aid, your MIAM and mediation sessions are <strong>completely free</strong>.
                  </p>
                  <p className="text-zinc-400 text-sm mb-4">You may qualify if you:</p>
                  <ul className="text-zinc-400 text-sm space-y-1">
                    <li>- Receive certain benefits (Income Support, JSA, Universal Credit, etc.)</li>
                    <li>- Have a gross monthly income under £2,657 (or £2,881 with dependants)</li>
                    <li>- Have disposable capital under £8,000</li>
                    <li>- Are experiencing domestic abuse</li>
                  </ul>
                  <a
                    href="https://www.gov.uk/check-legal-aid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-emerald-400 hover:text-emerald-300 text-sm"
                  >
                    Check if you qualify on Gov.uk &rarr;
                  </a>
                </div>

                <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6">
                  <h3 className="text-blue-400 font-semibold mb-3">Family Mediation Voucher Scheme</h3>
                  <p className="text-zinc-300 mb-4">
                    The government provides up to <strong>£500</strong> towards mediation costs for eligible families.
                  </p>
                  <p className="text-zinc-400 text-sm mb-4">You may be eligible if:</p>
                  <ul className="text-zinc-400 text-sm space-y-1">
                    <li>- Your dispute involves children</li>
                    <li>- You don&apos;t qualify for legal aid</li>
                    <li>- You haven&apos;t used the scheme before for this dispute</li>
                    <li>- The mediator is registered with the scheme</li>
                  </ul>
                  <a
                    href="https://www.familymediationcouncil.org.uk/family-mediation-voucher-scheme/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-blue-400 hover:text-blue-300 text-sm"
                  >
                    Learn more about the voucher scheme &rarr;
                  </a>
                </div>
              </div>
            </section>

            {/* Mediation vs Court */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Mediation Costs vs Court Costs
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="py-3 px-4 text-white">Aspect</th>
                      <th className="py-3 px-4 text-emerald-400">Mediation</th>
                      <th className="py-3 px-4 text-red-400">Court</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-400">
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Typical total cost</td>
                      <td className="py-3 px-4 text-emerald-400">£500 - £2,000</td>
                      <td className="py-3 px-4 text-red-400">£5,000 - £50,000+</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Court fees</td>
                      <td className="py-3 px-4 text-emerald-400">£0</td>
                      <td className="py-3 px-4 text-red-400">£232 (C100) + hearing fees</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Legal fees</td>
                      <td className="py-3 px-4 text-emerald-400">Usually none</td>
                      <td className="py-3 px-4 text-red-400">£200-£350/hour</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Timeframe</td>
                      <td className="py-3 px-4 text-emerald-400">6-8 weeks</td>
                      <td className="py-3 px-4 text-red-400">6-18 months</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-zinc-300">Potential savings</td>
                      <td className="py-3 px-4 text-emerald-400 font-bold" colSpan={2}>80-95% compared to court</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-zinc-400 mt-6 text-sm">
                Learn more about the{" "}
                <Link href="/forms/c100" className="text-emerald-400 hover:text-emerald-300">C100 form and court process</Link>.
              </p>
            </section>

            {/* FAQ */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Frequently Asked Questions
              </h2>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="bg-zinc-800 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                    <p className="text-zinc-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="bg-gradient-to-r from-emerald-900/50 to-zinc-800 rounded-xl p-8 text-center mb-12">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Start Your Mediation Journey?
              </h2>
              <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                Chat with Miam to understand your options and get prepared for mediation.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors"
                >
                  Talk to Miam
                </Link>
                <Link
                  href="/miam/what-is-a-miam"
                  className="px-8 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-lg transition-colors"
                >
                  What is a MIAM?
                </Link>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="bg-zinc-800/50 rounded-lg p-6 mb-8">
              <h3 className="text-zinc-400 font-semibold mb-2">Disclaimer</h3>
              <p className="text-zinc-500 text-sm">
                Prices are indicative and may vary by provider and region. This information is
                provided for general guidance only. MIAM.quest is an AI-powered preparation tool -
                we do not provide mediation services. Contact mediators directly for current pricing.
              </p>
            </section>

            {/* Related Pages */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4">Related Pages</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/miam/what-is-a-miam" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  What is a MIAM?
                </Link>
                <Link href="/mediation/what-is-mediation" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  What is Mediation?
                </Link>
                <Link href="/miam/certificate" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  MIAM Certificate
                </Link>
                <Link href="/forms/c100" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  C100 Form Guide
                </Link>
                <Link href="/miam/exemptions" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  MIAM Exemptions
                </Link>
              </div>
            </section>

          </div>
        </article>
      </main>
    </>
  );
}
