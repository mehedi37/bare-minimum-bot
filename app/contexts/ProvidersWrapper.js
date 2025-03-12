'use client';

import { ThemeProvider } from './ThemeContext';
import { ChatProvider } from './ChatContext';
import { SummarizeProvider } from './SummarizeContext';

/**
 * Wrapper component to include all providers
 */
export default function ProvidersWrapper({ children }) {
  return (
    <ThemeProvider>
      <ChatProvider>
        <SummarizeProvider>
          {children}
        </SummarizeProvider>
      </ChatProvider>
    </ThemeProvider>
  );
}