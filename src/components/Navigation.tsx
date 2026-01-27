"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const MIAM_PAGES = [
  { href: "/miam/what-is-a-miam", label: "What is a MIAM?" },
  { href: "/miam/certificate", label: "MIAM Certificate" },
  { href: "/miam/exemptions", label: "MIAM Exemptions" },
  { href: "/miam/form-fm1", label: "FM1 Form Guide" },
];

const MEDIATION_PAGES = [
  { href: "/mediation/what-is-mediation", label: "What is Mediation?" },
  { href: "/mediation/cost", label: "Mediation Costs" },
  { href: "/mediation/divorce-mediation", label: "Divorce Mediation" },
  { href: "/mediation/family-mediation-voucher-scheme", label: "Voucher Scheme" },
  { href: "/mediation/shuttle-mediation", label: "Shuttle Mediation" },
  { href: "/mediation/how-long-does-mediation-take", label: "How Long Does It Take?" },
  { href: "/mediation/benefits-of-mediation", label: "Benefits of Mediation" },
];

const COURT_ORDERS_PAGES = [
  { href: "/forms/c100", label: "C100 Form Guide" },
  { href: "/court-orders/prohibited-steps-order", label: "Prohibited Steps Order" },
  { href: "/court-orders/specific-issue-order", label: "Specific Issue Order" },
  { href: "/court-orders/consent-order", label: "Consent Order" },
];

const GUIDES_PAGES = [
  { href: "/guides/parenting-plan", label: "Parenting Plan" },
  { href: "/guides/parallel-parenting", label: "Parallel Parenting" },
  { href: "/guides/supervised-contact", label: "Supervised Contact" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [miamDropdownOpen, setMiamDropdownOpen] = useState(false);
  const [mediationDropdownOpen, setMediationDropdownOpen] = useState(false);
  const [courtOrdersDropdownOpen, setCourtOrdersDropdownOpen] = useState(false);
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const isSectionActive = (pages: { href: string }[]) => {
    return pages.some(page => pathname.startsWith(page.href));
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="font-bold text-zinc-900 dark:text-white hidden sm:block">
              Miam Certificate Quest
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname === "/"
                  ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                  : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
              }`}
            >
              Home
            </Link>

            {/* MIAM Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setMiamDropdownOpen(true)}
                onMouseLeave={() => setMiamDropdownOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  isSectionActive(MIAM_PAGES)
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                MIAM
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {miamDropdownOpen && (
                <div
                  onMouseEnter={() => setMiamDropdownOpen(true)}
                  onMouseLeave={() => setMiamDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2"
                >
                  {MIAM_PAGES.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className={`block px-4 py-2 text-sm ${
                        isActive(page.href)
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mediation Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setMediationDropdownOpen(true)}
                onMouseLeave={() => setMediationDropdownOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  isSectionActive(MEDIATION_PAGES)
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Mediation
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mediationDropdownOpen && (
                <div
                  onMouseEnter={() => setMediationDropdownOpen(true)}
                  onMouseLeave={() => setMediationDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2"
                >
                  {MEDIATION_PAGES.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className={`block px-4 py-2 text-sm ${
                        isActive(page.href)
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Court Orders Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setCourtOrdersDropdownOpen(true)}
                onMouseLeave={() => setCourtOrdersDropdownOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  isSectionActive(COURT_ORDERS_PAGES)
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Court Orders
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {courtOrdersDropdownOpen && (
                <div
                  onMouseEnter={() => setCourtOrdersDropdownOpen(true)}
                  onMouseLeave={() => setCourtOrdersDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2"
                >
                  {COURT_ORDERS_PAGES.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className={`block px-4 py-2 text-sm ${
                        isActive(page.href)
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Guides Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setGuidesDropdownOpen(true)}
                onMouseLeave={() => setGuidesDropdownOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  isSectionActive(GUIDES_PAGES)
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Guides
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {guidesDropdownOpen && (
                <div
                  onMouseEnter={() => setGuidesDropdownOpen(true)}
                  onMouseLeave={() => setGuidesDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2"
                >
                  {GUIDES_PAGES.map((page) => (
                    <Link
                      key={page.href}
                      href={page.href}
                      className={`block px-4 py-2 text-sm ${
                        isActive(page.href)
                          ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300"
                          : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                      }`}
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* External Resources */}
            <a
              href="https://www.familymediationcouncil.org.uk/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-1"
            >
              FMC
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium ${
                  pathname === "/"
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                }`}
              >
                Home
              </Link>

              {/* MIAM Section */}
              <div className="px-3 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider">
                MIAM
              </div>
              {MIAM_PAGES.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 pl-6 rounded-lg text-sm font-medium ${
                    isActive(page.href)
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {page.label}
                </Link>
              ))}

              {/* Mediation Section */}
              <div className="px-3 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mt-2">
                Mediation
              </div>
              {MEDIATION_PAGES.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 pl-6 rounded-lg text-sm font-medium ${
                    isActive(page.href)
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {page.label}
                </Link>
              ))}

              {/* Court Orders Section */}
              <div className="px-3 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mt-2">
                Court Orders
              </div>
              {COURT_ORDERS_PAGES.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 pl-6 rounded-lg text-sm font-medium ${
                    isActive(page.href)
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {page.label}
                </Link>
              ))}

              {/* Guides Section */}
              <div className="px-3 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mt-2">
                Guides
              </div>
              {GUIDES_PAGES.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 pl-6 rounded-lg text-sm font-medium ${
                    isActive(page.href)
                      ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                      : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  {page.label}
                </Link>
              ))}

              {/* External Link */}
              <a
                href="https://www.familymediationcouncil.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 mt-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1"
              >
                Family Mediation Council
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
