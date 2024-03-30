import { BookingModel } from "@/Schemas/booking";
import { connectToDB } from "@/lib/mongodb";
import { Booking, BookingStatus } from "@/types";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { bookingid: string } }
) {
  try {
    await connectToDB();

    const bookingId = params.bookingid;

    if (!bookingId) {
      return new NextResponse("Bookingid is required", { status: 400 });
    }

    await BookingModel.findByIdAndDelete(bookingId);

    return NextResponse.json({
      message: "Booking deleted",
    });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { bookingid: string } }
) {
  await connectToDB();

  const body = await req.json();
  const { comment, rating, status } = body;

  const booking = await BookingModel.findById<Booking>(params.bookingid);
  if (!booking) {
    return new NextResponse("Booking not found", { status: 404 });
  }

  booking.comment = comment;
  booking.rating = rating || booking.rating || 0;
  booking.status = status || booking.status || BookingStatus.RETURNED;
  await booking.save();

  return new NextResponse("Item saved");
}

/*
import { BookingModel } from "@/Schemas/booking";
import { connectToDB } from "@/lib/mongodb";
import { Booking, BookingStatus } from "@/types";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { bookingid: string } }
) {
  try {
    await connectToDB();
    const bookingid = params.bookingid;

    if (!bookingid) {
      return new NextResponse("BookingID is required!", { status: 400 });
    }

    await BookingModel.findByIdAndDelete(bookingid);
    return NextResponse.json({ message: "Booking Deleted!" });
  } catch (error) {
    console.log(error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
export async function PATCH(
  req: Request,
  { params }: { params: { bookingid: string } }
) {
  await connectToDB();

  const body = await req.json();
  console.log(body);

  const { comment, rating, status } = body;

  const booking = await BookingModel.findById<Booking>(params.bookingid);

  if (!booking) {
    return new NextResponse("Booking not Found!", { status: 404 });
  }

  booking.comment = comment;
  booking.rating = rating || booking.rating || 0;
  booking.status = status || booking.status || BookingStatus.RETURNED;

  await booking.save();

  return new NextResponse("Item Saved!");
}
*/
