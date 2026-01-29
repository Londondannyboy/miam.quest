'use client';

import { useEffect } from 'react';
import { useCoAgent, useCopilotReadable } from '@copilotkit/react-core';
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
  user?: {
    id: string;
    name: string;
    email: string;
  };
  zep_context?: string;
}

export default function CopilotChatWrapper({ prompt, onClose, user }: CopilotChatWrapperProps) {
  // Make user info readable by the agent (pattern from deep-agents example)
  // This exposes user context to the agent's system prompt
  useCopilotReadable({
    description: "The current logged-in user's information",
    value: {
      userId: user.id,
      userName: user.name,
      userEmail: user.email,
      userFirstName: user.name ? user.name.split(' ')[0] : '',
    },
  });

  // Also use coAgent for bidirectional state sync
  const { state, setState } = useCoAgent<AgentState>({
    name: "miam_agent",
    initialState: {},
  });

  // Sync user to agent state when component mounts or user changes
  useEffect(() => {
    console.log('[CopilotKit] User sync - user:', user.name, 'state.user:', state?.user?.name);
    if (user && (!state?.user || state.user.id !== user.id)) {
      console.log('[CopilotKit] Setting user state:', { id: user.id, name: user.name, email: user.email });
      setState(prev => ({
        ...prev,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        zep_context: prev?.zep_context ?? "",
      }));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

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
