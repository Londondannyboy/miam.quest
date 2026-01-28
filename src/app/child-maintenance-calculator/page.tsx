import { Metadata } from "next";
import Link from "next/link";
import { ChildMaintenanceCalculator } from "@/components/ChildMaintenanceCalculator";
import { Disclaimer } from "@/components/Disclaimer";

export const metadata: Metadata = {
  title: "Child Maintenance Calculator UK 2024/25 | Free CMS Calculator",
  description: "Free child maintenance calculator for UK parents. Calculate how much child maintenance to pay or receive using the official CMS formula. Instant results with breakdown.",
  keywords: [
    "child maintenance calculator",
    "child maintenance calculator uk",
    "cms calculator",
    "child support calculator",
    "how much child maintenance",
    "child maintenance calculation",
    "child maintenance estimator"
  ],
  alternates: {
    canonical: "https://miam.quest/child-maintenance-calculator",
  },
  openGraph: {
    title: "Child Maintenance Calculator UK 2024/25 | Free CMS Calculator",
    description: "Free child maintenance calculator for UK parents. Calculate payments using the official CMS formula.",
    url: "https://miam.quest/child-maintenance-calculator",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How is child maintenance calculated in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Child maintenance in the UK is calculated based on the paying parent's gross income. The basic rate is 12% for one child, 16% for two children, and 19% for three or more children. Reductions apply for shared care (52+ nights per year) and other children living with the paying parent."
      }
    },
    {
      "@type": "Question",
      "name": "How much child maintenance should I pay for one child?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "For one child, the basic rate is 12% of your gross weekly income (for income between £200-£800 per week). For example, if you earn £500 per week gross, you would pay approximately £60 per week. This reduces if you have the child overnight for 52 or more nights per year."
      }
    },
    {
      "@type": "Question",
      "name": "What is the minimum child maintenance in the UK?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The minimum child maintenance payment is £7 per week (flat rate), which applies when the paying parent's gross income is between £100 and £199 per week, or they receive certain benefits. If income is below £7 per week, the nil rate applies and no payment is required."
      }
    },
    {
      "@type": "Question",
      "name": "Does shared care reduce child maintenance?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, if the paying parent has the children overnight for 52 or more nights per year, maintenance is reduced. 52-103 nights gives a 1/7 reduction, 104-155 nights gives a 2/7 reduction, 156-174 nights gives a 3/7 reduction, and 175+ nights gives a 50% reduction plus £7 per child."
      }
    },
    {
      "@type": "Question",
      "name": "Is child maintenance based on gross or net income?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Child maintenance through the Child Maintenance Service (CMS) is calculated based on gross income (before tax), not net income. This includes salary, wages, bonuses, and other taxable income."
      }
    }
  ]
};

const calculatorSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Child Maintenance Calculator UK",
  "description": "Calculate child maintenance payments using the official CMS formula for UK parents",
  "url": "https://miam.quest/child-maintenance-calculator",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP"
  }
};

export default function ChildMaintenanceCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(calculatorSchema) }}
      />

      <div className="min-h-screen bg-white dark:bg-zinc-950">
        {/* Beta Banner */}
        <div className="bg-amber-500 py-3">
          <div className="max-w-4xl mx-auto px-4">
            <p className="text-amber-950 text-sm font-medium flex items-center justify-center gap-2 text-center">
              <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>
                <strong>BETA:</strong> This calculator provides estimates only. For official calculations, use{" "}
                <a href="https://www.gov.uk/calculate-child-maintenance" target="_blank" rel="noopener noreferrer" className="underline font-bold">
                  Gov.uk
                </a>{" "}
                or{" "}
                <a href="https://www.nidirect.gov.uk/articles/calculate-child-maintenance" target="_blank" rel="noopener noreferrer" className="underline font-bold">
                  NI Direct
                </a>
              </span>
            </p>
          </div>
        </div>

        {/* Hero */}
        <section className="bg-gradient-to-b from-emerald-50 to-white dark:from-zinc-900 dark:to-zinc-950 py-12">
          <div className="max-w-4xl mx-auto px-4">
            {/* Breadcrumbs */}
            <nav className="text-sm text-zinc-500 mb-6">
              <Link href="/" className="hover:text-emerald-600">Home</Link>
              <span className="mx-2">/</span>
              <span className="text-zinc-900 dark:text-white">Child Maintenance Calculator</span>
            </nav>

            <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Child Maintenance Calculator UK
            </h1>

            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8">
              Use our free calculator to estimate how much <strong>child maintenance</strong> to pay or receive.
              Based on the official Child Maintenance Service (CMS) formula for 2024/25.
            </p>

            {/* Key Facts */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-emerald-600">12%</p>
                <p className="text-sm text-zinc-500">1 child rate</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-emerald-600">16%</p>
                <p className="text-sm text-zinc-500">2 children rate</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-emerald-600">19%</p>
                <p className="text-sm text-zinc-500">3+ children rate</p>
              </div>
              <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 text-center shadow-sm">
                <p className="text-2xl font-bold text-emerald-600">£7</p>
                <p className="text-sm text-zinc-500">minimum/week</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Calculator - Takes 3 columns */}
            <div className="lg:col-span-3">
              <ChildMaintenanceCalculator />
            </div>

            {/* Sidebar - Takes 2 columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Info */}
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">How It Works</h3>
                <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">1.</span>
                    Enter the paying parent&apos;s gross income
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">2.</span>
                    Select number of children
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">3.</span>
                    Adjust for shared care nights
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">4.</span>
                    Get your instant estimate
                  </li>
                </ul>
              </div>

              {/* Related Links */}
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-6">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-4">Related Guides</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/separation-agreement" className="text-emerald-600 hover:underline text-sm">
                      Separation Agreement Guide
                    </Link>
                  </li>
                  <li>
                    <Link href="/financial-disclosure-divorce" className="text-emerald-600 hover:underline text-sm">
                      Financial Disclosure in Divorce
                    </Link>
                  </li>
                  <li>
                    <Link href="/consent-order" className="text-emerald-600 hover:underline text-sm">
                      Consent Orders Explained
                    </Link>
                  </li>
                  <li>
                    <Link href="/divorce-mediation" className="text-emerald-600 hover:underline text-sm">
                      Divorce Mediation
                    </Link>
                  </li>
                  <li>
                    <Link href="/co-parenting" className="text-emerald-600 hover:underline text-sm">
                      Co-Parenting Guide
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Official Resources */}
              <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border-2 border-amber-400 dark:border-amber-600">
                <h3 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Use Official Calculators</h3>
                <p className="text-xs text-amber-700 dark:text-amber-300 mb-4">For accurate, legally-valid calculations:</p>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="https://www.gov.uk/calculate-child-maintenance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-800 dark:text-amber-200 hover:underline text-sm font-bold flex items-center gap-1"
                    >
                      Gov.uk Calculator (England, Wales, Scotland)
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.nidirect.gov.uk/articles/calculate-child-maintenance"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-800 dark:text-amber-200 hover:underline text-sm font-bold flex items-center gap-1"
                    >
                      NI Direct Calculator (Northern Ireland)
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.gov.uk/child-maintenance-service"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 dark:text-amber-300 hover:underline text-sm flex items-center gap-1"
                    >
                      Child Maintenance Service
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.citizensadvice.org.uk/family/children-and-young-people/child-maintenance/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-amber-700 dark:text-amber-300 hover:underline text-sm flex items-center gap-1"
                    >
                      Citizens Advice
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="mt-16 prose-content">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              How Child Maintenance is Calculated in the UK
            </h2>

            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              <strong>Child maintenance</strong> in the UK is calculated using a formula set by the Child Maintenance Service (CMS).
              The amount depends on the paying parent&apos;s gross income, the number of children, and how many nights
              the children stay with the paying parent.
            </p>

            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800"
              alt="Calculator and financial documents for child maintenance calculation"
              className="w-full rounded-xl mb-6"
            />

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
              Child Maintenance Rates (Basic Rate)
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              For paying parents with a gross weekly income between £200 and £800, the <strong>child maintenance</strong> rates are:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left">
                <thead className="bg-zinc-100 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Number of Children</th>
                    <th className="px-4 py-3 font-semibold">Percentage of Gross Income</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-zinc-200 dark:border-zinc-700">
                    <td className="px-4 py-3">1 child</td>
                    <td className="px-4 py-3">12%</td>
                  </tr>
                  <tr className="border-t border-zinc-200 dark:border-zinc-700">
                    <td className="px-4 py-3">2 children</td>
                    <td className="px-4 py-3">16%</td>
                  </tr>
                  <tr className="border-t border-zinc-200 dark:border-zinc-700">
                    <td className="px-4 py-3">3 or more children</td>
                    <td className="px-4 py-3">19%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
              Shared Care Reductions
            </h3>

            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              If the paying parent has the children overnight regularly, <strong>child maintenance</strong> payments are reduced:
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left">
                <thead className="bg-zinc-100 dark:bg-zinc-800">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Nights Per Year</th>
                    <th className="px-4 py-3 font-semibold">Reduction</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t border-zinc-200 dark:border-zinc-700">
                    <td className="px-4 py-3">52-103 nights</td>
                    <td className="px-4 py-3">1/7 (14%)</td>
                  </tr>
                  <tr className="border-t border-zinc-200 dark:border-zinc-700">
                    <td className="px-4 py-3">104-155 nights</td>
                    <td className="px-4 py-3">2/7 (29%)</td>
                  </tr>
                  <tr className="border-t border-zinc-200 dark:border-zinc-700">
                    <td className="px-4 py-3">156-174 nights</td>
                    <td className="px-4 py-3">3/7 (43%)</td>
                  </tr>
                  <tr className="border-t border-zinc-200 dark:border-zinc-700">
                    <td className="px-4 py-3">175+ nights</td>
                    <td className="px-4 py-3">50% + £7/child</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <img
              src="https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=800"
              alt="Parent and child spending quality time together"
              className="w-full rounded-xl mb-6"
            />

            <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-4">
              Different Rate Types
            </h3>

            <ul className="space-y-3 text-zinc-600 dark:text-zinc-400 mb-6">
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Nil Rate:</strong> Income below £7/week - no payment required</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Flat Rate:</strong> Income £7-£199/week or certain benefits - £7/week</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Reduced Rate:</strong> Income £100-£199/week - sliding scale</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Basic Rate:</strong> Income £200-£800/week - 12%/16%/19%</span>
              </li>
              <li className="flex items-start gap-2">
                <svg className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span><strong>Basic Plus Rate:</strong> Income £800-£3000/week - lower rates on income above £800</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6 mt-10">
              Frequently Asked Questions About Child Maintenance
            </h2>

            <div className="space-y-4 mb-8">
              <details className="group border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg">
                  <span className="font-medium text-zinc-900 dark:text-white">How is child maintenance calculated in the UK?</span>
                  <svg className="w-5 h-5 text-zinc-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-zinc-600 dark:text-zinc-400">
                  Child maintenance is calculated based on the paying parent&apos;s gross weekly income. The basic rates are 12% for one child, 16% for two children, and 19% for three or more children. Adjustments are made for shared care and other children in the household.
                </div>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg">
                  <span className="font-medium text-zinc-900 dark:text-white">What is the minimum child maintenance payment?</span>
                  <svg className="w-5 h-5 text-zinc-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-zinc-600 dark:text-zinc-400">
                  The minimum child maintenance payment is the flat rate of £7 per week, which applies when the paying parent has a gross income between £100 and £199 per week, or receives certain benefits. Below £7/week income, the nil rate applies.
                </div>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg">
                  <span className="font-medium text-zinc-900 dark:text-white">Does shared care affect child maintenance?</span>
                  <svg className="w-5 h-5 text-zinc-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-zinc-600 dark:text-zinc-400">
                  Yes, if the paying parent has the children overnight for 52 or more nights per year, the maintenance amount is reduced. The more nights of shared care, the greater the reduction, up to 50% plus £7 per child for 175+ nights.
                </div>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg">
                  <span className="font-medium text-zinc-900 dark:text-white">Is child maintenance based on gross or net income?</span>
                  <svg className="w-5 h-5 text-zinc-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-zinc-600 dark:text-zinc-400">
                  The CMS calculates child maintenance based on gross income (before tax and National Insurance), not net income. This includes salary, wages, bonuses, self-employment income, and other taxable income sources.
                </div>
              </details>

              <details className="group border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <summary className="flex items-center justify-between p-4 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg">
                  <span className="font-medium text-zinc-900 dark:text-white">Can I arrange child maintenance privately?</span>
                  <svg className="w-5 h-5 text-zinc-400 group-open:rotate-180 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-4 pb-4 text-zinc-600 dark:text-zinc-400">
                  Yes, parents can make a &quot;family-based arrangement&quot; without involving the CMS. This is free and flexible, but not legally enforceable. Many parents use <Link href="/family-mediation" className="text-emerald-600 hover:underline">family mediation</Link> to help negotiate these arrangements.
                </div>
              </details>
            </div>

            {/* CTA Section */}
            <div className="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-8 text-center mt-10">
              <h2 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100 mb-4">
                Need Help Agreeing Child Maintenance?
              </h2>
              <p className="text-emerald-800 dark:text-emerald-200 mb-6">
                Family mediation can help you reach an agreement about child maintenance without going through the CMS.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors"
                >
                  Prepare with Miam (Free)
                </Link>
                <Link
                  href="/family-mediation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-emerald-50 text-emerald-600 border border-emerald-200 rounded-lg font-medium transition-colors"
                >
                  Learn About Family Mediation
                </Link>
              </div>
            </div>

            {/* Official Resources */}
            <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-700">
              <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4">Official Resources</h3>
              <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                <li>
                  <a href="https://www.gov.uk/calculate-child-maintenance" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline font-semibold">
                    Gov.uk - Official Child Maintenance Calculator
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/how-child-maintenance-is-worked-out" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                    Gov.uk - How Child Maintenance is Worked Out
                  </a>
                </li>
                <li>
                  <a href="https://www.nidirect.gov.uk/articles/calculate-child-maintenance" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                    NI Direct - Calculator (Northern Ireland)
                  </a>
                </li>
                <li>
                  <a href="https://www.gov.uk/child-maintenance-service" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                    Gov.uk - Child Maintenance Service
                  </a>
                </li>
                <li>
                  <a href="https://www.citizensadvice.org.uk/family/children-and-young-people/child-maintenance/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                    Citizens Advice - Child Maintenance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <Disclaimer variant="compact" className="mt-12" />

          {/* Related Pages */}
          <section className="border-t border-zinc-200 dark:border-zinc-800 pt-8 mt-8">
            <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">Related Guides</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <Link
                href="/separation-agreement"
                className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <h3 className="font-medium text-zinc-900 dark:text-white">Separation Agreement</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Legal guide to separation without divorce</p>
              </Link>
              <Link
                href="/consent-order"
                className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <h3 className="font-medium text-zinc-900 dark:text-white">Consent Order</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Make your financial agreement legally binding</p>
              </Link>
              <Link
                href="/financial-disclosure-divorce"
                className="block p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors"
              >
                <h3 className="font-medium text-zinc-900 dark:text-white">Financial Disclosure</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">Understanding Form E and financial disclosure</p>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
