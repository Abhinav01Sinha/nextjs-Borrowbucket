"use client";

import { Booking, BookingStatus, Item } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function CancelRental({ forItem }: { forItem: Booking }) {
  const [alertDialog, setAlertDialog] = useState(false);
  const router = useRouter();

  const handleConfirm = async () => {
    const result = await fetch(`api/booking/${forItem._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        status: BookingStatus.CANCELLED,
      }),
    });

    if (result.ok) {
      toast.success("Rental ended");
      router.refresh();
    } else {
      toast.error("Operation failed");
      console.log(result);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        className="text-orange-500 p-0"
        onClick={() => setAlertDialog(true)}
      >
        Cancel rental
      </Button>
      <AlertDialog open={alertDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Cancel{" "}
              <span className="capitalize">
                {(forItem.itemid as unknown as Item).name}
              </span>{" "}
              rental
            </AlertDialogTitle>
            <AlertDialogDescription>
              This item will be removed from your rental list. You can always
              rent it again.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setAlertDialog(false)}>
              No
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              Yes, cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default CancelRental;

// import { Booking, BookingStatus, Item } from "@/types";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useRouter } from "next/navigation";
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
// import { Textarea } from "@/components/ui/textarea";
// import Rating from "@/components/rating";
// import { toast } from "sonner";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";

// const FormSchema = z.object({
//   comment: z
//     .string()
//     .min(10, { message: "Item comment should be min 10 characters." }),
// });

// type EndRentalFormType = z.infer<typeof FormSchema>;

// async function CancelRental({ forItem }: { forItem: Booking }) {
//   const router = useRouter();
//   const [alertDialog, setAlertDialog] = useState(false);

//   const handleConfirm = async () => {
//     const result = await fetch(`api/booking/${forItem._id}`, {
//       method: "PATCH",
//       body: JSON.stringify({
//         status: BookingStatus.CANCELLED,
//       }),
//     });

//     if (result.ok) {
//       toast.success("Rental Ended!");
//       router.refresh();
//     } else {
//       toast.error("Failed");
//       console.log(result);
//     }
//   };

//   return (
//     <>
//       <Button
//         variant={"ghost"}
//         className="text-orange-500 p-0"
//         onClick={() => setAlertDialog(true)}
//       >
//         Cancel Rental
//       </Button>
//       <AlertDialog open={alertDialog}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>
//               <span className="capitalize">
//                 Cancel rental for {(forItem.itemid as unknown as Item).name}
//               </span>
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               Item will be removed from the rental list. You can always rent it
//               again.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel onClick={() => setAlertDialog(false)}>
//               No
//             </AlertDialogCancel>
//             <AlertDialogAction onClick={() => handleConfirm()}>
//               Yes , Cancel
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </>
//   );
// }

// export default CancelRental;
