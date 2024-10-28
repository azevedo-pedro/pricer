import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/providers/auth-provider";

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
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
