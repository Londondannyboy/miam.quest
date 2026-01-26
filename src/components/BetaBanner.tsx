"use client";

import Link from "next/link";

export function BetaBanner() {
  return (
    <div className="bg-amber-100 dark:bg-amber-900/40 border-b-2 border-amber-300 dark:border-amber-700">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-sm">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-amber-500 text-white text-xs font-bold rounded-full uppercase tracking-wide">
              AI Tool
            </span>
            <span className="font-semibold text-amber-900 dark:text-amber-100">
              This is an AI preparation assistant
            </span>
          </div>
          <span className="hidden sm:inline text-amber-400">|</span>
          <span className="text-amber-800 dark:text-amber-200 text-center">
            We cannot provide legal advice or issue MIAM certificates.{" "}
            <a
              href="https://www.familymediationcouncil.org.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-900 dark:text-amber-100 font-semibold underline hover:no-underline"
            >
              Find an accredited mediator
            </a>
            {" "}or{" "}
            <Link
              href="/miam/exemptions"
              className="text-amber-900 dark:text-amber-100 font-semibold underline hover:no-underline"
            >
              check exemptions
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}

export default BetaBanner;
