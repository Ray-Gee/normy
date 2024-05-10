"use client";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { ProtectedRoute } from "@/_components/Auth/ProtectedRoute";

const queryClient = new QueryClient();
const noAuthRequired = ["/login", "/signup"];

export const ClientProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const pathname = usePathname();

  return (
    <QueryClientProvider client={queryClient}>
      {noAuthRequired.includes(pathname) ? (
        children
      ) : (
        <ProtectedRoute>{children}</ProtectedRoute>
      )}
    </QueryClientProvider>
  );
};
