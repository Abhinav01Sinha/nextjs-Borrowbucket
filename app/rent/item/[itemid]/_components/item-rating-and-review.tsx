import { BookingModel } from "@/Schemas/booking";
import { UserModel } from "@/Schemas/user";
import Rating from "@/components/rating";
import { connectToDB } from "@/lib/mongodb";
import { Booking, BookingStatus, User } from "@/types";
import { format } from "date-fns";
import React from "react";

async function ItemRatingAndReview({ itemid }: { itemid: string }) {
  await connectToDB();

  const bookings = await BookingModel.find<Booking>(
    {
      itemid: itemid,
      status: BookingStatus.RETURNED,
    },
    "comment rentstart rentend rating"
  ).populate({
    path: "guestid",
    model: UserModel,
  });

  return (
    <div className="py-4 space-y-4">
      {bookings.length > 0 ? (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="flex flex-col bg-blue-50 space-y-2 p-3 mb-2"
          >
            <Rating rating={booking.rating} />
            <div className="flex text-sm">
              <span className="font-semibold">
                {(booking.guestid as unknown as User).name.split(" ")[0]}
              </span>
              <span className="pl-4 text-slate-500">
                {format(booking.rentstart, "MMM dd ,yyyy")}
              </span>
            </div>
            <p className="leading-6">{booking.comment}</p>
          </div>
        ))
      ) : (
        <h3>No Reviews</h3>
      )}
    </div>
  );
}

export default ItemRatingAndReview;
