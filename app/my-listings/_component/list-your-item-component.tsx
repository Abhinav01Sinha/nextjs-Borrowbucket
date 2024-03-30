"use client";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import React, { useState } from "react";
import ItemName from "./item-name";
import ItemCategory from "./item-category";
import ItemDescription from "./item-description";
import ItemPricing from "./item-pricing";
import ItemPhoto from "./item-photos";
import { useMyListingStore } from "../my-listing-store";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Loader } from "@/components/loader";

const totalSteps = 5;
const stepIncrement = 100 / totalSteps;

function ListYourItemComponent() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  const myListings = useMyListingStore();

  const { data: session } = useSession();

  const handleNextStepChange = () => {
    if (step === totalSteps) {
      return;
    }
    setStep((curStep) => curStep + 1);
  };

  const handlePrevStepChange = () => {
    if (step === 1) {
      return;
    }
    setStep((curStep) => curStep - 1);
  };

  const handleFinalSubmit = async () => {
    const data = new FormData();

    data.set(
      "data",
      JSON.stringify({
        item: myListings.data,
      })
    );

    setSubmitting(true);

    const result = await fetch(`api/host/${session?.user.id}/item/create`, {
      method: "POST",
      body: data,
    });

    setSubmitting(false);

    if (result.ok) {
      toast("Item Created! ");
    }
  };

  const handleListAnother = () => {
    myListings.restart();
    setStep(1);
  };

  return (
    <main>
      <p className="text-2xl sm:text-4xl text-center py-8 font-bold">
        List Your Item{" "}
      </p>
      <div className="space-y-8">
        <Progress value={stepIncrement * step} />
        {
          {
            1: <ItemName onNext={handleNextStepChange} />,
            2: (
              <ItemCategory
                onNext={handleNextStepChange}
                onPrev={handlePrevStepChange}
              />
            ),
            3: (
              <ItemDescription
                onNext={handleNextStepChange}
                onPrev={handlePrevStepChange}
              />
            ),
            4: (
              <ItemPricing
                onNext={handleNextStepChange}
                onPrev={handlePrevStepChange}
              />
            ),
            5: <ItemPhoto onPrev={handlePrevStepChange} />,
          }[step]
        }

        {submitting ? (
          <Loader />
        ) : (
          <div
            className={`${
              step !== 5 ? "hidden " : "flex flex-col w-full space-y-2 mt-4 "
            }`}
          >
            <Button onClick={handleFinalSubmit}>Submit</Button>
            <Button onClick={handleListAnother} variant={"outline"}>
              List Another
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}

export default ListYourItemComponent;
