import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { nextOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

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
