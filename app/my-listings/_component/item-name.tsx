"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMyListingStore } from "../my-listing-store";

const FormSchema = z.object({
  itemName: z
    .string()
    .min(4, { message: "Item should be atleast 4 characters long!" }),
});

type ItemNameInput = z.infer<typeof FormSchema>;

function ItemName({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev?: () => void;
}) {
  const myListings = useMyListingStore();

  const form = useForm<ItemNameInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      itemName: myListings.data.name,
    },
  });

  function onSubmit(data: ItemNameInput) {
    myListings.updateState({
      name: data.itemName,
    });
    onNext();
  }

  return (
    <div className="grid w-full gap-2">
      <h2 className="text-xl sm:text-2xl py-4 font-semibold">Item Name : </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="itemName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Ex : MacBook" {...field} />
                </FormControl>
                <FormDescription>
                  This is a Public Facing Name( Min 4 characters )
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end items-center py-4">
            {/* <Button type="button">Prev</Button> */}
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ItemName;
