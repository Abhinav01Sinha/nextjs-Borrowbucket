"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useMyListingStore } from "../my-listing-store";
import { itemCategories } from "@/data";

const FormSchema = z.object({
  itemCategory: z.string().min(1, { message: "Item category is required!" }),
});

type ItemCategoryInput = z.infer<typeof FormSchema>;

function ItemCategory({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev?: () => void;
}) {
  const myListings = useMyListingStore();

  const form = useForm<ItemCategoryInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      itemCategory: myListings.data.category,
    },
  });

  function onSubmit(data: ItemCategoryInput) {
    myListings.updateState({
      category: data.itemCategory,
    });
    onNext();
  }

  return (
    <div className="grid w-full gap-2">
      <h2 className="text-xl sm:text-2xl py-4 font-semibold">
        Item Category :{" "}
      </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="itemCategory"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={myListings.data.category}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an Item Category" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {itemCategories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name}>
                        {" "}
                        {cat.display}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

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

export default ItemCategory;
