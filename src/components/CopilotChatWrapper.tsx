'use client';

import { CopilotKit } from '@copilotkit/react-core';
import { CopilotPopup } from '@copilotkit/react-ui';
import '@copilotkit/react-ui/styles.css';

interface CopilotChatWrapperProps {
  prompt: string;
  onClose: () => void;
}

export default function CopilotChatWrapper({ prompt, onClose }: CopilotChatWrapperProps) {
  return (
    <CopilotKit runtimeUrl="/api/copilotkit" agent="each_way_agent">
      <CopilotPopup
        instructions={prompt}
        labels={{
          title: "Chat with Miam",
          initial: "Hello! I'm Miam, your mediation preparation assistant. I'm here to help you understand the MIAM process and prepare for mediation.\n\n**Note:** This is a beta service in open testing. How can I help you today?",
          placeholder: "Ask about MIAMs, certificates, exemptions...",
        }}
        defaultOpen={true}
        onSetOpen={(open) => {
          if (!open) onClose();
        }}
        clickOutsideToClose={true}
      />
    </CopilotKit>
  );
}
