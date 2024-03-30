import { stripe } from "@/lib/stripe";
import React from "react";
import Stripe from "stripe";
import { Metadata } from "@stripe/stripe-js";
import { CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

async function RentItemCheckoutResultPage({
  searchParams,
}: {
  searchParams: { session_id: string };
}) {
  if (!searchParams.session_id) {
    throw new Error("Please provide a valid session id");
  }

  const checkoutSession: Stripe.Checkout.Session =
    await stripe.checkout.sessions.retrieve(searchParams.session_id, {
      expand: ["line_items", "payment_intent"],
    });

  const paymentIntent = checkoutSession.payment_intent as Stripe.PaymentIntent;
  const paymentStatus =
    paymentIntent.status === "succeeded"
      ? "Payment Successful"
      : "Payment Failed";

  let rentstart = "",
    rentend = "";
  if (paymentIntent.status === "succeeded") {
    const metadata = checkoutSession.metadata as Metadata;
    rentstart = metadata["rentstart"];
    rentend = metadata["rentend"];

    await fetch(`http://localhost:3000/api/item/${metadata["itemid"]}/rent`, {
      method: "POST",
      body: JSON.stringify({
        itemid: metadata["itemid"],
        guestid: metadata["guestid"],
        rentstart: rentstart,
        rentend: rentend,
        duartion: metadata["duartion"],
        durationtype: metadata["durationtype"],
        amount: metadata["amount"],
        stripeid: checkoutSession.id,
      }),
    });
  }
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        {paymentIntent.status === "succeeded" && (
          <CheckCircle2 size={64} className="text-green-600" />
        )}

        <h2
          className={`text-2xl py-4 ${
            paymentIntent.status === "succeeded"
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          {paymentStatus}
        </h2>

        <h3 className="text-lg">
          {" "}
          Your Item Has been booked. You can pick your item on
          <span className="font-bold"> {format(rentstart, "PPP")}</span> and
          return it on{" "}
          <span className="font-bold">{format(rentend, "PPP")}</span>.
          <p>
            You can{" "}
            <Link href={"/my-rented-items"} className="text-blue-500">
              Click to see items you have rented.
            </Link>
          </p>
        </h3>
      </div>
    </div>
  );
}

export default RentItemCheckoutResultPage;
