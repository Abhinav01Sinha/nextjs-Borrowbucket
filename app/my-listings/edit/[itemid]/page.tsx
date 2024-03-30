import { ItemModel } from "@/Schemas/item";
import { connectToDB } from "@/lib/mongodb";
import { Item } from "@/types";
import React from "react";
import ItemEditForm from "./_component/item-edit-form";
import { Loader } from "@/components/loader";

async function ItemEditPage({ params }: { params: { itemid: string } }) {
  await connectToDB();
  const item = await ItemModel.findById<Item>(params.itemid);

  return (
    <div>
      <h1 className="text-2xl sm:text-4xl font-bold py-8 capitalize">
        {" "}
        Edit {item?.name}
      </h1>

      {item ? (
        <ItemEditForm item={JSON.parse(JSON.stringify(item))} />
      ) : (
        <Loader />
      )}
    </div>
  );
}

export default ItemEditPage;
