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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMyListingStore } from "../my-listing-store";

const FormSchema = z.object({
  hourly: z.coerce
    .number({ invalid_type_error: "Amount must be a Number. " })
    .finite({ message: "Amount must be a valid value. " })
    .positive({ message: "Amount must be postive. " }),
  daily: z.coerce
    .number({ invalid_type_error: "Amount must be a Number. " })
    .finite({ message: "Amount must be a valid value. " })
    .positive({ message: "Amount must be postive. " }),
});

type ItemPricingInput = z.infer<typeof FormSchema>;

function ItemPricing({
  onNext,
  onPrev,
}: {
  onNext: () => void;
  onPrev?: () => void;
}) {
  const myListings = useMyListingStore();
  const form = useForm<ItemPricingInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hourly: myListings.data.price?.hourly,
      daily: myListings.data.price?.daily,
    },
  });

  function onSubmit(data: ItemPricingInput) {
    myListings.updateState({
      price: {
        hourly: data.hourly,
        daily: data.daily,
      },
    });
    onNext();
  }

  return (
    <div className="grid w-full gap-2">
      <h2 className="text-xl sm:text-2xl py-4 font-semibold">Pricing : </h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="hourly"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hourly Pricing</FormLabel>
                <FormControl>
                  <Input placeholder="Ex : 30" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="daily"
            render={({ field }) => (
              <FormItem className="mt-4">
                <FormLabel>Daily Pricing</FormLabel>
                <FormControl>
                  <Input placeholder="Ex : 30" {...field} />
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

export default ItemPricing;
