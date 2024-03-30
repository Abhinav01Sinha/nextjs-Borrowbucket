"use client";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Item } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

function SingleListing({ listings }: { listings: Item[] }) {
  const [itemToAction, setItemToAction] = useState<Item | null>(null);
  const [dialog, setDialog] = useState(false);
  const router = useRouter();

  const handleItemRemove = (item: Item) => {
    setItemToAction(item);
    setDialog(true);
  };

  const handleConfirm = async () => {
    const result = await fetch(`api/item/${itemToAction?._id}`, {
      method: "DELETE",
    });

    if (result.ok) {
      setDialog(false);
      toast.success("Item Deleted Successfully!");
      router.refresh();
    }
  };

  return (
    <>
      {listings.map((item) => (
        <div key={item._id} className="flex gap-4 py-1 shadow-md pb-1">
          {/* photo */}
          <div>
            {item.photos.length > 0 ? (
              <Image
                src={`${item.photos.at(0)}`}
                className="rounded-md"
                width={100}
                height={100}
                alt={`${item.name}`}
              />
            ) : (
              <ImageIcon
                className="rounded-md text-slate-300"
                width={100}
                height={100}
              />
            )}
          </div>

          <div className="flex flex-col justify-center spacey-1">
            <p className="text-2xl sm:text-xl font-bold capitalize ml-1">
              {" "}
              {item.name}{" "}
            </p>

            <Badge
              className={`${
                item.status === "listed" ? "bg-green-500 " : "bg-red-500 "
              } text-white uppercase flex justify-center my-1 w-20 `}
            >
              {" "}
              {item.status}{" "}
            </Badge>

            <div className="flex gap-4">
              <Link
                href={`my-listings/edit/${item._id}`}
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-blue-500 px-1"
                )}
              >
                Edit
              </Link>

              <Button
                variant={"link"}
                onClick={() => handleItemRemove(item)}
                className="text-red-500 px-1"
              >
                {" "}
                Delete{" "}
              </Button>
            </div>
          </div>
        </div>
      ))}

      <AlertDialog open={dialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently remove your
              item from your Listings.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default SingleListing;
