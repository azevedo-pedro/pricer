"use client";
import { ReactNode } from "react";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  const { status } = useSession();

  if (status === "unauthenticated") {
    redirect("/sign-in");
  }

  return <>{children}</>;
}
