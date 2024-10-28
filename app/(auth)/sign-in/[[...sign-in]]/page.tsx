"use client";
import { AuthForm, LoginFormData } from "@/components/auth-form";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });
      if (result?.error) {
        throw new Error(result.error);
      }

      return result;
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full bg-[#37776C] hidden lg:flex items-center justify-center">
        <Image
          src="/logo.svg"
          height={100}
          width={256}
          alt="Logo Options & Company"
        />
      </div>
      <div className="h-full flex flex-col lg:items-center justify-center px-4">
        <div className="text-left space-y-2.5 lg:w-full lg:max-w-[608px]">
          <h3 className="font-bold size-6 text-[#2E2A47]">Login</h3>
          <AuthForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
}
