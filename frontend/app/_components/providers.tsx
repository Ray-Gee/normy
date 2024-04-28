import React from "react";
import { MantineProvider } from "@mantine/core";
import { LangProvider } from "@/_intl/intlContext";
import { theme } from "@/theme";
import { ClientProviders } from "@/_components/ClientProviders";

export const GlobalProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <MantineProvider theme={theme}>
    <ClientProviders>
      <LangProvider>{children}</LangProvider>
    </ClientProviders>
  </MantineProvider>
);
