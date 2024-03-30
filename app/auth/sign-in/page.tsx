"use client";

import MaxWidthContainer from "@/components/maxWidthContainer";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <MaxWidthContainer classes="border rounded shadow-md py-20 mt-20">
      <h1 className="text-2xl font-bold text-center">
        Welcome to Borrow Bucket
      </h1>

      <hr />

      <div className="flex flex-col items-center w-full space-y-2 py-8">
        <Button
          className="px-6"
          variant={"outline"}
          onClick={async () =>
            await signIn("google", {
              callbackUrl: `${window.location.origin}`,
            })
          }
        >
          <Image
            className="mr-3"
            src={"/google-logo.svg"}
            alt="google logo"
            width={25}
            height={25}
          />
          Sign In With Google
        </Button>

        <Button
          variant={"outline"}
          onClick={async () =>
            await signIn("facebook", {
              callbackUrl: `${window.location.origin}`,
            })
          }
        >
          <Image
            className="mr-2"
            src={"/facebook-logo.svg"}
            alt="facebook logo"
            width={25}
            height={25}
          />
          Sign In With Facebook
        </Button>
      </div>
    </MaxWidthContainer>
  );
}
