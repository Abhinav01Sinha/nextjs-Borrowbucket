import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

async function HeaderHost() {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed w-full z-50">
      <nav className="bg-primary flex items-center justify-between p-4 lg:px-8">
        <div className="flex flex-1 ">
          <Link href={"/"}>
            <span className="sr-only">Logo</span>
            <Image
              className="w-auto h-auto"
              width={40}
              height={40}
              src={"/logo.png"}
              alt="Logo"
            ></Image>
          </Link>
        </div>

        <div className="flex flex-1 space-x-4">
          <Link href={"/booked-items"} className="hidden md:flex md:font-bold">
            BOOKED ITEMS
          </Link>
          <Link href={"/my-listings"} className="hidden md:flex md:font-bold">
            MY LISTINGS
          </Link>
        </div>

        <div className="flex items-center">
          <Link
            href={"/"}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "shadow flex hidden md:flex md:mr-2"
            )}
          >
            Switch To Guest
          </Link>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex text-500">
              <Menu />
              {session?.user && <p>{session.user.name?.split(" ")[0]}</p>}
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuItem className="shadow md:hidden">
              <Link href={"/"} className="font-bold text-primary">
                Switch to Guest
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="md:hidden" />

            <DropdownMenuItem className=" md:hidden">
              <Link href={"/my-listings"}>My Listings</Link>
            </DropdownMenuItem>

            <DropdownMenuItem className=" md:hidden">
              <Link href={"/booked-items"}>Booked Items</Link>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex text-left py-0">
              {session ? <SignOutButton /> : <SignInButton />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  );
}

export default HeaderHost;
