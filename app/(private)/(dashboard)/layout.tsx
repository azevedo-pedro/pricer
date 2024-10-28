import { ReactNode } from "react";
import Image from "next/image";

type Props = {
  children: ReactNode;
};
export default function DashboardLayout({ children }: Props) {
  return (
    <>
      <section className="w-full h-[69px] bg-[#37776C] px-6 flex flex-row justify-between items-center">
        <Image
          src="/logo.svg"
          height={39}
          width={100}
          alt="Logo Options & Company"
        />
        <div className="flex justify-center items-center">
          <Image
            src="/profile.png"
            height={32}
            width={32}
            alt="Profile photo"
          />
          <h2 className="text-white text-base ml-2 leading-5">Luiz Pedro</h2>
        </div>
      </section>
      <main>{children}</main>
    </>
  );
}
