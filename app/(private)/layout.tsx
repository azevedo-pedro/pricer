import { getServerSession } from "next-auth";
import { ReactNode } from "react";

import { redirect } from "next/navigation";
import { nextOptions } from "@/lib/next-config";

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  const session = getServerSession(nextOptions);

  if (!session) {
    redirect("/sign-in");
  }
  return <>{children}</>;
}
