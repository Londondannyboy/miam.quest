'use client';

import { CopilotKit } from '@copilotkit/react-core';
import { CopilotSidebar } from '@copilotkit/react-ui';
import '@copilotkit/react-ui/styles.css';

interface CopilotChatWrapperProps {
  prompt: string;
  onClose: () => void;
}

export default function CopilotChatWrapper({ prompt, onClose }: CopilotChatWrapperProps) {
  return (
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: 'none' }}>
      <div className="absolute inset-y-0 right-0 w-[400px]" style={{ pointerEvents: 'auto' }}>
        <CopilotKit runtimeUrl="/api/copilotkit" agent="each_way_agent" showDevConsole={false}>
          <CopilotSidebar
            instructions={prompt}
            labels={{
              title: "Chat with Miam",
              initial: "Hello! I'm Miam, your mediation preparation assistant. I'm here to help you understand the MIAM process and prepare for mediation. How can I help you today?",
              placeholder: "Ask about MIAMs, certificates, exemptions...",
            }}
            defaultOpen={true}
            onSetOpen={(open) => {
              if (!open) onClose();
            }}
            clickOutsideToClose={true}
          />
        </CopilotKit>
      </div>
    </div>
  );
}
