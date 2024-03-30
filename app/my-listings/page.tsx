import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ListYourItemComponent from "./_component/list-your-item-component";
import { ItemModel } from "@/Schemas/item";
import { getServerSession } from "next-auth";
import SingleListing from "./_component/single-listing";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/option";

async function MyListingsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }
  const myListings = await ItemModel.find({ hostid: session?.user.id });

  return (
    <>
      <h1 className="text-2xl sm:text-4xl py-8 font-bold">
        {myListings.length} Listings
      </h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"}>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Listings</DialogTitle>
          </DialogHeader>

          <ListYourItemComponent />
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 py-8">
        {myListings.length ? (
          <SingleListing listings={myListings} />
        ) : (
          <p className="font-light text-xl p-4">No Listings</p>
        )}
      </div>
    </>
  );
}

export default MyListingsPage;
