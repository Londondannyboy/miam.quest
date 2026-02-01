"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { authClient } from "@/lib/auth/client";
import { HOME_PROMPT } from "@/lib/prompts";

// Lazy load heavy components
const LazyChat = dynamic(
  () => import("@/components/LazyChat").then((mod) => mod.LazyChat),
  { ssr: false }
);

const VoiceInput = dynamic(
  () => import("@/components/VoiceInput").then((mod) => mod.VoiceInput),
  { ssr: false, loading: () => null }
);

export default function ChatPage() {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-950 via-rose-900 to-slate-900">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-rose-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl" />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-6 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Chat with{" "}
            <span className="bg-gradient-to-r from-rose-200 to-pink-200 bg-clip-text text-transparent">
              Miam
            </span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Your AI assistant for MIAM certificate preparation. Talk or type to get started.
          </p>
        </div>

        {/* Chat options */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Voice option */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Talk to Miam</h2>
            <p className="text-white/70 mb-6">
              Have a natural voice conversation. Click the microphone to start speaking.
            </p>
            <div className="flex justify-center">
              <VoiceInput
                onMessage={() => {}}
                userName={user?.name || user?.email?.split("@")[0]}
                userId={user?.id}
                userEmail={user?.email}
              />
            </div>
          </div>

          {/* Text chat option */}
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Type to Miam</h2>
            <p className="text-white/70 mb-6">
              Prefer typing? Click the chat button in the bottom right corner to open the chat.
            </p>
            <p className="text-white/50 text-sm">
              Chat button appears in the corner →
            </p>
          </div>
        </div>

        {/* What to expect */}
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8">
          <h3 className="text-lg font-semibold text-white mb-4">What Miam Can Help With</h3>
          <ul className="grid sm:grid-cols-2 gap-3 text-white/80 text-sm">
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Understanding the MIAM process
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Preparing for your mediation meeting
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Organizing your priorities
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Learning about exemptions
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Understanding costs and legal aid
            </li>
            <li className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Finding accredited mediators
            </li>
          </ul>
        </div>

        {/* Disclaimer */}
        <div className="bg-amber-900/30 border border-amber-700/50 rounded-xl p-4 text-center">
          <p className="text-amber-200/90 text-sm">
            <strong className="text-amber-100">Beta Service:</strong> Miam is an AI assistant and cannot provide legal advice or issue MIAM certificates.
            For official guidance, consult an{" "}
            <a href="https://www.familymediationcouncil.org.uk/find-local-mediator/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">
              FMC-accredited mediator
            </a>.
          </p>
        </div>
      </div>

      {/* LazyChat - floating button and sidebar */}
      <LazyChat prompt={HOME_PROMPT} />
    </div>
  );
}
