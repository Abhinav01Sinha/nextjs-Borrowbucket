"use client";

import ImageDropzone from "@/components/imageDropzone";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { itemCategories } from "@/data";
import { Item, ItemStatus } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const FormSchema = z.object({
  status: z.boolean(),
  itemName: z
    .string()
    .min(4, { message: "Item should be atleast 4 characters long!" }),

  itemCategory: z.string().min(1, { message: "Item category is required!" }),

  itemDescription: z.string().min(4, {
    message: "Item Description should be atleast 4 characters long!",
  }),

  hourly: z.coerce
    .number({ invalid_type_error: "Amount must be a Number. " })
    .finite({ message: "Amount must be a valid value. " })
    .positive({ message: "Amount must be postive. " }),
  daily: z.coerce
    .number({ invalid_type_error: "Amount must be a Number. " })
    .finite({ message: "Amount must be a valid value. " })
    .positive({ message: "Amount must be postive. " }),

  photos: z.array(z.string()),
});

type FormInput = z.infer<typeof FormSchema>;

function ItemEditForm({ item }: { item: Item }) {
  const router = useRouter();

  const form = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      status: item.status === ItemStatus.LISTED,
      itemName: item.name,
      itemCategory: item.category,
      itemDescription: item.description,
      hourly: item.price.hourly,
      daily: item.price.daily,
      photos: item.photos,
    },
  });

  async function onSubmit(formInput: FormInput) {
    const data = { ...formInput };

    const result = await fetch(`/api/item/${item._id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });

    if (result.ok) {
      toast.success("Item Updated Successfully!");
      router.refresh();
    } else {
      toast.error("Item Updation Failed!");
    }
  }

  const handleFileAdd = async (filesToUpload: string[]) => {
    const newPhotos = [...form.getValues("photos"), ...filesToUpload];
    form.setValue("photos", newPhotos);
    await onSubmit(form.getValues());
  };

  const handleFileDelete = async (url: string) => {
    const updatedPhotos = form
      .getValues("photos")
      .filter((photo) => photo !== url);

    form.setValue("photos", updatedPhotos);
    await onSubmit(form.getValues());
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          {/* STATUS */}
          <div className="bg-slate-100 my-4 p-2 rounded_md">
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="flex items-center justify-between ">
                  <FormLabel
                    className={`${
                      field.value ? "text-green-500" : "text-red-500"
                    } font-bold`}
                  >
                    {field.value ? "LISTED" : "UNLISTED"}
                  </FormLabel>
                  <FormControl>
                    <Switch
                      className=""
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          {/* Name */}
          <div className="bg-slate-100 p-2 rounded-md">
            <FormField
              control={form.control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-1"> Name </FormLabel>
                  <FormControl>
                    <Input placeholder="Ex : MacBook" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          {/* Description */}
          <div className="bg-slate-100 p-2 rounded-md">
            <FormField
              control={form.control}
              name="itemDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-1"> Description </FormLabel>
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
          </div>
          {/* Category */}
          <div className="bg-slate-100 p-2 rounded-md">
            <FormField
              control={form.control}
              name="itemCategory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="ml-1"> Category </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={item.category}
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
          </div>
          {/* Pricing */}
          <div className="bg-slate-100 p-2 rounded_md">
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
          </div>
          {/* Photos */}
          <div className="flex flex-wrap gap-2">
            <ImageDropzone
              photos={form.getValues("photos")}
              onFileDelete={handleFileDelete}
              onFilesAdded={handleFileAdd}
            />
          </div>
          {/* Submit */}
          <div className="py-3">
            <Button
              disabled={!form.formState.isDirty}
              type="submit"
              className="w-full"
            >
              {" "}
              Save{" "}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}

export default ItemEditForm;
