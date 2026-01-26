"use client";

import Link from "next/link";

interface DisclaimerProps {
  variant?: "banner" | "section" | "compact";
  className?: string;
}

export function Disclaimer({ variant = "section", className = "" }: DisclaimerProps) {
  if (variant === "banner") {
    return (
      <div className={`bg-amber-50 dark:bg-amber-900/30 border-b border-amber-200 dark:border-amber-800 ${className}`}>
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-amber-600 dark:text-amber-400 font-medium">AI Assistant</span>
            <span className="text-amber-700 dark:text-amber-300">
              Miam helps you prepare for mediation but cannot provide legal advice or issue MIAM certificates.
            </span>
            <Link href="/miam/exemptions" className="text-amber-800 dark:text-amber-200 underline hover:no-underline font-medium whitespace-nowrap">
              Check exemptions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-sm text-amber-800 dark:text-amber-200">
            <strong className="text-amber-900 dark:text-amber-100">AI Preparation Tool:</strong>{" "}
            Miam helps you prepare for your MIAM but cannot provide legal advice or issue certificates. Only{" "}
            <a href="https://www.familymediationcouncil.org.uk/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline">
              FMC-accredited mediators
            </a>{" "}
            can do that.
          </p>
        </div>
      </div>
    );
  }

  // Default: section variant
  return (
    <section className={`py-10 bg-amber-50 dark:bg-amber-900/20 border-y border-amber-200 dark:border-amber-800 ${className}`}>
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
            <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">Important: About This AI Service</h3>
            <div className="space-y-2 text-amber-800 dark:text-amber-200">
              <p>
                <strong className="text-amber-900 dark:text-amber-100">MIAM.quest is an AI-powered preparation tool.</strong>{" "}
                We are a new startup helping people prepare for family mediation. Miam (our AI assistant) helps you understand the process and organize your thoughts.
              </p>
              <p>
                <strong className="text-amber-900 dark:text-amber-100">What we cannot do:</strong>{" "}
                Provide legal advice, issue MIAM certificates, or replace professional mediation services. Only{" "}
                <a href="https://www.familymediationcouncil.org.uk/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">
                  FMC-accredited human mediators
                </a>{" "}
                can issue the certificates required for court.
              </p>
              <p>
                <strong className="text-amber-900 dark:text-amber-100">If you&apos;re in danger:</strong>{" "}
                If you&apos;re experiencing domestic abuse, you may qualify for a{" "}
                <Link href="/miam/exemptions" className="underline hover:no-underline font-medium">
                  MIAM exemption
                </Link>
                . Please contact the{" "}
                <a href="https://www.nationaldahelpline.org.uk/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">
                  National Domestic Abuse Helpline
                </a>{" "}
                (0808 2000 247) for support.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Disclaimer;
