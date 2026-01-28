'use client';

import { useState, useCallback } from 'react';
import dynamic from 'next/dynamic';

// Lazy load the entire CopilotKit setup only when chat is opened
const CopilotChatWrapper = dynamic(
  () => import('./CopilotChatWrapper'),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-y-0 right-0 w-[400px] bg-white dark:bg-zinc-900 shadow-xl z-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-zinc-500 dark:text-zinc-400">Loading Miam...</span>
        </div>
      </div>
    )
  }
);

interface LazyChatProps {
  prompt: string;
}

export function LazyChat({ prompt }: LazyChatProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [chatKey, setChatKey] = useState(0);

  const openChat = useCallback(() => {
    setChatKey(prev => prev + 1);
    setIsOpen(true);
  }, []);

  return (
    <>
      {/* Chat button - only show when sidebar closed */}
      {!isOpen && (
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

      {/* CopilotKit - only load when opened */}
      {isOpen && (
        <CopilotChatWrapper
          key={chatKey}
          prompt={prompt}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
