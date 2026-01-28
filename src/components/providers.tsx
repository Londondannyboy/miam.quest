'use client';

import { NeonAuthUIProvider } from '@neondatabase/auth/react/ui';
import { CopilotKit } from '@copilotkit/react-core';
import { authClient } from '@/lib/auth/client';

// Load CopilotKit styles on client-side to avoid render-blocking
import '@copilotkit/react-ui/styles.css';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NeonAuthUIProvider
      authClient={authClient}
      redirectTo="/"
      social={{ providers: ['google'] }}
    >
      <CopilotKit runtimeUrl="/api/copilotkit" agent="each_way_agent" showDevConsole={false}>
        {children}
      </CopilotKit>
    </NeonAuthUIProvider>
  );
}
