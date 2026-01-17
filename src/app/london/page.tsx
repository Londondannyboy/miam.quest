"use client";

import { PageLayout } from "@/components/PageLayout";
import StampDutyCalculator from "@/components/StampDutyCalculator";
import { InfoBox, CalculationBreakdown } from "@/components/charts";
import { LONDON_PROMPT } from "@/lib/prompts";
import { formatCurrency } from "@/lib/calculations";

const FAQS = [
  {
    question: "Are stamp duty rates different in London?",
    answer:
      "No. London uses the same SDLT rates as the rest of England. However, because London property prices are typically higher, buyers often pay more stamp duty in absolute terms.",
  },
  {
    question: "Can first-time buyers get relief in London?",
    answer:
      "Yes, but the £625,000 price cap is challenging in London where average prices often exceed this. If a property costs more than £625,000, first-time buyers pay standard rates on the entire amount - no relief at all.",
  },
  {
    question: "What is the average stamp duty in London?",
    answer:
      "With average London property prices around £500,000-£550,000, typical stamp duty ranges from £12,500 (standard) to £0-£3,750 (first-time buyer). In prime areas like Kensington, stamp duty regularly exceeds £50,000.",
  },
  {
    question: "Is there a London property tax?",
    answer:
      "There's no specific London property transaction tax. London properties pay the same SDLT as anywhere else in England. However, properties in higher Council Tax bands pay more annually.",
  },
];

const RELATED_PAGES = [
  {
    label: "First-Time Buyer Calculator",
    href: "/first-time-buyer",
    description: "Check FTB relief eligibility (£625k limit)",
  },
  {
    label: "Second Home Calculator",
    href: "/second-home",
    description: "Calculate the 5% surcharge",
  },
  {
    label: "Standard Calculator",
    href: "/",
    description: "Full SDLT calculator for all regions",
  },
];

const LONDON_EXAMPLES = [
  { area: "Average London flat", price: 450000 },
  { area: "Zone 2 terraced house", price: 650000 },
  { area: "Zone 1 apartment", price: 850000 },
  { area: "Prime central property", price: 1500000 },
  { area: "Luxury home", price: 2500000 },
];

export default function LondonPage() {
  return (
    <PageLayout
      title="London Stamp Duty Calculator 2025"
      subtitle="Calculate SDLT for London property purchases"
      systemPrompt={LONDON_PROMPT}
      initialMessage="I can help calculate stamp duty for your London property purchase. What's the price you're considering?"
      faqs={FAQS}
      breadcrumbs={[{ label: "London", href: "/london" }]}
      relatedPages={RELATED_PAGES}
    >
      {/* Calculator */}
      <section className="mb-8">
        <StampDutyCalculator defaultRegion="england" />
      </section>

      {/* Key Info */}
      <section className="mb-8">
        <InfoBox variant="warning" title="First-Time Buyer Relief Limits">
          <p>
            Many London properties exceed the <strong>£625,000</strong> first-time
            buyer relief cap. If your property costs £625,001 or more, you pay
            full standard rates with <strong>no relief at all</strong>.
          </p>
          <ul>
            <li>Average London price: ~£520,000 (eligible for FTB relief)</li>
            <li>Inner London average: ~£680,000 (may exceed cap)</li>
            <li>Prime central: £1m+ (no FTB relief)</li>
          </ul>
        </InfoBox>
      </section>

      {/* London Examples */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Typical London Stamp Duty Amounts
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="text-left p-4 text-zinc-600 dark:text-zinc-400">
                  Property Type
                </th>
                <th className="text-right p-4 text-zinc-600 dark:text-zinc-400">
                  Price
                </th>
                <th className="text-right p-4 text-zinc-600 dark:text-zinc-400">
                  Standard
                </th>
                <th className="text-right p-4 text-zinc-600 dark:text-zinc-400">
                  First-Time Buyer
                </th>
                <th className="text-right p-4 text-zinc-600 dark:text-zinc-400">
                  Second Home
                </th>
              </tr>
            </thead>
            <tbody>
              {LONDON_EXAMPLES.map(({ area, price }) => {
                const standard = calculateStandardSDLT(price);
                const ftb = calculateFTBSDLT(price);
                const additional = standard + price * 0.05;
                return (
                  <tr
                    key={area}
                    className="border-b border-zinc-100 dark:border-zinc-800"
                  >
                    <td className="p-4 font-medium text-zinc-900 dark:text-zinc-100">
                      {area}
                    </td>
                    <td className="p-4 text-right font-mono text-zinc-600 dark:text-zinc-400">
                      {formatCurrency(price)}
                    </td>
                    <td className="p-4 text-right font-mono text-blue-600 dark:text-blue-400">
                      {formatCurrency(standard)}
                    </td>
                    <td className="p-4 text-right font-mono text-green-600 dark:text-green-400">
                      {price > 625000 ? "N/A*" : formatCurrency(ftb)}
                    </td>
                    <td className="p-4 text-right font-mono text-red-600 dark:text-red-400">
                      {formatCurrency(additional)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
          *First-time buyer relief not available for properties over £625,000
        </p>
      </section>

      {/* Example Breakdowns */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Detailed Examples
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CalculationBreakdown
            propertyPrice={550000}
            buyerType="ftb"
            region="england"
          />
          <CalculationBreakdown
            propertyPrice={750000}
            buyerType="standard"
            region="england"
          />
        </div>
      </section>

      {/* Borough Guide */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          London Borough Price Guide
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-4 border border-green-200 dark:border-green-800">
            <h3 className="font-bold text-green-800 dark:text-green-300 mb-2">
              Under £500k (FTB eligible)
            </h3>
            <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
              <li>• Barking & Dagenham</li>
              <li>• Bexley</li>
              <li>• Croydon</li>
              <li>• Havering</li>
              <li>• Sutton</li>
            </ul>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
            <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">
              £500k-£700k (FTB borderline)
            </h3>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
              <li>• Greenwich</li>
              <li>• Lewisham</li>
              <li>• Bromley</li>
              <li>• Hounslow</li>
              <li>• Ealing</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-4 border border-red-200 dark:border-red-800">
            <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">
              Over £700k (No FTB relief)
            </h3>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              <li>• Westminster</li>
              <li>• Kensington & Chelsea</li>
              <li>• Camden</li>
              <li>• Hammersmith & Fulham</li>
              <li>• Richmond</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>Stamp Duty in London</h2>
        <p>
          While London doesn't have different stamp duty rates, the city's high
          property prices mean buyers typically pay more SDLT than elsewhere in the
          UK. Understanding how much you'll pay is crucial for budgeting.
        </p>

        <h3>The First-Time Buyer Challenge</h3>
        <p>
          First-time buyer relief is valuable but has strict limits. With properties
          capped at £625,000 for any relief, many London first-time buyers find
          themselves paying full standard rates. In boroughs like Hackney, Islington,
          and Wandsworth, even modest properties can exceed this threshold.
        </p>

        <h3>Budget Accordingly</h3>
        <p>
          When budgeting for a London property purchase, factor in stamp duty early.
          On a £600,000 property, you're looking at around £17,500 in stamp duty (or
          £8,750 as a first-time buyer). Add solicitor fees, surveys, and moving
          costs for a realistic total.
        </p>
      </section>
    </PageLayout>
  );
}

function calculateStandardSDLT(price: number): number {
  let tax = 0;
  if (price > 250000) tax += Math.min(price - 250000, 675000) * 0.05;
  if (price > 925000) tax += Math.min(price - 925000, 575000) * 0.1;
  if (price > 1500000) tax += (price - 1500000) * 0.12;
  return Math.round(tax);
}

function calculateFTBSDLT(price: number): number {
  if (price > 625000) return calculateStandardSDLT(price);
  let tax = 0;
  if (price > 425000) tax = (price - 425000) * 0.05;
  return Math.round(tax);
}
