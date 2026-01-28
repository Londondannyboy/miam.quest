'use client';

import { CopilotKit } from '@copilotkit/react-core';
import { CopilotChat } from '@copilotkit/react-ui';
import '@copilotkit/react-ui/styles.css';

interface CopilotChatWrapperProps {
  prompt: string;
  onClose: () => void;
}

export default function CopilotChatWrapper({ prompt, onClose }: CopilotChatWrapperProps) {
  return (
    <div className="fixed inset-y-0 right-0 w-[420px] z-[9999] bg-white dark:bg-zinc-900 shadow-2xl flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-rose-600 to-pink-600">
        <div>
          <h2 className="text-white font-semibold text-lg">Chat with Miam</h2>
          <span className="text-rose-100 text-xs">Beta - Open Testing</span>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white p-1 rounded transition-colors"
          aria-label="Close chat"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-hidden">
        <CopilotKit runtimeUrl="/api/copilotkit" agent="each_way_agent" showDevConsole={false}>
          <CopilotChat
            instructions={prompt}
            labels={{
              title: "Chat with Miam",
              initial: "Hello! I'm Miam, your mediation preparation assistant. I'm here to help you understand the MIAM process and prepare for mediation.\n\n**Note:** This is a beta service in open testing. How can I help you today?",
              placeholder: "Ask about MIAMs, certificates, exemptions...",
            }}
            className="h-full"
          />
        </CopilotKit>
      </div>
    </div>
  );
}
