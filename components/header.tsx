"use client";
import Image from "next/image";
import { UserButton } from "./user-button";

export function Header() {
  return (
    <section className="w-full h-[69px] bg-[#37776C] px-6 flex flex-row justify-between items-center">
      <Image
        src="/logo.svg"
        height={39}
        width={100}
        alt="Logo Options & Company"
      />
      <UserButton />
    </section>
  );
}
