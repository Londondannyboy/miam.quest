"use client";

import { useState } from "react";

interface CalculationResult {
  weeklyAmount: number;
  monthlyAmount: number;
  yearlyAmount: number;
  rateType: string;
  breakdown: string[];
}

export function ChildMaintenanceCalculator() {
  const [grossIncome, setGrossIncome] = useState<string>("");
  const [incomeFrequency, setIncomeFrequency] = useState<"weekly" | "monthly" | "yearly">("yearly");
  const [numberOfChildren, setNumberOfChildren] = useState<number>(1);
  const [sharedCareNights, setSharedCareNights] = useState<number>(0);
  const [otherChildren, setOtherChildren] = useState<number>(0);
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [showDisclaimer, setShowDisclaimer] = useState(false);

  const calculateMaintenance = () => {
    const income = parseFloat(grossIncome) || 0;

    // Convert to weekly income
    let weeklyIncome: number;
    switch (incomeFrequency) {
      case "weekly":
        weeklyIncome = income;
        break;
      case "monthly":
        weeklyIncome = (income * 12) / 52;
        break;
      case "yearly":
        weeklyIncome = income / 52;
        break;
    }

    const breakdown: string[] = [];
    breakdown.push(`Gross weekly income: £${weeklyIncome.toFixed(2)}`);

    // Deduction for other children in household (11% for 1, 14% for 2, 16% for 3+)
    let adjustedIncome = weeklyIncome;
    if (otherChildren > 0) {
      const otherChildrenRate = otherChildren === 1 ? 0.11 : otherChildren === 2 ? 0.14 : 0.16;
      const deduction = weeklyIncome * otherChildrenRate;
      adjustedIncome = weeklyIncome - deduction;
      breakdown.push(`Deduction for ${otherChildren} other child${otherChildren > 1 ? 'ren' : ''}: -£${deduction.toFixed(2)}`);
      breakdown.push(`Adjusted weekly income: £${adjustedIncome.toFixed(2)}`);
    }

    let weeklyAmount: number;
    let rateType: string;

    // Nil rate
    if (adjustedIncome < 7) {
      weeklyAmount = 0;
      rateType = "Nil Rate";
      breakdown.push("Income below £7/week - Nil rate applies");
    }
    // Flat rate (£7-£100 or certain benefits)
    else if (adjustedIncome < 100) {
      weeklyAmount = 7;
      rateType = "Flat Rate";
      breakdown.push("Income £7-£100/week - Flat rate of £7 applies");
    }
    // Reduced rate (£100-£199)
    else if (adjustedIncome < 200) {
      // Reduced rate calculation: £7 flat + percentage of income over £100
      const incomeOver100 = adjustedIncome - 100;
      const rates = [0.17, 0.25, 0.31]; // 1, 2, 3+ children
      const rate = rates[Math.min(numberOfChildren - 1, 2)];
      weeklyAmount = 7 + (incomeOver100 * rate);
      rateType = "Reduced Rate";
      breakdown.push(`Reduced rate: £7 + ${(rate * 100).toFixed(0)}% of £${incomeOver100.toFixed(2)}`);
    }
    // Basic rate (£200-£800)
    else if (adjustedIncome <= 800) {
      const rates = [0.12, 0.16, 0.19]; // 1, 2, 3+ children
      const rate = rates[Math.min(numberOfChildren - 1, 2)];
      weeklyAmount = adjustedIncome * rate;
      rateType = "Basic Rate";
      breakdown.push(`Basic rate: ${(rate * 100).toFixed(0)}% of £${adjustedIncome.toFixed(2)}`);
    }
    // Basic Plus rate (£800-£3000)
    else if (adjustedIncome <= 3000) {
      const basicRates = [0.12, 0.16, 0.19];
      const plusRates = [0.09, 0.12, 0.15];
      const basicRate = basicRates[Math.min(numberOfChildren - 1, 2)];
      const plusRate = plusRates[Math.min(numberOfChildren - 1, 2)];

      const basicAmount = 800 * basicRate;
      const plusAmount = (adjustedIncome - 800) * plusRate;
      weeklyAmount = basicAmount + plusAmount;
      rateType = "Basic Plus Rate";
      breakdown.push(`Basic rate on first £800: £${basicAmount.toFixed(2)}`);
      breakdown.push(`Plus rate (${(plusRate * 100).toFixed(0)}%) on £${(adjustedIncome - 800).toFixed(2)}: £${plusAmount.toFixed(2)}`);
    }
    // Income over £3000 - capped
    else {
      const basicRates = [0.12, 0.16, 0.19];
      const plusRates = [0.09, 0.12, 0.15];
      const basicRate = basicRates[Math.min(numberOfChildren - 1, 2)];
      const plusRate = plusRates[Math.min(numberOfChildren - 1, 2)];

      const basicAmount = 800 * basicRate;
      const plusAmount = 2200 * plusRate; // £3000 - £800 = £2200
      weeklyAmount = basicAmount + plusAmount;
      rateType = "Basic Plus Rate (Capped)";
      breakdown.push(`Income over £3000/week - calculation capped at £3000`);
      breakdown.push(`Basic rate on first £800: £${basicAmount.toFixed(2)}`);
      breakdown.push(`Plus rate on £2200: £${plusAmount.toFixed(2)}`);
    }

    // Apply shared care reduction
    if (sharedCareNights >= 52 && weeklyAmount > 0) {
      let reduction: number;
      let reductionDesc: string;

      if (sharedCareNights >= 175) {
        // 175+ nights: 50% off plus £7 per child
        reduction = (weeklyAmount * 0.5) + (7 * numberOfChildren);
        reductionDesc = "175+ nights: 50% reduction + £7 per child";
      } else if (sharedCareNights >= 156) {
        // 156-174 nights: 3/7 reduction
        reduction = weeklyAmount * (3/7);
        reductionDesc = "156-174 nights: 3/7 (43%) reduction";
      } else if (sharedCareNights >= 104) {
        // 104-155 nights: 2/7 reduction
        reduction = weeklyAmount * (2/7);
        reductionDesc = "104-155 nights: 2/7 (29%) reduction";
      } else {
        // 52-103 nights: 1/7 reduction
        reduction = weeklyAmount * (1/7);
        reductionDesc = "52-103 nights: 1/7 (14%) reduction";
      }

      breakdown.push(`Shared care reduction (${sharedCareNights} nights): -£${reduction.toFixed(2)}`);
      breakdown.push(reductionDesc);
      weeklyAmount = Math.max(0, weeklyAmount - reduction);
    }

    breakdown.push(`Final weekly amount: £${weeklyAmount.toFixed(2)}`);

    setResult({
      weeklyAmount,
      monthlyAmount: (weeklyAmount * 52) / 12,
      yearlyAmount: weeklyAmount * 52,
      rateType,
      breakdown
    });
    setShowDisclaimer(true);
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
      {/* Beta Warning Banner */}
      <div className="bg-amber-500 px-6 py-3">
        <p className="text-amber-950 text-sm font-medium flex items-center gap-2">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          BETA: This calculator provides estimates only. Use the{" "}
          <a href="https://www.gov.uk/calculate-child-maintenance" target="_blank" rel="noopener noreferrer" className="underline font-bold">
            official Gov.uk calculator
          </a>{" "}
          for accurate figures.
        </p>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 px-6 py-4">
        <h2 className="text-xl font-bold text-white">Child Maintenance Calculator</h2>
        <p className="text-emerald-100 text-sm">Estimate payments based on CMS formula (2024/25) - FOR GUIDANCE ONLY</p>
      </div>

      <div className="p-6">
        {/* Income Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Paying parent&apos;s gross income (before tax)
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500">£</span>
              <input
                type="number"
                value={grossIncome}
                onChange={(e) => setGrossIncome(e.target.value)}
                placeholder="Enter amount"
                className="w-full pl-8 pr-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>
            <select
              value={incomeFrequency}
              onChange={(e) => setIncomeFrequency(e.target.value as "weekly" | "monthly" | "yearly")}
              className="px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
            >
              <option value="yearly">per year</option>
              <option value="monthly">per month</option>
              <option value="weekly">per week</option>
            </select>
          </div>
        </div>

        {/* Number of Children */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Number of children maintenance is for
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                onClick={() => setNumberOfChildren(num)}
                className={`w-12 h-12 rounded-lg font-medium transition-colors ${
                  numberOfChildren === num
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {num}{num === 5 ? "+" : ""}
              </button>
            ))}
          </div>
        </div>

        {/* Shared Care Nights */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Shared care nights per year (paying parent has children overnight)
          </label>
          <input
            type="range"
            min="0"
            max="182"
            value={sharedCareNights}
            onChange={(e) => setSharedCareNights(parseInt(e.target.value))}
            className="w-full h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-emerald-600"
          />
          <div className="flex justify-between text-sm text-zinc-500 mt-1">
            <span>0 nights</span>
            <span className="font-medium text-emerald-600">{sharedCareNights} nights</span>
            <span>182+ nights</span>
          </div>
          <p className="text-xs text-zinc-500 mt-1">
            {sharedCareNights < 52 ? "No reduction (under 52 nights)" :
             sharedCareNights < 104 ? "1/7 reduction band" :
             sharedCareNights < 156 ? "2/7 reduction band" :
             sharedCareNights < 175 ? "3/7 reduction band" : "50%+ reduction band"}
          </p>
        </div>

        {/* Other Children */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
            Other children living with paying parent
          </label>
          <div className="flex gap-2">
            {[0, 1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setOtherChildren(num)}
                className={`w-12 h-12 rounded-lg font-medium transition-colors ${
                  otherChildren === num
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                }`}
              >
                {num}{num === 3 ? "+" : ""}
              </button>
            ))}
          </div>
          <p className="text-xs text-zinc-500 mt-1">Children from other relationships living in the same household</p>
        </div>

        {/* Calculate Button */}
        <button
          onClick={calculateMaintenance}
          className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
        >
          Calculate Child Maintenance
        </button>

        {/* Results */}
        {result && (
          <div className="mt-6 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
            <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">
              Estimated Child Maintenance
            </h3>

            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-white dark:bg-zinc-800 rounded-lg">
                <p className="text-2xl font-bold text-emerald-600">£{result.weeklyAmount.toFixed(2)}</p>
                <p className="text-xs text-zinc-500">per week</p>
              </div>
              <div className="text-center p-3 bg-white dark:bg-zinc-800 rounded-lg">
                <p className="text-2xl font-bold text-emerald-600">£{result.monthlyAmount.toFixed(2)}</p>
                <p className="text-xs text-zinc-500">per month</p>
              </div>
              <div className="text-center p-3 bg-white dark:bg-zinc-800 rounded-lg">
                <p className="text-2xl font-bold text-emerald-600">£{result.yearlyAmount.toFixed(2)}</p>
                <p className="text-xs text-zinc-500">per year</p>
              </div>
            </div>

            <div className="mb-4">
              <span className="inline-block px-3 py-1 bg-emerald-600 text-white text-sm rounded-full">
                {result.rateType}
              </span>
            </div>

            {/* Calculation Breakdown */}
            <details className="group">
              <summary className="cursor-pointer text-sm font-medium text-emerald-700 dark:text-emerald-300 hover:underline">
                Show calculation breakdown
              </summary>
              <ul className="mt-2 space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                {result.breakdown.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        )}

        {/* Disclaimer */}
        {showDisclaimer && (
          <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border-2 border-amber-400 dark:border-amber-600">
            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium mb-3">
              <strong>IMPORTANT - BETA CALCULATOR:</strong> This calculator is for guidance only and is continuously being improved. The actual amount may differ significantly based on your specific circumstances.
            </p>
            <p className="text-sm text-amber-800 dark:text-amber-200 mb-2">
              <strong>For accurate, official calculations, please use:</strong>
            </p>
            <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1 ml-4">
              <li>
                <a
                  href="https://www.gov.uk/calculate-child-maintenance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold hover:text-amber-900"
                >
                  Gov.uk Child Maintenance Calculator (England, Wales, Scotland)
                </a>
              </li>
              <li>
                <a
                  href="https://www.nidirect.gov.uk/articles/calculate-child-maintenance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold hover:text-amber-900"
                >
                  NI Direct Calculator (Northern Ireland)
                </a>
              </li>
            </ul>
          </div>
        )}

        {/* CMS Link */}
        <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
            Need an official calculation or want to apply?
          </p>
          <a
            href="https://www.gov.uk/calculate-child-maintenance"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
          >
            Use the official Gov.uk calculator
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ChildMaintenanceCalculator;
