"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { authClient } from "@/lib/auth/client";
import { HOME_PROMPT } from "@/lib/prompts";

// Lazy load heavy components
const CopilotSidebar = dynamic(
  () => import("@copilotkit/react-ui").then((mod) => mod.CopilotSidebar),
  { ssr: false, loading: () => null }
);

const VoiceInput = dynamic(
  () => import("@/components/VoiceInput").then((mod) => mod.VoiceInput),
  { ssr: false, loading: () => null }
);

// Unsplash images for warm, friendly feel
const IMAGES = {
  hero: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1920&q=80", // Warm professional woman
  consultation: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80", // Professional consultation
  family: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=80", // Parent and child
  support: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80", // Supportive conversation
  documents: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=80", // Documents/paperwork
  meeting: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80", // Professional handshake
};

// Expanded FAQ data for structured content - targeting ranking keywords
const FAQS = [
  {
    question: "What is a MIAM?",
    answer: "A MIAM (Mediation Information Assessment Meeting) is a mandatory meeting with an accredited family mediator that you must attend before applying to family court in England and Wales. During this 45-60 minute session, a mediator explains the mediation process, assesses your situation, and determines if mediation is suitable for your case. MIAMs are required under the Children and Families Act 2014."
  },
  {
    question: "What is a MIAM certificate?",
    answer: "A MIAM certificate is an official document issued by an FMC-accredited mediator after you've attended your MIAM. This certificate is required when submitting a C100 form to family court. It confirms you've explored mediation as an alternative to court proceedings. The certificate can state that mediation was attempted, not suitable, or that the other party refused to participate."
  },
  {
    question: "What is a MIAM certificate for court?",
    answer: "A MIAM certificate for court is proof that you've fulfilled the legal requirement to attend a Mediation Information Assessment Meeting before applying for a child arrangements order. Courts will not process your C100 application without this certificate or evidence of a valid MIAM exemption. The certificate shows you've considered mediation before pursuing court action."
  },
  {
    question: "Do I need a MIAM before going to court?",
    answer: "Yes, in most cases you must attend a MIAM before submitting a C100 form to apply for a child arrangements order in England and Wales. This is a legal requirement. However, you may qualify for a MIAM exemption if there's domestic abuse, child protection concerns, urgency, or other specific circumstances."
  },
  {
    question: "What is MIAM mediation?",
    answer: "MIAM mediation refers to the family mediation process that begins with a Mediation Information Assessment Meeting. After the initial MIAM, if both parties agree, you can proceed to full mediation sessions where a neutral mediator helps you reach agreements about child arrangements, finances, and property without going to court. MIAM mediation is often faster and less expensive than court proceedings."
  },
  {
    question: "How much does a MIAM cost?",
    answer: "A MIAM typically costs £90-150 per person for a single session. However, you may qualify for free mediation through legal aid if you're on a low income or receive certain benefits. The Family Mediation Voucher Scheme also provides up to £500 towards mediation costs for eligible families."
  },
  {
    question: "What exemptions allow me to skip the MIAM?",
    answer: "You may be exempt from attending a MIAM if: there's evidence of domestic abuse, child protection concerns exist, there's urgency or risk of harm, the other party is overseas or in prison, you've attended a MIAM in the last 4 months, you have a disability preventing attendance, or you cannot locate the other party. You'll need to provide evidence of your exemption."
  },
  {
    question: "Can Miam (the AI) issue a MIAM certificate?",
    answer: "No. Only FMC-accredited human mediators can issue valid MIAM certificates. Miam the AI assistant helps you prepare for your MIAM meeting and mediation - making the process easier, less stressful, and more effective. We help you organize your thoughts and understand what to expect."
  },
  {
    question: "Is using MIAM.quest free?",
    answer: "Yes! Preparing with Miam is completely free. We help you organize your thoughts, understand the MIAM process, and prepare for your actual MIAM meeting with a human mediator. There's no cost to chat with our AI assistant."
  },
  {
    question: "How long is a MIAM certificate valid?",
    answer: "A MIAM certificate is valid for 4 months from the date it was issued. If you don't submit your court application within this timeframe, you may need to attend another MIAM and obtain a new certificate. It's important to proceed with your application promptly after receiving your certificate."
  }
];

// Process steps
const PROCESS_STEPS = [
  {
    number: "1",
    title: "Talk to Miam",
    description: "Have a conversation about your situation. Miam will help you understand the MIAM process and what to expect.",
    icon: "chat"
  },
  {
    number: "2",
    title: "Capture Your Position",
    description: "Identify your must-haves, priorities, and red lines. Miam helps you organize your thoughts clearly.",
    icon: "list"
  },
  {
    number: "3",
    title: "Get Your Summary",
    description: "Receive a preparation document that helps you and your mediator focus on what matters most.",
    icon: "document"
  },
  {
    number: "4",
    title: "Find a Mediator",
    description: "Connect with an FMC-accredited mediator to get your official MIAM certificate.",
    icon: "search"
  }
];

// Topic areas
const TOPIC_AREAS = [
  { title: "Living Arrangements", desc: "Where children live and their routine", icon: "home" },
  { title: "School & Education", desc: "School choices and educational decisions", icon: "book" },
  { title: "Holidays & Occasions", desc: "Christmas, birthdays, school holidays", icon: "calendar" },
  { title: "Communication", desc: "How parents share information", icon: "chat" },
  { title: "Decision Making", desc: "Who decides what about the children", icon: "scale" },
  { title: "Financial Support", desc: "Child maintenance and shared costs", icon: "money" }
];

// Who needs a MIAM data
const WHO_NEEDS_MIAM = [
  { title: "Separating Parents", desc: "Parents who need to agree on child arrangements after separation" },
  { title: "Divorcing Couples", desc: "Couples going through divorce who have children together" },
  { title: "Grandparents", desc: "Grandparents seeking contact or custody arrangements" },
  { title: "Anyone Applying to Court", desc: "Anyone planning to submit a C100 form for child arrangements" }
];

// MIAM exemptions overview
const MIAM_EXEMPTIONS = [
  { title: "Domestic Abuse", desc: "Evidence of domestic violence or abuse", urgent: true },
  { title: "Child Protection", desc: "Local authority involvement in child welfare", urgent: true },
  { title: "Urgency", desc: "Risk of harm to you or your children", urgent: true },
  { title: "Previous MIAM", desc: "Attended a MIAM in the last 4 months", urgent: false },
  { title: "Other Party Abroad", desc: "The other person lives overseas", urgent: false },
  { title: "Unable to Locate", desc: "Cannot find the other party", urgent: false }
];

// Statistics
const STATS = [
  { number: "70%", label: "of mediations reach agreement" },
  { number: "£500", label: "voucher available for eligible families" },
  { number: "8-12", label: "weeks average mediation timeline" },
  { number: "£90-150", label: "typical MIAM cost per person" }
];

// Table of contents sections (expanded)
const TOC_SECTIONS = [
  { id: "what-is-miam", label: "What is a MIAM?" },
  { id: "who-needs-miam", label: "Who Needs a MIAM?" },
  { id: "miam-certificate", label: "MIAM Certificate" },
  { id: "miam-exemptions", label: "Exemptions" },
  { id: "how-miam-helps", label: "How We Help" },
  { id: "miam-cost", label: "Costs" },
  { id: "video-guide", label: "Video Guide" },
  { id: "faqs", label: "FAQs" },
];

// FAQ Schema for JSON-LD (SEO)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": FAQS.map((faq) => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer,
    },
  })),
};

// Video Schema for JSON-LD (SEO)
const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "What is a MIAM? - Mediation Information Assessment Meeting Explained",
  "description": "Learn what a MIAM (Mediation Information Assessment Meeting) is, why it's required before family court in England and Wales, and how to prepare for your meeting with an accredited mediator.",
  "thumbnailUrl": "https://img.youtube.com/vi/715gjNV5ffE/maxresdefault.jpg",
  "uploadDate": "2024-01-01",
  "contentUrl": "https://www.youtube.com/watch?v=715gjNV5ffE",
  "embedUrl": "https://www.youtube.com/embed/715gjNV5ffE",
  "publisher": {
    "@type": "Organization",
    "name": "MIAM.quest",
    "url": "https://miam.quest"
  }
};

export default function HomePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Voice messages are forwarded to the sidebar via this callback
  const handleVoiceMessage = useCallback((text: string, role?: "user" | "assistant") => {
    // Messages from voice are displayed in the sidebar
    console.log(`[Voice] ${role}: ${text.slice(0, 50)}...`);
  }, []);

  return (
    <div className="min-h-screen">
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />

      {/* Hero Section with Banner Image */}
      <section className="relative min-h-[600px] md:min-h-[700px] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={IMAGES.hero}
            alt="Friendly family mediation support"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 via-rose-800/80 to-rose-700/70" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16 md:py-24 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Free AI-Powered Mediation Preparation
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Prepare for Your{" "}
              <span className="text-rose-200">MIAM</span>{" "}
              with Confidence
            </h1>

            <p className="text-xl text-rose-100 mb-4 max-w-2xl">
              Meet <strong className="text-white">Miam</strong> - your free AI family mediation preparation assistant for England & Wales.
              We help you understand the MIAM process and prepare for your mediation meeting.
            </p>

            <p className="text-rose-200 mb-8 max-w-xl">
              Required before submitting a <Link href="/forms/c100" className="text-white underline hover:no-underline">C100 form</Link> to family court. Check if you qualify for a <Link href="/miam/exemptions" className="text-white underline hover:no-underline">MIAM exemption</Link>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => setIsChatOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-rose-50 text-rose-700 rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat with Miam - It&apos;s Free
              </button>

              <Link
                href="/miam/what-is-a-miam"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-transparent border-2 border-white/50 hover:border-white hover:bg-white/10 text-white rounded-xl font-semibold text-lg transition-all"
              >
                Learn About MIAMs
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-6 text-sm text-rose-100">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                100% Free
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Voice or Chat
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Confidential
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                UK Family Law
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents - Sticky */}
      <nav aria-label="Page contents" className="sticky top-16 z-30 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex overflow-x-auto gap-1 py-3 text-sm scrollbar-hide">
            {TOC_SECTIONS.map((section) => (
              <li key={section.id} className="flex-shrink-0">
                <a
                  href={`#${section.id}`}
                  className="px-4 py-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors whitespace-nowrap"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Statistics Section */}
      <section className="py-12 bg-gradient-to-b from-rose-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-rose-600 dark:text-rose-400 mb-1">{stat.number}</div>
                <div className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What is MIAM Section */}
      <section id="what-is-miam" className="py-20 bg-white dark:bg-zinc-900 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <span className="text-rose-600 dark:text-rose-400 font-medium text-sm uppercase tracking-wider">Understanding MIAMs</span>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mt-2 mb-6">
                What is a <span className="text-rose-600">MIAM</span>?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                A <strong>MIAM</strong> (Mediation Information Assessment Meeting) is a mandatory meeting
                with an <a href="https://www.familymediationcouncil.org.uk/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline font-medium">FMC-accredited family mediator</a> that you must attend before applying to family court in England and Wales.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                During this meeting, the mediator will explain how mediation works, assess whether it&apos;s suitable for your situation, and discuss alternatives to court. It&apos;s your first step toward resolving family disputes about <Link href="/topics/child-arrangements" className="text-rose-600 hover:underline font-medium">child arrangements</Link> in a less stressful way.
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
                Under the <a href="https://www.gov.uk/looking-after-children-divorce" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline font-medium">Children and Families Act 2014</a>,
                you must attend a MIAM or qualify for a <Link href="/miam/exemptions" className="text-rose-600 hover:underline font-medium">MIAM exemption</Link> before
                submitting a <Link href="/forms/c100" className="text-rose-600 hover:underline font-medium">C100 form</Link> to court.
              </p>
              <Link href="/miam/what-is-a-miam" className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold">
                Learn more about MIAMs
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Miam consultation.jpg"
                  alt="Family mediation consultation - parents discussing child arrangements with a mediator in the UK"
                  width={600}
                  height={450}
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-rose-600 text-white p-6 rounded-2xl shadow-xl max-w-[200px]">
                <div className="text-3xl font-bold">45-60</div>
                <div className="text-rose-200 text-sm">minutes per session</div>
              </div>
            </div>
          </div>

          {/* Key facts cards */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-zinc-800 dark:to-zinc-800 rounded-2xl p-8 border border-rose-100 dark:border-zinc-700">
              <div className="w-14 h-14 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Single Session</h3>
              <p className="text-zinc-600 dark:text-zinc-400">A MIAM is one meeting lasting 45-60 minutes where a mediator explains the process and assesses your situation.</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-zinc-800 dark:to-zinc-800 rounded-2xl p-8 border border-amber-100 dark:border-zinc-700">
              <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">£90-150 Per Person</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Typical MIAM fee. May be free with <a href="https://www.gov.uk/legal-aid" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">legal aid</a> or the <Link href="/mediation/cost" className="text-rose-600 hover:underline">Family Mediation Voucher Scheme</Link>.</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-zinc-800 dark:to-zinc-800 rounded-2xl p-8 border border-emerald-100 dark:border-zinc-700">
              <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center mb-5">
                <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">Required for Court</h3>
              <p className="text-zinc-600 dark:text-zinc-400">You need a <Link href="/miam/certificate" className="text-rose-600 hover:underline">MIAM certificate</Link> or exemption before submitting a <Link href="/forms/c100" className="text-rose-600 hover:underline">C100 form</Link>.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Needs a MIAM Section */}
      <section id="who-needs-miam" className="py-20 bg-zinc-50 dark:bg-zinc-950 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-600 dark:text-rose-400 font-medium text-sm uppercase tracking-wider">Is This For You?</span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mt-2 mb-6">
              Who Needs a MIAM?
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Most people applying to family court for child arrangements must attend a MIAM first. Here&apos;s who typically needs one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHO_NEEDS_MIAM.map((item, index) => (
              <div key={index} className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-zinc-100 dark:border-zinc-700">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center mb-5">
                  <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">Not sure if you need a MIAM? You might qualify for an exemption.</p>
            <Link href="/miam/exemptions" className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold">
              Check MIAM exemptions
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* MIAM Certificate Section - Target keyword "miam certificate" */}
      <section id="miam-certificate" className="py-20 bg-white dark:bg-zinc-900 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={IMAGES.documents}
                  alt="MIAM certificate and legal documents for family court"
                  className="rounded-2xl shadow-2xl w-full"
                />
                <div className="absolute -top-6 -right-6 bg-emerald-600 text-white p-6 rounded-2xl shadow-xl">
                  <div className="text-2xl font-bold">4 months</div>
                  <div className="text-emerald-200 text-sm">certificate validity</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <span className="text-rose-600 dark:text-rose-400 font-medium text-sm uppercase tracking-wider">Required Document</span>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mt-2 mb-6">
                What is a <span className="text-rose-600">MIAM Certificate</span>?
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                A <strong>MIAM certificate</strong> is the official document you receive after attending your Mediation Information Assessment Meeting. This certificate is essential - you cannot submit a C100 form to family court without it (unless you have an exemption).
              </p>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4 leading-relaxed">
                The certificate confirms you&apos;ve explored mediation as an alternative to court proceedings. Only <a href="https://www.familymediationcouncil.org.uk/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline font-medium">FMC-accredited mediators</a> can issue valid MIAM certificates.
              </p>
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6">
                <p className="text-amber-800 dark:text-amber-200 text-sm">
                  <strong>Important:</strong> MIAM.quest helps you prepare for your MIAM, but only human mediators can issue the certificate. We make the process easier, not replace it.
                </p>
              </div>
              <Link href="/miam/certificate" className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold transition-colors">
                Learn about MIAM certificates
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* MIAM Exemptions Section */}
      <section id="miam-exemptions" className="py-20 bg-zinc-50 dark:bg-zinc-950 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-600 dark:text-rose-400 font-medium text-sm uppercase tracking-wider">Skip the MIAM?</span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mt-2 mb-6">
              MIAM Exemptions
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              In certain circumstances, you may be exempt from attending a MIAM. These exemptions are designed to protect vulnerable individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {MIAM_EXEMPTIONS.map((exemption, index) => (
              <div key={index} className={`bg-white dark:bg-zinc-800 rounded-2xl p-6 border ${exemption.urgent ? 'border-red-200 dark:border-red-900' : 'border-zinc-100 dark:border-zinc-700'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${exemption.urgent ? 'bg-red-100 dark:bg-red-900/30' : 'bg-zinc-100 dark:bg-zinc-700'}`}>
                    {exemption.urgent ? (
                      <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5 text-zinc-600 dark:text-zinc-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-zinc-900 dark:text-white mb-1">{exemption.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{exemption.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-rose-600 rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">Need Help with Exemptions?</h3>
            <p className="text-rose-100 mb-6 max-w-2xl mx-auto">
              If you think you might qualify for a MIAM exemption, we can help you understand your options. Our AI assistant can explain the requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsChatOpen(true)}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-rose-50 text-rose-600 rounded-xl font-semibold transition-colors"
              >
                Ask Miam About Exemptions
              </button>
              <Link href="/miam/exemptions" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-rose-700 hover:bg-rose-800 text-white rounded-xl font-semibold transition-colors">
                View All Exemptions
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How Miam Helps Section */}
      <section id="how-miam-helps" className="py-20 bg-white dark:bg-zinc-900 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-600 dark:text-rose-400 font-medium text-sm uppercase tracking-wider">Your Preparation Partner</span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mt-2 mb-6">
              How Miam Helps You Prepare
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Going into family mediation prepared makes a real difference. Miam helps you organize your thoughts so you can focus on what matters most - your children.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-zinc-800 dark:to-zinc-800 rounded-2xl p-8 h-full border border-rose-100 dark:border-zinc-700 group-hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 bg-rose-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mb-6 group-hover:scale-110 transition-transform">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{step.description}</p>
                </div>
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 text-rose-300 dark:text-zinc-700 z-10">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold text-lg transition-colors shadow-lg hover:shadow-xl"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Start Preparing with Miam
            </button>
          </div>
        </div>
      </section>

      {/* Topics We Cover */}
      <section id="topics" className="py-20 bg-zinc-50 dark:bg-zinc-950 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-rose-600 dark:text-rose-400 font-medium text-sm uppercase tracking-wider">Comprehensive Support</span>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mt-2 mb-6">
                Topics We Help You Think Through
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
                Family mediation UK covers many aspects of parenting after separation or divorce. Miam helps you consider each area and identify your priorities before your MIAM meeting.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {TOPIC_AREAS.map((topic, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-zinc-800 rounded-xl">
                    <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-zinc-900 dark:text-white text-sm">{topic.title}</h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{topic.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMAGES.family}
                alt="Parent and child - family mediation focuses on children's wellbeing"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-700">
                <p className="text-zinc-900 dark:text-white font-semibold">&quot;Child-focused approach&quot;</p>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">Everything centres on your children&apos;s wellbeing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MIAM Cost Section */}
      <section id="miam-cost" className="py-20 bg-white dark:bg-zinc-900 scroll-mt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-rose-600 dark:text-rose-400 font-medium text-sm uppercase tracking-wider">Affordable Options</span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mt-2 mb-6">
              How Much Does a MIAM Cost?
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Understanding the costs involved helps you plan ahead. There are options to reduce or eliminate costs for eligible families.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-700">
              <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">£90-150</div>
              <div className="text-zinc-600 dark:text-zinc-400 mb-4">Standard MIAM Fee</div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Typical cost per person for a single MIAM session with an accredited mediator.</p>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-8 border border-emerald-200 dark:border-emerald-800">
              <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">Free</div>
              <div className="text-zinc-600 dark:text-zinc-400 mb-4">With Legal Aid</div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">If you qualify for legal aid, your MIAM and mediation may be completely free.</p>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-2xl p-8 border border-amber-200 dark:border-amber-800">
              <div className="text-4xl font-bold text-amber-600 dark:text-amber-400 mb-2">£500</div>
              <div className="text-zinc-600 dark:text-zinc-400 mb-4">Voucher Scheme</div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">The Family Mediation Voucher Scheme provides up to £500 towards mediation costs.</p>
            </div>
          </div>

          <div className="bg-rose-50 dark:bg-rose-900/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">MIAM.quest Preparation is Always Free</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto">
              Our AI preparation assistant costs nothing. We help you get ready for your MIAM at no charge - you only pay when you meet with a real mediator.
            </p>
            <Link href="/mediation/cost" className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold">
              Learn more about mediation costs
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Guide Section */}
      <section id="video-guide" className="py-20 bg-zinc-50 dark:bg-zinc-950 scroll-mt-32">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-rose-600 dark:text-rose-400 font-medium text-sm uppercase tracking-wider">Visual Guide</span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mt-2 mb-6">
              Watch: Understanding the MIAM Process
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Learn what to expect from a MIAM and how family mediation works in England and Wales.
            </p>
          </div>
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-zinc-900">
            <iframe
              src="https://www.youtube.com/embed/715gjNV5ffE"
              title="What is a MIAM? - Mediation Information Assessment Meeting Explained"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </div>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6">
            This video explains the MIAM process and what happens during a mediation information assessment meeting.
          </p>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-12 bg-amber-50 dark:bg-amber-900/20 border-y border-amber-200 dark:border-amber-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
              <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-3">Important to Know</h3>
          <p className="text-amber-800 dark:text-amber-200 max-w-2xl mx-auto">
            Miam is an AI assistant that helps you prepare for family mediation. She cannot provide legal advice
            and cannot issue <Link href="/miam/certificate" className="underline hover:no-underline font-medium">MIAM certificates</Link>. Only <a href="https://www.familymediationcouncil.org.uk/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">FMC-accredited human mediators</a> can
            issue the certificates required for court. If you&apos;re experiencing domestic abuse, you may
            qualify for a <Link href="/miam/exemptions" className="underline hover:no-underline font-medium">MIAM exemption</Link>.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="py-20 bg-white dark:bg-zinc-900 scroll-mt-32">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-rose-600 dark:text-rose-400 font-medium text-sm uppercase tracking-wider">Got Questions?</span>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mt-2 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Find answers to common questions about MIAMs, certificates, and the mediation process.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <details key={index} className="group bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="font-semibold text-zinc-900 dark:text-white pr-4 text-left">{faq.question}</h3>
                  <div className="w-8 h-8 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-open:rotate-180 transition-transform">
                    <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">Still have questions?</p>
            <button
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold transition-colors"
            >
              Ask Miam Anything
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-rose-600 via-rose-700 to-pink-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Preparing for Your MIAM?
          </h2>
          <p className="text-xl text-rose-100 mb-8 max-w-2xl mx-auto">
            Talk to Miam now and take the first step toward a smoother, less stressful mediation experience. It&apos;s free, confidential, and available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setIsChatOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-rose-50 text-rose-700 rounded-xl font-semibold text-lg transition-all shadow-lg"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat with Miam Now
            </button>
            <Link
              href="/mediators"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-rose-800 hover:bg-rose-900 text-white rounded-xl font-semibold text-lg transition-all"
            >
              Find a Mediator
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6 text-center">
            Helpful Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link href="/miam/what-is-a-miam" className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-full text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-700 transition-colors text-sm font-medium">What is a MIAM?</Link>
            <Link href="/miam/certificate" className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-full text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-700 transition-colors text-sm font-medium">MIAM Certificate</Link>
            <Link href="/miam/exemptions" className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-full text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-700 transition-colors text-sm font-medium">MIAM Exemptions</Link>
            <Link href="/forms/c100" className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-full text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-700 transition-colors text-sm font-medium">C100 Form Guide</Link>
            <Link href="/mediation/cost" className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-full text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-700 transition-colors text-sm font-medium">Mediation Costs</Link>
            <Link href="/mediators" className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-full text-rose-600 hover:bg-rose-50 dark:hover:bg-zinc-700 transition-colors text-sm font-medium">Find a Mediator</Link>
          </div>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            If you or your family are considering moving as part of your separation, our partners at <a href="https://relocation.quest" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:underline">Relocation Quest</a> provide AI-powered relocation advice for international and domestic moves.
          </p>
        </div>
      </section>

      {/* Floating Voice Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <VoiceInput
          onMessage={handleVoiceMessage}
          userName={user?.name || user?.email?.split("@")[0]}
          userId={user?.id}
          userEmail={user?.email}
        />
      </div>

      {/* Floating Chat Button (when sidebar closed) */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-24 z-40 w-14 h-14 bg-rose-600 hover:bg-rose-700 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          title="Chat with Miam"
          aria-label="Chat with Miam"
        >
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* CopilotKit Sidebar */}
      <CopilotSidebar
        instructions={HOME_PROMPT}
        labels={{
          title: "Chat with Miam",
          initial: "Hello! I'm Miam, your mediation preparation assistant. I'm here to help you understand the MIAM process and prepare for mediation. How can I help you today?",
          placeholder: "Ask about MIAMs, certificates, exemptions, or share your situation...",
        }}
        defaultOpen={isChatOpen}
        onSetOpen={setIsChatOpen}
        clickOutsideToClose={true}
      />
    </div>
  );
}
