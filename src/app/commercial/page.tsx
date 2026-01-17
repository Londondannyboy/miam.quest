"use client";

import { PageLayout } from "@/components/PageLayout";
import { SDLTRatesChart, InfoBox } from "@/components/charts";
import { COMMERCIAL_PROMPT } from "@/lib/prompts";
import { useState } from "react";
import { formatCurrency } from "@/lib/calculations";

const COMMERCIAL_RATES = [
  { threshold: 0, rate: 0, label: "Up to £150,000" },
  { threshold: 150000, rate: 2, label: "£150,001 to £250,000" },
  { threshold: 250000, rate: 5, label: "Over £250,000" },
];

const FAQS = [
  {
    question: "What is commercial property SDLT?",
    answer:
      "Commercial or non-residential SDLT applies to business premises, shops, offices, warehouses, agricultural land, and mixed-use properties. The rates are different (and often lower) than residential property rates.",
  },
  {
    question: "What counts as commercial property?",
    answer:
      "Non-residential property includes: shops and offices, warehouses, factories, agricultural land, forests, any property not used as a dwelling, and mixed-use properties (part residential, part commercial).",
  },
  {
    question: "Is there an additional property surcharge for commercial?",
    answer:
      "No. The 5% additional property surcharge only applies to residential properties. Buying a commercial property doesn't attract the surcharge, even if you already own residential property.",
  },
  {
    question: "What about mixed-use properties?",
    answer:
      "Mixed-use properties (e.g., a shop with a flat above) are taxed at commercial rates, not residential. This can be advantageous as commercial rates are often lower, and there's no additional property surcharge.",
  },
  {
    question: "How is SDLT calculated on a lease?",
    answer:
      "Lease SDLT is calculated on: (1) any premium paid using the commercial rates, plus (2) the Net Present Value (NPV) of total rent over the lease term. Different rates apply to the NPV calculation.",
  },
];

const RELATED_PAGES = [
  {
    label: "Residential Calculator",
    href: "/",
    description: "Standard residential property rates",
  },
  {
    label: "Buy-to-Let Calculator",
    href: "/buy-to-let",
    description: "Residential investment property rates",
  },
  {
    label: "Company Purchase",
    href: "/company-purchase",
    description: "SDLT for company property purchases",
  },
];

export default function CommercialPage() {
  const [price, setPrice] = useState<number>(0);
  const [priceInput, setPriceInput] = useState("");

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setPriceInput(value);
    setPrice(parseInt(value) || 0);
  };

  const tax = calculateCommercialSDLT(price);

  return (
    <PageLayout
      title="Commercial Property Stamp Duty Calculator"
      subtitle="Calculate SDLT for non-residential and mixed-use properties"
      systemPrompt={COMMERCIAL_PROMPT}
      initialMessage="I can help calculate SDLT for commercial property. What's the purchase price or lease details?"
      faqs={FAQS}
      breadcrumbs={[{ label: "Commercial", href: "/commercial" }]}
      relatedPages={RELATED_PAGES}
    >
      {/* Calculator */}
      <section className="mb-8">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Commercial SDLT Calculator
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                Purchase Price / Premium
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">
                  £
                </span>
                <input
                  type="text"
                  value={priceInput}
                  onChange={handlePriceChange}
                  placeholder="Enter property price"
                  className="w-full pl-8 pr-4 py-3 text-lg border border-zinc-300 dark:border-zinc-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-zinc-800 dark:text-white"
                />
              </div>
            </div>

            {price > 0 && (
              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                <div className="text-center mb-6">
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">
                    Commercial SDLT to Pay
                  </p>
                  <p className="text-4xl font-bold text-zinc-900 dark:text-white">
                    {formatCurrency(tax)}
                  </p>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Effective rate: {((tax / price) * 100).toFixed(2)}%
                  </p>
                </div>

                <div className="bg-zinc-50 dark:bg-zinc-800 rounded-xl p-4">
                  <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3">
                    Breakdown
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-zinc-600 dark:text-zinc-400">
                        Up to £150,000 @ 0%
                      </span>
                      <span className="font-mono">£0</span>
                    </div>
                    {price > 150000 && (
                      <div className="flex justify-between">
                        <span className="text-zinc-600 dark:text-zinc-400">
                          £150,001-£250,000 @ 2%
                        </span>
                        <span className="font-mono">
                          {formatCurrency(Math.min(price - 150000, 100000) * 0.02)}
                        </span>
                      </div>
                    )}
                    {price > 250000 && (
                      <div className="flex justify-between">
                        <span className="text-zinc-600 dark:text-zinc-400">
                          Over £250,000 @ 5%
                        </span>
                        <span className="font-mono">
                          {formatCurrency((price - 250000) * 0.05)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Key Info */}
      <section className="mb-8">
        <InfoBox variant="success" title="No Additional Property Surcharge">
          <p>
            Commercial properties are <strong>exempt</strong> from the 5% additional
            property surcharge that applies to residential purchases. This makes
            commercial property more tax-efficient for investors.
          </p>
        </InfoBox>
      </section>

      {/* Commercial Rates */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Commercial SDLT Rates
        </h2>
        <SDLTRatesChart
          title="Non-Residential Property Rates"
          bands={COMMERCIAL_RATES}
          note="These rates apply to commercial purchases and lease premiums"
          variant="england"
        />
      </section>

      {/* Mixed Use Section */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Mixed-Use Properties
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <p className="text-zinc-600 dark:text-zinc-400 mb-4">
            Properties that combine residential and commercial use (e.g., a shop
            with a flat above) are taxed at <strong>commercial rates</strong>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 dark:text-green-300 mb-2">
                Advantages
              </h3>
              <ul className="text-sm text-green-700 dark:text-green-300 space-y-1">
                <li>• Lower tax rates than residential</li>
                <li>• No additional property surcharge</li>
                <li>• Can be advantageous for investors</li>
              </ul>
            </div>
            <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-2">
                Requirements
              </h3>
              <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-1">
                <li>• Must have genuine commercial element</li>
                <li>• HMRC may challenge claims</li>
                <li>• Seek professional advice</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Commercial vs Residential SDLT
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-700">
                <th className="text-left p-4 text-zinc-600 dark:text-zinc-400">
                  Price
                </th>
                <th className="text-right p-4 text-zinc-600 dark:text-zinc-400">
                  Commercial
                </th>
                <th className="text-right p-4 text-zinc-600 dark:text-zinc-400">
                  Residential
                </th>
                <th className="text-right p-4 text-zinc-600 dark:text-zinc-400">
                  Res + Surcharge
                </th>
              </tr>
            </thead>
            <tbody>
              {[250000, 400000, 500000, 750000, 1000000].map((p) => {
                const commercial = calculateCommercialSDLT(p);
                const residential = calculateResidentialSDLT(p);
                const withSurcharge = residential + p * 0.05;
                return (
                  <tr
                    key={p}
                    className="border-b border-zinc-100 dark:border-zinc-800"
                  >
                    <td className="p-4 font-medium">£{p.toLocaleString()}</td>
                    <td className="p-4 text-right font-mono text-green-600 dark:text-green-400">
                      £{commercial.toLocaleString()}
                    </td>
                    <td className="p-4 text-right font-mono text-blue-600 dark:text-blue-400">
                      £{residential.toLocaleString()}
                    </td>
                    <td className="p-4 text-right font-mono text-red-600 dark:text-red-400">
                      £{withSurcharge.toLocaleString()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* SEO Content */}
      <section className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>Commercial Property Stamp Duty Explained</h2>
        <p>
          Commercial or non-residential SDLT uses different rates than residential
          property. Generally, commercial rates are more favorable, especially for
          higher-value properties.
        </p>

        <h3>What Counts as Non-Residential?</h3>
        <ul>
          <li>Shops, offices, and retail premises</li>
          <li>Warehouses and industrial units</li>
          <li>Agricultural land and forests</li>
          <li>Mixed-use properties (commercial + residential)</li>
          <li>Six or more residential properties in one transaction</li>
        </ul>

        <h3>Lease Calculations</h3>
        <p>
          For commercial leases, SDLT applies to any premium paid (using the rates
          above) plus the Net Present Value (NPV) of the rent. NPV calculations are
          complex - consult a professional for lease transactions.
        </p>
      </section>
    </PageLayout>
  );
}

function calculateCommercialSDLT(price: number): number {
  let tax = 0;
  if (price > 150000) tax += Math.min(price - 150000, 100000) * 0.02;
  if (price > 250000) tax += (price - 250000) * 0.05;
  return Math.round(tax);
}

function calculateResidentialSDLT(price: number): number {
  let tax = 0;
  if (price > 250000) tax += Math.min(price - 250000, 675000) * 0.05;
  if (price > 925000) tax += Math.min(price - 925000, 575000) * 0.1;
  if (price > 1500000) tax += (price - 1500000) * 0.12;
  return Math.round(tax);
}
