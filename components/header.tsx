import { cn } from "@/lib/utils";
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
import { getServerSession } from "next-auth";
import SignOutButton from "./SignOutButton";
import SignInButton from "./SignInButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="fixed w-full z-50">
      <nav className="bg-primary flex item-center justify-between p-4">
        <div className="flex lg:flex-1">
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

        <div className="flex items-center">
          <Link
            href={`${session ? "/my-listings" : "/api/auth/signin"} `}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "shadow hidden md:flex md:mr-2"
            )}
          >
            Switch to Host
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex text-500">
                <Menu />
                {session?.user && <p>{session.user.name?.split(" ")[0]}</p>}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem className="shadow md:hidden">
                <Link
                  href={`${session ? "/my-listings" : "/api/auth/signin"} `}
                >
                  Switch to Host
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="md:hidden" />

              {session && (
                <>
                  <DropdownMenuItem className="font-bold">
                    <Link
                      href={`${
                        session ? "/my-rented-items" : "/api/auth/signin"
                      } `}
                    >
                      Rented Items
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                </>
              )}

              <DropdownMenuItem className="flex text-left py-0">
                {session ? <SignOutButton /> : <SignInButton />}
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Link href="#how-it-works" className="flex text-left py-0">
                  How It Works?
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
}

export default Header;
