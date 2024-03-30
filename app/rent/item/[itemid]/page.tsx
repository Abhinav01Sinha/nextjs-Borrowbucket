import { ItemModel } from "@/Schemas/item";
import { UserModel } from "@/Schemas/user";
import { connectToDB } from "@/lib/mongodb";
import { Booking, BookingStatus, Item, User } from "@/types";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import RentalForm from "./_components/rental-form";
import ItemRatingAndReview from "./_components/item-rating-and-review";
import { BookingModel } from "@/Schemas/booking";
import { addDays } from "date-fns";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/app/api/auth/[...nextauth]/option";

const getBookedDates = (startdate: Date, numberOfDays: number): Date[] => {
  const bookedDates: Date[] = [];
  for (let day = 0; day < numberOfDays; day++) {
    const nextDate = addDays(startdate, day);
    bookedDates.push(nextDate);
  }
  return bookedDates;
};

async function RentItemPage({ params }: { params: { itemid: string } }) {
  await connectToDB();

  const bookedDates: Date[] = [];

  const session = await getServerSession(authOptions);

  const datesItemBookedFor = await BookingModel.find<Booking>(
    {
      itemid: params.itemid,
      status: {
        $in: [BookingStatus.PENDING, BookingStatus.RENTED],
      },
      durationtype: "daily",
    },
    "rentstart rentend duration durationtype status"
  );

  datesItemBookedFor.map((d) => {
    const dates = getBookedDates(d.rentstart, d.duration);
    bookedDates.push(...dates);
  });

  const item = await ItemModel.findById<Item>(params.itemid).populate({
    path: "hostid",
    model: UserModel,
  });

  return (
    <>
      {session ? (
        <div className="flex flex-col justify-center items-center ">
          <Carousel className="w-full max-w-sm sm:max-w-xl">
            <CarouselContent>
              {item?.photos.map((photo) => (
                <CarouselItem key={photo}>
                  <Image src={photo} width={600} height={400} alt={photo} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselNext />
            <CarouselPrevious />
          </Carousel>
          <div className="w-full justify-between flex flex-col sm:flex-row">
            <div className="space-y-8 sm:space-y-4">
              <h1 className="text-2xl capitalize sm:text-4xl py-8 font-bold">
                {item?.name}
              </h1>
              <div className="flex">
                Hosted By :
                <p className="capitalize font-bold ml-2">
                  {(item?.hostid as unknown as User).name}
                </p>
              </div>
              <div className="flex flex col space-y-2">
                <p>Please Read the Description carefully!</p>
              </div>
              <div>
                <p>{item?.description}</p>
              </div>
              <div className="flex flex-col">
                <p className="font-bold">Reviews </p>
                <ItemRatingAndReview itemid={item?._id} />
              </div>
            </div>

            <div className=" sm:block items-start space-y-4 pt-8">
              <p className="font-bold ">Rent Details</p>
              <RentalForm
                itemProps={JSON.stringify(item)}
                bookedDate={JSON.stringify(bookedDates)}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center ">
          <h1 className="text-4xl sm:text-2xl my-4">You are not Logged In! </h1>
          <Link
            href={"/api/auth/signin"}
            className="text-blue-500 capitalize hover:text-blue-800"
          >
            Click here to Login
          </Link>
        </div>
      )}
    </>
  );
}

export default RentItemPage;
