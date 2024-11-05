"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Mail } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function UserButton() {
  const { data: profile, status } = useSession();
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Failed to sign out:", error);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {status === "authenticated" && (
          <div className="flex justify-center items-center hover:cursor-pointer">
            <Avatar>
              <AvatarImage src="/profile.png" alt="Profile photo" />
              <AvatarFallback>{profile?.user.name}</AvatarFallback>
            </Avatar>
            <h2 className="text-white text-base ml-2 leading-5">
              {profile?.user.name}
            </h2>
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="flex space-x-4 items-center">
          <Mail />
          <span>{profile?.user.email}</span>
        </DropdownMenuLabel>

        <DropdownMenuItem onClick={handleSignOut}>
          <LogOut />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
