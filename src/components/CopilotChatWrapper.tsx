'use client';

import { useEffect } from 'react';
import { useCoAgent } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';

interface UserInfo {
  id: string;
  name: string;
  email: string;
}

interface CopilotChatWrapperProps {
  prompt: string;
  onClose: () => void;
  user: UserInfo;
}

// Agent state type - must match AppState in agent.py
interface AgentState {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  zep_context: string;
}

export default function CopilotChatWrapper({ prompt, onClose, user }: CopilotChatWrapperProps) {
  // Initialize agent state with user info - must match agent name in providers.tsx
  useCoAgent<AgentState>({
    name: "miam_agent",
    initialState: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      zep_context: "",
    },
  });

  useEffect(() => {
    console.log('[CopilotKit] Chat wrapper mounted with user:', user.name, user.id);
  }, [user]);

  return (
    <CopilotSidebar
      instructions={prompt}
      labels={{
        title: "Chat with Miam",
        initial: user.name
          ? `Hello ${user.name.split(' ')[0]}! I'm Miam, your MIAM preparation assistant.\n\n**Beta Service:** For official guidance, consult an FMC-accredited mediator or GOV.UK.\n\nHow can I help you today?`
          : "Hello! I'm Miam, your MIAM preparation assistant.\n\n**Beta Service:** For official guidance, consult an FMC-accredited mediator or GOV.UK.\n\nHow can I help you today?",
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
