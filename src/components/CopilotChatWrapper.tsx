'use client';

import { useEffect } from 'react';
import { CopilotKit, useCoAgent } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import '@copilotkit/react-ui/styles.css';

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

// Inner component that uses hooks
function CopilotInner({ prompt, onClose }: CopilotChatWrapperProps) {
  // Initialize agent state
  useCoAgent<AgentState>({
    name: "miam_agent",
    initialState: {
      user: null,
    },
  });

  useEffect(() => {
    console.log('[CopilotKit] Inner component mounted');
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
      {/* Empty placeholder - sidebar overlays existing content */}
      <div className="hidden" />
    </CopilotSidebar>
  );
}

export default function CopilotChatWrapper({ prompt, onClose }: CopilotChatWrapperProps) {
  useEffect(() => {
    console.log('[CopilotKit] Wrapper mounted, agent: miam_agent');
    console.log('[CopilotKit] Runtime URL: /api/copilotkit');
  }, []);

  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      agent="miam_agent"
    >
      <CopilotInner prompt={prompt} onClose={onClose} />
    </CopilotKit>
  );
}
