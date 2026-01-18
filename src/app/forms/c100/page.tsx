import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "C100 Form | Complete Guide to Child Arrangements Order Application 2025",
  description: "Everything you need to know about the C100 form - how to apply to family court for a Child Arrangements Order. Includes costs, MIAM requirements, and step-by-step guide.",
  keywords: ["c100 form", "c100 application", "child arrangements order", "family court application", "c100 form download", "c100 cost"],
  alternates: {
    canonical: "https://miam.quest/forms/c100",
  },
  openGraph: {
    title: "C100 Form | Complete Guide 2025",
    description: "Everything you need to know about the C100 form for family court applications. Costs, MIAM requirements, and how to complete it.",
    url: "https://miam.quest/forms/c100",
  },
};

// Schema markup
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "C100 Form - Complete Guide to Child Arrangements Order Application",
  description: "Everything you need to know about the C100 form for family court applications in England and Wales.",
  author: {
    "@type": "Organization",
    name: "MIAM.quest"
  },
  publisher: {
    "@type": "Organization",
    name: "MIAM.quest",
    url: "https://miam.quest"
  }
};

export default function C100FormPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="min-h-screen bg-white dark:bg-zinc-950">
        {/* Hero */}
        <section className="bg-gradient-to-b from-rose-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-16">
          <div className="max-w-4xl mx-auto px-4">
            <nav className="text-sm text-zinc-500 mb-6">
              <Link href="/" className="hover:text-rose-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-zinc-900 dark:text-white">C100 Form</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              <span className="text-rose-600">C100 Form</span> Guide
            </h1>

            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              The C100 is the official application form for a Child Arrangements Order in family court.
              This guide explains everything you need to know about completing and submitting the form.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="https://www.gov.uk/government/publications/form-c100-application-under-the-children-act-1989-for-a-child-arrangements-prohibited-steps-specific-issue-section-8-order-or-to-vary-or-discharge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors"
              >
                Download C100 Form
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <Link
                href="/miam/what-is-a-miam"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white rounded-lg font-medium transition-colors hover:border-rose-300"
              >
                MIAM Requirement
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 py-12">
          {/* Key Facts */}
          <div className="grid md:grid-cols-4 gap-4 mb-12">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-rose-600">£232</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Court Fee</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-rose-600">MIAM</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Required First</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-rose-600">4-6 Weeks</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">First Hearing</p>
            </div>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 text-center">
              <p className="text-2xl font-bold text-rose-600">Online</p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">Can Apply Online</p>
            </div>
          </div>

          {/* Quick Answer */}
          <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-6 mb-12">
            <h2 className="text-lg font-bold text-rose-900 dark:text-rose-100 mb-2">Quick Summary</h2>
            <p className="text-rose-800 dark:text-rose-200">
              The <strong>C100 form</strong> is the official application to family court for a Child
              Arrangements Order (what used to be called &quot;custody&quot; or &quot;contact&quot; orders). Before
              you can submit it, you must attend a <Link href="/miam/what-is-a-miam" className="underline">MIAM</Link> or
              have an exemption. The court fee is £232 (or free with fee remission).
            </p>
          </div>

          {/* Table of Contents */}
          <nav className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6 mb-12">
            <h2 className="font-bold text-zinc-900 dark:text-white mb-4">In This Guide</h2>
            <ul className="grid md:grid-cols-2 gap-2 text-zinc-600 dark:text-zinc-400">
              <li><a href="#what-is-c100" className="hover:text-rose-600">What is the C100 Form?</a></li>
              <li><a href="#when-need" className="hover:text-rose-600">When Do You Need a C100?</a></li>
              <li><a href="#miam-requirement" className="hover:text-rose-600">MIAM Requirement</a></li>
              <li><a href="#how-to-complete" className="hover:text-rose-600">How to Complete the Form</a></li>
              <li><a href="#cost" className="hover:text-rose-600">Costs & Fee Remission</a></li>
              <li><a href="#what-happens-next" className="hover:text-rose-600">What Happens After You Apply</a></li>
            </ul>
          </nav>

          <section id="what-is-c100" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">What is the C100 Form?</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              The C100 form, officially titled &quot;<strong>Application under the Children Act 1989</strong>&quot;,
              is the form you use to apply to family court for orders about children. This includes:
            </p>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400 mb-4">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Child Arrangements Order</strong> - Where children live and who they spend time with</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Prohibited Steps Order</strong> - To prevent the other parent from doing something specific</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-rose-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Specific Issue Order</strong> - For decisions about schooling, medical treatment, etc.</span>
              </li>
            </ul>
            <p className="text-zinc-600 dark:text-zinc-400">
              The form replaced what used to be called &quot;custody&quot; and &quot;access&quot; applications.
              Courts now focus on &quot;arrangements&quot; - recognizing that both parents typically remain involved.
            </p>
          </section>

          <section id="when-need" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">When Do You Need a C100?</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              You might need to apply using the C100 form if:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">Common Reasons</h3>
                <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                  <li>You can&apos;t agree where children should live</li>
                  <li>The other parent won&apos;t let you see your children</li>
                  <li>You want to change an existing arrangement</li>
                  <li>You need to relocate with the children</li>
                  <li>Disagreements about school or medical decisions</li>
                </ul>
              </div>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Try First</h3>
                <ul className="text-amber-800 dark:text-amber-200 text-sm space-y-1">
                  <li>Direct negotiation with the other parent</li>
                  <li>Family mediation (required before court)</li>
                  <li>Solicitor negotiations</li>
                  <li>Collaborative law</li>
                </ul>
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mt-4">
              Court should be a last resort. It&apos;s expensive, stressful, and can take months. Mediation
              is usually faster and gives you more control over the outcome.
            </p>
          </section>

          <section id="miam-requirement" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">MIAM Requirement</h2>
            <div className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-6 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rose-600 text-white rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-rose-900 dark:text-rose-100 mb-2">Before You Submit a C100</h3>
                  <p className="text-rose-800 dark:text-rose-200">
                    You <strong>must</strong> have attended a <Link href="/miam/what-is-a-miam" className="underline">MIAM (Mediation Information Assessment Meeting)</Link> and
                    received a certificate, OR have a valid exemption. The court will not process your
                    application without this.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              On page 3 of the C100, you must indicate:
            </p>
            <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
              <li className="flex items-start gap-2">
                <span className="font-medium text-zinc-900 dark:text-white">Option 1:</span>
                You&apos;ve attended a MIAM and have a certificate (Form FM1)
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-zinc-900 dark:text-white">Option 2:</span>
                You have an exemption (domestic abuse, urgency, etc.)
              </li>
              <li className="flex items-start gap-2">
                <span className="font-medium text-zinc-900 dark:text-white">Option 3:</span>
                A mediator has signed to confirm the other party won&apos;t attend
              </li>
            </ul>
            <div className="mt-6 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
              <p className="text-zinc-600 dark:text-zinc-400 text-sm">
                <strong>Prepare with Miam:</strong> Before your MIAM, use our free AI assistant to
                organize your thoughts and priorities. <Link href="/" className="text-rose-600 hover:underline">Start preparing now</Link>.
              </p>
            </div>
          </section>

          <section id="how-to-complete" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">How to Complete the C100 Form</h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              The C100 form has several sections. Here&apos;s what you&apos;ll need to complete:
            </p>
            <div className="space-y-4">
              {[
                { section: "Section 1", title: "MIAM Information", desc: "Confirm you've attended a MIAM or have an exemption" },
                { section: "Section 2", title: "Applicant's Details", desc: "Your name, address, and contact information" },
                { section: "Section 3", title: "Respondent's Details", desc: "The other parent's details" },
                { section: "Section 4", title: "Children's Details", desc: "Names, dates of birth, and who they live with" },
                { section: "Section 5", title: "Orders Applied For", desc: "What you're asking the court to decide" },
                { section: "Section 6", title: "Reasons", desc: "Why you're making this application" },
                { section: "Section 7", title: "Harm/Risk", desc: "Any concerns about domestic abuse or harm to children" },
                { section: "Section 8", title: "Other Court Cases", desc: "Any related proceedings" },
                { section: "Section 9", title: "Declaration", desc: "Sign to confirm the information is true" },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg">
                  <div className="text-rose-600 font-bold w-24 flex-shrink-0">{item.section}</div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <a
                href="https://www.gov.uk/government/publications/form-c100-application-under-the-children-act-1989-for-a-child-arrangements-prohibited-steps-specific-issue-section-8-order-or-to-vary-or-discharge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-medium"
              >
                Download the C100 form from gov.uk
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </section>

          <section id="cost" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Costs & Fee Remission</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left mb-4">
                <thead className="bg-zinc-100 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Item</th>
                    <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Cost</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  <tr>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">C100 Court Fee</td>
                    <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">£232</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">With Fee Remission</td>
                    <td className="px-4 py-3 text-green-600 font-medium">Free or reduced</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">MIAM (before applying)</td>
                    <td className="px-4 py-3 text-zinc-900 dark:text-white font-medium">£90-150</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Fee Remission (Help with Fees)</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              If you&apos;re on a low income or receiving certain benefits, you may not have to pay the
              court fee. You&apos;ll need to apply using <strong>Form EX160</strong> at the same time as
              your C100.
            </p>
            <p className="text-zinc-600 dark:text-zinc-400">
              You may qualify if you receive benefits like Universal Credit, Income Support, or
              income-based JSA, or if your income is below certain thresholds.
            </p>
          </section>

          <section id="what-happens-next" className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">What Happens After You Apply</h2>
            <div className="space-y-4">
              {[
                { step: 1, title: "Court Receives Your Application", desc: "The court will check your form and fee are correct" },
                { step: 2, title: "Cafcass Safeguarding Checks", desc: "Cafcass (Children and Family Court Advisory Service) will do background checks with police and local authority" },
                { step: 3, title: "Papers Served on Respondent", desc: "The other parent receives a copy of your application" },
                { step: 4, title: "First Hearing (FHDRA)", desc: "Usually 4-6 weeks after application. Both parents attend court. The judge will try to help you agree." },
                { step: 5, title: "Further Hearings (if needed)", desc: "If you can't agree, there may be more hearings and possibly a Cafcass report" },
                { step: 6, title: "Final Order", desc: "The judge makes a decision, or you reach an agreement that becomes an order" },
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

          {/* CTA */}
          <section className="bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-rose-900 dark:text-rose-100 mb-4">
              Need to Prepare for Your MIAM First?
            </h2>
            <p className="text-rose-800 dark:text-rose-200 mb-6">
              Before you can submit a C100, you need a MIAM certificate. Our AI assistant Miam can help
              you prepare for that meeting - organizing your priorities and understanding the process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-medium transition-colors"
              >
                Prepare with Miam (Free)
              </Link>
              <Link
                href="/miam/what-is-a-miam"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200 rounded-lg font-medium transition-colors"
              >
                Learn About MIAMs
              </Link>
            </div>
          </section>

          {/* Related Links */}
          <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-12">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link href="/miam/what-is-a-miam" className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                <h3 className="font-medium text-zinc-900 dark:text-white">What is a MIAM?</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Required before C100</p>
              </Link>
              <Link href="/miam/certificate" className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                <h3 className="font-medium text-zinc-900 dark:text-white">MIAM Certificate</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">How to get your certificate</p>
              </Link>
              <Link href="/mediation/cost" className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                <h3 className="font-medium text-zinc-900 dark:text-white">Mediation Costs</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Compare with court costs</p>
              </Link>
            </div>
          </section>
        </article>
      </div>
    </>
  );
}
