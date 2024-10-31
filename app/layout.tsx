import type { Metadata } from "next";
import { AuthProvider } from "@/providers/auth-provider";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { SheetProvider } from "@/providers/sheet-provider";

export const metadata: Metadata = {
  title: "Pricer",
  description: "The beast away to control your investiment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#F7F8F8]`}>
        <AuthProvider>
          <Toaster />
          <SheetProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
