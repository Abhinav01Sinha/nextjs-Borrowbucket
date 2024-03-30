import Header from "@/components/header";
import MaxWidthContainer from "@/components/maxWidthContainer";
import React from "react";

function MyRentingPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <MaxWidthContainer classes="py-32">{children}</MaxWidthContainer>
    </>
  );
}

export default MyRentingPage;
