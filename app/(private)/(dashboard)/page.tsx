"use client";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 ">
      <div className="h-full bg-[#37776C] lg:flex items-center justify-center">
        <Image
          src="/logo.svg"
          height={100}
          width={256}
          alt="Logo Options & Company"
        />
      </div>
    </div>
  );
}
