"use client";

import { PageLayout } from "@/components/PageLayout";
import { InfoBox } from "@/components/charts";
import { REFUND_PROMPT } from "@/lib/prompts";
import { useState } from "react";
import { formatCurrency } from "@/lib/calculations";

const FAQS = [
  {
    question: "When can I claim a stamp duty refund?",
    answer:
      "You can claim a refund of the 5% additional rate if you paid the surcharge when buying a new main residence but sold your previous main residence within 3 years. You must have intended the new property to be your main home.",
  },
  {
    question: "How long do I have to claim the refund?",
    answer:
      "You must claim within 12 months of selling your previous main residence, or 12 months from the filing date of your SDLT return - whichever is later. Don't delay as HMRC strictly enforces this deadline.",
  },
  {
    question: "How do I claim a stamp duty refund?",
    answer:
      "Claim online through HMRC's SDLT refund form, or send a letter to HMRC's Stamp Duty Land Tax office. You'll need transaction details for both properties including SDLT reference numbers and completion dates.",
  },
  {
    question: "How long does a refund take?",
    answer:
      "HMRC aims to process refunds within 15 working days of receiving a valid claim. Complex cases may take longer. You'll receive the refund by BACS to your bank account.",
  },
  {
    question: "What if I sold after 3 years?",
    answer:
      "Unfortunately, the 3-year deadline is strict. If you sold your previous home more than 3 years after buying the new one, you cannot claim a refund of the additional 5% surcharge.",
  },
  {
    question: "Do I get interest on the refund?",
    answer:
      "Yes, HMRC pays interest on SDLT refunds. Interest runs from the date you paid the original SDLT to the date the refund is issued. Current interest rates are published by HMRC.",
  },
];

const RELATED_PAGES = [
  {
    label: "Second Home Calculator",
    href: "/second-home",
    description: "Calculate the 5% surcharge you might reclaim",
  },
  {
    label: "Buy-to-Let Calculator",
    href: "/buy-to-let",
    description: "Understand the additional property surcharge",
  },
  {
    label: "Scotland LBTT",
    href: "/scotland",
    description: "Scottish ADS refund rules (18 months)",
  },
];

export default function RefundPage() {
  const [newPropertyPrice, setNewPropertyPrice] = useState<number>(0);
  const [newPriceInput, setNewPriceInput] = useState("");

  const surchargeAmount = newPropertyPrice * 0.05;

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setNewPriceInput(value);
    setNewPropertyPrice(parseInt(value) || 0);
  };

  return (
    <PageLayout
      title="Stamp Duty Refund Calculator & Guide"
      subtitle="Check if you can claim back the 5% additional property surcharge"
      systemPrompt={REFUND_PROMPT}
      initialMessage="I can help you understand stamp duty refunds. Did you pay the 5% surcharge when buying your new home?"
      faqs={FAQS}
      breadcrumbs={[{ label: "Refund", href: "/refund" }]}
      relatedPages={RELATED_PAGES}
    >
      {/* Refund Calculator */}
      <section className="mb-8">
        <div className="w-full max-w-2xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Potential Refund Calculator
            </h2>

            <div className="mb-6">
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                New Property Purchase Price
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 text-lg">
                  £
                </span>
                <input
                  type="text"
                  value={newPriceInput}
                  onChange={handlePriceChange}
                  placeholder="Enter the price you paid"
                  className="w-full pl-8 pr-4 py-3 text-lg border border-zinc-300 dark:border-zinc-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-zinc-800 dark:text-white"
                />
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                Enter the price of the property where you paid the 5% surcharge
              </p>
            </div>

            {newPropertyPrice > 0 && (
              <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <p className="text-sm text-green-700 dark:text-green-400 mb-2">
                  Potential 5% Surcharge Refund
                </p>
                <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                  {formatCurrency(surchargeAmount)}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  Plus interest from the date you paid SDLT
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Eligibility */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Are You Eligible for a Refund?
        </h2>
        <InfoBox variant="success" title="Refund Eligibility Checklist">
          <p>You may be eligible if ALL of the following apply:</p>
          <ul>
            <li>You paid the 5% surcharge when buying your new home</li>
            <li>The new property is/was your main residence</li>
            <li>You've now sold your previous main residence</li>
            <li>You sold within 3 years of buying the new property</li>
            <li>You're claiming within 12 months of the sale</li>
          </ul>
        </InfoBox>
      </section>

      {/* Timeline */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Key Deadlines
        </h2>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-700" />
          <div className="space-y-6">
            <div className="relative pl-10">
              <div className="absolute left-2.5 w-3 h-3 bg-blue-500 rounded-full" />
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Buy New Property
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Pay SDLT including 5% surcharge (if you still own previous home)
              </p>
            </div>
            <div className="relative pl-10">
              <div className="absolute left-2.5 w-3 h-3 bg-amber-500 rounded-full" />
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                3 Year Window
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                You have 3 years from purchase to sell your previous main residence
              </p>
            </div>
            <div className="relative pl-10">
              <div className="absolute left-2.5 w-3 h-3 bg-green-500 rounded-full" />
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Sell Previous Home
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Complete the sale of your previous main residence
              </p>
            </div>
            <div className="relative pl-10">
              <div className="absolute left-2.5 w-3 h-3 bg-red-500 rounded-full" />
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                12 Month Claim Window
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Claim refund within 12 months of selling (or filing deadline)
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to Claim */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          How to Claim Your Refund
        </h2>
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-zinc-200 dark:border-zinc-800">
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  Gather Your Documents
                </h3>
                <ul className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 space-y-1">
                  <li>• SDLT5 certificate (from your solicitor)</li>
                  <li>• Completion dates for both properties</li>
                  <li>• Proof of sale of previous property</li>
                  <li>• Bank details for the refund</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  Submit Your Claim
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Use HMRC's online form at GOV.UK or write to HMRC's Stamp Taxes
                  office. Include all transaction details and your refund
                  calculation.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  Receive Your Refund
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  HMRC aims to process within 15 working days. You'll receive the
                  refund plus interest directly to your bank account.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Regional Differences */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
          Regional Refund Rules
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
            <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
              England & NI
            </h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• 5% surcharge</li>
              <li>• 3 year window to sell</li>
              <li>• 12 month claim deadline</li>
              <li>• Claim via HMRC</li>
            </ul>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5 border border-purple-200 dark:border-purple-800">
            <h3 className="font-bold text-purple-800 dark:text-purple-300 mb-2">
              Scotland
            </h3>
            <ul className="text-sm text-purple-700 dark:text-purple-300 space-y-1">
              <li>• 6% ADS surcharge</li>
              <li>• 18 month window only</li>
              <li>• 5 year claim period</li>
              <li>• Claim via Revenue Scotland</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5 border border-red-200 dark:border-red-800">
            <h3 className="font-bold text-red-800 dark:text-red-300 mb-2">Wales</h3>
            <ul className="text-sm text-red-700 dark:text-red-300 space-y-1">
              <li>• 4% higher rate</li>
              <li>• 3 year window to sell</li>
              <li>• 12 month claim deadline</li>
              <li>• Claim via WRA</li>
            </ul>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section className="prose prose-zinc dark:prose-invert max-w-none">
        <h2>Stamp Duty Refunds Explained</h2>
        <p>
          If you bought a new main residence while still owning your previous home,
          you'll have paid the 5% additional property surcharge. However, if you
          sell your old home within 3 years, you can claim this surcharge back.
        </p>

        <h3>Common Scenarios</h3>
        <p>
          The most common reason for a refund is chain-related timing. Perhaps you
          couldn't sell your old home before buying the new one, or you needed to
          complete on the new property before the sale of the old one went through.
        </p>

        <h3>Don't Miss the Deadline</h3>
        <p>
          The 12-month claim window is strictly enforced. Set a reminder when you
          sell your previous home to ensure you submit your claim in time. Interest
          accrues from the original payment date, so there's no financial advantage
          to delaying.
        </p>
      </section>
    </PageLayout>
  );
}
