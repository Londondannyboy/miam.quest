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

// Agent state type - synced with backend via AG-UI
interface AgentState {
  user?: {
    id?: string;
    name?: string;
    email?: string;
  };
}

// Helper to get first name
function getFirstName(fullName: string | undefined): string {
  if (!fullName) return '';
  return fullName.split(' ')[0];
}

export default function CopilotChatWrapper({ prompt, onClose, user }: CopilotChatWrapperProps) {
  const firstName = getFirstName(user.name);

  // Sync user to agent state via AG-UI protocol
  const { state, setState } = useCoAgent<AgentState>({
    name: "miam_agent",
    initialState: {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
  });

  // Re-sync when user changes
  useEffect(() => {
    console.log('[CopilotKit] Syncing user to agent state:', user.name, user.id);
    console.log('[CopilotKit] Current agent state:', JSON.stringify(state));

    setState({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }, [user.id, user.name, user.email, setState]);

  // Build instructions with user context as backup
  const instructions = `${prompt}

CRITICAL USER CONTEXT:
- User ID: ${user.id}
- User Name: ${user.name || 'Unknown'}
- User First Name: ${firstName || 'User'}
- User Email: ${user.email || 'Not provided'}

IMPORTANT: Always address the user by their first name "${firstName || 'there'}" when appropriate.`;

  return (
    <CopilotSidebar
      instructions={instructions}
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
