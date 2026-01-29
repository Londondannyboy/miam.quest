'use client';

import { useEffect } from 'react';
import { useCoAgent } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';

interface CopilotChatWrapperProps {
  prompt: string;
  onClose: () => void;
}

// Agent state type
interface AgentState {
  user: {
    id: string;
    name: string;
  } | null;
}

export default function CopilotChatWrapper({ prompt, onClose }: CopilotChatWrapperProps) {
  // Initialize agent state - must match agent name in providers.tsx
  useCoAgent<AgentState>({
    name: "miam_agent",
    initialState: {
      user: null,
    },
  });

  useEffect(() => {
    console.log('[CopilotKit] Chat wrapper mounted');
  }, []);

  return (
    <CopilotSidebar
      instructions={prompt}
      labels={{
        title: "Chat with Miam",
        initial: "Hello! I'm Miam, your MIAM preparation assistant.\n\n**Beta Service:** For official guidance, consult an FMC-accredited mediator or GOV.UK.\n\nHow can I help you today?",
        placeholder: "Ask about MIAMs, certificates, exemptions...",
      }}
      defaultOpen={true}
      onSetOpen={(open) => {
        console.log('[CopilotKit] Sidebar open state:', open);
        if (!open) onClose();
      }}
      clickOutsideToClose={true}
      className="z-[9999]"
    >
      {/* Sidebar overlays existing content */}
      <div />
    </CopilotSidebar>
  );
}
