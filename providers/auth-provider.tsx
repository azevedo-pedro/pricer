"use client";

import { SessionProvider } from "next-auth/react";
import { QueryProvider } from "@/providers/query-provider";
import { initializeLocalStorage } from "@/features/price/api/api";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initializeLocalStorage();
  }, []);
  return (
    <QueryProvider>
      <SessionProvider>{children}</SessionProvider>
    </QueryProvider>
  );
}
