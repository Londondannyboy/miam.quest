'use client';

import { useEffect } from 'react';
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

// Helper to get first name
function getFirstName(fullName: string | undefined): string {
  if (!fullName) return '';
  return fullName.split(' ')[0];
}

export default function CopilotChatWrapper({ prompt, onClose, user }: CopilotChatWrapperProps) {
  const firstName = getFirstName(user.name);

  useEffect(() => {
    console.log('[CopilotKit] Chat wrapper mounted with user:', user.name, user.id);
  }, [user.name, user.id]);

  // Build instructions with user context directly embedded (relocation.quest pattern)
  // This is the pattern that WORKS - user context goes directly into the instructions string
  const instructions = `${prompt}

CRITICAL USER CONTEXT:
- User ID: ${user.id}
- User Name: ${user.name || 'Unknown'}
- User First Name: ${firstName || 'User'}
- User Email: ${user.email || 'Not provided'}

IMPORTANT: Always address the user by their first name "${firstName || 'there'}" when appropriate.
You know who this user is - use their name naturally in conversation.`;

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
