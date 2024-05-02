"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
