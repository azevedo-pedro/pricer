"use client";
import { ReactNode } from "react";

import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { useSession } from "next-auth/react";
import { WebSocketProvider } from "@/providers/websocket-provider";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/sign-in");
  }

  return (
    <>
      <Header />
      <WebSocketProvider>
        <main>{children}</main>
      </WebSocketProvider>
    </>
  );
}
