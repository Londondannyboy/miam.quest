import Link from "next/link";

const MIAM_LINKS = [
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

const MEDIATION_LINKS = [
  { href: "/what-is-mediation", label: "What is Mediation?" },
  { href: "/family-mediation", label: "Family Mediation" },
  { href: "/divorce-mediation", label: "Divorce Mediation" },
  { href: "/mediation-cost", label: "Mediation Costs" },
  { href: "/free-mediation", label: "Free Mediation" },
  { href: "/legal-aid-mediation", label: "Legal Aid Mediation" },
  { href: "/family-mediation-voucher-scheme", label: "Voucher Scheme" },
  { href: "/shuttle-mediation", label: "Shuttle Mediation" },
  { href: "/how-long-does-mediation-take", label: "How Long?" },
  { href: "/benefits-of-mediation", label: "Benefits" },
  { href: "/mediation-vs-court", label: "Mediation vs Court" },
  { href: "/mediation-preparation-checklist", label: "Preparation Checklist" },
  { href: "/how-to-prepare-for-mediation", label: "How to Prepare" },
  { href: "/mediation-glossary", label: "Glossary" },
];

const FIND_MEDIATOR_LINKS = [
  { href: "/find-a-mediator", label: "Find a Mediator" },
  { href: "/mediation-near-me", label: "Mediation Near Me" },
  { href: "/family-mediation-near-me", label: "Family Mediation Near Me" },
  { href: "/national-family-mediation", label: "National Family Mediation" },
  { href: "/family-mediation-london", label: "London" },
  { href: "/family-mediation-manchester", label: "Manchester" },
  { href: "/family-mediation-birmingham", label: "Birmingham" },
  { href: "/family-mediation-leeds", label: "Leeds" },
  { href: "/family-mediation-newcastle", label: "Newcastle" },
  { href: "/family-mediation-bristol", label: "Bristol" },
  { href: "/family-mediation-liverpool", label: "Liverpool" },
  { href: "/surrey-family-mediation", label: "Surrey" },
  { href: "/family-mediation-guildford", label: "Guildford" },
  { href: "/kent-family-mediation", label: "Kent" },
];

const COURT_ORDERS_LINKS = [
  { href: "/what-is-c100-form", label: "What is a C100?" },
  { href: "/c100-form", label: "C100 Form Guide" },
  { href: "/c100-form-download", label: "C100 Form Download" },
  { href: "/what-happens-after-c100", label: "After C100" },
  { href: "/consent-order", label: "Consent Order" },
  { href: "/consent-order-template", label: "Consent Order Template" },
  { href: "/prohibited-steps-order", label: "Prohibited Steps Order" },
  { href: "/specific-issue-order", label: "Specific Issue Order" },
];

const GUIDES_LINKS = [
  { href: "/child-maintenance-calculator", label: "Child Maintenance Calculator" },
  { href: "/parenting-plan", label: "Parenting Plan" },
  { href: "/parenting-plan-cafcass", label: "Parenting Plan (Cafcass)" },
  { href: "/parenting-plan-template", label: "Parenting Plan Template" },
  { href: "/parallel-parenting", label: "Parallel Parenting" },
  { href: "/supervised-contact", label: "Supervised Contact" },
  { href: "/co-parenting", label: "Co-Parenting" },
  { href: "/co-parenting-apps", label: "Co-Parenting Apps" },
  { href: "/separation-agreement", label: "Separation Agreement" },
  { href: "/separation-agreement-template", label: "Separation Template" },
  { href: "/financial-disclosure-divorce", label: "Financial Disclosure" },
];

const RIGHTS_LINKS = [
  { href: "/fathers-rights", label: "Fathers Rights" },
  { href: "/unmarried-fathers-rights", label: "Unmarried Fathers Rights" },
  { href: "/grandparents-rights", label: "Grandparents Rights" },
  { href: "/grandparents-rights-cafcass", label: "Grandparents & Cafcass" },
  { href: "/grandparents-rights-scotland", label: "Scotland" },
  { href: "/child-custody-mediation", label: "Child Custody Mediation" },
];

const SUPPORT_LINKS = [
  { href: "/mediation-with-narcissist", label: "Mediation with Narcissist" },
  { href: "/co-parenting-narcissist", label: "Co-Parenting with Narcissist" },
  { href: "/divorcing-a-narcissist", label: "Divorcing a Narcissist" },
  { href: "/stages-of-grief-divorce", label: "Stages of Grief" },
  { href: "/domestic-abuse-support", label: "Domestic Abuse Support" },
  { href: "/workplace-mediation", label: "Workplace Mediation" },
];

const EXTERNAL_LINKS = [
  { href: "https://www.familymediationcouncil.org.uk/", label: "Family Mediation Council" },
  { href: "https://www.gov.uk/looking-after-children-divorce/mediation", label: "Gov.uk - Mediation" },
  { href: "https://www.cafcass.gov.uk/", label: "Cafcass" },
  { href: "https://www.nfm.org.uk/", label: "National Family Mediation" },
  { href: "https://www.citizensadvice.org.uk/family/", label: "Citizens Advice" },
  { href: "https://www.nationaldahelpline.org.uk/", label: "DA Helpline" },
  { href: "https://www.resolution.org.uk/", label: "Resolution" },
  { href: "https://www.judiciary.uk/", label: "UK Judiciary" },
];

const PARTNER_LINKS = [
  { href: "https://relocation.quest", label: "Relocation Quest", desc: "Family relocation advice" },
  { href: "https://fractional.quest", label: "Fractional Quest", desc: "HR & executive support" },
  { href: "https://rainmakrr.com", label: "Rainmakrr", desc: "Business growth platform" },
];

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-zinc-300 mt-auto">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-8">
          {/* About */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">M</span>
              </div>
              <span className="font-bold text-white">Miam Certificate Quest</span>
            </div>
            <p className="text-sm mb-4 text-white">
              Free AI-powered MIAM certificate preparation for UK family disputes.
            </p>
            <p className="text-sm text-zinc-300">
              Miam is an AI assistant and cannot provide legal advice.
              Only FMC-accredited mediators can issue valid MIAM certificates.
            </p>
          </div>

          {/* MIAM */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">MIAM</h3>
            <ul className="space-y-1.5">
              {MIAM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Mediation */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Mediation</h3>
            <ul className="space-y-1.5">
              {MEDIATION_LINKS.slice(0, 10).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Find Mediator + Court Orders */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Find Mediator</h3>
            <ul className="space-y-1.5">
              {FIND_MEDIATOR_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold mb-4 mt-6 text-sm">Court Orders</h3>
            <ul className="space-y-1.5">
              {COURT_ORDERS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Guides</h3>
            <ul className="space-y-1.5">
              {GUIDES_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rights + Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Rights</h3>
            <ul className="space-y-1.5">
              {RIGHTS_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h3 className="text-white font-semibold mb-4 mt-6 text-sm">Support</h3>
            <ul className="space-y-1.5">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* External Resources */}
        <div className="mt-12 pt-8 border-t border-zinc-800">
          <h3 className="text-white font-semibold mb-4 text-sm">Official MIAM Certificate Resources</h3>
          <div className="flex flex-wrap gap-4">
            {EXTERNAL_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors flex items-center gap-1"
              >
                {link.label}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Partner Sites */}
        <div className="mt-8 pt-8 border-t border-zinc-800">
          <h3 className="text-white font-semibold mb-4 text-sm">Partner Services</h3>
          <div className="flex flex-wrap gap-6">
            {PARTNER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors"
              >
                <span className="font-medium">{link.label}</span>
                <span className="text-zinc-500 ml-1">— {link.desc}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 pt-8 border-t border-zinc-800">
          <div className="bg-amber-900/20 border border-amber-700/30 rounded-lg p-4 mb-6">
            <p className="text-amber-300/90 text-xs">
              <strong className="text-amber-400">Important:</strong> Miam Certificate Quest is a beta service providing AI-powered mediation preparation guidance.
              We do not provide mediation services or legal advice. Always consult a qualified professional before making decisions.
              Only FMC-accredited mediators can conduct MIAMs and issue certificates.
            </p>
          </div>
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white mb-8">
          <span>Free MIAM certificate preparation</span>
          <span className="text-zinc-500">|</span>
          <span>FMC-accredited mediator connections</span>
          <span className="text-zinc-500">|</span>
          <span>MIAM certificate guidance UK</span>
          <span className="text-zinc-500">|</span>
          <span>Child-focused approach</span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white">
              &copy; {currentYear} Miam Certificate Quest. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-zinc-300 hover:text-white transition-colors underline underline-offset-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
