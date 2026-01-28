"use client";

export function BetaBanner() {
  return (
    <div className="bg-amber-100 dark:bg-amber-900/40 border-b-2 border-amber-300 dark:border-amber-700">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 bg-amber-800 text-white text-xs font-bold rounded-full uppercase tracking-wide">
              Beta
            </span>
            <span className="font-semibold text-amber-900 dark:text-amber-100">
              Q1 2026 Launch
            </span>
          </div>
          <span className="text-amber-800 dark:text-amber-200 text-center">
            We cannot provide legal advice or issue MIAM certificates.{" "}
            <a
              href="https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-900 dark:text-amber-100 font-semibold underline hover:no-underline"
            >
              Find an FMC-accredited mediator
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default BetaBanner;
