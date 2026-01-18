import type { Metadata } from "next";
import Link from "next/link";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "MIAM Exemptions | When You Don't Need Mediation | MIAM.quest",
  description: "Complete guide to MIAM exemptions in England & Wales. Learn if you qualify for exemption due to domestic abuse, urgency, or other valid reasons. Free guidance.",
  keywords: [
    "miam exemption",
    "miam exemptions",
    "exempt from miam",
    "miam exemption domestic abuse",
    "miam not required",
    "do i need a miam",
  ],
  alternates: {
    canonical: "https://miam.quest/miam/exemptions",
  },
};

const faqs = [
  {
    question: "What are MIAM exemptions?",
    answer: "MIAM exemptions are valid legal reasons why you don't need to attend a Mediation Information Assessment Meeting before applying to court. Common exemptions include domestic abuse, child protection concerns, and urgency.",
  },
  {
    question: "Do I need evidence for a MIAM exemption?",
    answer: "Yes, for most exemptions you need evidence. For domestic abuse, this might include police reports, court orders, or letters from support services. Your solicitor or the court can advise on acceptable evidence.",
  },
  {
    question: "Can I self-certify a MIAM exemption?",
    answer: "For some exemptions like urgency, you can self-certify on the C100 form. However, the court may ask for evidence later, and false claims can have serious consequences.",
  },
  {
    question: "What happens if I claim an exemption I don't qualify for?",
    answer: "Making a false exemption claim is a serious matter. The court may refuse your application, order you to attend a MIAM anyway, or in extreme cases, take further action for misleading the court.",
  },
];

const exemptionCategories = [
  {
    title: "Domestic Abuse",
    icon: "shield",
    exemptions: [
      "Police investigation or criminal proceedings",
      "Relevant court order (non-molestation, occupation order)",
      "MARAC referral",
      "Evidence from domestic abuse support service",
      "Police caution or conviction",
      "Relevant protective injunction",
      "Letter from health professional",
      "Letter from refuge or support organisation",
    ],
  },
  {
    title: "Child Protection",
    icon: "child",
    exemptions: [
      "Local authority child protection enquiries",
      "Child subject to child protection plan",
      "Child is a relevant child (in care or subject to proceedings)",
    ],
  },
  {
    title: "Urgency",
    icon: "clock",
    exemptions: [
      "Risk to life, liberty or physical safety",
      "Risk of significant harm to children",
      "Unlawful removal of child from UK",
      "Risk of miscarriage of justice",
      "Unreasonable hardship if delay",
      "Irretrievable problems with dispute resolution",
    ],
  },
  {
    title: "Previous MIAM/Mediation",
    icon: "document",
    exemptions: [
      "Valid MIAM certificate already exists (within 4 months)",
      "Mediation is ongoing",
      "Previous mediation broke down within 4 months",
    ],
  },
  {
    title: "Other Valid Exemptions",
    icon: "other",
    exemptions: [
      "Other party is in prison",
      "Applicant doesn't have contact details and can't find them",
      "Disability or other reason makes attendance not possible",
      "No mediator available within 15 miles",
      "Mediator contacted but no appointment within 15 working days",
      "Applicant is a child (under 18)",
      "Other party lives abroad",
    ],
  },
];

export default function MiamExemptionsPage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://miam.quest" },
    { name: "MIAM", url: "https://miam.quest/miam/what-is-a-miam" },
    { name: "Exemptions", url: "https://miam.quest/miam/exemptions" },
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
              <Link href="/miam/what-is-a-miam" className="hover:text-white">MIAM</Link>
              <span className="mx-2">/</span>
              <Link href="/miam/exemptions" className="text-emerald-400">Exemptions</Link>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              MIAM Exemptions: When You Don&apos;t Need Mediation
            </h1>

            <p className="text-xl text-zinc-300 mb-8">
              Not everyone needs to attend a MIAM before applying to court. This guide explains
              all valid <strong className="text-white">MIAM exemptions</strong> and what evidence
              you need to claim them.
            </p>

            <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-6 mb-8">
              <h2 className="text-amber-400 font-semibold mb-2">Important Notice</h2>
              <p className="text-zinc-300 text-sm m-0">
                If you are in immediate danger, please contact the police (999) or the{" "}
                <a
                  href="https://www.nationaldahelpline.org.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300"
                >
                  National Domestic Abuse Helpline
                </a>
                {" "}(0808 2000 247). This guide is for information only and does not constitute legal advice.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-12">
          <div className="max-w-4xl mx-auto px-4">

            {/* Overview */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                What is a MIAM Exemption?
              </h2>

              <p className="text-zinc-300 mb-4">
                A <strong className="text-white">MIAM exemption</strong> is a valid legal reason
                that allows you to apply directly to family court without first attending a{" "}
                <Link href="/miam/what-is-a-miam" className="text-emerald-400 hover:text-emerald-300">
                  Mediation Information Assessment Meeting (MIAM)
                </Link>.
              </p>

              <p className="text-zinc-300 mb-4">
                When you complete the{" "}
                <Link href="/forms/c100" className="text-emerald-400 hover:text-emerald-300">
                  C100 form
                </Link>
                , you must either attach a{" "}
                <Link href="/miam/certificate" className="text-emerald-400 hover:text-emerald-300">
                  MIAM certificate
                </Link>
                {" "}or indicate which exemption applies to your situation.
              </p>

              <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-6">
                <h3 className="text-emerald-400 font-semibold mb-2">Key Point</h3>
                <p className="text-zinc-300 m-0">
                  Even if you qualify for an exemption, mediation may still be beneficial.
                  Exemptions don&apos;t mean mediation isn&apos;t right for you - only that
                  attending a MIAM isn&apos;t legally required.
                </p>
              </div>
            </section>

            {/* Exemption Categories */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Categories of MIAM Exemption
              </h2>

              <div className="space-y-8">
                {exemptionCategories.map((category, index) => (
                  <div key={index} className="bg-zinc-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-sm">
                        {index + 1}
                      </span>
                      {category.title}
                    </h3>
                    <ul className="space-y-2">
                      {category.exemptions.map((exemption, i) => (
                        <li key={i} className="text-zinc-400 flex items-start gap-2">
                          <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {exemption}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Domestic Abuse Focus */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                MIAM Exemption for Domestic Abuse
              </h2>

              <p className="text-zinc-300 mb-4">
                <strong className="text-white">Domestic abuse</strong> is the most common reason
                for MIAM exemption. If you or your children have experienced domestic abuse from
                the other party, you may not need to attend a MIAM.
              </p>

              <h3 className="text-xl font-semibold text-white mb-4">Acceptable Evidence Includes:</h3>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  "Relevant police caution or conviction",
                  "Court order (non-molestation, restraining, etc.)",
                  "Ongoing police investigation",
                  "MARAC referral",
                  "Letter from domestic abuse support service",
                  "Letter confirming refuge stay",
                  "Letter from GP or health professional",
                  "Letter from social services",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2 text-zinc-400">
                    <svg className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {item}
                  </div>
                ))}
              </div>

              <div className="bg-red-900/20 border border-red-700/50 rounded-lg p-6">
                <h3 className="text-red-400 font-semibold mb-2">Support Resources</h3>
                <p className="text-zinc-300 mb-4">
                  If you&apos;re experiencing domestic abuse, help is available:
                </p>
                <ul className="text-zinc-400 space-y-2 text-sm">
                  <li>
                    <a href="https://www.nationaldahelpline.org.uk/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300">
                      National DA Helpline: 0808 2000 247
                    </a>
                    {" "}(24 hours, free)
                  </li>
                  <li>
                    <a href="https://www.womensaid.org.uk/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300">
                      Women&apos;s Aid
                    </a>
                  </li>
                  <li>
                    <a href="https://mensadviceline.org.uk/" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300">
                      Men&apos;s Advice Line: 0808 801 0327
                    </a>
                  </li>
                </ul>
              </div>
            </section>

            {/* How to Claim */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                How to Claim a MIAM Exemption
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Identify Your Exemption</h3>
                    <p className="text-zinc-400">
                      Review the exemption categories above and identify which applies to your situation.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Gather Evidence</h3>
                    <p className="text-zinc-400">
                      Collect any documents that support your exemption claim (police reports, court orders, letters, etc.).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Complete the C100 Form</h3>
                    <p className="text-zinc-400">
                      On the{" "}
                      <Link href="/forms/c100" className="text-emerald-400 hover:text-emerald-300">C100 form</Link>
                      , tick the exemption box that applies and provide details.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Attach Evidence</h3>
                    <p className="text-zinc-400">
                      Include copies of your evidence with your court application. Keep originals safe.
                    </p>
                  </div>
                </div>
              </div>
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
                Not Sure If You Qualify for an Exemption?
              </h2>
              <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                Chat with Miam to understand your options, or speak with a family law solicitor
                for personalised legal advice.
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
                  Learn About MIAM
                </Link>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="bg-zinc-800/50 rounded-lg p-6 mb-8">
              <h3 className="text-zinc-400 font-semibold mb-2">Disclaimer</h3>
              <p className="text-zinc-500 text-sm">
                This information is provided for general guidance only and does not constitute legal advice.
                MIAM.quest is an AI-powered preparation tool - we do not provide mediation services.
                Always consult a qualified legal professional for advice specific to your situation.
              </p>
            </section>

            {/* Related Pages */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4">Related Pages</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/miam/what-is-a-miam" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  What is a MIAM?
                </Link>
                <Link href="/miam/certificate" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  MIAM Certificate
                </Link>
                <Link href="/forms/c100" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  C100 Form Guide
                </Link>
                <Link href="/mediation/what-is-mediation" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  What is Mediation?
                </Link>
                <Link href="/mediation/cost" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  Mediation Costs
                </Link>
              </div>
            </section>

          </div>
        </article>
      </main>
    </>
  );
}
