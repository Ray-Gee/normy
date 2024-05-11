import React from "react";
import { MantineProvider } from "@mantine/core";
import { LangProvider } from "@/_intl/intlContext";
import { theme } from "@/theme";
import { ClientProviders } from "@/_components/ClientProviders";
import { UserProvider } from "@/UserContext";

export const GlobalProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MantineProvider theme={theme}>
      <ClientProviders>
        <UserProvider>
          <LangProvider>{children}</LangProvider>
        </UserProvider>
      </ClientProviders>
    </MantineProvider>
  );
};
