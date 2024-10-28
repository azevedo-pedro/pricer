"use client";
import { AuthForm, LoginFormData } from "@/components/auth-form";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function SignInPage() {
  const { status } = useSession();
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
    onError: () => {
      toast.error("Falha ao fazer login");
    },
  });

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
      router.refresh();
    }
  }, [status]);

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
          <AuthForm onSubmit={onSubmit} disabled={loginMutation.isPending} />
        </div>
      </div>
    </div>
  );
}
