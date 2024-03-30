import { getServerSession } from "next-auth";
import React from "react";

import { Booking, BookingStatus, Item, User } from "@/types";

import Image from "next/image";
import { format } from "date-fns";
import EndRental from "./_components/end-rental";
import CancelRental from "./_components/cancel-rental";
import { Badge } from "@/components/ui/badge";
import { BookingModel } from "@/Schemas/booking";
import { ItemModel } from "@/Schemas/item";
import { UserModel } from "@/Schemas/user";
import { authOptions } from "../api/auth/[...nextauth]/option";

async function MyRentedItemPage() {
  const session = await getServerSession(authOptions);

  const myRentedItemResult = await BookingModel.find<Booking>({
    guestid: session?.user.id,
  }).populate({
    path: "itemid",
    model: ItemModel,
    populate: {
      path: "hostid",
      model: UserModel,
    },
  });

  return (
    <>
      <h1 className="text-2xl sm:text-4xl py-8 font-bold">Rented items</h1>
      {myRentedItemResult.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2">
          {myRentedItemResult.map((item) => (
            <div
              key={item._id}
              className="flex border p-4 rounded-md shadow-sm"
            >
              <div className="flex flex-col items-start gap-y-2">
                <p className="text-2xl sm:text-xl font-bold capitalize">
                  {(item.itemid as unknown as Item).name}
                </p>
                <p className="sm:text-md text-sm text-gray-500">
                  {format(item.rentstart, "MMM d, yyyy")} -{" "}
                  {format(item.rentend, "MMM d, yyyy")}
                </p>
                <p className="sm:text-lg text-md text-gray-600 capitalize">
                  Host:{" "}
                  {
                    ((item.itemid as unknown as Item).hostid as unknown as User)
                      .name
                  }
                </p>

                {item.status === BookingStatus.RENTED && (
                  <EndRental forItem={JSON.parse(JSON.stringify(item))} />
                )}
                {item.status === BookingStatus.PENDING && (
                  <CancelRental forItem={JSON.parse(JSON.stringify(item))} />
                )}
                {item.status === BookingStatus.CANCELLED && (
                  <Badge variant="secondary">{item.status}</Badge>
                )}
                {item.status === BookingStatus.RETURNED && (
                  <Badge variant="default">{item.status}</Badge>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Image
            src={"/empty-box.png"}
            width={200}
            height={200}
            alt="empty box"
          />
          <h2 className="text-2xl sm:text-3xl font-bold py-1">
            No items rented
          </h2>
          <p className="text-center text-slate-500">
            This is where you can see items you have rented.
          </p>
        </div>
      )}
    </>
  );
}

export default MyRentedItemPage;

// import { BookingModel } from "@/Schemas/booking";
// import { ItemModel } from "@/Schemas/item";
// import { UserModel } from "@/Schemas/user";
// import { authOptions } from "@/lib/authOptions";
// import { Booking, BookingStatus, Item, User } from "@/types";
// import { format } from "date-fns";
// import { getServerSession } from "next-auth";
// import Image from "next/image";
// import React from "react";
// import EndRental from "./_components/end-rental";
// import CancelRental from "./_components/cancel-rental";
// import { Badge } from "@/components/ui/badge";

// async function RentedItems() {
//   const session = await getServerSession(authOptions);

//   const myRentedItems = await BookingModel.find<Booking>({
//     guestid: session?.user.id,
//   }).populate({
//     path: "itemid",
//     model: ItemModel,
//     populate: {
//       path: "hostid",
//       model: UserModel,
//     },
//   });

//   return (
//     <div>
//       <h1 className="text-2xl sm:text-4xl py-8 font-bold">Rented Items</h1>

//       {myRentedItems.length > 0 ? (
//         <div className="grid col-1 sm:col-3 gap-1 sm:gap-2">
//           {myRentedItems.map((item) => (
//             <div
//               key={item._id}
//               className="flex border p-4 rounded-md shadow-sm"
//             >
//               <div className="flex flex-col items-start gap-y-2">
//                 <p className="text-2xl sm:text-xl capitalize font-semibold">
//                   {(item.itemid as unknown as Item).name}
//                 </p>
//                 <p className="sm:text-md text-sm text-gray-500">
//                   From {format(item.rentstart, "MMM d , yyyy")} {" to "}
//                   {format(item.rentend, "MMM d , yyyy")}
//                 </p>

//                 <p className="sm:text-lg text-md text-gray-600 capitalize">
//                   Host :{" "}
//                   {
//                     ((item.itemid as unknown as Item).hostid as unknown as User)
//                       .name
//                   }
//                 </p>

//                 {item.status === BookingStatus.RENTED && (
//                   <EndRental forItem={JSON.parse(JSON.stringify(item))} />
//                 )}

//                 {item.status === BookingStatus.PENDING && (
//                   <CancelRental forItem={JSON.parse(JSON.stringify(item))} />
//                 )}

//                 {item.status === BookingStatus.CANCELLED && (
//                   <Badge variant={"secondary"}>{item.status}</Badge>
//                 )}

//                 {item.status === BookingStatus.RETURNED && (
//                   <Badge variant={"default"}>{item.status}</Badge>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="flex flex-col items-center">
//           <Image src={"/empty-box.png"} width={200} height={200} alt="empty" />
//           <h2 className="text-xl sm:text-3xl py-4 font-bold">
//             No Items Rented! Start Renting now.
//           </h2>
//         </div>
//       )}
//     </div>
//   );
// }

// export default RentedItems;
