"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings, LifeBuoy, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

export function UserButton() {
  const { data: profile, status } = useSession();
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
        <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem disabled>
            <User />
            <span>Perfil</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <Settings />
            <span>Configurações</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuItem disabled>
          <LifeBuoy />
          <span>Suporte</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut />
          <span>Sair</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
