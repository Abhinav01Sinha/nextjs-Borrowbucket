"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useMyListingStore } from "../my-listing-store";

const FormSchema = z.object({
  itemDescription: z.string().min(4, {
    message: "Item Description should be atleast 4 characters long!",
  }),
});

type ItemDescriptionInput = z.infer<typeof FormSchema>;

function ItemDescription({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev?: () => void;
}) {
  const myListings = useMyListingStore();

  const form = useForm<ItemDescriptionInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      itemDescription: myListings.data.description,
    },
  });

  function onSubmit(data: ItemDescriptionInput) {
    myListings.updateState({
      description: data.itemDescription,
    });
    onNext();
  }

  return (
    <div className="grid w-full gap-2">
      <h2 className="text-xl sm:text-2xl py-4 font-semibold">
        Item Description :{" "}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="itemDescription"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    {...field}
                    maxLength={250}
                    placeholder="Provide a detail description and rules. "
                  >
                    {" "}
                  </Textarea>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-between items-center py-4">
            <Button type="button" onClick={onPrev}>
              Prev
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ItemDescription;
