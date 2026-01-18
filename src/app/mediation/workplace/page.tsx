import type { Metadata } from "next";
import Link from "next/link";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Workplace Mediation | Resolve Conflicts at Work | MIAM.quest",
  description: "Complete guide to workplace mediation in the UK. Learn how workplace mediation works, when to use it, and how it compares to grievance procedures. Expert guidance.",
  keywords: [
    "workplace mediation",
    "mediation at work",
    "workplace conflict resolution",
    "acas mediation",
    "employment mediation",
    "work dispute mediation",
  ],
  alternates: {
    canonical: "https://miam.quest/mediation/workplace",
  },
};

const faqs = [
  {
    question: "What is workplace mediation?",
    answer: "Workplace mediation is a confidential process where an independent mediator helps employees and/or managers resolve workplace disputes. It's voluntary, informal, and focuses on finding practical solutions rather than blame.",
  },
  {
    question: "How does workplace mediation work?",
    answer: "The mediator meets each party separately first, then brings them together for a joint session. They help identify issues, explore solutions, and reach a written agreement. The process typically takes one day.",
  },
  {
    question: "Is workplace mediation confidential?",
    answer: "Yes. Everything discussed in mediation is confidential and cannot be used in later legal proceedings. This allows people to speak openly without fear of consequences.",
  },
  {
    question: "Can I refuse workplace mediation?",
    answer: "Yes, mediation is voluntary. However, refusing without good reason may be seen negatively if the dispute escalates to a tribunal. Courts expect parties to consider alternative dispute resolution.",
  },
  {
    question: "How much does workplace mediation cost?",
    answer: "Workplace mediation typically costs £1,000-£3,000 per day. Most employers pay the full cost as it's much cheaper than the cost of formal grievances, tribunals, or losing valuable employees.",
  },
];

const scenarios = [
  { title: "Colleague relationship breakdown", desc: "Personality clashes, communication breakdown, or damaged trust between team members" },
  { title: "Bullying or harassment allegations", desc: "Where both parties want to resolve the issue without formal proceedings" },
  { title: "Management style concerns", desc: "Disputes about how managers interact with their teams" },
  { title: "Team conflicts", desc: "Wider team dysfunction affecting productivity and morale" },
  { title: "Return to work issues", desc: "After long-term absence, disciplinary action, or previous conflict" },
  { title: "Change management disputes", desc: "Resistance to organisational changes affecting working relationships" },
];

export default function WorkplaceMediationPage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://miam.quest" },
    { name: "Mediation", url: "https://miam.quest/mediation/what-is-mediation" },
    { name: "Workplace", url: "https://miam.quest/mediation/workplace" },
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
              <Link href="/mediation/workplace" className="text-emerald-400">Workplace</Link>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Workplace Mediation: Resolve Conflicts at Work
            </h1>

            <p className="text-xl text-zinc-300 mb-8">
              <strong className="text-white">Workplace mediation</strong> is a confidential process
              that helps employees and employers resolve conflicts without formal grievance procedures.
              This guide explains how it works and when to use it.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors"
              >
                Talk to Miam
              </Link>
              <a
                href="https://www.acas.org.uk/mediation"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-lg transition-colors"
              >
                ACAS Mediation
              </a>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-12">
          <div className="max-w-4xl mx-auto px-4">

            {/* What is Workplace Mediation */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                What is Workplace Mediation?
              </h2>

              <p className="text-zinc-300 mb-4">
                <strong className="text-white">Workplace mediation</strong> involves a trained,
                independent mediator helping people at work resolve disputes. Unlike formal
                grievance procedures, mediation is:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {[
                  { title: "Voluntary", desc: "Both parties must agree to participate" },
                  { title: "Confidential", desc: "Discussions cannot be used in legal proceedings" },
                  { title: "Informal", desc: "No legal representation or formal evidence" },
                  { title: "Future-focused", desc: "Concentrates on solutions, not blame" },
                  { title: "Quick", desc: "Usually resolved in one day" },
                  { title: "Cost-effective", desc: "Much cheaper than tribunals or staff turnover" },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-zinc-800/50 rounded-lg">
                    <svg className="w-6 h-6 text-emerald-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <h3 className="text-white font-medium">{item.title}</h3>
                      <p className="text-zinc-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-zinc-300">
                Workplace mediation differs from{" "}
                <Link href="/mediation/what-is-mediation" className="text-emerald-400 hover:text-emerald-300">
                  family mediation
                </Link>
                {" "}in that it focuses on working relationships and is typically paid for by the employer.
              </p>
            </section>

            {/* When to Use */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                When is Workplace Mediation Used?
              </h2>

              <p className="text-zinc-300 mb-6">
                Workplace mediation is effective for many types of disputes:
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {scenarios.map((scenario, i) => (
                  <div key={i} className="bg-zinc-800 rounded-lg p-4">
                    <h3 className="text-white font-semibold mb-2">{scenario.title}</h3>
                    <p className="text-zinc-400 text-sm">{scenario.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* How It Works */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                How Does Workplace Mediation Work?
              </h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Initial Contact</h3>
                    <p className="text-zinc-400">
                      HR or a manager contacts a mediator to discuss the situation. The mediator
                      assesses whether mediation is appropriate.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Individual Meetings</h3>
                    <p className="text-zinc-400">
                      The mediator meets each party separately (usually 30-60 minutes each)
                      to understand their perspective and concerns.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Joint Session</h3>
                    <p className="text-zinc-400">
                      Both parties meet together with the mediator. Ground rules are set,
                      each person shares their perspective, and discussions explore solutions.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Agreement</h3>
                    <p className="text-zinc-400">
                      If agreement is reached, it&apos;s written down and signed by both parties.
                      The agreement is confidential but can be shared with HR if agreed.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* ACAS */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                ACAS Mediation Services
              </h2>

              <p className="text-zinc-300 mb-4">
                <a
                  href="https://www.acas.org.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  ACAS (Advisory, Conciliation and Arbitration Service)
                </a>
                {" "}is a government-funded body that provides workplace mediation and advice.
              </p>

              <div className="bg-blue-900/20 border border-blue-700/50 rounded-lg p-6 mb-6">
                <h3 className="text-blue-400 font-semibold mb-3">ACAS Services Include:</h3>
                <ul className="text-zinc-400 space-y-2">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Workplace mediation services
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Free helpline: 0300 123 1100
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Early conciliation (required before tribunal claims)
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Training for internal mediators
                  </li>
                </ul>
                <a
                  href="https://www.acas.org.uk/mediation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 text-blue-400 hover:text-blue-300 text-sm"
                >
                  Visit ACAS for more information &rarr;
                </a>
              </div>
            </section>

            {/* Mediation vs Grievance */}
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Workplace Mediation vs Grievance Procedure
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="py-3 px-4 text-white">Aspect</th>
                      <th className="py-3 px-4 text-emerald-400">Mediation</th>
                      <th className="py-3 px-4 text-amber-400">Grievance</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-400">
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Nature</td>
                      <td className="py-3 px-4">Voluntary, informal</td>
                      <td className="py-3 px-4">Formal process</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Focus</td>
                      <td className="py-3 px-4">Future solutions</td>
                      <td className="py-3 px-4">Past events</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Outcome</td>
                      <td className="py-3 px-4">Mutual agreement</td>
                      <td className="py-3 px-4">Management decision</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Timeframe</td>
                      <td className="py-3 px-4 text-emerald-400">Usually 1 day</td>
                      <td className="py-3 px-4">Weeks to months</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Confidentiality</td>
                      <td className="py-3 px-4 text-emerald-400">Fully confidential</td>
                      <td className="py-3 px-4">May be disclosed</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-zinc-300">Relationship impact</td>
                      <td className="py-3 px-4 text-emerald-400">Often improves</td>
                      <td className="py-3 px-4">Often damages</td>
                    </tr>
                  </tbody>
                </table>
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
                Need Help Understanding Your Options?
              </h2>
              <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                While MIAM.quest specialises in family mediation preparation, Miam can help you
                understand mediation processes generally.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/"
                  className="px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors"
                >
                  Talk to Miam
                </Link>
                <a
                  href="https://www.acas.org.uk/mediation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-lg transition-colors"
                >
                  ACAS Mediation
                </a>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="bg-zinc-800/50 rounded-lg p-6 mb-8">
              <h3 className="text-zinc-400 font-semibold mb-2">Disclaimer</h3>
              <p className="text-zinc-500 text-sm">
                This information is provided for general guidance only. MIAM.quest specialises in
                family mediation preparation - for workplace mediation, please contact ACAS or a
                qualified workplace mediator. We do not provide mediation services.
              </p>
            </section>

            {/* Related Pages */}
            <section>
              <h3 className="text-lg font-semibold text-white mb-4">Related Pages</h3>
              <div className="flex flex-wrap gap-2">
                <Link href="/mediation/what-is-mediation" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  What is Mediation?
                </Link>
                <Link href="/mediation/cost" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  Mediation Costs
                </Link>
                <Link href="/miam/what-is-a-miam" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  What is a MIAM?
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
