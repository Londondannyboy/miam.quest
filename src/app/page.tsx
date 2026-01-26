"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
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

// FAQ data for structured content
const FAQS = [
  {
    question: "What is a MIAM?",
    answer: "A MIAM (Mediation Information Assessment Meeting) is a mandatory meeting with an accredited family mediator that you must attend before applying to family court in England and Wales. It typically lasts 45-60 minutes and costs £90-150."
  },
  {
    question: "Do I need a MIAM before going to court?",
    answer: "Yes, in most cases. Before submitting a C100 form to apply for a child arrangements order, you must have attended a MIAM or qualify for an exemption (such as domestic abuse or urgency)."
  },
  {
    question: "Can Miam (the AI) issue a MIAM certificate?",
    answer: "No. Only FMC-accredited human mediators can issue valid MIAM certificates. Miam the AI helps you prepare for your MIAM meeting and mediation - making the process easier and more effective."
  },
  {
    question: "How much does a MIAM cost?",
    answer: "A MIAM typically costs £90-150 per person. However, if you qualify for legal aid, it may be free. There's also the Family Mediation Voucher Scheme which provides £500 towards mediation costs."
  },
  {
    question: "What exemptions allow me to skip the MIAM?",
    answer: "You may be exempt if there's evidence of domestic abuse, child protection concerns, urgency (risk of harm), the other party is overseas or in prison, you've had a MIAM in the last 4 months, or you have a disability preventing attendance."
  },
  {
    question: "Is using MIAM.quest free?",
    answer: "Yes! Preparing with Miam is completely free. We help you organize your thoughts and understand the process before your actual MIAM meeting with a human mediator."
  }
];

// Process steps
const PROCESS_STEPS = [
  {
    number: "1",
    title: "Talk to Miam",
    description: "Have a conversation about your situation. Miam will help you understand the MIAM process and what to expect."
  },
  {
    number: "2",
    title: "Capture Your Position",
    description: "Identify your must-haves, priorities, and red lines. Miam helps you organize your thoughts clearly."
  },
  {
    number: "3",
    title: "Get Your Summary",
    description: "Receive a preparation document that helps you and your mediator focus on what matters most."
  },
  {
    number: "4",
    title: "Find a Mediator",
    description: "Connect with an FMC-accredited mediator to get your official MIAM certificate."
  }
];

// Topic areas
const TOPIC_AREAS = [
  { title: "Living Arrangements", desc: "Where children live and their routine" },
  { title: "School & Education", desc: "School choices and educational decisions" },
  { title: "Holidays & Occasions", desc: "Christmas, birthdays, school holidays" },
  { title: "Communication", desc: "How parents share information" },
  { title: "Decision Making", desc: "Who decides what about the children" },
  { title: "Financial Support", desc: "Child maintenance and shared costs" }
];

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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-white dark:from-zinc-900 dark:to-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/30 rounded-full text-rose-700 dark:text-rose-300 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
              Free AI-Powered Mediation Preparation
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
              Prepare for Your{" "}
              <span className="text-rose-600 dark:text-rose-400">MIAM</span>{" "}
              with Confidence
            </h1>

            <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
              Meet <strong>Miam</strong> - your AI mediation preparation assistant.
              Understand the process, organize your priorities, and go into mediation ready.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <button
                onClick={() => setIsChatOpen(true)}
                className="inline-flex items-center gap-2 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-semibold text-lg transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Chat with Miam
              </button>

              <Link
                href="/miam/what-is-a-miam"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:border-rose-300 dark:hover:border-rose-700 text-zinc-900 dark:text-white rounded-xl font-semibold text-lg transition-all"
              >
                Learn About MIAM
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-8 text-sm text-zinc-500 dark:text-zinc-400">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free to use
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Voice or chat
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Confidential
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                UK Family Law
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is MIAM Section */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              What is a <span className="text-rose-600">MIAM</span>?
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              A <strong>MIAM</strong> (Mediation Information Assessment Meeting) is a mandatory meeting
              you must attend before applying to family court in England and Wales. It&apos;s your first
              step toward resolving family disputes without the stress and cost of court.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-6">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">45-60 Minutes</h3>
              <p className="text-zinc-600 dark:text-zinc-400">A MIAM is a single session where a mediator explains the process and assesses your situation.</p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-6">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">£90-150 Cost</h3>
              <p className="text-zinc-600 dark:text-zinc-400">Typical MIAM fee per person. May be free with legal aid or the Family Mediation Voucher Scheme.</p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-6">
              <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-xl flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">Required for Court</h3>
              <p className="text-zinc-600 dark:text-zinc-400">You need a MIAM certificate or exemption before submitting a C100 form to family court.</p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/miam/what-is-a-miam" className="text-rose-600 hover:text-rose-700 font-medium inline-flex items-center gap-1">
              Learn more about MIAMs
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* How Miam Helps Section */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              How Miam Helps You Prepare
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Going into mediation prepared makes a real difference. Miam helps you organize your thoughts
              so you can focus on what matters most - your children.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-zinc-800 rounded-2xl p-6 h-full">
                  <div className="w-10 h-10 bg-rose-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 text-sm">{step.description}</p>
                </div>
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-3 w-6 text-zinc-300 dark:text-zinc-700">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics We Cover */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4">
              Topics We Help You Think Through
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Mediation covers many aspects of parenting after separation. Miam helps you consider
              each area and identify your priorities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPIC_AREAS.map((topic, index) => (
              <div key={index} className="flex items-start gap-4 p-4 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                <div className="w-10 h-10 bg-rose-100 dark:bg-rose-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-zinc-900 dark:text-white">{topic.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">{topic.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Important Disclaimer */}
      <section className="py-12 bg-amber-50 dark:bg-amber-900/20 border-y border-amber-200 dark:border-amber-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-4">
            <svg className="w-8 h-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">Important to Know</h3>
          <p className="text-amber-800 dark:text-amber-200">
            Miam is an AI assistant that helps you prepare for mediation. She cannot provide legal advice
            and cannot issue MIAM certificates. Only <strong>FMC-accredited human mediators</strong> can
            issue the certificates required for court. If you&apos;re experiencing domestic abuse, you may
            be exempt from MIAM requirements.
          </p>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8 text-center">
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <details key={index} className="group bg-white dark:bg-zinc-800 rounded-xl">
                <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                  <h3 className="font-semibold text-zinc-900 dark:text-white pr-4">{faq.question}</h3>
                  <svg className="w-5 h-5 text-zinc-500 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 pt-0">
                  <p className="text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-rose-600 dark:bg-rose-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Start Preparing?
          </h2>
          <p className="text-xl text-rose-100 mb-8">
            Talk to Miam now and take the first step toward a smoother mediation experience.
          </p>
          <button
            onClick={() => setIsChatOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-rose-50 text-rose-600 rounded-xl font-semibold text-lg transition-all shadow-lg"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            Talk to Miam
          </button>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-6 text-center">
            Helpful Resources
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/miam/what-is-a-miam" className="text-rose-600 hover:text-rose-700 hover:underline">What is a MIAM?</Link>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <Link href="/miam/certificate" className="text-rose-600 hover:text-rose-700 hover:underline">MIAM Certificate</Link>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <Link href="/miam/exemptions" className="text-rose-600 hover:text-rose-700 hover:underline">MIAM Exemptions</Link>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <Link href="/forms/c100" className="text-rose-600 hover:text-rose-700 hover:underline">C100 Form Guide</Link>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <Link href="/mediation/cost" className="text-rose-600 hover:text-rose-700 hover:underline">Mediation Costs</Link>
            <span className="text-zinc-300 dark:text-zinc-700">|</span>
            <Link href="/mediators" className="text-rose-600 hover:text-rose-700 hover:underline">Find a Mediator</Link>
          </div>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400 mt-6 max-w-2xl mx-auto">
            If you or your family are considering moving as part of your separation, our partners at <a href="https://relocation.quest" target="_blank" rel="noopener noreferrer" className="text-rose-600 hover:text-rose-700 hover:underline">Relocation Quest</a> provide AI-powered relocation advice for international and domestic moves.
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
          className="fixed bottom-6 right-24 z-40 w-14 h-14 bg-rose-600 hover:bg-rose-700 rounded-full flex items-center justify-center shadow-lg transition-all"
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
          placeholder: "Ask about MIAMs, mediation, or share your situation...",
        }}
        defaultOpen={isChatOpen}
        onSetOpen={setIsChatOpen}
        clickOutsideToClose={true}
      />
    </div>
  );
}
