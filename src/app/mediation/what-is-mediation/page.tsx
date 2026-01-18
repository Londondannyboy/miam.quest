import type { Metadata } from "next";
import Link from "next/link";
import { generateFAQSchema, generateBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "What is Mediation? Definition, Meaning & Complete UK Guide | MIAM.quest",
  description: "Understand what mediation means in the UK. Complete guide to mediation definition, how it works, types of mediation, and when to use it. Free expert guidance.",
  keywords: [
    "what is mediation",
    "mediation meaning",
    "mediation definition",
    "define mediation",
    "mediation uk",
    "family mediation",
    "how does mediation work",
  ],
  alternates: {
    canonical: "https://miam.quest/mediation/what-is-mediation",
  },
};

const faqs = [
  {
    question: "What is mediation?",
    answer: "Mediation is a voluntary process where a neutral third party (the mediator) helps people in dispute communicate and reach their own agreement. Unlike a judge, the mediator doesn't impose a decision - they facilitate discussion so you can find solutions together.",
  },
  {
    question: "What does mediation mean in law?",
    answer: "In legal terms, mediation means a structured negotiation process facilitated by an impartial mediator. It's an alternative to court proceedings that allows parties to resolve disputes privately, often faster and at lower cost than litigation.",
  },
  {
    question: "Is mediation legally binding?",
    answer: "Mediation discussions are not legally binding. However, any agreement reached can be made legally binding if both parties sign a consent order approved by the court, or in some cases, a formal written agreement.",
  },
  {
    question: "Is mediation the same as arbitration?",
    answer: "No. In mediation, you make the decisions together with the other party. In arbitration, an arbitrator listens to both sides and makes a binding decision for you. Mediation gives you more control over the outcome.",
  },
  {
    question: "Do I need a lawyer for mediation?",
    answer: "You don't need a lawyer to attend mediation, but you can seek legal advice before, during, or after. Many people find it helpful to have a solicitor review any agreement before signing.",
  },
  {
    question: "How long does mediation take?",
    answer: "A single mediation session typically lasts 1-2 hours. Most family disputes are resolved in 3-5 sessions over 6-8 weeks. Complex cases may take longer, but mediation is usually much faster than going to court.",
  },
];

export default function WhatIsMediationPage() {
  const faqSchema = generateFAQSchema(faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://miam.quest" },
    { name: "Mediation", url: "https://miam.quest/mediation" },
    { name: "What is Mediation", url: "https://miam.quest/mediation/what-is-mediation" },
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
              <Link href="/mediation/what-is-mediation" className="text-emerald-400">What is Mediation</Link>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What is Mediation? Definition, Meaning & Complete UK Guide
            </h1>

            <p className="text-xl text-zinc-300 mb-8">
              <strong className="text-white">Mediation</strong> is a voluntary process where a neutral third party
              helps people in dispute reach their own agreement. This comprehensive guide explains the
              <strong className="text-white"> mediation meaning</strong>, how it works, and when it&apos;s the right choice for you.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/"
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg transition-colors"
              >
                Talk to Miam
              </Link>
              <Link
                href="/miam/what-is-a-miam"
                className="px-6 py-3 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-lg transition-colors"
              >
                Learn About MIAM
              </Link>
            </div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 bg-zinc-800/50">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-lg font-semibold text-white mb-4">In This Guide</h2>
            <div className="grid md:grid-cols-2 gap-2 text-sm">
              <a href="#definition" className="text-emerald-400 hover:text-emerald-300">Mediation Definition</a>
              <a href="#how-it-works" className="text-emerald-400 hover:text-emerald-300">How Mediation Works</a>
              <a href="#types" className="text-emerald-400 hover:text-emerald-300">Types of Mediation</a>
              <a href="#vs-court" className="text-emerald-400 hover:text-emerald-300">Mediation vs Court</a>
              <a href="#benefits" className="text-emerald-400 hover:text-emerald-300">Benefits of Mediation</a>
              <a href="#when-not" className="text-emerald-400 hover:text-emerald-300">When Mediation Isn&apos;t Suitable</a>
              <a href="#mediator-role" className="text-emerald-400 hover:text-emerald-300">The Mediator&apos;s Role</a>
              <a href="#faq" className="text-emerald-400 hover:text-emerald-300">FAQs</a>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <article className="py-12">
          <div className="max-w-4xl mx-auto px-4 prose prose-invert prose-emerald max-w-none">

            {/* Definition Section */}
            <section id="definition" className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Mediation Definition: What Does Mediation Mean?
              </h2>

              <p className="text-zinc-300 text-lg mb-4">
                The <strong className="text-white">mediation definition</strong> in its simplest form is:
                a structured process where an impartial third party helps people in dispute communicate
                effectively and explore solutions, without imposing a decision.
              </p>

              <p className="text-zinc-300 mb-4">
                To <strong className="text-white">define mediation</strong> in the UK legal context: it&apos;s an
                alternative dispute resolution (ADR) method that allows parties to resolve conflicts outside
                of court. The <strong className="text-white">mediation meaning</strong> centres on facilitated
                negotiation - the mediator guides the conversation but you and the other party make the decisions.
              </p>

              <div className="bg-emerald-900/20 border border-emerald-700/50 rounded-lg p-6 my-6">
                <h3 className="text-emerald-400 font-semibold mb-2">Key Point</h3>
                <p className="text-zinc-300 m-0">
                  Unlike a judge or arbitrator, a mediator has no power to impose a decision.
                  Mediation puts you in control of the outcome.
                </p>
              </div>

              <p className="text-zinc-300 mb-4">
                The word &quot;mediation&quot; comes from the Latin &quot;mediare&quot; meaning &quot;to be in the middle.&quot;
                This perfectly describes what mediators do - they stand between parties, helping bridge
                the gap to find common ground.
              </p>
            </section>

            {/* How Mediation Works */}
            <section id="how-it-works" className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                How Does Mediation Work? The Process Explained
              </h2>

              <p className="text-zinc-300 mb-6">
                Understanding how mediation works helps you prepare and get the most from the process.
                Here&apos;s what typically happens:
              </p>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Initial Contact & Assessment</h3>
                    <p className="text-zinc-400">
                      You contact a mediator who explains the process and assesses whether mediation is suitable
                      for your situation. For family matters, this is often combined with a{" "}
                      <Link href="/miam/what-is-a-miam" className="text-emerald-400 hover:text-emerald-300">MIAM</Link>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Individual Meetings (Optional)</h3>
                    <p className="text-zinc-400">
                      Some mediators meet each party separately first to understand individual perspectives
                      and concerns in a safe space.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Joint Mediation Sessions</h3>
                    <p className="text-zinc-400">
                      Both parties meet together with the mediator. Ground rules are established,
                      each person shares their perspective, and the mediator facilitates constructive discussion.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Exploring Options</h3>
                    <p className="text-zinc-400">
                      The mediator helps you brainstorm solutions, reality-test ideas, and work through
                      obstacles. This is where creative solutions often emerge.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center text-white font-bold">5</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Reaching Agreement</h3>
                    <p className="text-zinc-400">
                      If you reach agreement, the mediator drafts a summary. For family matters,
                      this can be made legally binding through a{" "}
                      <Link href="/forms/c100" className="text-emerald-400 hover:text-emerald-300">court order</Link>.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Types of Mediation */}
            <section id="types" className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Types of Mediation in the UK
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Family Mediation</h3>
                  <p className="text-zinc-400 mb-4">
                    Helps separating couples resolve disputes about children, finances, and property.
                    Often required before{" "}
                    <Link href="/forms/c100" className="text-emerald-400 hover:text-emerald-300">applying to family court</Link>.
                  </p>
                  <Link href="/mediation/family" className="text-emerald-400 hover:text-emerald-300 text-sm">
                    Learn more about family mediation &rarr;
                  </Link>
                </div>

                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Workplace Mediation</h3>
                  <p className="text-zinc-400 mb-4">
                    Resolves conflicts between colleagues or between employees and employers.
                    Often faster and less damaging than formal grievance procedures.
                  </p>
                  <Link href="/mediation/workplace" className="text-emerald-400 hover:text-emerald-300 text-sm">
                    Learn more about workplace mediation &rarr;
                  </Link>
                </div>

                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Civil & Commercial Mediation</h3>
                  <p className="text-zinc-400 mb-4">
                    Used for business disputes, contract disagreements, personal injury claims,
                    and neighbour disputes. Courts increasingly expect parties to try mediation first.
                  </p>
                </div>

                <div className="bg-zinc-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Community Mediation</h3>
                  <p className="text-zinc-400 mb-4">
                    Addresses neighbourhood disputes such as noise, boundaries, parking, and
                    anti-social behaviour. Often provided free by local councils.
                  </p>
                </div>
              </div>
            </section>

            {/* Mediation vs Court */}
            <section id="vs-court" className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Mediation vs Arbitration vs Court
              </h2>

              <p className="text-zinc-300 mb-6">
                Understanding the differences helps you choose the right approach:
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="py-3 px-4 text-white">Aspect</th>
                      <th className="py-3 px-4 text-white">Mediation</th>
                      <th className="py-3 px-4 text-white">Arbitration</th>
                      <th className="py-3 px-4 text-white">Court</th>
                    </tr>
                  </thead>
                  <tbody className="text-zinc-400">
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Who decides?</td>
                      <td className="py-3 px-4">You (jointly)</td>
                      <td className="py-3 px-4">Arbitrator</td>
                      <td className="py-3 px-4">Judge</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Binding?</td>
                      <td className="py-3 px-4">By choice</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Yes</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Confidential?</td>
                      <td className="py-3 px-4">Yes</td>
                      <td className="py-3 px-4">Usually</td>
                      <td className="py-3 px-4">No (public record)</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Typical cost</td>
                      <td className="py-3 px-4 text-emerald-400">£500-£2,000</td>
                      <td className="py-3 px-4">£2,000-£10,000</td>
                      <td className="py-3 px-4">£5,000-£50,000+</td>
                    </tr>
                    <tr className="border-b border-zinc-800">
                      <td className="py-3 px-4 font-medium text-zinc-300">Timeframe</td>
                      <td className="py-3 px-4 text-emerald-400">6-8 weeks</td>
                      <td className="py-3 px-4">3-6 months</td>
                      <td className="py-3 px-4">6-18 months</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-4 font-medium text-zinc-300">Control</td>
                      <td className="py-3 px-4 text-emerald-400">Full control</td>
                      <td className="py-3 px-4">Limited</td>
                      <td className="py-3 px-4">None</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-zinc-400 mt-6 text-sm">
                Learn more about{" "}
                <Link href="/mediation/cost" className="text-emerald-400 hover:text-emerald-300">mediation costs in the UK</Link>.
              </p>
            </section>

            {/* Benefits */}
            <section id="benefits" className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Benefits of Mediation
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { title: "Cost-Effective", desc: "Typically 80-90% cheaper than going to court" },
                  { title: "Faster Resolution", desc: "Most disputes resolved in weeks, not months or years" },
                  { title: "Confidential", desc: "Discussions stay private, unlike public court proceedings" },
                  { title: "You Stay in Control", desc: "You decide the outcome, not a judge or arbitrator" },
                  { title: "Preserves Relationships", desc: "Less adversarial approach helps maintain communication" },
                  { title: "Flexible Solutions", desc: "Creative outcomes that courts couldn't order" },
                  { title: "Less Stressful", desc: "More informal and supportive environment" },
                  { title: "Higher Compliance", desc: "People are more likely to follow agreements they helped create" },
                ].map((benefit, i) => (
                  <div key={i} className="flex gap-3 p-4 bg-zinc-800/50 rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-600 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{benefit.title}</h3>
                      <p className="text-zinc-400 text-sm">{benefit.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* When Not Suitable */}
            <section id="when-not" className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                When Mediation Isn&apos;t Suitable
              </h2>

              <p className="text-zinc-300 mb-4">
                Mediation isn&apos;t appropriate for every situation. It may not be suitable when:
              </p>

              <ul className="list-disc list-inside text-zinc-400 space-y-2 mb-6">
                <li><strong className="text-zinc-300">Domestic abuse</strong> - Power imbalances make fair negotiation impossible</li>
                <li><strong className="text-zinc-300">Child protection concerns</strong> - Safety issues require immediate court intervention</li>
                <li><strong className="text-zinc-300">One party refuses</strong> - Mediation requires voluntary participation from both sides</li>
                <li><strong className="text-zinc-300">Urgent legal action needed</strong> - Court injunctions may be necessary</li>
                <li><strong className="text-zinc-300">Mental capacity issues</strong> - Both parties must be able to make informed decisions</li>
                <li><strong className="text-zinc-300">Significant power imbalance</strong> - One party may be unable to negotiate fairly</li>
              </ul>

              <div className="bg-amber-900/20 border border-amber-700/50 rounded-lg p-6">
                <h3 className="text-amber-400 font-semibold mb-2">MIAM Exemptions</h3>
                <p className="text-zinc-300 m-0">
                  If any of these situations apply, you may be exempt from the MIAM requirement.
                  Learn more about{" "}
                  <Link href="/miam/exemptions" className="text-amber-400 hover:text-amber-300">MIAM exemptions</Link>.
                </p>
              </div>
            </section>

            {/* Mediator Role */}
            <section id="mediator-role" className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                The Role of a Mediator
              </h2>

              <p className="text-zinc-300 mb-4">
                A mediator is a trained professional who:
              </p>

              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="bg-zinc-800 rounded-lg p-4">
                  <h3 className="text-emerald-400 font-semibold mb-2">What Mediators DO</h3>
                  <ul className="text-zinc-400 space-y-1 text-sm">
                    <li>Remain completely neutral</li>
                    <li>Facilitate communication</li>
                    <li>Help identify underlying interests</li>
                    <li>Reality-test proposed solutions</li>
                    <li>Keep discussions on track</li>
                    <li>Draft agreements reached</li>
                  </ul>
                </div>
                <div className="bg-zinc-800 rounded-lg p-4">
                  <h3 className="text-red-400 font-semibold mb-2">What Mediators DON&apos;T Do</h3>
                  <ul className="text-zinc-400 space-y-1 text-sm">
                    <li>Take sides or give opinions</li>
                    <li>Give legal advice</li>
                    <li>Make decisions for you</li>
                    <li>Force you to agree</li>
                    <li>Tell you what to do</li>
                    <li>Judge who is &quot;right&quot;</li>
                  </ul>
                </div>
              </div>

              <p className="text-zinc-300">
                For family mediation, look for mediators accredited by the{" "}
                <a
                  href="https://www.familymediationcouncil.org.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:text-emerald-300"
                >
                  Family Mediation Council (FMC)
                </a>
                . Only FMC-accredited mediators can conduct MIAMs and issue{" "}
                <Link href="/miam/certificate" className="text-emerald-400 hover:text-emerald-300">MIAM certificates</Link>.
              </p>
            </section>

            {/* FAQ Section */}
            <section id="faq" className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-6">
                Frequently Asked Questions About Mediation
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

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-emerald-900/50 to-zinc-800 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Learn More About Your Options?
              </h2>
              <p className="text-zinc-300 mb-6 max-w-2xl mx-auto">
                Chat with Miam, our AI mediation preparation assistant, to understand
                whether mediation is right for your situation.
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

            {/* Sources */}
            <section className="mt-12 pt-8 border-t border-zinc-800">
              <h3 className="text-lg font-semibold text-white mb-4">Sources & Further Reading</h3>
              <ul className="text-sm text-zinc-400 space-y-2">
                <li>
                  <a href="https://www.gov.uk/looking-after-children-divorce/mediation" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                    Gov.uk - Family Mediation
                  </a>
                </li>
                <li>
                  <a href="https://www.familymediationcouncil.org.uk/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                    Family Mediation Council
                  </a>
                </li>
                <li>
                  <a href="https://civilmediation.org/" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                    Civil Mediation Council
                  </a>
                </li>
                <li>
                  <a href="https://www.acas.org.uk/mediation" target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:text-emerald-300">
                    ACAS - Workplace Mediation
                  </a>
                </li>
              </ul>
            </section>

            {/* Related Pages */}
            <section className="mt-8">
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
                <Link href="/mediation/cost" className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-full text-sm transition-colors">
                  Mediation Costs
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
