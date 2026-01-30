"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth/client";

const MIAM_PAGES = [
  { href: "/what-is-a-miam", label: "What is a MIAM?" },
  { href: "/miam-certificate", label: "MIAM Certificate" },
  { href: "/miam-certificate-cost", label: "MIAM Certificate Cost" },
  { href: "/online-miam", label: "Online MIAM" },
  { href: "/urgent-miam", label: "Urgent MIAM" },
  { href: "/miam-exemptions", label: "MIAM Exemptions" },
  { href: "/miam-cost", label: "MIAM Cost" },
  { href: "/miam-near-me", label: "MIAM Near Me" },
  { href: "/miam-meeting", label: "MIAM Meeting" },
  { href: "/is-miam-compulsory", label: "Is MIAM Compulsory?" },
  { href: "/form-fm1", label: "FM1 Form Guide" },
];

const MEDIATION_PAGES = [
  { href: "/what-is-mediation", label: "What is Mediation?" },
  { href: "/family-mediation", label: "Family Mediation" },
  { href: "/family-mediation-council", label: "Family Mediation Council" },
  { href: "/family-mediation-services", label: "Family Mediation Services" },
  { href: "/family-law-mediation", label: "Family Law Mediation" },
  { href: "/family-mediation-solicitors", label: "Mediation Solicitors" },
  { href: "/divorce-mediation", label: "Divorce Mediation" },
  { href: "/mediation-services", label: "Mediation Services" },
  { href: "/mediation-services-near-me", label: "Services Near Me" },
  { href: "/commercial-mediation-services", label: "Commercial Mediation" },
  { href: "/mediation-cost", label: "Mediation Costs" },
  { href: "/free-mediation", label: "Free Mediation" },
  { href: "/legal-aid-mediation", label: "Legal Aid Mediation" },
  { href: "/family-mediation-voucher-scheme", label: "Voucher Scheme" },
  { href: "/shuttle-mediation", label: "Shuttle Mediation" },
  { href: "/how-long-does-mediation-take", label: "How Long Does It Take?" },
  { href: "/benefits-of-mediation", label: "Benefits of Mediation" },
  { href: "/mediation-vs-court", label: "Mediation vs Court" },
  { href: "/mediation-preparation-checklist", label: "Preparation Checklist" },
  { href: "/how-to-prepare-for-mediation", label: "How to Prepare" },
  { href: "/mediation-glossary", label: "Mediation Glossary" },
];

const FIND_MEDIATOR_PAGES = [
  { href: "/find-a-mediator", label: "Find a Mediator" },
  { href: "/mediation-near-me", label: "Mediation Near Me" },
  { href: "/family-mediation-near-me", label: "Family Mediation Near Me" },
  { href: "/national-family-mediation", label: "National Family Mediation" },
  { href: "/family-mediation-london", label: "London" },
  { href: "/family-mediation-manchester", label: "Manchester" },
  { href: "/family-mediation-birmingham", label: "Birmingham" },
  { href: "/family-mediation-leeds", label: "Leeds" },
  { href: "/family-mediation-sheffield", label: "Sheffield" },
  { href: "/family-mediation-nottingham", label: "Nottingham" },
  { href: "/family-mediation-newcastle", label: "Newcastle" },
  { href: "/family-mediation-bristol", label: "Bristol" },
  { href: "/family-mediation-liverpool", label: "Liverpool" },
  { href: "/family-mediation-edinburgh", label: "Edinburgh" },
  { href: "/family-mediation-glasgow", label: "Glasgow" },
  { href: "/family-mediation-cardiff", label: "Cardiff" },
  { href: "/family-mediation-belfast", label: "Belfast" },
  { href: "/family-mediation-southampton", label: "Southampton" },
  { href: "/family-mediation-norwich", label: "Norwich" },
  { href: "/family-mediation-swansea", label: "Swansea" },
  { href: "/family-mediation-truro", label: "Truro" },
  { href: "/family-mediation-colchester", label: "Colchester" },
  { href: "/surrey-family-mediation", label: "Surrey" },
  { href: "/family-mediation-guildford", label: "Guildford" },
  { href: "/kent-family-mediation", label: "Kent" },
];

const COURT_ORDERS_PAGES = [
  { href: "/what-is-c100-form", label: "What is a C100 Form?" },
  { href: "/c100-form", label: "C100 Form Guide" },
  { href: "/c100-form-download", label: "C100 Form Download" },
  { href: "/what-happens-after-c100", label: "What Happens After C100" },
  { href: "/consent-order", label: "Consent Order" },
  { href: "/consent-order-template", label: "Consent Order Template" },
  { href: "/prohibited-steps-order", label: "Prohibited Steps Order" },
  { href: "/specific-issue-order", label: "Specific Issue Order" },
];

const GUIDES_PAGES = [
  { href: "/child-maintenance-calculator", label: "Child Maintenance Calculator" },
  { href: "/parenting-plan", label: "Parenting Plan" },
  { href: "/parenting-plan-cafcass", label: "Parenting Plan (Cafcass)" },
  { href: "/parenting-plan-template", label: "Parenting Plan Template" },
  { href: "/parallel-parenting", label: "Parallel Parenting" },
  { href: "/supervised-contact", label: "Supervised Contact" },
  { href: "/co-parenting", label: "Co-Parenting Guide" },
  { href: "/co-parenting-apps", label: "Co-Parenting Apps" },
  { href: "/separation-agreement", label: "Separation Agreement" },
  { href: "/separation-agreement-template", label: "Separation Agreement Template" },
  { href: "/financial-disclosure-divorce", label: "Financial Disclosure" },
];

const RIGHTS_PAGES = [
  { href: "/fathers-rights", label: "Fathers Rights" },
  { href: "/unmarried-fathers-rights", label: "Unmarried Fathers Rights" },
  { href: "/grandparents-rights", label: "Grandparents Rights" },
  { href: "/grandparents-rights-cafcass", label: "Grandparents & Cafcass" },
  { href: "/grandparents-rights-scotland", label: "Grandparents Rights Scotland" },
  { href: "/child-custody-mediation", label: "Child Custody Mediation" },
];

const SUPPORT_PAGES = [
  { href: "/mediation-with-narcissist", label: "Mediation with Narcissist" },
  { href: "/co-parenting-narcissist", label: "Co-Parenting with Narcissist" },
  { href: "/divorcing-a-narcissist", label: "Divorcing a Narcissist" },
  { href: "/stages-of-grief-divorce", label: "Stages of Grief" },
  { href: "/domestic-abuse-support", label: "Domestic Abuse Support" },
  { href: "/workplace-mediation", label: "Workplace Mediation" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [miamDropdownOpen, setMiamDropdownOpen] = useState(false);
  const [mediationDropdownOpen, setMediationDropdownOpen] = useState(false);
  const [findMediatorDropdownOpen, setFindMediatorDropdownOpen] = useState(false);
  const [courtOrdersDropdownOpen, setCourtOrdersDropdownOpen] = useState(false);
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false);
  const [rightsDropdownOpen, setRightsDropdownOpen] = useState(false);
  const [supportDropdownOpen, setSupportDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Auth state
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isSectionActive = (pages: { href: string }[]) => {
    return pages.some(page => pathname === page.href || pathname.startsWith(page.href + "/"));
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
                  className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 max-h-[70vh] overflow-y-auto"
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
                  className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 max-h-[70vh] overflow-y-auto"
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

            {/* Find Mediator Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setFindMediatorDropdownOpen(true)}
                onMouseLeave={() => setFindMediatorDropdownOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  isSectionActive(FIND_MEDIATOR_PAGES)
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Find Mediator
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {findMediatorDropdownOpen && (
                <div
                  onMouseEnter={() => setFindMediatorDropdownOpen(true)}
                  onMouseLeave={() => setFindMediatorDropdownOpen(false)}
                  className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 max-h-[70vh] overflow-y-auto"
                >
                  {FIND_MEDIATOR_PAGES.map((page) => (
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
                  className="absolute top-full left-0 mt-1 w-56 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 max-h-[70vh] overflow-y-auto"
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
                  className="absolute top-full left-0 mt-1 w-60 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 max-h-[70vh] overflow-y-auto"
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

            {/* Rights Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setRightsDropdownOpen(true)}
                onMouseLeave={() => setRightsDropdownOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  isSectionActive(RIGHTS_PAGES)
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Rights
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {rightsDropdownOpen && (
                <div
                  onMouseEnter={() => setRightsDropdownOpen(true)}
                  onMouseLeave={() => setRightsDropdownOpen(false)}
                  className="absolute top-full right-0 mt-1 w-60 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 max-h-[70vh] overflow-y-auto"
                >
                  {RIGHTS_PAGES.map((page) => (
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

            {/* Support Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setSupportDropdownOpen(true)}
                onMouseLeave={() => setSupportDropdownOpen(false)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
                  isSectionActive(SUPPORT_PAGES)
                    ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
                    : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white"
                }`}
              >
                Support
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {supportDropdownOpen && (
                <div
                  onMouseEnter={() => setSupportDropdownOpen(true)}
                  onMouseLeave={() => setSupportDropdownOpen(false)}
                  className="absolute top-full right-0 mt-1 w-60 bg-white dark:bg-zinc-900 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700 py-2 max-h-[70vh] overflow-y-auto"
                >
                  {SUPPORT_PAGES.map((page) => (
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

            {/* Divider */}
            <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-700 mx-2" />

            {/* Auth Buttons */}
            {isPending ? (
              <div className="w-20 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  <div className="w-6 h-6 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                    <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
                      {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                    </span>
                  </div>
                  <span className="hidden xl:inline max-w-[100px] truncate">
                    {user.name?.split(" ")[0] || user.email?.split("@")[0]}
                  </span>
                </Link>
                <button
                  onClick={async () => {
                    await authClient.signOut();
                    window.location.href = '/';
                  }}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/sign-in"
                className="px-4 py-2 rounded-lg text-sm font-medium bg-rose-600 hover:bg-rose-700 text-white transition-colors"
              >
                Sign In
              </Link>
            )}
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
          <div className="lg:hidden py-4 border-t border-zinc-200 dark:border-zinc-800 max-h-[80vh] overflow-y-auto">
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

              {/* Find Mediator Section */}
              <div className="px-3 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mt-2">
                Find Mediator
              </div>
              {FIND_MEDIATOR_PAGES.map((page) => (
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

              {/* Rights Section */}
              <div className="px-3 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mt-2">
                Rights
              </div>
              {RIGHTS_PAGES.map((page) => (
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

              {/* Support Section */}
              <div className="px-3 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider mt-2">
                Support
              </div>
              {SUPPORT_PAGES.map((page) => (
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
                className="px-3 py-2 mt-4 rounded-lg text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-1"
              >
                Family Mediation Council
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>

              {/* Mobile Auth Section */}
              <div className="border-t border-zinc-200 dark:border-zinc-700 mt-4 pt-4">
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      <div className="w-8 h-8 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center">
                        <span className="text-sm font-semibold text-rose-600 dark:text-rose-400">
                          {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                        </span>
                      </div>
                      <div>
                        <div className="font-medium">{user.name?.split(" ")[0] || "User"}</div>
                        <div className="text-xs text-zinc-500">{user.email}</div>
                      </div>
                    </Link>
                    <button
                      onClick={async () => {
                        setMobileMenuOpen(false);
                        await authClient.signOut();
                        window.location.href = '/';
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-zinc-500 hover:text-zinc-700 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/auth/sign-in"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center px-4 py-3 rounded-lg text-sm font-medium bg-rose-600 hover:bg-rose-700 text-white transition-colors"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
