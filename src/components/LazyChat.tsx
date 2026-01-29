'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { authClient } from '@/lib/auth/client';

// Lazy load the entire CopilotKit setup only when chat is opened
const CopilotChatWrapper = dynamic(
  () => import('./CopilotChatWrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="fixed bottom-24 right-6 bg-white dark:bg-zinc-900 rounded-xl shadow-xl z-50 p-4 flex items-center gap-3">
        <div className="w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-zinc-500 dark:text-zinc-400 text-sm">Loading chat...</span>
      </div>
    )
  }
);

interface LazyChatProps {
  prompt: string;
}

export function LazyChat({ prompt }: LazyChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showSignInPrompt, setShowSignInPrompt] = useState(false);
  const [chatKey, setChatKey] = useState(0);

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const openChat = useCallback(() => {
    if (!user) {
      // Show sign-in prompt if not logged in
      setShowSignInPrompt(true);
      return;
    }
    setChatKey(prev => prev + 1);
    setIsOpen(true);
  }, [user]);

  return (
    <>
      {/* Chat button - only show when sidebar closed */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
          <span className="bg-zinc-800/90 text-white text-xs px-3 py-1.5 rounded-full shadow-lg">
            Beta Testing
          </span>
          <button
            onClick={openChat}
            className="w-16 h-16 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 rounded-full flex items-center justify-center shadow-xl shadow-rose-600/30 transition-all hover:scale-110"
            title="Chat with Miam (Beta)"
            aria-label="Chat with Miam"
          >
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </div>
      )}

      {/* Sign-in prompt modal */}
      {showSignInPrompt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowSignInPrompt(false)}
          />

          {/* Modal */}
          <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-md w-full p-6">
            <button
              onClick={() => setShowSignInPrompt(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center">
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">M</span>
              </div>

              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                Sign in to Chat with Miam
              </h3>

              <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
                Create a free account to start your MIAM preparation journey. Your conversations help us provide personalized guidance.
              </p>

              {/* Beta notice */}
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 mb-6 text-left">
                <div className="flex items-start gap-2">
                  <span className="text-amber-600">⚠️</span>
                  <div className="text-sm">
                    <p className="font-medium text-amber-800 dark:text-amber-200">Beta Service</p>
                    <p className="text-amber-700 dark:text-amber-300 mt-1">
                      Miam is an AI assistant in beta testing. For official guidance, consult an{' '}
                      <a
                        href="https://www.familymediationcouncil.org.uk/find-local-mediator/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        FMC-accredited mediator
                      </a>{' '}
                      or{' '}
                      <a
                        href="https://www.gov.uk/looking-after-children-divorce"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline"
                      >
                        GOV.UK
                      </a>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/auth/sign-in"
                  className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/sign-up"
                  className="w-full py-3 px-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white rounded-xl font-medium transition-colors"
                >
                  Create Free Account
                </Link>
              </div>

              <p className="text-xs text-zinc-500 mt-4">
                By signing in, you agree to our{' '}
                <Link href="/terms" className="underline">Terms</Link> and{' '}
                <Link href="/privacy" className="underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CopilotKit - only load when opened and user is signed in */}
      {isOpen && user && (
        <CopilotChatWrapper
          key={chatKey}
          prompt={prompt}
          onClose={() => setIsOpen(false)}
          user={{
            id: user.id,
            name: user.name || '',
            email: user.email || '',
          }}
        />
      )}
    </>
  );
}
