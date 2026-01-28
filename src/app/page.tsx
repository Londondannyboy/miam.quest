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

// Unsplash images - warm, friendly, professional
// Optimized: using smaller widths and lower quality for faster loading
const IMAGES = {
  // Hero & general - hero needs full width, others optimized
  hero: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1920&q=75&auto=format",
  consultation: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=640&q=75&auto=format",
  family: "https://images.unsplash.com/photo-1491013516836-7db643ee125a?w=800&q=75&auto=format",
  support: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=75&auto=format",
  documents: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&q=75&auto=format",
  meeting: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=75&auto=format",
  couple: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&q=75&auto=format",
  child: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=640&q=75&auto=format",
  office: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=75&auto=format",

  // Key facts cards - smaller thumbnails
  clock: "https://images.unsplash.com/photo-1501139083538-0139583c060f?w=640&q=75&auto=format",
  money: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=640&q=75&auto=format",
  courthouse: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=640&q=75&auto=format",

  // Who needs MIAM - smaller thumbnails
  coupleTalking: "https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=640&q=75&auto=format",
  divorce: "https://images.unsplash.com/photo-1516585427167-9f4af9627e6c?w=640&q=75&auto=format",
  grandparents: "https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?w=640&q=75&auto=format",
  legal: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=640&q=75&auto=format",

  // Exemptions & Cost
  helpSupport: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&q=75&auto=format",
  calculator: "https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&q=75&auto=format",
  piggyBank: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&q=75&auto=format",
};

// Expanded FAQ data targeting ranking keywords
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
    answer: "A MIAM typically costs £100-£150 per person for a single session. However, you may qualify for free mediation through legal aid if you're on a low income or receive certain benefits. The Family Mediation Voucher Scheme also provides up to £500 towards mediation costs for eligible families."
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
    question: "Is using Miam Certificate Quest free?",
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
    title: "Start Chatting",
    description: "Have a warm, supportive conversation about your situation. Our AI will help you understand the process and what to expect.",
    color: "rose"
  },
  {
    number: "2",
    title: "Capture Your Position",
    description: "Identify your must-haves, priorities, and boundaries. Miam helps you organize your thoughts clearly and confidently.",
    color: "amber"
  },
  {
    number: "3",
    title: "Get Your Summary",
    description: "Receive a personalized preparation document that helps you and your mediator focus on what matters most to you.",
    color: "emerald"
  },
  {
    number: "4",
    title: "Find a Mediator",
    description: "Connect with an FMC-accredited mediator to get your official MIAM certificate and start your mediation journey.",
    color: "blue"
  }
];

// Topic areas with icons
const TOPIC_AREAS = [
  { title: "Living Arrangements", desc: "Where children live and their daily routine", icon: "🏠" },
  { title: "School & Education", desc: "School choices and educational decisions", icon: "📚" },
  { title: "Holidays & Occasions", desc: "Christmas, birthdays, school holidays", icon: "🎄" },
  { title: "Communication", desc: "How parents share information effectively", icon: "💬" },
  { title: "Decision Making", desc: "Who decides what about the children", icon: "⚖️" },
  { title: "Financial Support", desc: "Child maintenance and shared costs", icon: "💷" }
];

// Who needs a MIAM data
const WHO_NEEDS_MIAM = [
  { title: "Separating Parents", desc: "Parents who need to agree on child arrangements after separation", icon: "👨‍👩‍👧" },
  { title: "Divorcing Couples", desc: "Couples going through divorce who have children together", icon: "💔" },
  { title: "Grandparents", desc: "Grandparents seeking contact or custody arrangements", icon: "👴" },
  { title: "Anyone Applying to Court", desc: "Anyone planning to submit a C100 form for child arrangements", icon: "⚖️" }
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
  { number: "70%", label: "of mediations reach agreement", icon: "✓" },
  { number: "£500", label: "voucher available for eligible families", icon: "💷" },
  { number: "8-12", label: "weeks average mediation timeline", icon: "📅" },
  { number: "Free", label: "preparation with Miam AI", icon: "🤖" }
];

// About Us - Authentic content
const ABOUT_US = {
  title: "We're a New AI Startup",
  subtitle: "Honest About Who We Are",
  description: "Miam Certificate Quest was created to help people navigate the stressful process of family mediation. We're a small team building AI tools to make legal processes more accessible.",
  points: [
    "We launched in Q1 2026 - we're new and continuously improving",
    "Our AI helps you prepare, but can't replace human mediators",
    "We don't charge for our preparation service",
    "We're transparent about what we can and cannot do"
  ]
};

// Benefits
const BENEFITS = [
  { title: "24/7 Availability", desc: "Chat with Miam anytime, day or night", icon: "🌙" },
  { title: "Completely Free", desc: "No hidden costs or subscriptions", icon: "💚" },
  { title: "Confidential", desc: "Your conversations are private and secure", icon: "🔒" },
  { title: "Child-Focused", desc: "Everything centres on your children's wellbeing", icon: "❤️" },
  { title: "UK Family Law", desc: "Tailored to England & Wales regulations", icon: "🇬🇧" },
  { title: "Voice or Chat", desc: "Communicate however feels comfortable", icon: "🎤" }
];

// Table of contents sections
const TOC_SECTIONS = [
  { id: "what-is-miam", label: "What is a MIAM?" },
  { id: "who-needs-miam", label: "Who Needs a MIAM?" },
  { id: "miam-certificate", label: "MIAM Certificate" },
  { id: "how-we-help", label: "How We Help" },
  { id: "miam-exemptions", label: "Exemptions" },
  { id: "miam-cost", label: "Costs" },
  { id: "about-us", label: "About Us" },
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
// HowTo Schema for "How to Get a MIAM Certificate"
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get a MIAM Certificate in England & Wales",
  "description": "Step-by-step guide to obtaining your MIAM certificate for family court proceedings",
  "totalTime": "PT2H",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "GBP",
    "value": "100-150"
  },
  "step": [
    {
      "@type": "HowToStep",
      "name": "Check if you qualify for an exemption",
      "text": "Before booking a MIAM, check if you're exempt due to domestic abuse, urgency, or other qualifying circumstances.",
      "position": 1
    },
    {
      "@type": "HowToStep",
      "name": "Find an FMC-accredited mediator",
      "text": "Search for a Family Mediation Council accredited mediator in your area or one offering remote sessions.",
      "position": 2
    },
    {
      "@type": "HowToStep",
      "name": "Book your MIAM appointment",
      "text": "Contact the mediator to book your MIAM. Sessions typically last 45-60 minutes and cost £100-£150 (or free with legal aid).",
      "position": 3
    },
    {
      "@type": "HowToStep",
      "name": "Attend the MIAM meeting",
      "text": "Meet with the mediator who will explain mediation, assess suitability, and discuss your options.",
      "position": 4
    },
    {
      "@type": "HowToStep",
      "name": "Receive your MIAM certificate",
      "text": "After the meeting, the mediator will sign your FM1 form, providing the MIAM certificate valid for 4 months.",
      "position": 5
    }
  ]
};

const videoSchema = {
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "What is a MIAM? - Mediation Information Assessment Meeting Explained",
  "description": "Learn what a MIAM (Mediation Information Assessment Meeting) is, why it's required before family court in England and Wales, and how to prepare for your meeting with an accredited mediator.",
  "thumbnailUrl": "https://img.youtube.com/vi/715gjNV5ffE/maxresdefault.jpg",
  "uploadDate": "2026-01-01",
  "contentUrl": "https://www.youtube.com/watch?v=715gjNV5ffE",
  "embedUrl": "https://www.youtube.com/embed/715gjNV5ffE",
  "publisher": {
    "@type": "Organization",
    "name": "Miam Certificate Quest",
    "url": "https://miam.quest"
  }
};

export default function HomePage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatKey, setChatKey] = useState(0);

  // Open chat by forcing re-mount with new key
  const openChat = useCallback(() => {
    setChatKey(prev => prev + 1);
    setIsChatOpen(true);
  }, []);

  const handleVoiceMessage = useCallback((text: string, role?: "user" | "assistant") => {
    console.log(`[Voice] ${role}: ${text.slice(0, 50)}...`);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(videoSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* ========== HERO SECTION ========== */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={IMAGES.hero}
            alt="Supportive family mediation consultation for MIAM certificate preparation"
            title="MIAM certificate preparation - family mediation consultation"
            fill
            className="object-cover object-center"
            priority
            fetchPriority="high"
            quality={75}
            sizes="100vw"
          />
          {/* Warm gradient overlay - less opaque to show image */}
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/70 via-rose-800/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-rose-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-sm font-medium mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
              </span>
              Free AI-Powered Mediation Preparation
            </div>

            {/* Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Get Your{" "}
              <span className="bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">MIAM Certificate</span>{" "}
              with Confidence
            </h1>

            {/* Subheading */}
            <p className="text-xl sm:text-2xl text-white/90 mb-4 leading-relaxed">
              Meet <strong className="text-white">Miam</strong> — your compassionate AI assistant for family mediation preparation in England & Wales.
            </p>
            <p className="text-lg text-white/70 mb-8">
              We help you understand the process, organize your priorities, and feel ready for your mediation journey.
            </p>

            {/* Voice Widget with Instructions */}
            <div className="mb-8 flex items-center gap-4">
              <VoiceInput
                onMessage={handleVoiceMessage}
                userName={user?.name || user?.email?.split("@")[0]}
                userId={user?.id}
                userEmail={user?.email}
              />
              <div className="text-white/80 text-sm max-w-xs">
                <p className="font-semibold text-white mb-1">Talk to Miam</p>
                <p>Click the microphone to speak. Ask about MIAM certificates, exemptions, costs, or anything about mediation.</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={openChat}
                className="group inline-flex items-center justify-center gap-3 px-8 py-5 bg-white hover:bg-rose-50 text-rose-700 rounded-2xl font-bold text-lg transition-all shadow-2xl shadow-rose-900/20 hover:shadow-rose-900/30 hover:scale-[1.02]"
              >
                <span className="w-10 h-10 bg-rose-100 rounded-xl flex items-center justify-center group-hover:bg-rose-200 transition-colors">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </span>
                Chat with Miam — It&apos;s Free
              </button>

              <Link
                href="/what-is-a-miam"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 bg-white/10 backdrop-blur-md border border-white/30 hover:bg-white/20 hover:border-white/50 text-white rounded-2xl font-semibold text-lg transition-all"
              >
                Learn About MIAMs
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 text-white/80 text-sm">
              {["100% Free", "Voice or Chat", "Confidential", "UK Family Law"].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* ========== STICKY NAV ========== */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex overflow-x-auto gap-1 py-3 scrollbar-hide">
            {TOC_SECTIONS.map((section) => (
              <li key={section.id} className="flex-shrink-0">
                <a
                  href={`#${section.id}`}
                  className="px-4 py-2 rounded-full text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all whitespace-nowrap"
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ========== STATS SECTION ========== */}
      <section className="py-16 bg-gradient-to-b from-rose-50 to-white dark:from-zinc-900 dark:to-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 text-center shadow-sm hover:shadow-xl transition-all border border-zinc-100 dark:border-zinc-700 group-hover:border-rose-200 dark:group-hover:border-rose-800">
                  <div className="text-4xl mb-3">{stat.icon}</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent mb-2">{stat.number}</div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHAT IS MIAM SECTION ========== */}
      <section id="what-is-miam" className="py-24 scroll-mt-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-full text-sm font-medium mb-4">
                Understanding MIAMs
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
                What is a{" "}
                <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">MIAM</span>{" "}
                &amp; MIAM Certificate?
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  A <strong className="text-zinc-900 dark:text-white">MIAM</strong> (Mediation Information Assessment Meeting) is a mandatory meeting
                  with an <a href="https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 underline decoration-rose-200 hover:decoration-rose-400 underline-offset-2">FMC-accredited family mediator</a> that you must attend before applying to family court in England and Wales. After attending, you&apos;ll receive a <strong className="text-zinc-900 dark:text-white">MIAM certificate</strong> which is required for your court application.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  According to the <a href="https://www.nfm.org.uk/about-family-mediation-services/what-is-a-miam/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 underline decoration-rose-200 hover:decoration-rose-400 underline-offset-2">National Family Mediation</a>, during this 45-60 minute meeting, the mediator will explain how mediation works, assess whether it&apos;s suitable for your situation, and discuss your options including court alternatives.
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Under the <a href="https://www.gov.uk/looking-after-children-divorce" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 underline decoration-rose-200 hover:decoration-rose-400 underline-offset-2">Children and Families Act 2014</a>,
                  you must attend a MIAM or qualify for an <Link href="/miam-exemptions" className="text-rose-600 hover:text-rose-700 underline decoration-rose-200 hover:decoration-rose-400 underline-offset-2">exemption</Link> before
                  submitting a <Link href="/c100-form" className="text-rose-600 hover:text-rose-700 underline decoration-rose-200 hover:decoration-rose-400 underline-offset-2">C100 form</Link> (see the official <a href="https://assets.publishing.service.gov.uk/media/6628df55db4b9f0448a7e58e/FM1_0424.pdf" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 underline decoration-rose-200 hover:decoration-rose-400 underline-offset-2">FM1 form</a>).
                </p>
              </div>

              <Link href="/what-is-a-miam" className="inline-flex items-center gap-2 mt-8 text-rose-600 hover:text-rose-700 font-semibold group">
                Learn more about MIAMs
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            {/* Image with overlays */}
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-rose-200/50 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-amber-200/50 rounded-full blur-3xl" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={IMAGES.consultation}
                  alt="Family mediation consultation - parents discussing child arrangements with a professional mediator"
                  title="MIAM certificate consultation with family mediator"
                  width={600}
                  height={450}
                  className="object-cover w-full"
                  sizes="(max-width: 768px) 100vw, 600px"
                  loading="lazy"
                />
              </div>

              {/* Floating cards */}
              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-800 p-5 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-zinc-900 dark:text-white">45-60</div>
                    <div className="text-sm text-zinc-500">minutes per session</div>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-rose-500 to-pink-600 text-white p-5 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">£100-£150</div>
                <div className="text-sm text-rose-100">typical cost</div>
              </div>
            </div>
          </div>

          {/* Key facts grid with images */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[
              {
                image: IMAGES.clock,
                title: "Single Session",
                desc: "A MIAM is one meeting lasting 45-60 minutes where a mediator explains the process and assesses your situation.",
                color: "rose"
              },
              {
                image: IMAGES.money,
                title: "Affordable Options",
                desc: "Typical fee is £100-£150. May be free with legal aid or the Family Mediation Voucher Scheme (£500 available).",
                color: "amber"
              },
              {
                image: IMAGES.courthouse,
                title: "Required for Court",
                desc: "You need a MIAM certificate or valid exemption before submitting a C100 form to family court.",
                color: "emerald"
              }
            ].map((item, index) => (
              <div key={index} className="group relative overflow-hidden rounded-3xl shadow-lg hover:shadow-2xl transition-all">
                {/* Background image */}
                <div className="absolute inset-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-${item.color}-900/90 via-${item.color}-900/60 to-${item.color}-900/30`} />
                </div>
                {/* Content */}
                <div className="relative p-8 min-h-[280px] flex flex-col justify-end">
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/90">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHO NEEDS MIAM - with background image ========== */}
      <section id="who-needs-miam" className="py-24 scroll-mt-20 relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={IMAGES.support}
            alt="Supportive family conversation"
            fill
            className="object-cover opacity-10 dark:opacity-5"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-50/95 via-zinc-50/98 to-zinc-50 dark:from-zinc-900/95 dark:via-zinc-900/98 dark:to-zinc-900" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-full text-sm font-medium mb-4">
              Is This For You?
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Who Needs a MIAM?
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Most people applying to family court for child arrangements must attend a MIAM first. Here&apos;s who typically needs one.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { ...WHO_NEEDS_MIAM[0], image: IMAGES.coupleTalking },
              { ...WHO_NEEDS_MIAM[1], image: IMAGES.divorce },
              { ...WHO_NEEDS_MIAM[2], image: IMAGES.grandparents },
              { ...WHO_NEEDS_MIAM[3], image: IMAGES.legal },
            ].map((item, index) => (
              <div key={index} className="group">
                <div className="bg-white dark:bg-zinc-800 rounded-3xl overflow-hidden h-full shadow-sm hover:shadow-xl transition-all border border-zinc-100 dark:border-zinc-700 hover:border-rose-200 dark:hover:border-rose-800 group-hover:-translate-y-1">
                  {/* Image thumbnail */}
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-3xl">{item.icon}</div>
                  </div>
                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">Not sure if you need a MIAM? You might qualify for an exemption.</p>
            <Link href="/miam-exemptions" className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-xl text-rose-600 font-semibold hover:border-rose-300 dark:hover:border-rose-700 transition-colors">
              Check MIAM exemptions
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== MIAM CERTIFICATE SECTION ========== */}
      <section id="miam-certificate" className="py-24 scroll-mt-20 bg-white dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image side */}
            <div className="relative order-2 lg:order-1">
              <div className="absolute -top-8 -right-8 w-72 h-72 bg-emerald-200/40 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={IMAGES.documents}
                  alt="MIAM certificate and legal documents for family court"
                  title="MIAM certificate documents for court application"
                  width={600}
                  height={450}
                  className="object-cover w-full"
                  loading="lazy"
                />
              </div>

              <div className="absolute -top-6 -right-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-5 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">4 months</div>
                <div className="text-sm text-emerald-100">certificate validity</div>
              </div>
            </div>

            {/* Content side */}
            <div className="order-1 lg:order-2">
              <span className="inline-block px-4 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-4">
                Required Document
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
                What is a{" "}
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">MIAM Certificate</span>?
              </h2>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  A <strong className="text-zinc-900 dark:text-white">MIAM certificate</strong> is the official document you receive after attending your Mediation Information Assessment Meeting. According to <a href="https://www.burnetts.co.uk/legal-news/family-law-faqs-what-is-a-miam-do-i-need-to-attend-one/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 underline underline-offset-2">Burnetts Solicitors</a>, you cannot submit a C100 form to family court without it (unless you have an exemption).
                </p>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
                  The <a href="https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 underline underline-offset-2">Family Mediation Council</a> confirms that only FMC-accredited mediators can sign court forms, and your certificate remains valid for four months.
                </p>
              </div>

              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 mt-6">
                <div className="flex gap-4">
                  <div className="text-3xl">💡</div>
                  <div>
                    <p className="font-bold text-amber-900 dark:text-amber-100 mb-1">Important</p>
                    <p className="text-amber-800 dark:text-amber-200 text-sm">
                      Miam Certificate Quest helps you prepare for your MIAM, but only human mediators can issue the certificate. We make the process easier, not replace it.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/miam-certificate" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-emerald-600/20 hover:shadow-emerald-600/30">
                Learn about MIAM certificates
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== HOW WE HELP SECTION ========== */}
      <section id="how-we-help" className="py-24 scroll-mt-20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-gradient-to-b from-rose-50 via-white to-rose-50 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-900" />
        <div className="absolute inset-0 opacity-50" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(251 113 133 / 0.15) 1px, transparent 0)', backgroundSize: '40px 40px' }} />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-full text-sm font-medium mb-4">
              Your Preparation Partner
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              How We Help You Prepare
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Going into family mediation prepared makes a real difference. Miam helps you organize your thoughts so you can focus on what matters most — your children.
            </p>
          </div>

          {/* Process steps */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="relative group">
                <div className="bg-white dark:bg-zinc-800 rounded-3xl p-8 h-full shadow-sm hover:shadow-xl transition-all border border-zinc-100 dark:border-zinc-700 group-hover:border-rose-200 dark:group-hover:border-rose-800 group-hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${step.color}-500 to-${step.color}-600 rounded-2xl flex items-center justify-center text-white font-bold text-2xl mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{step.description}</p>
                </div>

                {/* Connector line */}
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 text-rose-300 dark:text-zinc-700">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Benefits grid */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white text-center mb-10">Why Choose Us?</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {BENEFITS.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700">
                  <div className="text-3xl">{benefit.icon}</div>
                  <div>
                    <h4 className="font-bold text-zinc-900 dark:text-white mb-1">{benefit.title}</h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <button
              onClick={openChat}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-2xl font-bold text-lg transition-all shadow-xl shadow-rose-600/20 hover:shadow-rose-600/30 hover:scale-[1.02]"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Start Preparing with Miam
            </button>
          </div>
        </div>
      </section>

      {/* ========== TOPICS SECTION with Image ========== */}
      <section className="py-24 bg-white dark:bg-zinc-950 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-medium mb-4">
                Comprehensive Support
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                Topics We Help You Think Through
              </h2>
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-10">
                Family mediation covers many aspects of parenting after separation. Miam helps you consider each area and identify your priorities.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {TOPIC_AREAS.map((topic, index) => (
                  <div key={index} className="flex items-start gap-4 p-5 bg-zinc-50 dark:bg-zinc-800 rounded-2xl hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors group">
                    <div className="text-3xl">{topic.icon}</div>
                    <div>
                      <h3 className="font-bold text-zinc-900 dark:text-white mb-1">{topic.title}</h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">{topic.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Image with decorative elements */}
            <div className="relative">
              <div className="absolute -top-8 -left-8 w-72 h-72 bg-purple-200/40 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -right-8 w-72 h-72 bg-pink-200/40 rounded-full blur-3xl" />

              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={IMAGES.family}
                  alt="Parent and child - family mediation focuses on children's wellbeing"
                  width={600}
                  height={450}
                  className="object-cover w-full"
                  loading="lazy"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white dark:bg-zinc-800 p-6 rounded-2xl shadow-xl border border-zinc-100 dark:border-zinc-700">
                <div className="flex items-center gap-3">
                  <div className="text-3xl">❤️</div>
                  <div>
                    <div className="font-bold text-zinc-900 dark:text-white">Child-focused approach</div>
                    <div className="text-sm text-zinc-500">Everything centres on their wellbeing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== MIAM EXEMPTIONS SECTION ========== */}
      <section id="miam-exemptions" className="py-24 scroll-mt-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950" />

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-sm font-medium mb-4">
              Skip the MIAM?
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              MIAM Exemptions
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              In certain circumstances, you may be exempt from attending a MIAM. These exemptions protect vulnerable individuals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {MIAM_EXEMPTIONS.map((exemption, index) => (
              <div key={index} className={`bg-white dark:bg-zinc-800 rounded-2xl p-6 border-2 ${exemption.urgent ? 'border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-900/10' : 'border-zinc-100 dark:border-zinc-700'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${exemption.urgent ? 'bg-red-100 dark:bg-red-900/30' : 'bg-zinc-100 dark:bg-zinc-700'}`}>
                    {exemption.urgent ? (
                      <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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

          {/* CTA Banner with hero image */}
          <div className="rounded-3xl overflow-hidden relative">
            {/* Background image */}
            <div className="absolute inset-0">
              <Image
                src={IMAGES.helpSupport}
                alt="Supportive hands - help with MIAM exemptions"
                fill
                className="object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 via-pink-800/85 to-rose-900/90" />
            </div>
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2 blur-3xl" />
            </div>
            {/* Content */}
            <div className="relative p-10 md:p-14 text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Need Help with Exemptions?</h3>
              <p className="text-rose-100 mb-8 max-w-2xl mx-auto text-lg">
                If you think you might qualify for a MIAM exemption, we can help you understand your options. Our AI assistant can explain the requirements.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openChat}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-rose-50 text-rose-600 rounded-xl font-bold transition-all shadow-lg"
                >
                  Ask Miam About Exemptions
                </button>
                <Link href="/miam-exemptions" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold transition-all border border-white/30">
                  View All Exemptions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== COST SECTION with hero background ========== */}
      <section id="miam-cost" className="py-24 scroll-mt-20 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={IMAGES.piggyBank}
            alt="Savings and costs for family mediation"
            fill
            className="object-cover opacity-10 dark:opacity-5"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/98 to-white dark:from-zinc-950/95 dark:via-zinc-950/98 dark:to-zinc-950" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium mb-4">
              Affordable Options
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              How Much Does a MIAM Cost?
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Understanding the costs helps you plan ahead. There are options to reduce or eliminate costs for eligible families.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              {
                price: "£100-£150",
                title: "Standard MIAM Fee",
                desc: "Typical cost per person for a single MIAM session with an accredited mediator.",
                gradient: "from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-900",
                priceColor: "text-zinc-900 dark:text-white"
              },
              {
                price: "Free",
                title: "With Legal Aid",
                desc: "If you qualify for legal aid, your MIAM and mediation may be completely free.",
                gradient: "from-emerald-100 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/20",
                priceColor: "text-emerald-600 dark:text-emerald-400",
                featured: true
              },
              {
                price: "£500",
                title: "Voucher Scheme",
                desc: "The Family Mediation Voucher Scheme provides up to £500 towards mediation costs.",
                gradient: "from-amber-100 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/20",
                priceColor: "text-amber-600 dark:text-amber-400"
              }
            ].map((item, index) => (
              <div key={index} className={`relative bg-gradient-to-br ${item.gradient} rounded-3xl p-8 border ${item.featured ? 'border-emerald-300 dark:border-emerald-700 shadow-xl shadow-emerald-100 dark:shadow-emerald-900/20' : 'border-zinc-200 dark:border-zinc-700'}`}>
                {item.featured && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-600 text-white text-sm font-medium rounded-full">
                    Most Popular
                  </div>
                )}
                <div className={`text-5xl font-bold ${item.priceColor} mb-2`}>{item.price}</div>
                <div className="text-lg font-semibold text-zinc-900 dark:text-white mb-3">{item.title}</div>
                <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-3xl p-10 text-center border border-rose-100 dark:border-rose-800">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Our Preparation Service is Always Free</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6 max-w-2xl mx-auto text-lg">
              Our AI preparation assistant costs nothing. We help you get ready for your MIAM at no charge — you only pay when you meet with a real mediator.
            </p>
            <Link href="/mediation-cost" className="inline-flex items-center gap-2 text-rose-600 hover:text-rose-700 font-semibold text-lg">
              Learn more about mediation costs
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== ABOUT US SECTION - Honest & Authentic ========== */}
      <section id="about-us" className="py-24 scroll-mt-20 relative overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src={IMAGES.office}
            alt="Modern office workspace"
            fill
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-900/95 via-zinc-900/90 to-zinc-900/80" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <div>
              <span className="inline-block px-4 py-1 bg-white/10 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-4 border border-white/20">
                {ABOUT_US.subtitle}
              </span>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                {ABOUT_US.title}
              </h2>
              <p className="text-xl text-zinc-300 mb-8 leading-relaxed">
                {ABOUT_US.description}
              </p>

              <ul className="space-y-4 mb-8">
                {ABOUT_US.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-rose-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-4 h-4 text-rose-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-zinc-300">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={openChat}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-rose-50 text-rose-700 rounded-xl font-semibold transition-all"
                >
                  Try Miam Free
                </button>
                <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold transition-all border border-white/20">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Honest values cards */}
            <div className="grid gap-6">
              {[
                {
                  icon: "🤖",
                  title: "AI-Powered, Human-Focused",
                  desc: "Our AI helps you prepare, but we always recommend working with accredited human mediators for your actual MIAM."
                },
                {
                  icon: "🆓",
                  title: "Free & No Hidden Costs",
                  desc: "Our preparation service is completely free. We believe everyone deserves access to support during difficult times."
                },
                {
                  icon: "🔒",
                  title: "Privacy First",
                  desc: "Your conversations are private. We don't sell your data or share it with third parties."
                },
                {
                  icon: "📈",
                  title: "Always Improving",
                  desc: "We're a new startup, continuously learning and improving our service based on feedback."
                }
              ].map((item, index) => (
                <div key={index} className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{item.icon}</div>
                    <div>
                      <h3 className="font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-sm text-zinc-400">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========== VIDEO SECTION ========== */}
      <section className="py-24 bg-white dark:bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
              Visual Guide
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Video: Learn About the Process
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Learn what to expect from a MIAM and how family mediation works in England and Wales.
            </p>
          </div>
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl bg-zinc-900">
            <iframe
              src="https://www.youtube.com/embed/715gjNV5ffE"
              title="What is a MIAM? - Mediation Information Assessment Meeting Explained"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* ========== DISCLAIMER ========== */}
      <section className="py-12 bg-amber-50 dark:bg-amber-900/20 border-y border-amber-200 dark:border-amber-800">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-14 h-14 bg-amber-100 dark:bg-amber-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
              <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">Important to Know</h3>
              <p className="text-amber-800 dark:text-amber-200">
                Miam is an AI assistant that helps you prepare for family mediation. She cannot provide legal advice
                and cannot issue <Link href="/miam-certificate" className="underline hover:no-underline font-medium">MIAM certificates</Link>. Only <a href="https://www.familymediationcouncil.org.uk/" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline font-medium">FMC-accredited human mediators</a> can
                issue the certificates required for court. If you&apos;re experiencing domestic abuse, you may
                qualify for a <Link href="/miam-exemptions" className="underline hover:no-underline font-medium">MIAM exemption</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== OFFICIAL RESOURCES SECTION ========== */}
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
              Authoritative Sources
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Official Resources
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              We recommend these trusted, authoritative sources for official information about MIAMs and MIAM certificates in England &amp; Wales.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="https://www.familymediationcouncil.org.uk/family-mediation/assessment-meeting-miam/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-rose-300 dark:hover:border-rose-700 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🏛️</span>
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-rose-600 transition-colors">Family Mediation Council</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">The official body for family mediation standards. Information on MIAMs, accredited mediators, and certification.</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.nfm.org.uk/about-family-mediation-services/what-is-a-miam/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-rose-300 dark:hover:border-rose-700 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">🤝</span>
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-rose-600 transition-colors">National Family Mediation</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Charity providing family mediation services. Helpful guidance on MIAM process, costs, and legal aid eligibility.</p>
                </div>
              </div>
            </a>

            <a
              href="https://assets.publishing.service.gov.uk/media/6628df55db4b9f0448a7e58e/FM1_0424.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-rose-300 dark:hover:border-rose-700 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">📄</span>
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-rose-600 transition-colors">Official FM1 Form (Gov.uk)</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">The official government MIAM form (FM1) that mediators complete. Download the latest version directly.</p>
                </div>
              </div>
            </a>

            <a
              href="https://www.burnetts.co.uk/legal-news/family-law-faqs-what-is-a-miam-do-i-need-to-attend-one/"
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 hover:border-rose-300 dark:hover:border-rose-700 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">⚖️</span>
                </div>
                <div>
                  <h3 className="font-bold text-zinc-900 dark:text-white mb-1 group-hover:text-rose-600 transition-colors">Burnetts Solicitors FAQ</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Legal FAQ from established UK solicitors explaining MIAM requirements, exemptions, and the 4-month validity period.</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* ========== FAQs SECTION ========== */}
      <section id="faqs" className="py-24 scroll-mt-20 bg-zinc-50 dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 rounded-full text-sm font-medium mb-4">
              Got Questions?
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400">
              Find answers to common questions about MIAMs, certificates, and the mediation process.
            </p>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <details key={index} className="group bg-white dark:bg-zinc-800 rounded-2xl border border-zinc-200 dark:border-zinc-700 overflow-hidden">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-zinc-50 dark:hover:bg-zinc-700/50 transition-colors">
                  <h3 className="font-semibold text-zinc-900 dark:text-white pr-4 text-left text-lg">{faq.question}</h3>
                  <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center flex-shrink-0 group-open:rotate-180 transition-transform">
                    <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">Still have questions?</p>
            <button
              onClick={openChat}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white rounded-xl font-bold transition-all shadow-lg"
            >
              Ask Miam Anything
            </button>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="py-24 relative overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={IMAGES.meeting}
            alt="Professional handshake - starting your mediation journey"
            fill
            className="object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 via-pink-800/80 to-rose-900/90" />
        </div>

        {/* Decorative blobs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-rose-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-400/20 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Get Started?
          </h2>
          <p className="text-xl sm:text-2xl text-rose-100 mb-10 max-w-2xl mx-auto">
            Talk to Miam now and take the first step toward a smoother, less stressful mediation experience. It&apos;s free, confidential, and available 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={openChat}
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-white hover:bg-rose-50 text-rose-700 rounded-2xl font-bold text-lg transition-all shadow-2xl hover:scale-[1.02]"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Chat with Miam Now
            </button>
            <Link
              href="/find-a-mediator"
              className="inline-flex items-center justify-center gap-2 px-10 py-5 bg-white/10 backdrop-blur-sm border border-white/30 hover:bg-white/20 text-white rounded-2xl font-semibold text-lg transition-all"
            >
              Find a Mediator
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== RELATED LINKS ========== */}
      <section className="py-12 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-800">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6 text-center">
            Helpful Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { href: "/miam/what-is-a-miam", label: "What is a MIAM?" },
              { href: "/miam/certificate", label: "MIAM Certificate" },
              { href: "/miam/exemptions", label: "MIAM Exemptions" },
              { href: "/forms/c100", label: "C100 Form Guide" },
              { href: "/mediation/cost", label: "Mediation Costs" },
              { href: "/mediators", label: "Find a Mediator" },
            ].map((link, i) => (
              <Link key={i} href={link.href} className="px-5 py-2.5 bg-rose-700 dark:bg-rose-800 rounded-full text-white hover:bg-rose-800 dark:hover:bg-rose-700 transition-colors text-sm font-medium">
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto">
            If you or your family are considering moving as part of your separation, our partners at <a href="https://relocation.quest" target="_blank" rel="noopener noreferrer" className="text-rose-700 dark:text-rose-400 underline underline-offset-2 hover:text-rose-800 dark:hover:text-rose-300">Relocation Quest</a> provide AI-powered relocation advice.
          </p>
        </div>
      </section>

      {/* ========== FLOATING ELEMENTS ========== */}

      {/* Chat button - bottom right (only when sidebar closed) */}
      {!isChatOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 rounded-full flex items-center justify-center shadow-xl shadow-rose-600/30 transition-all hover:scale-110"
          title="Chat with Miam"
          aria-label="Chat with Miam"
        >
          <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      )}

      {/* CopilotKit Sidebar - key forces re-mount when opening */}
      <CopilotSidebar
        key={chatKey}
        instructions={HOME_PROMPT}
        labels={{
          title: "Chat with Miam",
          initial: "Hello! I'm Miam, your mediation preparation assistant. I'm here to help you understand the MIAM process and prepare for mediation. How can I help you today?",
          placeholder: "Ask about MIAMs, certificates, exemptions...",
        }}
        defaultOpen={isChatOpen}
        onSetOpen={setIsChatOpen}
        clickOutsideToClose={true}
      />
    </div>
  );
}
