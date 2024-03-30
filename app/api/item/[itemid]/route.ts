import { ItemModel } from "@/Schemas/item";
import { storageRef } from "@/lib/firebase";
import { connectToDB } from "@/lib/mongodb";
import { Item, ItemStatus } from "@/types";
import { deleteObject } from "firebase/storage";
import { NextResponse } from "next/server";

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { itemid: string } }
) {
  try {
    await connectToDB();

    const itemId = params.itemid;

    const deletedItem = await ItemModel.findByIdAndDelete(itemId);

    if (deletedItem) {
      let item = deletedItem as unknown as Item;
      if (item.photos) {
        await Promise.all(
          item.photos.map(async (photo) => {
            const ref = storageRef(photo);
            await deleteObject(ref);
          })
        );
      }

      return NextResponse.json({ message: "Item Deleted sucessfully !" });
    } else {
      return NextResponse.json({ message: "Item Not Found !" });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse("Server Error !", { status: 500 });
  }
}

// PATCH

export async function PATCH(
  req: Request,
  { params }: { params: { itemid: string } }
) {
  try {
    await connectToDB();

    const body = await req.json();
    const {
      status,
      itemName,
      itemCategory,
      itemDescription,
      hourly,
      daily,
      photos,
    } = body;

    const item = await ItemModel.findById<Item>(params.itemid);

    if (!item) {
      return new NextResponse("Item Not Found", { status: 404 });
    }

    item.name = itemName;
    item.description = itemDescription;
    item.category = itemCategory;
    item.status = status ? ItemStatus.LISTED : ItemStatus.UNLISTED;
    item.price.daily = daily;
    item.price.hourly = hourly;
    item.photos = photos;

    await item.save();

    return NextResponse.json({ message: "Item Updated!!" });
  } catch (error) {
    console.log(error);
    return new NextResponse("Server Error !", { status: 500 });
  }
}
