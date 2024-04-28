import React from 'react';
import { MantineProvider } from '@mantine/core';
import { LangProvider } from '@/_intl/intlContext';
import { theme } from '@/theme';

export const GlobalProviders: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <MantineProvider theme={theme}>
    <LangProvider>
      {children}
    </LangProvider>
  </MantineProvider>
);