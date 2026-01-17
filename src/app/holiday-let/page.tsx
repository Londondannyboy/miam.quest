"use client";

import { PageLayout } from "@/components/PageLayout";
import StampDutyCalculator from "@/components/StampDutyCalculator";
import { SDLTRatesChart, InfoBox } from "@/components/charts";
import { HOLIDAY_LET_PROMPT } from "@/lib/prompts";

const HOLIDAY_LET_RATES = [
  { threshold: 0, rate: 5, label: "Up to £250,000" },
  { threshold: 250000, rate: 10, label: "£250,001 to £925,000" },
  { threshold: 925000, rate: 15, label: "£925,001 to £1.5m" },
  { threshold: 1500000, rate: 17, label: "Over £1.5m" },
];

const FAQS = [
  {
    question: "Do holiday lets pay the additional stamp duty surcharge?",
    answer:
      "Yes. Holiday lets are treated as additional properties for SDLT purposes. You'll pay the 5% surcharge if you already own a residential property, regardless of whether the holiday let is for personal use or rental income.",
  },
  {
    question: "What is a Furnished Holiday Let (FHL)?",
    answer:
      "A Furnished Holiday Let is a property that meets specific criteria: available for letting 210+ days per year, actually let for 105+ days, and no single let exceeding 31 days. FHL status provides income tax advantages but doesn't affect stamp duty.",
  },
  {
    question: "Is stamp duty different for holiday lets vs buy-to-lets?",
    answer:
      "No. The stamp duty treatment is identical - both attract the 5% additional property surcharge. The difference is in income tax treatment, where FHLs can claim certain reliefs not available to standard buy-to-lets.",
  },
  {
    question: "Can I claim business rates instead of Council Tax?",
    answer:
      "Yes, if your holiday let is available for letting 140+ days per year, you can apply for business rates instead of Council Tax. Many holiday lets qualify for small business rate relief, resulting in zero rates.",
  },
  {
    question: "What if the holiday let is my only property?",
    answer:
      "If you don't own any other residential property, you won't pay the 5% surcharge on your first holiday let. However, if you buy another property later, the holiday let will count towards the surcharge calculation.",
  },
];

const RELATED_PAGES = [
  {
    label: "Buy-to-Let Calculator",
    href: "/buy-to-let",
    description: "Compare with standard rental property rates",
  },
  {
    label: "Second Home Calculator",
    href: "/second-home",
    description: "Calculate the 5% additional surcharge",
  },
  {
    label: "Stamp Duty Refund",
    href: "/refund",
    description: "Check if you can claim back the surcharge",
  },
];

export default function HolidayLetPage() {
  return (
    <PageLayout
      title="Holiday Let Stamp Duty Calculator 2025"
      subtitle="Calculate SDLT for furnished holiday let purchases"
      systemPrompt={HOLIDAY_LET_PROMPT}
      initialMessage="I can help calculate stamp duty for your holiday let purchase. What's the property price and do you already own another property?"
      faqs={FAQS}
      breadcrumbs={[{ label: "Holiday Let", href: "/holiday-let" }]}
      relatedPages={RELATED_PAGES}
    >
      {/* Calculator */}
      <section className="mb-8">
        <StampDutyCalculator defaultBuyerType="additional" />
      </section>

      {/* Key Info */}
      <section className="mb-8">
        <InfoBox variant="warning" title="Same as Buy-to-Let for Stamp Duty">
          <p>
            Holiday lets are treated <strong>identically to buy-to-lets</strong> for
            stamp duty purposes. If you already own property, you pay the{" "}
            <strong>5% additional surcharge</strong>.
          </p>
          <ul>
            <li>FHL status doesn't reduce stamp duty</li>
            <li>Same surcharge applies as second homes</li>
            <li>Tax advantages are for income tax, not SDLT</li>
          </ul>
        </InfoBox>
      </section>

      {/* Holiday Let Rates */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Holiday Let SDLT Rates
        </h2>
        <SDLTRatesChart
          title="With 5% Surcharge (if you own another property)"
          bands={HOLIDAY_LET_RATES}
          note="Same rates as buy-to-let and second homes"
          variant="england"
        />
      </section>

      {/* FHL vs Standard BTL */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Furnished Holiday Let vs Buy-to-Let
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-700">
                  <th className="text-left p-3 text-zinc-600 dark:text-zinc-400">
                    Feature
                  </th>
                  <th className="text-center p-3 text-zinc-600 dark:text-zinc-400">
                    Holiday Let (FHL)
                  </th>
                  <th className="text-center p-3 text-zinc-600 dark:text-zinc-400">
                    Standard BTL
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="p-3 font-medium">Stamp Duty Surcharge</td>
                  <td className="p-3 text-center text-red-600">5%</td>
                  <td className="p-3 text-center text-red-600">5%</td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="p-3 font-medium">Mortgage Interest Relief</td>
                  <td className="p-3 text-center text-green-600">Full offset</td>
                  <td className="p-3 text-center text-amber-600">20% tax credit</td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="p-3 font-medium">Capital Allowances</td>
                  <td className="p-3 text-center text-green-600">Available</td>
                  <td className="p-3 text-center text-red-600">Not available</td>
                </tr>
                <tr className="border-b border-zinc-100 dark:border-zinc-800">
                  <td className="p-3 font-medium">CGT Relief</td>
                  <td className="p-3 text-center text-green-600">Business Asset Disposal</td>
                  <td className="p-3 text-center text-red-600">Standard CGT rates</td>
                </tr>
                <tr>
                  <td className="p-3 font-medium">Council Tax</td>
                  <td className="p-3 text-center text-green-600">Business rates option</td>
                  <td className="p-3 text-center text-amber-600">Council Tax</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-4">
            Note: FHL tax advantages may change. The government has announced plans to
            phase out some FHL reliefs from April 2025.
          </p>
        </div>
      </section>

      {/* FHL Requirements */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          FHL Status Requirements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              210+
            </div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-1">
              Days Available
            </h3>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Property must be available for letting at least 210 days per year
            </p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
            <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
              105+
            </div>
            <h3 className="font-semibold text-green-800 dark:text-green-300 mb-1">
              Days Let
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              Actually let to paying guests for at least 105 days per year
            </p>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-5 border border-amber-200 dark:border-amber-800">
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-400 mb-2">
              31
            </div>
            <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
              Max Continuous Let
            </h3>
            <p className="text-sm text-amber-700 dark:text-amber-300">
              No single letting can exceed 31 consecutive days
            </p>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>Holiday Let Stamp Duty Explained</h2>
        <p>
          Purchasing a holiday let property follows the same stamp duty rules as any
          other additional residential property. If you already own a home, you'll
          pay the standard SDLT rates plus a 5% surcharge.
        </p>

        <h3>Stamp Duty vs Income Tax</h3>
        <p>
          While Furnished Holiday Lets offer significant income tax advantages
          compared to standard buy-to-lets, there's no stamp duty benefit. The 5%
          surcharge applies regardless of how you intend to use the property.
        </p>

        <h3>Popular Holiday Let Areas</h3>
        <p>
          Common locations for holiday lets include Cornwall, Devon, the Lake
          District, Norfolk, and North Wales. Property prices vary significantly -
          from £150,000 cottages to £1m+ coastal homes.
        </p>
      </section>
    </PageLayout>
  );
}
