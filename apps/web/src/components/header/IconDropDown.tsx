"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { sessionUser } from "@/lib/definitions";
import Link from "next/link";
import { Roboto_Slab } from "next/font/google";
import { signOut } from "next-auth/react";

const robotoSlab = Roboto_Slab({ weight: "400", subsets: ["latin"] });

const IconDropDown = ({ user }: { user: sessionUser }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-8 h-8 sm:h-12 sm:w-12">
          <AvatarImage src={user?.image!} />
          <AvatarFallback>{user?.name!}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={`${robotoSlab.className} text-center rounded-2xl shadow-lg bg-white p-2`}
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        <DropdownMenuLabel className="text-center">
          {user?.name}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href="/profile/me" prefetch={false}>
          <DropdownMenuItem className="hover:cursor-pointer flex justify-center">
            My profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="hover:cursor-pointer flex justify-center">
          <button onClick={() => signOut()}>Sign out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default IconDropDown;
